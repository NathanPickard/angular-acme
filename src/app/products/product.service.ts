import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
  // private _productUrl = './api/products/products.json';
  private baseUrl = 'api/products';

  constructor(private http: Http/*HttpClient*/) { }


  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.baseUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      // return Observable.of(this.initializeProduct());
      return Observable.create((observer: any) => {
        observer.next(this.initializeProduct());
        observer.complete();
      });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteProduct(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'applicaiton/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);

  }

  saveProduct(product: IProduct): Observable<IProduct> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (product.id === 0) {
      return this.createProduct(product, options);
    }

    return this.updateProduct(product, options);
  }

  private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, options)
      .map(this.extractData)
      .do(data => console.log('createProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, options)
      .map(() => product)
      .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(err: Response): Observable<any> {
    console.log(err);
    return Observable.throw(err.json().error || 'Server error');
  }

  initializeProduct(): IProduct {
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }
}