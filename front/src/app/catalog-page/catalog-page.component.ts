import {Component, HostListener, OnInit} from '@angular/core';
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
  isProduct: boolean = false
  productFlag: any = true
  currentTitle = 'Каталог'
  currentProduct: Product | null = null
  products: Product[] = []
  index: any
  breadCrumbs: any = []

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private divisionService: DivisionService,
    private positionService: PositionService,
    private productService: ProductService,
    private router: Router
  ) { }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.contentInit()
  }

  ngOnInit(): void {
    this.contentInit()
  }

  contentInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
      this.categoriesOptions = res

      let urlArray = this.URLToArray(this.router.url)

      switch (urlArray.length) {
        case 0:
          break
        case 1:
          this.breadCrumbs = []
          this.isCatalog = true
          this.isProduct = false
          break
        case 2:
          this.isProduct = false
          this.isCatalog = false
          this.categoryService.getCategoryByUniqName(urlArray[1]).subscribe((categories) => {
            this.setProducts(categories[0], 'category')
          })
          break
        case 3:
          this.isProduct = false
          this.isCatalog = false
          this.divisionService.getDivisionsByUniqName(urlArray[2]).subscribe((divisions) => {
            this.setProducts(divisions[0], 'division')
          })
          break
        case 4:
          this.isProduct = false
          this.isCatalog = false
          this.positionService.getPositionsByUniqName(urlArray[3]).subscribe((positions) => {
            this.setProducts(positions[0], 'position')
          })
          break
        case 5:
          this.productService.getProductByUniqName(urlArray[4]).subscribe((products) => {
            this.isProduct = true
            this.isCatalog = false
            this.currentProduct = products[0]
            this.currentTitle = products[0].title

            this.categoryService.getCategoryByUniqName(products[0].category_uniq).subscribe((categories) => {
              this.divisionService.getDivisionsByUniqName(products[0].division_uniq).subscribe((divisions) => {
                this.positionService.getPositionsByUniqName(products[0].position_uniq).subscribe((positions) => {
                  this.breadCrumbs = [
                    {title: 'Каталог', uniq_name: 'catalog'},
                    categories[0],
                    divisions[0],
                    positions[0],
                    products[0]
                  ]
                })
              })
            })
          })

      }
    })
  }

  URLToArray(url: string) {
    let urlArray: any = []
    let curPart = ""
    for (let i = 0; i < url.length; i++) {
      if (url[i] === '/') {
        if (curPart.length != 0) {
          urlArray.push(curPart)
          curPart = ""
        }
      } else {
        curPart += url[i]
      }
    }
    urlArray.push(curPart)
    return urlArray
  }


  goToCategory(category: Category) {
    this.breadCrumbs.push(
      {title: 'Каталог', uniq_name: 'catalog'},
      category
    )

    this.productService.getAllProducts(category.uniq_name).subscribe((products: Product[]) => {
      this.products = products
    })

      this.isCatalog = false
    this.router.navigate(['/catalog' , category.uniq_name])
  }

  openCategoryOptions(category: any, index: number) {

    if (this.categoriesOptions[index].divisions) {
      this.categoriesOptions[index].divisionFlag = !this.categoriesOptions[index].divisionFlag
      return
    }
    this.divisionService.getDivisionsByCategoryUniq(category.uniq_name).subscribe((res) => {
      this.categoriesOptions[index].divisionFlag = !this.categoriesOptions[index].divisionFlag
      this.categoriesOptions[index].divisions = res
    })
  }

  openDivisionOptions(division: any, indexC: any, indexD: any) {

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



  setProducts(object: any, type: string) {
    this.currentTitle = object.title

    switch (type) {
      case 'category':

        this.breadCrumbs = [
          {title: 'Каталог', uniq_name: 'catalog'},
          object
        ]
        this.productService.getProductByCategory(object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
        })
        break
      case 'division':

        this.categoryService.getCategoryByUniqName(object.category_uniq).subscribe((categories) => {
          this.breadCrumbs = [
            {title: 'Каталог', uniq_name: 'catalog'},
            categories[0],
            object
          ]
        })

        this.productService.getProductByDivision(object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
        })
        break
      case 'position':

        this.divisionService.getDivisionsByUniqName(object.division_uniq).subscribe((divisions) => {
          this.categoryService.getCategoryByUniqName(divisions[0].category_uniq).subscribe((categories) => {
            this.breadCrumbs = [
              {title: 'Каталог', uniq_name: 'catalog'},
              categories[0],
              divisions[0],
              object
              ]
          })

        })

        this.productService.getProductByPosition(object.uniq_name).subscribe((products: Product[]) => {
          this.products = products
        })
        break
    }

  }

  goToProduct(product: Product) {

    this.categoryService.getCategoryByUniqName(product.category_uniq).subscribe((categories) => {
      this.divisionService.getDivisionsByUniqName(product.division_uniq).subscribe((divisions) => {
        this.positionService.getPositionsByUniqName(product.position_uniq).subscribe((positions) => {
          this.breadCrumbs = [
            {title: 'Каталог', uniq_name: 'catalog'},
            categories[0],
            divisions[0],
            positions[0],
            product
          ]
        })
      })
    })

    this.productService.getProductByUniqName(product.uniq_name).subscribe((product) => {
      this.currentTitle = product[0].title
      this.router.navigate(['/catalog',product[0].category_uniq,product[0].division_uniq,product[0].position_uniq,product[0].uniq_name])
      this.currentProduct = product[0]
      this.isProduct = true
    })
  }

  routeToCrumb(breadCrumbs: any, index: any) {

    let url: string = ""
    for (let i = 0; i < index + 1; i++) {
      url += '/' + breadCrumbs[i].uniq_name
    }

    this.router.navigateByUrl(url)
    this.contentInit()
  }
}
