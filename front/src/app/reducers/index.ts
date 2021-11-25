import {
  ActionReducer, ActionReducerMap,
  MetaReducer
} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {cartNode, cartReducer, CartState} from "./shopping-cart/shopping-cart.reducer";

export interface State {
  [cartNode]: CartState
}


export const  reducers: ActionReducerMap<State> = {
  [cartNode]: cartReducer
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
