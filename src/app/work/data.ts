export type ResearchVisionGroup = {
  id:
    | "wavefield-physics-theory"
    | "earth-sources"
    | "computational-modeling-tools"
    | "observables-data"
    | "structural-health-monitoring";
  title: string;
  detail: string;
};

export type ResearchTheme = {
  label: string;
  id: string;
  group: ResearchVisionGroup["id"];
  detail: string;
  image?: string;
};

export type AssociatedWorkSection = {
  id: ResearchTheme["id"];
  title: string;
  summary: string;
  projectSlugs: string[];
};

export type ResearchThemeLink = {
  id: ResearchTheme["id"];
  label: string;
  href: string;
};

export const researchVisionGroups: ResearchVisionGroup[] = [
  {
    id: "wavefield-physics-theory",
    title: "Wavefield Physics & Theory",
    detail:
      "Foundational theory for rotations, strains, wavefield gradients, and reduced micropolar continua.",
  },
  {
    id: "earth-sources",
    title: "Earth & Sources",
    detail:
      "Complex Earth structure, heterogeneity, finite-fault rupture, and strong-motion source processes.",
  },
  {
    id: "computational-modeling-tools",
    title: "Computational Modeling & Tools",
    detail:
      "SPECFEM, RegHyM, teleseismic-to-local workflows, and scalable simulation tools for realistic wavefields.",
  },
  {
    id: "observables-data",
    title: "Observables & Data",
    detail:
      "Six-component observations, rotations, strains, wavefield gradients, topographic datasets, planetary-surface evidence, and structural monitoring data.",
  },
  {
    id: "structural-health-monitoring",
    title: "Structural Health Monitoring",
    detail:
      "6C sensing, operational modal analysis, structural dynamics, and infrastructure-response interpretation.",
  },
];

export const researchThemes: ResearchTheme[] = [
  {
    label: "Analytical Modeling of the Medium of Wave Propagation",
    id: "analytical-medium-modeling",
    group: "wavefield-physics-theory",
    image: "/images/projects/research_themes/Analytical_Modeling.png",
    detail: "Develop reduced micropolar formulations, fundamental solutions, and benchmark theory.",
  },
  {
    label: "Effect of Heterogeneities on Rotational Seismology",
    id: "heterogeneities-rotational-seismology",
    image: "/images/projects/research_themes/hetro.png",
    group: "earth-sources",
    detail:
      "Model how layered and irregular Earth structures change translational, rotational, and strain fields.",
  },
  {
    label: "Influence of Topography on Earthquake Ground Motions",
    id: "topography-ground-motions",
    group: "observables-data",
    image: "/images/projects/research_themes/Topography.png",
    detail: "Study how terrain and regional structure reshape simulated earthquake ground motions.",
  },
  {
    label: "Planetary Seismology",
    id: "planetary-seismology",
    group: "observables-data",
    image: "/images/projects/research_themes/Planetory_Seismology02.png",
    detail:
      "Interpret lunar and Martian scarps, faults, landslides, boulder falls, and ground-motion models as evidence of recent planetary seismicity.",
  },
  {
    label: "Earthquake Source Processes and Strong-Motion Generation",
    id: "earthquake-source-strong-motion-generation",
    group: "earth-sources",
    image: "/images/projects/slip_model/slip_model_01.png",
    detail:
      "Use finite-source slip models and statistical extremes to identify source regions that control strong ground motion.",
  },
  {
    label: "Developing a High-Resolution Subsurface Model through Teleseismic Wave Simulation",
    id: "teleseismic-subsurface-modeling",
    image: "/images/projects/research_themes/reghym.png",
    group: "computational-modeling-tools",
    detail:
      "Build simulation workflows that connect teleseismic wavefields with local subsurface response.",
  },
  {
    label: "Propagation Characteristics of Rotational Ground Motions in Layered Earth Media",
    id: "layered-earth-rotational-ground-motions",
    group: "computational-modeling-tools",
    image: "/images/projects/research_themes/Extending_SPECFEM.png",
    detail:
      "Extend SPECFEM3D workflows to compute rotations alongside translations and validate them against layered-Earth benchmarks.",
  },
  {
    label: "Structural Health Monitoring",
    id: "structural-monitoring",
    group: "structural-health-monitoring",
    image: "/images/projects/research_themes/Structural_Monitoring.png",
    detail:
      "Use 6C sensing, operational modal analysis, and structural-response data to support infrastructure health assessment.",
  },
];

export const associatedWorkSections: AssociatedWorkSection[] = [
  {
    id: "heterogeneities-rotational-seismology",
    title: "Effect of heterogeneities on rotational seismology",
    summary:
      "Current HERS research focused on how complex media alter translational, rotational, and strain components of earthquake motion.",
    projectSlugs: ["hers_heterogeneities_rotational_seismology"],
  },
  {
    id: "topography-ground-motions",
    title: "Influence of topography on earthquake ground motions",
    summary:
      "Work that studies how terrain and regional setting modify simulated earthquake ground motions.",
    projectSlugs: ["himalayan_topography_ground_motions", "topography_simple"],
  },
  {
    id: "planetary-seismology",
    title: "Planetary seismology",
    summary:
      "Collaborative work connecting lunar and Martian surface evidence with recent planetary seismicity, including Valles Marineris marsquakes and Laue crater shallow moonquake boulder avalanches.",
    projectSlugs: ["mars_seismicity", "lunar_boulder_avalanches_moonquake"],
  },
  {
    id: "earthquake-source-strong-motion-generation",
    title: "Earthquake source processes and strong-motion generation",
    summary:
      "Work that uses finite-source rupture models, statistical characterization, and source-scaling relationships to identify regions that govern strong ground motion.",
    projectSlugs: ["strong_motion_generation_extreme_value"],
  },
  {
    id: "structural-monitoring",
    title: "Structural Health Monitoring",
    summary:
      "Projects where 6C sensing, rotational measurements, structural dynamics, and operational modal analysis support civil infrastructure health assessment.",
    projectSlugs: ["six_component_structural_monitoring", "bridge_rotational_ground_motions"],
  },
  {
    id: "analytical-medium-modeling",
    title: "Analytical modeling of the medium of wave propagation",
    summary:
      "Analytical foundations for reduced micropolar media, Green's functions, and half-space ground-motion theory.",
    projectSlugs: [
      "rotational_ground_motion_theory",
      "fundamental_solutions_reduced_micropolar_half_space",
      "homogeneous reduced micropolar half-space",
    ],
  },
  {
    id: "teleseismic-subsurface-modeling",
    title: "High-resolution subsurface modeling through teleseismic simulation",
    summary:
      "Simulation work connecting teleseismic wavefields, local structure, and observation-driven subsurface interpretation.",
    projectSlugs: ["coupled_teleseismic_ground_motion_simulation"],
  },
  {
    id: "layered-earth-rotational-ground-motions",
    title: "Propagation of rotational ground motions in layered Earth media",
    summary:
      "Projects that connect layered or heterogeneous Earth models with rotational-motion propagation and validation.",
    projectSlugs: ["extending_specfem_rotational_ground_motions"],
  },
];

export function getResearchThemeLinksForProject(projectSlug: string): ResearchThemeLink[] {
  return associatedWorkSections
    .filter((section) => section.projectSlugs.includes(projectSlug))
    .map((section) => {
      const theme = researchThemes.find((theme) => theme.id === section.id);

      if (!theme) return null;

      return {
        id: theme.id,
        label: section.title,
        href: `/work/themes/${theme.id}`,
      };
    })
    .filter((theme): theme is ResearchThemeLink => Boolean(theme));
}

export function getProjectHref(projectSlug: string, themeId?: string) {
  const hersProjectSlug = "hers_heterogeneities_rotational_seismology";
  const projectPath =
    projectSlug === hersProjectSlug ? "/hers" : `/work/${encodeURIComponent(projectSlug)}`;

  if (!themeId) {
    return projectPath;
  }

  return `${projectPath}?theme=${encodeURIComponent(themeId)}`;
}
