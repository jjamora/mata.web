import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pizza_Type } from '../../Models/pizza-type';

@Injectable({
  providedIn: 'root'
})
export class PizzaTypeService {
private apiUrl = 'https://localhost:5000/api/PizzaType/';
  constructor() { }

  http = inject(HttpClient);

  getAllPizzaTypes() {
    return this.http.get<Pizza_Type[]>(this.apiUrl);
  }

  getPizzaTypeById(id: string) {
    return this.http.get<Pizza_Type>(this.apiUrl + "GetPizza_TypeById?id=" + id);
  }

  createPizzaType(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updatePizzaType(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
