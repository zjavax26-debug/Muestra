import { ArchiveFile } from '../types/slade';

export const MOCK_ARCHIVES: ArchiveFile[] = [
  {
    id: 'archive-doom2',
    name: 'DOOM2.WAD',
    type: 'wad',
    isIWAD: true,
    sizeMb: 14.6,
    path: '/sdcard/Doom/IWADs/DOOM2.WAD',
    isModified: false,
    lumps: [
      {
        id: 'lump-playpal',
        name: 'PLAYPAL',
        type: 'raw',
        size: 10752,
        offset: 0x0000000C,
        format: 'Doom Palette (14x256)',
        category: 'data',
        description: 'Tabla de 14 paletas RGB de 256 colores de Doom',
        hexSample: [
          '00 00 00 1F 17 0B 2B 23 17 37 2F 1F 43 3B 2B 4F',
          '47 37 5B 53 43 67 5F 4F 73 6B 5B 7F 77 67 8B 83',
          '73 97 8F 7F A3 9B 8B AF A7 97 BB B3 A3 C7 BF AF',
          'D3 CB BB DF D7 C7 EB E3 D3 F7 EF DF FF FB EB 00',
          '1B 00 27 00 33 00 3F 00 4B 00 57 00 63 00 6F 00'
        ]
      },
      {
        id: 'lump-colormap',
        name: 'COLORMAP',
        type: 'raw',
        size: 8704,
        offset: 0x00002A0C,
        format: 'Doom Colormap (34 levels)',
        category: 'data',
        description: 'Tablas de atenuación de luz y visión nocturna',
        hexSample: [
          '00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F',
          '10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F',
          '01 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F',
          '11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20'
        ]
      },
      {
        id: 'lump-s-start',
        name: 'S_START',
        type: 'marker',
        size: 0,
        offset: 0x00004C00,
        format: 'Marker',
        category: 'marker',
        description: 'Inicio de sección de Sprites'
      },
      {
        id: 'lump-sposf1',
        name: 'SPOSF1',
        type: 'sprite',
        size: 3418,
        offset: 0x00004C10,
        format: 'Doom GFX (Sprite)',
        category: 'graphics',
        description: 'Shotgun Guy - Animación de ataque/disparo',
        spriteData: {
          width: 58,
          height: 64,
          offsetX: 28,
          offsetY: 62,
          colorCount: 68,
          svgPreviewType: 'shotgunner'
        }
      },
      {
        id: 'lump-headf1',
        name: 'HEADF1',
        type: 'sprite',
        size: 5120,
        offset: 0x00005A10,
        format: 'Doom GFX (Sprite)',
        category: 'graphics',
        description: 'Cacodemon - Fotograma de bola de plasma',
        spriteData: {
          width: 72,
          height: 74,
          offsetX: 36,
          offsetY: 66,
          colorCount: 84,
          svgPreviewType: 'cacodemon'
        }
      },
      {
        id: 'lump-playa1',
        name: 'PLAYA1',
        type: 'sprite',
        size: 3824,
        offset: 0x00006E10,
        format: 'Doom GFX (Sprite)',
        category: 'graphics',
        description: 'Doom Marine - Paso frontal 1',
        spriteData: {
          width: 48,
          height: 60,
          offsetX: 24,
          offsetY: 58,
          colorCount: 72,
          svgPreviewType: 'doomguy'
        }
      },
      {
        id: 'lump-s-end',
        name: 'S_END',
        type: 'marker',
        size: 0,
        offset: 0x00007D00,
        format: 'Marker',
        category: 'marker',
        description: 'Fin de sección de Sprites'
      },
      {
        id: 'lump-d-runnin',
        name: 'D_RUNNIN',
        type: 'music',
        size: 24192,
        offset: 0x00008000,
        format: 'MIDI (MUS)',
        category: 'audio',
        description: 'Música de MAP01: Running from Evil (Bobby Prince)',
        audioData: {
          duration: '3:58',
          sampleRate: 44100,
          channels: '16 Canales MIDI',
          format: 'MIDI (MUS)',
          soundfont: 'Roland SC-55 v2.0'
        }
      },
      {
        id: 'lump-d-e1m1',
        name: 'D_E1M1',
        type: 'music',
        size: 19840,
        offset: 0x0000DE80,
        format: 'MIDI (MUS)',
        category: 'audio',
        description: "Música de E1M1: At Doom's Gate",
        audioData: {
          duration: '1:42',
          sampleRate: 44100,
          channels: '16 Canales MIDI',
          format: 'MIDI (MUS)',
          soundfont: 'Yamaha OPL3 FM Emulation'
        }
      },
      {
        id: 'lump-dspistol',
        name: 'DSPISTOL',
        type: 'sound',
        size: 6184,
        offset: 0x00012C00,
        format: 'DMX Sound',
        category: 'audio',
        description: 'Efecto de sonido de disparo de pistola',
        audioData: {
          duration: '0:0.42',
          sampleRate: 11025,
          channels: 'Mono 8-bit',
          format: 'DMX Sound'
        }
      },
      {
        id: 'lump-dsshotgn',
        name: 'DSSHOTGN',
        type: 'sound',
        size: 14210,
        offset: 0x00014428,
        format: 'DMX Sound',
        category: 'audio',
        description: 'Efecto de sonido de disparo y recarga de escopeta',
        audioData: {
          duration: '0:0.95',
          sampleRate: 11025,
          channels: 'Mono 8-bit',
          format: 'DMX Sound'
        }
      },
      {
        id: 'lump-dssecret',
        name: 'DSSECRET',
        type: 'sound',
        size: 8940,
        offset: 0x00017BBC,
        format: 'DMX Sound',
        category: 'audio',
        description: 'Efecto de área secreta descubierta',
        audioData: {
          duration: '0:0.68',
          sampleRate: 11025,
          channels: 'Mono 8-bit',
          format: 'DMX Sound'
        }
      },
      {
        id: 'lump-decorate',
        name: 'DECORATE',
        type: 'text',
        size: 4520,
        offset: 0x0001A000,
        format: 'ZDoom Script',
        category: 'text',
        description: 'Definiciones de actores y armas en ZDoom',
        textData: {
          language: 'decorate',
          content: `// ============================================
// SLADE 3 Mobile - Definición DECORATE (Doom 2)
// Actor personalizado para Shotgunner Táctico
// ============================================

ACTOR TacticalShotgunGuy : ShotgunGuy replaces ShotgunGuy
{
  Health 45
  Radius 20
  Height 56
  Mass 100
  Speed 9
  PainChance 160
  Monster
  +FLOORCLIP
  +DOHARMSPECIES
  SeeSound "shotguy/sight"
  AttackSound "shotguy/attack"
  PainSound "shotguy/pain"
  DeathSound "shotguy/death"
  ActiveSound "shotguy/active"
  Obituary "%o fue acribillado por un Sargent Táctico."
  DropItem "Shotgun"

  States
  {
  Spawn:
    SPOS AB 10 A_Look
    Loop
  See:
    SPOS AABBCCDD 3 A_Chase
    Loop
  Missile:
    SPOS E 10 A_FaceTarget
    SPOS F 10 Bright A_CustomBulletAttack(22.5, 0, 7, 5, "BulletPuff")
    SPOS E 10
    Goto See
  Pain:
    SPOS G 3
    SPOS G 3 A_Pain
    Goto See
  Death:
    SPOS H 5
    SPOS I 5 A_Scream
    SPOS J 5 A_NoBlocking
    SPOS K 5
    SPOS L -1
    Stop
  XDeath:
    SPOS M 5
    SPOS N 5 A_XScream
    SPOS O 5 A_NoBlocking
    SPOS PQRST 5
    SPOS U -1
    Stop
  }
}`
        }
      },
      {
        id: 'lump-mapinfo',
        name: 'MAPINFO',
        type: 'text',
        size: 2180,
        offset: 0x0001C500,
        format: 'ZDoom Mapinfo',
        category: 'text',
        description: 'Configuración de mapas, títulos y cielo',
        textData: {
          language: 'mapinfo',
          content: `// SLADE 3 - Doom 2 Mapinfo Configuration
map MAP01 "Entryway"
{
  levelnum = 1
  titlepatch = "CWILV00"
  next = "MAP02"
  secretnext = "MAP02"
  sky1 = "SKY1", 0
  cluster = 1
  par = 30
  music = "D_RUNNIN"
}

map MAP02 "Underhalls"
{
  levelnum = 2
  titlepatch = "CWILV01"
  next = "MAP03"
  secretnext = "MAP03"
  sky1 = "SKY1", 0
  cluster = 1
  par = 90
  music = "D_STALKS"
}

cluster 1
{
  flat = "FLOOR4_8"
  exittext = "HAS ENTRADO EN LA INSTALACIÓN..."
}`
        }
      },
      {
        id: 'lump-p-start',
        name: 'P_START',
        type: 'marker',
        size: 0,
        offset: 0x0001DF00,
        format: 'Marker',
        category: 'marker',
        description: 'Inicio de sección de Patches de textura'
      },
      {
        id: 'lump-startan3',
        name: 'STARTAN3',
        type: 'texture_def',
        size: 16384,
        offset: 0x0001E000,
        format: 'Doom Texture Composite',
        category: 'graphics',
        description: 'Textura de pared metálica industrial compuesta',
        textureData: {
          width: 128,
          height: 128,
          patches: [
            { name: 'W94_1', x: 0, y: 0, width: 64, height: 128, color: '#887b64' },
            { name: 'W94_2', x: 64, y: 0, width: 64, height: 128, color: '#6e6350' },
            { name: 'VENT1', x: 32, y: 32, width: 64, height: 64, color: '#383633' }
          ]
        }
      },
      {
        id: 'lump-bigdoor1',
        name: 'BIGDOOR1',
        type: 'texture_def',
        size: 16384,
        offset: 0x00022000,
        format: 'Doom Texture Composite',
        category: 'graphics',
        description: 'Gran compuerta de base tecnológica',
        textureData: {
          width: 128,
          height: 128,
          patches: [
            { name: 'DOOR01_L', x: 0, y: 0, width: 64, height: 128, color: '#7a858e' },
            { name: 'DOOR01_R', x: 64, y: 0, width: 64, height: 128, color: '#68737c' },
            { name: 'LIGHT_G', x: 56, y: 16, width: 16, height: 16, color: '#3cd070' }
          ]
        }
      },
      {
        id: 'lump-p-end',
        name: 'P_END',
        type: 'marker',
        size: 0,
        offset: 0x00026000,
        format: 'Marker',
        category: 'marker',
        description: 'Fin de sección de Patches'
      },
      {
        id: 'lump-f-start',
        name: 'F_START',
        type: 'marker',
        size: 0,
        offset: 0x00026100,
        format: 'Marker',
        category: 'marker',
        description: 'Inicio de sección de Flats (Suelos/Techados)'
      },
      {
        id: 'lump-floor4-8',
        name: 'FLOOR4_8',
        type: 'flat',
        size: 4096,
        offset: 0x00026200,
        format: 'Doom Flat (64x64 raw)',
        category: 'graphics',
        description: 'Flat de ácido verde radiactivo / moco tóxico',
        spriteData: {
          width: 64,
          height: 64,
          offsetX: 0,
          offsetY: 0,
          colorCount: 32,
          svgPreviewType: 'item_sphere'
        }
      },
      {
        id: 'lump-f-end',
        name: 'F_END',
        type: 'marker',
        size: 0,
        offset: 0x00027200,
        format: 'Marker',
        category: 'marker',
        description: 'Fin de sección de Flats'
      },
      {
        id: 'lump-map01',
        name: 'MAP01',
        type: 'map_header',
        size: 0,
        offset: 0x00028000,
        format: 'Doom Map Entry',
        category: 'maps',
        description: 'Cabecera de mapa: MAP01 Entryway (10 sub-lumps)'
      },
      {
        id: 'lump-things',
        name: 'THINGS',
        type: 'map_data',
        size: 1380,
        offset: 0x00028010,
        format: 'Doom Map Lump',
        category: 'maps',
        description: 'Entidades y monstruos de MAP01 (138 Things)'
      },
      {
        id: 'lump-linedefs',
        name: 'LINEDEFS',
        type: 'map_data',
        size: 6720,
        offset: 0x00028574,
        format: 'Doom Map Lump',
        category: 'maps',
        description: 'Líneas y paredes de MAP01 (480 Linedefs)'
      }
    ]
  },
  {
    id: 'archive-brutal',
    name: 'brutalv21.pk3',
    type: 'pk3',
    isIWAD: false,
    sizeMb: 142.8,
    path: '/sdcard/Doom/Mods/brutalv21.pk3',
    isModified: false,
    lumps: [
      {
        id: 'b-zscript',
        name: 'zscript.txt',
        type: 'text',
        size: 38200,
        offset: 0x00000000,
        format: 'ZScript File',
        category: 'text',
        description: 'Código ZScript principal de Brutal Doom v21',
        textData: {
          language: 'zscript',
          content: `version "4.10"

class BD_GoreMaster : EventHandler
{
  override void WorldThingDamaged(WorldEvent e)
  {
    if (!e.Thing) return;
    if (e.Damage > 50 && e.Thing.bISMONSTER)
    {
      e.Thing.A_SpawnItemEx("BrutalBloodSpray", 0, 0, 32);
    }
  }
}`
        }
      },
      {
        id: 'b-sndinfo',
        name: 'sndinfo.txt',
        type: 'text',
        size: 12400,
        offset: 0x00001000,
        format: 'ZDoom SndInfo',
        category: 'text',
        description: 'Tabla de ruteo de sonidos y pitch shifting'
      }
    ]
  },
  {
    id: 'archive-eviternity',
    name: 'eviternity.wad',
    type: 'wad',
    isIWAD: false,
    sizeMb: 32.1,
    path: '/sdcard/Download/eviternity.wad',
    isModified: true,
    lumps: [
      {
        id: 'e-map01',
        name: 'MAP01',
        type: 'map_header',
        size: 0,
        offset: 0x00000000,
        format: 'Map Lump',
        category: 'maps',
        description: 'Eviternity MAP01: Anagnorisis'
      }
    ]
  }
];

export const PALETTES = [
  { id: 'doom', name: 'Doom (PLAYPAL 0)', colorHex: '#cf3322', desc: 'Paleta canónica de Doom / Doom II' },
  { id: 'heretic', name: 'Heretic (Fantasy)', colorHex: '#3b82f6', desc: 'Paleta Raven Software / Fantasía oscura' },
  { id: 'hexen', name: 'Hexen: Beyond Heretic', colorHex: '#8b5cf6', desc: 'Paleta Hexen con tonos morados y bronces' },
  { id: 'strife', name: 'Strife (Rogue Ent.)', colorHex: '#eab308', desc: 'Paleta post-apocalíptica tech' },
  { id: 'greyscale', name: 'Escala de Grises', colorHex: '#a3a3a3', desc: '256 tonos monocromáticos para alphas' },
  { id: 'red_tint', name: 'Daño Rojo (PLAYPAL 1)', colorHex: '#ef4444', desc: 'Flash de daño al ser atacado por demonios' },
  { id: 'nightvision', name: 'Visor Nocturno (Light-Amp)', colorHex: '#22c55e', desc: 'Amplificador de luz infrarrojo de Doom' },
  { id: 'radsuit', name: 'Traje Antirradiación', colorHex: '#eab308', desc: 'Filtro protector verde-amarillento para lodo ácido' }
];

export const SOUNDFONTS = [
  { id: 'sc55', name: 'Roland Sound Canvas SC-55', type: 'General MIDI Hardware', desc: 'El sintetizador original con el que Bobby Prince compuso Doom' },
  { id: 'opl3', name: 'Yamaha YMF262 (OPL3 FM)', type: 'AdLib / Sound Blaster 16', desc: 'Auténtica síntesis FM retro de los 90s con 4 operadores' },
  { id: 'fluid', name: 'FluidSynth GeneralUser GS', type: 'SoundFont SF2 (32MB)', desc: 'Banco estéreo de alta fidelidad para GZDoom en Android' },
  { id: 'gus', name: 'Gravis UltraSound (GUS)', type: 'Wavetable 1MB RAM', desc: 'La tarjeta de culto preferida por los veteranos de id Software' }
];
