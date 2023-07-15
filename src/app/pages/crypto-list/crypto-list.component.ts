import { Component,ViewChild,OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { APIService } from 'src/app/Service/api.service';
import { CurrencyService } from 'src/app/Service/set-currency.service'; 

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent  implements OnInit{
  cryptoTrendingList:any;
  currency : string = "INR"
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private apiService:APIService, 
    private router:Router, private currencyService:CurrencyService){}

 
  ngOnInit(){
    
    this.trendingCrypto();
    this.cryptoList();
    this.currencyService.getCurrency()
    .subscribe(val=>{
      this.currency = val;
      this.trendingCrypto();
      this.cryptoList();
    })
  }


//showing trending currency
  trendingCrypto(){
    this.apiService.getTrendingCrypto(this.currency).subscribe(data=>{
      this.cryptoTrendingList = data;

  }
  )}

  //showing list of currency
  cryptoList(){
    this.apiService.getCryptoList(this.currency).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
)}

//applying filter 
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

//show details of a particular currency
gotoDetails(row: any) {
     this.router.navigate(['crypto-details',row.id])
     }
}