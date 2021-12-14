import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../admin/shared/services/category.service";
import {DivisionService} from "../../../admin/shared/services/division.service";
import {PositionService} from "../../../admin/shared/services/position.service";
import {ProductService} from "../../../admin/shared/services/product.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navOptions: any = []

  constructor(
    private categoryServices: CategoryService,
    private divisionServices: DivisionService,
    private positionService: PositionService,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.navOptions = [{
      name: 'Цветы',
      url: '/catalog/seeds/flowers',
      uniq_name: 'flowers',
      type: 'division',
      hoverFlag: false,
      options: []
    },
      {
        name: 'Овощи',
        url: '/catalog/seeds/vegetables',
        uniq_name: 'vegetables',
        type: 'division',
        hoverFlag: false,
        options: []
      },
      {
        name: 'Овощи',
        url: '/catalog/seeds/vegetables',
        uniq_name: 'vegetables',
        type: 'division',
        hoverFlag: false,
        options: []
      },
      {
        name: 'Овощи',
        url: '/catalog/seeds/vegetables',
        uniq_name: 'vegetables',
        type: 'division',
        hoverFlag: false,
        options: []
      },
      {
        name: 'Инвентарь',
        url: '/catalog/inventory',
        uniq_name: 'inventory',
        type: 'category',
        hoverFlag: false,
        options: []
      },
      {
        name: 'Агрохимия',
        uniq_name: 'agrochemistry',
        url: '/catalog/agrochemistry',
        type: 'category',
        hoverFlag: false,
        options: []
      },
    ]

    this.navOptions.map((navOption: any) => {
      switch (navOption.type) {
        case 'category':
          this.divisionServices.getDivisionsByCategoryUniq(navOption.uniq_name).subscribe(res => {
            navOption.options = res
          })
          break
        case 'division':
          this.positionService.getPositionsByDivisionUniq(navOption.uniq_name).subscribe(res => {
            console.log(res)
            navOption.options = res
          })
          break
        case 'position':
          this.productService.getProductByPosition(navOption.uniq_name).subscribe(res => {
            navOption.options = res
          })
          break
        case 'other':
          break
      }
    })


  }

}
