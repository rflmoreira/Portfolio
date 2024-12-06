import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SobreMimComponent } from './sobre-mim/sobre-mim.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ModalProjetoComponent } from './modal-projeto/modal-projeto.component';
import { ModalContatoComponent } from './modal-contato/modal-contato.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SobreMimComponent,
    ProjetosComponent,
    ModalProjetoComponent,
    ModalContatoComponent,
    HabilidadesComponent,
    HomeComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}