import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string;
  senha : string;

  constructor(public afAuth: AngularFireAuth, // Autenticação
    private router : Router, 
    private menuCtrl : MenuController, // Desativar/Ativar menu
    private toastCtrl : ToastController,
    private storageServ : StorageService) {
      this.menuCtrl.swipeEnable(false);
    }

  ngOnInit() { }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword( // Função para realizar login com
      this.email,this.senha).then(()=>{         // e-mail e senha
        let c = new Cliente();
        c.email = this.afAuth.auth.currentUser.email;
        c.id = this.afAuth.auth.currentUser.uid;
        // Login correto
        this.storageServ.setLocalUser(c);
        this.menuCtrl.swipeEnable(true); // ativiar o menu
        this.router.navigate(['/home']); // redirecionar para home

      }).catch(err=>{
        // Login incorreto
        this.presentToast(); // exibe mensagem de erro
      })
  }
 async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Login inválido',
    duration: 2000
  });
  toast.present();
}

}