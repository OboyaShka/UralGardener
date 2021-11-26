import {CartActions} from "./shopping-cart.actions";
import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {State} from "../index";
import {ProductInfo} from "../../shared/interfaces";


export const cartNode = 'cart'

export interface CartState {
  products: ProductInfo[],
  price: number
}

const initialState: CartState = {
  products: [],
  price: 0
}

// @ts-ignore
// @ts-ignore
const createdCartReducer = createReducer(
  initialState,
  on(CartActions.load, (curState, {state}) => ({
    ...state
  })),
  on(CartActions.increasePrice, (state, {increasePrice}) => ({
    ...state,
    price: state.price + increasePrice
  })),
  on(CartActions.decreasePrice, (state, {decreasePrice}) => ({
    ...state,
    price: state.price - decreasePrice
  })),
  on(CartActions.increaseCount, (state, {productInfo}) => ({
    ...state,
    products: state.products.map(
      (curProduct: ProductInfo) =>
        curProduct.product.uniq_name === productInfo.product.uniq_name
          ? {...curProduct, count: curProduct.count + productInfo.product.packing}
          : {...curProduct})
  })),
  on(CartActions.decreaseCount, (state, {productInfo}) => ({
    ...state,
    products: state.products.map(
      (curProduct: ProductInfo) =>
        curProduct.product.uniq_name === productInfo.product.uniq_name
          ? {...curProduct, count: curProduct.count - productInfo.product.packing}
          : {...curProduct})
  })),
  on(CartActions.addProduct, (state, {productInfo}) => ({
    ...state,
    products:[...state.products, productInfo]
  })),
  on(CartActions.deleteProduct, (state, {productInfo}) => ({
    ...state,
    products: [...state.products.filter( (curProduct: ProductInfo) => curProduct.product.uniq_name !== productInfo.product.uniq_name)]
  }))
)

export function cartReducer(state: CartState | undefined, action: Action) {
  return createdCartReducer(state, action)
}

// export const cartReducer = (state = initialState, action: CartActions | any) => {
//   switch (action.type) {
//     case cartActionsType.increase:
//       return {
//         ...state,
//         price: state.price + action.payload.increasePrice
//       }
//     case cartActionsType.increase:
//       return {
//         ...state,
//         price: state.price - action.payload.decreasePrice
//       }
//     case cartActionsType.increase:
//       return {
//         ...state,
//         price: 0
//       }
//     case cartActionsType.addProduct:
//       return {
//         ...state,
//         products: state.products.push(action.payload.productInfo)
//       }
//     default:
//       return state
//   }
// }
