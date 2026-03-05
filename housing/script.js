const SIGNON_EMAIL = "abundantillinois@gmail.com";
const SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/abundantillinois@gmail.com";

function openJoinModal(type = "organization") {
  const modal = document.getElementById("join-modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const radio = modal.querySelector(`input[name="support_type"][value="${type}"]`);
  if (radio) radio.checked = true;
  toggleOrgFields();
}

function closeJoinModal() {
  const modal = document.getElementById("join-modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function toggleOrgFields() {
  const selected = document.querySelector('input[name="support_type"]:checked');
  const isOrg = selected?.value === "organization";
  document.querySelectorAll(".org-only").forEach((node) => {
    node.classList.toggle("hidden", !isOrg);
  });
}

document.querySelectorAll("[data-open-join]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-sign-type") || "organization";
    openJoinModal(type);
  });
});

document.querySelectorAll("[data-close-join]").forEach((btn) => {
  btn.addEventListener("click", closeJoinModal);
});

document.getElementById("join-modal")?.addEventListener("click", (event) => {
  if (event.target.id === "join-modal") closeJoinModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeJoinModal();
});

document.querySelectorAll('input[name="support_type"]').forEach((input) => {
  input.addEventListener("change", toggleOrgFields);
});

toggleOrgFields();

document.getElementById("join-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const note = document.getElementById("join-note");
  const data = new FormData(form);
  const supportType = (data.get("support_type") || "organization").toString();

  data.append("_subject", `BUILD Coalition Sign-On (${supportType})`);
  data.append("_template", "table");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
  }

  try {
    const response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (!response.ok) throw new Error("Submission failed");

    if (note) {
      note.textContent =
        "Thanks, your sign-on was submitted successfully. We will follow up with next steps.";
    }

    form.reset();
    toggleOrgFields();

    setTimeout(() => {
      closeJoinModal();
    }, 900);
  } catch (error) {
    if (note) {
      note.textContent =
        `We could not submit automatically. Please email ${SIGNON_EMAIL} with your sign-on details.`;
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Sign-On";
    }
  }
});


function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

initMobileNav();
