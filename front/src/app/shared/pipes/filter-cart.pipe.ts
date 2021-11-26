import {Pipe, PipeTransform} from "@angular/core";
import {ProductInfo} from "../interfaces";

@Pipe({name:'filterProduct'})
export class FilterProduct implements PipeTransform {
  transform(productsInfo : any[], product : any){
    if (productsInfo.filter(item => item.product.uniq_name === product.uniq_name).length === 0) {
      return false
    }
    return true
  }
}

@Pipe({name:'getFilterProduct'})
export class getFilterProduct implements PipeTransform {
  transform(productsInfo : any[], product : any): ProductInfo | false {
    let filter= productsInfo.filter(item => item.product.uniq_name === product.uniq_name)
    if (filter.length === 0) {
      return false
    }
    return filter[0]
  }
}

@Pipe({name:'totalPrice'})
export class totalPrice implements PipeTransform {
  transform(productsInfo : any[]): number {
    let totalPrice: number = 0
    productsInfo.map(item => totalPrice = totalPrice + item.count * item.product.price)

    return totalPrice
  }
}
