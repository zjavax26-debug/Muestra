import React from 'react';
import { DeviceMode } from '../types/slade';
import { Wifi, BatteryMedium, Signal, ChevronLeft, Circle, Square } from 'lucide-react';

interface Props {
  deviceMode: DeviceMode;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<Props> = ({ deviceMode, children }) => {
  // If fullscreen mode, render directly without artificial phone bezel
  if (deviceMode === 'fullscreen') {
    return (
      <div className="flex flex-col h-screen w-screen bg-neutral-950 overflow-hidden">
        {/* Android Status Bar */}
        <AndroidStatusBar />
        {/* App Content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {children}
        </div>
        {/* Android Navigation Bar */}
        <AndroidNavigationBar />
      </div>
    );
  }

  // Phone Mode: Pixel 9 Pro style frame
  if (deviceMode === 'phone') {
    return (
      <div className="min-h-screen bg-neutral-900 py-4 px-2 flex items-center justify-center">
        {/* Outer Phone Bezel */}
        <div className="relative w-full max-w-[412px] h-[890px] max-h-[96vh] bg-black rounded-[44px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden border border-neutral-800">
          {/* Front Camera Punch-hole */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-950 rounded-full border border-neutral-800/80 z-40 pointer-events-none flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative flex-1 flex flex-col bg-neutral-950 rounded-[34px] overflow-hidden">
            <AndroidStatusBar />
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
              {children}
            </div>
            <AndroidNavigationBar />
          </div>
        </div>
      </div>
    );
  }

  // Tablet Mode: Pixel Tablet style wide aspect ratio
  return (
    <div className="min-h-screen bg-neutral-900 py-6 px-4 flex items-center justify-center">
      <div className="relative w-full max-w-[1020px] h-[720px] max-h-[95vh] bg-black rounded-[36px] p-3 shadow-2xl flex flex-col overflow-hidden border border-neutral-800">
        {/* Tablet Screen */}
        <div className="relative flex-1 flex flex-col bg-neutral-950 rounded-[26px] overflow-hidden">
          <AndroidStatusBar isTablet />
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            {children}
          </div>
          <AndroidNavigationBar />
        </div>
      </div>
    </div>
  );
};

const AndroidStatusBar: React.FC<{ isTablet?: boolean }> = ({ isTablet }) => {
  return (
    <div className="h-7 px-5 bg-neutral-950 text-neutral-300 text-[11px] font-mono flex items-center justify-between select-none z-30 shrink-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-200">12:45</span>
        <span className="text-[10px] text-rose-500 font-sans font-bold">DOOM</span>
      </div>

      <div className="flex items-center gap-2 text-neutral-300">
        <span className="text-[10px] font-sans font-bold">5G</span>
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">98%</span>
          <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

const AndroidNavigationBar: React.FC = () => {
  return (
    <div className="h-6 bg-neutral-950 flex items-center justify-center select-none z-30 shrink-0">
      {/* Android Gesture Bar */}
      <div className="w-28 h-1 bg-neutral-500/60 rounded-full hover:bg-neutral-400 transition-colors cursor-pointer" />
    </div>
  );
};
