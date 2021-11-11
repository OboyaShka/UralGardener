import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../shared/interfaces";
import {ProfileService} from "../shared/services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  submitted = false
  user: User | undefined

  constructor(
    public authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder
  ) { }


  createForm() {
    this.form = this.fb.group({
      phone: [this.user?.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [this.user?.email, [Validators.email]],
      fio: [this.user?.fio, [Validators.required]],
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
    this.profileService.getProfile().subscribe((user: User) => {
      this.user = user
      console.log(this.user)
      this.createForm()
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
      this.router.navigate(['/profile'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
