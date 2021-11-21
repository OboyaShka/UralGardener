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

export interface AuthResponse {
  accessToken: string
  expiresIn: string
  userRole: string
}
