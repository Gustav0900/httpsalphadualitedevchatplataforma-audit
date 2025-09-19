import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Plus, 
  BarChart3, 
  Settings,
  Users,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prompts', label: 'Prompts', icon: FileText },
    { id: 'auditoria', label: 'Auditoria', icon: Search },
    { id: 'criar', label: 'Criar Prompt', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'equipe', label: 'Equipe', icon: Users },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">PromptAudit</h1>
            <p className="text-sm text-gray-500">Plataforma de Auditoria</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  );
};
