import coffee from "../assets/images/1.jpg";
import backgroundImage from "../assets/images/coffee.jpg";

export const CATEGORIES: { id: string; name: string }[] = [
    {
        id: "1",
        name: "All",
    },
    {
        id: "2", // Fixed: changed from "1" to "2"
        name: "Burger",
    },
    {
        id: "3",
        name: "Pizza",
    },
    {
        id: "4",
        name: "Wrap",
    },
]

// Fixed: Removed the invalid "..." syntax and properly defined the type
export const offers: { id: number; title: string; image: any; color: string }[] = [
    {
        id: 1,
        title: "SUMMER COMBO",
        image: backgroundImage,
        color: "#D33B0D"
    },
    {
        id: 2,
        title: "SUMMER COMBO",
        image: backgroundImage,
        color: "#D33B5D"
    },
    {
        id: 3,
        title: "SUMMER COMBO",
        image: backgroundImage,
        color: "#D37B0D"
    }
]

export const sides = [
    {
        name: "Fries",
        image: backgroundImage,
        price: 3.5
    },
    {
        name: "Fries",
        image: backgroundImage,
        price: 3.5
    },
    {
        name: "Fries",
        image: backgroundImage,
        price: 3.5
    },
]

export const toppings = [
    {
        name: "Avacado",
        image: backgroundImage,
        price: 1.5
    },
    {
        name: "Avacado",
        image: backgroundImage,
        price: 1.5
    },
    {
        name: "Avacado",
        image: backgroundImage,
        price: 1.5
    },
]

export default {
    backgroundImage,
    coffee
}