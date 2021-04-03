using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class Entidade //abtract = ninguém instanciará minha classe
    {
        private List<string> _mensagemValidacao { get; set; }

        private List<string> mensagemValidacao // private p encapsular a mensagem (não poderá ser acessado do lado de fora, pode comecar com minúsculo)
        {
            get { return _mensagemValidacao ?? (_mensagemValidacao = new List<string>()); } //prorpiedade somente leitura
        }

        public abstract void Validate(); // ao implementar com abstrac eu forço as filhas a implementarem tb

        protected bool EhValido
            {
            get { return !mensagemValidacao.Any(); }
            }

        protected void LimparMensagensValidacao() //protected = só os filhos tem acesso
        {
            mensagemValidacao.Clear();
        }

        protected void AdicionarCritica(string mensagem)
        {
            mensagemValidacao.Add(mensagem); // mensagemValidacao está emcapsulada sendo private na classe Pai

        }



    }
}
