export class createProductDto {
  readonly _id?: string
  readonly title: string
  readonly category_id: string | null
  readonly division_id: string | null
  readonly position_id: string | null
  readonly description: string
  readonly article_number: string
  readonly packing: string
  readonly packing_type?: string
  readonly price: number
  readonly brand_id?: string
  readonly count: number
  readonly image? : string
}