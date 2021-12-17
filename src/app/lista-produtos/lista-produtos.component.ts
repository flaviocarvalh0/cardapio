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

  ngOnInit(): void {
    this.getProduto();
  }

  getProduto() {
    this.produtoService.getProduto().subscribe((produto: Produto[]) => {
      this.produtos = produto;
    });
  }

  editarProduto(id: number) {
    this.router.navigate(['editar', id]);
  }

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
