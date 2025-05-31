import { Order } from "./order";
import { Pizza } from "./pizza";

export interface Order_Detail {
    id: string;
    order_id: string;
    order: Order;
    pizza_id: string;
    pizza: Pizza;
    quantity: number;
}
