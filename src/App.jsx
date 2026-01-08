import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  PlusCircle,
  Calendar,
  Wallet,
  User,
  History,
  Target,
  Sparkles,
  Sun,
  Moon,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

const App = () => {
  const [userName, setUserName] = useState("Gestor de Ativos");
  const [targetUnits, setTargetUnits] = useState(200);
  const [positions, setPositions] = useState([]);
  const [liquidity, setLiquidity] = useState(0);
  const [entryValue, setEntryValue] = useState("");
  const [status, setStatus] = useState({ text: "", type: "" });
  const [darkMode, setDarkMode] = useState(true);

  // Lógica de Projeção Financeira
  const calculateAggregateGoal = (n) => (n * (1 + n)) / 2;
  
  const totalConsolidated = useMemo(() => 
    positions.reduce((acc, curr) => acc + curr, 0), 
  [positions]);

  const targetCapital = useMemo(() => 
    calculateAggregateGoal(targetUnits), 
  [targetUnits]);

  const completionRate = useMemo(() => 
    (positions.length / targetUnits) * 100, 
  [positions, targetUnits]);

  const predictiveAnalysis = useMemo(() => {
    const validOptions = Array.from({ length: targetUnits }, (_, i) => i + 1)
      .filter(unit => !positions.includes(unit) && unit <= liquidity)
      .sort((a, b) => b - a);
    return validOptions.length > 0 ? validOptions[0] : null;
  }, [liquidity, positions, targetUnits]);

  const notify = (text, type) => {
    setStatus({ text, type });
    setTimeout(() => setStatus({ text: "", type: "" }), 4000);
  };

  const handleLiquidityInjection = (e) => {
    e.preventDefault();
    const val = parseFloat(entryValue);
    if (isNaN(val) || val <= 0) {
      notify("Erro de validação: Insira um montante positivo.", "error");
      return;
    }
    setLiquidity(prev => prev + val);
    setEntryValue("");
    notify(`Injeção de R$ ${val.toLocaleString('pt-BR')} confirmada no fluxo de caixa.`, "success");
  };

  const handleStrategyShift = (e) => {
    const newTarget = parseInt(e.target.value);
    
    if (newTarget < targetUnits) {
      const activePositionsOutsideRange = positions.some(p => p > newTarget);
      if (activePositionsOutsideRange) {
        if (!window.confirm("A readequação do horizonte excluirá posições consolidadas fora do novo range. Os valores retornarão à liquidez corrente. Confirmar?")) {
          return;
        }
      }
    }

    setTargetUnits(newTarget);

    const updatedPositions = [];
    let refundedCapital = 0;

    positions.forEach(p => {
      if (p <= newTarget) {
        updatedPositions.push(p);
      } else {
        refundedCapital += p;
      }
    });

    setPositions(updatedPositions);
    if (refundedCapital > 0) {
      setLiquidity(prev => prev + refundedCapital);
      notify(`Estratégia readequada. R$ ${refundedCapital} reintegrados à liquidez.`, "info");
    } else {
      notify(`Horizonte de projeção ajustado para ${newTarget} unidades.`, "success");
    }
  };

  const togglePositionAllocation = (val) => {
    if (positions.includes(val)) {
      setPositions(positions.filter(p => p !== val));
      setLiquidity(prev => prev + val);
      notify(`Desalocação do índice ${val}: Capital retornado ao fluxo disponível.`, "info");
    } else {
      if (val > liquidity) {
        notify(`Exposição negada: Liquidez insuficiente para o índice R$ ${val}.`, "error");
        return;
      }
      setLiquidity(prev => prev - val);
      setPositions([...positions, val].sort((a, b) => a - b));
      notify(`Posição R$ ${val} consolidada no portfólio.`, "success");
    }
  };

  const theme = {
    bg: darkMode ? 'bg-[#060b16]' : 'bg-slate-50',
    card: darkMode ? 'bg-[#0f172a] border-[#1e293b]' : 'bg-white border-slate-200',
    textPrimary: darkMode ? 'text-white' : 'text-slate-900',
    textSecondary: darkMode ? 'text-slate-400' : 'text-slate-500',
    accent: darkMode ? 'bg-cyan-500' : 'bg-blue-600',
    input: darkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-slate-50 border-slate-200 text-slate-900',
    button: darkMode ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20' : 'bg-slate-900 hover:bg-black shadow-slate-200',
  };

  return (
    <div className={`min-h-screen ${theme.bg} p-4 md:p-10 font-sans transition-all duration-500`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Superior Terminal Header */}
        <header className={`${theme.card} rounded-3xl p-8 border shadow-2xl mb-10 flex flex-col lg:row md:flex-row md:items-center justify-between gap-8 transition-all`}>
          <div className="flex items-center gap-6">
            <div className={`${theme.accent} p-4 rounded-2xl text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]`}>
              <BarChart3 size={36} />
            </div>
            <div>
              <h1 className={`text-3xl font-extrabold ${theme.textPrimary} tracking-tight uppercase italic`}>Asset Progression Terminal</h1>
              <div className={`flex items-center gap-3 ${theme.textSecondary} text-xs font-bold tracking-widest mt-1`}>
                <ShieldCheck size={14} className="text-cyan-500" />
                <span>ID: {userName.toUpperCase()}</span>
                <span className="opacity-30">|</span>
                <Target size={14} />
                <span>HORIZONTE ESTRATÉGICO: {targetUnits} UNID</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl ${darkMode ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} transition-all hover:rotate-12`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-px h-10 bg-slate-800 hidden md:block"></div>

            <div className="flex flex-col min-w-[220px]">
              <label className={`text-[10px] font-black ${theme.textSecondary} mb-2 uppercase tracking-[0.2em]`}>Configuração de Ciclo</label>
              <select 
                value={targetUnits} 
                onChange={handleStrategyShift}
                className={`${theme.input} border rounded-xl px-5 py-3 font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-cyan-500 transition-all`}
              >
                <option value={100}>Protocolo Alpha (100)</option>
                <option value={200}>Protocolo Beta (200)</option>
                <option value={365}>Ciclo Anual Prime (365)</option>
                <option value={500}>Estratégia Global (500)</option>
                <option value={730}>Horizonte Biunial (730)</option>
              </select>
            </div>
          </div>
        </header>

        {/* Dashboard de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className={`${darkMode ? 'bg-gradient-to-br from-cyan-600 to-blue-800' : 'bg-slate-900'} p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden`}>
            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest block mb-2">Liquidez Corrente</span>
            <div className="text-4xl font-black font-mono">R$ {liquidity.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <Wallet className="absolute -right-6 -bottom-6 text-white/5" size={120} />
          </div>

          <div className={`${theme.card} p-8 rounded-[2rem] border shadow-lg relative`}>
            <span className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest block mb-2`}>Património Consolidado</span>
            <div className={`text-4xl font-black ${theme.textPrimary} font-mono`}>R$ {totalConsolidated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div className={`text-[10px] ${darkMode ? 'text-cyan-400' : 'text-blue-600'} font-black mt-3 flex items-center gap-1`}>
              <TrendingUp size={12} /> ALVO FINAL: R$ {targetCapital.toLocaleString('pt-BR')}
            </div>
          </div>

          <div className={`${theme.card} p-8 rounded-[2rem] border shadow-lg`}>
            <span className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest block mb-2`}>Eficiência de Aporte</span>
            <div className={`text-4xl font-black ${theme.textPrimary}`}>{completionRate.toFixed(1)}%</div>
            <div className="mt-5 w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`${darkMode ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-blue-600'} h-full transition-all duration-1000`} 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div className={`${theme.card} p-8 rounded-[2rem] border shadow-lg`}>
            <span className={`${theme.textSecondary} text-[10px] font-black uppercase tracking-widest block mb-2`}>Exposição Remanescente</span>
            <div className={`text-3xl font-black ${theme.textPrimary} font-mono`}>R$ {(targetCapital - totalConsolidated).toLocaleString('pt-BR')}</div>
            <p className={`text-[10px] ${theme.textSecondary} mt-3 font-bold`}>{targetUnits - positions.length} POSIÇÕES EM ABERTO</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Painel Operacional */}
          <div className="lg:col-span-3 space-y-8">
            
            <section className={`${theme.card} p-8 rounded-[2rem] border shadow-sm`}>
              <h3 className={`text-xs font-black ${theme.textPrimary} mb-6 uppercase tracking-[0.2em] flex items-center gap-2`}>
                <PlusCircle size={16} className="text-cyan-500" />
                Gestão de Fluxo
              </h3>
              <form onSubmit={handleLiquidityInjection} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">R$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={entryValue}
                    onChange={(e) => setEntryValue(e.target.value)}
                    placeholder="0,00"
                    className={`${theme.input} w-full rounded-2xl pl-10 pr-4 py-4 focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-lg transition-all`}
                  />
                </div>
                <button type="submit" className={`${theme.button} w-full text-white font-black py-4 rounded-2xl transition-all uppercase text-xs tracking-widest`}>
                  Efetuar Aporte
                </button>
              </form>
            </section>

            {predictiveAnalysis && (
              <section className={`${darkMode ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-blue-50 border-blue-100'} p-8 rounded-[2rem] border border-dashed transition-all`}>
                <div className={`flex items-center gap-2 ${darkMode ? 'text-cyan-400' : 'text-blue-700'} font-black text-[10px] uppercase tracking-widest mb-4`}>
                  <Sparkles size={16} />
                  <span>Insight Estratégico</span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-6 leading-relaxed font-medium`}>
                  Otimize seu capital alocando no maior índice compatível com sua liquidez: <span className="font-black text-cyan-500">R$ {predictiveAnalysis}</span>.
                </p>
                <button 
                  onClick={() => togglePositionAllocation(predictiveAnalysis)}
                  className={`${darkMode ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-blue-600 hover:bg-blue-700'} w-full text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl`}
                >
                  Liquidar Posição {predictiveAnalysis}
                </button>
              </section>
            )}

            {status.text && (
              <div className={`p-5 rounded-2xl flex items-start gap-4 animate-in zoom-in-95 border-l-4 ${
                status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 
                status.type === 'info' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 
                'bg-rose-500/10 border-rose-500 text-rose-400'
              }`}>
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-xs font-bold leading-tight">{status.text.toUpperCase()}</p>
              </div>
            )}

            <section className={`${theme.card} p-8 rounded-[2rem] border shadow-sm`}>
              <h3 className={`text-xs font-black ${theme.textPrimary} mb-6 uppercase tracking-[0.2em] flex items-center gap-2`}>
                <History size={16} className={theme.textSecondary} />
                Log de Operações
              </h3>
              <div className="space-y-3">
                {positions.length > 0 ? (
                  [...positions].reverse().slice(0, 5).map((p, i) => (
                    <div key={i} className={`flex justify-between items-center p-3.5 rounded-xl border ${darkMode ? 'bg-[#060b16] border-[#1e293b]' : 'bg-slate-50 border-slate-100'}`}>
                      <span className={`${theme.textSecondary} font-black text-[9px] uppercase tracking-tighter`}>Efetivado</span>
                      <span className={`font-black ${theme.textPrimary} font-mono text-sm`}>R$ {p}</span>
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-10 border-2 border-dashed ${darkMode ? 'border-slate-800' : 'border-slate-100'} rounded-2xl`}>
                    <p className={`text-[10px] font-bold ${theme.textSecondary} uppercase`}>Aguardando Dados</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Matriz Principal */}
          <div className="lg:col-span-9">
            <div className={`${theme.card} p-10 rounded-[2.5rem] border shadow-2xl h-full transition-all`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                <div>
                  <h2 className={`text-2xl font-black ${theme.textPrimary} tracking-tight uppercase`}>Matriz de Aportes Estratégicos</h2>
                  <p className={`${theme.textSecondary} text-xs font-bold mt-2 uppercase tracking-widest opacity-70`}>Interaja com as unidades para consolidação patrimonial</p>
                </div>
                <div className="flex gap-6 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div> ATIVO
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div> LATENTE
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                {Array.from({ length: targetUnits }, (_, i) => i + 1).map((unit) => {
                  const isAllocated = positions.includes(unit);
                  const canFund = unit <= liquidity;

                  return (
                    <button
                      key={unit}
                      onClick={() => togglePositionAllocation(unit)}
                      disabled={!isAllocated && !canFund}
                      className={`
                        aspect-square flex items-center justify-center text-[10px] font-black rounded-2xl transition-all duration-300 transform
                        ${isAllocated 
                          ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-2 ring-cyan-300 scale-95' 
                          : !canFund
                            ? 'bg-slate-900/40 text-slate-700 cursor-not-allowed border border-slate-800/50 opacity-20'
                            : 'bg-[#1e293b] text-slate-400 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 hover:scale-110'
                        }
                        ${!darkMode && !isAllocated && canFund ? 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50' : ''}
                        ${!darkMode && isAllocated ? 'bg-blue-600 ring-blue-100 shadow-blue-200' : ''}
                      `}
                    >
                      {unit}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${darkMode ? '#1e293b' : '#cbd5e1'}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${darkMode ? '#06b6d4' : '#94a3b8'}; }
        
        @keyframes pulse-cyan {
          0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(6, 182, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
        }
      `}</style>
    </div>
  );
};

export default App;