import { useState, useEffect } from 'react';
import { Prompt, AuditoriaItem, MetricasGerais } from '../types';
import { faker } from '@faker-js/faker';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [auditorias, setAuditorias] = useState<AuditoriaItem[]>([]);
  const [metricas, setMetricas] = useState<MetricasGerais | null>(null);
  const [loading, setLoading] = useState(true);

  // Gerar dados mock
  useEffect(() => {
    const generateMockPrompts = (): Prompt[] => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: faker.string.uuid(),
        titulo: `Prompt ${i + 1}: ${faker.lorem.words(4)}`,
        conteudo: faker.lorem.paragraphs(3),
        categoria: faker.helpers.arrayElement(['Marketing', 'Desenvolvimento', 'Análise', 'Criativo', 'Técnico']),
        autor: faker.person.fullName(),
        dataCreacao: faker.date.past(),
        ultimaEdicao: faker.date.recent(),
        status: faker.helpers.arrayElement(['rascunho', 'revisao', 'aprovado', 'rejeitado']),
        versao: faker.number.int({ min: 1, max: 5 }),
        tags: faker.helpers.arrayElements(['IA', 'GPT', 'Criativo', 'Análise', 'Automação'], { min: 2, max: 4 })
      }));
    };

    const generateMockAuditorias = (promptsList: Prompt[]): AuditoriaItem[] => {
      return Array.from({ length: 8 }, (_, i) => ({
        id: faker.string.uuid(),
        promptId: faker.helpers.arrayElement(promptsList).id,
        auditor: faker.person.fullName(),
        dataAuditoria: faker.date.recent(),
        pontuacao: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 }),
        criterios: {
          clareza: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 }),
          especificidade: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 }),
          contexto: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 }),
          estrutura: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 }),
          eficacia: faker.number.float({ min: 6.0, max: 10.0, fractionDigits: 1 })
        },
        comentarios: faker.lorem.paragraph(),
        sugestoes: Array.from({ length: 3 }, () => faker.lorem.sentence()),
        status: faker.helpers.arrayElement(['pendente', 'concluida', 'revisao']),
        prioridade: faker.helpers.arrayElement(['baixa', 'media', 'alta'])
      }));
    };

    setTimeout(() => {
      const mockPrompts = generateMockPrompts();
      const mockAuditorias = generateMockAuditorias(mockPrompts);
      
      setPrompts(mockPrompts);
      setAuditorias(mockAuditorias);
      
      const mockMetricas: MetricasGerais = {
        totalPrompts: mockPrompts.length,
        promptsAprovados: mockPrompts.filter(p => p.status === 'aprovado').length,
        promptsPendentes: mockPrompts.filter(p => p.status === 'revisao').length,
        mediaQualidade: 8.2,
        auditoriasConcluidas: mockAuditorias.filter(a => a.status === 'concluida').length,
        auditoriasPendentes: mockAuditorias.filter(a => a.status === 'pendente').length
      };
      
      setMetricas(mockMetricas);
      setLoading(false);
    }, 1000);
  }, []);

  const adicionarPrompt = (novoPrompt: Omit<Prompt, 'id' | 'dataCreacao' | 'ultimaEdicao'>) => {
    const prompt: Prompt = {
      ...novoPrompt,
      id: faker.string.uuid(),
      dataCreacao: new Date(),
      ultimaEdicao: new Date()
    };
    setPrompts(prev => [prompt, ...prev]);
  };

  const adicionarAuditoria = (novaAuditoria: Omit<AuditoriaItem, 'id' | 'dataAuditoria'>) => {
    const auditoria: AuditoriaItem = {
      ...novaAuditoria,
      id: faker.string.uuid(),
      dataAuditoria: new Date()
    };
    setAuditorias(prev => [auditoria, ...prev]);
  };

  return {
    prompts,
    auditorias,
    metricas,
    loading,
    adicionarPrompt,
    adicionarAuditoria
  };
};
