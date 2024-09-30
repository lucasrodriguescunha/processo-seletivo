import { Routes } from '@angular/router';

import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ProjetosComponent } from './components/projetos/projetos.component';

import { CriarTarefaComponent } from './components/tarefas/criar-tarefa/criar-tarefa.component';
import { ListarTarefasComponent } from './components/tarefas/listar-tarefas/listar-tarefas.component';
import { AtualizarTarefaComponent } from './components/tarefas/atualizar-tarefa/atualizar-tarefa.component';
import { ExcluirTarefaComponent } from './components/tarefas/excluir-tarefa/excluir-tarefa.component';

import { CriarProjetoComponent } from './components/projetos/criar-projeto/criar-projeto.component';
import { ListarProjetosComponent } from './components/projetos/listar-projetos/listar-projetos.component';
import { AtualizarProjetoComponent } from './components/projetos/atualizar-projeto/atualizar-projeto.component';
import { ExcluirProjetoComponent } from './components/projetos/excluir-projeto/excluir-projeto.component';
import { AlterarStatusProjetoComponent } from './components/projetos/alterar-status-projeto/alterar-status-projeto.component';
import { AlterarStatusTarefaComponent } from './components/tarefas/alterar-status-tarefa/alterar-status-tarefa.component';
import { FiltrarTarefasComponent } from './components/tarefas/filtrar-tarefas/filtrar-tarefas.component';

export const routes: Routes = [
  // Tarefas e Projetos
  { path: 'tarefas', component: TarefasComponent },
  { path: 'projetos', component: ProjetosComponent },

  // Tarefas
  { path: 'criar-tarefa', component: CriarTarefaComponent },
  { path: 'listar-tarefas', component: ListarTarefasComponent },
  { path: 'alterar-status-tarefa', component: AlterarStatusTarefaComponent},
  { path: 'filtrar-tarefas', component: FiltrarTarefasComponent},
  { path: 'atualizar-tarefa', component: AtualizarTarefaComponent },
  { path: 'excluir-tarefa', component: ExcluirTarefaComponent },

  // Projetos
  { path: 'criar-projeto', component: CriarProjetoComponent },
  { path: 'listar-projetos', component: ListarProjetosComponent },
  { path: 'alterar-status-projeto', component: AlterarStatusProjetoComponent },
  { path: 'atualizar-projeto', component: AtualizarProjetoComponent },
  { path: 'excluir-projeto', component: ExcluirProjetoComponent },
];
