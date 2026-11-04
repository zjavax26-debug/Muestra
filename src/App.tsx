import React, { useState } from 'react';
import { ArchiveFile, Lump, SladeTab, PaletteName, DeviceMode } from './types/slade';
import { MOCK_ARCHIVES } from './data/mockArchives';
import { AndroidFrame } from './components/AndroidFrame';
import { TopAppBar } from './components/TopAppBar';
import { TabsStrip } from './components/TabsStrip';
import { LumpList } from './components/LumpList';
import { AssetPreview } from './components/AssetPreview';
import { NavigationDrawer } from './components/NavigationDrawer';
import { LumpActionSheet } from './components/LumpActionSheet';
import { BaseResourceModal } from './components/BaseResourceModal';
import { PaletteRemapModal } from './components/PaletteRemapModal';
import { AboutModal } from './components/AboutModal';
import { 
  Plus, ListFilter, Eye, Sparkles, FolderArchive, 
  Upload, Tag, FilePlus, ChevronLeft
} from 'lucide-react';

export default function App() {
  const [archives, setArchives] = useState<ArchiveFile[]>(MOCK_ARCHIVES);
  const [activeArchiveId, setActiveArchiveId] = useState<string>('archive-doom2');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('phone');
  const [activePalette, setActivePalette] = useState<PaletteName>('doom');
  const [mobileView, setMobileView] = useState<'lumps' | 'preview'>('preview');

  // Initial SLADE Tabs
  const [tabs, setTabs] = useState<SladeTab[]>([
    { id: 'tab-archive', title: 'DOOM2.WAD', type: 'archive_list', archiveId: 'archive-doom2' },
    { id: 'tab-sposf1', title: 'SPOSF1 [Sprite]', type: 'sprite', archiveId: 'archive-doom2', lumpId: 'lump-sposf1' },
    { id: 'tab-music', title: 'D_RUNNIN [Music]', type: 'sound', archiveId: 'archive-doom2', lumpId: 'lump-d-runnin' },
    { id: 'tab-decorate', title: 'DECORATE', type: 'text', archiveId: 'archive-doom2', lumpId: 'lump-decorate' },
    { id: 'tab-textures', title: 'STARTAN3 [Tex]', type: 'texture', archiveId: 'archive-doom2', lumpId: 'lump-startan3' },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-sposf1');

  // Modals and drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isBaseResourceModalOpen, setIsBaseResourceModalOpen] = useState<boolean>(false);
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [actionSheetLump, setActionSheetLump] = useState<Lump | null>(null);
  const [showFabMenu, setShowFabMenu] = useState<boolean>(false);

  // Android Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeArchive = archives.find(a => a.id === activeArchiveId) || archives[0];
  const activeTab = tabs.find(t => t.id === activeTabId);

  // Active lump is either from active tab or active archive
  const activeLump = activeArchive.lumps.find(
    l => l.id === (activeTab?.lumpId || activeArchive.activeLumpId || 'lump-sposf1')
  );

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleSelectLump = (lump: Lump) => {
    // Check if there is an existing tab for this lump
    const existingTab = tabs.find(t => t.lumpId === lump.id);
    if (existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      // Create new tab or update active tab
      const tabType = lump.type === 'sprite' || lump.type === 'flat' || lump.type === 'graphic'
        ? 'sprite'
        : lump.type === 'sound' || lump.type === 'music'
        ? 'sound'
        : lump.type === 'text'
        ? 'text'
        : lump.type === 'texture_def'
        ? 'texture'
        : 'hex';

      const newTab: SladeTab = {
        id: `tab-${lump.id}-${Date.now()}`,
        title: lump.name,
        type: tabType,
        archiveId: activeArchive.id,
        lumpId: lump.id
      };
      setTabs(prev => [...prev, newTab]);
      setActiveTabId(newTab.id);
    }

    // On phone view, switch directly to asset preview
    if (deviceMode === 'phone') {
      setMobileView('preview');
    }
  };

  const handleCloseTab = (tabId: string) => {
    if (tabs.length <= 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTabId(tabId);
    const targetTab = tabs.find(t => t.id === tabId);
    if (targetTab?.type === 'archive_list') {
      setMobileView('lumps');
    } else {
      setMobileView('preview');
    }
  };

  const handleSaveArchive = () => {
    setArchives(prev => prev.map(a => a.id === activeArchive.id ? { ...a, isModified: false } : a));
    showNotification(`Archivo "${activeArchive.name}" guardado exitosamente.`);
  };

  return (
    <AndroidFrame deviceMode={deviceMode}>
      {/* Top App Bar with Drawer trigger, archive info and SLADE 3 submenus */}
      <TopAppBar
        archive={activeArchive}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        onSaveArchive={handleSaveArchive}
        onOpenBaseResourceModal={() => setIsBaseResourceModalOpen(true)}
        onOpenPaletteModal={() => setIsPaletteModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onNotify={showNotification}
      />

      {/* SLADE Document / Lump Tabs Strip */}
      <TabsStrip
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={() => {
          showNotification('Nueva pestaña abierta para explorar archivo');
          const newTab: SladeTab = {
            id: `tab-new-${Date.now()}`,
            title: 'Nuevo Lump',
            type: 'archive_list',
            archiveId: activeArchive.id
          };
          setTabs(prev => [...prev, newTab]);
          setActiveTabId(newTab.id);
        }}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Tablet / Desktop Split View or Phone View Logic */}
        {deviceMode === 'phone' ? (
          /* Phone View: Switch between Lump List and Preview, or show active tab */
          <div className="flex-1 flex flex-col min-h-0 relative">
            {mobileView === 'lumps' ? (
              <LumpList
                lumps={activeArchive.lumps}
                activeLumpId={activeLump?.id}
                onSelectLump={handleSelectLump}
                onOpenLumpActionSheet={(lump) => setActionSheetLump(lump)}
              />
            ) : (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Back to list pill for quick navigation */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-950 border-b border-neutral-800 text-xs">
                  <button
                    onClick={() => setMobileView('lumps')}
                    className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver a Lista de Lumps</span>
                  </button>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {activeLump?.name || 'Previsualizador'}
                  </span>
                </div>
                <div className="flex-1 min-h-0">
                  <AssetPreview
                    lump={activeLump}
                    activePalette={activePalette}
                    onSelectPalette={setActivePalette}
                    onOpenPaletteModal={() => setIsPaletteModalOpen(true)}
                    onNotify={showNotification}
                  />
                </div>
              </div>
            )}

            {/* Android Mobile Bottom Segmented Tab Bar */}
            <div className="h-12 bg-neutral-950 border-t border-neutral-800 flex items-center justify-around px-2 select-none shrink-0 z-20">
              <button
                onClick={() => setMobileView('lumps')}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${
                  mobileView === 'lumps' ? 'text-rose-400 font-medium' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ListFilter className="w-4 h-4" />
                <span className="text-[10px] mt-0.5">Explorador Lumps</span>
              </button>

              <button
                onClick={() => setMobileView('preview')}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${
                  mobileView === 'preview' ? 'text-rose-400 font-medium' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="text-[10px] mt-0.5">Previsualización</span>
              </button>

              <button
                onClick={() => setIsPaletteModalOpen(true)}
                className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-neutral-200 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] mt-0.5">Paleta Doom</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tablet / Fullscreen Dual-Pane Layout */
          <div className="flex-1 flex min-h-0">
            {/* Left Pane: Lump Explorer Tree */}
            <div className="w-80 md:w-96 shrink-0 h-full border-r border-neutral-800">
              <LumpList
                lumps={activeArchive.lumps}
                activeLumpId={activeLump?.id}
                onSelectLump={handleSelectLump}
                onOpenLumpActionSheet={(lump) => setActionSheetLump(lump)}
              />
            </div>

            {/* Right Pane: Asset Preview & Editors */}
            <div className="flex-1 min-w-0 h-full flex flex-col">
              <AssetPreview
                lump={activeLump}
                activePalette={activePalette}
                onSelectPalette={setActivePalette}
                onOpenPaletteModal={() => setIsPaletteModalOpen(true)}
                onNotify={showNotification}
              />
            </div>
          </div>
        )}

        {/* Android Floating Action Button (FAB) for "+ New Lump" */}
        <div className="absolute right-4 bottom-14 sm:bottom-6 z-30">
          {showFabMenu && (
            <div className="mb-2 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-1.5 space-y-1 text-xs text-neutral-200 min-w-[170px] animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setShowFabMenu(false);
                  showNotification('Nuevo Lump vacío insertado en el WAD.');
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-800 text-left"
              >
                <FilePlus className="w-4 h-4 text-emerald-400" />
                <span>Nuevo Lump Vacío</span>
              </button>
              <button
                onClick={() => {
                  setShowFabMenu(false);
                  showNotification('Marcador de sección (S_START) insertado.');
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-800 text-left"
              >
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Nuevo Marcador (S_START)</span>
              </button>
              <button
                onClick={() => {
                  setShowFabMenu(false);
                  showNotification('Importando archivo externo a WAD...');
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-800 text-left"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Importar Archivo</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setShowFabMenu(!showFabMenu)}
            className="w-13 h-13 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-950/70 flex items-center justify-center active:scale-95 transition-transform"
            title="Crear o importar lump"
          >
            <Plus className={`w-6 h-6 transition-transform duration-200 ${showFabMenu ? 'rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Android Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900 text-neutral-100 text-xs font-medium rounded-full shadow-2xl border border-neutral-700/80 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Android Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        archives={archives}
        activeArchiveId={activeArchiveId}
        onSelectArchive={(id) => {
          setActiveArchiveId(id);
          showNotification(`Cambiado a archivo: ${archives.find(a => a.id === id)?.name}`);
        }}
        onOpenBaseResourceModal={() => setIsBaseResourceModalOpen(true)}
        onOpenPaletteModal={() => setIsPaletteModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onNotify={showNotification}
      />

      {/* Contextual Lump Action Bottom Sheet */}
      <LumpActionSheet
        lump={actionSheetLump}
        isOpen={!!actionSheetLump}
        onClose={() => setActionSheetLump(null)}
        onOpenInNewTab={(lump) => handleSelectLump(lump)}
        onOpenHex={(lump) => {
          handleSelectLump(lump);
          showNotification(`Visualizando bytes de ${lump.name}`);
        }}
        onNotify={showNotification}
      />

      {/* Base Resource (IWAD) Selector Modal */}
      <BaseResourceModal
        isOpen={isBaseResourceModalOpen}
        onClose={() => setIsBaseResourceModalOpen(false)}
        onNotify={showNotification}
      />

      {/* Palette Selector & Remap Modal */}
      <PaletteRemapModal
        isOpen={isPaletteModalOpen}
        onClose={() => setIsPaletteModalOpen(false)}
        activePalette={activePalette}
        onSelectPalette={setActivePalette}
        onNotify={showNotification}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </AndroidFrame>
  );
}
