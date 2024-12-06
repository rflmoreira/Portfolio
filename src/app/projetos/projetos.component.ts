import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos',
  standalone: true, // Marca o componente como standalone
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss', './projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}