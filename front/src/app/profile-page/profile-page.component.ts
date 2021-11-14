import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    private fb: FormBuilder,
  ) { }


  createForm() {
    this.form = this.fb.group({
      phone: [this.user?.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      email: [this.user?.email, [Validators.email]],
      fio: [this.user?.fio, [Validators.required]],
      passwords:this.fb.group({
        password: [null, []],
        passwordNew: [null, [Validators.minLength(6)]]
      }, {validators:
          [
            rightPassword('password', this.user?.password),
            groupComplite('password', 'passwordNew')
          ]})

    })

    function rightPassword(passwordKey: string, userPassword: string | undefined) {
      // @ts-ignore
      return (group: FormGroup): {[key: string]: any} | null => {
        let password = group.controls[passwordKey];

        if (password.value !== userPassword && typeof(password.value) === "string" && password.value.length != 0) {
          return {
            rightPassword: true
          };
        }
        return null
      }
    }

    function groupComplite(passwordKey: string, passwordNewKey: string) {
      return (group: FormGroup): {[key: string]: any} | null => {
        let password = group.controls[passwordKey];
        let passwordNew = group.controls[passwordNewKey];


        if (typeof(password.value) === "string" && password.value.length != 0 && passwordNew.value === null
          || typeof(password.value) === "string" && typeof(passwordNew.value) === "string" && password.value.length != 0 && passwordNew.value.length === 0) {
          return {
            notFilledBoth: true
          };
        }
        return null
      }
    }
  }


  ngOnInit(): void {

    this.createForm()
    this.profileService.getProfile().subscribe((user: User) => {
      this.user = user
      this.createForm()
    })



  }

  submit() {

    if (this.form?.invalid) {
      return
    }

    const user: User = {
      _id: this.user!._id,
      phone: this.form.value.phone,
      fio: this.form.value.fio,
      email: this.form.value.email,
      password: this.user!.password
    }

    if (this.form.value.passwords.password) {
      user.password = this.form.value.passwords.passwordNew
    }


    this.profileService.updateProfile(user).subscribe(() => {
      this.form.reset()
      this.profileService.getProfile().subscribe((user: User) => {
        this.user = user
        this.createForm()
      })
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
