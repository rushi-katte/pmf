import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = {
    id:0,
    productName: '',
    category: '',
    quntity: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct() {
    this.productService.create(this.newProduct).subscribe((data) => {
      this.products.push(data);
      this.newProduct = {id:0, productName: '', category: '', quntity: 0 };
    });
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter((p) => p.id !== id);
    });
  }

  isEditMode: boolean = false;

editProduct(product: Product) {
  this.newProduct = { ...product };
  this.isEditMode = true;
}

updateProduct() {
  console.log(this.newProduct.id)
  this.productService.update(this.newProduct.id!, this.newProduct).subscribe((updated) => {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = updated;
    }
    this.resetForm();
  });
}

resetForm() {
  this.newProduct = { id: 0, productName: '', category: '', quntity: 0 };
  this.isEditMode = false;
}
}