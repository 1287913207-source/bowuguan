const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const subscribeForm = document.querySelector(".subscribe-form");
const feedback = document.querySelector(".form-feedback");
const filterChips = document.querySelectorAll(".filter-chip");
const browserCards = document.querySelectorAll(".browser-card");
const revealBlocks = document.querySelectorAll(".reveal-on-scroll");
const ticketForm = document.querySelector("#ticket-form");
const ticketTotal = document.querySelector("#ticket-total");
const ticketNote = document.querySelector("#ticket-note");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (filterChips.length && browserCards.length) {
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const { filter } = chip.dataset;

      filterChips.forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");

      browserCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

if (ticketForm && ticketTotal && ticketNote) {
  const updateTicketSummary = () => {
    const formData = new FormData(ticketForm);
    const ticketType = Number(formData.get("ticketType"));
    const adultCount = Number(formData.get("adultCount")) || 0;
    const discountCount = Number(formData.get("discountCount")) || 0;
    const guideType = Number(formData.get("guideType"));
    const discountPrice = ticketType === 0 ? 0 : 24;
    const total = adultCount * ticketType + discountCount * discountPrice + guideType;

    const guideLabel =
      guideType === 300 ? "1 场团体专场导览" : guideType === 120 ? "1 场公共导览" : "未添加导览";
    const ticketLabel = ticketType === 0 ? "常设展免费票" : "特展票";

    ticketTotal.textContent = `¥ ${total}`;
    ticketNote.textContent = `含 ${adultCount} 张${ticketLabel}、${discountCount} 张优惠票和 ${guideLabel}。`;
  };

  ticketForm.addEventListener("input", updateTicketSummary);
  ticketForm.addEventListener("change", updateTicketSummary);
  updateTicketSummary();
}

if (revealBlocks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealBlocks.forEach((block) => observer.observe(block));
}

if (subscribeForm) {
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const button = subscribeForm.querySelector("button");
    const value = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";

    if (!value || !value.includes("@")) {
      if (feedback) {
        feedback.textContent = "请输入有效邮箱后再提交。";
        feedback.className = "form-feedback is-error";
      }
      return;
    }

    if (button) {
      button.textContent = "已提交";
      button.setAttribute("disabled", "true");
    }

    if (feedback) {
      feedback.textContent = "感谢订阅，最新展讯和工作坊信息会发送到你的邮箱。";
      feedback.className = "form-feedback is-success";
    }
  });
}
