import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true, // Marca o componente como standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}