import {createFeatureSelector, createSelector} from "@ngrx/store";
import {cartNode, CartState} from "./shopping-cart.reducer";

export const selectCartFeature = createFeatureSelector<CartState>(cartNode)

export const selectPrice = createSelector(
  selectCartFeature,
  (state: CartState): number => state.price
)

export const selectProducts = createSelector(
  selectCartFeature,
  (state: CartState): any => state.products
)
