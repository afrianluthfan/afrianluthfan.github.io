import { readFileSync } from "fs";
import path from "path";
import yaml from "js-yaml";

export interface SocialNetwork {
  network: string;
  username: string;
}

export interface RoleEntry {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  area: string;
  degree: string;
  start_date: string;
  end_date: string;
  highlights?: string[];
}

export interface CertificationEntry {
  name: string;
  date: string | number;
  location: string;
}

export interface ProjectEntry {
  name: string;
  url?: string;
  highlights: string[];
  status?: string;
}

export interface Cv {
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  social_networks: SocialNetwork[];
  sections: {
    Summary: string[];
    experience: RoleEntry[];
    education: EducationEntry[];
    certifications: CertificationEntry[];
    portfolio: ProjectEntry[];
    "Organizational Experience": RoleEntry[];
  };
}

export function loadCv(): Cv {
  const raw = readFileSync(path.join(process.cwd(), "cv.yaml"), "utf8");
  const doc = yaml.load(raw) as { cv: Cv };
  return doc.cv;
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function formatDate(value: string): string {
  if (!value || value === "present") return "NOW";
  const [year, month] = String(value).split("-");
  if (!month) return year;
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatRange(start: string, end: string): string {
  return `${formatDate(start)} - ${formatDate(end)}`;
}
