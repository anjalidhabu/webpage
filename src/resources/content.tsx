import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Travel, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anjali",
  lastName: "Dhabu",
  name: "Dr. Anjali Dhabu",
  role: "Postdoctoral Researcher and Principal Investigator in Rotational Seismology and Earthquake Engineering",
  avatar: "/images/AD1.jpg",
  email: "anjali.dhabu@uni-hamburg.de",
  location: "Europe/Berlin",
  displayLocation: "Hamburg, Germany",
  hardSkills: [
    "Computational Seismology",
    "Seismic Wave Propagation",
    "Earthquake Engineering",
    "Rotational Seismology",
    "Structural Dynamics",
    "Finite Element Modeling",
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
    icon: "university",
    link: "https://www.geo.uni-hamburg.de/en/geophysik/personen/dhabu-anjali.html",
    essential: true,
  },
  {
    name: "ORCID",
    icon: "orcid",
    link: "https://orcid.org/0000-0002-2913-3013",
    essential: true,
  },
  {
    name: "Google Scholar",
    icon: "googleScholar",
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
  title: `${person.name} - Research Profile`,
  description: `Research profile of ${person.name}, ${person.role} at the University of Hamburg`,
  headline: "Advancing engineering seismology with next-generation computational modeling.",
  featured: {
    display: false,
    title: "Featured research",
    href: "/publications",
  },
  subline:
    <>I am a civil engineer working at the intersection of seismology and structural engineering. I use <strong style={{ color: "rgb(224, 220, 23)" }}>analytical modeling and numerical simulations</strong> to reveal how complex Earth structure shapes rotations, strains, and translations in seismic wavefields. My work bridges earthquake physics with structural resilience and six-component ground-motion analysis.</>
    ,
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
          I am a civil engineer and postdoctoral researcher exploring earthquake motion beyond
          translation. My work brings together structural dynamics, earthquake engineering, seismic
          wave propagation, and rotational seismology to understand how complex ground motions
          interact with the built environment.
        </Text>
        <Text as="p">
          At the University of Hamburg, I lead the DFG-funded HERS project, Heterogeneities and
          their Effect on Rotational Seismology. HERS develops analytical and numerical approaches
          for studying rotations, strains, and translations in heterogeneous Earth media, with
          applications in earthquake-resistant design and structural health monitoring.
        </Text>
        <Text as="p">
          My research background includes reduced micropolar theory, translational and rotational
          ground-motion simulation, six-component sensing, operational modal analysis of civil
          engineering structures, and seismic applications in both Earth and planetary contexts.
        </Text>
      </>
    ),
  },
  strengths: {
    display: true,
    title: "Research Interests",
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
    note: "References available on request.",
  },
  work: {
    display: true,
    title: "Research Positions",
    experiences: [
      {
        company: "University of Hamburg, Institute of Geophysics",
        logo: "/images/logos/UHH.svg",
        timeframe: "04/2024 - 03/2027",
        role: "Principal Investigator (PI), DFG Individual Research Grant - HERS",
        achievements: [
          "Leads the DFG-funded project Heterogeneities and their Effect on Rotational Seismology (HERS), focused on how complex subsurface media influence simulated rotational ground motions and strains.",
          "Develops heterogeneous finite-element and numerical simulation approaches for regional rotational ground-motion modeling, connecting seismology with earthquake engineering design questions.",
          "Builds on more than a decade of civil engineering and engineering seismology research to translate theoretical ground-motion models into practical structural resilience questions.",
        ],
        images: [],
      },
      {
        company: "University of Hamburg, Institute of Geophysics",
        logo: "/images/logos/UHH.svg",
        timeframe: "07/2023 - 03/2024",
        role: "Postdoctoral Researcher, ErUM-WAVE Project",
        achievements: [
          "Contributed to the ErUM-WAVE project on anticipation of three-dimensional wavefields under the supervision of Prof. Dr. Céline Hadziioannou.",
          "Worked at the interface of computational seismology, wavefield simulation, and observation-driven understanding of complex seismic motion.",
          "Extended research on rotational and translational ground motions toward coupled simulation methods for teleseismic and regional seismic applications.",
        ],
        images: [],
      },
      {
        company: "University of Hamburg, Institute of Geophysics",
        logo: "/images/logos/UHH.svg",
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
        logo: "/images/logos/IIT_Madras_Logo.svg",
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
        logo: "/images/logos/IIT_Madras_Logo.svg",
        description: (
          <>
            Ph.D. in Civil Engineering
            <br />
            Division of Structural Engineering
            <br />
            2014 - 2020
          </>
        ),
      },
      {
        name: "Visvesvaraya National Institute of Technology Nagpur, India",
        logo: "/images/logos/VNIT_logo.jpeg",
        description: (
          <>
            M.Tech. in Structural Dynamics and Earthquake Engineering
            <br />
            Department of Applied Mechanics
            <br />
            2012 - 2014
          </>
        ),
      },
      {
        name: "Shri G.S. Institute of Technology and Science, Indore, India",
        logo: "/images/logos/SGSITS_Indore.png",
        description: (
          <>
            B.E. in Civil Engineering
            <br />
            2007 - 2011
          </>
        ),
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
        timeframe: "University of Hamburg / IIT Madras",
        points: [
          // Duplicate a <li> below for each student, then replace the bracketed fields.
          <div key="supervision-hamburg">
            <strong>University of Hamburg</strong>
            <ul>
              <li> Ann Joseph [M.Sc.] — ‘Development of a 3D model for Europe to simulate rotational ground motion’ — [2026]</li>
              <li> Nicolas Matthießen [B.Sc.] — ‘Numerical simulation of seismic gradients and their response to heterogeneity in the
Earth medium’ — [2025]</li>
              <li> Laurin Müller [B.Sc.] — ‘Structural Health Monitoring of wind turbines using 6C ground motion data’ — [2024]</li>
            </ul>
          </div>,
          <div key="supervision-iit-madras">
            <strong>IIT Madras</strong>
            <ul>
              <li>Kandarp Pathak [Dual-degree M.Tech.] — [Co-supervised with Dr. S. T. G. Raghukanth] — [2019]</li>
              <li>Akhil Manikala [Dual-degree M.Tech.] — [Co-supervised with Dr. S. T. G. Raghukanth] — [2018]</li>
              <li>Jaifer Muhammed [M.Tech.] — [Co-supervised with Dr. S. T. G. Raghukanth] — [2017]</li>
              <li>Rakesh Borase [M.Tech.] — [Co-supervised with Dr. S. T. G. Raghukanth] — [2016]</li>
            </ul>
          </div>,
        ],
      },
      {
        title: "Invited Talks and Workshop Lectures",
        points: [
          // Duplicate a <li> for each talk or lecture and replace the bracketed fields.
          <div key="invited-talks">
            <strong>Invited Talks</strong>
            <ul>
              <li>
                ‘Seismic monitoring of infrastructures’ — [15th Munich Earth Skience School] — [2025]
              </li>
              <li>
                ‘Applications of Rotational Sensing in Analyzing Structural Vibrations and
                their Modal Analyses’ — [Keynote speech at the 18th World Conference in Earthquake
                Engineering (WCEE), Milan, Italy] — [2024] — Co-authors: F. Bernauer,
                P. Bonkowski, A. Dhabu, Z. Zembaty.
              </li>
              <li>‘Simulation of Translational and Rotational Ground Motions’ — [SPIN-ITN
                workshop: Physics and Dynamic Processes, Carcans, France] — [2022]</li>
            </ul>
          </div>,
          <div key="workshop-lectures">
            <strong>Workshop Lectures</strong>
            <ul>
              <li>‘SPECFEM’ — [SPIN-ITN short course on computational seismology] — [2021]</li>
            </ul>
          </div>,
        ],
      },
      {
        title: "Scientific Service and Community Building",
        timeframe: "2024 - 2026",
        points: [
          // Add or edit a <li> below for each journal, panel, or community activity.
          <div key="journal-reviewing">
            <strong>Journal Reviewing</strong>
            <ul>
              <li>Geophysical Journal International — Peer reviewer.</li>
              <li>Seismica — Peer reviewer.</li>
            </ul>
          </div>,
          <div key="funding-panel-reviewing">
            <strong>Funding Panel Reviewing</strong>
            <ul>
              <li>University of Hamburg Ideas and Venture Fund — Panel reviewer.</li>
            </ul>
          </div>,
          <div key="community-building">
            <strong>Conference Organization and Community Building</strong>
            <ul>
              <li>AG-Seismologie 2024 Conference — Co-organizer, University of Hamburg.</li>
              <li>
                SPIN-ITN short courses and workshops — Contributed to training for Ph.D.
                researchers and external candidates.
              </li>
            </ul>
          </div>,
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
