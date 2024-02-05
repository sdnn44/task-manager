import { list, check, calendar, stats, important, pending, missed } from "./icons";
const menu = [
  {
    id: 1,
    title: "All tasks",
    icon: list,
    link: "/",
    marginVal: "5",
  },
  {
    id: 2,
    title: "Important",
    icon: important,
    link: "/section-important",
    marginVal: "5",
  },
  {
    id: 3,
    title: "Completed",
    icon: check,
    link: "/section-completed",
    marginVal: "1",
  },
  {
    id: 4,
    title: "Pending",
    icon: pending,
    link: "/section-incomplete",
    marginVal: "1",
  },
  {
    id: 5,
    title: "Missed",
    icon: missed,
    link: "/section-missed",
    marginVal: "1",
  },
  {
    id: 6,
    title: "Current month",
    icon: calendar,
    link: "/section-calendar",
    marginVal: "5",
  },
  {
    id: 7,
    title: "Statistics",
    icon: stats,
    link: "/section-statistics",
    marginVal: "0",
  },
];
export default menu;
