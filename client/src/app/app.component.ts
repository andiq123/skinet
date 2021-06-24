import { IPagination } from './models/pagination';
import { IProduct } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  title = 'client';
  products: IProduct[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<IPagination>(this.baseUrl + 'products').subscribe((data) => {
      this.products = data.items;
    });
  }
}
