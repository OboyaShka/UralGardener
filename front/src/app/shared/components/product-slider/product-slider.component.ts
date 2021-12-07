import {Component, Input} from "@angular/core";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Product, ProductInfo, SliderData} from "../../interfaces";
import {environment} from "../../../../environments/environment"
import {Router} from "@angular/router";
import {CartActions} from "../../../reducers/shopping-cart/shopping-cart.actions";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectProducts} from "../../../reducers/shopping-cart/shopping-cart.selectors";
import {CartState} from "../../../reducers/shopping-cart/shopping-cart.reducer";
@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {

  @Input() slider: SliderData | undefined
  public productsCart$: Observable<any> = this.store$.pipe(select(selectProducts))

  env = environment

  constructor(
    private store$: Store<CartState>,
    private router: Router
  ) {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  isDragging: boolean = false;

  goToProduct($event: Event, product: Product) {
    if (!this.isDragging){
      this.router.navigate(['/catalog', product.category_uniq, product.division_uniq, product.position_uniq, product.uniq_name])
    }
  }

  buyProduct(product: Product) {
    this.store$.dispatch(CartActions.addProduct({
      productInfo: {
        count: product.packing,
        product: product
      }
    }))
  }

  increaseCount(productInfo: ProductInfo){
    if (productInfo.count + productInfo.product.packing > productInfo.product.count) {
      // this.store$.dispatch(CartActions.deleteProduct({productInfo: productInfo}))
    } else {
      this.store$.dispatch(CartActions.increaseCount({productInfo: productInfo}))
    }
  }

  decreaseCount(productInfo: ProductInfo){
    if (productInfo.count - productInfo.product.packing <= 0) {
      this.store$.dispatch(CartActions.deleteProduct({productInfo: productInfo}))
    } else {
      this.store$.dispatch(CartActions.decreaseCount({productInfo: productInfo}))
    }
  }

}
