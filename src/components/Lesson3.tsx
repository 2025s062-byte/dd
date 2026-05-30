import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Globe, Anchor, HelpCircle, AlertTriangle, Scale, Activity, Flame, MessageSquare, Handshake } from 'lucide-react';
import { MODERN_CONFLICT_DATA } from '../data';

export default function Lesson3() {
  const [activeSection, setActiveSection] = useState<'sec1' | 'sec2' | 'sec3'>('sec1');

  return (
    <div className="space-y-10">
      {/* 3차시 개요 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="gallery-card rounded-2xl p-6 md:p-8 border border-white/5"
      >
        <span className="small-caps inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#C5A880] text-[10px] rounded-full border border-[#C5A880]/20">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C5A880]" /> Lesson Overview
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-white mt-4 tracking-tight serif-display">
          현대 독도 갈등의 전개와 평화적 상생 방안
        </h2>
        <p className="text-gray-400 mt-2.5 leading-relaxed max-w-4xl font-light text-sm">
          현대 독도 갈등의 줄기는 단순히 양국 거민들의 감정적 다툼이 아닙니다. <strong className="text-white font-medium">제2차 세계대전 직후 영토 반환 조약문의 공백</strong>, 그리고 <strong className="text-white font-medium">1994년 유엔 해양법상 200해리 배타적 경제수역(EEZ) 체제 도입</strong>이라는 복합적이고 다면적인 국제법적 쟁점이 얽혀 있습니다. 평화 선포의 위인들의 흔적과 앞으로의 성찰 방향을 알아봐요.
        </p>

        {/* Section Navigation with high quality style tab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 border-t border-white/10 pt-6">
          <button
            onClick={() => setActiveSection('sec1')}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeSection === 'sec1'
                ? 'border-[#C5A880] bg-white/5 ring-1 ring-[#C5A880]/30'
                : 'border-white/5 bg-[#121212]/50 hover:bg-[#121212]'
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#C5A880] block uppercase">STAGE 1</span>
            <h4 className="font-light text-sm text-white mt-1.5 serif-display italic">샌프란시스코 강화조약의 공백</h4>
          </button>

          <button
            onClick={() => setActiveSection('sec2')}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeSection === 'sec2'
                ? 'border-[#C5A880] bg-white/5 ring-1 ring-[#C5A880]/30'
                : 'border-white/5 bg-[#121212]/50 hover:bg-[#121212]'
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#C5A880] block uppercase">STAGE 2</span>
            <h4 className="font-light text-sm text-white mt-1.5 serif-display italic">평화선 설정과 독도의용수비대 수호</h4>
          </button>

          <button
            onClick={() => setActiveSection('sec3')}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeSection === 'sec3'
                ? 'border-[#C5A880] bg-white/5 ring-1 ring-[#C5A880]/30'
                : 'border-white/5 bg-[#121212]/50 hover:bg-[#121212]'
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#C5A880] block uppercase">STAGE 3</span>
            <h4 className="font-light text-sm text-white mt-1.5 serif-display italic">신한일어업협정과 우경화 재점화</h4>
          </button>
        </div>
      </motion.div>

      {/* Main interactive cards rendering */}
      {activeSection === 'sec1' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="gallery-card rounded-2xl p-6 border border-white/5">
            <h3 className="font-light text-lg text-white border-b border-white/10 pb-4.5 serif-display italic">
              {MODERN_CONFLICT_DATA.section1.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {MODERN_CONFLICT_DATA.section1.events.map((evt, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#121212] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10">
                      <span className="text-xs font-semibold text-[#C5A880]">{evt.title}</span>
                      <span className="text-[10px] font-mono font-bold text-gray-400">{evt.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-2 font-light">
                      {evt.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-[#C5A880] flex items-center gap-2">
                    <Scale className="w-3.5 h-3.5 shrink-0" />
                    <span>STATUS: {evt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Efforts section */}
      {activeSection === 'sec2' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="gallery-card rounded-2xl p-6 border border-white/5">
            <h3 className="font-light text-lg text-white border-b border-white/10 pb-4.5 serif-display italic">
              {MODERN_CONFLICT_DATA.section2.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {MODERN_CONFLICT_DATA.section2.efforts.map((eff, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#121212] border border-white/5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-white/5 border border-white/10 text-[#C5A880] rounded-lg">
                        {idx === 0 && <Anchor className="w-4 h-4" />}
                        {idx === 1 && <Globe className="w-4 h-4" />}
                        {idx === 2 && <Handshake className="w-4 h-4" />}
                      </span>
                      <h4 className="font-light text-white text-sm serif-display">{eff.title}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-gray-450 text-gray-400 block px-1">
                      시기: {eff.date}
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {eff.desc}
                    </p>
                  </div>
                  <div className="pt-3 mt-5 border-t border-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                    * 우리 주권 선포의 핵심 역사입니다.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Conflict section */}
      {activeSection === 'sec3' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="gallery-card rounded-2xl p-6 border border-white/5">
            <h3 className="font-light text-lg text-white border-b border-white/10 pb-4.5 serif-display italic">
              {MODERN_CONFLICT_DATA.section3.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {MODERN_CONFLICT_DATA.section3.conflicts.map((conf, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#121212] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                      <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-rose-500" /> {conf.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-400">{conf.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pt-2 font-light">
                      {conf.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-light text-rose-200 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30 flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>핵심 갈등 지표 :</strong> {conf.danger}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 평화 상생 교훈 가이드 */}
      <div className="gallery-card border border-[#C5A880]/30 rounded-2xl p-6 shadow-md shadow-black/80">
        <h4 className="font-light text-lg text-white flex items-center gap-2 serif-display">
          <Activity className="w-5 h-5 text-[#C5A880]" />
          한·일 청소년 평화 행동 평화수업 성찰 가이드
        </h4>
        <p className="text-xs text-gray-400 mt-2 max-w-4xl font-light leading-relaxed">
          우리가 독도를 지키는 힘은 단지 분노와 군사력에 국한되지 않습니다. 진정으로 역사적 과실을 직시하고 양국 청소년들이 고문서를 교차 연구하는 한·일 평화 공동 집필의 과정이야말로 영구적 주권 인지 및 동아시아 번영의 평화의 기틀을 마련해 줄 것입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-widest block mb-1">합리적 대응 지식력</span>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              &quot;독도는 우리 땅&quot;이라는 멜로디만 반복하는 것보다, 상대의 무단 영유 시도가 있었던 시마네현 고시 40호(1905)보다 우리가 공포한 <strong>대한제국 칙령 제41호(1900년 10월)</strong>가 무려 5년 앞서 법문화했다는 역사 팩트를 침착하게 교육해야 합니다.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
            <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">한일 공동 역사교과서 제안</span>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              정치적 포퓰리즘을 극복하고, 양국 다음 세대들이 함께 동해가 분열과 대립이 아닌 상생과 협력의 미래 평화 지형으로 나아가도록 학술 교류의 주권을 대화와 법제 연구로 이어가야 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
