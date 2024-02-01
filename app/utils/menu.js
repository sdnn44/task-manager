import { list, check, calendar, stats, important, pending, missed } from "./icons";
const menu = [
  {
    id: 1,
    title: "All tasks",
    icon: list,
    link: "/",
    margin: "5",
  },
  {
    id: 2,
    title: "Important",
    icon: important,
    link: "/section-important",
    margin: "5",
  },
  {
    id: 3,
    title: "Completed",
    icon: check,
    link: "/section-completed",
    margin: "1",
  },
  {
    id: 4,
    title: "Pending",
    icon: pending,
    link: "/section-incomplete",
    margin: "1",
  },
  {
    id: 5,
    title: "Missed",
    icon: missed,
    link: "/section-missed",
    margin: "1",
  },
  {
    id: 6,
    title: "Current month",
    icon: calendar,
    link: "/section-calendar",
    margin: "5",
  },
  {
    id: 7,
    title: "Statistics",
    icon: stats,
    link: "/section-statistics",
    margin: "0",
  },
];
export default menu;
