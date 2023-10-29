import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { OnInit } from '@angular/core';
import { Product } from '../models/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products!: Array<Product>;
  public errorMessage!: String;
  public formGroup!: FormGroup;

  public page = 0;
  public size = 5;
  public totalPages = 0;

  public action = 'all';

  public constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public authenticationService : AuthenticationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      searchKeyword: this.formBuilder.control(null),
    });
    this.handelGetPageProducts();
  }

  public handelGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.errorMessage = 'There is an error in network connection';
      },
    });
  }

  public handelGetPageProducts() {
    this.productService.getPageProducts(this.page, this.size).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
    });
  }

  public handleDeleteProduct(product: Product) {
    const conf = confirm('Are you sure ?');
    if (conf) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          // let index = this.products.indexOf(product);
          // this.products.splice(index, 1);
          this.products = this.products.filter((item) => item.id != product.id);
        },
      });
    }
  }

  public handleChangePromo(product: Product) {
    let promotion = product.promotion;
    this.productService.changePromotion(product.id).subscribe({
      next: () => {
        product.promotion = !promotion;
      },
    });
  }

  public handleSearch(): void {
    this.action = 'search';
    let searchKeyword = this.formGroup.value.searchKeyword;
    this.productService
      .getByNamePageProducts(searchKeyword, this.page, this.size)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
        },
      });
  }

  public handleChangePage(page: number, size: number) {
    this.page = page;
    this.size = size;
    if (this.action == 'search') this.handleSearch();
    else this.handelGetPageProducts();
  }

  public handleEditProduct(product : Product){
    this.router.navigateByUrl("/admin/edit-product/" + product.id);
  }
}
