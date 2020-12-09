import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  title: string = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  productsNb$: Observable<number>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router) { 
    
  }

  ngOnDestroy() {
    
  }

  
  ngOnInit(): void {
    this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          catchError(
                            error => {
                              this.errorMessage = error;
                              return EMPTY;
                            }
                          )
                        );

    this.productsNb$ = this
                        .products$
                        .pipe(
                          map(products => products.length),
                          startWith(0)
                        );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}
