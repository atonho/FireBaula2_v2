import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filme } from 'src/model/filme';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.page.html',
  styleUrls: ['./filme-detalhes.page.scss'],
})
export class FilmeDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  filme :Filme = new Filme(); // armazena o cliente da consulta

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
      titulo : [],
      diretor : [],
      anoLancamento : [],
      producao : [],
      genero : [],
      resumo : [],
    })
  }

  ngOnInit() {
    // Carregar os dados do cliente selecionado
    this.db.collection("filmes") // Seleciona a coleção cliente
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o cliente com base no id

      // Atribuindo os dados do response para a variável cliente
      this.filme.id = this.id; 
      this.filme.titulo = response.data().titulo;
      this.filme.diretor = response.data().diretor;
      this.filme.anoLancamento = response.data().anoLancamento;
      this.filme.producao = response.data().producao;
      this.filme.genero = response.data().genero;
      this.filme.resumo = response.data().resumo;
    })
  }

  atualizar(){
    // Atualiza dos dados do Filme
    this.db.collection('filmes') // seleciona a coleção Filme
      .doc(this.filme.id) // Seleciona pelo ID do Filme
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('filmes') // seleciona a coleção Filme
      .doc(this.filme.id) // Seleciona pelo ID do cliente
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


  
