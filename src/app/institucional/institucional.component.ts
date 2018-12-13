import { Component, OnInit } from '@angular/core';
import { GeneralServices } from 'src/app/services/services';

@Component({
  selector: 'app-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.scss']
})
export class InstitucionalComponent implements OnInit {

  private keyToken = 'Token';
  private keyLogin = 'Login';
  private orders;
  private loader:boolean = false;
  private keyCustomer = 'Customer';

  constructor(private GS: GeneralServices) { }

  ngOnInit() {
  }



  private logout() {
    localStorage.clear();
    this.GS.logado = false;
    this.GS.loggedIn = false;
  }

  private checkSession(token?) {

    if (!token && localStorage.getItem(this.keyToken) && localStorage.getItem(this.keyLogin)) {
      let token = localStorage.getItem(this.keyToken);
      let login = localStorage.getItem(this.keyLogin);
      this.GS.sessionChecker(token)
        .subscribe(res => {
          this.GS.getUserDetails(login, token)
            .subscribe(resp => {
              localStorage.setItem(this.keyCustomer, resp['data'].idCliente);
              this.resolveLoggin(resp, login);
            });
        });
      return;
    }
  }

  private resolveLoggin(resp, login) {
    localStorage.setItem(this.keyLogin, login);
    this.loader = false;
    this.GS.logado = true;
    this.GS.loggedIn = true;
  }
}
