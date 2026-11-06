/* ==========================================================
   Features: 1 Dark/light theme
             2 Recipe filter
             3 Favorites
             4 Ingredient scaler
             5 Contact form validation
             6 Newsletter signup
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initRecipeFilter();
  initFavorites();
  initIngredientScaler();
  initContactForm();
  initNewsletter();
});

/* dark / light mode */
function initTheme() {
  const toggle = document.querySelector("#theme-toggle");
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  if (!toggle) return;
  toggle.addEventListener("click", function () {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
      toggle.setAttribute("aria-pressed", theme === "dark");
    }
  }
}

/* interactive recipe filter */
function initRecipeFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".recipe-card");
  if (buttons.length === 0 || cards.length === 0) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const region = button.dataset.filter; // "all", "west-africa", ...

      // highlight the active button
      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      // looping over every card and show/hide
      cards.forEach(function (card) {
        const matches = region === "all" || card.dataset.region === region;
        card.classList.toggle("hidden", !matches);
      });
    });
  });
}

/* favorites */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (e) {
    return []; 
  }
}

function initFavorites() {
  const buttons = document.querySelectorAll(".fav-btn");
  if (buttons.length === 0) return;

  // restore saved favorites when the page loads
  const favorites = getFavorites();
  buttons.forEach(function (button) {
    setFavoriteLook(button, favorites.includes(button.dataset.id));

    button.addEventListener("click", function () {
      let current = getFavorites();
      const id = button.dataset.id;
      const isFav = current.includes(id);

      current = isFav ? current.filter(function (f) { return f !== id; }) : current.concat(id);
      localStorage.setItem("favorites", JSON.stringify(current));

      // keep every button for this recipe in sync
      document.querySelectorAll('.fav-btn[data-id="' + id + '"]').forEach(function (b) {
        setFavoriteLook(b, !isFav);
      });
    });
  });

  function setFavoriteLook(button, isFav) {
    button.classList.toggle("favorited", isFav);
    button.setAttribute("aria-pressed", isFav);
    button.innerHTML = '<span class="heart" aria-hidden="true">❤️</span> ' + (isFav ? "Favorited" : "Favorite");
  }
}

/* Ingredient scaler */
function initIngredientScaler() {
  const output = document.querySelector("#servings-count");
  const minus = document.querySelector("#servings-minus");
  const plus = document.querySelector("#servings-plus");
  const items = document.querySelectorAll(".amount[data-base]");
  if (!output || !minus || !plus || items.length === 0) return;

  const baseServings = Number(output.dataset.base);
  let servings = baseServings;

  minus.addEventListener("click", function () { update(servings - 1); });
  plus.addEventListener("click", function () { update(servings + 1); });

  function update(value) {
    servings = Math.min(Math.max(value, 1), 24);
    output.textContent = servings;
    items.forEach(function (item) {
      const scaled = (Number(item.dataset.base) * servings) / baseServings;
      item.textContent = formatAmount(scaled);
    });
  }

  // for showing friendly rounded numbers like 1.5 instead of 1.5000001
  function formatAmount(n) {
    if (n >= 10) return String(Math.round(n));
    return String(Math.round(n * 100) / 100);
  }
}

/* contact form validation & feedback */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const message = form.querySelector("#message");
  const error = form.querySelector("#message-error");
  const confirmation = document.querySelector("#confirmation");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stops the form submitting automatically

    const text = message.value.trim();
    if (text.length <= 20) {
      error.textContent = "Please write more than 20 characters (currently " + text.length + ").";
      message.classList.add("input-error");
      message.focus();
      return;
    }

    // when validation passes, hide form and show personalised thank-you
    error.textContent = "";
    message.classList.remove("input-error");
    const userName = nameInput.value.trim() || "friend";
    confirmation.textContent = "Thank you, " + userName + "! We've received your message.";
    form.classList.add("hidden");
    confirmation.classList.remove("hidden");
  });

  // clears the error as soon as the message becomes long enough
  message.addEventListener("input", function () {
    if (message.value.trim().length > 20) {
      error.textContent = "";
      message.classList.remove("input-error");
    }
  });
}

/* newsletter signup */
function initNewsletter() {
  const form = document.querySelector("#newsletter-form");
  const msg = document.querySelector("#newsletter-msg");
  if (!form || !msg) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = form.querySelector("input[type='email']").value.trim();
    msg.textContent = "Thanks for subscribing, " + email + "! 🌍";
    form.reset();
  });
}
