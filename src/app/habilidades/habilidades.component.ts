import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidades',
  standalone: true, // Marca o componente como standalone
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}