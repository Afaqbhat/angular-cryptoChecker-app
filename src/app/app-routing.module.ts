import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './pages/crypto-list/crypto-list.component';
import { CryptoDetailComponent } from './pages/crypto-detail/crypto-detail.component';

const routes: Routes = [
  {path:'', redirectTo:'crypto-list', pathMatch:'full'},
  {path:'crypto-list', component: CryptoListComponent},
  {path:'crypto-details/:id', component: CryptoDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
