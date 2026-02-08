import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  start_date: string;
  end_date: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  date: string;
  location: string;
}

export interface PortfolioItem {
  name: string;
  url: string;
  highlights: string[];
  status?: string;
}

export interface SocialNetwork {
  network: string;
  username: string;
}

export interface CVData {
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  social_networks: SocialNetwork[];
  sections: {
    Summary: string[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    portfolio: PortfolioItem[];
    "Organizational Experience": Experience[];
  };
}

export function getCVData(): CVData {
  const filePath = path.join(process.cwd(), "cv.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as { cv: CVData };
  return data.cv;
}
