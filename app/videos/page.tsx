"use client";

import Header from "@/components/Header";
import { Play } from "lucide-react";

const videos = [
  {
    id: "-A_XfVD9Qic",
    title: "Apple choisit Gemini : ce que personne ne t'a dit",
    description: "Apple signe avec Google pour intégrer Gemini dans l'iPhone. Une enquête sur l'accord qui change tout.",
    category: "Enquête",
    gradient: "linear-gradient(135deg, #1a0533 0%, #0d1a2e 50%, #0a0a0a 100%)",
  },
];

export default function VideosPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0d0d0d]">
        {/* Hero banner — première vidéo */}
        <div className="relative w-full h-[45vh] sm:h-[60vh] overflow-hidden" style={{ background: videos[0].gradient }}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-transparent" />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 px-4 sm:px-10 pb-8 sm:pb-12 max-w-xl">
            <span className="inline-block font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              {videos[0].category}
            </span>
            <h1 className="font-inter text-[20px] sm:text-[28px] font-bold text-white leading-tight mb-4">
              {videos[0].title}
            </h1>
            <p className="font-inter text-[12px] sm:text-[13px] text-white/60 leading-relaxed mb-6 hidden sm:block">
              {videos[0].description}
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${videos[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0d0d0d] font-inter text-[12px] font-semibold tracking-wide hover:bg-white/90 transition-all"
            >
              <Play size={13} fill="#0d0d0d" />
              Regarder
            </a>
          </div>
        </div>

        {/* Grid section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-10">
          <h2 className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-5">
            Toutes les vidéos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3" style={{ background: v.gradient }}>
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play size={14} fill="#0d0d0d" className="ml-0.5" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="font-inter text-[9px] font-semibold tracking-[0.15em] uppercase bg-white/10 backdrop-blur-sm text-white/70 px-2 py-1 rounded-full">
                      {v.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <p className="font-inter text-[13px] font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                  {v.title}
                </p>
                <p className="font-inter text-[11px] text-white/30 mt-1">
                  {v.description}
                </p>
              </a>
            ))}
          </div>

          {/* Coming soon placeholder */}
          <div className="mt-10 border border-white/5 rounded-lg p-8 flex flex-col items-center text-center">
            <p className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-2">
              Bientôt disponible
            </p>
            <p className="font-inter text-[13px] text-white/30 max-w-xs">
              D'autres enquêtes sont en cours de production. Abonne-toi pour ne rien rater.
            </p>
            <a
              href="https://www.youtube.com/@Marvinlaurac_plus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/40 font-inter text-[11px] font-semibold tracking-wide hover:border-white/20 hover:text-white/60 transition-all"
            >
              S'abonner sur YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
   </div>
        </div>
      </div>
    </>
  );
}
onner sur YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
   </div>
        </div>
      </div>
    </>
  );
}
</div>
    </>
  );
}
   </div>
        </div>
      </div>
    </>
  );
}
onner sur YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
   </div>
        </div>
      </div>
    </>
  );
}
