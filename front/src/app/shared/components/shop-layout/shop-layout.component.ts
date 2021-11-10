import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
  }

}
