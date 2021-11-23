import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../admin/shared/services/category.service";
import {Category, Product} from "../shared/interfaces";
import {environment} from "../../environments/environment"
import {Router, ActivatedRoute} from "@angular/router";
import {DivisionService} from "../admin/shared/services/division.service";
import {PositionService} from "../admin/shared/services/position.service";
import {ProductService} from "../admin/shared/services/product.service";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  categories: Category[] = []
  categoriesOptions: any
  env = environment
  isCatalog: boolean = false
  productFlag: any = true
  currentTitle = 'Каталог'
  products: Product[] = []

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private divisionService: DivisionService,
    private positionService: PositionService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/catalog') {
      this.isCatalog = true
    }

    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
      this.categoriesOptions = res
    })



  }

  goToCategory(category: Category) {
    this.productService.getAllProducts(category.uniq_name).subscribe((products: Product[]) => {
      this.products = products
    })

    this.isCatalog = false
    this.router.navigate(['/catalog' , category.uniq_name])
  }

  openCategory(category: any, index: number) {

    if (this.categoriesOptions[index].divisions) {
      this.categoriesOptions[index].divisionFlag = !this.categoriesOptions[index].divisionFlag
      return
    }
    this.divisionService.getDivisionsByCategoryUniq(category.uniq_name).subscribe((res) => {
      this.categoriesOptions[index].divisionFlag = !this.categoriesOptions[index].divisionFlag
      this.categoriesOptions[index].divisions = res
    })
  }

  openDivision(division: any, indexC: any, indexD: any) {

    if (this.categoriesOptions[indexC].divisions[indexD].positions) {
      this.categoriesOptions[indexC].divisions[indexD].positionFlag = !this.categoriesOptions[indexC].divisions[indexD].positionFlag
      return
    }
    this.positionService.getPositionsByDivisionUniq(division.uniq_name).subscribe((res) => {

      this.categoriesOptions[indexC].divisions[indexD].positionFlag = !this.categoriesOptions[indexC].divisions[indexD].positionFlag
      this.categoriesOptions[indexC].divisions[indexD].positions = res
    })
  }


  setLeaf(position: any) {
    if (position != null) {
      this.productFlag = position.uniq_name
    } else {
      this.productFlag = null
    }
  }

  setProduct(object: any, type: string) {
    this.currentTitle = object.title

    switch (type) {
      case 'category':
        this.productService.getAllProducts(object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
          console.log(products)
        })
        break
      case 'division':
        this.productService.getAllProducts(null, object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
        })
        break
      case 'position':
        this.productService.getAllProducts(null, null, object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
        })
        break
    }

  }

}
