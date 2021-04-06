import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../../modelo/usuario";


@Injectable({

  providedIn: "root"

})
export class UsuarioServico{

  private baseURL: string;
  private _usuario: Usuario;

  set usuario(usuario: Usuario) {

    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario)); // sessioSotage só aceita valores do tipo string, por isso convertemos o TYPESCRIPT para JSON p armazenarmos
    this._usuario = usuario;

  }

  get usuario(): Usuario {

    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = JSON.parse(usuario_json); //Pega a string (JSON) e converte p TYPESCRIPT
    return this._usuario;

  }

  

  public usuario_autenticado(): boolean {
    return this._usuario != null && this.usuario.email !="" && this.usuario.senha!="";

  }

  public limpar_sessao() {

    sessionStorage.setItem("usuario-autenticado", "");
    this.usuario = null;



  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;    

  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      email: usuario.email,
      senha: usuario.senha

    }


    return this.http.post<Usuario>(this.baseURL + "api/usuario/VerificarUsuario", body, { headers });


  }



}

