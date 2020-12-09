import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { threadId } from 'worker_threads';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  delete(id: number): void {
    if(window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product was deleted');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        }
      )
    }
  }

  ngOnInit(): void {
    let id = + this.activatedRoute.snapshot.params['id'];

    this.product$ = this
                    .productService
                    .products$
                    .pipe(
                      map(products => products.find(product => product.id === id))
                    ); 

  }

}
