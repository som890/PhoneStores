import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;
  durationInSeconds = 5;
  
  constructor(private activedRoute: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private snackBar: MatSnackBar){}
  
  ngOnInit(): void {
    this.product = this.activedRoute.snapshot.data['product'];
    console.log(this.product);
  }
  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckOut: true, id: productId 
    }]);
  }

  addToCart(productId: any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
        // Hiển thị thông báo thành công
        this.snackBar.open('Sản phẩm đã được thêm vào giỏ hàng', 'Đóng', {
          duration: this.durationInSeconds * 1000, // Thời gian hiển thị thông báo (milliseconds)
        });
      }, (error) => {
        console.log(error);
      }
    )
  }

}
