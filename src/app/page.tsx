import { loadCv } from "@/lib/cv";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Summary from "@/components/Summary";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";

export default function Home() {
  const cv = loadCv();

  return (
    <>
      <Nav email={cv.email} />
      <main id="main" className="w-full max-w-full overflow-x-hidden">
        <Hero cv={cv} />
        <Marquee />
        <Summary
          summary={cv.sections.Summary[0]}
          certCount={cv.sections.certifications.length}
        />
        <Experience roles={cv.sections.experience} />
        <Education entry={cv.sections.education[0]} />
        <Certifications certs={cv.sections.certifications} />
        <Projects projects={cv.sections.portfolio} />
        <Leadership roles={cv.sections["Organizational Experience"]} />
        <Contact cv={cv} />
      </main>
    </>
  );
}
