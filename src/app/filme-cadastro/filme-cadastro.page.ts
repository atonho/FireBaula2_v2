import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-filme-cadastro',
  templateUrl: './filme-cadastro.page.html',
  styleUrls: ['./filme-cadastro.page.scss'],
})
export class FilmeCadastroPage implements OnInit {

  formGroup : FormGroup; // Formulário de cadastro -> Armazena todos os dados

  constructor(private formB : FormBuilder, // Inicializar o formulário (obrigatório para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebase (Firestore)
    private toastCtrl : ToastController) { // Exibir Mensagem

    // Inicializa o Formulário, obrigatório no construtor
    this.formGroup = this.formB.group({
      titulo : ['',Validators.required],
      diretor : ['',Validators.required],
      anoLancamento : ['',Validators.required],
      producao : ['',Validators.required],
      genero : ['',Validators.required],
      resumo : ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('Filmes') // Seleciono a coleção do firebase
      .add(this.formGroup.value).then(() =>{ // .add realiza o cadastro, os dados do formGroup
        this.presentToast();// Dados cadastrados com sucesso
      }).catch(()=>{ 
        console.log("Erro ao cadastrar!") // Erro
      });
      // then -> Sucesso
      // catch -> Erro
  }

  // template para toastController
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Cadastrado com sucesso',
      duration: 2000
    });
    toast.present();
  }

}
