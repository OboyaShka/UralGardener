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
}

export interface Division {
  _id?: string
  title: string
  category_id: string
}

export interface Position {
  _id?: string
  title: string
  category_id: string
  division_id: string
}

export interface Product {
  _id?: string
  title: string
  category_id: string | null
  division_id: string | null
  position_id: string | null
  description: string
  article_number: string
  packing: string
  packing_type?: string
  price: number
  brand_id?: string
  count: number
  image? : string
}


export interface AuthResponse {
  accessToken: string
  expiresIn: string
  userRole: string
}
