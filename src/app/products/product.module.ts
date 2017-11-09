import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { SharedModule } from './../shared/shared.module';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'product/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'productEdit/:id',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ConvertToSpacesPipe,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ProductModule { }
