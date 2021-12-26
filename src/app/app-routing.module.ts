import { CardapioComponent } from './cardapio/cardapio.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';

import { FormularioProdutoComponent } from './formulario-produto/formulario-produto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: CardapioComponent},
  { path: 'produto/:id', component: DetalhesProdutoComponent },
  { path: 'editar/:id', component: FormularioProdutoComponent },
  { path: 'novo', component: FormularioProdutoComponent },
  { path: 'edicao', component: ListaProdutosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
