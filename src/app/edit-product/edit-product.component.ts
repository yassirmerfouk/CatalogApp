import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public form!: FormGroup;
  public productId!: number;
  public product!: Product;

  public constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.form = this.formBuilder.group({
          name: this.formBuilder.control(this.product.name, [
            Validators.required,
            Validators.minLength(4),
          ]),
          price: this.formBuilder.control(this.product.price, [
            Validators.required,
            Validators.min(1),
            Validators.max(100000),
          ]),
          promotion: this.formBuilder.control(this.product.promotion),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getErrorMessage(input: string, errors: ValidationErrors) {
    // console.log(errors);
    if (errors['required']) return input + ' is required';
    if (errors['minlength'])
      return (
        input + ' length sould be > ' + errors['minlength']['requiredLength']
      );
    if (errors['min']) return input + ' sould be >= ' + errors['min']['min'];
    if (errors['max']) return input + ' sould be <= ' + errors['max']['max'];
    return '';
  }

  public handleUpdateProduct() {
    let product = this.form.value;
    product.id = this.productId;
    this.productService.updateProduct(product).subscribe({
      next : (data) => {
        alert("product update success");
        this.router.navigateByUrl("/admin/products");
      },
      error : (error) => console.log(error)
    });
  }
}
