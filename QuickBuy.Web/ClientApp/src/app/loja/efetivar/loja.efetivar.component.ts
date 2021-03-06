import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemPedido } from "../../modelo/itemPedido";
import { Pedido } from "../../modelo/Pedido";
import { Produto } from "../../modelo/produto";
import { PedidoServico } from "../../servicos/pedido/pedido.servico";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras";

@Component({

  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ["./loja.efetivar.component.css"]
})

export class LojaEfetivarComponent implements OnInit {

  public carrinhoCompras: LojaCarrinhoCompras;
  public produtos: Produto[];
  public total: number;

  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinhoCompras();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
  }

  constructor(private usuarioServico: UsuarioServico, private pedidoServico: PedidoServico, private router: Router) { // dessa forma declaramos uma variável implícita dentro do componente atraavés de injeção de dependência

  }

  public atualizarPreco(produto: Produto, quantidade: number) {

    if (!produto.precoOriginal) {
      produto.precoOriginal = produto.preco;
    }
    if (quantidade <= 0) {
      quantidade = 1;
      produto.quantidade = quantidade;
    }

    produto.preco = produto.precoOriginal * quantidade;
    this.carrinhoCompras.atualizar(this.produtos);
    this.atualizarTotal();

  }

  public remover(produto: Produto) {

    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
  }

  public atualizarTotal() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public efetivarCompra() {
   

    this.pedidoServico.efetivarCompra(this.criarPedido()) // bloco de chamada de uma implementação de uma Web API
      .subscribe(
        pedidoId => {

          console.log(pedidoId);

          sessionStorage.setItem("pedidoId", pedidoId.toString());
          this.produtos = [];
          this.carrinhoCompras.limparCarrinhoCompras();
          
          this.router.navigate(["/compra-realizada-sucesso"]);// redirecionar para outra página
        },
        e => {
          console.log(e.error);
        });

  }

  public criarPedido(): Pedido {
    let pedido = new Pedido();
    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "123456789";
    pedido.cidade = "Belo Horizonte";
    pedido.estado = "Minas Gerais";
    pedido.enderecoCompleto = "Waldir Leite Pena";
    pedido.numEndereco = "168";
    
    pedido.dataPrevisaoEntrega = new Date();
    pedido.formaPagamentoId = 1;

    this.produtos = this.carrinhoCompras.obterProdutos();

    for (let produto of this.produtos) { // uma variável produto para cada produto da lista produtos
      let itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;

      if (!produto.quantidade)
        produto.quantidade = 1;

      itemPedido.quantidade = produto.quantidade;

      // push adiciona (itemPedido) ao contexto do for na lista de itens de pedido dentro de pedido.
      pedido.itensPedido.push(itemPedido); 

    }

    return pedido;

  }




}
