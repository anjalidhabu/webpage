import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Rushikesh",
  lastName: "Amrutsamanvar",
  name: `Rushikesh Amrutsamanvar`,
  role: "Data Scientist | Geospatial Analytics | Urban Mobility Research",
  avatar: "/images/RBD_1.jpg",
  email: "rushikesh.amrut@gmail.com",
  location: "Europe/Berlin",
  languages: ["English [C2]", "German [B2]", "Marathi [Native]", "Hindi [Native]"],
  hardSkills: [
    "Python",
    "GeoPandas",
    "Pandas",
    "scikit-learn",
    "MATLAB",
    "R",
    "SPSS",
    "QGIS",
    "VISSIM",
  ],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dr-rushikesh-amrutsamanvar-30849349/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
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
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Selene, a design engineer at{" "}
      <Text as="span" size="xl" weight="strong">
        ONCE UI
      </Text>
      , where I craft intuitive <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text as="p">
          I build predictive models, geospatial analytics workflows, and decision-support tools that
          turn complex mobility and urban data into actionable insights for research, policy, and
          planning.
        </Text>
        <Text as="p">
          With 8+ years of experience across data science, transportation systems, and urban
          analytics, I specialize in statistical modeling, carbon-emissions analysis, and
          large-scale geospatial data processing. My work combines research depth with practical
          implementation in Python, R, SQL, and domain-specific tools to support evidence-based
          decisions.
        </Text>
      </>
    ),
  },
  strengths: {
    display: true,
    title: "Strengths & Core Competencies",
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
    items: [
      "Python",
      "GeoPandas",
      "Pandas",
      "scikit-learn",
      "MATLAB",
      "R",
      "SPSS",
      "QGIS",
      "VISSIM",
    ],
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
            Designed and taught business-focused courses and hands-on sessions in statistics, AI,
            and machine learning for diverse student cohorts.
          </>,
          <>
            Contributed to curriculum design with a strong emphasis on real-world data
            interpretation and achieved an average student feedback rating of 4.8/5.
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
            Built scenario-based carbon-emissions models across 45 global cities to support travel
            demand management and transport investment decisions.
          </>,
          <>
            Processed and integrated complex geospatial datasets with more than 10 million data
            points using Python, GeoPandas, OSMnx, OpenStreetMap, and QGIS.
          </>,
          <>
            Automated end-to-end data processing, visualization, and modeling workflows in Python
            and R, improving analytical efficiency by 40%.
          </>,
          <>
            Developed a comparative emissions database for 45 cities and collaborated with
            interdisciplinary teams on publications and research proposals.
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
            Developed statistical, mathematical, and machine learning models to explain
            motorcycle-navigation behavior at a microscopic level.
          </>,
          <>
            Collected, curated, and analyzed large-scale traffic datasets from fixed and mobile
            sensors, then automated processing and modeling workflows in MATLAB and R.
          </>,
          <>
            Benchmarked methods including Random Forest, XGBoost, and neural networks for real-world
            class-imbalance problems in transportation research.
          </>,
          <>
            Co-developed an image-based traffic data extraction tool that outperformed competing
            solutions by 500% and contributed to more than 10 research publications.
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
            Developed field data-collection protocols to evaluate travel-time reliability on Indian
            urban roads.
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
            Building predictive models and robust analytics workflows across structured, spatial,
            and sensor-based datasets.
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
            Analyzing travel behavior, road networks, and city-scale mobility systems through
            geospatial data engineering and spatial analysis.
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
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
