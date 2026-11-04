import React from 'react';
import { SladeTab } from '../types/slade';
import { X, Plus, FolderArchive, Image, Music, FileCode, Layers, Binary } from 'lucide-react';

interface Props {
  tabs: SladeTab[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onNewTab: () => void;
}

export const TabsStrip: React.FC<Props> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab
}) => {
  const getTabIcon = (type: SladeTab['type']) => {
    switch (type) {
      case 'archive_list':
        return <FolderArchive className="w-3.5 h-3.5 text-rose-400" />;
      case 'sprite':
        return <Image className="w-3.5 h-3.5 text-emerald-400" />;
      case 'sound':
        return <Music className="w-3.5 h-3.5 text-amber-400" />;
      case 'text':
        return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
      case 'texture':
        return <Layers className="w-3.5 h-3.5 text-fuchsia-400" />;
      case 'hex':
        return <Binary className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <FolderArchive className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  return (
    <div className="flex items-center bg-neutral-950 border-b border-neutral-800/90 h-9 px-1 overflow-x-auto scrollbar-none select-none">
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex items-center gap-2 h-7 px-2.5 rounded-t-md text-xs cursor-pointer border-t-2 transition-all ${
                isActive
                  ? 'bg-neutral-900 border-rose-500 text-neutral-100 font-medium'
                  : 'bg-neutral-950/60 border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
              }`}
            >
              <span className="shrink-0">{getTabIcon(tab.type)}</span>
              <span className="font-mono text-[11px] truncate max-w-[130px]">{tab.title}</span>
              {tab.isModified && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              )}

              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="p-0.5 rounded-sm hover:bg-neutral-800 text-neutral-500 hover:text-neutral-200 transition-colors ml-0.5"
                  title="Cerrar pestaña"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button */}
        <button
          onClick={onNewTab}
          className="p-1 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/80 rounded transition-colors ml-1"
          title="Abrir nuevo archivo o lump en pestaña"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
