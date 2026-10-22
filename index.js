document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleButton = document.querySelector(".toggle-button");
    const yearNode = document.getElementById("year");
    const form = document.querySelector(".contact-form");
    const faqItems = document.querySelectorAll(".faq-item");
    const logoWrap = document.querySelector(".logo");
    const logoImg = document.querySelector(".logo img");

    const applyTheme = (isDark) => {
        body.classList.toggle("dark", isDark);
        if (toggleButton) {
            toggleButton.textContent = isDark ? "Modo claro" : "Modo escuro";
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const isDark = !body.classList.contains("dark");
            applyTheme(isDark);
        });
    }

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            faqItems.forEach((faq) => faq.classList.remove("open"));
            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const button = form.querySelector("button[type='submit']");
            const message = form.querySelector(".form-message");

            if (button) {
                button.disabled = true;
                button.textContent = "Enviando...";
            }

            setTimeout(() => {
                if (message) {
                    message.textContent = "Mensagem enviada com sucesso! Vamos conversar em breve.";
                }

                form.reset();

                if (button) {
                    button.disabled = false;
                    button.textContent = "Enviar mensagem";
                }
            }, 800);
        });
    }

    if (logoWrap && logoImg) {
        logoImg.addEventListener("error", () => {
            logoWrap.classList.add("has-error");
        });
    }
});
