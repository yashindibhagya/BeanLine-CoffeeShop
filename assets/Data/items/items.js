// @/assets/Data/items/index.js

import { coldCoffeeItems } from './coldCoffee';
import { hotCoffeeItems } from './hotCoffee';
import { pastriesItems } from './pastries';
import { sandwichesItems } from './sandwiches';
import { smoothiesItems } from './smoothies';
import { snacksItems } from './snacks';
import { specialsItems } from './specials';
import { teaItems } from './tea';

// Export individual category items
export {
    coldCoffeeItems, hotCoffeeItems, pastriesItems,
    sandwichesItems,
    smoothiesItems,
    snacksItems,
    specialsItems, teaItems
};

// Export combined items object for easy access
export const allItems = {
    "1": hotCoffeeItems,     // Hot Coffee
    "2": coldCoffeeItems,    // Cold Coffee
    "3": teaItems,           // Tea
    "4": pastriesItems,      // Pastries
    "5": sandwichesItems,    // Sandwiches
    "6": smoothiesItems,     // Smoothies
    "7": snacksItems,        // Snacks
    "8": specialsItems       // Specials
};

// Helper function to get items by category
export const getItemsByCategory = (categoryId) => {
    return allItems[categoryId] || [];
};

// Helper function to get all items as a flat array
export const getAllItemsFlat = () => {
    return Object.values(allItems).flat();
};

// Helper function to search items
export const searchItems = (query, categoryId = null) => {
    const itemsToSearch = categoryId ? getItemsByCategory(categoryId) : getAllItemsFlat();

    return itemsToSearch.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );
};

// Helper function to get featured items
export const getFeaturedItems = () => {
    return getAllItemsFlat()
        .filter(item => item.rating >= 4.7)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
};