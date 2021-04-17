namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string NomeArquivo { get; set; }

        public override void Validate()
        {
            LimparMensagensValidacao();

            
            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Nome do produto não informado");
           

            if (string.IsNullOrEmpty(Descricao))
                AdicionarCritica("Descrição do produto não informado");


        }
    }
}
