import { ShopParams } from './../shared/models/shopParams';
import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) search: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Alphabetical Descending', value: 'nameDesc' },
    { name: 'Price: Low To High', value: 'priceAsc' },
    { name: 'Price: High To Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  loadProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (data) => {
        this.totalCount = data.count;
        this.shopParams.pageNumber = data.pageIndex;
        this.shopParams.pageSize = data.pageSize;
        this.products = data.items;
      },
      (e) => console.log(e)
    );
  }

  loadBrands() {
    this.shopService.getBrands().subscribe(
      (brands) => {
        this.brands = [{ id: 0, name: 'All' }, ...brands];
      },
      (e) => console.log(e)
    );
  }

  loadTypes() {
    this.shopService.getTypes().subscribe(
      (productTypes) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...productTypes];
      },
      (e) => console.log(e)
    );
  }

  onPageChanged(page: number) {
    if (this.shopParams.pageNumber !== page) {
      this.shopParams.pageNumber = page;
      this.loadProducts();
    }
  }

  onBrandSelected(id: number) {
    this.shopParams.brandId = this.shopParams.brandId === id ? 0 : id;
    this.shopParams.pageNumber = 1;
    this.loadProducts();
  }

  onTypeSelected(id: number) {
    this.shopParams.typeId = this.shopParams.typeId === id ? 0 : id;
    this.shopParams.pageNumber = 1;
    this.loadProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.loadProducts();
  }

  onSearch() {
    this.shopParams.search = this.search.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.loadProducts();
  }

  onReset() {
    this.search.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.loadProducts();
  }
}
