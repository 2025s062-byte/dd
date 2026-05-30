import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Map, 
  BookMarked, 
  ShieldAlert, 
  FileEdit, 
  ExternalLink, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Info,
  Compass,
  CheckSquare,
  Square
} from 'lucide-react';

import Lesson1 from './components/Lesson1';
import Lesson2 from './components/Lesson2';
import Lesson3 from './components/Lesson3';
import Lesson4 from './components/Lesson4';

type TabType = 'HOME' | 'LESSON1' | 'LESSON2' | 'LESSON3' | 'LESSON4';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  
  // Quick self-study track indicators
  const [checkedGoals, setCheckedGoals] = useState({
    goal1: false,
    goal2: false,
    goal3: false,
    goal4: false,
    goal5: false,
  });

  // Calculate self-study progress percentage
  const totalGoals = Object.keys(checkedGoals).length;
  const completedGoals = Object.values(checkedGoals).filter(Boolean).length;
  const progressPercent = Math.round((completedGoals / totalGoals) * 100);

  const toggleGoal = (key: keyof typeof checkedGoals) => {
    setCheckedGoals(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] flex flex-col font-sans antialiased selection:bg-[#C5A880]/20 selection:text-[#C5A880] print:bg-white print:text-black">
      {/* Top Warning Banner / Banner Title */}
      <header className="bg-[#0A0A0A] text-white border-b border-white/10 sticky top-0 z-50 shadow-md print:relative print:bg-white print:text-black print:border-none print:shadow-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Brand */}
          <button 
            onClick={() => setActiveTab('HOME')}
            className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-[#1E1E1E] to-[#2E2E2E] border border-[#C5A880]/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h1 className="font-light text-lg md:text-xl tracking-tight flex items-center gap-2 serif-display italic">
                AESTHETICA <span className="text-white/80 font-sans not-italic text-sm font-light tracking-wide">DOKDO</span>
                <span className="hidden sm:inline px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-[#C5A880] text-black rounded-sm font-sans">
                  Atelier Course
                </span>
              </h1>
              <p className="text-[10px] text-gray-500 flex items-center gap-1 font-mono tracking-wider uppercase">
                Historical Records & Geopolitics Study Program • 2026
              </p>
            </div>
          </button>

          {/* Quick Nav Header */}
          <nav className="flex items-center gap-2.5 overflow-x-auto max-w-full pb-1 sm:pb-0 print:hidden">
            <button
              onClick={() => setActiveTab('HOME')}
              className={`px-3.5 py-1.5 text-xs font-light tracking-wider uppercase transition-all ${
                activeTab === 'HOME'
                  ? 'border-b-2 border-[#C5A880] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('LESSON1')}
              className={`px-3.5 py-1.5 text-xs font-light tracking-wider uppercase transition-all ${
                activeTab === 'LESSON1'
                  ? 'border-b-2 border-[#C5A880] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lesson 1
            </button>
            <button
              onClick={() => setActiveTab('LESSON2')}
              className={`px-3.5 py-1.5 text-xs font-light tracking-wider uppercase transition-all ${
                activeTab === 'LESSON2'
                  ? 'border-b-2 border-[#C5A880] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lesson 2
            </button>
            <button
              onClick={() => setActiveTab('LESSON3')}
              className={`px-3.5 py-1.5 text-xs font-light tracking-wider uppercase transition-all ${
                activeTab === 'LESSON3'
                  ? 'border-b-2 border-[#C5A880] text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lesson 3
            </button>
            <button
              onClick={() => setActiveTab('LESSON4')}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'LESSON4'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-450 bg-[#1A1A1A] text-white hover:bg-[#252525]'
              }`}
            >
              Activity Sheet
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 print:p-0">
        
        {/* Left Contents layout (9 col) */}
        <section className="lg:col-span-9 space-y-8 print:col-span-12">
          <AnimatePresence mode="wait">
            {activeTab === 'HOME' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Intro Hero Banner */}
                <div className="gallery-card rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none" />
                  <span className="small-caps inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#C5A880] text-[10px] rounded-full border border-[#C5A880]/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> EXHIBITION & SCHOLARSHIP ARCHIVE OPENS
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-white mt-5 tracking-tight leading-tight serif-display">
                    대한민국 독도 영토 주권 <br className="hidden md:block"/>
                    교육 종합 아카이브 <span className="italic">Curation</span>
                  </h2>
                  <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed max-w-3xl font-light">
                    본 디지털 교안은 대한민국 독도의 현대·중세적 지위와 동해 해양 영토의 역사적 문맥을 체계적으로 조명하기 위해 기획되었습니다. 학생들이 분절적이고 감정적인 반응을 넘어 <strong className="text-white font-medium">명확한 역사적 고문서, 국제조약문, 고지도</strong>의 다각적인 대조 분석을 바탕으로 사실관계를 객관적으로 정립하고, 나아가 동아시아의 평화적 협력 방안을 모색할 수 있는 비판적 인문 학식력을 기릅니다.
                  </p>
                  
                  <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="small-caps">
                      ATELIER: <strong className="text-white">대한민국 역사·지리 평화교육위원회</strong>
                    </div>
                    <button
                      onClick={() => setActiveTab('LESSON1')}
                      className="px-6 py-3 bg-white text-black font-sans text-xs uppercase tracking-widest font-bold hover:bg-gray-200 transition"
                    >
                      Classroom Entrance →
                    </button>
                  </div>
                </div>

                {/* 차시별 개성이 담긴 학습 코스 보드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lesson 1 Card */}
                  <div className="gallery-card gallery-card-hover rounded-2xl p-7 border border-white/5 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center w-fit">
                        <span className="small-caps text-[#C5A880]">Lesson 01</span>
                      </div>
                      <h3 className="font-light text-xl text-white mt-4 serif-display italic">독도의 지리적 특성과 영역의 이해</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        정밀 위도·경도 좌표, 울릉도 및 오키섬과의 인접 거리 물리 분석, 역사적 기상 가시성 범위와 실질 영토 요소(영해, 영공, 도로명) 규명.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('LESSON1')}
                      className="mt-6 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-[#e4cbb4] text-left"
                    >
                      Explore Geography →
                    </button>
                  </div>

                  {/* Lesson 2 Card */}
                  <div className="gallery-card gallery-card-hover rounded-2xl p-7 border border-white/5 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center w-fit">
                        <span className="small-caps text-[#C5A880]">Lesson 02</span>
                      </div>
                      <h3 className="font-light text-xl text-white mt-4 serif-display italic">사료와 지도로 규명하는 역사적 권원</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        세종실록지리지, 태정관지령 등의 고문서 교차 판독과 삼국접양지도 등 고지도 대조 분석, 안용복 외교 사건 타임라인 학습.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('LESSON2')}
                      className="mt-6 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-[#e4cbb4] text-left"
                    >
                      Examine Archives →
                    </button>
                  </div>

                  {/* Lesson 3 Card */}
                  <div className="gallery-card gallery-card-hover rounded-2xl p-7 border border-white/5 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center w-fit">
                        <span className="small-caps text-[#C5A880]">Lesson 03</span>
                      </div>
                      <h3 className="font-light text-xl text-white mt-4 serif-display italic">현대 독도 갈등의 전개와 평화적 상생</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        강화조약의 명문 공백 원인 분석, 평화선 선포와 독도의용수비대의 헌신, 신한일어업협정 중간수역 및 교과서 역사 왜곡 성찰.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('LESSON3')}
                      className="mt-6 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-[#e4cbb4] text-left"
                    >
                      Trace Modern Disputes →
                    </button>
                  </div>

                  {/* Lesson 4 Card */}
                  <div className="bg-gradient-to-br from-[#1a1310] to-[#0a0807] text-[#E5E5E5] rounded-2xl p-7 border border-[#C5A880]/20 shadow-md hover:border-[#C5A880]/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center w-fit">
                        <span className="small-caps text-amber-100">Workshop Session</span>
                      </div>
                      <h3 className="font-light text-xl text-white mt-4 serif-display italic">한·일 평화 공동 교과서 집필 및 토론</h3>
                      <p className="text-xs text-amber-200/70 mt-2 leading-relaxed">
                        두 개 이상의 핵심 사료를 제시 조건으로 삼아 10줄 이내 사실 중심의 평화 단원 글쓰기, 인쇄 및 로컬 통합 워크북 수행.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('LESSON4')}
                      className="mt-6 text-xs uppercase tracking-widest font-bold text-[#C5A880] hover:underline text-left text-white"
                    >
                      Open Worksheet →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'LESSON1' && (
              <motion.div
                key="lesson1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Lesson1 />
              </motion.div>
            )}

            {activeTab === 'LESSON2' && (
              <motion.div
                key="lesson2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Lesson2 />
              </motion.div>
            )}

            {activeTab === 'LESSON3' && (
              <motion.div
                key="lesson3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Lesson3 />
              </motion.div>
            )}

            {activeTab === 'LESSON4' && (
              <motion.div
                key="lesson4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Lesson4 />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Page Navigator Footer */}
          {activeTab !== 'HOME' && (
            <div className="flex justify-between items-center pt-8 border-t border-white/10 print:hidden">
              <button
                onClick={() => {
                  if (activeTab === 'LESSON1') setActiveTab('HOME');
                  else if (activeTab === 'LESSON2') setActiveTab('LESSON1');
                  else if (activeTab === 'LESSON3') setActiveTab('LESSON2');
                  else if (activeTab === 'LESSON4') setActiveTab('LESSON3');
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-all flex items-center"
              >
                ← Prev Lesson
              </button>
              
              <button
                onClick={() => {
                  if (activeTab === 'LESSON1') setActiveTab('LESSON2');
                  else if (activeTab === 'LESSON2') setActiveTab('LESSON3');
                  else if (activeTab === 'LESSON3') setActiveTab('LESSON4');
                  else if (activeTab === 'LESSON4') setActiveTab('HOME');
                }}
                className="px-5 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center shadow-md shadow-black"
              >
                {activeTab === 'LESSON4' ? 'Atelier Home' : 'Next Lesson →'}
              </button>
            </div>
          )}
        </section>

        {/* Right Info Sidebar (3 col) */}
        <aside className="lg:col-span-3 space-y-6 print:hidden">
          {/* Quick Progress Tracker */}
          <div className="gallery-card rounded-2xl p-6 border border-white/5 space-y-5">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#C5A880]" />
              <span className="small-caps">Study Progress</span>
            </div>

            {/* Study progress level */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>학습 수료진도</span>
                <span className="font-mono text-[#C5A880]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#C5A880] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Micro list toggle box */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <button 
                onClick={() => toggleGoal('goal1')}
                className="w-full text-left flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition"
              >
                {checkedGoals.goal1 ? (
                  <CheckSquare className="w-4 h-4 text-[#C5A880] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-white/20 shrink-0" />
                )}
                <span className={`${checkedGoals.goal1 ? 'line-through text-gray-600' : ''}`}>
                  독도 지리적 최단거리 분석하기
                </span>
              </button>

              <button 
                onClick={() => toggleGoal('goal2')}
                className="w-full text-left flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition"
              >
                {checkedGoals.goal2 ? (
                  <CheckSquare className="w-4 h-4 text-[#C5A880] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-white/20 shrink-0" />
                )}
                <span className={`${checkedGoals.goal2 ? 'line-through text-gray-600' : ''}`}>
                  세종실록지리지 한문사료 파악
                </span>
              </button>

              <button 
                onClick={() => toggleGoal('goal3')}
                className="w-full text-left flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition"
              >
                {checkedGoals.goal3 ? (
                  <CheckSquare className="w-4 h-4 text-[#C5A880] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-white/20 shrink-0" />
                )}
                <span className={`${checkedGoals.goal3 ? 'line-through text-gray-600' : ''}`}>
                  태정관 지령 및 고지도 확인하기
                </span>
              </button>

              <button 
                onClick={() => toggleGoal('goal4')}
                className="w-full text-left flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition"
              >
                {checkedGoals.goal4 ? (
                  <CheckSquare className="w-4 h-4 text-[#C5A880] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-white/20 shrink-0" />
                )}
                <span className={`${checkedGoals.goal4 ? 'line-through text-gray-600' : ''}`}>
                  샌프란시스코 강화조약 쟁점 성찰
                </span>
              </button>

              <button 
                onClick={() => toggleGoal('goal5')}
                className="w-full text-left flex items-start gap-2.5 text-xs text-gray-400 hover:text-white transition"
              >
                {checkedGoals.goal5 ? (
                  <CheckSquare className="w-4 h-4 text-[#C5A880] shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-white/20 shrink-0" />
                )}
                <span className={`${checkedGoals.goal5 ? 'line-through text-gray-600' : ''}`}>
                  한일 공동교과서 집필해보기
                </span>
              </button>
            </div>
          </div>

          {/* Quick reference sidebar link widget */}
          <div className="bg-[#121212]/80 border border-white/5 text-[#E5E5E5] rounded-2xl p-6 shadow-xl flex flex-col justify-between h-52 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#C5A880]/15 rounded-full blur-2xl" />
            <div className="space-y-1.5 z-10">
              <span className="small-caps text-[#C5A880] block">Official Resources</span>
              <h5 className="font-light text-sm text-white tracking-tight serif-display italic">대한민국 외교부 독도 정보</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed md:line-clamp-4">
                정부 공식 입장과 다양한 언어별(8개국어) 학술·역사 팩트를 추가 연계하여 확인해 보세요.
              </p>
            </div>
            
            <a
              href="https://dokdo.mofa.go.kr"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-xs font-semibold text-white hover:bg-white/10 transition-all border border-white/10 mt-3 block text-center"
            >
              Learn Official Facts <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mini tip text cards */}
          <div className="text-gray-500 p-4 bg-white/5 border border-white/5 rounded-xl text-center text-[11px] font-medium leading-relaxed italic">
            &quot;독도를 배우는 힘은 감정이 아닌, 이성적이고 사실적인 역사 지식입니다.&quot;
          </div>
        </aside>
      </main>

      {/* Modern UI Footer */}
      <footer className="border-t border-white/10 py-8 mt-12 text-center text-xs text-gray-500 flex flex-col items-center gap-2 print:hidden backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-gray-400">
          <span>제작: <strong>대한민국 역사·지리 평화교육위원회</strong></span>
          <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          <span>사용 기술: React, Tailwind CSS, Motion</span>
        </div>
        <p className="text-[10px] text-gray-600 font-mono flex items-center gap-1 uppercase tracking-widest">
          Copyright 2026. Joint Dokdo Sovereignty Education Material. <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
        </p>
      </footer>
    </div>
  );
}
