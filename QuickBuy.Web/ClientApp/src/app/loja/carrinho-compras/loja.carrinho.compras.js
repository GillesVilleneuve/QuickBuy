"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LojaCarrinhoCompras = void 0;
var LojaCarrinhoCompras = /** @class */ (function () {
    function LojaCarrinhoCompras() {
        this.produtos = []; // Lista já está inicializada
    }
    LojaCarrinhoCompras.prototype.adicionar = function (produto) {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage"); // estrutura para armazenar dados que não tem tempo definido para expirar
        if (!produtoLocalStorage) {
            // se nada existir dentro da sessão do localStorage
            this.produtos.push(produto); // add lista de produtos ao produto
        }
        else {
            // se existir pelo mones u único item armazenado dentro da sessão do localStorage
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos.push(produto);
        }
        localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos)); // atualiza a lista do locaStorage
    };
    LojaCarrinhoCompras.prototype.obterProdutos = function () {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage"); // estrutura para armazenar dados que não tem tempo definido para expirar
        if (produtoLocalStorage)
            return JSON.parse(produtoLocalStorage);
        return this.produtos;
    };
    LojaCarrinhoCompras.prototype.removerProduto = function (produto) {
        var produtoLocalStorage = localStorage.getItem("produtoLocalStorage"); // estrutura para armazenar dados que não tem tempo definido para expirar
        if (produtoLocalStorage) {
            this.produtos = JSON.parse(produtoLocalStorage);
            this.produtos = this.produtos.filter(function (p) { return p.id != produto.id; });
            localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
        }
    };
    LojaCarrinhoCompras.prototype.atualizar = function (produtos) {
        localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos));
    };
    LojaCarrinhoCompras.prototype.temItensCarrinhoCompras = function () {
        var itens = this.obterProdutos();
        if (itens)
            return (itens.length > 0);
    };
    return LojaCarrinhoCompras;
}());
exports.LojaCarrinhoCompras = LojaCarrinhoCompras;
//# sourceMappingURL=loja.carrinho.compras.js.map