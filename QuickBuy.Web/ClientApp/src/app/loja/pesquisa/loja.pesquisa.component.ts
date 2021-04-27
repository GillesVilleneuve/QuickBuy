import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Produto } from "../../modelo/produto";
import { ProdutoServico } from "../../servicos/produto/produto.servico";


@Component({
  selector: "app-loja",
  templateUrl: "./loja.pesquisa.component.html",
  styleUrls: ["./loja.pesquisa.component.css"]

})

export class LojaPesquisaComponent implements OnInit {

  public produtos: Produto[];


  constructor(private produtoServico: ProdutoServico, private router: Router) {
    this.produtoServico.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        e => {
          console.log(e.error);
        })
  }

  ngOnInit(): void {


  }

  public abrirProduto(produto: Produto) {

    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto)); // pegou a intância do produto e transformou em JSON p JSON e aloca em memória sessionStorage
    this.router.navigate(['/loja-produto']);
  }


}
