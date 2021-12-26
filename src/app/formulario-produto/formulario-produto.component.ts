import { ProdutoService } from './../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../services/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-produto.component.html',
  styleUrls: ['./formulario-produto.component.css'],
})
export class FormularioProdutoComponent implements OnInit {
  submitted!: boolean;
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //usando um formulario reativo inicializamos ele assim q for aberto a rota, iniciando os valores como nulos em caso de novot item
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      urlImagen: [null, [Validators.required]],
    });

    // em caso de edição de um item usamos as rotas e capturamos o id da mesma usando edicao/:id
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      const produto = this.produtoService.getProdutoPorId(id);
      produto.subscribe((produto) => {
        this.atualizarFormulario(produto);
      });
    });
  }

  salvar() {

    //nesse metodo verificamos se o formulario esta nulo ou ja vem com id em caso de nulo ele ira criar um novo produto se ñ for nulo era atualizado

    this.submitted = true;
    if (this.form.valid) {

      if (this.form.value.id) {
        this.produtoService
          .atualizarProduto(this.form.value)
          .subscribe((success) => {
            let con = confirm( 'Deseja atualizar o produto?')
            if(con!){

              this.router.navigate(['']);
            }
          });
      } else {
        let con = confirm("Deseja salvar esse produto?")

        if(con){

          this.produtoService
            .criarProduto(this.form.value)
            .subscribe((success) => {
              alert('Produto salvo com sucesso');
              this.router.navigate(['']);
            });
        }
      }
    }
  }

  // metodo para capturar os dados em caso de atualização
  atualizarFormulario(produto: any) {
    this.form.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      urlImagen: produto.urlImagen,
    });
  }

  // metodo para cancelar a atualização ou salvamento

  cancelar() {
    let con = confirm("Deseja cencaler a operação?")
    if(con){

      this.submitted = false;
      this.form.reset();
      this.router.navigate([''])
    }
  }

  // metodo de validaçõa de formulario
  hasError(fild: any) {
    return this.form.get(fild)?.errors;
  }
}
