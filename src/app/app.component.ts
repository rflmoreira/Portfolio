import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalContatoComponent } from './modal-contato/modal-contato.component';
import { HomeComponent } from './home/home.component';
import { SobreMimComponent } from './sobre-mim/sobre-mim.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ModalProjetoComponent } from './modal-projeto/modal-projeto.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    NavbarComponent,
    ModalContatoComponent,
    HomeComponent,
    SobreMimComponent,
    HabilidadesComponent,
    ProjetosComponent,
    ModalProjetoComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}