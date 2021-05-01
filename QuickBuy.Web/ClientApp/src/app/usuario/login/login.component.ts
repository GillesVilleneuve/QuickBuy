import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../modelo/usuario";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;
  public mensagem: string;
  private ativar_spinner: boolean;
  

  constructor(private router: Router, private activateRouter: ActivatedRoute,
          private usuarioServico: UsuarioServico) {

      }
    ngOnInit(): void {
      
      this.returnUrl = this.activateRouter.snapshot.queryParams['returnUrl'];
      this.usuario = new Usuario();
    }


  entrar() {

    this.ativar_spinner = true;
    this.usuarioServico.verificarUsuario(this.usuario) // verifica se existe o usuário na base, chama o usuarioController
      .subscribe( // recebe o q a WEB API devolveu
        usuario_json => {
          // essa linha será executada no caso de retorno sem erros

          // aqui estamos recebendo o retorno da API verificarUsuario na UsuarioController
          this.usuarioServico.usuario = usuario_json; // devolve uma instância em Type Script

          //if (this.returnUrl == null) {
            this.router.navigate(['/']);
          //} else {
           // this.router.navigate([this.returnUrl]);
          //}
        },
        err => {

          console.log(err.error);
          this.mensagem = err.error;
          this.ativar_spinner = false;          
          

        }

      );        

  }  
  
}
