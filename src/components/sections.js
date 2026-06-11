import {
  APPLY_URL,
  curriculumDays,
  curriculumTools,
  faqItems,
  galleryItems,
  outcomeCards,
  outcomeTags,
  programInfo,
  solutionFeatures,
} from "../data/siteContent.js";
import { externalApplyLink, featureCard, sectionHeading, systemPreview } from "./shared.js";

const chipList = (items, className) => `<div class="${className}">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;

export const heroSection = () => `
  <section class="hero section-dark">
    <div class="container hero-inner">
      <div class="hero-copy-wrap">
        <p class="program-label">주식 투자 AX 자동화 시스템 구축 과정</p>
        <div class="hero-badge"><span></span>종목 추천이 아닌, 투자 분석 프로세스를 만드는 교육</div>
        <h1>
          AI와 함께 투자하는<br />
          <em>나만의 리서치 시스템</em>을 구축하세요.
        </h1>
        <p class="hero-copy">
          뉴스, 공시, 재무 데이터, AI 리포트 생성까지 연결되는 투자 분석 루틴을
          오프라인 실습으로 직접 만들어봅니다.
        </p>
        <div class="trust-box">
          감과 직관이 아닌, <span>반복 가능한 데이터 기반 루틴</span>
        </div>
        <div class="button-row">
          <a class="button primary" href="${APPLY_URL}" target="_blank" rel="noopener noreferrer">1기 신청하기 <span aria-hidden="true">→</span></a>
          <a class="button secondary" href="#curriculum">커리큘럼 확인하기</a>
        </div>
      </div>
      ${systemPreview({
        className: "hero-visual",
        panels: [
          { title: "Research Flow", lines: [1, 2, 3], large: true },
          { title: "News", lines: [1, 2] },
          { title: "Disclosure", lines: [1, 2] },
          { title: "AI Report", lines: [], chart: true },
        ],
        footerLabels: ["DATA", "AI", "AUTOMATION"],
      })}
    </div>
  </section>
`;

export const problemSection = () => `
  <section class="problem section-dark" aria-labelledby="problem-title">
    <div class="container">
      <div class="problem-compact">
        <div class="problem-visual dashboard-illustration" aria-hidden="true">
          <div class="dash-window dash-news"><span>NEWS</span><i></i><i></i><i></i></div>
          <div class="dash-window dash-chart"><span>CHART</span><b></b></div>
          <div class="dash-window dash-report"><span>DISCLOSURE</span><i></i><i></i></div>
          <div class="dash-person"><span></span><b></b></div>
        </div>
        <div class="problem-copy">
          <p class="eyebrow">PROBLEM</p>
          <h2 id="problem-title">정보는 많은데,<br />판단은 여전히 어렵습니다</h2>
          <p>
            뉴스, 공시, 차트, 재무 데이터는 매일 쏟아집니다. 하지만 이를 일관된 기준으로 정리하고 판단으로 연결하는 일은 여전히 어렵습니다.
          </p>
          <div class="quote-stack" aria-label="개인 투자자의 고민">
            <span>뉴스는 많은데, 뭘 봐야 하지?</span>
            <span>공시를 봐도 투자 판단으로 연결이 안 돼...</span>
            <span>내 기준이 없으니 매번 판단이 달라진다</span>
          </div>
          <div class="mini-compare" aria-label="Before and After">
            <div><strong>Before</strong><p>뉴스·공시·차트를 따로 확인하고, 분석 기준이 매번 달라집니다.</p></div>
            <div><strong>After</strong><p>데이터 수집 루틴과 AI 리포트, 개인별 체크리스트를 연결합니다.</p></div>
          </div>
          <p class="problem-conclusion">그래서 이 과정은 종목을 알려주는 대신, 반복 가능한 투자 분석 루틴을 만듭니다.</p>
        </div>
      </div>
    </div>
  </section>
`;

export const solutionSection = () => `
  <section class="solution section-navy">
    <div class="container">
      ${sectionHeading({ title: "이룸터가 제안하는 새로운 투자 학습 방식" })}
      <div class="feature-grid three">
        ${solutionFeatures.map(featureCard).join("")}
      </div>
      <p class="statement">
        투자 종목을 골라주는 것이 아니라,<br />
        <span>분석 과정을 직접 구축하는 방식</span>을 교육합니다.
      </p>
    </div>
  </section>
`;

export const programSection = () => `
  <section id="program" class="program section-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "PROGRAM INFO",
        title: "과정 기본 정보",
        description: "주식 투자 AX 자동화 시스템 구축 과정의 핵심 정보를 한눈에 정리했습니다.",
      })}
      <div class="info-grid">
        ${programInfo.map((item) => `
          <article class="info-card">
            <span>${item.label}</span>
            ${item.values.map((value) => `<strong>${value}</strong>`).join("")}
            <small>${item.note}</small>
          </article>
        `).join("")}
      </div>
      <div class="wide-box">
        <div>
          <h3>포함 내역</h3>
          <p>강의료 및 교재비, 대관료 등이 포함된 비용입니다.</p>
        </div>
        <div class="prep-box"><span>준비물</span><strong>노트북 및 API 호출이 가능한 AI 서비스 계정</strong></div>
      </div>
    </div>
  </section>
`;

export const curriculumSection = () => `
  <section id="curriculum" class="curriculum section-dark">
    <div class="container">
      ${sectionHeading({
        title: "4일 만에 완성하는<br />투자 AX 자동화 실전 커리큘럼",
        description: "OHLCV 데이터 수집부터 뉴스·리서치 RAG, AI 종합 판단, 백테스팅까지 4일 동안 하나의 투자 리서치 자동화 흐름을 압축해 실습합니다.",
      })}
      ${chipList(["6월 20일 · 21일 · 27일 · 28일", "회차별 5시간 · 총 20시간", "오프라인 실습형 교육"], "badge-row")}
      <div class="day-list">
        ${curriculumDays.map((day) => `
          <article class="day-card">
            <div class="day-meta${day.variant === "mint" ? " mint" : ""}">${day.day}</div>
            <div class="day-main">
              <div class="day-head">
                <span class="icon-chip${day.variant === "mint" ? " mint" : ""}">${day.index}</span>
                <h3>${day.title}</h3>
              </div>
              <div class="day-copy">
                <p>${day.description}</p>
              </div>
              <aside class="day-outcome">${day.outcome}</aside>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="curriculum-flow" aria-label="커리큘럼 흐름">
        <span>수집</span><i aria-hidden="true">→</i><span>분석</span><i aria-hidden="true">→</i><span>종합 판단</span><i aria-hidden="true">→</i><span>검증</span>
      </div>
      ${chipList(curriculumTools, "curriculum-tools")}
    </div>
  </section>
`;

export const outcomesSection = () => `
  <section id="outcomes" class="outcomes section-navy">
    <div class="container">
      ${sectionHeading({
        title: "교육이 끝나면 무엇이 남나요?",
        description: "강의를 듣고 끝나는 것이 아니라, 직접 실행 가능한 리서치 자동화 흐름을 완성합니다.",
      })}
      <div class="outcome-showcase">
        <div class="result-box">
          <span>핵심 결과물</span>
          <h3>나만의 투자 리서치 자동화 시스템</h3>
          <p>데이터 수집, 분석, AI 리포트 생성, 자동화 실행 흐름을 하나의 워크플로우로 연결합니다.</p>
        </div>
        ${systemPreview({
          className: "outcome-visual",
          compact: true,
          panels: [
            { title: "Workflow", lines: [1, 2], large: true },
            { title: "Data", lines: [1] },
            { title: "Report", lines: [], chart: true },
          ],
        })}
      </div>
      <div class="feature-grid four outcome-core">
        ${outcomeCards.map((card) => featureCard({ ...card, small: true })).join("")}
      </div>
      ${chipList(outcomeTags, "tag-cloud")}
    </div>
  </section>
`;

export const audienceSection = () => `
  <section id="audience" class="audience section-dark">
    <div class="container">
      ${sectionHeading({
        title: "실제 오프라인 교육 운영 경험을 바탕으로 진행합니다",
        description: "이룸터는 세미나, 네트워킹, 실무 교육 프로그램을 직접 운영해온 경험을 바탕으로 현장에서 함께 만들고 적용하는 교육을 지향합니다.",
      })}
      ${chipList(["오프라인 실전 강의 운영", "실습 중심 프로그램 진행", "교육 이후 네트워킹 경험 제공"], "badge-row")}
      <div class="experience-media">
        <p class="audience-gallery-note">강의, 실습, 네트워킹이 함께 이루어지는 현장형 교육으로 운영됩니다.</p>
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
      ${sectionHeading({ title: "수강 대상 / 자주 묻는 질문" })}
      ${chipList(["리서치 정리 시간이 오래 걸리는 분", "AI와 자동화 루틴을 직접 만들고 싶은 분", "오프라인 실습으로 끝까지 구축해보고 싶은 분"], "fit-strip")}
      <div class="faq-list">
        ${faqItems.map((item) => `
          <details>
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
          </details>
        `).join("")}
      </div>
      <div class="disclaimer">
        본 프로그램은 투자 자문이나 수익 보장을 제공하지 않습니다.<br />
        투자 의사결정과 그에 따른 결과는 전적으로 본인의 책임입니다.
      </div>
    </div>
  </section>
`;

export const finalCtaSection = () => `
  <section id="apply" class="final-cta section-dark">
    <div class="container narrow">
      <h2>나만의 투자 리서치 루틴을<br />직접 구축해보세요</h2>
      <p>
        데이터 수집부터 AI 리포트, 자동화 워크플로우까지 오프라인 실습으로 경험합니다.
      </p>
      ${externalApplyLink("button primary", '1기 신청하기 <span aria-hidden="true">→</span>')}
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
