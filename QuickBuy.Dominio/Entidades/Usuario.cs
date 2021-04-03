using System.Collections.Generic;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        
        
        // virtual permite que o EFCore faça uma sobreposição da minha Collection para alimentá-la em tempo de execução
        public virtual ICollection<Pedido> Pedidos { get; set; } // uma instância de Usuário pode ter nenhum ou muitos pedidos

        public override void Validate()
        {
            LimparMensagensValidacao();

            if (string.IsNullOrEmpty(Email))
                AdicionarCritica("Critica - Email não pode ficar vazio");

            if (string.IsNullOrEmpty(Senha))
                AdicionarCritica("Critica - Senha não pode ficar vazio");

            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Critica - Nome não pode ficar vazio");

            if (string.IsNullOrEmpty(SobreNome))
                AdicionarCritica("Critica - Sobre Nome não pode ficar vazio");

        }
    }
}
