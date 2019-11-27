import { Component, OnInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.page.html',
  styleUrls: ['./rotas.page.scss'],
})
export class RotasPage implements OnInit {
  map: any;

  constructor() { }

  ngOnInit() {
    const position = new google.maps.LatLng(-21.763409, -43.349034);

    const mapOptions = {
      zoom: 18,
      center: position,
      //disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Titulo
      //title: 'Minha posição',

      //Animção
      //animation: google.maps.Animation.DROP, // BOUNCE

      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });
  }

}
