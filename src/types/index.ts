export interface Prompt {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
  autor: string;
  dataCreacao: Date;
  ultimaEdicao: Date;
  status: 'rascunho' | 'revisao' | 'aprovado' | 'rejeitado';
  versao: number;
  tags: string[];
}

export interface AuditoriaItem {
  id: string;
  promptId: string;
  auditor: string;
  dataAuditoria: Date;
  pontuacao: number;
  criterios: {
    clareza: number;
    especificidade: number;
    contexto: number;
    estrutura: number;
    eficacia: number;
  };
  comentarios: string;
  sugestoes: string[];
  status: 'pendente' | 'concluida' | 'revisao';
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface MetricasGerais {
  totalPrompts: number;
  promptsAprovados: number;
  promptsPendentes: number;
  mediaQualidade: number;
  auditoriasConcluidas: number;
  auditoriasPendentes: number;
}
