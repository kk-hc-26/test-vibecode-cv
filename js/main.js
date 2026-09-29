/* Kay Kim — personal website interactions
   Scrollspy + mobile navigation. No dependencies. */

(function () {
  "use strict";

  var nav = document.querySelector(".nav-menu");
  var toggle = document.querySelector(".nav-toggle");

  /* ---------- Mobile menu toggle ---------- */
  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu when a nav link is chosen (including the brand and Download button).
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    // Close the menu on Escape.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    // Close the menu when the viewport grows past the mobile breakpoint.
    var mediaQuery = window.matchMedia("(min-width: 861px)");
    var onBreakpoint = function (e) {
      if (e.matches) closeMenu();
    };
    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", onBreakpoint);
    else mediaQuery.addListener(onBreakpoint); // older Safari
  }

  /* ---------- Scrollspy: highlight active section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + id;
      link.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var pos = window.scrollY + 110; // below sticky nav
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= pos) current = sections[i];
      }
      if (current) setActive(current.id);
      ticking = false;
    });
  }

  if (sections.length && "scrollY" in window) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();