import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-mim',
  standalone: true, // Marca o componente como standalone
  templateUrl: './sobre-mim.component.html',
  styleUrls: ['./sobre-mim.component.css']
})
export class SobreMimComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
