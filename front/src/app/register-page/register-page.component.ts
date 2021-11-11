import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../shared/interfaces";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  submitted = false

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { this.createForm(); }


  createForm() {
    this.form = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [null, [Validators.email]],
      fio: [null, [Validators.required]],
      passwords:this.fb.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordRepeat: [null, [Validators.required, Validators.minLength(6)]]
      },{validator: matchingPasswords('password', 'passwordRepeat')})

    })

    function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      // @ts-ignore
      return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    }
  }


  ngOnInit(): void {
    this.createForm()
  }



  submit() {


    if (this.form.invalid) {
      return
    }

    const user: User = {
      phone: this.form.value.phone,
      password: this.form.value.passwords.password,
      email: this.form.value.email,
      fio: this.form.value.fio
    }


    this.authService.register(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/profile'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }


}
