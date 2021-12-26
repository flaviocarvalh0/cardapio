import { environment } from './../../environments/environment.prod';
import { Produto } from './produto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  url = "https://jsonplaceholder.typicode.com/comments";

  //criando um observable de um Produto q é um array dele msm retornamos uma chamada http get passando o array de produtos e a url
  getProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url)
    .pipe(
      delay(1000)
      );
  }

    //Aqui capturamos um item pelo id especifico passando um id como parametro usamos um observable de tipo qualquer passamos a url + o id
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
