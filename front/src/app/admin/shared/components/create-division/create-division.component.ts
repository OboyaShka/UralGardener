import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Category, Division} from "../../../../shared/interfaces";
import {DivisionService} from "../../services/division.service";

@Component({
  selector: 'app-create-division',
  templateUrl: './create-division.component.html',
  styleUrls: ['./create-division.component.scss']
})
export class CreateDivisionComponent implements OnInit {


  // @ts-ignore
  form: FormGroup
  categories: Category[] = []
  selected: Category | null = null

  constructor(
    private fb: FormBuilder,
    private categoryServices: CategoryService,
    private createDivision: DivisionService,
    private router: Router
  ) { }

  createForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      uniq_name: [null, [Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required]]
    })
  }

  ngOnInit(): void {
    this.createForm()

    this.categoryServices.getAllCategories().subscribe((res) => {
      this.categories = res
      console.log(res)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    let division: Division = {
      title: this.form.value.name,
      category_uniq: this.form.value.category,
      uniq_name: this.form.value.uniq_name.toLowerCase().replace(/\s/g, "-"),
    }


    this.createDivision.createDivision(division).subscribe(() => {
      this.form.reset()
      // this.router.navigate(['/admin'])
    }, () => {
    })

  }
}
