import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Travel, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anjali",
  lastName: "Dhabu",
  name: "Dr. Anjali Dhabu",
  role: "Postdoctoral Researcher in Rotational Seismology and Earthquake Engineering",
  avatar: "/images/anjali_avtar.jpeg",
  email: "anjali.dhabu@uni-hamburg.de",
  location: "Europe/Berlin",
  hardSkills: [
    "Rotational Seismology",
    "Earthquake Engineering",
    "Structural Dynamics",
    "Seismic Wave Propagation",
    "Ground Motion Simulation",
    "Structural Health Monitoring",
    "6C Ground-Motion Data",
    "Reduced Micropolar Theory",
    "Finite Element Modeling",
    "Spectral Element Methods",
    "SPECFEM",
    "MATLAB",
    "LaTeX",
  ],
};

const newsletter: Newsletter = {
  display: false,
  title: `Subscribe to ${person.firstName}'s Newsletter`,
  description: "Updates on rotational seismology, earthquake engineering, and structural dynamics.",
};

const social: Social = [
  {
    name: "University Profile",
    icon: "openLink",
    link: "https://www.geo.uni-hamburg.de/en/geophysik/personen/dhabu-anjali.html",
    essential: true,
  },
  {
    name: "ORCID",
    icon: "openLink",
    link: "https://orcid.org/0000-0002-2913-3013",
    essential: true,
  },
  {
    name: "Google Scholar",
    icon: "openLink",
    link: "https://scholar.google.com/citations?user=JlXHkJoAAAAJ&hl=en",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/anjali-research-preview.png",
  label: "Home",
  title: `${person.name} - Research Portfolio`,
  description: `Research profile of ${person.name}, ${person.role} at the University of Hamburg`,
  headline:
    "I am building an independent research programme on 6C earthquake ground motion and structural resilience.",
  featured: {
    display: false,
    title: "Featured research",
    href: "/publications",
  },
  subline:
    "I combine rotational seismology, numerical wave simulation, and structural dynamics to turn six-component earthquake observations into models for safer bridges, wind turbines, and other critical structures.",
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Hamburg, Germany`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text as="p">
          I am a civil engineer and postdoctoral researcher specializing in structural dynamics,
          earthquake engineering, seismic wave propagation, and rotational seismology. My work
          connects theoretical seismology with civil engineering applications, especially where
          earthquake ground motions and structural response need to be understood together.
        </Text>
        <Text as="p">
          At the University of Hamburg, I lead the DFG-funded HERS project, Heterogeneities and
          their Effect on Rotational Seismology. The project develops analytical and numerical
          approaches for simulating rotational ground motions in heterogeneous media and studies
          what these motions mean for earthquake-resistant design and structural health monitoring.
        </Text>
        <Text as="p">
          My research background includes reduced micropolar theory, translational and rotational
          ground-motion simulation, 6-component sensing, modal analysis of civil engineering
          structures, and seismic applications for both Earth and planetary settings.
        </Text>
      </>
    ),
  },
  strengths: {
    display: true,
    title: "Research Strengths",
    items: [
      "Rotational Seismology",
      "Earthquake Engineering",
      "Structural Dynamics",
      "Seismic Wave Propagation",
      "Analytical and Numerical Modeling",
      "Structural Health Monitoring",
      "Interdisciplinary Research Leadership",
    ],
  },
  toolkit: {
    display: true,
    title: "Toolkit",
    items: person.hardSkills ?? [],
  },
  references: {
    display: true,
    note: "Full CV and references available on request.",
  },
  work: {
    display: true,
    title: "Research Positions",
    experiences: [
      {
        company: "University of Hamburg, Institute of Geophysics",
        timeframe: "04/2024 - 03/2027",
        role: "Postdoctoral Researcher, DFG Individual Research Grant - HERS",
        achievements: [
          "Leads the DFG-funded project Heterogeneities and their Effect on Rotational Seismology (HERS), focused on how complex subsurface media influence simulated rotational ground motions and strains.",
          "Develops heterogeneous finite-element and numerical simulation approaches for regional rotational ground-motion modeling, connecting seismology with earthquake engineering design questions.",
          "Builds on more than a decade of civil engineering and engineering seismology research to translate theoretical ground-motion models into practical structural resilience questions.",
        ],
        images: [],
      },
      {
        company: "University of Hamburg, Institute of Geophysics",
        timeframe: "07/2023 - 03/2024",
        role: "Postdoctoral Researcher, ErUM-WAVE Project",
        achievements: [
          "Contributed to the ErUM-WAVE project on anticipation of 3-dimensional wave-fields under the supervision of Prof. Dr. Celine Hadziioannou.",
          "Worked at the interface of computational seismology, wave-field simulation, and observation-driven understanding of complex seismic motion.",
          "Extended research on rotational and translational ground motions toward coupled simulation methods for teleseismic and regional seismic applications.",
        ],
        images: [],
      },
      {
        company: "University of Hamburg, Institute of Geophysics",
        timeframe: "11/2021 - 08/2023",
        role: "Postdoctoral Researcher, GIOTTO Project",
        achievements: [
          "Worked on building vibrations and condition analysis using innovative sensor concepts in the GIOTTO project.",
          "Applied 6-component measurements and modal-analysis concepts to connect recorded ground motion with civil engineering structures and structural health monitoring.",
          "Presented research on using rotational motions to understand material damage in civil engineering structures at international seismology meetings.",
        ],
        images: [],
      },
      {
        company: "Indian Institute of Technology Madras",
        timeframe: "2014 - 2020",
        role: "Doctoral Researcher, Civil Engineering",
        achievements: [
          "Completed a Ph.D. in Civil Engineering in the Division of Structural Engineering under Prof. Dr. S.T.G. Raghukanth.",
          "Developed analytical and numerical formulations for translational and rotational ground motions in reduced micropolar media.",
          "Produced journal publications on seismic wave propagation, ground-motion simulation, fundamental solutions, Himalayan topography effects, and strong-motion source characterization.",
        ],
        images: [],
      },
    ],
  },
  awards: {
    display: true,
    title: "Awards and Recognition",
    items: [
      {
        title: "Institute Research Award, IIT Madras",
        details: [
          "Received the 2020 Institute Research Award in recognition of the quality and quantity of research output during Ph.D. studies.",
        ],
      },
      {
        title: "Student Travel Grant, IIT Madras",
        details: [
          "Received support from Indian Institute of Technology Madras in Sep. 2018 for conference presentations and research dissemination.",
        ],
      },
      {
        title: "Merit-based Scholarship, MHRD, Govt. of India (Ph.D.)",
        details: [
          "Awarded a Government of India merit-based scholarship from Jan. 2014 to July 2019 for academic excellence during Ph.D. studies.",
        ],
      },
      {
        title: "Silver Medal, VNIT Nagpur",
        details: [
          "Awarded the 2014 Silver Medal for securing second position in the Department of Applied Mechanics during the M.Tech. programme.",
        ],
      },
      {
        title: "Merit-based Scholarship, MHRD, Govt. of India (M.Tech.)",
        details: [
          "Awarded a Government of India merit-based scholarship from Jan. 2012 to July 2014 for academic excellence during M.Tech. studies.",
        ],
      },
      {
        title: "Gold Medals and Academic Awards, SGSITS Indore",
        details: [
          "Received multiple gold medals and institutional awards for first position, highest overall marks, and highest marks in structural and geotechnical engineering during the B.E. Civil Engineering programme.",
          "Received the 2010 Gold Medal for securing the highest marks in Geotechnical Engineering.",
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Indian Institute of Technology Madras, India",
        description:
          "Ph.D. in Civil Engineering, Division of Structural Engineering, 2014 - 2020. Advisor: Prof. Dr. S.T.G. Raghukanth.",
      },
      {
        name: "Visvesvaraya National Institute of Technology Nagpur, India",
        description:
          "M.Tech. in Structural Dynamics and Earthquake Engineering, Department of Applied Mechanics, 2012 - 2014. Advisor: Prof. Dr. O.R. Jaiswal.",
      },
      {
        name: "Shri G.S. Institute of Technology and Science, Indore, India",
        description: "B.E. in Civil Engineering, 2007 - 2011.",
      },
    ],
  },
  technical: {
    display: true,
    title: "Research and Technical Skills",
    skills: [
      {
        title: "Rotational Seismology and Ground-Motion Modeling",
        description:
          "Developing simulation frameworks for translational and rotational ground motions, including the effects of heterogeneity, strain, and structural response.",
        tags: [
          { name: "Rotational Seismology" },
          { name: "Ground Motion Simulation" },
          { name: "Seismic Wave Propagation" },
          { name: "Earthquake-Resistant Design" },
        ],
        images: [],
      },
      {
        title: "Structural Dynamics and Structural Health Monitoring",
        description:
          "Linking civil engineering structures with recorded motion through modal analysis, 6-component measurements, and vibration-based condition assessment.",
        tags: [
          { name: "Structural Dynamics" },
          { name: "6C Measurements" },
          { name: "Operational Modal Analysis" },
          { name: "Structural Health Monitoring" },
        ],
        images: [],
      },
      {
        title: "Analytical and Numerical Simulation",
        description:
          "Using analytical formulations and numerical methods to model complex Earth media, reduced micropolar continua, and seismic response under static and dynamic loading.",
        tags: [
          { name: "Reduced Micropolar Theory" },
          { name: "Finite Element Modeling" },
          { name: "Spectral Element Methods" },
          { name: "SPECFEM" },
          { name: "MATLAB" },
        ],
        images: [],
      },
      {
        title: "Research Communication, Review, and Mentoring",
        description:
          "Supervising student research, teaching computational seismology concepts, reviewing manuscripts, and organizing scientific meetings and short courses.",
        tags: [
          { name: "Student Supervision" },
          { name: "Scientific Writing" },
          { name: "Peer Review" },
          { name: "Workshop Organization" },
          { name: "LaTeX" },
        ],
        images: [],
      },
    ],
  },
  coordination: {
    display: true,
    title: "Leadership, Service, and Mentoring",
    items: [
      {
        title: "Independent DFG Research Project",
        timeframe: "2024 - 2027",
        points: [
          "Leads the HERS project funded through an individual research grant from the Deutsche Forschungsgemeinschaft.",
          "Defines research questions, simulation strategy, publication direction, and interdisciplinary links between rotational seismology and civil engineering design.",
        ],
      },
      {
        title: "Teaching and Student Supervision",
        timeframe: "University of Hamburg / IIT Madras / VNIT",
        points: [
          "Co-supervises M.Sc. and B.Sc. thesis work at the University of Hamburg on 6C ground-motion data, wind-turbine structural monitoring, and seismic-gradient simulation.",
          "Taught SPECFEM in a SPIN-ITN short course on computational seismology and supported tutorials, assignments, examinations, and project supervision across civil engineering subjects.",
        ],
      },
      {
        title: "Scientific Service and Community Building",
        timeframe: "2024 - 2026",
        points: [
          "Serves as a reviewer for Geophysical Journal International and Seismica, and as a reviewer on the University of Hamburg Ideas and Venture Fund panel.",
          "Co-organized the AG-Seismologie 2024 Conference at the University of Hamburg and contributed to SPIN-ITN short courses and workshops for Ph.D. researchers and external candidates.",
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: `Writing - ${person.name}`,
  description: `Articles and notes by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Selected Research Work - ${person.name}`,
  description: `Research case studies in rotational seismology, earthquake engineering, and structural monitoring by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery - ${person.name}`,
  description: `Selected images from ${person.name}'s portfolio`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Gallery image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Gallery image",
      orientation: "vertical",
    },
  ],
};

const travel: Travel = {
  path: "/travel",
  label: "Travel",
  title: `Travel - ${person.name}`,
  description: `World map and travel gallery featuring places visited by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery, travel };
