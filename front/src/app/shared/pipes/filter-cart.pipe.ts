import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name:'filterProduct'})
export class FilterProduct implements PipeTransform {
  transform(productsInfo : any[], product : any){
    if (productsInfo.filter(item => item.product.uniq_name === product.uniq_name).length === 0) {
      return false
    }
    return true
  }
}
