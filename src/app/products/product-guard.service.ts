import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert("Invalid product Id");
      this._router.navigate(['/products']);
      return false;
    };
    return true;
  }
}

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent): boolean {
    if (component.productForm.dirty) {
      let productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }
}
