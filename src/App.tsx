import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertTriangle, ArrowRight, RotateCcw, Info, Undo2, Target, MousePointer2, Award } from 'lucide-react';
import { BINGO_DATA } from './constants';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('instructions');
  const [selectedCaseIds, setSelectedCaseIds] = useState<Set<string>>(new Set());

  const toggleCase = (id: string) => {
    const newSelected = new Set(selectedCaseIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCaseIds(newSelected);
  };

  const getPointsForCompetence = (competenceId: string) => {
    const competence = BINGO_DATA.find(c => c.id === competenceId);
    if (!competence) return 0;
    return competence.cases
      .filter(c => selectedCaseIds.has(c.id))
      .reduce((sum, c) => sum + c.points, 0);
  };

  const scores = useMemo(() => {
    return BINGO_DATA.map(comp => ({
      id: comp.id,
      title: comp.title,
      score: getPointsForCompetence(comp.id),
      isValidated: getPointsForCompetence(comp.id) >= 8,
    }));
  }, [selectedCaseIds]);

  const allValidated = scores.every(s => s.isValidated);

  const resetBingo = () => {
    setSelectedCaseIds(new Set());
    setCurrentScreen('instructions');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-x-hidden">
      {/* Bouton Retour en haut à gauche */}
      <a
        href="https://1001parcours.cci.fr/experience/mod/page/view.php?id=1530"
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-[#1a4b7c] font-bold py-2.5 px-5 rounded-2xl shadow-lg transition-all flex items-center gap-2 border border-[#1a4b7c]/10 group"
      >
        <Undo2 className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Retour</span>
      </a>

      <AnimatePresence mode="wait">
        {currentScreen === 'instructions' && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-[#1a4b7c]/5 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#a1d6f5]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#cae9ab]/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-[#1a4b7c]/5 p-4 rounded-3xl mb-6"
                >
                  <Target className="w-12 h-12 text-[#1a4b7c]" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-[#1a4b7c] mb-4 tracking-tight">
                  Bingo des Soft Skills
                </h1>
                <p className="text-xl text-[#1a4b7c]/70 font-medium max-w-lg mx-auto">
                  Une autoévaluation ludique pour faire le point sur vos compétences professionnelles.
                </p>
              </div>

              <div className="grid gap-6 mb-12">
                <div className="flex items-start gap-5 bg-[#f8fafc] p-6 rounded-3xl border border-slate-100">
                  <div className="bg-[#f7de9f] p-3 rounded-2xl shadow-sm">
                    <MousePointer2 className="w-6 h-6 text-[#1a4b7c]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4b7c] mb-1">Sélectionnez vos acquis</h3>
                    <p className="text-[#1a4b7c]/60">Cliquez sur chaque affirmation qui correspond à votre situation actuelle. Vous pouvez décocher en cas d'erreur.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-[#f8fafc] p-6 rounded-3xl border border-slate-100">
                  <div className="bg-[#cae9ab] p-3 rounded-2xl shadow-sm">
                    <Award className="w-6 h-6 text-[#1a4b7c]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a4b7c] mb-1">Cumulez des points</h3>
                    <p className="text-[#1a4b7c]/60">Chaque case cochée vous rapporte des points qui s'ajoutent au compteur de la compétence.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-[#1a4b7c] p-6 rounded-3xl shadow-xl shadow-[#1a4b7c]/10">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Objectif de validation</h3>
                    <p className="text-white/80">Obtenez au moins <span className="text-white font-black underline decoration-[#cae9ab] decoration-4 underline-offset-4">8 points</span> par compétence pour accéder au quiz final.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('bingo')}
                className="w-full bg-[#1a4b7c] hover:bg-[#2563eb] text-white text-xl font-bold py-5 px-8 rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-95 group"
              >
                Commencer l'aventure <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'bingo' && (
          <motion.div
            key="bingo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-6xl w-full bg-white/95 backdrop-blur-md rounded-[3rem] p-6 md:p-12 shadow-2xl border-4 border-[#1a4b7c]/5"
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-[#1a4b7c]">Ma Grille de Compétences</h1>
              <p className="text-[#1a4b7c]/60 mt-2">Cliquez sur les bulles pour les valider</p>
            </div>

            <div className="space-y-12">
              {BINGO_DATA.map((competence) => {
                const rowScore = getPointsForCompetence(competence.id);
                const isRowValidated = rowScore >= 8;

                return (
                  <div key={competence.id} className="relative">
                    <div className="flex items-center gap-4 mb-6 px-2">
                      <div className={`w-3 h-8 rounded-full ${isRowValidated ? 'bg-[#cae9ab]' : 'bg-[#1a4b7c]/10'}`} />
                      <h3 className="text-xl font-black text-[#1a4b7c] tracking-wide">
                        {competence.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 flex-grow w-full">
                        {competence.cases.map((bingoCase) => {
                          const isSelected = selectedCaseIds.has(bingoCase.id);
                          return (
                            <div key={bingoCase.id} className="flex flex-col items-center">
                              <motion.button
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleCase(bingoCase.id)}
                                className={`relative aspect-square w-full rounded-2xl p-3 md:p-4 text-center transition-all border-4 flex items-center justify-center shadow-lg group ${
                                  isSelected 
                                    ? 'border-[#1a4b7c] ring-4 ring-[#1a4b7c]/10' 
                                    : 'border-white hover:border-[#1a4b7c]/20'
                                }`}
                                style={{ backgroundColor: bingoCase.color }}
                              >
                                <span className="text-[10px] sm:text-xs md:text-sm font-bold leading-tight text-[#1a4b7c] select-none break-words overflow-hidden">
                                  {bingoCase.text}
                                </span>
                                
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0, rotate: -45 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0, rotate: 45 }}
                                      className="absolute -top-2 -right-2 bg-[#1a4b7c] text-white rounded-full p-1 shadow-lg border-2 border-white z-20"
                                    >
                                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.button>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex-shrink-0 w-full lg:w-40">
                        <motion.div
                          animate={{ 
                            backgroundColor: isRowValidated ? '#cae9ab' : '#f8fafc',
                            scale: isRowValidated ? 1.05 : 1,
                            borderColor: isRowValidated ? '#166534' : '#e2e8f0'
                          }}
                          className="w-full py-6 rounded-[2rem] flex flex-col items-center justify-center border-4 shadow-inner"
                        >
                          <span className={`text-4xl font-black ${isRowValidated ? 'text-[#166534]' : 'text-[#1a4b7c]'}`}>
                            {rowScore}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-widest ${isRowValidated ? 'text-[#166534]/60' : 'text-[#1a4b7c]/40'}`}>
                            points
                          </span>
                          {isRowValidated && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mt-2 bg-[#166534] text-white rounded-full p-1"
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setCurrentScreen('results')}
                className="bg-[#1a4b7c] hover:bg-[#2563eb] text-white text-xl font-bold py-5 px-16 rounded-[2rem] transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-3"
              >
                Voir mes résultats <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-3xl w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-[#1a4b7c]/5"
          >
            <h1 className="text-3xl md:text-4xl font-black text-[#1a4b7c] text-center mb-12">
              Votre Bilan de Compétences
            </h1>

            <div className="space-y-10 mb-12">
              {scores.map((score) => (
                <div key={score.id} className="space-y-3">
                  <div className="flex justify-between items-end px-1">
                    <h3 className="text-lg font-black text-[#1a4b7c] uppercase tracking-wide">{score.title}</h3>
                    <span className="text-sm font-bold text-[#1a4b7c]/50">{score.score} / 11 pts</span>
                  </div>
                  <div className="h-6 w-full bg-slate-50 rounded-full overflow-hidden border-2 border-slate-100 p-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score.score / 11) * 100}%` }}
                      transition={{ duration: 1.2, ease: 'circOut' }}
                      className={`h-full rounded-full shadow-sm ${score.isValidated ? 'bg-[#cae9ab]' : 'bg-[#f7de9f]'}`}
                    />
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    {score.isValidated ? (
                      <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                        <Check className="w-4 h-4" /> Compétence Validée
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4" /> Compétence à renforcer
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f8fafc] rounded-[2.5rem] p-8 md:p-10 border-2 border-slate-100 mb-10 text-center relative overflow-hidden">
              {allValidated ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1a4b7c] mb-4">
                    Félicitations !
                  </h2>
                  <p className="text-lg text-[#1a4b7c]/60 mb-10 max-w-md mx-auto">
                    Vous avez validé l'ensemble des compétences. Vous êtes prêt pour le quiz final.
                  </p>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-green-900/20">
                    Passer le quiz final <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-6"
                  >
                    📚
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1a4b7c] mb-4">
                    Encore un petit effort...
                  </h2>
                  <p className="text-lg text-[#1a4b7c]/60 mb-8 max-w-md mx-auto">
                    Certaines compétences méritent d'être consolidées avant de passer à la suite.
                  </p>
                  <div className="text-left mb-10 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <p className="font-black text-[#1a4b7c]/40 mb-4 text-xs uppercase tracking-widest">Modules recommandés :</p>
                    <ul className="space-y-3">
                      {scores.filter(s => !s.isValidated).map(s => (
                        <li key={s.id} className="flex items-center gap-3 text-[#1a4b7c] font-bold bg-slate-50 p-3 rounded-2xl">
                          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                          {s.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="https://1001parcours.cci.fr/experience/mod/page/view.php?id=1711"
                    className="w-full bg-[#1a4b7c] hover:bg-[#2563eb] text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-[#1a4b7c]/20"
                  >
                    Accéder à la formation <ArrowRight className="w-6 h-6" />
                  </a>
                </>
              )}
            </div>

            <button
              onClick={resetBingo}
              className="w-full flex items-center justify-center gap-2 text-[#1a4b7c]/40 font-bold hover:text-[#1a4b7c] transition-colors py-2 group"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform" /> Recommencer le bingo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
