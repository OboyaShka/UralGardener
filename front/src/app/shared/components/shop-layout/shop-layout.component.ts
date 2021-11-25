import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {select, Store} from "@ngrx/store";
import {CartState} from "../../../reducers/shopping-cart/shopping-cart.reducer";
import {Observable} from "rxjs";
import {selectPrice} from "../../../reducers/shopping-cart/shopping-cart.selectors";

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit {
  public price$: Observable<number> = this.store$.pipe(select(selectPrice))


  constructor(
    public authService: AuthService,
    private store$: Store<CartState>
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
  }

}
