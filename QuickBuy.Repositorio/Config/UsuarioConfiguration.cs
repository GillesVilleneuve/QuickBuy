using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Config
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {

        //Estamos utilizando a abordagem codeFirst

        // Aqui dentro é onde fazemos todo mapeamento das prorpiedades ao EFCore dos campos das tabelas
        public void Configure(EntityTypeBuilder<Usuario> builder) 
        {
            builder.HasKey(u => u.Id); // qual a prorpiedade de Usuário que será chave primaria

            builder.Property(u => u.Email)
                .IsRequired() //campo de preenchimento obrigatório
                .HasMaxLength(50);

            builder.Property(u => u.Senha)
                .IsRequired()
                .HasMaxLength(400);

            builder.Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(u => u.SobreNome)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasMany(u => u.Pedidos) // relacionamento com tabela Usuario
                .WithOne(pe => pe.Usuario); // Com WithOne dentro de HasMany teremos acesso as pripriedades de Pedidos. (Pedido só pode estar ligado a um Usuario por vez)




        }
    }
}
