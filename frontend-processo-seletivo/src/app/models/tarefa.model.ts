export interface Tarefa {
  id: number;
  nome: string;
  descricao: string;
  concluida: boolean;
  projetoId: number | null;
  status?: string;
}
