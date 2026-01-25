import { PRODUCTS, Product } from '@/data/products';

export type { Product };

export const getProducts = async (): Promise<Product[]> => {
    // Simulate API delay of 0.5-0.8 seconds
    const delay = 500 + Math.random() * 300;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, delay);
    });
};
