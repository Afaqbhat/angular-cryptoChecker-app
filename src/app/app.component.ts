import { Component } from '@angular/core';
import { CurrencyService } from './Service/set-currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    selectedCurrency:string='INR'

    constructor(private currencyService:CurrencyService){}

    currency(event:string){
      this.currencyService.setCurrency(event)

    }
    
}
