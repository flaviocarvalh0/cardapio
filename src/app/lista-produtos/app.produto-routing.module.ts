

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioProdutoComponent } from '../formulario-produto/formulario-produto.component';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe.component';


const routes: Routes = [

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
