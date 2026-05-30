import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, MapPin, Calendar, HelpCircle, FileText, Check, ArrowRight, BookMarked, Layers } from 'lucide-react';
import { HISTORICAL_RECORDS, MAP_DATA, TIMELINE_DATA } from '../data';

export default function Lesson2() {
  const [activeTab, setActiveTab] = useState<'KOREA' | 'JAPAN'>('KOREA');
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [activeMapIndex, setActiveMapIndex] = useState<number>(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);

  const filteredRecords = HISTORICAL_RECORDS.filter(rec => rec.country === activeTab);

  return (
    <div className="space-y-10">
      {/* 2차시 개요 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="gallery-card rounded-2xl p-6 md:p-8 border border-white/5"
      >
        <span className="small-caps inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#C5A880] text-[10px] rounded-full border border-[#C5A880]/20">
          <BookMarked className="w-3.5 h-3.5 text-[#C5A880]" /> Lesson Overview
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-white mt-4 tracking-tight serif-display">
          사료와 지도로 규명하는 독도의 역사적 권원
        </h2>
        <p className="text-gray-400 mt-2.5 leading-relaxed max-w-4xl font-light text-sm">
          역사학적 사실의 힘은 단편적인 일화가 아닌, 당시 쓰여진 당사국과 주변국의 <strong className="text-white font-medium">1차 사료(Primary Sources)</strong>를 정교하게 교차 대조하고 검증하는 상호 관점에서 도출됩니다. 한·일 최고 정부기관 문서와 고지도가 증언하는 논박 불가능한 독도 주권 귀속사를 확인해보세요.
        </p>
      </motion.div>

      {/* 고문서 사료 교차 대조 분석 */}
      <div className="gallery-card rounded-2xl p-6 border border-white/5 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-light text-lg text-white flex items-center gap-2 serif-display">
              <FileText className="w-5 h-5 text-[#C5A880]" />
              정부 및 관찬 고문서 교차 사료실
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 font-light">
              각 왕조와 제국이 정식 기록한 사실을 비교하면 역사의 진실이 그대로 투영됩니다.
            </p>
          </div>

          {/* Korea vs Japan Toggle Option */}
          <div className="bg-[#161616] p-1 border border-white/5 rounded-lg inline-flex self-start">
            <button
              onClick={() => { setActiveTab('KOREA'); setSelectedRecord(null); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'KOREA'
                  ? 'bg-[#C5A880] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              대한민국 고문서 증언
            </button>
            <button
              onClick={() => { setActiveTab('JAPAN'); setSelectedRecord(null); }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'JAPAN'
                  ? 'bg-red-950/40 text-red-300 border border-red-900/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              일본 관찬 사료의 고백
            </button>
          </div>
        </div>

        {/* Records Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card list of specific records */}
          <div className="lg:col-span-1 space-y-3">
            {filteredRecords.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedRecord(rec.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  selectedRecord === rec.id || (selectedRecord === null && filteredRecords[0].id === rec.id)
                    ? 'border-[#C5A880] bg-white/5 shadow-md ring-1 ring-[#C5A880]/30'
                    : 'border-white/5 bg-[#121212]/50 hover:bg-[#121212]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white">
                      {rec.year}년
                    </span>
                    <span className="text-[#C5A880] text-xs">상세보기 &gt;</span>
                  </div>
                  <h4 className="font-light text-white text-base mt-2.5 serif-display">{rec.title}</h4>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 font-light leading-relaxed">
                  {rec.translatedText}
                </p>
              </button>
            ))}
          </div>

          {/* Expanded Analysis view */}
          <div className="lg:col-span-2 bg-[#121212] rounded-xl p-5 md:p-6 border border-white/5 flex flex-col justify-between min-h-[300px]">
            {(() => {
              const currentRecord = HISTORICAL_RECORDS.find(
                rec => rec.id === (selectedRecord || filteredRecords[0]?.id)
              );

              if (!currentRecord) return <div className="text-gray-400">사료를 선택해 주세요.</div>;

              return (
                <>
                  <div className="space-y-5 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start border-b border-white/10 pb-3">
                        <div>
                          <h4 className="text-lg font-light text-white flex items-center gap-1.5 serif-display italic">
                            {currentRecord.title} <span className="text-xs font-mono font-normal text-gray-400">({currentRecord.year}년 편찬)</span>
                          </h4>
                          <p className="text-[11px] text-[#C5A880] mt-0.5 font-mono tracking-wider">
                            {currentRecord.country === 'KOREA' ? '대한민국 공식 영토 지리지·법령 자료' : '일본 내무성 및 외교 관찬 국가 공문 자료'}
                          </p>
                        </div>
                      </div>

                      {/* Original Script if available */}
                      {currentRecord.originalText && (
                        <div className="bg-[#1C1712] border border-[#C5A880]/20 rounded-lg p-3">
                          <span className="text-[10px] font-bold text-[#C5A880] tracking-wider block">사료 한문 원안 (Original Text)</span>
                          <p className="text-sm font-serif font-bold text-amber-100/90 mt-1">
                            &quot;{currentRecord.originalText}&quot;
                          </p>
                        </div>
                      )}

                      {/* Translation script */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">현대어 국역 해설</span>
                        <p className="text-sm font-light text-gray-200 leading-relaxed">
                          {currentRecord.translatedText}
                        </p>
                      </div>

                      {/* Significance & Evidence */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                          <strong className="text-xs text-[#C5A880] block mb-1">역사적 의의</strong>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {currentRecord.significance}
                          </p>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                          <strong className="text-xs text-sky-400 block mb-1">결정적 영유 증빙 포인트</strong>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            {currentRecord.keyEvidence}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 text-[11px] text-gray-400 flex items-center gap-1.5 bg-white/5 -mx-5 -mb-5 p-4 rounded-b-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0"></span>
                    <span className="font-light">본 교재는 억지 배제가 안 통하는 최고 공영 문헌만 수집하여 역사적 왜곡 주장에 과학적으로 대응합니다.</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* 역사적 지도 갤러리 */}
      <div className="gallery-card rounded-2xl p-6 border border-white/5 space-y-6">
        <div>
          <h3 className="font-light text-lg text-white flex items-center gap-2 serif-display">
            <Layers className="w-5 h-5 text-[#C5A880]" />
            한·일 고지도의 진실 대조 갤러리
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 font-light">
            고지도에 묘사된 선명한 국가 경계선과 영토 영역은 왜곡 없는 시대적 자각을 대변하여 가르쳐 줍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Tabs for maps */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {MAP_DATA.map((map, index) => (
              <button
                key={map.id}
                onClick={() => setActiveMapIndex(index)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  activeMapIndex === index
                    ? 'border-[#C5A880] bg-white/5 ring-1 ring-[#C5A880]/30'
                    : 'border-white/5 bg-[#121212]/50 hover:bg-[#121212]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-light text-gray-400 font-mono tracking-wider">{map.author}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white`}>
                    {map.year}
                  </span>
                </div>
                <h4 className="font-light text-base text-white mt-1.5 serif-display italic">{map.title}</h4>
              </button>
            ))}
          </div>

          {/* Map Viewer Panel */}
          <div className="lg:col-span-8 bg-[#121212] border border-white/5 text-slate-100 rounded-xl p-5 md:p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/20`}>
                    {MAP_DATA[activeMapIndex].country === 'KOREA' ? '대한민국 영락 지리유산' : '일본 자주령 배제 규명자료'}
                  </span>
                  <h4 className="font-light text-xl mt-3.5 text-white serif-display">{MAP_DATA[activeMapIndex].title}</h4>
                  <p className="text-xs text-gray-400 mt-1">제작자: {MAP_DATA[activeMapIndex].author}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-[#C5A880] font-bold block uppercase tracking-wider">지도 서술 및 설명</span>
                  <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-light">
                    {MAP_DATA[activeMapIndex].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-sky-400 font-bold block">독도 표기 형식</span>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed font-light">
                      {MAP_DATA[activeMapIndex].dokdoRepresentation}
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-[#C5A880] font-bold block">역사 지도학적 가치</span>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed font-light">
                      {MAP_DATA[activeMapIndex].historicalSignificance}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-gray-500 font-mono text-center">
              * 해당 지도는 영토 왜곡론자들의 주요 반론 지점을 강력히 제압하는 학술적 기둥이 되는 고지도들입니다.
            </div>
          </div>
        </div>
      </div>

      {/* 안용복 사건 타임라인 */}
      <div className="gallery-card rounded-2xl p-6 border border-white/5">
        <h3 className="font-light text-lg text-white flex items-center gap-2 serif-display">
          <Calendar className="w-5 h-5 text-[#C5A880]" />
          안용복 사건과 평화 교섭 일대기 (안용복 외교 연대기)
        </h3>
        <p className="text-xs text-gray-400 mt-0.5 font-light">
          평범한 조선의 어민이 보여준 주도적 외교 투쟁과 그 결과로 빚어진 막부의 공식 도해 금지 조치를 타임라인별로 따라가 유산의 가치를 깨달아 보세요.
        </p>

        {/* Step-by-Step progress line */}
        <div className="relative mt-8">
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {TIMELINE_DATA.map((evt, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineStep(idx)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  activeTimelineStep === idx
                    ? 'bg-white text-black border-white shadow-md ring-1 ring-white/15'
                    : 'bg-[#121212]/95 text-gray-300 border-white/5 hover:bg-[#161616]'
                }`}
              >
                <span className={`text-[10px] font-bold block ${activeTimelineStep === idx ? 'text-gray-500' : 'text-[#C5A880]'}`}>
                  STEP {idx + 1} • {evt.year}
                </span>
                <h4 className="font-bold text-sm mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {evt.title}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline details panel */}
        <div className="mt-6 bg-[#0E0E0E] border border-white/5 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-white/5 text-[#C5A880] rounded border border-[#C5A880]/20 font-mono">
                  {TIMELINE_DATA[activeTimelineStep].year}
                </span>
                <h4 className="font-light text-white text-lg serif-display italic">
                  {TIMELINE_DATA[activeTimelineStep].title}
                </h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed pt-1 font-light">
                {TIMELINE_DATA[activeTimelineStep].details}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl shrink-0 md:w-80">
              <strong className="text-xs text-[#C5A880] font-extrabold block mb-1">외교적 영향력 및 전말</strong>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {TIMELINE_DATA[activeTimelineStep].impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
