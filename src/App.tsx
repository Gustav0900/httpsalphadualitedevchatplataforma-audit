import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrompts } from './hooks/usePrompts';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PromptsList } from './components/PromptsList';
import { CriarPrompt } from './components/CriarPrompt';
import { AuditoriaList } from './components/AuditoriaList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { prompts, auditorias, metricas, loading, adicionarPrompt } = usePrompts();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard metricas={metricas} loading={loading} />;
      case 'prompts':
        return <PromptsList prompts={prompts} />;
      case 'auditoria':
        return <AuditoriaList auditorias={auditorias} prompts={prompts} />;
      case 'criar':
        return <CriarPrompt onAdicionarPrompt={adicionarPrompt} />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'equipe':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestão de Equipe</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard metricas={metricas} loading={loading} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        <div className="p-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
