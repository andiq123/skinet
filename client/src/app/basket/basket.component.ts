import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeItem(basketItem: IBasketItem) {
    this.basketService.removeFromBasket(basketItem);
  }

  incrementItemQuantity(basketItem: IBasketItem) {
    this.basketService.increment(basketItem);
  }

  decrementItemQuantity(basketItem: IBasketItem) {
    this.basketService.decrement(basketItem);
  }
}
