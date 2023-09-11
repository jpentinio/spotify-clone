import { GoHomeFill } from "react-icons/go";
import { GoSearch } from "react-icons/go";

export const sidebarItems = [
  {
    text: "Home",
    Icon: GoHomeFill,
  },
  {
    text: "Search",
    Icon: GoSearch,
  },
];

export const sidebarLibraryItems = ["Playlists", "Albums", "Artists"];

export const albumColors = [
  "to-slate-800",
  "to-gray-800",
  "to-zinc-800",
  "to-neutral-800",
  "to-stone-800",
  "to-red-800",
  "to-orange-800",
  "to-amber-800",
  "to-yellow-800",
  "to-lime-800",
  "to-green-800",
  "to-emerald-800",
  "to-teal-800",
  "to-cyan-800",
  "to-sky-800",
  "to-blue-800",
  "to-indigo-800",
  "to-violet-800",
  "to-purple-800",
  "to-fuchsia-800",
  "to-pink-800",
  "to-rose-700",
];

export const hexcodeColors = [
  "#1E293B",
  "#1F2937",
  "#27272A",
  "#262626",
  "#292524",
  "#991B1B",
  "#9A3412",
  "#92400E",
  "#854D0E",
  "#3F6212",
  "#166534",
  "#065F46",
  "#115E59",
  "#155E75",
  "#075985",
  "#1E40AF",
  "#3730A3",
  "#5B21B6",
  "#6B21A8",
  "#86198F",
  "#9D174D",
  "#9F1239",
];

export const colors = albumColors.map((gradient, index) => ({
  hexcode: hexcodeColors[index],
  background: gradient.replace("to-", "bg-"),
  gradient: gradient,
}));
