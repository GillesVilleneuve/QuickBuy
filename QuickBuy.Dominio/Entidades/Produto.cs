namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();

            
            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Critica - Nome não pode ficar vazio");
           

            if (string.IsNullOrEmpty(Descricao))
                AdicionarCritica("Critica - Descricao não pode ficar vazio");


        }
    }
}
