import {CartActions} from "./shopping-cart.actions";
import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {State} from "../index";


export const cartNode = 'cart'

export interface CartState {
  products: any,
  price: number
}

const initialState: CartState = {
  products: [],
  price: 0
}

const createdCartReducer = createReducer(
  initialState,
  on(CartActions.increasePrice, (state, {increasePrice}) => ({
    ...state,
    price: state.price + increasePrice
  })),
  on(CartActions.addProduct, (state, {productInfo}) => ({
    ...state,
    products:[...state.products, productInfo]
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
