import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../modelo/usuario";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;
  

  constructor(private router: Router, private activateRouter: ActivatedRoute) {

      }
    ngOnInit(): void {
      
      this.returnUrl = this.activateRouter.snapshot.queryParams['returnUrl'];
      this.usuario = new Usuario();
    }


  entrar() {

    if (this.usuario.email == "leo@leo.com" && this.usuario.senha == "123456") {

      sessionStorage.setItem("usuario-autenticado", "1");


      this.router.navigate([this.returnUrl]);
    }

  }

  
  
}
