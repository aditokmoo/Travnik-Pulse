import { BiSolidDrink } from "react-icons/bi";
import {
  MdOutlineFastfood,
  MdOutlineSportsSoccer,
  MdOutlineMuseum,
  MdOutlineMusicNote,
  MdOutlinePark,
  MdOutlineScience,
} from "react-icons/md";
import { TbMovie } from "react-icons/tb";
import { BsBrush, BsMoonStars } from "react-icons/bs";
import { RiFilePaper2Line } from "react-icons/ri";

export const allPreferences = [
  {
    value: "preferences.links.2",
    preference: "nightlife",
    icon: <BiSolidDrink />,
  },
  {
    value: "preferences.links.1",
    preference: "food",
    icon: <MdOutlineFastfood />,
  },
  {
    value: "preferences.links.3",
    preference: "art",
    icon: <BsBrush />,
  },
  {
    value: "preferences.links.4",
    preference: "history",
    icon: <RiFilePaper2Line />,
  },
  {
    value: "preferences.links.5",
    preference: "museums",
    icon: <MdOutlineMuseum />,
  },
  {
    value: "preferences.links.6",
    preference: "movies",
    icon: <TbMovie />,
  },
  {
    value: "preferences.links.7",
    preference: "music",
    icon: <MdOutlineMusicNote />,
  },
  {
    value: "preferences.links.8",
    preference: "culture",
    icon: <BsMoonStars />,
  },
  {
    value: "preferences.links.9",
    preference: "parks",
    icon: <MdOutlinePark />,
  },
  {
    value: "preferences.links.10",
    preference: "science",
    icon: <MdOutlineScience />,
  },
  {
    value: "preferences.links.11",
    preference: "sport",
    icon: <MdOutlineSportsSoccer />,
  },
];
