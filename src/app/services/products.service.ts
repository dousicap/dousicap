import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:"root"})
export class  ProductsService{
  constructor(private http:HttpClient) {
  }

  public getProducts():Observable<Product[]>{
    let host=(Math.random()>0.2)?environment.host:environment.unreachablehost;
    //let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
  }
  public getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?selected=true");
  }
  public getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?available=true");
  }
  public searchProducts(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?name_like="+keyword);
  }
  public select(product:Product):Observable<Product>{
    product.selected=!product.selected;
    return this.http.put<Product>(environment.host+"/products/"+product.id,product);
  }
  public deleteProduct(product:Product):Observable<void>{
    return this.http.delete<void>(environment.host+"/products/"+product.id);
  }
  public save(product:Product):Observable<Product>{
    return this.http.post<Product>(environment.host+"/products/",product);
  }
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(environment.host+"/products/"+id);
  }
  public updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id,product);
  }
}

