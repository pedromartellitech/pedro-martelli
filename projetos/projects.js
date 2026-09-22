(() => {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia(
        "(max-width: 767px)"
    ).matches;


    /* =========================================================
       DADOS DOS PROJETOS
    ========================================================= */

    const projects = {

        "finance-os": {
            number: "01",
            title: "FINANCE OS",
            type: "SISTEMA / APLICAÇÃO",
            status: "ATIVO",

            description:
                "Sistema pessoal de gestão financeira desenvolvido para organizar contas, lançamentos, categorias e indicadores em uma experiência centralizada.",

            role:
                "DESIGN + DESENVOLVIMENTO",

            stack:
                "PYTHON / STREAMLIT / SQLITE / PANDAS",

            area:
                "GESTÃO FINANCEIRA",

            preview:
                "FINANCE.OS",

            previewClass:
                "preview-screen--finance",

            accent:
                "#C66A4A",

            url:
                "finance-os/"
        },


        "deployflow": {
            number: "02",
            title: "DEPLOYFLOW",
            type: "SISTEMA / GESTÃO DE IMPLANTAÇÃO",
            status: "EM DESENVOLVIMENTO",

            description:
                "Projeto voltado à organização e evolução do fluxo de implantação de sistemas, com foco em processos, acompanhamento e rastreabilidade.",

            role:
                "CONCEPÇÃO + DESENVOLVIMENTO",

            stack:
                "ARQUITETURA EM EVOLUÇÃO",

            area:
                "IMPLANTAÇÃO DE SISTEMAS",

            preview:
                "DEPLOYFLOW",

            previewClass:
                "preview-screen--portfolio",

            accent:
                "#79B7C8",

            url:
                null
        },


        "portfolio": {
            number: "03",
            title: "PEDRO MARTELLI PORTFOLIO",
            type: "WEB / EXPERIÊNCIA DIGITAL",
            status: "ONLINE",

            description:
                "Experiência digital profissional criada para apresentar trajetória, competências, projetos e conteúdo em uma interface técnica, responsiva e interativa.",

            role:
                "DESIGN + FRONT-END",

            stack:
                "HTML / CSS / JAVASCRIPT / VANTA.JS",

            area:
                "MARCA PESSOAL + EXPERIÊNCIA WEB",

            preview:
                "PEDRO.MARTELLI",

            previewClass:
                "preview-screen--portfolio",

            accent:
                "#79B7C8",

            url:
                null
        },


        "delphi": {
            number: "04",
            title: "PROJETO DELPHI",
            type: "SOFTWARE / DESKTOP",
            status: "EM DESENVOLVIMENTO",

            description:
                "Projeto prático em Delphi em fase inicial de desenvolvimento, utilizado para ampliar conhecimentos em desenvolvimento de aplicações desktop.",

            role:
                "DESENVOLVIMENTO",

            stack:
                "DELPHI",

            area:
                "APLICAÇÃO DESKTOP",

            preview:
                "DELPHI.PROJECT",

            previewClass:
                "preview-screen--finance",

            accent:
                "#C66A4A",

            url:
                null
        }
    };


    /* =========================================================
       ELEMENTOS DA INTERFACE
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
       PROJETO SELECIONADO
    ========================================================= */

    let selectedProject = "finance-os";


    /* =========================================================
       COR DE DESTAQUE
    ========================================================= */

    function setAccent(color) {

        document.documentElement.style.setProperty(
            "--accent",
            color
        );
    }


    /* =========================================================
       SELECIONAR PROJETO
    ========================================================= */

    function selectProject(projectId) {

        const project = projects[projectId];

        if (!project) {
            return;
        }


        selectedProject = projectId;


        /* Marca somente o projeto selecionado */

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


        /* Pequena transição do painel */

        focus?.classList.add(
            "is-switching"
        );


        window.setTimeout(() => {

            if (projectNumber) {
                projectNumber.textContent =
                    project.number;
            }

            if (focusType) {
                focusType.textContent =
                    project.type;
            }

            if (focusStatus) {
                focusStatus.textContent =
                    project.status;
            }

            if (focusTitle) {
                focusTitle.textContent =
                    project.title;
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

            if (focusArea) {
                focusArea.textContent =
                    project.area;
            }

            if (previewLabel) {
                previewLabel.textContent =
                    project.preview;
            }


            /* Atualiza a prévia */

            if (previewScreen) {

                previewScreen.classList.remove(
                    "preview-screen--finance",
                    "preview-screen--portfolio"
                );

                previewScreen.classList.add(
                    project.previewClass
                );
            }


            /* Atualiza botão */

            if (exploreButton) {

                const label =
                    exploreButton.querySelector(
                        "span"
                    );


                if (label) {

                    label.textContent =
                        project.url
                            ? "EXPLORAR SISTEMA"
                            : "VER PROJETO";
                }


                exploreButton.disabled =
                    false;
            }


            /* Status da página */

            if (focusNote) {

                focusNote.textContent =
                    project.url

                        ? "PÁGINA DO PROJETO / DISPONÍVEL"

                        : "PÁGINA DO PROJETO / EM DESENVOLVIMENTO";
            }


            setAccent(
                project.accent
            );


            focus?.classList.remove(
                "is-switching"
            );

        }, reduceMotion ? 0 : 150);
    }


    /* =========================================================
       SELEÇÃO DOS PROJETOS

       IMPORTANTE:
       Hover NÃO seleciona.
       Somente clique ou teclado.
    ========================================================= */

    function initProjectRows() {

        document
            .querySelectorAll(".project-row")
            .forEach((row) => {


                /* CLIQUE */

                row.addEventListener(
                    "click",
                    () => {

                        selectProject(
                            row.dataset.project
                        );
                    }
                );


                /* TECLADO */

                row.addEventListener(
                    "keydown",
                    (event) => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            selectProject(
                                row.dataset.project
                            );
                        }
                    }
                );

            });
    }


    /* =========================================================
       FILTROS
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


                    /* Remove seleção dos filtros */

                    filters.forEach(
                        (button) => {

                            button.classList.remove(
                                "is-active"
                            );
                        }
                    );


                    /* Ativa filtro clicado */

                    filter.classList.add(
                        "is-active"
                    );


                    /* Mostra / esconde projetos */

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


                    /*
                     * Verifica se o projeto atualmente
                     * selecionado ainda está visível.
                     */

                    const selectedRow =
                        document.querySelector(
                            `.project-row[data-project="${selectedProject}"]`
                        );


                    const selectedStillVisible =
                        selectedRow &&
                        !selectedRow.hidden &&
                        selectedRow.style.display !==
                            "none";


                    /*
                     * Caso o filtro esconda o projeto atual,
                     * seleciona o primeiro projeto disponível.
                     */

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
       BOTÃO EXPLORAR
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


                /*
                 * Se o projeto já possui uma página,
                 * abre a página correspondente.
                 */

                if (project.url) {

                    window.location.href =
                        project.url;

                    return;
                }


                /*
                 * Caso ainda não exista uma página,
                 * apenas informa que está em desenvolvimento.
                 */

                if (focusNote) {

                    focusNote.textContent =
                        project.title +
                        " / PÁGINA EM DESENVOLVIMENTO";
                }

            }
        );
    }


    /* =========================================================
       TELEMETRIA DO CURSOR
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

       CONFIGURAÇÃO APROVADA.
       NÃO ALTERAR.
    ========================================================= */

    let vantaNetEffect =
        null;


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


                /* INTERAÇÃO */

                mouseControls:
                    true,

                touchControls:
                    true,

                gyroControls:
                    false,


                /* TAMANHO */

                minHeight:
                    200.00,

                minWidth:
                    200.00,

                scale:
                    1.00,

                scaleMobile:
                    1.00,


                /* VISUAL */

                color:
                    0x79b7c8,

                backgroundColor:
                    0x0d0d0d,


                /*
                 * CONFIGURAÇÃO DO NET
                 * NÃO ALTERADA
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

                showDots:
                    true
            });
    }


    /* =========================================================
       LIMPEZA DO VANTA
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
       INICIALIZAÇÃO
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            initProjectRows();

            initFilters();

            initExploreButton();

            initPointerTelemetry();

            initVantaNet();


            /*
             * Finance OS é o projeto
             * selecionado inicialmente.
             */

            selectProject(
                "finance-os"
            );

        }
    );

})();
