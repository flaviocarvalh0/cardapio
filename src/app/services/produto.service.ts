import { environment } from './../../environments/environment.prod';
import { Produto } from './produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  url = environment.API;
  url2 = environment.API2;




  //criando um observable de um Produto q é um array dele msm retornamos uma chamada http get passando o array de produtos e a url
  getProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url)
    .pipe(
      delay(1000)
      );
  }

  getProdutoCategoria(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url2)
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

  criarProduto(produto: Produto): Observable<Produto> {
    console.log(produto);
    debugger;
    return this.http.post<Produto>(this.url, JSON.stringify(produto),this.httpOptions);
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

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient) {}
}
