document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       PROJECT LAB / PROJECT NAVIGATOR
       projects.js
       ========================================================= */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia(
        "(max-width: 768px)"
    ).matches;


    /* =========================================================
       PROJECT DATA
       ========================================================= */

    const projects = {
        finance: {
            id: "01",
            category: "SYSTEMS",
            title: "FINANCE OS",
            type: "PERSONAL FINANCE SYSTEM",
            status: "IN DEVELOPMENT",

            description:
                "Sistema pessoal de gestão financeira desenvolvido para organizar contas, lançamentos, categorias e indicadores em uma experiência centralizada.",

            role:
                "DESIGN + DEVELOPMENT",

            stack:
                "PYTHON / STREAMLIT / SQLITE / PANDAS",

            focus:
                "FINANCIAL MANAGEMENT",

            accent:
                "terracotta"
        },

        portfolio: {
            id: "02",
            category: "WEB",
            title: "PEDRO MARTELLI PORTFOLIO",
            type: "WEB / DIGITAL EXPERIENCE",
            status: "ONLINE",

            description:
                "Experiência digital profissional criada para apresentar trajetória, competências, projetos e conteúdo em uma interface técnica, responsiva e interativa.",

            role:
                "DESIGN + FRONT-END",

            stack:
                "HTML / CSS / JAVASCRIPT / VANTA.JS / TSPARTICLES",

            focus:
                "PERSONAL BRAND + WEB EXPERIENCE",

            accent:
                "cyan"
        }
    };


    /* =========================================================
       DOM ELEMENTS
       ========================================================= */

    const projectRows =
        document.querySelectorAll("[data-project]");

    const filterButtons =
        document.querySelectorAll("[data-filter]");

    const focusPanel =
        document.querySelector(".project-focus");

    const focusId =
        document.querySelector("[data-focus-id]");

    const focusCategory =
        document.querySelector("[data-focus-category]");

    const focusTitle =
        document.querySelector("[data-focus-title]");

    const focusType =
        document.querySelector("[data-focus-type]");

    const focusStatus =
        document.querySelector("[data-focus-status]");

    const focusDescription =
        document.querySelector("[data-focus-description]");

    const focusRole =
        document.querySelector("[data-focus-role]");

    const focusStack =
        document.querySelector("[data-focus-stack]");

    const focusFocus =
        document.querySelector("[data-focus-focus]");

    const exploreButton =
        document.querySelector("[data-explore-project]");

    const projectNote =
        document.querySelector("[data-project-note]");

    const pointerX =
        document.querySelector("[data-pointer-x]");

    const pointerY =
        document.querySelector("[data-pointer-y]");


    /* =========================================================
       PROJECT FOCUS
       ========================================================= */

    let activeProject = "finance";


    function updateProjectFocus(projectKey) {

        const project = projects[projectKey];

        if (!project) {
            return;
        }

        activeProject = projectKey;


        /* -----------------------------------------
           Active project row
           ----------------------------------------- */

        projectRows.forEach(function (row) {

            const rowProject =
                row.getAttribute("data-project");

            row.classList.toggle(
                "is-active",
                rowProject === projectKey
            );
        });


        /* -----------------------------------------
           Accent
           ----------------------------------------- */

        if (focusPanel) {

            focusPanel.classList.remove(
                "accent-terracotta",
                "accent-cyan"
            );

            focusPanel.classList.add(
                "accent-" + project.accent
            );
        }


        /* -----------------------------------------
           Project information
           ----------------------------------------- */

        if (focusId) {
            focusId.textContent = project.id;
        }

        if (focusCategory) {
            focusCategory.textContent =
                project.category;
        }

        if (focusTitle) {
            focusTitle.textContent =
                project.title;
        }

        if (focusType) {
            focusType.textContent =
                project.type;
        }

        if (focusStatus) {
            focusStatus.textContent =
                project.status;
        }

        if (focusDescription) {
            focusDescription.textContent =
                project.description;
        }

        if (focusRole) {
            focusRole.textContent =
                project.role;
        }

        if (focusStack) {
            focusStack.textContent =
                project.stack;
        }

        if (focusFocus) {
            focusFocus.textContent =
                project.focus;
        }


        /* -----------------------------------------
           Reset project note
           ----------------------------------------- */

        if (projectNote) {
            projectNote.textContent =
                "SELECT PROJECT / READY";
        }
    }


    /* =========================================================
       PROJECT ROW INTERACTION
       ========================================================= */

    projectRows.forEach(function (row) {

        row.addEventListener(
            "mouseenter",
            function () {

                const projectKey =
                    row.getAttribute("data-project");

                updateProjectFocus(projectKey);
            }
        );


        row.addEventListener(
            "focus",
            function () {

                const projectKey =
                    row.getAttribute("data-project");

                updateProjectFocus(projectKey);
            }
        );


        row.addEventListener(
            "click",
            function () {

                const projectKey =
                    row.getAttribute("data-project");

                updateProjectFocus(projectKey);
            }
        );
    });


    /* =========================================================
       FILTER SYSTEM
       ========================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.getAttribute("data-filter");


                /* -----------------------------------------
                   Active filter
                   ----------------------------------------- */

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "is-active"
                        );
                    }
                );

                button.classList.add(
                    "is-active"
                );


                /* -----------------------------------------
                   Filter project rows
                   ----------------------------------------- */

                let firstVisibleProject = null;

                projectRows.forEach(
                    function (row) {

                        const category =
                            row.getAttribute(
                                "data-category"
                            );

                        const shouldShow =
                            filter === "ALL" ||
                            category === filter;

                        row.style.display =
                            shouldShow
                                ? ""
                                : "none";


                        if (
                            shouldShow &&
                            firstVisibleProject === null
                        ) {

                            firstVisibleProject =
                                row.getAttribute(
                                    "data-project"
                                );
                        }
                    }
                );


                /* -----------------------------------------
                   Focus first available project
                   ----------------------------------------- */

                if (firstVisibleProject) {

                    updateProjectFocus(
                        firstVisibleProject
                    );
                }
            }
        );
    });


    /* =========================================================
       EXPLORE PROJECT
       ========================================================= */

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                /*
                 * Finance OS já possui página própria.
                 *
                 * O Portfolio continuará como NEXT STAGE
                 * até construirmos seu case individual.
                 */

                if (activeProject === "finance") {

                    window.location.href =
                        "finance-os/";

                    return;
                }


                if (projectNote) {

                    projectNote.textContent =
                        projects[activeProject].title +
                        " / CASE / NEXT STAGE";
                }
            }
        );
    }


    /* =========================================================
       POINTER TELEMETRY
       ========================================================= */

    function updatePointer(event) {

        if (!pointerX || !pointerY) {
            return;
        }

        const x =
            Math.round(event.clientX);

        const y =
            Math.round(event.clientY);

        pointerX.textContent =
            String(x).padStart(4, "0");

        pointerY.textContent =
            String(y).padStart(4, "0");
    }


    if (!isMobile) {

        window.addEventListener(
            "mousemove",
            updatePointer,
            {
                passive: true
            }
        );
    }


    /* =========================================================
       VANTA.JS NET
       ========================================================= */

    let vantaNetEffect = null;


    function initVantaNet() {

        /*
         * Não executa animações pesadas caso o usuário
         * tenha solicitado redução de movimento.
         */

        if (reduceMotion) {
            return;
        }


        /*
         * Verifica se Three.js e Vanta.NET
         * foram carregados corretamente.
         */

        if (
            !window.VANTA ||
            !window.VANTA.NET ||
            !window.THREE
        ) {

            console.warn(
                "Project Lab: Vanta.NET não foi carregado."
            );

            return;
        }


        const target =
            document.getElementById(
                "lab-vanta-net"
            );


        if (!target) {

            console.warn(
                "Project Lab: elemento #lab-vanta-net não encontrado."
            );

            return;
        }


        /*
         * Inicialização do VANTA.NET
         */

        vantaNetEffect = VANTA.NET({

            el: target,

            THREE: window.THREE,

            mouseControls: true,

            touchControls: true,

            gyroControls: false,

            minHeight: 200.00,

            minWidth: 200.00,

            scale: 1.00,

            scaleMobile: 1.00,


            /*
             * Visual Project Lab
             */

            color: 0x79b7c8,

            backgroundColor: 0x0d0d0d,


            /*
             * NET density
             */

            points:
                isMobile
                    ? 6.00
                    : 9.00,

            maxDistance:
                isMobile
                    ? 17.00
                    : 22.00,

            spacing:
                isMobile
                    ? 19.00
                    : 17.00,

            showDots: true
        });
    }


    /* =========================================================
       VANTA CLEANUP
       ========================================================= */

    function destroyVantaNet() {

        if (
            vantaNetEffect &&
            typeof vantaNetEffect.destroy ===
                "function"
        ) {

            vantaNetEffect.destroy();

            vantaNetEffect = null;
        }
    }


    window.addEventListener(
        "pagehide",
        destroyVantaNet
    );


    /* =========================================================
       INITIAL STATE
       ========================================================= */

    updateProjectFocus("finance");

    initVantaNet();

});
