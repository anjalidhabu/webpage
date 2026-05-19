import { person } from "@/resources";
import type { Publications } from "@/types";

type PublicationInsight = NonNullable<Publications["groups"][number]["items"][number]["insights"]>;

const publicationInsights: Record<string, PublicationInsight> = {
  "layered-reduced-micropolar-medium": {
    contribution:
      "Developed a layered reduced-micropolar framework for coupled translational and rotational seismic wave propagation.",
    role: "First author; led the theoretical formulation, modeling strategy, and interpretation.",
    keyFinding:
      "Layering and micro-rotational effects can be modeled together to study rotational components in complex media.",
    whyItMatters: "It anchors the independent research line on rotational ground-motion physics.",
  },
  "homogeneous-reduced-micropolar-half-space": {
    contribution:
      "Built a simulation route for translational and rotational ground motions in a reduced-micropolar half-space.",
    role: "First author; developed the model implementation and linked the results to earthquake ground-motion questions.",
    keyFinding:
      "Reduced-micropolar models can generate rotational and translational ground-motion fields within one framework.",
    whyItMatters: "It bridges theory and computation for future 6C earthquake simulations.",
  },
  "fundamental-solutions-half-space": {
    contribution:
      "Derived fundamental solutions for static and dynamic loading in a homogeneous reduced-micropolar half-space.",
    role: "First author; carried out the analytical development and engineering interpretation.",
    keyFinding:
      "The solutions provide benchmark responses for reduced-micropolar media under idealized loading.",
    whyItMatters:
      "It gives the mathematical base needed before studying layered and heterogeneous Earth models.",
  },
  "reduced-micropolar-iwgors": {
    contribution:
      "Positioned reduced-micropolar theory as an alternative way to represent Earth media for rotational ground-motion simulation.",
    role: "First author and presenter; communicated the doctoral research direction to the rotational seismology community.",
    keyFinding:
      "Rotational effects can be treated as part of the medium model instead of only as derived motion components.",
    whyItMatters:
      "It shows continuity between doctoral theory and the current independent 6C research programme.",
  },
  "heterogeneities-rotational-ground-motions": {
    contribution:
      "Tests how subsurface heterogeneities influence simulated rotations, strains, and earthquake wavefields.",
    role: "Project lead for the DFG HERS direction; coordinating model design and publication development.",
    keyFinding:
      "The work is designed to identify which heterogeneity parameters most strongly affect rotational and strain fields.",
    whyItMatters:
      "It turns earlier theory into a proposal-ready research line on complex media and 6C ground motion.",
  },
  "himalayan-topography-ground-motions": {
    contribution:
      "Quantified how Himalayan topography modifies earthquake ground motions through numerical modeling.",
    role: "First author; designed the simulation study and led analysis of topographic effects.",
    keyFinding: "Mountainous terrain can meaningfully change simulated ground-motion patterns.",
    whyItMatters:
      "It connects wave-propagation modeling with regionally relevant seismic hazard questions.",
  },
  "coupled-teleseismic-ground-motion-simulation": {
    contribution:
      "Develops a coupled technique for simulating teleseismic ground motions in regional models.",
    role: "Co-author; contributes ground-motion and wave-simulation perspective to the collaborative manuscript.",
    keyFinding:
      "The method aims to connect teleseismic wavefields with local and regional ground-motion simulation.",
    whyItMatters:
      "It expands the research programme from local earthquake loading to broader wavefield modeling.",
  },
  "hamburg-subsurface-teleseismic-simulation": {
    contribution:
      "Uses teleseismic wave simulation to support high-resolution subsurface modeling in Hamburg.",
    role: "Co-author; contributes simulation interpretation and links to local ground-motion questions.",
    keyFinding:
      "Teleseismic simulations can help constrain subsurface structure beneath an urban research setting.",
    whyItMatters:
      "It supports the site and structure context needed for future 6C monitoring studies.",
  },
  "himalayan-topography-ajg-conference": {
    contribution:
      "Presented the conference-stage development of Himalayan topography effects on strong ground motions.",
    role: "First author; led the study design and dissemination.",
    keyFinding:
      "Topographic amplification and scattering are important ingredients in mountain-region ground-motion studies.",
    whyItMatters:
      "It shows early continuity in connecting numerical modeling with seismic hazard problems.",
  },
  "topography-ground-motions-sec": {
    contribution:
      "Introduced topographic effects on earthquake ground motions to a structural engineering audience.",
    role: "First author; developed the study with collaborators and framed the engineering relevance.",
    keyFinding: "Terrain geometry can be an important control on simulated earthquake response.",
    whyItMatters:
      "It marks the start of a long-term bridge between seismology and structural engineering.",
  },
  "rotational-ground-motions-bridge-design": {
    contribution:
      "Connected rotational ground-motion characterization with earthquake-resistant bridge design.",
    role: "Lead author; integrated seismological modeling with structural engineering interpretation.",
    keyFinding:
      "Rotational components can change how bridge response and design demand are interpreted.",
    whyItMatters:
      "It is the clearest evidence of the 6C seismology to infrastructure resilience research identity.",
  },
  "wind-turbine-6c-modal-analysis": {
    contribution:
      "Applies 6-component operational modal analysis to wind turbines for damage detection.",
    role: "Co-author; contributes rotational sensing and structural-response expertise.",
    keyFinding:
      "Six-component measurements can enrich modal analysis beyond conventional translational observations.",
    whyItMatters:
      "It extends the 6C monitoring programme from earthquake response toward renewable-energy infrastructure.",
  },
  "rotational-sensing-structural-vibrations-keynote": {
    contribution:
      "Synthesized applications of rotational sensing for structural vibration and modal analysis.",
    role: "Co-author; contributed expertise on rotations, structural response, and seismological measurement.",
    keyFinding:
      "Rotational sensing adds information that can sharpen interpretation of structural vibrations.",
    whyItMatters: "It demonstrates visibility of the work in the earthquake-engineering community.",
  },
  "civil-structures-6c-monitoring-agu": {
    contribution:
      "Presented 6C seismic monitoring as a tool for observing civil engineering structures.",
    role: "Co-author; contributed rotational ground-motion and structural monitoring perspective.",
    keyFinding:
      "Combining translational and rotational measurements can improve interpretation of structural motion.",
    whyItMatters:
      "It strengthens the collaborative pathway from seismology instrumentation to infrastructure monitoring.",
  },
  "rotations-material-damage-egu": {
    contribution:
      "Examined how rotational motions can help understand material damage in civil engineering structures.",
    role: "First author; led the framing and dissemination of the damage-focused application.",
    keyFinding:
      "Rotational motion may provide diagnostic information about structural behavior and damage processes.",
    whyItMatters:
      "It makes the structural-resilience case for six-component measurements explicit.",
  },
  "strong-motion-generation-extreme-value": {
    contribution:
      "Used extreme value theory to characterize strong-motion generation regions of earthquake slip.",
    role: "First author; led the statistical characterization and seismological interpretation.",
    keyFinding:
      "Extreme-value methods can help isolate slip regions most relevant to strong ground motion.",
    whyItMatters:
      "It broadens the profile from wave propagation to source processes that control damaging motions.",
  },
  "lunar-boulder-avalanches-moonquake": {
    contribution: "Linked lunar scarps and boulder avalanches with a shallow moonquake event.",
    role: "Co-author; contributed earthquake-source and ground-motion expertise to the planetary study.",
    keyFinding:
      "Surface geomorphology can preserve evidence of recent seismic activity on the Moon.",
    whyItMatters:
      "It shows the transferability of seismological thinking beyond terrestrial earthquake engineering.",
  },
  "valles-marineris-recent-seismicity": {
    contribution:
      "Investigated recent Martian seismicity using young faults, landslides, boulder falls, and possible mud volcanoes.",
    role: "Co-author; contributed seismicity and geophysical interpretation within the planetary collaboration.",
    keyFinding:
      "Geomorphic evidence points to active or recent tectonic processes in Valles Marineris.",
    whyItMatters:
      "It adds breadth in planetary seismology while keeping source characterization as the common thread.",
  },
};

const publications: Publications = {
  path: "/publications",
  label: "Publications",
  title: `Publications - ${person.name}`,
  description: `Journal articles, manuscripts, and conference contributions by ${person.name}`,
  intro:
    "Research output grouped by the scientific questions that connect my publications: rotational ground-motion theory, seismic wave simulation, structural response, 6-component monitoring, and planetary seismology.",
  groups: [
    {
      id: "rotational-ground-motion-theory",
      title: "Rotational Ground-Motion Theory",
      description:
        "Analytical and numerical work on reduced micropolar media, rotational ground motions, strains, and fundamental solutions for earthquake loading.",
      focus: "Theory, wave propagation, reduced micropolar media",
      items: [
        {
          id: "layered-reduced-micropolar-medium",
          authors: "Dhabu, A.C., Singla, V.K. and Raghukanth, S.T.G.",
          title: "Seismic wave propagation through layered reduced micropolar medium.",
          venue: "Journal of Geophysical Research: Solid Earth.",
          details: "126, e2020JB020931, 2021.",
          year: "2021",
          quartile: "Q1",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Reduced micropolar theory", "Layered media", "Wave propagation"],
          insights: publicationInsights["layered-reduced-micropolar-medium"],
          href: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2020JB020931",
          doi: "10.1029/2020JB020931",
          openAlexId: "W3204044099",
        },
        {
          id: "homogeneous-reduced-micropolar-half-space",
          authors: "Dhabu, A.C. and Raghukanth, S.T.G.",
          title:
            "Translational and rotational ground motion simulations in homogeneous reduced micropolar half-space.",
          venue: "Journal of Seismology.",
          details: "25, 599-623, 2021.",
          year: "2021",
          quartile: "Q2",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Rotational ground motion", "Half-space", "Simulation"],
          insights: publicationInsights["homogeneous-reduced-micropolar-half-space"],
          href: "https://doi.org/10.1007/s10950-021-09983-2",
          doi: "10.1007/s10950-021-09983-2",
          openAlexId: "W3148373636",
        },
        {
          id: "fundamental-solutions-half-space",
          authors: "Dhabu, A.C. and Raghukanth, S.T.G.",
          title:
            "Fundamental solutions to static and dynamic loads for homogeneous reduced micropolar half-space.",
          venue: "Pure and Applied Geophysics.",
          details: "176(11), 4881-4905, 2019.",
          year: "2019",
          quartile: "Q2",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Fundamental solutions", "Static loads", "Dynamic loads"],
          insights: publicationInsights["fundamental-solutions-half-space"],
          href: "https://doi.org/10.1007/s00024-019-02225-0",
          doi: "10.1007/s00024-019-02225-0",
          openAlexId: "W2948747757",
        },
        {
          id: "reduced-micropolar-iwgors",
          authors: "Dhabu, A.C. and Raghukanth, S.T.G.",
          title:
            "Reduced micropolar theory: An alternative to model the Earth medium and simulate earthquake ground motions?",
          venue: "6th Conference of the International Working Group on Rotational Seismology.",
          details: "Paris, France, 2022.",
          year: "2022",
          type: "Conference",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Rotational seismology", "Earth medium", "Ground motions"],
          insights: publicationInsights["reduced-micropolar-iwgors"],
        },
        {
          id: "heterogeneities-rotational-ground-motions",
          authors: "Dhabu, A.C., Matthiessen, N. and Hadziioannou, C.",
          title:
            "Parametric analysis of heterogeneities and their effect on simulated rotational ground motions and strains due to earthquakes.",
          venue: "Manuscript in preparation.",
          details: "Planned submission to Bulletin of the Seismological Society of America.",
          year: "In preparation",
          type: "Manuscript",
          status: "In preparation",
          institutions: ["University of Hamburg"],
          tags: ["Heterogeneity", "Rotations", "Strain"],
          insights: publicationInsights["heterogeneities-rotational-ground-motions"],
        },
      ],
    },
    {
      id: "simulation-topography-subsurface",
      title: "Simulation, Topography, and Subsurface Structure",
      description:
        "Studies that use numerical simulation and site/topography effects to understand earthquake ground motions across regional and teleseismic scales.",
      focus: "Ground-motion simulation, topography, subsurface models",
      items: [
        {
          id: "himalayan-topography-ground-motions",
          authors: "Dhabu, A.C. and Raghukanth, S.T.G.",
          title: "Influence of Himalayan topography on earthquake ground motions.",
          venue: "Arabian Journal of Geosciences.",
          details: "14, article 1931, 2021.",
          year: "2021",
          quartile: "Q2",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Himalayan topography", "Ground motion", "Numerical modeling"],
          insights: publicationInsights["himalayan-topography-ground-motions"],
          href: "https://doi.org/10.1007/s12517-021-08111-1",
          doi: "10.1007/s12517-021-08111-1",
          openAlexId: "W3198599964",
        },
        {
          id: "coupled-teleseismic-ground-motion-simulation",
          authors: "Hejazi Nooghabi, A., Dhabu, A.C., Montellier, V. and Hadziioannou, C.",
          title:
            "Development of coupled ground motion simulation technique for teleseismic events.",
          venue: "Manuscript in preparation.",
          details: "Planned submission to Geophysical Journal International.",
          year: "In preparation",
          type: "Manuscript",
          status: "In preparation",
          institutions: ["University of Hamburg"],
          tags: ["Teleseismic events", "Coupled simulation", "Wave-fields"],
          insights: publicationInsights["coupled-teleseismic-ground-motion-simulation"],
        },
        {
          id: "hamburg-subsurface-teleseismic-simulation",
          authors: "Hejazi Nooghabi, A., Dhabu, A. and Hadziioannou, C.",
          title:
            "Developing a high-resolution subsurface model through teleseismic wave simulation in Hamburg.",
          venue: "EGU General Assembly.",
          details: "Vienna, Austria, EGU25-18687, 2025.",
          year: "2025",
          type: "Conference",
          institutions: ["University of Hamburg"],
          tags: ["Subsurface model", "Hamburg", "Teleseismic simulation"],
          insights: publicationInsights["hamburg-subsurface-teleseismic-simulation"],
          href: "https://doi.org/10.5194/egusphere-egu25-18687",
          doi: "10.5194/egusphere-egu25-18687",
          openAlexId: "W4408467426",
        },
        {
          id: "himalayan-topography-ajg-conference",
          authors: "Dhabu, A.C. and Raghukanth, S.T.G.",
          title: "Influence of Himalayan topography on earthquake strong ground motions.",
          venue: "1st Conference of the Arabian Journal of Geosciences.",
          details: "Hammamet, Tunisia, 2018.",
          year: "2018",
          type: "Conference",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Topography", "Strong ground motion", "Himalaya"],
          insights: publicationInsights["himalayan-topography-ajg-conference"],
          href: "https://doi.org/10.1007/978-3-030-01656-2_39",
          doi: "10.1007/978-3-030-01656-2_39",
          openAlexId: "W2912078916",
        },
        {
          id: "topography-ground-motions-sec",
          authors: "Dhabu, A., Dhanya, J. and Raghukanth, S.T.G.",
          title: "Effect of topography on earthquake ground motions.",
          venue: "Structural Engineering Convention.",
          details: "Chennai, India, 2016.",
          year: "2016",
          type: "Conference",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Topographic effects", "Earthquake response", "Simulation"],
          insights: publicationInsights["topography-ground-motions-sec"],
          href: "https://doi.org/10.1007/978-981-13-0365-4_9",
          doi: "10.1007/978-981-13-0365-4_9",
          openAlexId: "W2886063726",
        },
      ],
    },
    {
      id: "structural-response-6c-monitoring",
      title: "Structural Response and 6C Monitoring",
      description:
        "Publications and presentations connecting rotational sensing, structural vibration, bridge response, and 6-component monitoring for civil engineering structures.",
      focus: "Earthquake engineering, 6C sensing, structural health monitoring",
      items: [
        {
          id: "rotational-ground-motions-bridge-design",
          authors:
            "Dhabu, A.C., Bernauer, F., Liao, C.M., Niederleithinger, E., Igel, H. and Hadziioannou, C.",
          title:
            "Characterizing rotational ground motions: Implications for earthquake-resistant design of bridge structures.",
          venue: "arXiv preprint.",
          details: "arXiv:2411.02203, 2024.",
          year: "2024",
          type: "Preprint",
          status: "Preprint",
          institutions: ["University of Hamburg"],
          tags: ["Bridge structures", "Earthquake-resistant design", "Rotations"],
          insights: publicationInsights["rotational-ground-motions-bridge-design"],
          href: "https://arxiv.org/abs/2411.02203",
          arxivId: "2411.02203",
        },
        {
          id: "wind-turbine-6c-modal-analysis",
          authors: "Muller, L., Dhabu, A., Bernauer, F., Donner, S., Bode, K. and Hadziioannou, C.",
          title: "6-Component operational modal analysis of wind turbines for damage detection.",
          venue:
            "13th International Conference on Structural Health Monitoring of Intelligent Infrastructure.",
          details: "Graz, Austria, 2025.",
          year: "2025",
          type: "Conference",
          institutions: ["University of Hamburg"],
          tags: ["6C measurements", "Wind turbines", "Damage detection"],
          insights: publicationInsights["wind-turbine-6c-modal-analysis"],
          href: "https://doi.org/10.3217/978-3-99161-057-1-120",
          doi: "10.3217/978-3-99161-057-1-120",
          openAlexId: "W7077908950",
        },
        {
          id: "rotational-sensing-structural-vibrations-keynote",
          authors: "Bernauer, F., Bonkowski, P., Dhabu, A. and Zembaty, Z.",
          title:
            "Applications of rotational sensing in analyzing structural vibrations and their modal analyses.",
          venue: "18th World Conference in Earthquake Engineering.",
          details: "Keynote contribution, Milan, Italy, 2024.",
          year: "2024",
          type: "Invited Talk",
          institutions: ["University of Hamburg"],
          tags: ["Rotational sensing", "Modal analysis", "Structural vibrations"],
          insights: publicationInsights["rotational-sensing-structural-vibrations-keynote"],
        },
        {
          id: "civil-structures-6c-monitoring-agu",
          authors:
            "Bernauer, F., Balaskas, G., Hadziioannou, C., Dhabu, A., Liao, C.M., Niederleithinger, E., Yuan, S., Wassermann, J. and Igel, H.",
          title: "Seismic monitoring of civil engineering structures with 6C measurements.",
          venue: "AGU Fall Meeting.",
          details: "Abstract S54C-06, 2023.",
          year: "2023",
          type: "Conference",
          institutions: ["University of Hamburg"],
          tags: ["Civil structures", "6C monitoring", "Seismic sensing"],
          insights: publicationInsights["civil-structures-6c-monitoring-agu"],
        },
        {
          id: "rotations-material-damage-egu",
          authors:
            "Dhabu, A., Bernauer, F., Liao, C.M., Hadziioannou, C., Igel, H. and Niederleithinger, E.",
          title:
            "Using rotational motions to understand material damage in civil engineering structure.",
          venue: "EGU General Assembly.",
          details: "Abstract EGU-8851, 2023.",
          year: "2023",
          type: "Conference",
          institutions: ["University of Hamburg"],
          tags: ["Material damage", "Rotational motion", "Civil engineering"],
          insights: publicationInsights["rotations-material-damage-egu"],
        },
      ],
    },
    {
      id: "planetary-source-characterization",
      title: "Planetary Seismology and Source Characterization",
      description:
        "Collaborative work on earthquake source characterization and seismicity on planetary bodies, linking strong-motion analysis with broader geophysical processes.",
      focus: "Strong-motion sources, lunar and Martian seismicity",
      items: [
        {
          id: "strong-motion-generation-extreme-value",
          authors: "Dhabu, A.C., Sugumar, S. and Raghukanth, S.T.G.",
          title:
            "Characterization of strong motion generation regions of earthquake slip using extreme value theory.",
          venue: "Pure and Applied Geophysics.",
          details: "176(8), 3567-3592, 2019.",
          year: "2019",
          quartile: "Q2",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Strong motion", "Earthquake slip", "Extreme value theory"],
          insights: publicationInsights["strong-motion-generation-extreme-value"],
          href: "https://doi.org/10.1007/s00024-019-02136-0",
          doi: "10.1007/s00024-019-02136-0",
          openAlexId: "W2938887213",
        },
        {
          id: "lunar-boulder-avalanches-moonquake",
          authors:
            "Kumar, P.S., Mohanty, R., Lakshmi, K.J.P., Raghukanth, S.T.G., Dhabu, A.C., Rajasekhar, R.P. and Menon, R.",
          title:
            "The seismically active lobate scarps and co-seismic lunar boulder avalanches triggered by 3rd January 1975 (Mw 4.1) shallow moonquake.",
          venue: "Geophysical Research Letters.",
          details: "46(14), 7972-7981, 2019.",
          year: "2019",
          quartile: "Q1",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Moonquake", "Lunar scarps", "Boulder avalanches"],
          insights: publicationInsights["lunar-boulder-avalanches-moonquake"],
          href: "https://doi.org/10.1029/2019GL083580",
          doi: "10.1029/2019GL083580",
          openAlexId: "W2961257836",
        },
        {
          id: "valles-marineris-recent-seismicity",
          authors:
            "Kumar, P.S., Krishna, N., Lakshmi, K.P., Raghukanth, S.T.G., Dhabu, A. and Platz, T.",
          title:
            "Recent seismicity in Valles Marineris, Mars: Insights from young faults, landslides, boulder falls and possible mudvolcanoes.",
          venue: "Earth and Planetary Science Letters.",
          details: "505, 51-64, 2019.",
          year: "2019",
          quartile: "Q1",
          type: "Journal",
          institutions: ["Indian Institute of Technology Madras"],
          tags: ["Mars", "Faults", "Landslides"],
          insights: publicationInsights["valles-marineris-recent-seismicity"],
          href: "https://doi.org/10.1016/j.epsl.2018.10.008",
          doi: "10.1016/j.epsl.2018.10.008",
          openAlexId: "W2898497778",
        },
      ],
    },
  ],
};

export { publications };
