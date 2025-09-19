import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prompt } from '../types';
import { 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Calendar,
  User,
  Tag,
  MoreVertical
} from 'lucide-react';

interface PromptsListProps {
  prompts: Prompt[];
}

export const PromptsList: React.FC<PromptsListProps> = ({ prompts }) => {
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');

  const promptsFiltrados = prompts.filter(prompt => {
    const matchesFiltro = prompt.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
                         prompt.conteudo.toLowerCase().includes(filtro.toLowerCase());
    const matchesCategoria = categoriaFiltro === 'todos' || prompt.categoria === categoriaFiltro;
    return matchesFiltro && matchesCategoria;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'revisao': return 'bg-yellow-100 text-yellow-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categorias = ['todos', ...Array.from(new Set(prompts.map(p => p.categoria)))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Biblioteca de Prompts</h2>
        <p className="text-gray-600">Gerencie e organize todos os prompts da plataforma</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar prompts..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria === 'todos' ? 'Todas as categorias' : categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {promptsFiltrados.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{prompt.titulo}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prompt.status)}`}>
                    {prompt.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{prompt.conteudo}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{prompt.autor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{prompt.dataCreacao.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>{prompt.categoria}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    v{prompt.versao}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {prompt.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <Eye className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
                >
                  <Edit className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <MoreVertical className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {promptsFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum prompt encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou criar um novo prompt</p>
        </div>
      )}
    </div>
  );
};
