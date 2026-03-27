import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Articles from "@/components/Articles";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Work />
        <Articles />

        {/* Section Contact */}
        <section
          id="contact"
          className="flex flex-col items-center justify-center py-32 px-4"
        >
          <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-6">
            CONTACT
          </h2>
          <a
            href="mailto:marvinlaurac.pro@gmail.com"
            className="font-inter text-[14px] text-[#2D2D2D]/60 hover:text-[#2D2D2D] transition-colors"
          >
            marvinlaurac.pro@gmail.com
          </a>
        </section>
      </main>
    </>
  );
}
