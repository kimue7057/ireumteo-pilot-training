export const programFilters = [
  { id: "all", label: "전체" },
  { id: "open", label: "모집중" },
  { id: "upcoming", label: "모집예정" },
  { id: "business", label: "기업교육" },
];

export const programs = [
  {
    id: "invest-ai-seminar",
    slug: "invest-ai-seminar",
    path: "/programs/invest-ai-seminar",
    title: "AI 투자 리서치 자동화 입문 세미나",
    shortTitle: "투자 리서치 입문 세미나",
    type: "seminar",
    typeLabel: "세미나",
    status: "open",
    statusLabel: "모집중",
    filterGroup: "open",
    audience: "투자 정보를 체계적으로 정리하고 싶은 입문자",
    duration: "2시간",
    format: "오프라인",
    fee: "1만원",
    capacity: "선착순 20명",
    cardDescription:
      "ChatGPT와 자동화 도구를 활용해 주식 뉴스, 지표, 리포트를 자동 정리하는 방법을 2시간 세미나에서 확인합니다.",
    summary:
      "AI와 자동화 도구를 활용해 매일 반복되는 투자 정보 수집과 리포트 정리를 어떻게 자동화할 수 있는지 보여주는 입문 세미나입니다.",
    note: "종목 추천이 아니라, 투자 판단에 필요한 정보를 스스로 수집하고 정리하는 리서치 루틴을 만드는 데 초점을 둡니다.",
    homeFeatured: true,
    detail: {
      heroTitle: "AI로 주식 뉴스와 지표를 자동 정리하는 방법",
      heroSubtitle:
        "ChatGPT와 자동화 도구를 활용해 매일 반복되는 투자 정보 수집과 리포트 정리를 자동화하는 흐름을 2시간 세미나에서 직접 보여드립니다.",
      heroNotice:
        "종목 추천이 아닙니다. 수익 보장 강의도 아닙니다. 투자 판단에 필요한 정보를 스스로 수집하고 정리하는 나만의 리서치 루틴을 만드는 방법입니다.",
      recommendedFor: [
        "매일 주식 뉴스와 공시를 찾아보지만 정리가 안 되는 분",
        "유튜브, 리딩방, 커뮤니티 정보에 의존하는 투자가 불안한 분",
        "ChatGPT를 투자 리서치에 어떻게 써야 할지 모르겠는 분",
        "나만의 투자 체크리스트와 리포트 루틴을 만들고 싶은 분",
        "자동매매보다 먼저, 투자 정보를 체계적으로 정리하고 싶은 분",
      ],
      showcaseItems: [
        {
          title: "뉴스 자동 수집",
          description: "관심 종목 관련 뉴스를 자동으로 모으는 흐름을 보여드립니다.",
        },
        {
          title: "지표 확인",
          description: "RSI, 이동평균, MACD 등 주요 지표를 보는 기본 방식을 정리합니다.",
        },
        {
          title: "AI 요약",
          description: "수집한 정보를 ChatGPT로 요약하고 분석하는 실전 패턴을 소개합니다.",
        },
        {
          title: "리포트 자동화",
          description: "매일 반복 가능한 투자 리포트 구조를 어떻게 설계하는지 보여드립니다.",
        },
        {
          title: "본 과정 로드맵",
          description: "실제 자동화 시스템을 완성하는 심화 과정까지 단계별로 안내합니다.",
        },
      ],
      scheduleCards: [
        { label: "진행 방식", value: "오프라인", note: "서울 강남권 예정" },
        { label: "진행 시간", value: "2시간", note: "데모와 질의응답 포함" },
        { label: "참가비", value: "1만원", note: "사전 신청 기준" },
        { label: "모집 인원", value: "선착순 20명", note: "모집 상황에 따라 마감" },
      ],
      instructorTitle: "이룸터 AX 교육팀",
      instructorDescription:
        "이룸터는 AI 자동화 교육과 투자 리서치 실습 프로그램을 운영하며, 입문자도 흐름을 이해할 수 있는 현장형 커리큘럼을 설계합니다.",
      perks: [
        "세미나 이후 심화 과정 우선 안내",
        "실습 흐름을 정리한 안내 자료 제공",
        "본 과정 적합도 판단을 위한 Q&A 진행",
      ],
      faqItems: [
        {
          question: "종목을 추천해주나요?",
          answer:
            "아닙니다. 본 세미나는 특정 종목 추천이나 투자 자문을 제공하지 않습니다. 투자 정보를 수집하고 정리하는 자동화 방법을 다룹니다.",
        },
        {
          question: "자동매매를 배우는 건가요?",
          answer:
            "아닙니다. 자동매매보다 먼저 필요한 투자 리서치 자동화와 정보 정리 루틴을 다룹니다.",
        },
        {
          question: "초보자도 들을 수 있나요?",
          answer:
            "가능합니다. 주식이나 AI를 깊이 몰라도 전체 흐름을 이해할 수 있도록 입문 세미나 형태로 진행합니다.",
        },
        {
          question: "세미나 후 무엇을 할 수 있나요?",
          answer:
            "AI를 활용해 투자 정보를 수집하고 정리하는 전체 구조를 이해하고, 심화 과정 참여 여부를 판단할 수 있습니다.",
        },
      ],
    },
    applyContext: {
      programId: "invest-ai-seminar",
      programTitle: "AI 투자 리서치 자동화 입문 세미나",
      programType: "seminar",
      sourcePage: "/programs/invest-ai-seminar",
      eyebrow: "OPEN SEMINAR",
      description: "세미나 신청 정보를 남겨주시면 운영팀이 일정과 안내 사항을 순차적으로 전달드립니다.",
      meta: ["참가비 1만원", "선착순 20명", "오프라인 진행"],
      submitLabel: "세미나 신청하기",
      requiresInvestmentLevel: true,
      cohort: "세미나",
    },
    actions: {
      primary: { kind: "route", label: "자세히 보기", path: "/programs/invest-ai-seminar" },
      secondary: { kind: "apply", label: "신청하기" },
    },
  },
  {
    id: "invest-ax-course",
    slug: "invest-ax-course",
    path: "/programs/invest-ax-course",
    title: "주식 투자 AX 자동화 실전 과정",
    shortTitle: "Invest AX 실전 과정",
    type: "course",
    typeLabel: "심화 과정",
    status: "upcoming",
    statusLabel: "모집 예정",
    filterGroup: "upcoming",
    audience: "투자 리서치 자동화를 직접 구축하고 싶은 실전형 학습자",
    duration: "총 20시간",
    format: "오프라인",
    fee: "800,000원",
    capacity: "15명 한정",
    cardDescription:
      "뉴스 수집, 지표 계산, AI 리포트 생성, 자동화 워크플로우 구축까지 직접 실습하는 20시간 심화 과정입니다.",
    summary:
      "기존 Invest AX 랜딩의 핵심 콘텐츠를 유지한 심화 과정입니다. 데이터 수집부터 AI 리포트, 백테스팅까지 실제 자동화 구조를 직접 구축합니다.",
    note: "세미나 이후 심화 과정 또는 다음 기수 모집 예정 과정으로 안내됩니다.",
    homeFeatured: true,
    detail: {
      heroTitle: "AI와 함께 투자하는 나만의 자동화 시스템을 구축하세요",
      heroSubtitle:
        "뉴스, 공시, 재무 데이터, AI 리포트 생성을 하나의 흐름으로 연결합니다. 오프라인 실습을 통해 나만의 분석 루틴을 구축하는 4일 집중 과정입니다.",
      heroNotice:
        "이 과정은 종목을 대신 추천하는 강의가 아니라, 반복 가능한 데이터 기반 투자 리서치 체계를 직접 만드는 실전형 프로그램입니다.",
      solutionFeatures: [
        {
          chip: "DATA",
          title: "데이터 수집",
          description: "뉴스, 공시, 재무제표, 시세 데이터를 한 흐름으로 정리합니다.",
        },
        {
          chip: "FIN",
          title: "금융 해석",
          description: "기업 분석과 주요 지표를 투자 판단의 언어로 연결합니다.",
        },
        {
          chip: "AI",
          title: "AI 자동화",
          description: "요약, 비교, 리포트 생성을 자동화해 반복 업무를 줄입니다.",
        },
      ],
      scheduleCards: [
        { label: "교육 일정", value: "7월 4일 · 5일", note: "7월 11일 · 12일 / 매주 토·일" },
        { label: "교육 시간", value: "오후 1시 - 6시", note: "회차별 5시간 / 총 20시간" },
        { label: "교육 장소", value: "강남역 부근", note: "세부 장소 추후 공지" },
        { label: "수강료", value: "800,000원", note: "1기 선착순 20% 할인 / 15명 한정" },
      ],
      noteList: [
        "강의자료, 교재비, 교육 운영비가 포함된 금액입니다.",
        "준비물: 노트북 및 API 호출이 가능한 AI 서비스 계정",
      ],
      curriculumDays: [
        {
          day: "DAY 01",
          title: "OHLCV 수집과 지표 분석",
          description: "관심 종목의 시세 데이터를 수집하고 RSI, EMA, MACD 등 핵심 지표를 계산합니다.",
          keywords: ["데이터", "지표"],
        },
        {
          day: "DAY 02",
          title: "뉴스·리서치 RAG 분석",
          description: "뉴스와 리서치 자료를 수집·요약하고, 근거 기반 질의응답 구조를 만듭니다.",
          keywords: ["뉴스", "RAG"],
        },
        {
          day: "DAY 03",
          title: "AI 투자 판단과 모의 검증",
          description: "기술 지표와 리서치 결과를 통합해 AI 의견을 생성하고 모의 검증과 연결합니다.",
          keywords: ["종합 판단", "검증"],
        },
        {
          day: "DAY 04",
          title: "백테스팅과 전략 검증",
          description: "과거 데이터로 전략을 검증하고, 가치투자 지표를 활용해 판단 기준을 정리합니다.",
          keywords: ["전략", "분석"],
        },
      ],
      outcomeCards: [
        {
          title: "리서치 워크플로우",
          description: "관심 종목을 분석하는 과정을 단계별 루틴으로 정리합니다.",
        },
        {
          title: "데이터 수집 구조",
          description: "시세, 뉴스, 시장 지표를 반복 수집할 수 있게 구성합니다.",
        },
        {
          title: "AI 리포트 생성",
          description: "수집 데이터를 바탕으로 핵심 이슈와 리스크를 요약합니다.",
        },
        {
          title: "n8n 자동화 흐름",
          description: "수집부터 리포트 생성까지 정기 실행 구조로 연결합니다.",
        },
      ],
      galleryItems: [
        { src: "assets/offline-education-1.svg", alt: "이룸터 오프라인 교육 현장 1", caption: "오프라인 강의" },
        { src: "assets/offline-education-2.svg", alt: "이룸터 오프라인 교육 현장 2", caption: "네트워킹 세션" },
        { src: "assets/offline-education-3.svg", alt: "이룸터 실습형 교육 프로그램 현장", caption: "실습형 프로그램" },
        { src: "assets/offline-seminar.jpg", alt: "이룸터 오프라인 세미나 현장", caption: "오프라인 세미나" },
      ],
      faqItems: [
        {
          question: "투자 초보자도 참여할 수 있나요?",
          answer:
            "네, 가능합니다. 투자 경험보다 체계적인 분석 방법을 배우려는 의지가 더 중요합니다. 기본적인 주식 투자 개념을 알고 있다면 더 수월하게 따라올 수 있습니다.",
        },
        {
          question: "자동매매를 배우는 과정인가요?",
          answer:
            "아닙니다. 이 과정은 자동매매가 아니라 투자 리서치 자동화에 초점을 맞춥니다. 데이터 수집, 분석, 리포트 생성처럼 반복되는 업무를 줄이는 것이 목표입니다.",
        },
        {
          question: "종목 추천을 해주나요?",
          answer:
            "아닙니다. 특정 종목을 추천하지 않습니다. 대신 데이터를 정리하고, 스스로 투자 판단을 내릴 수 있는 분석 체계를 만드는 방법을 다룹니다.",
        },
        {
          question: "AI나 자동화 도구를 처음 접해도 가능한가요?",
          answer:
            "네, 가능합니다. 수업에서 필요한 AI 도구와 자동화 플랫폼 사용법을 단계별로 안내합니다. 기본적인 컴퓨터 활용 능력은 필요합니다.",
        },
        {
          question: "교육 후 어떤 결과물을 얻게 되나요?",
          answer:
            "교육 후에는 본인만의 투자 리서치 워크플로우를 갖게 됩니다. 뉴스 수집, 재무제표 분석, AI 요약, 자동 리포트 생성 흐름이 포함됩니다.",
        },
        {
          question: "오프라인 교육은 어떻게 진행되나요?",
          answer:
            "강남역 부근에서 총 20시간 동안 실습 중심으로 진행됩니다. 개인 노트북을 지참해야 하며, 강의와 실습을 병행해 워크플로우를 구축합니다.",
        },
      ],
      disclaimer:
        "본 프로그램은 투자 자문이나 수익 보장을 제공하지 않습니다. 투자 의사결정과 그에 따른 결과는 전적으로 본인의 책임입니다.",
    },
    applyContext: {
      programId: "invest-ax-course",
      programTitle: "주식 투자 AX 자동화 실전 과정",
      programType: "course",
      sourcePage: "/programs/invest-ax-course",
      eyebrow: "UPCOMING COURSE",
      description: "다음 모집 소식을 가장 먼저 받아보실 수 있도록 알림 신청을 남겨 주세요.",
      meta: ["총 20시간", "모집 예정", "오프라인 심화 과정"],
      submitLabel: "알림 받기",
      requiresInvestmentLevel: true,
      cohort: "1기",
    },
    actions: {
      primary: { kind: "route", label: "자세히 보기", path: "/programs/invest-ax-course" },
      secondary: { kind: "apply", label: "알림 받기" },
    },
  },
  {
    id: "ai-workflow-course",
    slug: null,
    path: "/programs",
    title: "AI 업무 자동화 실전 과정",
    shortTitle: "AI 업무 자동화 과정",
    type: "course",
    typeLabel: "실전 과정",
    status: "soon",
    statusLabel: "준비중",
    filterGroup: "upcoming",
    audience: "반복 업무를 줄이고 싶은 실무자와 팀 리더",
    duration: "준비중",
    format: "오프라인 / 워크숍형",
    fee: "추후 안내",
    capacity: "사전 알림 접수",
    cardDescription:
      "반복되는 자료 조사, 문서 작성, 보고 업무를 AI 에이전트와 자동화 도구로 줄이는 실전 과정입니다.",
    summary:
      "업무 자동화, 문서 작성, 보고 루틴 개선에 초점을 둔 실전형 과정으로 준비 중입니다.",
    note: "세부 커리큘럼과 일정은 준비 중이며, 알림 신청자에게 우선 안내합니다.",
    homeFeatured: true,
    applyContext: {
      programId: "ai-workflow-course",
      programTitle: "AI 업무 자동화 실전 과정",
      programType: "course",
      sourcePage: "/programs",
      eyebrow: "COURSE WAITLIST",
      description: "과정 오픈 소식을 받으실 수 있도록 알림 신청을 남겨 주세요.",
      meta: ["준비중", "업무 자동화 중심", "알림 접수"],
      submitLabel: "알림 받기",
      requiresInvestmentLevel: false,
      cohort: "대기자",
    },
    actions: {
      primary: { kind: "apply", label: "알림 받기" },
      secondary: null,
    },
  },
  {
    id: "business-consulting",
    slug: null,
    path: "/business",
    title: "기업 맞춤형 AX 교육·컨설팅",
    shortTitle: "기업교육·컨설팅",
    type: "business",
    typeLabel: "기업교육",
    status: "business",
    statusLabel: "상시 문의",
    filterGroup: "business",
    audience: "조직 단위 AI 도입과 프로세스 개선이 필요한 기업",
    duration: "맞춤 설계",
    format: "오프라인 / 온라인 가능",
    fee: "문의 후 제안",
    capacity: "상시 문의",
    cardDescription:
      "조직의 업무 프로세스를 분석하고 AI 자동화 도입 구조를 설계하는 맞춤형 교육·컨설팅입니다.",
    summary:
      "직무별 실무 흐름을 진단하고, 교육과 컨설팅을 결합해 조직 맞춤형 AX 실행 계획을 제안합니다.",
    note: "문의 접수 후 목표와 규모에 맞춘 제안 형태로 진행합니다.",
    homeFeatured: true,
    applyContext: {
      programId: "business-consulting",
      programTitle: "기업 맞춤형 AX 교육·컨설팅",
      programType: "business",
      sourcePage: "/business",
      eyebrow: "BUSINESS INQUIRY",
      description: "조직 상황과 목표를 남겨주시면 맞춤형 교육·컨설팅 제안 방향을 검토해 회신드립니다.",
      meta: ["상시 문의", "맞춤형 제안", "조직 단위 도입"],
      submitLabel: "문의 남기기",
      requiresInvestmentLevel: false,
      cohort: "기업 문의",
    },
    actions: {
      primary: { kind: "route", label: "문의하기", path: "/business" },
      secondary: null,
    },
  },
];

export const featuredPrograms = programs.filter((program) => program.homeFeatured);

export const getProgramBySlug = (slug) =>
  programs.find((program) => program.slug === slug) || null;

export const getProgramByPath = (path) =>
  programs.find((program) => program.path === path && program.slug) || null;
