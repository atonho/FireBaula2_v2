import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    
    {
      title: 'Cadastro de Filmes',
      url: '/filme-cadastro',
      icon: 'person-add'
    },
    {
      title: 'Cadastro de Clientes',
      url: '/cliente-cadastro',
      icon: 'person-add'
    },
    {
      title: 'Cadastro de Funcionarios',
      url: '/funcionario-cadastro',
      icon: 'person-add'
    },
    {
      title: 'Cadastro de Chamados',
      url: '/chamado-cadastro',
      icon: 'person-add'
    },
    {
      title: 'Lista de Funcionarios',
      url: '/funcionario',
      icon: 'person-add'
    },
    {
      title: 'Lista de Chamados',
      url: '/chamado',
      icon: 'person-add'
    },
    {
      title: 'Lista de Filmes',
      url: '/filme',
      icon: 'person-add'
    },

 
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'log-out'
    }

    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
