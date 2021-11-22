import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../../../shared/interfaces";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {


  // @ts-ignore
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private categoryServices: CategoryService,
    private router: Router
  ) { }

  createForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.createForm()
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    let category: Category = {
      title: this.form.value.name
    }

    this.categoryServices.createCategory(category).subscribe(() => {
      this.form.reset()
      // this.router.navigate(['/admin'])
    }, () => {
    })

  }
}
