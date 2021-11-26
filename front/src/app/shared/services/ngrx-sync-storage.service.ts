import {Injectable} from "@angular/core";
import {Store, select} from "@ngrx/store";
import {CartState} from "../../reducers/shopping-cart/shopping-cart.reducer";
import {selectCartFeature} from "../../reducers/shopping-cart/shopping-cart.selectors";
import {filter} from "rxjs/operators";
import {CartActions} from "../../reducers/shopping-cart/shopping-cart.actions";

export const CART_LOCALSTORAGE_KEY = 'cart'

@Injectable({providedIn: 'root'})
export class NgrxSyncStorageService {
  private isInit = false

  constructor(private store$: Store<CartState>) {
  }

  init() {
    if (this.isInit) {
      return
    }

    this.isInit = true
    this.loadFromStorage()

    this.store$.pipe(
      select(selectCartFeature),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(state))
    })

    // window.addEventListener('storage', () => {
    //   this.loadFromStorage()
    // })
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(CART_LOCALSTORAGE_KEY)
    if (storageState) {
      this.store$.dispatch(CartActions.load({
        state: JSON.parse(storageState)
      }))
    }
  }
}
