import {
  businessFaqItems,
  businessOfferCards,
  businessProcessSteps,
  contactCards,
  contactFaqItems,
  homeApplicationFields,
  homeMethodSteps,
  homeProblemCards,
  reviewGalleryItems,
  reviewQuotes,
  reviewStoryCards,
} from "../data/siteContent.js";
import { featuredPrograms, getProgramByPath, programs, programFilters } from "../data/programs.js";
import { DEFAULT_APPLY_CONTEXT } from "../lib/applyForm.js";
import { applyTriggerButton, routeLink, sectionHeading } from "./shared.js";

const renderProgramActions = (program, scope = "card") => {
  const primaryStyle = program.actions?.secondary ? "secondary" : "primary";

  const renderAction = (action, style, index) => {
    if (!action) {
      return "";
    }

    const analyticsLabel = `${scope}_${program.id}_${index}`;

    if (action.kind === "apply") {
      return applyTriggerButton({
        className: `button ${style}`,
        label: action.label,
        analyticsLabel,
        context: program.applyContext,
      });
    }

    return routeLink({
      path: action.path,
      label: action.label,
      className: `button ${style}`,
      analyticsEvent: "navigate_route",
      analyticsLabel,
    });
  };

  return `
    <div class="program-card-actions">
      ${renderAction(program.actions?.primary, primaryStyle, "primary")}
      ${renderAction(program.actions?.secondary, "primary", "secondary")}
    </div>
  `;
};

const renderProgramCard = (program) => `
  <article class="program-card surface-card" data-program-card data-filter-group="${program.filterGroup}">
    <div class="program-card-top">
      <span class="status-pill status-${program.filterGroup}">${program.statusLabel}</span>
      <span class="program-card-type">${program.typeLabel}</span>
    </div>
    <h3>${program.title}</h3>
    <p class="program-card-copy">${program.cardDescription}</p>
    <dl class="program-card-facts">
      <div>
        <dt>대상</dt>
        <dd>${program.audience}</dd>
      </div>
      <div>
        <dt>시간</dt>
        <dd>${program.duration}</dd>
      </div>
      <div>
        <dt>방식</dt>
        <dd>${program.format}</dd>
      </div>
      <div>
        <dt>안내</dt>
        <dd>${program.capacity}</dd>
      </div>
    </dl>
    ${renderProgramActions(program)}
  </article>
`;

const renderFaqList = (items) => `
  <div class="detail-faq-list">
    ${items
      .map(
        (item) => `
          <details class="detail-faq-item">
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
          </details>
        `
      )
      .join("")}
  </div>
`;

const renderGallery = (items) => `
  <div class="story-gallery">
    ${items
      .map(
        (item) => `
          <figure class="story-gallery-card">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <figcaption>${item.caption}</figcaption>
          </figure>
        `
      )
      .join("")}
  </div>
`;

const renderHomePage = () => `
  <section class="page-hero page-hero-home">
    <div class="container hero-layout">
      <div class="hero-copy">
        <p class="hero-kicker">ERUMTER AX PLATFORM</p>
        <h1>AI를 배우는 곳이 아니라,<br />내 일에 적용하는 곳.</h1>
        <p class="hero-lede">
          이룸터는 AI 에이전트와 자동화 기술을 업무, 창업, 투자, 마케팅 현장에 적용하는 실전형 AX 교육·컨설팅 플랫폼입니다.
        </p>
        <div class="button-row">
          ${routeLink({
            path: "/programs",
            label: "모집 중인 프로그램 보기",
            className: "button primary",
            analyticsEvent: "navigate_route",
            analyticsLabel: "home_programs",
          })}
          ${routeLink({
            path: "/business",
            label: "기업 교육 문의하기",
            className: "button secondary",
            analyticsEvent: "navigate_route",
            analyticsLabel: "home_business",
          })}
        </div>
      </div>
      <div class="hero-visual-shell">
        <div class="hero-visual-card surface-card">
          <img src="assets/lecture-main.jpg" alt="이룸터의 AX 교육 현장" />
          <div class="hero-signal-grid">
            <div>
              <strong>Education</strong>
              <span>입문 세미나부터 심화 과정까지</span>
            </div>
            <div>
              <strong>Consulting</strong>
              <span>조직 단위 AX 도입 설계</span>
            </div>
            <div>
              <strong>Execution</strong>
              <span>현장 적용 중심의 실습 구조</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page-section page-light" data-scroll-section="problem">
    <div class="container">
      ${sectionHeading({
        eyebrow: "PROBLEM",
        title: "AI 도구는 많아졌지만,<br />실제로 내 일에 적용하는 사람은 많지 않습니다.",
        description: "이룸터는 도구 소개보다 실행 구조에 집중합니다.",
      })}
      <div class="grid-4">
        ${homeProblemCards
          .map(
            (item) => `
              <article class="surface-card info-card-lg">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-navy" data-scroll-section="method">
    <div class="container">
      ${sectionHeading({
        eyebrow: "METHOD",
        title: "교육에서 끝나지 않고,<br />적용과 실행까지 연결합니다.",
        description: "기초 이해부터 적용, 실행, 후속 성장까지 단계적으로 설계합니다.",
      })}
      <div class="grid-4">
        ${homeMethodSteps
          .map(
            (item) => `
              <article class="surface-card method-card">
                <span class="method-chip">${item.chip}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light" data-scroll-section="fields">
    <div class="container">
      ${sectionHeading({
        eyebrow: "FIELD",
        title: "AX는 모든 분야에 적용될 수 있습니다.",
        description: "업무, 창업, 투자, 마케팅, 기업교육까지 각 분야에 맞는 실전형 커리큘럼으로 확장합니다.",
      })}
      <div class="grid-5">
        ${homeApplicationFields
          .map(
            (item) => `
              <article class="surface-card field-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light" data-scroll-section="programs">
    <div class="container">
      ${sectionHeading({
        eyebrow: "PROGRAMS",
        title: "현재 모집 중인 프로그램",
        description: "입문 세미나, 심화 과정, 기업교육까지 목적에 맞는 프로그램을 선택할 수 있습니다.",
      })}
      <div class="program-card-grid">
        ${featuredPrograms.map((program) => renderProgramCard(program)).join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-navy" data-scroll-section="reviews">
    <div class="container">
      ${sectionHeading({
        eyebrow: "STORIES",
        title: "현장 사진과 후기로<br />이룸터의 운영 방식을 보여드립니다.",
        description: "실습, 세미나, 네트워킹이 연결되는 운영 구조를 시각적으로 담아두었습니다.",
      })}
      ${renderGallery(reviewGalleryItems)}
      <div class="grid-3 review-quote-grid">
        ${reviewQuotes
          .map(
            (item) => `
              <article class="surface-card quote-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span>${item.byline}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light" data-scroll-section="business">
    <div class="container cta-panel">
      <div>
        <p class="eyebrow">BUSINESS AX</p>
        <h2>기업교육과 컨설팅도 같은 철학으로 설계합니다.</h2>
        <p>
          조직의 업무 흐름을 이해하고, 교육과 컨설팅을 함께 묶어 실제 도입 가능한 AI 자동화 구조를 제안합니다.
        </p>
      </div>
      <div class="button-row">
        ${routeLink({
          path: "/business",
          label: "기업교육 자세히 보기",
          className: "button primary",
          analyticsEvent: "navigate_route",
          analyticsLabel: "home_business_detail",
        })}
        ${applyTriggerButton({
          className: "button secondary",
          label: "기업 교육 문의하기",
          analyticsLabel: "home_business_apply",
          context: programs.find((program) => program.id === "business-consulting")?.applyContext,
        })}
      </div>
    </div>
  </section>

  <section class="page-section page-dark final-cta-panel">
    <div class="container narrow center-copy">
      <p class="eyebrow">READY TO START</p>
      <h2>배운 것을 바로 실행 구조로 바꾸고 싶다면,<br />지금 이룸터와 연결해보세요.</h2>
      <p>프로그램 탐색부터 기업교육 문의까지, 현재 단계에 맞는 방식으로 시작할 수 있습니다.</p>
      <div class="button-row center">
        ${routeLink({
          path: "/programs",
          label: "프로그램 보기",
          className: "button primary",
          analyticsEvent: "navigate_route",
          analyticsLabel: "home_final_programs",
        })}
        ${routeLink({
          path: "/contact",
          label: "문의 페이지로 이동",
          className: "button secondary",
          analyticsEvent: "navigate_route",
          analyticsLabel: "home_final_contact",
        })}
      </div>
    </div>
  </section>
`;

const renderProgramsPage = () => `
  <section class="page-hero page-hero-inner">
    <div class="container">
      <p class="hero-kicker">PROGRAM DIRECTORY</p>
      <h1>이룸터 프로그램 목록</h1>
      <p class="hero-lede">
        입문 세미나, 심화 과정, 기업교육까지 현재 운영 중이거나 준비 중인 프로그램을 한눈에 볼 수 있습니다.
      </p>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      <div class="program-filter-row" data-program-filters>
        ${programFilters
          .map(
            (filter, index) => `
              <button
                type="button"
                class="program-filter${index === 0 ? " is-active" : ""}"
                data-program-filter="${filter.id}"
              >${filter.label}</button>
            `
          )
          .join("")}
      </div>
      <div class="program-card-grid" data-program-card-grid>
        ${programs.map((program) => renderProgramCard(program)).join("")}
      </div>
    </div>
  </section>
`;

const renderSeminarPage = (program) => `
  <section class="page-hero page-hero-detail">
    <div class="container detail-hero-layout">
      <div class="hero-copy">
        <p class="hero-kicker">${program.typeLabel.toUpperCase()} · ${program.statusLabel}</p>
        <h1>${program.detail.heroTitle}</h1>
        <p class="hero-lede">${program.detail.heroSubtitle}</p>
        <p class="hero-note">${program.detail.heroNotice}</p>
        <div class="button-row">
          ${applyTriggerButton({
            className: "button primary",
            label: "세미나 신청하기",
            analyticsLabel: "seminar_apply_hero",
            context: program.applyContext,
          })}
          ${routeLink({
            path: "/programs",
            label: "전체 프로그램 보기",
            className: "button secondary",
            analyticsEvent: "navigate_route",
            analyticsLabel: "seminar_to_programs",
          })}
        </div>
        <p class="hero-meta-line">참가비 1만원 · 선착순 20명 · 오프라인 진행</p>
      </div>
      <div class="hero-visual-shell">
        <div class="surface-card image-card">
          <img src="assets/offline-seminar.jpg" alt="AI 투자 리서치 자동화 입문 세미나 현장 이미지" />
        </div>
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "WHO IT'S FOR",
        title: "이런 분께 추천합니다",
        description: "입문 단계에서 투자 리서치 자동화의 전체 흐름을 확인하고 싶은 분을 위한 구성입니다.",
      })}
      <div class="grid-2">
        ${program.detail.recommendedFor
          .map(
            (item) => `
              <article class="surface-card checklist-card">
                <span></span>
                <p>${item}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "SEMINAR FLOW",
        title: "세미나에서 보여드리는 것",
        description: "입문 세미나이지만 실제 자동화 흐름이 어떤 식으로 연결되는지 분명하게 보여드립니다.",
      })}
      <div class="grid-5">
        ${program.detail.showcaseItems
          .map(
            (item) => `
              <article class="surface-card field-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "BASIC INFO",
        title: "일정, 장소, 가격",
        description: "신청 전에 핵심 운영 정보를 빠르게 확인할 수 있도록 정리했습니다.",
      })}
      <div class="grid-4">
        ${program.detail.scheduleCards
          .map(
            (item) => `
              <article class="surface-card info-card-lg">
                <span class="info-label">${item.label}</span>
                <h3>${item.value}</h3>
                <p>${item.note}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container split-panel">
      <div class="surface-card copy-card">
        <p class="eyebrow">INSTRUCTOR</p>
        <h2>${program.detail.instructorTitle}</h2>
        <p>${program.detail.instructorDescription}</p>
      </div>
      <div class="surface-card copy-card">
        <p class="eyebrow">ON-SITE BENEFITS</p>
        <h2>현장 참여 혜택</h2>
        <ul class="plain-list">
          ${program.detail.perks.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container narrow">
      ${sectionHeading({
        eyebrow: "FAQ",
        title: "자주 묻는 질문",
        description: "세미나 성격과 참여 기준에 대한 질문을 먼저 정리했습니다.",
      })}
      ${renderFaqList(program.detail.faqItems)}
    </div>
  </section>

  <section class="page-section page-dark final-cta-panel">
    <div class="container narrow center-copy">
      <p class="eyebrow">SEMINAR APPLY</p>
      <h2>입문 세미나로 먼저 흐름을 확인해보세요.</h2>
      <p>세미나 신청 후 운영팀이 일정과 참여 안내를 순차적으로 전달드립니다.</p>
      <div class="button-row center">
        ${applyTriggerButton({
          className: "button primary",
          label: "세미나 신청하기",
          analyticsLabel: "seminar_apply_final",
          context: program.applyContext,
        })}
      </div>
    </div>
  </section>
`;

const renderCoursePage = (program) => `
  <section class="page-hero page-hero-detail">
    <div class="container detail-hero-layout">
      <div class="hero-copy">
        <p class="hero-kicker">${program.typeLabel.toUpperCase()} · ${program.statusLabel}</p>
        <h1>${program.detail.heroTitle}</h1>
        <p class="hero-lede">${program.detail.heroSubtitle}</p>
        <p class="hero-note">${program.detail.heroNotice}</p>
        <div class="button-row">
          ${routeLink({
            path: "/programs/invest-ai-seminar",
            label: "입문 세미나 보기",
            className: "button secondary",
            analyticsEvent: "navigate_route",
            analyticsLabel: "course_to_seminar",
          })}
          ${applyTriggerButton({
            className: "button primary",
            label: "알림 받기",
            analyticsLabel: "course_waitlist_hero",
            context: program.applyContext,
          })}
        </div>
      </div>
      <div class="hero-visual-shell">
        <div class="surface-card media-card">
          <video src="assets/research-flow-preview.mp4" autoplay muted loop playsinline preload="metadata" aria-label="Invest AX 실전 과정 미리보기"></video>
        </div>
      </div>
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "FRAMEWORK",
        title: "이룸터가 제안하는 투자 학습 방식",
        description: "데이터, 금융 해석, AI 자동화를 하나의 흐름으로 연결해 실제 워크플로우로 완성합니다.",
      })}
      <div class="grid-3">
        ${program.detail.solutionFeatures
          .map(
            (item) => `
              <article class="surface-card method-card">
                <span class="method-chip">${item.chip}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "PROGRAM INFO",
        title: "과정 기본 정보",
        description: "기존 Invest AX 랜딩에 담겨 있던 핵심 운영 정보를 상세 페이지로 옮겨두었습니다.",
      })}
      <div class="grid-4">
        ${program.detail.scheduleCards
          .map(
            (item) => `
              <article class="surface-card info-card-lg">
                <span class="info-label">${item.label}</span>
                <h3>${item.value}</h3>
                <p>${item.note}</p>
              </article>
            `
          )
          .join("")}
      </div>
      <div class="surface-card notice-card">
        <ul class="plain-list">
          ${program.detail.noteList.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "CURRICULUM",
        title: "4일 동안 완성하는 투자 리서치 자동화 실습",
        description: "OHLCV 데이터 수집, 뉴스·리서치 RAG, AI 종합 의견, 백테스팅까지 한 흐름으로 실습합니다.",
      })}
      <div class="curriculum-stack">
        ${program.detail.curriculumDays
          .map(
            (item) => `
              <article class="surface-card curriculum-item">
                <div class="curriculum-head">
                  <span class="status-pill status-open">${item.day}</span>
                  <div class="keyword-row">
                    ${item.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}
                  </div>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "OUTCOME",
        title: "교육 후 무엇이 남나요?",
        description: "강의를 듣고 끝나는 것이 아니라, 실제로 실행할 수 있는 리서치 자동화 흐름을 남깁니다.",
      })}
      <div class="grid-4">
        ${program.detail.outcomeCards
          .map(
            (item) => `
              <article class="surface-card field-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "OFFLINE",
        title: "오프라인 교육 운영 경험을 바탕으로 진행합니다",
        description: "세미나, 네트워킹, 실습형 교육을 운영해온 경험을 바탕으로 현장 중심 프로그램을 설계합니다.",
      })}
      ${renderGallery(program.detail.galleryItems)}
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container narrow">
      ${sectionHeading({
        eyebrow: "FAQ",
        title: "자주 묻는 질문",
        description: "심화 과정 참여 전 많이 묻는 질문을 정리했습니다.",
      })}
      ${renderFaqList(program.detail.faqItems)}
      <p class="detail-disclaimer">${program.detail.disclaimer}</p>
    </div>
  </section>

  <section class="page-section page-dark final-cta-panel">
    <div class="container narrow center-copy">
      <p class="eyebrow">WAITLIST</p>
      <h2>다음 모집 소식을 가장 먼저 받아보세요.</h2>
      <p>세미나 참여 여부와 관계없이, 심화 과정 관심자는 알림 신청을 남길 수 있습니다.</p>
      <div class="button-row center">
        ${applyTriggerButton({
          className: "button primary",
          label: "알림 받기",
          analyticsLabel: "course_waitlist_final",
          context: program.applyContext,
        })}
      </div>
    </div>
  </section>
`;

const renderBusinessPage = () => {
  const program = programs.find((item) => item.id === "business-consulting");

  return `
    <section class="page-hero page-hero-inner">
      <div class="container">
        <p class="hero-kicker">BUSINESS AX</p>
        <h1>기업 맞춤형 AX 교육·컨설팅</h1>
        <p class="hero-lede">
          조직의 업무 프로세스를 분석하고, AI 자동화 도입 구조를 설계하는 맞춤형 교육·컨설팅을 제안합니다.
        </p>
        <div class="button-row">
          ${applyTriggerButton({
            className: "button primary",
            label: "기업 교육 문의하기",
            analyticsLabel: "business_apply_hero",
            context: program?.applyContext,
          })}
          ${routeLink({
            path: "/contact",
            label: "문의 채널 보기",
            className: "button secondary",
            analyticsEvent: "navigate_route",
            analyticsLabel: "business_contact",
          })}
        </div>
      </div>
    </section>

    <section class="page-section page-light">
      <div class="container">
        ${sectionHeading({
          eyebrow: "SERVICE",
          title: "이룸터가 제안하는 기업 지원 방식",
          description: "도구 교육만이 아니라 조직의 실행 구조까지 고려한 맞춤형 제안이 가능합니다.",
        })}
        <div class="grid-3">
          ${businessOfferCards
            .map(
              (item) => `
                <article class="surface-card field-card">
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="page-section page-navy">
      <div class="container">
        ${sectionHeading({
          eyebrow: "PROCESS",
          title: "문의 이후 진행 흐름",
          description: "상황 파악, 교육 설계, 실행 지원까지 단계별로 맞춤형 프로세스를 제안합니다.",
        })}
        <div class="grid-3">
          ${businessProcessSteps
            .map(
              (item) => `
                <article class="surface-card method-card">
                  <span class="method-chip">${item.chip}</span>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="page-section page-light">
      <div class="container narrow">
        ${sectionHeading({
          eyebrow: "FAQ",
          title: "기업교육 문의 전에 많이 묻는 질문",
          description: "운영 형태, 규모, 커리큘럼 맞춤 여부에 대한 답변을 정리했습니다.",
        })}
        ${renderFaqList(businessFaqItems)}
      </div>
    </section>

    <section class="page-section page-dark final-cta-panel">
      <div class="container narrow center-copy">
        <p class="eyebrow">BUSINESS INQUIRY</p>
        <h2>조직에 맞는 AX 교육 구조를 함께 설계해보세요.</h2>
        <p>현재 고민과 목표를 남겨주시면 적합한 운영 방향을 검토해 회신드립니다.</p>
        <div class="button-row center">
          ${applyTriggerButton({
            className: "button primary",
            label: "문의 남기기",
            analyticsLabel: "business_apply_final",
            context: program?.applyContext,
          })}
        </div>
      </div>
    </section>
  `;
};

const renderReviewsPage = () => `
  <section class="page-hero page-hero-inner">
    <div class="container">
      <p class="hero-kicker">REVIEWS & STORIES</p>
      <h1>후기와 현장 스토리</h1>
      <p class="hero-lede">
        세미나, 실습, 네트워킹이 어떻게 연결되는지 보여주는 장면과 운영 후기를 모아두었습니다.
      </p>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${renderGallery(reviewGalleryItems)}
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container">
      ${sectionHeading({
        eyebrow: "VOICE",
        title: "참가자가 기억하는 변화",
        description: "도구 소개가 아니라 실행 구조가 남았다는 피드백이 반복되었습니다.",
      })}
      <div class="grid-3 review-quote-grid">
        ${reviewQuotes
          .map(
            (item) => `
              <article class="surface-card quote-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span>${item.byline}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      ${sectionHeading({
        eyebrow: "FLOW",
        title: "이룸터 현장은 이렇게 이어집니다",
        description: "세미나에서 끝나지 않고, 실습과 후속 연결까지 포함하는 운영 구조를 추구합니다.",
      })}
      <div class="grid-3">
        ${reviewStoryCards
          .map(
            (item) => `
              <article class="surface-card field-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderContactPage = () => `
  <section class="page-hero page-hero-inner">
    <div class="container">
      <p class="hero-kicker">CONTACT</p>
      <h1>문의하기</h1>
      <p class="hero-lede">
        프로그램 참여, 기업교육, 협업 제안 등 무엇이든 편한 채널로 남겨 주세요. 운영팀이 확인 후 순차적으로 답변드립니다.
      </p>
      <div class="button-row">
        ${applyTriggerButton({
          className: "button primary",
          label: "문의 남기기",
          analyticsLabel: "contact_apply_hero",
          context: DEFAULT_APPLY_CONTEXT,
        })}
      </div>
    </div>
  </section>

  <section class="page-section page-light">
    <div class="container">
      <div class="grid-3">
        ${contactCards
          .map(
            (item) => `
              <article class="surface-card field-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${
                  item.href
                    ? `<a class="contact-link" href="${item.href}">${item.value}</a>`
                    : `<strong class="contact-strong">${item.value}</strong>`
                }
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="page-section page-navy">
    <div class="container narrow">
      ${sectionHeading({
        eyebrow: "FAQ",
        title: "문의 전에 자주 확인하는 내용",
        description: "프로그램 시작점과 운영 방식에 대한 기본 질문을 정리했습니다.",
      })}
      ${renderFaqList(contactFaqItems)}
    </div>
  </section>
`;

const renderNotFoundPage = () => `
  <section class="page-hero page-hero-inner">
    <div class="container narrow center-copy">
      <p class="hero-kicker">404</p>
      <h1>찾으시는 페이지가 없습니다.</h1>
      <p class="hero-lede">요청하신 페이지가 이동되었거나 존재하지 않습니다. 메인 홈이나 프로그램 목록에서 다시 탐색해보세요.</p>
      <div class="button-row center">
        ${routeLink({
          path: "/",
          label: "메인 홈으로",
          className: "button primary",
          analyticsEvent: "navigate_route",
          analyticsLabel: "not_found_home",
        })}
        ${routeLink({
          path: "/programs",
          label: "프로그램 보기",
          className: "button secondary",
          analyticsEvent: "navigate_route",
          analyticsLabel: "not_found_programs",
        })}
      </div>
    </div>
  </section>
`;

export const getPageMeta = (path) => {
  const pageMetaMap = {
    "/": {
      title: "이룸터 | AX 교육·컨설팅 플랫폼",
      description:
        "이룸터는 AI 에이전트와 자동화 기술을 업무, 창업, 투자, 마케팅 현장에 적용하는 실전형 AX 교육·컨설팅 플랫폼입니다.",
    },
    "/programs": {
      title: "프로그램 목록 | 이룸터",
      description: "입문 세미나, 심화 과정, 기업교육까지 이룸터의 AX 프로그램을 한눈에 확인해보세요.",
    },
    "/business": {
      title: "기업 AX 교육·컨설팅 | 이룸터",
      description: "조직의 업무 프로세스를 분석하고 AI 자동화 도입 구조를 설계하는 기업 맞춤형 교육·컨설팅 안내입니다.",
    },
    "/reviews": {
      title: "후기와 현장 스토리 | 이룸터",
      description: "이룸터의 세미나, 실습, 네트워킹 운영 방식과 현장 스토리를 확인해보세요.",
    },
    "/contact": {
      title: "문의하기 | 이룸터",
      description: "프로그램 참여, 기업교육, 협업 제안 등 이룸터 문의 채널을 안내합니다.",
    },
  };

  const program = getProgramByPath(path);

  if (program) {
    return {
      title: `${program.title} | 이룸터`,
      description: program.summary,
    };
  }

  return pageMetaMap[path] || {
    title: "이룸터 | AX 교육·컨설팅 플랫폼",
    description: "실전형 AX 교육과 컨설팅을 통해 AI를 실제 현장에 연결하는 이룸터 플랫폼입니다.",
  };
};

export const renderRoutePage = (route) => {
  const { path } = route;

  if (path === "/") {
    return renderHomePage();
  }

  if (path === "/programs") {
    return renderProgramsPage();
  }

  if (path === "/business") {
    return renderBusinessPage();
  }

  if (path === "/reviews") {
    return renderReviewsPage();
  }

  if (path === "/contact") {
    return renderContactPage();
  }

  const program = getProgramByPath(path);

  if (program?.id === "invest-ai-seminar") {
    return renderSeminarPage(program);
  }

  if (program?.id === "invest-ax-course") {
    return renderCoursePage(program);
  }

  return renderNotFoundPage();
};
