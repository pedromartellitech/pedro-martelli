(() => {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const projects = {
        "finance-os": {
            number: "01",
            title: "FINANCE OS",
            type: "SYSTEM / APPLICATION",
            status: "ACTIVE",
            description:
                "Sistema pessoal de gestão financeira desenvolvido para organizar contas, lançamentos, categorias e indicadores em uma experiência centralizada.",
            role: "DESIGN + DEVELOPMENT",
            stack: "PYTHON / STREAMLIT / SQLITE / PANDAS",
            area: "FINANCIAL MANAGEMENT",
            preview: "FINANCE.OS",
            previewClass: "preview-screen--finance",
            accent: "#C66A4A"
        },

        "portfolio": {
            number: "02",
            title: "PEDRO MARTELLI PORTFOLIO",
            type: "WEB / DIGITAL EXPERIENCE",
            status: "ONLINE",
            description:
                "Experiência digital profissional criada para apresentar trajetória, competências, projetos e conteúdo em uma interface técnica, responsiva e interativa.",
            role: "DESIGN + FRONT-END",
            stack: "HTML / CSS / JAVASCRIPT / VANTA.JS / TSPARTICLES",
            area: "PERSONAL BRAND + WEB EXPERIENCE",
            preview: "PEDRO.MARTELLI",
            previewClass: "preview-screen--portfolio",
            accent: "#79B7C8"
        }
    };

    const focus = document.getElementById("project-focus");
    const projectNumber = document.getElementById("project-number");
    const focusType = document.getElementById("focus-type");
    const focusStatus = document.getElementById("focus-status");
    const focusTitle = document.getElementById("focus-title");
    const focusDescription = document.getElementById("focus-description");
    const focusRole = document.getElementById("focus-role");
    const focusStack = document.getElementById("focus-stack");
    const focusArea = document.getElementById("focus-area");
    const previewLabel = document.getElementById("preview-label");
    const previewScreen = document.getElementById("preview-screen");
    const exploreButton = document.getElementById("explore-project");
    const focusNote = document.getElementById("focus-note");

    let selectedProject = "finance-os";

    function setAccent(color) {
        document.documentElement.style.setProperty("--accent", color);
    }

    function selectProject(projectId) {
        const project = projects[projectId];

        if (!project) return;

        selectedProject = projectId;

        document.querySelectorAll(".project-row").forEach((row) => {
            const active = row.dataset.project === projectId;

            row.classList.toggle("is-active", active);
            row.setAttribute("aria-pressed", String(active));
        });

        focus?.classList.add("is-switching");

        window.setTimeout(() => {
            if (projectNumber) projectNumber.textContent = project.number;
            if (focusType) focusType.textContent = project.type;
            if (focusStatus) focusStatus.textContent = project.status;
            if (focusTitle) focusTitle.textContent = project.title;
            if (focusDescription) focusDescription.textContent = project.description;
            if (focusRole) focusRole.textContent = project.role;
            if (focusStack) focusStack.textContent = project.stack;
            if (focusArea) focusArea.textContent = project.area;
            if (previewLabel) previewLabel.textContent = project.preview;

            if (previewScreen) {
                previewScreen.classList.remove(
                    "preview-screen--finance",
                    "preview-screen--portfolio"
                );

                previewScreen.classList.add(project.previewClass);
            }

            setAccent(project.accent);

            focus?.classList.remove("is-switching");
        }, reduceMotion ? 0 : 150);
    }

    function initProjectRows() {
        document.querySelectorAll(".project-row").forEach((row) => {
            row.addEventListener("click", () => {
                selectProject(row.dataset.project);
            });
        });
    }

    function initFilters() {
        const filters = document.querySelectorAll(".filter");
        const rows = document.querySelectorAll(".project-row");

        filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                filters.forEach((button) => button.classList.remove("is-active"));
                filter.classList.add("is-active");

                const value = filter.dataset.filter;

                rows.forEach((row) => {
                    const visible =
                        value === "all" ||
                        row.dataset.category === value;

                    row.hidden = !visible;
                });

                const activeVisible =
                    document.querySelector(".project-row.is-active:not([hidden])");

                if (!activeVisible) {
                    const firstVisible =
                        document.querySelector(".project-row:not([hidden])");

                    if (firstVisible) {
                        selectProject(firstVisible.dataset.project);
                    }
                }
            });
        });
    }

    function initExploreButton() {
        if (!exploreButton) return;

        exploreButton.addEventListener("click", () => {
            const label =
                selectedProject === "finance-os"
                    ? "FINANCE OS CASE / NEXT STAGE"
                    : "PORTFOLIO CASE / NEXT STAGE";

            if (focusNote) {
                focusNote.textContent = label;
            }

            exploreButton.animate(
                [
                    { transform: "translateY(0) scale(1)" },
                    { transform: "translateY(-2px) scale(1.015)" },
                    { transform: "translateY(0) scale(1)" }
                ],
                {
                    duration: reduceMotion ? 1 : 320,
                    easing: "ease-out"
                }
            );
        });
    }

    function initPointerTelemetry() {
        if (isMobile) return;

        const x = document.getElementById("pointer-x");
        const y = document.getElementById("pointer-y");

        window.addEventListener(
            "pointermove",
            (event) => {
                if (x) {
                    x.textContent = String(
                        Math.max(0, Math.round(event.clientX))
                    ).padStart(4, "0");
                }

                if (y) {
                    y.textContent = String(
                        Math.max(0, Math.round(event.clientY))
                    ).padStart(4, "0");
                }
            },
            { passive: true }
        );
    }

    async function initParticles() {
        if (reduceMotion || !window.tsParticles) return;

        await tsParticles.load({
            id: "lab-particles",

            options: {
                fullScreen: {
                    enable: false
                },

                background: {
                    color: {
                        value: "transparent"
                    }
                },

                fpsLimit: 60,
                detectRetina: true,

                particles: {
                    number: {
                        value: isMobile ? 16 : 38,

                        density: {
                            enable: true,
                            area: 1000
                        }
                    },

                    color: {
                        value: [
                            "#C66A4A",
                            "#79B7C8",
                            "#F5F5F5"
                        ]
                    },

                    opacity: {
                        value: {
                            min: 0.08,
                            max: 0.34
                        }
                    },

                    size: {
                        value: {
                            min: 1,
                            max: 2
                        }
                    },

                    links: {
                        enable: true,
                        distance: isMobile ? 90 : 135,
                        color: "#79B7C8",
                        opacity: 0.075,
                        width: 1
                    },

                    move: {
                        enable: true,
                        speed: isMobile ? 0.18 : 0.27,
                        direction: "none",

                        outModes: {
                            default: "out"
                        }
                    }
                },

                interactivity: {
                    detectsOn: "window",

                    events: {
                        onHover: {
                            enable: !isMobile,
                            mode: "repulse"
                        },

                        resize: {
                            enable: true
                        }
                    },

                    modes: {
                        repulse: {
                            distance: 95,
                            duration: 0.3,
                            factor: 0.6,
                            speed: 0.4
                        }
                    }
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initProjectRows();
        initFilters();
        initExploreButton();
        initPointerTelemetry();
        initParticles();
        selectProject("finance-os");
    });
})();
