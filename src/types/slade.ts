export type LumpType = 
  | 'sprite'
  | 'sound'
  | 'music'
  | 'graphic'
  | 'flat'
  | 'text'
  | 'texture_def'
  | 'raw'
  | 'map_header'
  | 'map_data'
  | 'marker';

export interface Lump {
  id: string;
  name: string;
  type: LumpType;
  size: number; // bytes
  offset: number; // hex offset
  format?: string;
  category: 'graphics' | 'audio' | 'text' | 'maps' | 'data' | 'marker';
  description?: string;
  // Specific asset data
  spriteData?: {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    colorCount: number;
    svgPreviewType: 'shotgunner' | 'cacodemon' | 'doomguy' | 'imp' | 'item_sphere';
  };
  audioData?: {
    duration: string;
    sampleRate: number;
    channels: string;
    format: 'DMX Sound' | 'MIDI (MUS)' | 'OGG Vorbis' | 'FLAC';
    soundfont?: string;
  };
  textData?: {
    language: 'decorate' | 'zscript' | 'mapinfo' | 'sndinfo' | 'plain';
    content: string;
  };
  textureData?: {
    width: number;
    height: number;
    patches: { name: string; x: number; y: number; width: number; height: number; color: string }[];
  };
  hexSample?: string[];
}

export interface ArchiveFile {
  id: string;
  name: string;
  type: 'wad' | 'pk3' | 'zip';
  isIWAD?: boolean;
  sizeMb: number;
  path: string;
  lumps: Lump[];
  activeLumpId?: string;
  isModified?: boolean;
}

export interface SladeTab {
  id: string;
  title: string;
  type: 'archive_list' | 'sprite' | 'sound' | 'text' | 'texture' | 'hex';
  archiveId: string;
  lumpId?: string;
  isModified?: boolean;
}

export type PaletteName = 
  | 'doom'
  | 'heretic'
  | 'hexen'
  | 'strife'
  | 'greyscale'
  | 'red_tint'
  | 'nightvision'
  | 'radsuit';

export type DeviceMode = 'phone' | 'tablet' | 'fullscreen';
export type AppTheme = 'doom-red' | 'classic-slade' | 'amoled' | 'gzdoom-neon';
