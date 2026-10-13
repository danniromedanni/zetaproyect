
/* ==========================
   1. ELEMENTOS DEL CARRUSEL
========================== */

const slides = document.querySelectorAll(".magazine-slide");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const currentSlide = document.getElementById("current-slide");
const totalSlides = document.getElementById("total-slides");
const dotsContainer = document.getElementById("carousel-dots");

let activeIndex = 0;

// Cantidad total de páginas.
const total = slides.length;

totalSlides.textContent = String(total).padStart(2, "0");


/* ==========================
   2. CREAR INDICADORES
========================== */

slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.setAttribute(
        "aria-label",
        `Ir a la página ${index + 1}`
    );

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);
});


/* ==========================
   3. CAMBIAR DE PÁGINA
========================== */

function showSlide(index) {
    // Volver al principio si superamos la última página.
    if (index >= total) {
        index = 0;
    }

    // Ir a la última página si retrocedemos desde la primera.
    if (index < 0) {
        index = total - 1;
    }

    activeIndex = index;

    // Ocultar las páginas y desactivar los indicadores.
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");

        const link = slide.querySelector("a");

        if (link) {
            link.setAttribute("tabindex", "-1");
        }

        const dot = dotsContainer.children[i];

        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
    });

    // Mostrar la página seleccionada.
    slides[activeIndex].classList.add("active");
    slides[activeIndex].setAttribute("aria-hidden", "false");

    const activeLink = slides[activeIndex].querySelector("a");

    if (activeLink) {
        activeLink.removeAttribute("tabindex");
    }

    // Actualizar el indicador correspondiente.
    const activeDot = dotsContainer.children[activeIndex];

    activeDot.classList.add("active");
    activeDot.setAttribute("aria-current", "true");

    // Actualizar el contador.
    currentSlide.textContent = String(activeIndex + 1).padStart(2, "0");
}


/* ==========================
   4. BOTONES ANTERIOR / SIGUIENTE
========================== */

previousButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
});

nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
});


/* ==========================
   5. NAVEGACIÓN CON TECLADO
========================== */

document.addEventListener("keydown", (event) => {
    // No interceptar las flechas mientras se escribe.
    if (
        event.target.matches("input, textarea, select") ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (event.key === "ArrowRight") {
        showSlide(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showSlide(activeIndex - 1);
    }
});


/* ==========================
   6. MENÚ PARA CELULARES
========================== */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Cerrar el menú después de seleccionar una sección.
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});


/* ==========================
   7. INICIAR LA PÁGINA
========================== */

showSlide(0);
