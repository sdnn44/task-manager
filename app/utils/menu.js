import { list, check, todo, home } from "./icons";
const menu = [
  {
    id: 1,
    title: "Wszystkie",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Ważne",
    icon: list,
    link: "/section-important",
  },
  {
    id: 3,
    title: "Wykonano",
    icon: check,
    link: "/section-completed",
  },
  {
    id: 4,
    title: "Do zrobienia",
    icon: todo,
    link: "/section-incomplete",
  },
  {
    id: 5,
    title: "Przegapione",
    icon: todo,
    link: "/section-missed",
  },
  {
    id: 6,
    title: "Statystyki",
    icon: todo,
    link: "/section-statistics",
  },
];
export default menu;
