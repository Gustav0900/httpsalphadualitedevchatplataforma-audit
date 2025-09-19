import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prompt } from '../types';
import { Save, Eye, RefreshCw, Lightbulb } from 'lucide-react';

interface CriarPromptProps {
  onAdicionarPrompt: (prompt: Omit<Prompt, 'id' | 'dataCreacao' | 'ultimaEdicao'>) => void;
}

export const CriarPrompt: React.FC<CriarPromptProps> = ({ onAdicionarPrompt }) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [autor, setAutor] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'rascunho' | 'revisao' | 'aprovado' | 'rejeitado'>('rascunho');
  const [preview, setPreview] = useState(false);

  const categorias = ['Marketing', 'Desenvolvimento', 'Análise', 'Criativo', 'Técnico'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoPrompt: Omit<Prompt, 'id' | 'dataCreacao' | 'ultimaEdicao'> = {
      titulo,
      conteudo,
      categoria,
      autor,
      status,
      versao: 1,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onAdicionarPrompt(novoPrompt);
    
    // Reset form
    setTitulo('');
    setConteudo('');
    setCategoria('');
    setAutor('');
    setTags('');
    setStatus('rascunho');
  };

  const gerarSugestao = () => {
    const sugestoes = [
      'Você é um especialista em {área}. Sua tarefa é {objetivo específico}. Considere {contexto importante} e forneça {tipo de resultado esperado}.',
      'Como {papel profissional}, analise {situação/dados} e recomende {ações específicas} baseado em {critérios de avaliação}.',
      'Crie um {tipo de conteúdo} para {público-alvo} que {objetivo do conteúdo}. O tom deve ser {estilo de comunicação} e incluir {elementos específicos}.'
    ];
    const sugestaoAleatoria = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    setConteudo(sugestaoAleatoria);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Novo Prompt</h2>
        <p className="text-gray-600">Desenvolva prompts eficazes seguindo as melhores práticas</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Dicas para um bom prompt:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Seja específico sobre o papel/contexto</li>
              <li>• Defina claramente o objetivo</li>
              <li>• Inclua exemplos quando necessário</li>
              <li>• Especifique o formato de saída desejado</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Prompt
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Assistente de Marketing Digital"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rascunho">Rascunho</option>
              <option value="revisao">Em Revisão</option>
              <option value="aprovado">Aprovado</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Conteúdo do Prompt
            </label>
            <motion.button
              type="button"
              onClick={gerarSugestao}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Gerar Sugestão</span>
            </motion.button>
          </div>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Descreva o prompt de forma clara e específica..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          <div className="text-sm text-gray-500 mt-1">
            {conteudo.length} caracteres
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (separadas por vírgula)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ex: IA, GPT, Marketing, Automação"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Salvar Prompt</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setPreview(!preview)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-5 w-5" />
            <span>{preview ? 'Ocultar' : 'Visualizar'}</span>
          </motion.button>
        </div>
      </form>

      {preview && conteudo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Pré-visualização</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">{titulo || 'Título do Prompt'}</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{conteudo}</p>
            {tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.split(',').map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-md">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
