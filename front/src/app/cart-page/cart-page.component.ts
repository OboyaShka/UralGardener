import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {CartState} from "../reducers/shopping-cart/shopping-cart.reducer";
import {Observable} from "rxjs";
import {selectProducts} from "../reducers/shopping-cart/shopping-cart.selectors";
import {environment} from "../../environments/environment";
import {CartActions} from "../reducers/shopping-cart/shopping-cart.actions";
import {ProductInfo} from "../shared/interfaces";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  public productsCart$: Observable<any> = this.store$.pipe(select(selectProducts))
  env = environment

  constructor(
    private store$: Store<CartState>,
  ) { }

  ngOnInit(): void {
  }


  deleteProduct(productInfo: ProductInfo) {
    this.store$.dispatch(CartActions.deleteProduct({productInfo: productInfo}))
  }

  increaseCount(productInfo: ProductInfo){
    if (productInfo.count + productInfo.product.packing > productInfo.product.count) {
      return
    } else {
      this.store$.dispatch(CartActions.increaseCount({productInfo: productInfo}))
    }
  }

  decreaseCount(productInfo: ProductInfo){
    if (productInfo.count - productInfo.product.packing <= 0) {
      return
    } else {
      this.store$.dispatch(CartActions.decreaseCount({productInfo: productInfo}))
    }
  }
}
