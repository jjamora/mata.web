import { Pizza_Type } from "./pizza-type";

export interface Pizza {
    id: string;
    name: string;
    pizza_type_Id: string;
    pizza_type: Pizza_Type;
    size: number;
    price: number;
}
