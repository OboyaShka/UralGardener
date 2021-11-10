import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  submitted = false

  constructor(
    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form?.invalid) {
      return
    }

    const user: User = {
      phone: this.form.value.phone,
      password: this.form.value.password
    }

    this.authService.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin','catalog'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
