import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiUrl = 'https://localhost:5000/api/Order/';
  constructor() { }

  http = inject(HttpClient);

  getAllOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string) {
    return this.http.get<Order>(this.apiUrl + "GetOrderById?id=" + id);
  }

  createOrder(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateOrder(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
