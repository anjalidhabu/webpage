import type { IconType } from "react-icons";

import {
  HiArrowDownTray,
  HiArrowLeft,
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiArrowUpRight,
  HiCalendarDays,
  HiEnvelope,
  HiOutlineBuildingLibrary,
  HiOutlineDocument,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineLink,
  HiOutlineRocketLaunch,
  HiOutlineTrophy,
} from "react-icons/hi2";

import {
  PiBookBookmarkDuotone,
  PiBooksDuotone,
  PiWaveformDuotone,
  PiGridFourDuotone,
  PiHouseDuotone,
  PiImageDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";

import {
  SiFigma,
  SiGooglescholar,
  SiJavascript,
  SiNextdotjs,
  SiOrcid,
  SiSupabase,
} from "react-icons/si";

import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaThreads,
  FaWhatsapp,
  FaX,
  FaXTwitter,
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  arrowLeft: HiArrowLeft,
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  download: HiArrowDownTray,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  university: HiOutlineBuildingLibrary,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  research: PiWaveformDuotone,
  book: PiBookBookmarkDuotone,
  publications: PiBooksDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  trophy: HiOutlineTrophy,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  googleScholar: SiGooglescholar,
  orcid: SiOrcid,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
