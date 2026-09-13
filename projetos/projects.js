(() => {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia(
        "(max-width: 767px)"
    ).matches;


    /* =========================================================
       PROJECT DATA
    ========================================================= */

    const projects = {

        "finance-os": {
            number: "01",
            title: "FINANCE OS",
            type: "SYSTEM / APPLICATION",
            status: "ACTIVE",

            description:
                "Sistema pessoal de gestão financeira desenvolvido para organizar contas, lançamentos, categorias e indicadores em uma experiência centralizada.",

            role:
                "DESIGN + DEVELOPMENT",

            stack:
                "PYTHON / STREAMLIT / SQLITE / PANDAS",

            area:
                "FINANCIAL MANAGEMENT",

            preview:
                "FINANCE.OS",

            previewClass:
                "preview-screen--finance",

            accent:
                "#C66A4A",

            url:
                "finance-os/"
        },


        "portfolio": {
            number: "02",
            title: "PEDRO MARTELLI PORTFOLIO",
            type: "WEB / DIGITAL EXPERIENCE",
            status: "ONLINE",

            description:
                "Experiência digital profissional criada para apresentar trajetória, competências, projetos e conteúdo em uma interface técnica, responsiva e interativa.",

            role:
                "DESIGN + FRONT-END",

            stack:
                "HTML / CSS / JAVASCRIPT / VANTA.JS / TSPARTICLES",

            area:
                "PERSONAL BRAND + WEB EXPERIENCE",

            preview:
                "PEDRO.MARTELLI",

            previewClass:
                "preview-screen--portfolio",

            accent:
                "#79B7C8",

            url:
                null
        }
    };


    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

    const focus =
        document.getElementById("project-focus");

    const projectNumber =
        document.getElementById("project-number");

    const focusType =
        document.getElementById("focus-type");

    const focusStatus =
        document.getElementById("focus-status");

    const focusTitle =
        document.getElementById("focus-title");

    const focusDescription =
        document.getElementById("focus-description");

    const focusRole =
        document.getElementById("focus-role");

    const focusStack =
        document.getElementById("focus-stack");

    const focusArea =
        document.getElementById("focus-area");

    const previewLabel =
        document.getElementById("preview-label");

    const previewScreen =
        document.getElementById("preview-screen");

    const exploreButton =
        document.getElementById("explore-project");

    const focusNote =
        document.getElementById("focus-note");


    /* =========================================================
       CURRENT PROJECT
    ========================================================= */

    let selectedProject = "finance-os";


    /* =========================================================
       ACCENT COLOR
    ========================================================= */

    function setAccent(color) {

        document.documentElement.style.setProperty(
            "--accent",
            color
        );
    }


    /* =========================================================
       SELECT PROJECT
    ========================================================= */

    function selectProject(projectId) {

        const project = projects[projectId];

        if (!project) {
            return;
        }


        selectedProject = projectId;


        /* -----------------------------------------------------
           PROJECT ROW
        ----------------------------------------------------- */

        document
            .querySelectorAll(".project-row")
            .forEach((row) => {

                const active =
                    row.dataset.project === projectId;

                row.classList.toggle(
                    "is-active",
                    active
                );

                row.setAttribute(
                    "aria-pressed",
                    String(active)
                );
            });


        /* -----------------------------------------------------
           TRANSITION
        ----------------------------------------------------- */

        focus?.classList.add(
            "is-switching"
        );


        window.setTimeout(() => {


            /* -------------------------------------------------
               NUMBER
            ------------------------------------------------- */

            if (projectNumber) {

                projectNumber.textContent =
                    project.number;
            }


            /* -------------------------------------------------
               TYPE
            ------------------------------------------------- */

            if (focusType) {

                focusType.textContent =
                    project.type;
            }


            /* -------------------------------------------------
               STATUS
            ------------------------------------------------- */

            if (focusStatus) {

                focusStatus.textContent =
                    project.status;
            }


            /* -------------------------------------------------
               TITLE
            ------------------------------------------------- */

            if (focusTitle) {

                focusTitle.textContent =
                    project.title;
            }


            /* -------------------------------------------------
               DESCRIPTION
            ------------------------------------------------- */

            if (focusDescription) {

                focusDescription.textContent =
                    project.description;
            }


            /* -------------------------------------------------
               ROLE
            ------------------------------------------------- */

            if (focusRole) {

                focusRole.textContent =
                    project.role;
            }


            /* -------------------------------------------------
               STACK
            ------------------------------------------------- */

            if (focusStack) {

                focusStack.textContent =
                    project.stack;
            }


            /* -------------------------------------------------
               AREA
            ------------------------------------------------- */

            if (focusArea) {

                focusArea.textContent =
                    project.area;
            }


            /* -------------------------------------------------
               PREVIEW LABEL
            ------------------------------------------------- */

            if (previewLabel) {

                previewLabel.textContent =
                    project.preview;
            }


            /* -------------------------------------------------
               PREVIEW STYLE
            ------------------------------------------------- */

            if (previewScreen) {

                previewScreen.classList.remove(
                    "preview-screen--finance",
                    "preview-screen--portfolio"
                );

                previewScreen.classList.add(
                    project.previewClass
                );
            }


            /* -------------------------------------------------
               EXPLORE BUTTON
            ------------------------------------------------- */

            if (exploreButton) {

                const label =
                    exploreButton.querySelector(
                        "span"
                    );


                if (label) {

                    label.textContent =
                        projectId === "finance-os"
                            ? "EXPLORE SYSTEM"
                            : "EXPLORE PROJECT";
                }


                exploreButton.disabled = false;
            }


            /* -------------------------------------------------
               CASE STATUS
            ------------------------------------------------- */

            if (focusNote) {

                focusNote.textContent =
                    project.url
                        ? "CASE PAGE / AVAILABLE"
                        : "CASE PAGE / NEXT STAGE";
            }


            /* -------------------------------------------------
               ACCENT
            ------------------------------------------------- */

            setAccent(
                project.accent
            );


            /* -------------------------------------------------
               END TRANSITION
            ------------------------------------------------- */

            focus?.classList.remove(
                "is-switching"
            );

        }, reduceMotion ? 0 : 150);
    }


    /* =========================================================
       PROJECT ROW EVENTS
    ========================================================= */

    function initProjectRows() {

        document
            .querySelectorAll(".project-row")
            .forEach((row) => {


                /* CLICK */

                row.addEventListener(
                    "click",
                    () => {

                        selectProject(
                            row.dataset.project
                        );
                    }
                );


                /* HOVER */

                row.addEventListener(
                    "mouseenter",
                    () => {

                        if (!isMobile) {

                            selectProject(
                                row.dataset.project
                            );
                        }
                    }
                );


                /* KEYBOARD */

                row.addEventListener(
                    "focus",
                    () => {

                        selectProject(
                            row.dataset.project
                        );
                    }
                );

            });
    }


    /* =========================================================
       FILTER SYSTEM
    ========================================================= */

    function initFilters() {

        const filters =
            document.querySelectorAll(
                ".filter"
            );

        const rows =
            document.querySelectorAll(
                ".project-row"
            );


        filters.forEach((filter) => {

            filter.addEventListener(
                "click",
                () => {


                    const value =
                        (
                            filter.dataset.filter ||
                            "all"
                        ).toLowerCase();


                    /* -----------------------------------------
                       ACTIVE FILTER
                    ----------------------------------------- */

                    filters.forEach(
                        (button) => {

                            button.classList.remove(
                                "is-active"
                            );
                        }
                    );


                    filter.classList.add(
                        "is-active"
                    );


                    /* -----------------------------------------
                       FILTER PROJECTS
                    ----------------------------------------- */

                    rows.forEach((row) => {

                        const category =
                            (
                                row.dataset.category ||
                                ""
                            ).toLowerCase();


                        const visible =
                            value === "all" ||
                            category === value;


                        row.hidden =
                            !visible;


                        row.style.display =
                            visible
                                ? ""
                                : "none";
                    });


                    /* -----------------------------------------
                       CHECK CURRENT PROJECT
                    ----------------------------------------- */

                    const selectedRow =
                        document.querySelector(
                            `.project-row[data-project="${selectedProject}"]`
                        );


                    const selectedStillVisible =
                        selectedRow &&
                        !selectedRow.hidden &&
                        selectedRow.style.display !==
                            "none";


                    /* -----------------------------------------
                       SELECT FIRST AVAILABLE PROJECT
                    ----------------------------------------- */

                    if (!selectedStillVisible) {

                        const firstVisible =
                            Array
                                .from(rows)
                                .find((row) => {

                                    return (
                                        !row.hidden &&
                                        row.style.display !==
                                            "none"
                                    );
                                });


                        if (firstVisible) {

                            selectProject(
                                firstVisible.dataset.project
                            );
                        }
                    }

                }
            );
        });
    }


    /* =========================================================
       EXPLORE PROJECT
    ========================================================= */

    function initExploreButton() {

        if (!exploreButton) {
            return;
        }


        exploreButton.addEventListener(
            "click",
            () => {


                const project =
                    projects[selectedProject];


                if (!project) {
                    return;
                }


                /* -------------------------------------------------
                   PROJECT PAGE AVAILABLE
                ------------------------------------------------- */

                if (project.url) {

                    window.location.href =
                        project.url;

                    return;
                }


                /* -------------------------------------------------
                   PROJECT PAGE NOT YET AVAILABLE
                ------------------------------------------------- */

                if (focusNote) {

                    focusNote.textContent =
                        project.title +
                        " / CASE / NEXT STAGE";
                }


                /* -------------------------------------------------
                   BUTTON FEEDBACK
                ------------------------------------------------- */

                if (
                    typeof exploreButton.animate ===
                    "function"
                ) {

                    exploreButton.animate(

                        [
                            {
                                transform:
                                    "translateY(0) scale(1)"
                            },

                            {
                                transform:
                                    "translateY(-2px) scale(1.015)"
                            },

                            {
                                transform:
                                    "translateY(0) scale(1)"
                            }
                        ],

                        {
                            duration:
                                reduceMotion
                                    ? 1
                                    : 320,

                            easing:
                                "ease-out"
                        }
                    );
                }

            }
        );
    }


    /* =========================================================
       POINTER TELEMETRY
    ========================================================= */

    function initPointerTelemetry() {

        if (isMobile) {
            return;
        }


        const x =
            document.getElementById(
                "pointer-x"
            );

        const y =
            document.getElementById(
                "pointer-y"
            );


        window.addEventListener(

            "pointermove",

            (event) => {


                if (x) {

                    x.textContent =
                        String(
                            Math.max(
                                0,
                                Math.round(
                                    event.clientX
                                )
                            )
                        ).padStart(
                            4,
                            "0"
                        );
                }


                if (y) {

                    y.textContent =
                        String(
                            Math.max(
                                0,
                                Math.round(
                                    event.clientY
                                )
                            )
                        ).padStart(
                            4,
                            "0"
                        );
                }

            },

            {
                passive: true
            }
        );
    }


    /* =========================================================
       VANTA.JS NET

       IMPORTANTE:
       CONFIGURAÇÃO VISUAL MANTIDA.
       NÃO ALTERAR SEM NECESSIDADE.
    ========================================================= */

    let vantaNetEffect = null;


    function initVantaNet() {

        if (
            reduceMotion ||
            !window.VANTA ||
            !window.VANTA.NET ||
            !window.THREE
        ) {

            return;
        }


        const target =
            document.getElementById(
                "lab-vanta-net"
            );


        if (!target) {
            return;
        }


        vantaNetEffect =
            VANTA.NET({

                el:
                    target,

                THREE:
                    window.THREE,


                /* INTERACTION */

                mouseControls:
                    true,

                touchControls:
                    true,

                gyroControls:
                    false,


                /* DIMENSIONS */

                minHeight:
                    200.00,

                minWidth:
                    200.00,

                scale:
                    1.00,

                scaleMobile:
                    1.00,


                /* =================================================
                   VISUAL
                   NÃO ALTERADO
                ================================================= */

                color:
                    0x79b7c8,

                backgroundColor:
                    0x0d0d0d,


                /* =================================================
                   NET CONFIGURATION
                   NÃO ALTERADO
                ================================================= */

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

                showDots:
                    true
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

            vantaNetEffect =
                null;
        }
    }


    window.addEventListener(
        "pagehide",
        destroyVantaNet
    );


    /* =========================================================
       INITIALIZATION
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {


            /* PROJECT INTERACTION */

            initProjectRows();


            /* FILTERS */

            initFilters();


            /* EXPLORE BUTTON */

            initExploreButton();


            /* POINTER */

            initPointerTelemetry();


            /* VANTA.NET */

            initVantaNet();


            /* DEFAULT PROJECT */

            selectProject(
                "finance-os"
            );

        }
    );

})();
