import {Action, createAction, props} from "@ngrx/store";
import {Product} from "../../shared/interfaces";

export namespace CartActions {
  export const increasePrice = createAction("INCREASE_PRICE",
    props<{ increasePrice: number}>()
  )

  export const addProduct = createAction("ADD_PRODUCT",
    props<{ productInfo: any}>()
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
