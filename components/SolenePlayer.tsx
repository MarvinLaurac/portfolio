"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SolenePlayerProps {
  text: string;
}

const KOKORO_URL = "/api/tts";
const CHUNK_SIZE = 400; // caractères max par chunk (sûr pour 510 tokens)

// Découpe le texte en phrases, puis regroupe en chunks de CHUNK_SIZE max
function splitIntoChunks(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if ((current + " " + trimmed).trim().length > CHUNK_SIZE) {
      if (current) chunks.push(current.trim());
      // Si une seule phrase dépasse CHUNK_SIZE, on la coupe brutalement
      if (trimmed.length > CHUNK_SIZE) {
        for (let i = 0; i < trimmed.length; i += CHUNK_SIZE) {
          chunks.push(trimmed.slice(i, i + CHUNK_SIZE));
        }
        current = "";
      } else {
        current = trimmed;
      }
    } else {
      current = (current + " " + trimmed).trim();
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

async function fetchChunk(text: string): Promise<ArrayBuffer> {
  const res = await fetch(KOKORO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.arrayBuffer();
}

export default function SolenePlayer({ text }: SolenePlayerProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<"kokoro" | "web">("kokoro");

  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelledRef = useRef(false);

  // Web Speech fallback refs
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startRef = useRef(0);
  const durationRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const stopAll = useCallback(() => {
    cancelledRef.current = true;
    clearTimer();
    if (sourceRef.current) { try { sourceRef.current.stop(); } catch {} sourceRef.current = null; }
    if (ctxRef.current) { ctxRef.current.close(); ctxRef.current = null; }
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    utteranceRef.current = null;
    setProgress(0);
    setState("idle");
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  // ── Kokoro TTS — lecture séquentielle par chunks ──────────────
  const playKokoro = useCallback(async () => {
    setState("loading");
    cancelledRef.current = false;

    const chunks = splitIntoChunks(text);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      await ctx.resume();
      ctxRef.current = ctx;

      // Pré-fetch tous les chunks en parallèle
      const buffers = await Promise.all(chunks.map(fetchChunk));

      if (cancelledRef.current) return;

      // Décode tous les buffers audio
      const audioBuffers = await Promise.all(
        buffers.map((b) => ctx.decodeAudioData(b))
      );

      if (cancelledRef.current) return;

      const totalDuration = audioBuffers.reduce((s, b) => s + b.duration, 0);
      const totalMs = totalDuration * 1000;
      const startTime = Date.now();

      setState("playing");

      clearTimer();
      timerRef.current = setInterval(() => {
        if (cancelledRef.current) return;
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / totalMs) * 100, 97));
      }, 250);

      // Lecture séquentielle via AudioContext schedulé
      let offset = ctx.currentTime;
      for (const audioBuffer of audioBuffers) {
        if (cancelledRef.current) break;
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start(offset);
        offset += audioBuffer.duration;
      }

      // Attente fin de lecture
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), totalMs + 200);
      });

      if (!cancelledRef.current) {
        clearTimer();
        setProgress(100);
        setChunkInfo("");
        setTimeout(() => { setProgress(0); setState("idle"); }, 500);
        ctx.close();
        ctxRef.current = null;
      }

    } catch (e) {
      console.error("[Solène] Erreur Kokoro, fallback Web Speech:", e);
      setMode("web");
      playWebSpeech();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, stopAll]);

  // ── Web Speech fallback ──────────────────────────────────────
  const playWebSpeech = useCallback(() => {
    if (!window.speechSynthesis) { stopAll(); return; }
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 0.95;
    utter.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const frVoice =
      voices.find((v) => v.lang.startsWith("fr") && v.name.includes("Amélie")) ||
      voices.find((v) => v.lang.startsWith("fr") && v.name.includes("Thomas")) ||
      voices.find((v) => v.lang.startsWith("fr"));
    if (frVoice) utter.voice = frVoice;

    const words = text.trim().split(/\s+/).length;
    durationRef.current = (words / 145) * 60 * 1000;
    startRef.current = Date.now();

    utter.onstart = () => {
      setState("playing");
      clearTimer();
      timerRef.current = setInterval(() => {
        const p = Math.min(((Date.now() - startRef.current) / durationRef.current) * 100, 97);
        setProgress(p);
      }, 250);
    };
    utter.onend = () => {
      clearTimer();
      setProgress(100);
      setTimeout(() => { setProgress(0); setState("idle"); }, 500);
    };
    utter.onerror = () => stopAll();

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    setState("loading");
  }, [text, stopAll]);

  // ── Contrôles ────────────────────────────────────────────────
  const handleClick = () => {
    if (state === "idle") {
      setMode("kokoro");
      playKokoro();
      return;
    }
    if (state === "playing") {
      if (mode === "kokoro" && ctxRef.current) {
        ctxRef.current.suspend();
      } else {
        window.speechSynthesis?.pause();
        clearTimer();
      }
      setState("paused");
      return;
    }
    if (state === "paused") {
      if (mode === "kokoro" && ctxRef.current) {
        ctxRef.current.resume();
      } else {
        window.speechSynthesis?.resume();
      }
      setState("playing");
      return;
    }
    if (state === "loading") stopAll();
  };

  const isActive = state !== "idle";

  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 my-8
      ${isActive ? "bg-[#f5f3ff] border-[#c4b5fd]" : "bg-[#fafafa] border-[#e5e5e5] hover:border-[#c4b5fd] hover:bg-[#f5f3ff]/50"}
    `}>
      {/* Bouton play/pause */}
      <button
        onClick={handleClick}
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
          ${isActive ? "bg-[#7c6aff] text-white shadow-sm" : "bg-white border border-[#e5e5e5] text-[#2D2D2D]/50 hover:border-[#7c6aff] hover:text-[#7c6aff]"}
        `}
        aria-label={state === "playing" ? "Pause" : "Écouter l'article"}
      >
        {state === "loading" ? (
          <span className="w-3 h-3 border-2 border-[#7c6aff]/30 border-t-[#7c6aff] rounded-full animate-spin" />
        ) : state === "playing" ? (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1"/>
            <rect x="14" y="5" width="4" height="14" rx="1"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Label + barre */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-inter text-[12px] font-semibold text-[#1a1a1a] flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className={`w-3 h-3 ${isActive ? "text-[#7c6aff]" : "text-[#2D2D2D]/30"}`} fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path strokeLinecap="round" d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path strokeLinecap="round" d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
            Solène
          </span>
          <span className="font-inter text-[11px] text-[#2D2D2D]/30">
            {state === "loading" ? "Préparation…"
              : state === "playing" ? "Lecture en cours"
              : state === "paused" ? "En pause"
              : "Lire l'article"}
          </span>
        </div>

        {/* Barre de progression */}
        <div className="h-[3px] bg-[#1a1a1a]/8 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${isActive ? Math.max(progress, 3) : 0}%`,
              background: "linear-gradient(90deg, #7c6aff, #a78bfa)",
            }}
          />
        </div>
      </div>

      {/* Stop */}
      {isActive && (
        <button
          onClick={stopAll}
          className="flex-shrink-0 p-1.5 rounded-full text-[#2D2D2D]/25 hover:text-[#2D2D2D]/60 hover:bg-[#1a1a1a]/5 transition-all"
          aria-label="Arrêter"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <rect x="5" y="5" width="14" height="14" rx="2"/>
          </svg>
        </button>
      )}
    </div>
  );
}
