import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
  })

export class CorreiosService {

    freteSedexValor;
    freteSedexPrazo;
    fretePacValor;
    fretePacPrazo;
    public loading: boolean = false;
    public freteOk: boolean = false;

    public correiosInfo = {}

    constructor(
        private http : HttpClient        
    ) {}
    /**
     * serviços
     * 40010 = sedex
     * 41106 = PAC
     */
    
    private url = 'http://ws.correios.com.br/';
    
    public calcFrete(cep) {
        this.loading = true;
        cep = cep.replace('-','');
        this.http.get(this.url+
            'calculador/CalcPrecoPrazo.aspx?'+
            'nCdEmpresa=&sDsSenha=&sCepOrigem=04890550&'+
            'sCepDestino='+cep+'&nVlPeso=1&nCdFormato=1&nVlComprimento=20&'+
            'nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&'+
            'sCdAvisoRecebimento=n&nCdServico=40010,41106&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3',
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'text/xml') 
                .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
                , responseType:'text' 
            }
            ).pipe(map(res => {
                this.freteSedexValor = 
                res.split('<Codigo>40010')[1].split('</cServico>')[0].split('<Valor>')[1].split('</Valor>')[0];
                this.fretePacValor = 
                res.split('<Codigo>41106')[1].split('</cServico>')[0].split('<Valor>')[1].split('</Valor>')[0];
                this.freteSedexPrazo =
                res.split('<Codigo>40010')[1].split('</cServico>')[0].split('<PrazoEntrega>')[1].split('</PrazoEntrega>')[0];
                this.fretePacPrazo = 
                res.split('<Codigo>41106')[1].split('</cServico>')[0].split('<PrazoEntrega>')[1].split('</PrazoEntrega>')[0]
                
                this.correiosInfo = {
                    sedex: {
                        valor: this.freteSedexValor,
                        prazo: this.freteSedexPrazo
                    },
                    pac: {
                        valor: this.fretePacValor,
                        prazo: this.fretePacPrazo
                    }
                }
                this.freteOk = true;
                this.loading = false;
            }))
        .subscribe(error => console.log(error)
        );
    }
}