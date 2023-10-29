import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProducts, Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [];
    for(let i=1;i<=20;i++){
      this.products.push({ id: i, name: 'computer 001', price: 2000, promotion:true });
      this.products.push({ id: ++i, name: 'phone 001', price: 2000,promotion:false });
      this.products.push({ id: ++i, name: 'camera 001', price: 2000,promotion:true });
    }
  }

  public getAllProducts(): Observable<Array<Product>> {
    if (Math.random() > 0.1) return of(this.products);
    else return throwError(() => new Error('Network connection error'));
  }

  public getPageProducts(page: number, size : number) : Observable<PageProducts>{
    let totalPages = ~~(this.products.length / size);
    let index = page * size;
    if(this.products.length % size != 0)
    totalPages++;
  let listProducts = this.products.slice(index, index+size);
  return of({page : page, size :size, totalPages :totalPages,products :listProducts});
  }

  public deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter((item) => item.id != id);
    return of(true);
  }

  public changePromotion(id: number): Observable<boolean> {
    let product = this.products.find((item) => item.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    }
    else return throwError(() => new Error('Product not found'));
  }

  public getByName(name : string): Observable<Array<Product>>{
    return of(this.products.filter((item) => item.name.includes(name)));
  }

  public getByNamePageProducts(name : string, page : number, size:number) : Observable<PageProducts>{
    let listProducts = this.products.filter((element) => element.name.includes(name));
    let totalPages = ~~(listProducts.length / size);
    let index = page * size;
    if(listProducts.length % size != 0)
    totalPages++;
  listProducts = listProducts.slice(index, index+size);
    return of({page : page, size : size,totalPages: totalPages, products:listProducts });
  }

  public addProduct(product : Product) : Observable<Product>{
    product.id = ~~(Math.random() * 100);
    this.products.push(product);
    return of(product);
  }

  public getProduct(id : number) : Observable<Product>{
    let product = this.products.find((item) => item.id == id);
    if(product == undefined)
    return throwError(() => new Error("product not found"));
  return of(product);
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products = this.products.map((item) => item.id == product.id ? product : item);
    return of(product);
  }
}
