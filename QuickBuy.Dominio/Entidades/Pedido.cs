using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public int UsuarioId { get; set; }

        public ICollection<ItemPedido> ItensPedido { get; set; } // uma instância de Pedido deve ter pelo menos um Itempedido

        public DateTime DataPrevisaoEntrega { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string EnderecoCompleto { get; set; }
        public int NumEndereco { get; set; }

        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();

            if (!ItensPedido.Any())
                AdicionarCritica("Critica - Pedido não pode ficar vazio");        

            if(string.IsNullOrEmpty(CEP))
                AdicionarCritica("Critica - CEP não pode ficar vazio");
            
            if (string.IsNullOrEmpty(Estado))
                AdicionarCritica("Critica - estado não pode ficar vazio");

            if (string.IsNullOrEmpty(Cidade))
                AdicionarCritica("Critica - Cidade não pode ficar vazio");

            if (FormaPagamentoId == 0)
                AdicionarCritica("Crítica - Forma de Pagamento não definida");
        }   

    }
}
