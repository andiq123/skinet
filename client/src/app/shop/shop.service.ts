import { ShopParams } from './../shared/models/shopParams';
import { IBrand } from './../shared/models/brand';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { map } from 'rxjs/operators';
import { IProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    //Append params if they exists;
    if (shopParams.brandId && shopParams.brandId !== 0)
      params = params.append('brandId', shopParams.brandId.toString());

    if (shopParams.typeId && shopParams.typeId !== 0)
      params = params.append('typeId', shopParams.typeId.toString());

    if (shopParams.search) params = params.append('search', shopParams.search);

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((data) => {
          return data.body;
        })
      );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
