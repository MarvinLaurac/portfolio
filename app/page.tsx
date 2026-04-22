export default function MaintenancePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
        background: "linear-gradient(180deg, #f2ede9 0%, #ffa100 100%)",
        padding: "0 1.5rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        Site en maintenance
      </h1>
      <p
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          color: "#1a1a1a",
          opacity: 0.6,
          maxWidth: "420px",
          lineHeight: 1.6,
        }}
      >
        On revient très bientôt. Merci pour votre patience.
      </p>
    </main>
  );
}
