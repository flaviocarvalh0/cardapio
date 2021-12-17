import { Produto } from './produto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  url = 'http://localhost:3000/produto';

  //criando um observable de um Produto q é um array dele msm retornamos uma chamada http get passando o array de produtos e a url
  getProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url)
    .pipe(
      delay(1000)
      );
  }

  getProdutoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  //para excluir passamo um id como parametro retornornamos uma chamada hhtp delete passando a url + o id
  excluirProduto(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  criarProduto(produto: any) {
    return this.http.post(this.url, produto);
  }

  editaProduto(id: number) {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  atualizarProduto(produto: any) {
    return this.http.put(`${this.url}/${produto.id}`, produto);
  }

  salvar(produto: any) {
    if (produto.id) {
      return this.atualizarProduto(produto);
    }
    return this.criarProduto(produto);
  }

  constructor(private http: HttpClient) {}
}
