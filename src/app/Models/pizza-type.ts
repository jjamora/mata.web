import { Category } from "./category";

export interface Pizza_Type {
    id: string;
    name: string;
    categoryId: string;
    category: Category;
    ingredients: string;
}
