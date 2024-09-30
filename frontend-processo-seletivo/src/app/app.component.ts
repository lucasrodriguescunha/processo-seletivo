import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TarefasComponent } from "./components/tarefas/tarefas.component";
import { ProjetosComponent } from "./components/projetos/projetos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TarefasComponent, ProjetosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
