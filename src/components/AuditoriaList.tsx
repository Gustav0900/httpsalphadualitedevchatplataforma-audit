import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuditoriaItem } from '../types';
import { 
  Search, 
  Filter, 
  Star,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface AuditoriaListProps {
  auditorias: AuditoriaItem[];
  prompts: any[];
}

export const AuditoriaList: React.FC<AuditoriaListProps> = ({ auditorias, prompts }) => {
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');

  const auditoriasFiltradas = auditorias.filter(auditoria => {
    const prompt = prompts.find(p => p.id === auditoria.promptId);
    const matchesFiltro = prompt?.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
                         auditoria.auditor.toLowerCase().includes(filtro.toLowerCase());
    const matchesStatus = statusFiltro === 'todos' || auditoria.status === statusFiltro;
    return matchesFiltro && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pendente': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'revisao': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Auditorias</h2>
        <p className="text-gray-600">Acompanhe o processo de auditoria e qualidade dos prompts</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar auditorias..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
            <option value="revisao">Em Revisão</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {auditoriasFiltradas.map((auditoria, index) => {
          const prompt = prompts.find(p => p.id === auditoria.promptId);
          
          return (
            <motion.div
              key={auditoria.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {prompt?.titulo || 'Prompt não encontrado'}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPrioridadeColor(auditoria.prioridade)}`}>
                      {auditoria.prioridade}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{auditoria.auditor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{auditoria.dataAuditoria.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusIcon(auditoria.status)}
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-lg font-bold text-gray-900">{auditoria.pontuacao.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-500">Pontuação</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {Object.entries(auditoria.criterios).map(([criterio, valor]) => (
                  <div key={criterio} className="text-center">
                    <div className="text-sm font-medium text-gray-700 capitalize mb-1">{criterio}</div>
                    <div className="text-lg font-bold text-blue-600">{valor.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              {auditoria.comentarios && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Comentários</h4>
                  <p className="text-sm text-gray-700">{auditoria.comentarios}</p>
                </div>
              )}

              {auditoria.sugestoes.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Sugestões de Melhoria</h4>
                  <ul className="space-y-1">
                    {auditoria.sugestoes.map((sugestao, i) => (
                      <li key={i} className="text-sm text-blue-800 flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{sugestao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {auditoriasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BarChart3 className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma auditoria encontrada</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou aguarde novas auditorias</p>
        </div>
      )}
    </div>
  );
};
