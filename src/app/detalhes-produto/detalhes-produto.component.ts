import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../services/produto';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss'],
})
export class DetalhesProdutoComponent implements OnInit {
  inscricao!: Subscription;
  id!: number;
  produto = {} as Produto;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProdutoPorId();
  }

  getProdutoPorId() {
    this.inscricao = this.route.params.subscribe((params) => {
      this.produtoService.getProdutoPorId(params['id']).subscribe((produto) => {
        this.produto = produto;
      });
    });
  }


}
