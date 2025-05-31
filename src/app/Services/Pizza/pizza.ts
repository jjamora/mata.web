import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pizza } from '../../Models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
private apiUrl = 'https://localhost:5000/api/Pizza';
  constructor() { }

  http = inject(HttpClient);

  getAllPizzas() {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getPizzaById(id: string) {
    return this.http.get<Pizza>(this.apiUrl + "GetPizzaById?id=" + id);
  }

  createPizza(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updatePizza(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
