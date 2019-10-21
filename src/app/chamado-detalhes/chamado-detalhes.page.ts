import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { Chamado } from 'src/model/chamado';

@Component({
  selector: 'app-chamado-detalhes',
  templateUrl: './chamado-detalhes.page.html',
  styleUrls: ['./chamado-detalhes.page.scss'],
})
export class ChamadoDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  chamado : Chamado = new Chamado(); // armazena o cliente da consulta

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
      data : [],
      idFuncionario : [],
      nomeEquipamento : [],
      defeito : [],
    })
  }

  ngOnInit() {
    // Carregar os dados do cliente selecionado
    this.db.collection("chamados") // Seleciona a coleção cliente
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o cliente com base no id

      // Atribuindo os dados do response para a variável cliente
      this.chamado.id = this.id; 
      this.chamado.data = response.data().data;
      this.chamado.idFuncionario = response.data().idFuncionario;
      this.chamado.nomeEquipamento = response.data().nomeEquipamento;
      this.chamado.defeito = response.data().defeito;
    })
  }

  atualizar(){
    // Atualiza dos dados do cliente
    this.db.collection('chamados') // seleciona a coleção cliente
      .doc(this.chamado.id) // Seleciona pelo ID do cliente
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('chamados') // seleciona a coleção cliente
      .doc(this.chamado.id) // Seleciona pelo ID do cliente
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

