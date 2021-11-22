import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, Division, Position, Product} from "../../../../shared/interfaces";
import {CategoryService} from "../../services/category.service";
import {DivisionService} from "../../services/division.service";
import {PositionService} from "../../services/position.service";
import {ProductService} from "../../services/product.service";
import {FileService} from "../../../../shared/services/file.service";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  @ViewChild('input') inputRef: ElementRef
  image: File | null = null
  imagePreview: string | ArrayBuffer | null = ''

  categories: Category[] = []
  divisions: Division[] = []
  positions: Position[] = []

  selected_category: string | null = null
  selected_division: string | null = null
  selected_position: string | null = null

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private divisionService: DivisionService,
    private positionService: PositionService,
    private productService: ProductService,
    private fileService: FileService
  ) {
  }

  createForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      category_id: [null, Validators.required],
      division_id: [null, Validators.required],
      position_id: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      article_number: [null, Validators.required],
      product_count: [null, Validators.required],
      packing: [null, Validators.required],
    })
  }


  ngOnInit(): void {
    this.createForm()

    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
    })
  }

  selectCategory(selected_category: string | null) {

    this.divisions = []
    this.positions = []

    this.selected_division = null
    this.selected_position = null

    this.divisionService.getDivisionsByCategoryId(selected_category).subscribe((res) => {
      this.divisions = res
    })
  }

  selectDivision(selected_division: string | null) {

    this.positions = []

    this.selected_position = null

    this.positionService.getPositionsByDivisionId(selected_division).subscribe((res) => {
      this.positions = res
    })
  }


  submit() {
    if (this.form.invalid) {
      return
    }

    if (this.image) {
      this.fileService.sendImage(this.image).subscribe((imgUrl) => {
        let product: Product = {
          article_number: this.form.value.title,
          category_id: this.selected_category,
          count: this.form.value.product_count,
          description: this.form.value.description,
          division_id: this.selected_division,
          packing: this.form.value.packing,
          position_id: this.selected_position,
          price: this.form.value.price,
          title: this.form.value.title,
          image: imgUrl.url
        }

        console.log(product)

        this.productService.createPosition(product).subscribe(() => {
          this.form.reset()
          this.form.reset()
          this.image = null
          this.imagePreview = ''
          // this.router.navigate(['/admin'])
          }
        )

      })
    } else {
      let product: Product = {
        article_number: this.form.value.title,
        category_id: this.selected_category,
        count: this.form.value.product_count,
        description: this.form.value.description,
        division_id: this.selected_division,
        packing: this.form.value.packing,
        position_id: this.selected_position,
        price: this.form.value.price,
        title: this.form.value.title,
      }

      this.productService.createPosition(product).subscribe(() => {
        this.form.reset()
        this.image = null
        this.imagePreview = ''
          // this.router.navigate(['/admin'])
        }
      )
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
