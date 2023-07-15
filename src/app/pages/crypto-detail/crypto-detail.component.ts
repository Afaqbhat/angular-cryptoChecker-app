import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ChartConfiguration,ChartType} from 'chart.js'
import {BaseChartDirective} from 'ng2-charts'


import { APIService } from 'src/app/Service/api.service';
import { CurrencyService } from 'src/app/Service/set-currency.service';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css']
})
export class CryptoDetailComponent implements OnInit{
  cryptoData : any;
  cryptoId !: string;
  days : number = 1;
  currency : string = "INR";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor( private apiService:APIService, private activatedRoute:ActivatedRoute,private currencyService:CurrencyService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.cryptoId = params.id;      
    })
    this.getCryptoData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.getGraphData(this.days);
      this.getCryptoData();
    })
  }

  getCryptoData(){
    this.apiService.getCurrencyById(this.cryptoId).subscribe(data=>{
      

if(this.currency === "USD"){
  data.market_data.current_price.inr = data.market_data.current_price.usd;
  data.market_data.market_cap.inr = data.market_data.market_cap.usd;
}
else if(this.currency === "EUR"){
  data.market_data.current_price.inr = data.market_data.current_price.eur;
  data.market_data.market_cap.inr = data.market_data.market_cap.eur;
}
data.market_data.current_price.inr = data.market_data.current_price.inr;
data.market_data.market_cap.inr = data.market_data.market_cap.inr;
this.cryptoData = data;
    })
  }

  
  getGraphData(days:number){
    this.days = days
    this.apiService.getGrpahicalCurrencyData(this.cryptoId,this.currency,this.days)
    .subscribe(data=>{
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      console.log(data)
      this.lineChartData.datasets[0].data = data.prices.map((a:any)=>{
        return a[1];
        
      });
      this.lineChartData.labels = data.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }

}
