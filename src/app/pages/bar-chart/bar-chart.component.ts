import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  data: any[] = [];
  private dataSubscription: Subscription;
  public productData:any;
  constructor(private productService: ProductDataService) {
    this.dataSubscription = this.productService.getData().subscribe(
      (data) => {
        let products:any = localStorage.getItem('product')
        this.productData = JSON.parse(products);
        if(this.productData)
          data = this.productData;
        this.chartData = data.map(item => ({
          name: item.name,
          value: item.price
        }));
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
   }

  public chartData:any;
  view: any = [500, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Products';
  showYAxisLabel = true;
  yAxisLabel = 'Price ($)';

  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnInit(): void {
  }
 
  onSelect(event:any) {
    console.log(event);
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
