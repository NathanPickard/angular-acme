import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  errorMessage: string;
  product: IProduct;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    // let id = +this._route.snapshot.paramMap.get('id');
    // this.pageTitle += `: ${id}`;
    // this.product = {
    //   "productId": 1,
    //   "productName": "Leaf Rake",
    //   "productCode": "GDN-0011",
    //   "releaseDate": "March 19, 2016",
    //   "description": "Leaf rake with 48-inch wooden handle.",
    //   "price": 19.95,
    //   "starRating": 3.2,
    //   "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    // }

    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getProduct(id);
      });
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product Detail: ' + message;
  }

}
