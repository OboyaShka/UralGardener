import { Component, OnInit } from '@angular/core';
import {Product, SliderData} from "../shared/interfaces";
import {ProductService} from "../admin/shared/services/product.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  sliderData: SliderData[] = [
    {
    division_uniq: "flowers",
    title: 'Цветы',
    url: 'catalog/seeds/flowers',
    products: []
  },
    {
    division_uniq: "vegetables",
    title: 'Овощи',
    url: 'catalog/seeds/vegetables',
    products: []
  }]


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.sliderData.map( slider => this.productService.getProductByDivision(slider.division_uniq).subscribe((products: Product[]) => {
      slider.products = products
    })
   )
  }




}
