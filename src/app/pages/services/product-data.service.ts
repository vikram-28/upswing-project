import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor() { 
  }
  public products = [
    {
      id: 1,
      name: 'Washing Machine',
      description: 'Fully Automatic Front Load Washing Machine with In-built Heater White',
      price: 50,
      category: 'Home Accessories',
      quantity: 24,
  },
    {
      id: 2,
      name: 'Canon EOS 3000D',
      description: 'If you are a photography enthusiast, then the Canon EOS 3000D DSLR Camera is a must-have gadget.',
      price: 70,
      category: 'Electronics',
      quantity: 24,
  }
   ];

   private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.products);
   getData(): Observable<any[]> {
    
    return this.dataSubject.asObservable();
  }
  addData(item: any): void {
    this.products = [...item];
    this.setdatatoLocal();
    this.dataSubject.next(this.products);
  }
  deleteData(id: number): void {
    this.products = this.products.filter(item => item.id !== id);
    this.setdatatoLocal();
    this.dataSubject.next(this.products);
  }
  setdatatoLocal(){
    let products:any = JSON.stringify(this.products);
    localStorage.setItem('product',products)
  }

}
