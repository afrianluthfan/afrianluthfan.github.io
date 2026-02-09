import { getCVData } from "@/lib/cv";
import HeroSection from "@/components/HeroSection";
import SummarySection from "@/components/SummarySection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import PortfolioSection from "@/components/PortfolioSection";
import OrgExperienceSection from "@/components/OrgExperienceSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const cv = getCVData();

  return (
    <main>
      <HeroSection
        name={cv.name}
        location={cv.location}
        email={cv.email}
        phone={cv.phone}
        website={cv.website}
        linkedinUsername={cv.social_networks[0].username}
        githubUrl={cv.github}
      />
      <SummarySection summary={cv.sections.Summary} />
      <ExperienceSection experiences={cv.sections.experience} />
      <EducationSection education={cv.sections.education} />
      <CertificationsSection
        certifications={cv.sections.certifications}
        certificationsUrl={cv.sections.certifications_url}
      />
      <PortfolioSection projects={cv.sections.portfolio} />
      <OrgExperienceSection
        experiences={cv.sections["Organizational Experience"]}
      />
      <FooterSection
        name={cv.name}
        email={cv.email}
        website={cv.website}
        linkedinUsername={cv.social_networks[0].username}
        githubUrl={cv.github}
      />
    </main>
  );
}
