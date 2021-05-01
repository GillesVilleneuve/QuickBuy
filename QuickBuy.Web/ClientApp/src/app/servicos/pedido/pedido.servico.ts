import { Inject, Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "../../modelo/Pedido";

@Injectable({
  providedIn: "root"

})


export class PedidoServico implements OnInit {

  public _baseUrl: string;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;

  }
    ngOnInit(): void {
        
  }

  get headers(): HttpHeaders { // metodo para definir a strutura do cabeçalho

    return new HttpHeaders().set('content-type', 'application/json');
  }

  public efetivarCompra(pedido: Pedido): Observable<number> {
    return this.http.post<number>(this._baseUrl + "api/pedido", JSON.stringify(pedido), { headers: this.headers});

  }

}
