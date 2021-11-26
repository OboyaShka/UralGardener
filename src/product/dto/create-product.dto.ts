export class createProductDto {
  readonly _id?: string
  readonly title: string
  readonly category_uniq: string | null
  readonly division_uniq: string | null
  readonly position_uniq: string | null
  readonly uniq_name: string
  readonly description: string
  readonly article_number: number
  readonly packing: number
  readonly packing_type?: string
  readonly price: number
  readonly brand_id?: string
  readonly count: number
  readonly image? : string
}