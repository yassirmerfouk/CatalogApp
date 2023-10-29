import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public addProductForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder,private productService : ProductService, private router : Router) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      price: this.formBuilder.control(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
      promotion: this.formBuilder.control(null, []),
    });
  }

  public getErrorMessage(input: string, errors: ValidationErrors) {
    // console.log(errors);
    if (errors['required']) return input + ' is required';
    if(errors['minlength']) return input + ' length sould be > ' + errors['minlength']['requiredLength'];
    if (errors['min']) return input + ' sould be >= ' + errors['min']['min'];
    if (errors['max']) return input + ' sould be <= ' + errors['max']['max'];
    return '';
  }

  public handleAddProduct() {
    let product = this.addProductForm.value;
    this.productService.addProduct(product).subscribe({
      next : (data) =>{
        alert("Product add success");
        this.router.navigateByUrl("/admin/products");
      },
      error : (error) =>{
        console.log(error);
      }
    });
  }
}
