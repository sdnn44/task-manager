import {list, check, todo, home} from "./icons";
const menu = [
    {
        id: 1,
        title: "Wszystkie zadania",
        icon: home,
        link: '/',
    },
    {
        id: 2,
        title: "Ważne!",
        icon: list,
        link: '/important',
    },
    {
        id: 3,
        title: "Wykonano!",
        icon: check,
        link: '/completed',
    },
    {
        id: 4,
        title: "Do zrobienia",
        icon: todo,
        link: '/incomplete',
    },
];
export default menu;