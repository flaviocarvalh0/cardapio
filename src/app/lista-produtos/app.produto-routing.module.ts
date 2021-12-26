

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioProdutoComponent } from '../formulario-produto/formulario-produto.component';



const routes: Routes = [



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
