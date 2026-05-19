import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rushikesh",
  lastName: "Amrut",
  name: "Dr. Rushikesh Amrut",
  role: "Data Scientist & Researcher",
  avatar: "/images/RBD_1.jpg",
  email: "rushikesh.amrut@gmail.com",
  location: "Europe/Berlin",
  languages: ["English [C2]", "German [B2]", "Marathi [Native]", "Hindi [Native]"],
  hardSkills: ["Python", "GeoPandas", "Pandas", "scikit-learn", "MATLAB", "R", "SPSS", "QGIS"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Insights on data science, urban systems, and transportation analytics.</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dr-rushikesh-amrutsamanvar-30849349/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Turning mobility data into actionable urban insights</>,
  featured: {
    display: false,
    title: <>Featured work</>,
    href: "/work",
  },
  subline: (
    <>
      I build predictive models, geospatial analytics pipelines, and decision-support frameworks for
      transportation and urban systems. With 8+ years of research and applied data science
      experience, I focus on translating large-scale mobility data into practical insights for
      policy, planning, and operations.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Germany`,
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
          I am a data scientist and researcher with 8+ years of experience in machine learning,
          statistics, and large-scale data analysis, with a strong specialization in transportation
          systems and urban analytics.
        </Text>
        <Text as="p">
          My work spans predictive modeling, geospatial data processing, carbon-emission analysis,
          and decision-support tools for policymakers and planners. I enjoy combining rigorous
          research with practical implementation in Python, R, SQL, and domain-specific analytics
          tools.
        </Text>
      </>
    ),
  },
  strengths: {
    display: true,
    title: "Core Competencies",
    items: [
      "Statistical Analysis",
      "Predictive Modeling",
      "Transportation Systems Modeling",
      "Urban Mobility Analytics",
      "Geospatial Analytics",
      "Decision-Support Frameworks",
    ],
  },
  toolkit: {
    display: true,
    title: "Toolkit",
    items: ["Python", "GeoPandas", "Pandas", "scikit-learn", "MATLAB", "R", "SPSS", "QGIS"],
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "International School of Management, Hamburg",
        timeframe: "01/2025 - Present",
        role: "Lecturer",
        achievements: [
          <>
            Teach and design business-focused courses and hands-on practical sessions covering
            statistics, AI, and machine learning applications.
          </>,
          <>
            Contributed to curriculum design with an emphasis on real-world data interpretation and
            received an average student feedback rating of 4.8/5.
          </>,
        ],
        images: [],
      },
      {
        company: "Technische Universitat Dresden, Germany",
        timeframe: "08/2022 - 08/2024",
        role: "Postdoctoral Research Associate, Chair of Transport Modeling and Simulation",
        achievements: [
          <>
            Modeled carbon-emission sensitivity across global cities to support travel demand
            management and transport investment decisions.
          </>,
          <>
            Processed complex geospatial datasets with more than 10 million data points using
            Python, GeoPandas, OSMnx, OpenStreetMap, and QGIS.
          </>,
          <>
            Automated end-to-end data processing, visualization, and model-building pipelines in
            Python and R, improving efficiency by 40%.
          </>,
          <>
            Built a scenario-based emissions database for 45 global cities and collaborated with an
            interdisciplinary team on research grants and publications.
          </>,
        ],
        images: [],
      },
      {
        company: "Indian Institute of Technology Madras, India",
        timeframe: "07/2013 - 03/2021",
        role: "Doctoral Researcher, Department of Civil Engineering",
        achievements: [
          <>
            Developed statistical, mathematical, and machine learning models to capture
            motorcycle-navigation behavior at a microscopic level.
          </>,
          <>
            Collected, curated, and analyzed large-scale traffic datasets from fixed and mobile
            sensors, then automated processing and modeling workflows in MATLAB and R.
          </>,
          <>
            Benchmarked statistical and ML approaches including Random Forest, XGBoost, and ANN for
            real-world class-imbalance problems.
          </>,
          <>
            Co-developed an image-processing traffic data extraction tool that outperformed
            competing solutions by 500%, contributing to 10+ research publications.
          </>,
        ],
        images: [],
      },
      {
        company: "Central Road Research Institute, New Delhi, India",
        timeframe: "06/2012 - 06/2013",
        role: "Visiting Researcher",
        achievements: [
          <>
            Performed statistical analysis and predictive modeling on traffic datasets using SPSS
            and MATLAB.
          </>,
          <>
            Developed data-collection protocols to evaluate travel-time reliability on Indian urban
            roads.
          </>,
          <>
            Managed a team of 10 master&apos;s students across surveys in 5 Indian cities and
            contributed to the first Indian Highway Capacity Manual.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Indian Institute of Technology Madras, India",
        description: <>Ph.D. in Transportation Systems Engineering, 2013 - 2021.</>,
      },
      {
        name: "NIT Surat, India",
        description: <>M.Tech. in Transportation Engineering and Planning, 2011 - 2013.</>,
      },
      {
        name: "Shivaji University, India",
        description: <>B.E. in Civil Engineering, 2005 - 2009.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming and Data Science",
        description: (
          <>
            Building robust analytics workflows, predictive models, and research-grade data
            pipelines across structured, spatial, and sensor-based datasets.
          </>
        ),
        tags: [
          { name: "Python" },
          { name: "SQL" },
          { name: "R" },
          { name: "MATLAB" },
          { name: "scikit-learn" },
          { name: "NumPy" },
          { name: "pandas" },
        ],
        images: [],
      },
      {
        title: "Geospatial and Urban Analytics",
        description: (
          <>
            Analyzing travel behavior, road networks, and city-scale mobility systems using
            geospatial data engineering and mapping tools.
          </>
        ),
        tags: [
          { name: "GeoPandas" },
          { name: "OSMnx" },
          { name: "OpenStreetMap" },
          { name: "QGIS" },
        ],
        images: [],
      },
      {
        title: "Visualization and Domain Tools",
        description: (
          <>
            Creating interpretable dashboards, simulation studies, and evidence-backed outputs for
            transport planning, policy, and academic research.
          </>
        ),
        tags: [
          { name: "Power BI" },
          { name: "VISSIM" },
          { name: "SPSS" },
          { name: "Git" },
          { name: "LaTeX" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing on data science, mobility, and urban systems",
  description: `Articles and notes by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Selected research and analytics projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
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

export { person, social, newsletter, home, about, blog, work, gallery };
