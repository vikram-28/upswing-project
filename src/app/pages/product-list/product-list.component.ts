import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProductDataService } from '../services/product-data.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productForm:FormGroup;
  modalRef?: BsModalRef;
  public selectedProduct:any;
  public updateProduct = false;
  public productData:any;
  private dataSubscription: Subscription;

  constructor(private productService: ProductDataService,private modalService: BsModalService) {

    this.dataSubscription = this.productService.getData().subscribe(
      (data) => {
        let products:any = localStorage.getItem('product')
        this.productData = JSON.parse(products);
        if(this.productData)
          data = this.productData;
        this.product = data;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
   }
 public product:any;
  ngOnInit(): void {
  }
 get name(){
  return this.productForm.get('name');
 }
 get description(){
  return this.productForm.get('description');
 }
 get price(){
  return this.productForm.get('price');
 }
 get category(){
  return this.productForm.get('category');
 }
 get quantity(){
  return this.productForm.get('quantity');
 }
 
   OnAddProduct(eve:any){
    this.updateProduct = false;
    this.resetForm();
    this.openModal(eve);
   }
   openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  newProduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0
  };
  OnSubmit() {
    if (this.productForm.invalid) {
      return this.productForm.markAllAsTouched();
    }
  
    this.newProduct = this.productForm.value;
    const existingProductIndex = this.product.findIndex((p:any) => p.id === this.newProduct.id);
    if (existingProductIndex !== -1) {
      this.product[existingProductIndex] = {...this.newProduct};
    } else {
      this.newProduct.id = this.product.length + 1;
      this.product.push({...this.newProduct});
    }
    this.productService.addData(this.product);
    this.handleStates();
  }
  
  handleStates(){
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      category: '',
      quantity: 0
    };
    this.modalRef?.hide();
    this.resetForm();
  }
  resetForm(){
    this.productForm.reset();
  }
  selectProduct(eve:any, template: TemplateRef<void>){
    this.updateProduct = true;
    this.modalRef = this.modalService.show(template);
    this.productForm.setValue(eve);
  }
  public selectedProdData:any;
  removeProduct(eve:any,deleteProd:TemplateRef<void>){
    this.modalRef = this.modalService.show(deleteProd);
    this.selectedProdData = eve;
    
  }
  OnConfirmation(){
    this.productService.deleteData(this.selectedProdData.id);
    this.modalRef?.hide();
  }

}
