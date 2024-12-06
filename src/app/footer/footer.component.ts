import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // Marca o componente como standalone
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }
  
}