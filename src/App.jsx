import React, { useState } from 'react';
import { Download, Upload, Smile, Palette, Layout, Smartphone, Crown, X, Check, Box, Layers, Grid } from 'lucide-react';


export default function AppIconApp() {
  // State: İkon Ayarları
  const [config, setConfig] = useState({
    type: 'emoji', // 'emoji' | 'image' | 'text'
    content: '🚀',
    bgColor: '#4f46e5',
    bgGradient: true,
    iconColor: '#ffffff',
    scale: 80, // %
    radius: 22, // % (0=kare, 50=yuvarlak, 22=squircle)
    shadow: true
  });

  const [showProModal, setShowProModal] = useState(false);

  // Emojiler
  const popularEmojis = ['🚀', '⚡', '🔥', '💎', '🎮', '📸', '🎵', '❤️', '🦄', '🤖', '🧠', '💼'];

  // Renk Paletleri
  const palettes = [
    { bg: '#4f46e5', name: 'Indigo' },
    { bg: '#ef4444', name: 'Red' },
    { bg: '#10b981', name: 'Emerald' },
    { bg: '#f59e0b', name: 'Amber' },
    { bg: '#ec4899', name: 'Pink' },
    { bg: '#1f2937', name: 'Dark' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setConfig({ ...config, type: 'image', content: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  // İkon Stili Hesaplayıcı
  const getIconStyle = () => {
    const baseStyle = {
      borderRadius: `${config.radius}%`,
      boxShadow: config.shadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    };

    if (config.bgGradient) {
      // Basit bir gradient mantığı: Seçilen rengin biraz daha açığı ile gradyan oluştur
      baseStyle.background = `linear-gradient(135deg, ${config.bgColor} 0%, ${adjustColor(config.bgColor, 40)} 100%)`;
    } else {
      baseStyle.background = config.bgColor;
    }

    return baseStyle;
  };

  // Renk açma fonksiyonu (Hex to Lightened Hex) - Basit simülasyon
  const adjustColor = (color, amount) => {
    return color; // Gerçek uygulamada renk manipülasyonu kütüphanesi kullanılır
  };

  return (
<div className="min-h-screen bg-slate-950 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">

      
      {/* SOL PANEL: EDİTÖR */}
      <div className="w-full md:w-96 bg-white border-r border-slate-200 h-screen overflow-y-auto z-10 shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-white sticky top-0 z-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-rose-500 to-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <Box size={20} />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900">AppIcon Studio</h1>
          </div>
        </div>

        <div className="p-6 space-y-8 flex-1">
          
          {/* 1. İÇERİK TÜRÜ */}
          <section className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Layers size={14} /> İçerik
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setConfig({...config, type: 'emoji'})}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${config.type === 'emoji' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Emoji
              </button>
              <button 
                onClick={() => setConfig({...config, type: 'image'})}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${config.type === 'image' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Resim Yükle
              </button>
            </div>

            {config.type === 'emoji' ? (
              <div className="space-y-3">
                <div className="relative">
                  <input 
                    type="text" 
                    value={config.content}
                    onChange={(e) => setConfig({...config, content: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                    <Smile size={24} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {popularEmojis.map(emoji => (
                    <button 
                      key={emoji}
                      onClick={() => setConfig({...config, content: emoji})}
                      className="aspect-square flex items-center justify-center bg-slate-50 hover:bg-indigo-50 rounded-lg text-xl border border-transparent hover:border-indigo-200 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors group cursor-pointer relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                <div className="bg-indigo-50 text-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={20} />
                </div>
                <p className="text-sm font-medium text-slate-600">Görsel Seç</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG (Max 5MB)</p>
              </div>
            )}
          </section>

          {/* 2. GÖRÜNÜM AYARLARI */}
          <section className="space-y-6">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} /> Görünüm
            </label>
            
            {/* Renk Seçimi */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-slate-500">Arka Plan Rengi</span>
              <div className="flex flex-wrap gap-2">
                {palettes.map(p => (
                  <button
                    key={p.bg}
                    onClick={() => setConfig({...config, bgColor: p.bg})}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${config.bgColor === p.bg ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                    style={{ background: p.bg }}
                    title={p.name}
                  />
                ))}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200 relative">
                  <input 
                    type="color" 
                    value={config.bgColor}
                    onChange={(e) => setConfig({...config, bgColor: e.target.value})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full bg-gradient-to-br from-white to-slate-300 flex items-center justify-center text-[8px] text-slate-500 font-bold">+</div>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${config.bgGradient ? 'bg-indigo-600' : 'bg-slate-200'}`} onClick={() => setConfig({...config, bgGradient: !config.bgGradient})}>
                   <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.bgGradient ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-slate-600">Gradyan Efekti</span>
              </label>
            </div>

            {/* Sliderlar */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Boyut (Zoom)</span>
                  <span>%{config.scale}</span>
                </div>
                <input 
                  type="range" min="10" max="150" 
                  value={config.scale}
                  onChange={(e) => setConfig({...config, scale: parseInt(e.target.value)})}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Köşe Yuvarlaklığı</span>
                  <span>{config.radius}</span>
                </div>
                <input 
                  type="range" min="0" max="50" 
                  value={config.radius}
                  onChange={(e) => setConfig({...config, radius: parseInt(e.target.value)})}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <button 
            onClick={() => setShowProModal(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <Download size={18} /> İkon Setini İndir
          </button>
        </div>
      </div>

      {/* SAĞ PANEL: ÖNİZLEME */}
<div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* Arka Plan Deseni */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

        {/* Ana Önizleme */}
        <div className="mb-12 relative group">
          <div className="w-64 h-64 shadow-2xl transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-indigo-500/30" style={getIconStyle()}>
            {config.type === 'emoji' ? (
              <span style={{ fontSize: `${config.scale}px`, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{config.content}</span>
            ) : (
              config.content && <img src={config.content} alt="Icon" style={{ width: `${config.scale}%`, height: `${config.scale}%`, objectFit: 'contain' }} />
            )}
          </div>
          
          {/* Boyut Bilgisi */}
          <div className="absolute -bottom-8 left-0 right-0 text-center text-slate-400 text-xs font-mono">
            1024 x 1024 px (Original)
          </div>
        </div>

        {/* Telefon Mockup (Küçük Önizlemeler) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 max-w-sm w-full">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Smartphone size={14} /> iOS Home Screen
          </h3>
          <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
            
            {/* Bizim İkonumuz */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 shadow-sm transition-all" style={{...getIconStyle(), borderRadius: '14px', boxShadow: 'none' }}>
                {config.type === 'emoji' ? (
                  <span style={{ fontSize: `${config.scale / 3}px`, lineHeight: 1 }}>{config.content}</span>
                ) : (
                  config.content && <img src={config.content} alt="Icon" style={{ width: `${config.scale}%`, height: `${config.scale}%`, objectFit: 'contain' }} />
                )}
              </div>
              <span className="text-[10px] text-slate-600 font-medium">MyApp</span>
            </div>

            {/* Diğer "Fake" İkonlar */}
            {[
              { color: '#3b82f6', label: 'Mail' },
              { color: '#10b981', label: 'Phone' },
              { color: '#ef4444', label: 'Music' }
            ].map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-1 opacity-50 grayscale">
                <div className="w-14 h-14 rounded-[14px] bg-slate-200 flex items-center justify-center text-white" style={{ background: app.color }}>
                   <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{app.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Banner (Floating) */}
        <button onClick={() => setShowProModal(true)} className="absolute top-6 right-6 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-200 font-bold text-sm flex items-center gap-2 transition-all transform hover:-translate-y-1">
          <Crown size={16} className="text-amber-500" /> Premium'a Geç
        </button>

      </div>

      {/* PRO MODAL */}
      {showProModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden">
            
            <button 
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 bg-slate-100 text-slate-500 hover:text-slate-800 p-1 rounded-full z-10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Hero */}
            <div className="h-36 bg-gradient-to-br from-indigo-600 to-purple-700 relative flex items-center justify-center p-6">
               <div className="text-center text-white">
                 <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-xl mb-3 shadow-inner">
                   <Grid size={32} />
                 </div>
                 <h2 className="text-2xl font-black">AppIcon PRO</h2>
               </div>
            </div>

            <div className="p-8">
              <p className="text-sm text-slate-500 text-center mb-6">
                Tek tıkla tüm platformlar için gerekli olan 20+ ikonu saniyeler içinde oluştur.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg font-bold text-xs">iOS</div>
                  <span className="text-sm font-medium text-slate-700">Tüm iPhone & iPad boyutları</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg font-bold text-xs">Android</div>
                  <span className="text-sm font-medium text-slate-700">Play Store & Adaptive Icons</span>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="bg-amber-100 text-amber-600 p-2 rounded-lg font-bold text-xs">WEB</div>
                  <span className="text-sm font-medium text-slate-700">Favicon & PWA (Manifest)</span>
                </div>
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 transform active:scale-[0.98]">
                <span>Paketi Satın Al (₺199)</span>
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">Ömür boyu lisans. Sınırsız proje.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}