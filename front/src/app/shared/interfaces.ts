import {Validators} from "@angular/forms";

export interface User {
  _id?: string
  phone: string
  password: string
  email?: string
  fio?: string
}

export interface Category {
  _id?: string
  title: string
  uniq_name: string
  image?: string
}

export interface Division {
  _id?: string
  title: string
  uniq_name: string
  category_uniq: string
}

export interface Position {
  _id?: string
  title: string
  category_uniq: string
  division_uniq: string
  uniq_name: string
}

export interface Product {
  _id?: string
  title: string
  uniq_name: string
  category_uniq: string | null
  division_uniq: string | null
  position_uniq: string | null
  description: string
  article_number: number
  packing: number
  packing_type?: string
  price: number
  brand_id?: string
  count: number
  image? : string
}

export interface ProductInfo {
  count: number,
  product: Product
}

export interface AuthResponse {
  accessToken: string
  expiresIn: string
  userRole: string
}
