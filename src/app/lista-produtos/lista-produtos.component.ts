import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../services/produto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent implements OnInit {
  produtoSelecionado!: Produto;
  produtos!: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // pagigina inicial onde cotem os tens e inicializamos o metodo q criamos a baixo para pegar os produtos
  ngOnInit(): void {
    this.getProduto();
  }

  //metodo q usamos para capturar os produtos do nosso serviço

  getProduto() {
    this.produtoService.getProduto().subscribe((produto: Produto[]) => {
      this.produtos = produto;
    });
  }


  // capturando o id do produto em caso de edição e enviando o msm para o formulario com o id do msm
  editarProduto(id: number) {
    this.router.navigate(['editar', id]);
  }


  //metodo para excluir um produto 
  removerProduto(produto: any) {
    let con = confirm('Deseja excluir  ' + `${produto.nome}`)
    if(con){

      this.produtoSelecionado = produto;
      this.produtoService.excluirProduto(produto.id).subscribe(() => {
        this.getProduto();
      });
    }
  }
}
