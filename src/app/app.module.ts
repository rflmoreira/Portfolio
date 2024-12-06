import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importação dos componentes standalone
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SobreMimComponent } from './sobre-mim/sobre-mim.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ModalProjetoComponent } from './modal-projeto/modal-projeto.component';
import { ModalContatoComponent } from './modal-contato/modal-contato.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    // Nenhum componente standalone deve ser declarado aqui
  ],
  imports: [
    BrowserModule,
    // Componentes standalone devem ser importados aqui
    AppComponent,
    NavbarComponent,
    SobreMimComponent,
    ProjetosComponent,
    ModalProjetoComponent,
    ModalContatoComponent,
    HabilidadesComponent,
    HomeComponent,
    FooterComponent
  ],
  providers: [],
  // Não é necessário bootstrap do AppComponent aqui, pois ele é standalone
})
export class AppModule { }