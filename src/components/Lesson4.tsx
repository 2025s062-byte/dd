import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileEdit, CheckCircle, HelpCircle, Save, Download, RefreshCw, Sparkles, Printer, User, Award, Check, Key } from 'lucide-react';
import { EssayResponse, DiscussionAnswer } from '../types';

export default function Lesson4() {
  const [essay, setEssay] = useState<EssayResponse>({
    groupName: '평화나비 공동 모둠 1조',
    koreanStudentName: '김민준',
    japaneseStudentName: '사토 하루카',
    chapterTitle: '역사적 사료로 증명하고 평화로 보듬는 동해의 보석, 독도',
    essayContent: ''
  });

  const [discussion, setDiscussion] = useState<DiscussionAnswer>({
    q1: '',
    q2: '',
    q3: ''
  });

  const [saved, setSaved] = useState<boolean>(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false);

  // New states for the keyword-based AI essay generator
  const [reflectionKeywords, setReflectionKeywords] = useState<string>('');
  const [reflectionEssay, setReflectionEssay] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genError, setGenError] = useState<string>('');
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    const savedEssay = localStorage.getItem('dokdo_essay_data_v1');
    const savedDiscussion = localStorage.getItem('dokdo_discussion_data_v1');
    const savedKeywords = localStorage.getItem('dokdo_reflection_keywords_v1');
    const savedReflection = localStorage.getItem('dokdo_reflection_essay_v1');
    const savedCustomKey = localStorage.getItem('dokdo_custom_api_key_v1');
    
    if (savedEssay) {
      setEssay(JSON.parse(savedEssay));
      setLoadedFromStorage(true);
    }
    if (savedDiscussion) {
      setDiscussion(JSON.parse(savedDiscussion));
      setLoadedFromStorage(true);
    }
    if (savedKeywords) {
      setReflectionKeywords(savedKeywords);
    }
    if (savedReflection) {
      setReflectionEssay(savedReflection);
    }
    if (savedCustomKey) {
      setCustomApiKey(savedCustomKey);
    }
  }, []);

  // Save to local storage
  const handleSave = () => {
    localStorage.setItem('dokdo_essay_data_v1', JSON.stringify(essay));
    localStorage.setItem('dokdo_discussion_data_v1', JSON.stringify(discussion));
    localStorage.setItem('dokdo_reflection_keywords_v1', reflectionKeywords);
    localStorage.setItem('dokdo_reflection_essay_v1', reflectionEssay);
    localStorage.setItem('dokdo_custom_api_key_v1', customApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Autocomplete sample text
  const handleAutocompleteSample = () => {
    setEssay(prev => ({
      ...prev,
      chapterTitle: '우리가 함께 기록하는 평화의 섬 독도 이야기',
      essayContent: '동해의 평화로운 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 인식을 보여준다. 또한, 일본 메이지 정부 최고 기관이 내린 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본과 관계없는 조선의 영역임을 분명히 명시했다. 러일전쟁 중 일본에 의해 불법 편입되는 아픔을 겪기도 했으나, 2차 대전 후 연합국의 조치를 통해 한국의 관할로 환원되었다. 오늘날 양국은 배타적 경제수역(EEZ) 설정 과정에서 어업 갈등을 겪고 있으나, 영토 대립을 넘어 역사적 진실을 직시하고 동해를 평화와 공동 번영의 바다로 만들기 위해 상호 협력해야 한다.'
    }));

    setDiscussion({
      q1: '태정관 지령은 일본 최고 국가 행정기관이었던 태정관이 내무성에 "죽도(울릉도) 외 일도(독도)의 건은 일본과 관계가 없음을 명심할 것"이라고 엄격한 행정 지시를 하달했기 때문에 매우 결정적입니다. 이는 현대 일본 주장과 정면으로 대치되는 강력한 공적 사료이자, 자국 최고 조야가 영유가 아님을 확인한 확실한 자백입니다.',
      q2: '당시 유엔해양법공식협약 발효로 각국의 200해리 경제수역 획정이 일제히 추진되었습니다. 그러나 양국의 기점에서 겹치는 중첩 구역에 대한 주권 마찰을 방지하고 양국 어민의 실질적 공동 조업 실무를 긴급 보호하기 위하여 임시 묘수로 "중간수역"을 설정하는 타협이 빚어졌습니다.',
      q3: '갈등의 악순환을 끊으려면 고정관념에서 벗어나 양국의 다음 미래 청소년들이 정직하게 고문서 팩트를 연구하는 것이 지당합니다. 청소년 역사 캠프를 통하여 서로의 의견을 교정하고 평화적 협력의 영속적 기틀을 마련해야 더는 갈등의 피해자가 생기지 않을 것입니다.'
    });
  };

  // Generate essay with Gemini API
  const handleGenerateEssay = async () => {
    if (!reflectionKeywords.trim()) return;
    
    setIsGenerating(true);
    setGenError('');
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (customApiKey.trim()) {
        headers['x-custom-api-key'] = customApiKey.trim();
      }

      const response = await fetch('/api/generate-essay', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ keywords: reflectionKeywords }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '소감문 생성 중 오류가 발생했습니다.');
      }
      
      setReflectionEssay(data.essay || '');
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || '서버와의 통신 중 오류가 발생했습니다.';
      
      // 구체적 403 차단 오류에 대응하는 안내 문구 및 키 직접 입력 유도
      if (errMsg.includes('denied access') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403')) {
        errMsg = `독도 소감문 생성 중 구글 API 서버가 Vercel 서버의 미국 IP 대역으로부터 호출된 API 키 요청을 차단했습니다(403 API Key Denied).

💡 원인: 한국 도메인 사용자용 API 키를 Vercel US 동부 기본 서버리스 대역에서 호출할 때 보안 정책으로 인한 차단이 빈번하게 수신됩니다.

👇 해결 방안: 아래에서 본인의 구글 AI 스튜디오 API 키를 직접 임시 입력해 주세요! 본인의 브라우저 세션에서 Vercel 서버를 전용 프록시 삼아 안전하게 키를 전달해 우회합니다.`;
        setShowKeyInput(true);
      }
      setGenError(errMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply generated essay directly to textbook essay box
  const handleApplyToTextbook = () => {
    if (!reflectionEssay) return;
    if (window.confirm('작성된 AI 소감문을 상단 "공동 집필 서술형 본문"에 복사하여 적용하시겠습니까? (기존 내용은 덮어씌워집니다)')) {
      setEssay(prev => ({
        ...prev,
        essayContent: reflectionEssay
      }));
    }
  };

  // Reset implementation
  const handleReset = () => {
    if (window.confirm('입력하신 모든 내용을 초기화하시겠습니까?')) {
      setEssay({
        groupName: '',
        koreanStudentName: '',
        japaneseStudentName: '',
        chapterTitle: '',
        essayContent: ''
      });
      setDiscussion({
        q1: '',
        q2: '',
        q3: ''
      });
      setReflectionKeywords('');
      setReflectionEssay('');
      setCustomApiKey('');
      setShowKeyInput(false);
      localStorage.removeItem('dokdo_essay_data_v1');
      localStorage.removeItem('dokdo_discussion_data_v1');
      localStorage.removeItem('dokdo_reflection_keywords_v1');
      localStorage.removeItem('dokdo_reflection_essay_v1');
      localStorage.removeItem('dokdo_custom_api_key_v1');
    }
  };

  // Validation feedback indicators
  const hasSejong = essay.essayContent.includes('세종실록지리지');
  const hasTaejeonggwan = essay.essayContent.includes('태정관 지령') || essay.essayContent.includes('태정관지령');
  const essayLengthValid = essay.essayContent.length > 30 && essay.essayContent.length < 600;
  const satisfiesAll = hasSejong && hasTaejeonggwan && essayLengthValid;

  // Print worksheet layout safely
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:bg-white print:p-0">
      {/* 4차시 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="gallery-card rounded-2xl p-6 md:p-8 border border-white/5 print:hidden"
      >
        <span className="small-caps inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-[#C5A880] text-[10px] rounded-full border border-[#C5A880]/20 font-sans">
          <FileEdit className="w-3.5 h-3.5 text-[#C5A880]" /> Lesson Worksheet
        </span>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight serif-display">
              한·일 평화 공동 역사 교과서 서술하기
            </h2>
            <p className="text-gray-400 mt-2 leading-relaxed max-w-4xl font-light text-sm">
              한·일 왜곡된 영토주의적 갈등과 영유 공격의 골을 끊고, 양국 중·고교 청소년이 되어 함께 배우는 <strong className="text-white font-medium">지혜롭고 객관적인 평화지향적 공동 역사 교과서 단원</strong>을 직접 집필 및 서술해 보는 온라인 통합 워크시트 공간입니다.
            </p>
          </div>
          
          <button
            onClick={handleAutocompleteSample}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#C5A880]/30 bg-white/5 text-[#C5A880] font-bold text-xs hover:bg-[#C5A880]/10 shrink-0 self-start transition-all font-sans"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" /> 예시 작성안 불러오기
          </button>
        </div>

        {/* 작성 가이드라인 박스 */}
        <div className="mt-6 p-4 rounded-xl bg-[#121212] border border-white/5 text-gray-300 space-y-2">
          <h4 className="font-semibold text-sm text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> 교과서 서술 기준 필수 요건
          </h4>
          <ul className="text-xs space-y-1.5 leading-relaxed text-gray-400">
            <li className="flex items-start gap-1">
              <span className="text-[#C5A880] shrink-0">•</span>
              <span><strong>사료 근거 최소 2개 이상 제시</strong>: 배운 한·일 고문서 사료(<em>태정관 지령, 세종실록지리지, 만기요람, 신증동국여지승람</em> 등) 중 최소 두 개를 사실에 입각하여 서술할 것.</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-[#C5A880] shrink-0">•</span>
              <span><strong>서술 방향주의</strong>: 독단적이거나 선정적이고 감정적인 대립 표현을 일체 제하고, <strong>사실(Fact) 중심</strong>과 양국 우방 평화 상생 협력의 미래지향 공동체 가풍을 띄울 것.</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-[#C5A880] shrink-0">•</span>
              <span><strong>분량 규격</strong>: 10줄 이내(약 300~500자 내외)로 정연하고 깔끔한 소단원 문장 규격을 수확할 것.</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* 활동 일지 양식 본판 */}
      <div id="print-area" className="bg-[#121212] rounded-3xl p-6 md:p-10 border border-white/5 space-y-8 relative overflow-hidden print:bg-white print:text-black print:border-none">
        {/* Decorative corner indicator */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#1A1712] rounded-bl-full -z-10 hidden md:block print:hidden" />
        
        {/* Header Sheet layout */}
        <div className="border-b-2 border-dashed border-white/10 pb-5">
          <div className="text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">Joint History Workbook Task</span>
            <h3 className="text-2xl font-light text-white mt-1.5 serif-display">한·일 학생 공동 역사 교과서 — 독도 서술 제안서</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 print:grid-cols-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 block uppercase font-mono tracking-wider">집필 모둠명</label>
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 focus-within:border-[#C5A880] transition-colors font-sans">
                <User className="w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  value={essay.groupName}
                  onChange={e => setEssay({...essay, groupName: e.target.value})}
                  placeholder="모둠 한글명을 적으세요"
                  className="bg-transparent border-none text-sm font-semibold text-white focus:outline-none w-full placeholder-gray-600 print:text-black font-sans"
                />
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <label className="text-[10px] font-bold text-gray-500 block uppercase font-mono tracking-wider">집필 모둠원 (한국 학생명)</label>
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 focus-within:border-[#C5A880] transition-colors font-sans">
                <span className="w-4 h-4 bg-sky-950 text-sky-400 text-[10px] rounded flex items-center justify-center font-bold font-mono">K</span>
                <input
                  type="text"
                  value={essay.koreanStudentName}
                  onChange={e => setEssay({...essay, koreanStudentName: e.target.value})}
                  placeholder="한국 학생명을 기입하세요"
                  className="bg-transparent border-none text-sm font-semibold text-white focus:outline-none w-full placeholder-gray-600 print:text-black font-sans"
                />
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <label className="text-[10px] font-bold text-gray-500 block uppercase font-mono tracking-wider">집필 모둠원 (일본 학생명)</label>
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 focus-within:border-[#C5A880] transition-colors font-sans">
                <span className="w-4 h-4 bg-red-950 text-red-400 text-[10px] rounded flex items-center justify-center font-bold font-mono">J</span>
                <input
                  type="text"
                  value={essay.japaneseStudentName}
                  onChange={e => setEssay({...essay, japaneseStudentName: e.target.value})}
                  placeholder="일본 학생명을 기입하세요"
                  className="bg-transparent border-none text-sm font-semibold text-white focus:outline-none w-full placeholder-gray-600 print:text-black font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 제안 단원 제목 */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full inline-block" /> 우리가 제안하는 독도 단원 조율 제목
          </label>
          <input
            type="text"
            value={essay.chapterTitle}
            onChange={e => setEssay({...essay, chapterTitle: e.target.value})}
            placeholder="예시: 평화와 상생의 푸른 보석, 동해 그리고 주권의 독도"
            className="w-full p-3 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] placeholder-gray-600 print:text-black print:bg-white"
          />
        </div>

        {/* 공동 집필 본문 (10줄 이내 작성) */}
        <div className="space-y-2.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 font-sans">
            <label className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full inline-block" /> 공동 집필 서술형 본문 (10줄 이내 - 600자 미만)
            </label>
            
            {/* Real-time Validation Badge */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] print:hidden">
              <span className={`px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 border ${
                hasSejong ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40' : 'bg-white/5 text-gray-500 border-white/5'
              }`}>
                {hasSejong && <Check className="w-2.5 h-2.5" />} 세종실록지리지
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 border ${
                hasTaejeonggwan ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40' : 'bg-white/5 text-gray-500 border-white/5'
              }`}>
                {hasTaejeonggwan && <Check className="w-2.5 h-2.5" />} 태정관 지령
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 border ${
                satisfiesAll ? 'bg-white/10 text-white border-[#C5A880]/50' : 'bg-amber-950/20 text-[#C5A880]/90 border-[#C5A880]/30'
              }`}>
                {satisfiesAll ? '🎯 가이드 조건 충족!' : '⚠️ 사료를 고루 서술해보세요.'}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={essay.essayContent}
              onChange={e => setEssay({...essay, essayContent: e.target.value})}
              rows={11}
              placeholder="예시 가이드를 참고하여, 세종실록지리지, 태정관지령 등의 핵심 사료명을 기반으로 평화롭고 사실에 근접한 교과서 본문을 직접 집필해 보세요..."
              className="w-full p-4 rounded-xl border border-white/10 text-xs font-light leading-relaxed tracking-wide bg-[#0E0E0E] text-gray-200 select-text focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] print:border-none print:p-0 print:text-black print:bg-white"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            {satisfiesAll && (
              <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#C5A880] text-black shadow-sm ring-1 ring-white/20 print:hidden animate-bounce">
                <Award className="w-3.5 h-3.5 text-black" /> 조건 완료 뱃지 수여!
              </span>
            )}
          </div>
        </div>

        {/* 대성 토론 및 성찰 질문 리스트 워크지 */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <h4 className="font-light text-base text-white border-b border-white/5 pb-3.5 serif-display italic">
            👨‍🏫 토론 및 스스로의 학습 성찰 워크북 (질문에 답하기)
          </h4>

          {/* Q1 */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-white/5 p-3.5 rounded-lg border border-white/5">
              <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-sans">Q1</span>
              <p className="text-xs font-light text-gray-200 leading-relaxed font-sans">
                일본의 1877년 『태정관 지령』과 첨부된 『기죽도약도』가 현대 일본 정부의 &quot;에도시대부터 독도를 자국 영토로 인지했다&quot;는 주장을 결정적으로 반박하는 핵심 카드인 본질과 이유는 무엇인가요?
              </p>
            </div>
            <textarea
              value={discussion.q1}
              onChange={e => setDiscussion({...discussion, q1: e.target.value})}
              rows={3}
              placeholder="자유롭게 본인의 생각을 기록해 보세요..."
              className="w-full p-3 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] print:border-none print:p-0 print:text-black print:bg-white"
            />
          </div>

          {/* Q2 */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-white/5 p-3.5 rounded-lg border border-white/5">
              <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-sans">Q2</span>
              <p className="text-xs font-light text-gray-200 leading-relaxed font-sans border-none">
                1998년 체결된 '신한일어업협정'에서 왜 독도가 한국의 독자적 EEZ 기점이 되지 못하고 중간수역에 놓이게 되었는지, 당시의 타협 배경과 조약의 한계를 비판적으로 서술해 보십시오.
              </p>
            </div>
            <textarea
              value={discussion.q2}
              onChange={e => setDiscussion({...discussion, q2: e.target.value})}
              rows={3}
              placeholder="자유롭게 본인의 생각을 기록해 보세요..."
              className="w-full p-3 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] print:border-none print:p-0 print:text-black print:bg-white animate-fade-in"
            />
          </div>

          {/* Q3 */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-white/5 p-3.5 rounded-lg border border-white/5">
              <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-sans">Q3</span>
              <p className="text-xs font-light text-gray-200 leading-relaxed font-sans">
                미래 세대인 우리가 독도 갈등을 국경 분열 대신 평화롭고 슬기롭게 상생 정비하기 위해, 한·일 청소년 역사교류 및 학술캠프가 왜 중요한지 성찰 의견을 정리해 서술해 보십시오.
              </p>
            </div>
            <textarea
              value={discussion.q3}
              onChange={e => setDiscussion({...discussion, q3: e.target.value})}
              rows={3}
              placeholder="자유롭게 본인의 생각을 기록해 보세요..."
              className="w-full p-3 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] print:border-none print:p-0 print:text-black print:bg-white"
            />
          </div>
        </div>

        {/* AI 독도 배움 소감문 자동 한판 집필 */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <h4 className="font-light text-base text-white border-b border-white/5 pb-3.5 serif-display italic flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" /> 🤖 인공지능(AI) 독도 배움 소감문 자동 집필
          </h4>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#141414] p-4.5 rounded-xl border border-white/5">
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              본 학습 과정에서 얻은 성찰이나 소감문에 반드시 담고 싶은 단어(예: <strong className="text-white">평화, 공존, 미래 세대, 역사적 진실</strong> 등)를 입력하고 생성 버튼을 누르면, 사실 중심의 품격 있고 미래지향적인 소감문이 즉석에서 지어집니다.
            </p>
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-[11px] text-gray-400 hover:text-[#C5A880] transition flex items-center gap-1.5 shrink-0 font-sans border border-white/10 hover:border-[#C5A880]/30 px-3 py-1.5 rounded-lg cursor-pointer print:hidden select-none"
            >
              <Key className="w-3.5 h-3.5" />
              {showKeyInput ? '개인 API 키 입력 가리기' : '개인 API 키 직접 입력'}
            </button>
          </div>

          {showKeyInput && (
            <div className="p-4 bg-yellow-950/10 border border-[#C5A880]/20 rounded-xl space-y-2.5 animate-fade-in print:hidden font-sans">
              <span className="text-xs text-[#C5A880] font-medium flex items-center gap-1.5">🔑 구글 AI 스튜디오 API 키 직접 주입 (선택사항)</span>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                Vercel에 배포 후 구글의 IP 보안 제한(403 Forbidden - Your project has been denied access)으로 인해 요청이 거부될 경우를 위한 우회 수단입니다. 구글 AI 스튜디오(<a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-[#C5A880] underline hover:text-[#b0946d]">aistudio.google.com</a>)에서 발급받은 본인의 API 키를 입력해 두시면, Vercel 서버는 전달 기능만 대행(프록시)하고 본인의 클라이언트 측 키 주도로 안전히 처리됩니다.
              </p>
              <div className="flex gap-2.5">
                <input
                  type="password"
                  value={customApiKey}
                  onChange={e => setCustomApiKey(e.target.value)}
                  placeholder="AI Studio API Key (AIzaSy... 로 시작하는 값)"
                  className="flex-1 p-2.5 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                />
                {customApiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomApiKey('');
                      localStorage.removeItem('dokdo_custom_api_key_v1');
                    }}
                    className="px-3.5 py-2 text-xs border border-red-900/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 rounded-lg transition"
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3 print:hidden">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={reflectionKeywords}
                onChange={e => setReflectionKeywords(e.target.value)}
                placeholder="소감문에 포함할 핵심 키워드를 입력해 보세요 (예: 미래세대, 평화공존, 태정관지령)"
                className="flex-1 p-3 rounded-lg border border-white/10 bg-[#0E0E0E] text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880]"
              />
              
              <button
                type="button"
                disabled={isGenerating || !reflectionKeywords.trim()}
                onClick={handleGenerateEssay}
                className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg text-xs font-semibold bg-[#C5A880] text-black hover:bg-[#b0946d] disabled:opacity-40 disabled:hover:bg-[#C5A880] disabled:cursor-not-allowed transition duration-200 cursor-pointer font-sans"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> 소감문 작성하기
                  </>
                )}
              </button>
            </div>

            {/* 프리셋 키워드 추천 */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
              <span className="text-[10px] text-gray-500 font-medium">추천 키워드 터치:</span>
              {['역사적 권원', '태정관지령', '평화 공동체', '미래 세대', '상생 협력', '세종실록지리지', '동해의 보석'].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    const curr = reflectionKeywords.trim();
                    if (!curr) {
                      setReflectionKeywords(preset);
                    } else if (curr.endsWith(',')) {
                      setReflectionKeywords(`${curr} ${preset}`);
                    } else {
                      setReflectionKeywords(`${curr}, ${preset}`);
                    }
                  }}
                  className="px-2.5 py-1 text-[10px] border border-white/5 bg-white/5 text-gray-400 hover:text-[#C5A880] hover:border-[#C5A880]/30 rounded transition cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {genError && (
            <p className="text-xs text-red-400 font-medium bg-red-950/20 p-2.5 rounded border border-red-900/30">
              {genError}
            </p>
          )}

          <div className="space-y-2.5">
            <textarea
              value={reflectionEssay}
              onChange={e => setReflectionEssay(e.target.value)}
              rows={4}
              placeholder="자동 생성된 고품격 성찰 소감문이 나타납니다. 생성된 소감문을 직접 보완하거나 자유롭게 편집할 수도 있습니다..."
              className="w-full p-4 rounded-xl border border-white/10 text-xs font-light leading-relaxed bg-[#0E0E0E] text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#C5A880]/30 focus:border-[#C5A880] print:border-none print:p-0 print:text-black print:bg-white"
              style={{ fontFamily: 'Georgia, serif' }}
            />

            {reflectionEssay && (
              <div className="flex gap-2.5 justify-end print:hidden">
                <button
                  type="button"
                  onClick={handleApplyToTextbook}
                  className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold border border-emerald-900/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-950/60 rounded-lg transition cursor-pointer font-sans"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> 상단 교과서 집필문으로 복사 적용하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 선생님 평가 란 */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] block uppercase">지도교사 평가위원 소견란</span>
            <div className="text-xs text-gray-300 italic py-4 font-light leading-relaxed">
              &quot;풍성한 사료 대목을 충실히 거쳐 한·일 평화 우방의 미래지향성 서술 요건을 모범적으로 다듬어낸 우수한 역사 성찰 논단 자료입니다.&quot;
            </div>
            <span className="text-xs font-semibold text-white">대한민국 평화교육위원회 서명: (인)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0B0B] border border-white/5 flex flex-col justify-between items-end print:hidden">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] block uppercase text-right">학생 학습용 상태 인덱스</span>
            <div className="py-2 text-right">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <span>사료 명문화 체크:</span>
                <span className={`font-bold ${satisfiesAll ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {satisfiesAll ? '수행 완료 (100점)' : '미수행 (지문 기재 요망)'}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-light">로컬 브라우저에 자동 실시간 보존 활성되었습니다.</p>
            </div>
            <span className="text-[11px] font-mono text-gray-500 font-light font-mono">Ver 1.0.4 - Dokdo Study</span>
          </div>
        </div>
      </div>

      {/* 액션 컨트롤 버튼들 */}
      <div className="flex flex-wrap gap-3 items-center justify-end print:hidden">
        <button
          onClick={handleReset}
          type="button"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/5 bg-white/5 text-gray-300 text-xs font-semibold hover:bg-white/10 transition font-sans"
        >
          <RefreshCw className="w-3.5 h-3.5" /> 입력값 초기화
        </button>

        <button
          onClick={handlePrint}
          type="button"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#C5A880] text-black text-xs font-semibold hover:bg-[#b0946d] transition font-sans"
        >
          <Printer className="w-3.5 h-3.5" /> 인쇄하기 / PDF 저장
        </button>

        <button
          onClick={handleSave}
          type="button"
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-gray-100 transition shadow-lg font-sans"
        >
          <Save className="w-4 h-4" />
          {saved ? '로컬 저장 완료!' : '워크북 중간 저장'}
        </button>
      </div>
    </div>
  );
}
