import {Action, createAction, props} from "@ngrx/store";
import {Product, ProductInfo} from "../../shared/interfaces";
import {CartState} from "./shopping-cart.reducer";

export namespace CartActions {

  export const load = createAction("LOAD_STORAGE",
    props<{ state: CartState}>()
  )

  export const increasePrice = createAction("INCREASE_PRICE",
    props<{ increasePrice: number}>()
  )

  export const decreasePrice = createAction("DECREASE_PRICE",
    props<{ decreasePrice: number}>()
  )

  export const increaseCount = createAction("INCREASE_COUNT",
    props<{ productInfo: ProductInfo}>()
  )

  export const decreaseCount = createAction("DECREASE_COUNT",
    props<{ productInfo: ProductInfo}>()
  )

  export const addProduct = createAction("ADD_PRODUCT",
    props<{ productInfo: ProductInfo}>()
  )

  export const deleteProduct = createAction("DELETE_PRODUCT",
    props<{ productInfo: ProductInfo}>()
  )

}

// export enum cartActionsType {
//   increase = '[CART] increase',
//   decrease = '[CART] decrease',
//   clear = '[CART] clear',
//   addProduct = '[CART] addProduct',
// }
//
// export class CartIncreaseAction implements Action {
//   readonly type = cartActionsType.increase
//
//   constructor(public payload: { increasePrice: number }) {
//   }
// }
//
// export class CartDecreaseAction implements Action {
//   readonly type = cartActionsType.decrease
//
//   constructor(public payload: {
//     decreasePrice: number
//   }) {
//   }
// }
//
// export class CartClearAction implements Action {
//   readonly type = cartActionsType.clear
// }
//
//
// export class CartAddProductAction implements Action {
//   readonly type = cartActionsType.addProduct
//
//   constructor(public payload:
//                 {
//                   productInfo: {
//                     count: number,
//                     product: Product
//                   }
//                 }
//   ) {
//   }
// }
//
//
