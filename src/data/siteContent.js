export const APPLY_URL = "https://forms.gle/RKAJhQC8XdtnzcMEA";

export const navItems = [
  { label: "과정 소개", href: "#program" },
  { label: "커리큘럼", href: "#curriculum" },
  { label: "기대 결과", href: "#outcomes" },
  { label: "오프라인 경험", href: "#audience" },
  { label: "신청 안내", href: "#apply" },
];

export const solutionFeatures = [
  { chip: "DATA", title: "데이터 수집", description: "뉴스, 공시, 재무제표, 시세 데이터를 한 흐름으로 정리합니다." },
  { chip: "FIN", title: "금융 해석", description: "기업 분석과 주요 지표를 투자 판단의 언어로 연결합니다.", variant: "mint" },
  { chip: "AI", title: "AI 자동화", description: "요약, 비교, 리포트 생성을 자동화해 반복 업무를 줄입니다." },
];

export const programInfo = [
  { label: "교육 일정", values: ["7월 4일 · 5일", "7월 11일 · 12일"], note: "매주 토·일" },
  { label: "교육 시간", values: ["오후 1시 - 6시", "회차별 5시간"], note: "총 20시간" },
  { label: "교육 장소", values: ["강남역 부근", "오프라인 교육장"], note: "세부 장소 추후 공지" },
  { label: "수강료", values: ["800,000원"], note: "1기 선착순 20% 할인<br />15명 한정" },
];

export const curriculumDays = [
  {
    day: "DAY 01",
    title: "OHLCV 수집과 지표 분석",
    description: "관심 종목의 시세 데이터를 수집하고 RSI, EMA, MACD 등 핵심 지표를 계산합니다.",
    // outcome: "데이터·지표",
    flowKeywords: ["데이터", "지표"],
  },
  {
    day: "DAY 02",
    title: "뉴스·리서치 RAG 분석",
    description: "뉴스와 리서치 자료를 수집·요약하고, 근거 기반 질의응답 구조를 만듭니다.",
    // outcome: "뉴스·RAG",
    flowKeywords: ["뉴스", "RAG"],
    variant: "mint",
  },
  {
    day: "DAY 03",
    title: "AI 투자 판단과 모의 검증",
    description: "기술 지표와 리서치 결과를 통합해 AI 의견을 생성하고 모의 검증과 연결합니다.",
    // outcome: "종합 판단·검증",
    flowKeywords: ["종합 판단", "검증"],
  },
  {
    day: "DAY 04",
    title: "백테스팅과 전략 검증",
    description: "과거 데이터로 전략을 검증하고, 가치투자 지표를 활용해 판단 기준을 정리합니다.",
    // outcome: "전략 검증",
    flowKeywords: ["전략", "분석"],
    variant: "mint",
  },
];

export const curriculumTools = ["n8n", "ChatGPT/Claude", "Yahoo Finance", "Google Sheets", "DART"];

export const outcomeCards = [
  { title: "리서치 워크플로우", description: "관심 종목을 분석하는 과정을 단계별 루틴으로 정리합니다." },
  { title: "데이터 수집 구조", description: "시세, 뉴스, 시장 지표를 반복 수집할 수 있게 구성합니다." },
  { title: "AI 리포트 생성", description: "수집 데이터를 바탕으로 핵심 이슈와 리스크를 요약합니다." },
  { title: "n8n 자동화 흐름", description: "수집부터 리포트 생성까지 정기 실행 구조로 연결합니다." },
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
    answer: "네, 가능합니다. 투자 경험보다 체계적인 분석 방법을 배우려는 의지가 더 중요합니다. 기본적인 주식 투자 개념을 알고 있다면 더 수월하게 따라올 수 있습니다.",
  },
  {
    question: "자동매매를 배우는 과정인가요?",
    answer: "아닙니다. 이 과정은 자동매매가 아니라 투자 리서치 자동화에 초점을 맞춥니다. 데이터 수집, 분석, 리포트 생성처럼 반복되는 업무를 줄이는 것이 목표입니다.",
  },
  {
    question: "종목 추천을 해주나요?",
    answer: "아닙니다. 특정 종목을 추천하지 않습니다. 대신 데이터를 정리하고, 스스로 투자 판단을 내릴 수 있는 분석 체계를 만드는 방법을 다룹니다.",
  },
  {
    question: "AI나 자동화 도구를 처음 접해도 가능한가요?",
    answer: "네, 가능합니다. 수업에서 필요한 AI 도구와 자동화 플랫폼 사용법을 단계별로 안내합니다. 기본적인 컴퓨터 활용 능력은 필요합니다.",
  },
  {
    question: "교육 후 어떤 결과물을 얻게 되나요?",
    answer: "교육 후에는 본인만의 투자 리서치 워크플로우를 갖게 됩니다. 뉴스 수집, 재무제표 분석, AI 요약, 자동 리포트 생성 흐름이 포함됩니다.",
  },
  {
    question: "오프라인 교육은 어떻게 진행되나요?",
    answer: "강남역 부근에서 총 20시간 동안 실습 중심으로 진행됩니다. 개인 노트북을 지참해야 하며, 강의와 실습을 병행해 워크플로우를 구축합니다.",
  },
];