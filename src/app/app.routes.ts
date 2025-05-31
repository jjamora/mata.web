import { Routes } from '@angular/router';
import { CategoryComponent } from './Components/category/category';
import { PizzaComponent } from './Components/pizza/pizza';
import { PizzaTypeComponent } from './Components/pizza-type/pizza-type';
import { OrderCompnent } from './Components/order/order';
import { OrderDetailComponent } from './Components/order-detail/order-detail';

export const routes: Routes = [
    { path: "", component: OrderCompnent },
    { path: "categories", component: CategoryComponent },
    { path: "pizzas", component: PizzaComponent },
    { path: "pizza_types", component: PizzaTypeComponent },
    { path: "orders", component: OrderCompnent },
    { path: "order_details", component: OrderDetailComponent }
];