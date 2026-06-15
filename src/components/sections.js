import {
  curriculumDays,
  curriculumTools,
  faqItems,
  galleryItems,
  outcomeCards,
  outcomeTags,
  programInfo,
  solutionFeatures,
} from "../data/siteContent.js?v=20260615c";
import { externalApplyLink, featureCard, sectionHeading } from "./shared.js?v=20260615c";

const chipList = (items, className) => `<div class="${className}">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;

export const heroSection = () => `
  <section class="hero section-dark">
    <div class="container hero-inner">
      <div class="hero-copy-wrap">
        <div class="hero-badge"><span></span>Invest AX · 투자 리서치 자동화 과정</div>
        <h1>
          AI와 함께 투자하는<br />
          <em>나만의 자동화<br />
          시스템</em>을 구축하세요
        </h1>
        <div class="trust-box">
          <p class="trust-muted">
            뉴스, 공시, 재무 데이터, AI 리포트 생성을 하나의 흐름으로 연결합니다.
            오프라인 실습을 통해 나만의 분석 루틴을 구축해보세요.
          </p>
          <strong>감과 직관을 넘어, <span>반복 가능한 데이터 기반 의사결정</span></strong>
        </div>
      <div class="button-row">
          ${externalApplyLink("button primary", "1기 신청하기", "hero_primary")}
          <a
            class="button secondary"
            href="#curriculum"
            data-analytics-event="view_curriculum"
            data-analytics-label="hero_secondary"
          >커리큘럼 확인하기</a>
        </div>
      </div>
      <div class="hero-visual hero-video-card">
        <video class="hero-video" src="assets/research-flow-preview.mp4" autoplay muted loop playsinline preload="metadata" aria-label="투자 리서치 자동화 과정 미리보기"></video>
      </div>
    </div>
  </section>
`;

export const problemSection = () => `
  <section class="problem section-dark" aria-labelledby="problem-title">
    <div class="container">
      <div class="problem-compact">
        <div class="problem-visual">
          <img src="assets/problem-workflow-preview.png" alt="실시간 시세 및 기술적 지표, 지표 계산, 뉴스 리서치 수집, AI 리포트 발송 워크플로우 미리보기" />
        </div>
        <div class="problem-copy">
          <p class="eyebrow">PROBLEM</p>
          <h2 id="problem-title">정보는 많지만,<br />판단 기준은 쉽게 흔들립니다</h2>
          <p>
            뉴스, 공시, 차트, 재무 데이터는 매일 쏟아집니다. 문제는 정보를 모으는 일이 아니라, 일관된 기준으로 정리하고 판단까지 연결하는 일입니다.
          </p>
          <div class="quote-stack" aria-label="개인 투자자의 고민">
            <span>뉴스는 많은데, 뭘 봐야 하지?</span>
            <span>공시를 봐도 판단으로 연결하기 어렵다</span>
            <span>기준이 없으니 매번 판단이 달라진다</span>
          </div>
          <div class="mini-compare" aria-label="Before and After">
            <div><strong>Before</strong><p>뉴스, 공시, 차트를 따로 확인하고 분석 기준이 매번 달라집니다.</p></div>
            <div><strong>After</strong><p>데이터 수집, AI 리포트, 체크리스트를 하나의 흐름으로 연결합니다.</p></div>
          </div>
          <p class="problem-conclusion">이 과정은 종목을 알려주는 대신, 반복 가능한 투자 분석 체계를 만듭니다.</p>
        </div>
      </div>
    </div>
  </section>
`;

export const solutionSection = () => `
  <section class="solution section-navy">
    <div class="container">
      ${sectionHeading({ title: "이룸터가 제안하는 <br class=\"mobile-break\" /><em>투자 학습 방식</em>" })}
      <div class="feature-grid three">
        ${solutionFeatures.map(featureCard).join("")}
      </div>
      <p class="statement">
        종목을 대신 골라주는 것이 아니라,<br />
        <span>스스로 분석할 수 있는 구조</span>를 만듭니다.
      </p>
    </div>
  </section>
`;

export const programSection = () => `
  <section id="program" class="program section-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "PROGRAM INFO",
        title: "과정 기본 정보"
      })}
      <div class="info-grid">
        ${programInfo.map((item) => `
          <article class="info-card">
            <span>${item.label}</span>
            <div class="info-values">
              ${item.values.map((value) => `<strong>${value}</strong>`).join("")}
            </div>
            <small>${item.note}</small>
          </article>
        `).join("")}
      </div>
      <div class="wide-box">
        <ul class="program-note-list">
          <li>강의료, 교재비, 교육장 대관료가 포함된 금액입니다.</li>
          <li><span>준비물 :</span> <strong>노트북 및 API 호출이 가능한 AI 서비스 계정</strong></li>
        </ul>
      </div>
    </div>
  </section>
`;

export const curriculumSection = () => `
  <section id="curriculum" class="curriculum section-dark">
    <div class="container">
      ${sectionHeading({
        title: "4일 동안 완성하는<br />투자 리서치 자동화 실습",
        description: "OHLCV 데이터 수집, 뉴스·리서치 RAG, AI 종합 의견, 백테스팅까지 하나의 분석 흐름으로 실습합니다.",
      })}
      
      <div class="day-list">
        ${curriculumDays.map((day) => `
          <div class="day-item">
            <div class="day-meta-row">
              <span class="day-meta${day.variant === "mint" ? " mint" : ""}">${day.day}</span>
              <span class="day-keywords" aria-label="${day.day} 핵심 키워드">
                ${day.flowKeywords.map((keyword) => `<span class="day-keyword">${keyword}</span>`).join("")}
              </span>
            </div>
            <article class="day-card">
              <div class="day-main">
                <div class="day-head">
                  <h3>${day.title}</h3>
                </div>
                <div class="day-copy">
                  <p>${day.description}</p>
                </div>
              </div>
            </article>
          </div>
        `).join("")}
      </div>
    </div>
  </section>
`;

export const outcomesSection = () => `
  <section id="outcomes" class="outcomes section-navy">
    <div class="container">
      ${sectionHeading({
        title: "교육 후 무엇이 남나요?",
        description: "강의를 듣고 끝나는 것이 아니라, 실제로 실행할 수 있는 리서치 자동화 흐름을 완성합니다.",
      })}
      <div class="outcome-showcase">
        <div class="result-box">
          <h3>투자 리서치 자동화 워크플로우</h3>
          <p>데이터 수집, 분석, AI 리포트 생성, 정기 실행을 하나의 워크플로우로 연결합니다.</p>
          <ul class="outcome-list">
            ${outcomeCards.map((card) => `<li><strong>${card.title}</strong><p>${card.description}</p></li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

export const audienceSection = () => `
  <section id="audience" class="audience section-dark">
    <div class="container">
      ${sectionHeading({
        title: "오프라인 교육 운영 경험을 바탕으로 진행합니다",
        description: "이룸터는 세미나, 네트워킹, 실무 교육 프로그램을 운영해온 경험을 바탕으로 현장 중심의 학습을 설계합니다.",
      })}
      ${chipList(["오프라인 실전 강의 운영", "실습 중심 프로그램 진행", "교육 이후 네트워킹 경험 제공"], "badge-row")}
      <div class="experience-media">
        <p class="audience-gallery-note">강의, 실습, 네트워킹이 함께 이루어지는 현장형 교육입니다.</p>
        <div class="experience-gallery" aria-label="이룸터 오프라인 교육 현장 갤러리">
          ${galleryItems.map((item) => `
            <figure class="gallery-card">
              <img src="${item.src}" alt="${item.alt}" loading="lazy" />
              <figcaption>${item.caption}</figcaption>
            </figure>
          `).join("")}
        </div>
      </div>
    </div>
  </section>
`;

export const faqSection = () => `
  <section class="faq section-navy">
    <div class="container narrow">
      ${sectionHeading({ title: "자주 묻는 질문" })}
      <div class="faq-list">
        ${faqItems.map((item) => `
          <details>
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
          </details>
        `).join("")}
      </div>
      <div class="disclaimer">
        <strong>유의사항</strong>
        <p>
          본 프로그램은 투자 자문이나 수익 보장을 제공하지 않습니다.<br />
          투자 의사결정과 그에 따른 결과는 전적으로 본인의 책임입니다.
        </p>
      </div>
    </div>
  </section>
`;

export const finalCtaSection = () => `
  <section id="apply" class="final-cta section-dark">
    <div class="container narrow">
      <h2>나만의 투자 리서치 루틴을<br />직접 구축해보세요</h2>
      <p>
        데이터 수집부터 AI 리포트, 자동화 워크플로우까지 오프라인 실습으로 완성합니다.
      </p>
      ${externalApplyLink("button primary", "1기 신청하기", "final_cta")}
    </div>
  </section>
`;

export const pageSections = () => [
  heroSection(),
  problemSection(),
  solutionSection(),
  programSection(),
  curriculumSection(),
  outcomesSection(),
  audienceSection(),
  faqSection(),
  finalCtaSection(),
].join("");
