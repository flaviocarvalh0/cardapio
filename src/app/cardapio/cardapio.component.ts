import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../services/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
})
export class CardapioComponent implements OnInit {
  produtos!: Produto[];
  produtos$!: Observable<Produto>[];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.getProdutos()
  }

  getProdutos() {
    return this.produtoService.getProduto().subscribe((produto: Produto[]) => {
      this.produtos = produto;
    });
  }
}
