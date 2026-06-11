export const APPLY_URL = "https://forms.gle/RKAJhQC8XdtnzcMEA";

export const navItems = [
  { label: "프로그램 소개", href: "#program" },
  { label: "커리큘럼", href: "#curriculum" },
  { label: "기대 결과", href: "#outcomes" },
  { label: "오프라인 경험", href: "#audience" },
  { label: "신청 안내", href: "#apply" },
];

export const solutionFeatures = [
  { chip: "DATA", title: "데이터 기반", description: "뉴스, 공시, 재무제표, 기업 정보, 시세 데이터 수집" },
  { chip: "FIN", title: "금융 원리 기반", description: "기업 분석, 지표 해석, 투자 논리 이해", variant: "mint" },
  { chip: "AI", title: "AI 에이전트 기반", description: "정보 분석, 요약, 비교, 리포트 생성, 자동화" },
];

export const programInfo = [
  { label: "교육 일정", values: ["6월 20일 · 21일", "6월 27일 · 28일"], note: "매주 토·일" },
  { label: "교육 시간", values: ["오후 1시 - 6시", "회차별 5시간"], note: "총 20시간" },
  { label: "교육 장소", values: ["강남역 부근", "오프라인 교육장"], note: "세부 장소 추후 공지" },
  { label: "수강료", values: ["800,000원"], note: "1기 선착순 20% 할인<br />15명 한정" },
];

export const curriculumDays = [
  {
    day: "DAY 01 · 6월 20일 토요일",
    index: "01",
    title: "OHLCV 데이터 수집과 기술적 지표 분석",
    description: "관심 종목의 시세 데이터를 수집하고 RSI, EMA, MACD 등 핵심 지표를 계산하는 기초 분석 흐름을 만듭니다.",
    outcome: "데이터·지표 구축",
  },
  {
    day: "DAY 02 · 6월 21일 일요일",
    index: "02",
    title: "뉴스 분석과 리서치 RAG 자동화",
    description: "뉴스와 리서치 자료를 수집·요약하고, 근거 기반으로 질의응답할 수 있는 AI 분석 구조를 만듭니다.",
    outcome: "뉴스·RAG 분석",
    variant: "mint",
  },
  {
    day: "DAY 03 · 6월 27일 토요일",
    index: "03",
    title: "AI 종합 투자 판단과 모의투자 검증",
    description: "기술 지표와 리서치 결과를 통합해 AI 투자 의견을 생성하고, 모의투자 검증 흐름과 연결합니다.",
    outcome: "종합 판단·검증",
  },
  {
    day: "DAY 04 · 6월 28일 일요일",
    index: "04",
    title: "백테스팅과 전략 검증",
    description: "과거 데이터를 기반으로 전략을 검증하고, 가치투자 지표를 활용해 나만의 판단 기준을 정리합니다.",
    outcome: "백테스팅·전략 검증",
    variant: "mint",
  },
];

export const curriculumTools = ["n8n", "ChatGPT/Claude", "Yahoo Finance", "Google Sheets", "OpenAI", "DART"];

export const outcomeCards = [
  { title: "투자 리서치 자동화 시스템", description: "관심 종목 리서치 흐름을 하나의 루틴으로 정리합니다." },
  { title: "데이터 자동 수집 시스템", description: "시세, 뉴스, 시장 지표를 반복 수집할 수 있게 구성합니다." },
  { title: "AI 투자 리포트 생성기", description: "수집 데이터를 바탕으로 핵심 이슈와 리스크를 요약합니다." },
  { title: "n8n 자동화 워크플로우", description: "수집부터 리포트 생성까지 정기 실행 흐름으로 연결합니다." },
];

export const outcomeTags = [
  "기술적 지표 분석 템플릿",
  "뉴스 센티먼트 분석",
  "공시·사업보고서 AI 검색",
  "모의투자 검증 루틴",
  "개인별 의사결정 체크리스트",
];

export const galleryItems = [
  { src: "assets/offline-education-1.svg", alt: "이룸터 오프라인 교육 현장 1", caption: "오프라인 강의" },
  { src: "assets/offline-education-2.svg", alt: "이룸터 오프라인 교육 현장 2", caption: "네트워킹 세션" },
  { src: "assets/offline-education-3.svg", alt: "이룸터 실습형 교육 프로그램 현장 1", caption: "실습형 프로그램" },
  { src: "assets/offline-seminar.jpg", alt: "이룸터 오프라인 세미나 현장", caption: "오프라인 세미나" },
];

export const faqItems = [
  {
    question: "투자 초보자도 참여할 수 있나요?",
    answer: "네, 가능합니다. 이 프로그램은 투자 경험보다는 체계적인 분석 방법을 배우고자 하는 의지가 더 중요합니다. 다만, 기본적인 주식 투자 개념에 대한 이해가 있으면 더욱 수월하게 참여하실 수 있습니다.",
  },
  {
    question: "자동매매를 배우는 과정인가요?",
    answer: "아닙니다. 이 프로그램은 자동매매가 아닌 투자 리서치 자동화에 초점을 맞춥니다. 데이터 수집, 분석, 리포트 생성 등 반복적인 리서치 업무를 자동화하여 더 나은 투자 의사결정을 돕는 것이 목표입니다.",
  },
  {
    question: "종목 추천을 해주나요?",
    answer: "아닙니다. 이룸터는 특정 종목을 추천하지 않습니다. 대신, 스스로 데이터를 분석하고 투자 판단을 내릴 수 있는 능력과 시스템을 구축하는 방법을 가르칩니다.",
  },
  {
    question: "AI나 자동화 도구를 처음 접해도 가능한가요?",
    answer: "네, 가능합니다. 프로그램에서 필요한 AI 도구와 자동화 플랫폼 사용법을 처음부터 단계별로 가르쳐 드립니다. 기본적인 컴퓨터 활용 능력과 새로운 도구를 배우려는 적극적인 자세가 필요합니다.",
  },
  {
    question: "교육 후 어떤 결과물을 얻게 되나요?",
    answer: "교육이 끝나면 본인만의 투자 리서치 자동화 워크플로우를 갖추게 됩니다. 뉴스 수집, 재무제표 분석, AI 기반 센티먼트 분석, 자동 리포트 생성 등이 포함된 실제 작동하는 시스템입니다.",
  },
  {
    question: "오프라인 교육은 어떻게 진행되나요?",
    answer: "강남역 부근에서 진행될 예정이며, 총 20시간 동안 실습 중심으로 진행됩니다. 개인 노트북을 지참하셔야 하며, 강의와 실습을 병행하여 직접 시스템을 구축해보는 형태로 운영됩니다.",
  },
];
