import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectPrice} from "../../../reducers/shopping-cart/shopping-cart.selectors";
import {AuthService} from "../../services/auth.service";
import {CartState} from "../../../reducers/shopping-cart/shopping-cart.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public price$: Observable<number> = this.store$.pipe(select(selectPrice))

  constructor(
    public authService: AuthService,
    private store$: Store<CartState>,
  ) {
  }
}
