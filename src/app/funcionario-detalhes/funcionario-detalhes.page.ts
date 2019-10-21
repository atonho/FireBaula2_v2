import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { Funcionario } from 'src/model/funcionario';

@Component({
  selector: 'app-funcionario-detalhes',
  templateUrl: './funcionario-detalhes.page.html',
  styleUrls: ['./funcionario-detalhes.page.scss'],
})
export class FuncionarioDetalhesPage implements OnInit {
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  funcionario : Funcionario = new Funcionario(); // armazena o cliente da consulta

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    // Capturando o Id do cliente
    this.id = this.actRoute.snapshot.paramMap.get('id');

    // Inicializando o formulário
    this.formGroup = this.formB.group({
      nome : [],
      matricula : [],
      email : [],
      salario : [],
      cargo : [],
    })
  }

  ngOnInit() {
    // Carregar os dados do cliente selecionado
    this.db.collection("funcionario") // Seleciona a coleção cliente
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o cliente com base no id

      // Atribuindo os dados do response para a variável cliente
      this.funcionario.id = this.id; 
      this.funcionario.nome = response.data().nome;
      this.funcionario.matricula = response.data().matricula;
      this.funcionario.email = response.data().email;
      this.funcionario.salario = response.data().salario;
      this.funcionario.cargo = response.data().cargo;
    })
  }

  atualizar(){
    // Atualiza dos dados do cliente
    this.db.collection('funcionarios') // seleciona a coleção cliente
      .doc(this.funcionario.id) // Seleciona pelo ID do cliente
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('funcionarios') // seleciona a coleção cliente
      .doc(this.funcionario.id) // Seleciona pelo ID do cliente
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['home']); // redireciona para home
    })
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir();
          }
        }
      ]
    });

    await alert.present();
  }
}
