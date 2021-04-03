using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using QuickBuy.Repositorio.Config;

namespace QuickBuy.Repositorio.Contexto
{
    public class QuickBuyContexto : DbContext
    {
        
        /// <summary>
        /// Configura cada classe com o DbSet fazendo o mapeamento e a 
        /// transformação dessas propriedades <tipadas com as classes> em Tabelas na DB 
        /// </summary>


        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItensPedido { get; set; }
        public DbSet<FormaPagamento> FormaPagamento { get; set; }

        public QuickBuyContexto(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) // é utilizado para contruir o modelo do contexto
        {
            // aqui fazemos referencia as classes de mapeamento 

            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguration());
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguration());

            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento() 
            {   Id = 1, 
                Nome = "Boleto", 
                Descricao="Forma de Pagamento Boleto" 
            });

            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento()
            {
                Id = 2,
                Nome = "Cartão de Crédito",
                Descricao = "Forma de Pagamento Cartão de Crédito"
            });

            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento()
            {
                Id = 3,
                Nome = "Depósito",
                Descricao = "Forma de Pagamento Depósito"
            });

            base.OnModelCreating(modelBuilder);
        }



    }
}
