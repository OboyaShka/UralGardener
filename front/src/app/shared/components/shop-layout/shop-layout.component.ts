import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {select, Store} from "@ngrx/store";
import {CartState} from "../../../reducers/shopping-cart/shopping-cart.reducer";
import {Observable} from "rxjs";
import {selectPrice} from "../../../reducers/shopping-cart/shopping-cart.selectors";
import {NgrxSyncStorageService} from "../../services/ngrx-sync-storage.service";
import {Category} from "../../interfaces";
import {CategoryService} from "../../../admin/shared/services/category.service";
import {CatalogPageComponent} from "../../../catalog-page/catalog-page.component";

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit {
  public price$: Observable<number> = this.store$.pipe(select(selectPrice))
  categories: Category[] = []

  constructor(
    public authService: AuthService,
    private categoryService: CategoryService,
    private store$: Store<CartState>,
    private cartSyncStorage: NgrxSyncStorageService,
  ) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.cartSyncStorage.init()

    this.categoryService.getAllCategories().subscribe((res) => {
    this.categories = res
  })
  }

}
