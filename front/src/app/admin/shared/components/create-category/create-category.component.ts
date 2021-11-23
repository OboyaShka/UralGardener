import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Category, Product} from "../../../../shared/interfaces";
import {FileService} from "../../../../shared/services/file.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {


  // @ts-ignore
  form: FormGroup
  @ViewChild('inputImage') inputRef: ElementRef
  image: File | null = null
  imagePreview: string | ArrayBuffer | null = ''

  constructor(
    private fb: FormBuilder,
    private categoryServices: CategoryService,
    private router: Router,
    private fileService: FileService
  ) { }

  createForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      uniq_name: [null, [Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required]]
    })
  }

  ngOnInit(): void {
    this.createForm()
  }

  submit() {

    if (this.form.invalid) {
      return
    }

    if (this.image) {
      this.fileService.sendImage(this.image).subscribe((imgUrl) => {


        let category: Category = {
          title: this.form.value.name,
          uniq_name: this.form.value.uniq_name.toLowerCase().replace(/\s/g, "-"),
          image: imgUrl.url
        }

        this.categoryServices.createCategory(category).subscribe(() => {
          this.form.reset()
          // this.router.navigate(['/admin'])
        }, () => {
        })

      })
    } else {

      let category: Category = {
        title: this.form.value.name,
        uniq_name: this.form.value.uniq_name.toLowerCase().replace(/\s/g, "-"),
      }

      this.categoryServices.createCategory(category).subscribe(() => {
        this.form.reset()
        // this.router.navigate(['/admin'])
      }, () => {
      })
    }





  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }
}
