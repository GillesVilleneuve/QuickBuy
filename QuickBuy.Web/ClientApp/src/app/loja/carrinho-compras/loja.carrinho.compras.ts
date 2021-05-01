import { Produto } from "../../modelo/produto";



export class LojaCarrinhoCompras {
  public produtos: Produto[] = []; // Lista já está inicializada

  public adicionar(produto: Produto) {

    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage") // estrutura para armazenar dados que não tem tempo definido para expirar
    if (!produtoLocalStorage) {

      // se nada existir dentro da sessão do localStorage
      this.produtos.push(produto); // add lista de produtos ao produto
      
    } else {

      // se existir pelo mones u único item armazenado dentro da sessão do localStorage
      this.produtos = JSON.parse(produtoLocalStorage);
      this.produtos.push(produto);
      
    }
    localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos)); // atualiza a lista do locaStorage
  }
  public obterProdutos(): Produto[] { // força o método a retornar uma lista tipada

    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage") // estrutura para armazenar dados que não tem tempo definido para expirar
    if (produtoLocalStorage)
      return JSON.parse(produtoLocalStorage);
    return this.produtos;

  }

  public removerProduto(produto: Produto) {

    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage"); // estrutura para armazenar dados que não tem tempo definido para expirar

    if (produtoLocalStorage) {
      this.produtos = JSON.parse(produtoLocalStorage);
      this.produtos = this.produtos.filter(p => p.id != produto.id);
      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));

     
    }
    

  }

  public atualizar(produtos: Produto[]) {
    localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos));

  }

  public temItensCarrinhoCompras(): boolean {
    var itens = this.obterProdutos();
    if (itens)
      return (itens.length > 0);    

  }


}
