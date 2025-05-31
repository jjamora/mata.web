import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:5000/api/Category/';
  constructor() { }

  http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(this.apiUrl + "GetCategoryById?id=" + id);
  }

  createCategory(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateCategory(data: any) {
    return this.http.put(this.apiUrl, data);
  }
}
