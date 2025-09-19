import React from 'react';
import { motion } from 'framer-motion';
import { MetricasGerais } from '../types';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Search
} from 'lucide-react';

interface DashboardProps {
  metricas: MetricasGerais | null;
  loading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ metricas, loading }) => {
  if (loading || !metricas) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total de Prompts',
      value: metricas.totalPrompts,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Prompts Aprovados',
      value: metricas.promptsAprovados,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Pendentes de Revisão',
      value: metricas.promptsPendentes,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-5%'
    },
    {
      title: 'Qualidade Média',
      value: `${metricas.mediaQualidade}/10`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+0.3'
    },
    {
      title: 'Auditorias Concluídas',
      value: metricas.auditoriasConcluidas,
      icon: Search,
      color: 'bg-indigo-500',
      change: '+15%'
    },
    {
      title: 'Auditorias Pendentes',
      value: metricas.auditoriasPendentes,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-10%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral da plataforma de auditoria de prompts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
                </div>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[
              { acao: 'Novo prompt criado', usuario: 'Ana Silva', tempo: '2 min atrás' },
              { acao: 'Auditoria concluída', usuario: 'João Santos', tempo: '15 min atrás' },
              { acao: 'Prompt aprovado', usuario: 'Maria Costa', tempo: '1 hora atrás' },
              { acao: 'Revisão solicitada', usuario: 'Pedro Lima', tempo: '2 horas atrás' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.acao}</p>
                  <p className="text-xs text-gray-500">por {item.usuario} • {item.tempo}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status da Qualidade</h3>
          <div className="space-y-4">
            {[
              { criterio: 'Clareza', pontuacao: 8.5, cor: 'bg-green-500' },
              { criterio: 'Especificidade', pontuacao: 7.8, cor: 'bg-blue-500' },
              { criterio: 'Contexto', pontuacao: 8.2, cor: 'bg-purple-500' },
              { criterio: 'Estrutura', pontuacao: 7.9, cor: 'bg-indigo-500' },
              { criterio: 'Eficácia', pontuacao: 8.1, cor: 'bg-yellow-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.cor} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.criterio}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.cor} h-2 rounded-full`}
                      style={{ width: `${(item.pontuacao / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.pontuacao.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
