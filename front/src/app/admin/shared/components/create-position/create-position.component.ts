import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Division, Position} from "../../../../shared/interfaces";
import {DivisionService} from "../../services/division.service";
import {PositionService} from "../../services/position.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.scss']
})
export class CreatePositionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private positionService: PositionService,
    private router: Router
  ) { }

  // @ts-ignore
  form: FormGroup
  selected: Division | null = null
  divisions: Division[] = []

  createForm() {
    this.form = this.fb.group({
        name: [null, Validators.required],
        division_id: [null, Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.createForm()

    this.divisionService.getAllDivision().subscribe((res) => {
      this.divisions = res

      console.log(this.divisions)

    })


  }


  submit() {
    if (this.form.invalid) {
      return
    }

    // @ts-ignore
    let categoryId = this.divisions.find(division => division._id === this.form.value.division_id).category_id

    let position: Position = {
      title: this.form.value.name,
      division_id: this.form.value.division_id,
      category_id: categoryId

    }

    this.positionService.createPosition(position).subscribe(() => {
      this.form.reset()
      // this.router.navigate(['/admin'])
    })


  }

}
