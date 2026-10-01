import { person } from "@/resources";
import type { BasePageConfig } from "@/types";

type TeachingSection = {
  title: string;
  intro?: React.ReactNode;
  items: Array<{
    title: string;
    description: React.ReactNode;
    tags?: string[];
  }>;
};

type TeachingMaterial = {
  slug: string;
  title: string;
  description: React.ReactNode;
  href: string;
  tags?: string[];
};

type TeachingPage = BasePageConfig & {
  intro: React.ReactNode;
  materialsIntro?: React.ReactNode;
  materials: TeachingMaterial[];
  sections: TeachingSection[];
};

const teaching: TeachingPage = {
  path: "/teaching",
  label: "Teaching",
  title: `Teaching and Mentoring - ${person.name}`,
  description: `Teaching, mentoring, and research supervision by ${person.name}`,
  intro:
    "My teaching and mentoring work sits close to my research: computational seismology, structural dynamics, earthquake engineering, and student supervision across undergraduate, master's, and doctoral research environments.",
  materials: [],
  sections: [
    {
      title: "University of Hamburg Supervision",
      items: [
        {
          title: "B.Sc. Thesis Co-Supervision — Laurin Müller",
          description:
            "Co-supervising Laurin Müller on structural health monitoring of wind turbines using 6-component ground-motion data at the University of Hamburg.",
          tags: ["B.Sc. Supervision", "6C Data", "Structural Health Monitoring"],
        },
        {
          title: "B.Sc. Thesis Co-Supervision",
          description:
            "Co-supervised Nicolas Matthießen on numerical simulation of seismic gradients and their response to heterogeneity in the Earth medium.",
          tags: ["B.Sc. Supervision", "Seismic Gradients", "Numerical Simulation"],
        },
      ],
    },
    {
      title: "Computational Seismology Teaching",
      items: [
        {
          title: "SPECFEM Short Course (2021)",
          description:
            "Taught an online course on SPECFEM, a community solver for seismic wave propagation based on the spectral element method, as part of a SPIN-ITN short course on computational seismology.",
          tags: ["SPECFEM", "Spectral Element Method", "Computational Seismology"],
        },
        {
          title: "SPIN-ITN Workshops and Short Courses",
          description:
            "Co-organized short courses and workshops for SPIN-ITN Ph.D. researchers and external candidates, supporting collaborative skill development across seismology topics.",
          tags: ["Workshop Organization", "Ph.D. Training", "Research Community"],
        },
      ],
    },
    {
      title: "IIT Madras and VNIT Teaching Support",
      items: [
        {
          title: "Civil Engineering Teaching Assistantship",
          description:
            "Assisted Prof. Dr. S.T.G. Raghukanth at IIT Madras with assignments, tutorials, question papers, and evaluation across Structural Dynamics, Design of Steel Structures, Stability of Structures, Probability, Advanced Mechanics of Structures, and Introduction to Research.",
          tags: ["IIT Madras", "Structural Dynamics", "Civil Engineering"],
        },
        {
          title: "Master's Project Co-Supervision",
          description:
            "Co-supervised final-year dual degree and M.Tech. student projects at IIT Madras under Prof. Dr. S.T.G. Raghukanth.",
          tags: ["M.Tech. Projects", "Research Mentoring", "IIT Madras"],
        },
        {
          title: "Engineering Mechanics Tutorials",
          description:
            "Assisted Prof. Dr. O.R. Jaiswal with assignments and tutorial sessions for the undergraduate Engineering Mechanics course at VNIT Nagpur.",
          tags: ["VNIT Nagpur", "Engineering Mechanics", "Tutorials"],
        },
      ],
    },
  ],
};

export { teaching };
export type { TeachingMaterial, TeachingPage, TeachingSection };
