export interface Product{
  id : number;
  name : string;
  price : number;
  promotion : boolean;
}

export interface PageProducts{
  page : number;
  size : number;
  totalPages : number;
  products : Array<Product>;
}
