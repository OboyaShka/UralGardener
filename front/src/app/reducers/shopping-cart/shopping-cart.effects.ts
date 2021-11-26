import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {CartActions} from "./shopping-cart.actions";
import {map, mergeMap} from "rxjs/operators";

@Injectable()
export class ShoppingCartEffects {
  constructor(private actions$: Actions) {
  }

  @Effect()
  priceGrow$() {
    return this.actions$.pipe(
      ofType(CartActions.addProduct),
      map((req: any) => {
        let productInfo = req.productInfo
        return CartActions.increasePrice({increasePrice: (productInfo.product.price * productInfo.count)})
      }))
  }

  @Effect()
  priceDown$() {
    return this.actions$.pipe(
      ofType(CartActions.deleteProduct),
      map((req: any) => {
        let productInfo = req.productInfo
        return CartActions.decreasePrice({decreasePrice:  (productInfo.product.price * productInfo.count)})
      }))
  }

  @Effect()
  priceIncreaseCount$() {
    return this.actions$.pipe(
      ofType(CartActions.increaseCount),
      map((req: any) => {
        let productInfo = req.productInfo
        return CartActions.increasePrice({increasePrice: (productInfo.product.price * productInfo.product.packing)})
      }))
  }

  @Effect()
  priceDecreaseCount$() {
    return this.actions$.pipe(
      ofType(CartActions.decreaseCount),
      map((req: any) => {
        let productInfo = req.productInfo
        return CartActions.decreasePrice({decreasePrice: (productInfo.product.price * productInfo.product.packing)})
      }))
  }


}
