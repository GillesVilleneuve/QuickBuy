using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using QuickBuy.Repositorio.Repositorios;

namespace QuickBuy.Web
{
    public class Startup
    {

        public IConfiguration Configuration { get; }


        public Startup(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("config.json", optional: false, reloadOnChange: true) ; // adiciono o nome do arquivo que cont?m a string de conex??o em formato JSON
            Configuration = builder.Build(); // carrega o Configuration com as referencias chave:valor de Config.json

        }

       

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services
                .AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            // a linha acima configura para o ASPNET CORE que, quando ele tem que retornar estruturas em JSON
            // que ele ignore refer?ncias em Lopping.

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); // permite acessar o Contexto da requisi??o

            var connectionString = Configuration.GetConnectionString("QuickBuyDB");

            services.AddDbContext<QuickBuyContexto>(option => 
                                                        option.UseLazyLoadingProxies() // permite o carregamento de forma autom?tica dos relacionamentos
                                                        .UseMySql(connectionString, 
                                                            m => m.MigrationsAssembly("QuickBuy.Repositorio")));


            services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();// recurso de inje??o de depend?ncia
            services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();//
            services.AddScoped<IPedidoRepositorio, PedidoRepositorio>(); // interface para classe concreta

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("Http://localhost:4200/");
                }
            });
        }
    }
}
