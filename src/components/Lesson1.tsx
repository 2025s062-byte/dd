import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Map, Eye, Sunset, Info, CheckCircle, Navigation } from 'lucide-react';
import { DISTANCE_DATA, TERRITORY_ELEMENTS } from '../data';

export default function Lesson1() {
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="gallery-card rounded-2xl p-6 md:p-8 border border-white/5"
      >
        <span className="small-caps inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#C5A880] text-[10px] rounded-full border border-[#C5A880]/20">
          <Map className="w-3.5 h-3.5" /> Lesson Overview
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-white mt-4 tracking-tight serif-display">
          독도의 지리적 특성과 영역의 이해
        </h2>
        <p className="text-gray-400 mt-2.5 leading-relaxed max-w-4xl font-light text-sm">
          독도가 대한민국의 영토임을 명확히 이해하는 첫걸음은 흔들림 없는 <strong className="text-white font-medium">물리적·지리적 사실</strong>과 국제법적 영역 3요소(영토, 영해, 영공)의 현대적 규정을 올바르고 정밀하게 적립하는 것입니다. 독도는 감정의 대상이 아닌, 이성적이고 사실적인 우리 국토의 동쪽 끝입니다.
        </p>

        {/* Fact Mini Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <div className="p-2 bg-[#C5A880]/10 text-[#C5A880] rounded-lg shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">주권 기준 위치 (동도 우산봉)</p>
              <p className="text-sm font-semibold text-white mt-1.5">북위 37°14′26.8″</p>
              <p className="text-sm font-semibold text-white">동경 131°52′10.4″</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <div className="p-2 bg-[#C5A880]/10 text-[#C5A880] rounded-lg shrink-0">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">총공간 면적 구성</p>
              <p className="text-sm font-semibold text-white mt-1.5">총 187,554 m²</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                동도(73,297m²), 서도(88,740m²) 및 주변 89개 부속 바위섬 구성
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <div className="p-2 bg-[#C5A880]/10 text-[#C5A880] rounded-lg shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">체감적 공간 스케일</p>
              <p className="text-sm font-semibold text-white mt-1.5">종합운동장의 약 2배</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                서울 잠실종합운동장을 훌쩍 넘는 장대하고 울창한 천혜의 화산섬
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid: Distance Indicator & Visual Eye Observability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Distance comparison widget */}
        <div id="distance-chart" className="lg:col-span-7 gallery-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white/5 text-[#C5A880] rounded-md border border-white/10">
                <Navigation className="w-4 h-4" />
              </span>
              <h3 className="font-light text-lg text-white serif-display">인접 영토와의 직선 거리 물리적 대조</h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              더 가까울수록 생활권 인지와 자생적 거점으로 자연스럽게 복속됨을 뜻하는 강력한 지리지표입니다.
            </p>

            <div className="space-y-6 mt-6">
              {DISTANCE_DATA.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      {item.from} — {item.to}
                      {item.isClosest && (
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-[#C5A880]/20 text-[#C5A880] rounded border border-[#C5A880]/30 uppercase tracking-wider">
                          최단 거리
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                      {item.distance} <span className="text-xs text-gray-450 font-sans font-medium">km</span>
                    </span>
                  </div>
                  
                  {/* Visual Bar representation */}
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.distance / 250) * 100}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                      className={`h-full rounded-full ${
                        item.isClosest 
                          ? 'bg-gradient-to-r from-[#C5A880] to-[#E5CBB4]' 
                          : 'bg-gradient-to-r from-gray-700 to-gray-800'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5 mt-1 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
            <Info className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>울릉도는 독도와 <strong className="text-white">87.4 km</strong> 떨어진 가장 가까운 모섬으로, 일본 오키섬(157.5 km)에 비해 거의 두 배 가까이 이웃해 있습니다.</span>
          </div>
        </div>

        {/* Observability card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#121212] to-[#0A0A0A] border border-white/5 text-slate-200 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Eye className="w-5 h-5" />
              <h3 className="font-light text-lg text-white serif-display">육안 관측성의 중대한 역사적 의의</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              지리 및 역사 인식론 측면에서 <strong className="text-white">&quot;별도 장비 없이 인간의 맨눈으로 보인다는 사실&quot;</strong>은 자연적 주권 자각과 영토 개척 영유화의 시발점이 되는 최고 기준 법적 요건입니다.
            </p>

            <div className="space-y-3 mt-4">
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-sm font-semibold text-[#C5A880] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C5A880]" /> 울릉도에서의 독도 관측
                </h4>
                <p className="text-[11px] text-gray-450 mt-1 leading-relaxed font-light">
                  울릉도의 사동, 석포마을 등 일정한 높이의 고지대에서는 높은 대청을 이루며 맑은 날 수평선 동쪽 끝에 떠오른 독도가 선명히 육안으로 조망됩니다. 우리 선조들이 고대에 독도를 울릉도의 자연 우방이자 자치 생활권 일부로 인정한 지표입니다.
                </p>
              </div>

              <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" /> 일본 오키섬에서의 관측 불가능성
                </h4>
                <p className="text-[11px] text-gray-450 mt-1 leading-relaxed font-light">
                  일본과 가장 근수 거리에 위치한 은도(오키섬)에서는 거리 차가 157.5km에 달해 지구의 둥근 곡면 때문에 그 어떤 초쾌청 기상도 하에서도 돋보기나 맨눈으로 <u className="decoration-red-400">독도를 관측하는 것 자체가 원천 불가</u>합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-gray-500 flex items-center gap-1.5 serif-display italic">
            <Sunset className="w-4 h-4 text-[#C5A880]" />
            <span>&quot;보이기에 내 땅이라 자각한 역사&quot; vs &quot;보이지 않아 억지 도해한 역사&quot;</span>
          </div>
        </div>
      </div>

      {/* 국가 영역 삼요소 + 독도 */}
      <div className="gallery-card rounded-2xl p-6 border border-white/5">
        <h3 className="font-light text-xl text-white flex items-center gap-2 serif-display">
          <span className="w-1 h-5 bg-[#C5A880] inline-block"></span>
          국가 영역(Territory)의 요소들과 독도의 현행 법적 정격 지위
        </h3>
        <p className="text-xs text-gray-450 mt-1 font-light">
          영토를 지키기 위해 영해와 영공의 영역적 주권을 각 단계별로 실증 행사하고 있는 현항을 알아보세요. (항목을 선택하여 분석)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {TERRITORY_ELEMENTS.map((el, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedElement(selectedElement === idx ? null : idx)}
              className={`text-left p-4 rounded-xl border transition-all hover:shadow-md ${
                selectedElement === idx
                  ? 'border-[#C5A880] bg-white/5 shadow-sm shadow-black ring-1 ring-[#C5A880]/30'
                  : 'border-white/5 bg-[#121212]/60 hover:bg-[#161616]'
              }`}
            >
              <h4 className="font-semibold text-white text-sm md:text-base flex justify-between items-center mr-1">
                {el.category}
                <span className={`w-2 h-2 rounded-full ${selectedElement === idx ? 'bg-[#C5A880]' : 'bg-gray-700'}`}></span>
              </h4>
              <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 md:line-clamp-none font-light">
                {el.concept}
              </p>
              {selectedElement === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-300 bg-white/5 p-2.5 rounded border border-[#C5A880]/20 font-light"
                >
                  <span className="font-semibold text-[#C5A880] block mb-0.5">독도 주권 적용:</span>
                  {el.dokdoStatus}
                </motion.div>
              )}
              {selectedElement !== idx && (
                <span className="inline-block mt-2 text-[10px] text-[#C5A880] font-semibold hover:underline">
                  주권 실증 분석보기 →
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 주민 거주와 고유 도로명 체계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gallery-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880] bg-white/5 border border-[#C5A880]/20 px-2.5 py-1 rounded">
              동도 (East Island) - 외교·행정 거점
            </span>
            <h4 className="text-xl font-light text-white mt-4 serif-display italic">독도리 이사부길</h4>
            <p className="text-xs text-gray-450 mt-1 font-light leading-relaxed">
              삼국유사에 기록된 서기 512년 울릉도(우산국)를 정벌한 위대한 신라의 장군 이사부의 성함을 부여받은 도로명입니다.
            </p>
            
            <ul className="space-y-2 mt-4 text-xs text-gray-400 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                <span><strong className="text-white">독도경비대</strong>: 대한민국의 정규 경찰관들이 상시 주둔하며 영토방위 경비 활동을 펼칩니다.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                <span><strong className="text-white">독도등대</strong>: 동해를 지나는 모든 선박들의 수로를 밝혀주는 영토의 인도 등대입니다.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                <span><strong className="text-white">한반도 바위</strong>: 마치 지도 모양과 닮은 자연 바위 형태가 조각되어 상징성이 두드러집니다.</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-500 font-mono">
            경북 울릉군 울릉읍 독도리 이사부길 55 (독도경비대)
          </div>
        </div>

        <div className="gallery-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880] bg-white/5 border border-[#C5A880]/20 px-2.5 py-1 rounded">
              서도 (West Island) - 민간 생활 거점
            </span>
            <h4 className="text-xl font-light text-white mt-4 serif-display italic">독도리 안용복길</h4>
            <p className="text-xs text-gray-450 mt-1 font-light leading-relaxed">
              조선 숙종 시기, 목숨을 걸고 바다를 건너가 일본 막부로부터 독도가 조선 영토임을 사수해 낸 민초 안용복의 노고를 기리는 명칭입니다.
            </p>

            <ul className="space-y-2 mt-4 text-xs text-gray-400 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                <span><strong className="text-white">주민 주민숙소</strong>: 민간인 독도 주민(김신열 님 등 역사적 주민)이 거주하며 자생하는 터전입니다.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                <span><strong className="text-white">물골 (Drinking Water source)</strong>: 독도의 유일한 천연 식수 발원지로, 하루 수백 리터의 상수가 고여 마실 물을 공급합니다.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                <span><strong className="text-white">주상절리</strong>: 화산 폭발로 점철된 수려하고 장대한 바위 절리와 암석 경관이 예술을 이룹니다.</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-500 font-mono">
            경북 울릉군 울릉읍 독도리 안용복길 3 (주민숙소)
          </div>
        </div>
      </div>
    </div>
  );
}
