import { Funcionario } from './../../model/funcionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage implements OnInit {

  listaFuncionario : Funcionario[] = []; // Variável para armazenar os clientes (Array)

  constructor(private db: AngularFirestore, // Módulo de banco de dados
    private router : Router) {
      
    
    
  }

  ngOnInit() {
     
    // Solicita os dados da coleção clientes no Firebase
    this.db.collection('funcionarios').snapshotChanges().subscribe(response=>{ 

      this.listaFuncionario = []; // limpando a lista

      // response retona um objeto do firebase, precisamos converter em
      // um objeto cliente

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em cliente.
      response.forEach(doc=>{ 
      
        let f = new Funcionario(); // Cria um novo objeto cliente
        f.setFuncionario(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em clientes

        this.listaFuncionario.push(f); // adiciona este cliente a lista

      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })

    });
  }


  goPage(idValue : string){
    // Redirecionando para ClienteDetalhes
    // enviando o id do cliente (idValue)
    this.router.navigate(['funcionario-detalhes',{id : idValue}]);
  } 

}
