(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Header: background once the page scrolls ---------- */
    var header = document.getElementById("nav-menu");

    function updateHeader() {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* ---------- Mobile menu ---------- */
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");

    function setMenu(open) {
        nav.classList.toggle("is-open", open);
        header.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setMenu(false);
            toggle.focus();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 860) setMenu(false);
    });

    /* ---------- Typewriter in the hero ---------- */
    var typed = document.getElementById("typed");
    var phrases = [
        "scalable web applications.",
        "REST APIs and backend services.",
        "real-time analytics dashboards.",
        "secure authentication flows.",
        "clean, responsive interfaces.",
    ];

    if (typed && !reduceMotion) {
        var phraseIndex = 0;
        var charIndex = phrases[0].length;
        var deleting = true;

        var tick = function () {
            var phrase = phrases[phraseIndex];
            var delay;

            if (deleting) {
                charIndex -= 1;
                delay = 28;
                if (charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    delay = 350;
                }
            } else {
                charIndex += 1;
                delay = 55;
                if (charIndex === phrase.length) {
                    deleting = true;
                    delay = 2200;
                }
            }

            typed.textContent = phrases[phraseIndex].slice(0, charIndex);
            setTimeout(tick, delay);
        };

        setTimeout(tick, 2200);
    }

    /* ---------- Reveal sections as they scroll into view ---------- */
    var revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reduceMotion) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    /* ---------- Highlight the nav link for the section in view ---------- */
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav-link[href^="#"]'));
    var sections = links
        .map(function (link) {
            return document.getElementById(link.getAttribute("href").slice(1));
        })
        .filter(Boolean);

    function updateActiveLink() {
        var marker = window.scrollY + window.innerHeight * 0.35;
        var currentId = "";

        sections.forEach(function (section) {
            if (section.offsetTop <= marker) currentId = section.id;
        });

        // At the very bottom the last section may be too short to reach the marker.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            currentId = sections[sections.length - 1].id;
        }

        links.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + currentId;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);

    /* ---------- Footer year ---------- */
    document.getElementById("year").textContent = new Date().getFullYear();
})();
