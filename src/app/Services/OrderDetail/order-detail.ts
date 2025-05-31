import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order_Detail } from '../../Models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
private apiUrl = 'https://localhost:5000/api/Order/';
  constructor() { }

  http = inject(HttpClient);

  getAllOrderDetails() {
    return this.http.get<Order_Detail[]>(this.apiUrl);
  }

  getOrder_DetailById(id: string) {
    return this.http.get<Order_Detail>(this.apiUrl + "GetOrder_DetailById?id=" + id);
  }

  createOrderDetail(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateOrderDetail(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
