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
            status: "PUBLICADO · EM EVOLUÇÃO",

            description:
                "Portfólio profissional desenvolvido como aplicação web interativa, com layout responsivo, animações, suporte a idiomas e Project Lab para navegação entre projetos. O próprio site demonstra a aplicação prática de desenvolvimento front-end e experiência do usuário.",

            role:
                "DESENVOLVIMENTO FRONT-END + UI/UX",

            stack:
                "HTML5 / CSS3 / JAVASCRIPT / VANTA.JS",

            area:
                "DESENVOLVIMENTO WEB + EXPERIÊNCIA DIGITAL",

            preview:
                "PEDRO.MARTELLI",

            previewClass:
                "preview-screen--portfolio-live",

            accent:
                "#79B7C8",

            url:
                "../index.html",

            sourceUrl:
                "https://github.com/pedromartellitech/pedro-martelli"
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

    // Um iframe pequeno na vitrine e outro para navegar no site por inteiro.
    const portfolioPreview = document.getElementById("portfolio-live-preview");
    const portfolioViewer = document.getElementById("portfolio-viewer");
    const portfolioViewerFrame = document.getElementById("portfolio-viewer-frame");
    const portfolioViewerClose = document.getElementById("portfolio-viewer-close");
    const portfolioViewerLoading = document.getElementById("portfolio-viewer-loading");
    const labShell = document.getElementById("lab-shell");
    let viewerReturnFocus = null;

    function resizePortfolioPreview() {
        if (!portfolioPreview || !previewScreen) return;
        const baseWidth = 1280;
        const baseHeight = 720;
        const scale = Math.min(previewScreen.clientWidth / baseWidth,
                               previewScreen.clientHeight / baseHeight);
        if (scale <= 0) return;
        const x = (previewScreen.clientWidth - baseWidth * scale) / 2;
        const y = (previewScreen.clientHeight - baseHeight * scale) / 2;
        portfolioPreview.style.transform =
            `translate(${x}px, ${y}px) scale(${scale})`;
    }

    function updatePortfolioPreview() {
        if (!portfolioPreview || !previewScreen) return;
        const showingPortfolio = selectedProject === "portfolio";
        const viewerOpen = portfolioViewer && !portfolioViewer.hidden;
        if (showingPortfolio && !viewerOpen) {
            if (portfolioPreview.getAttribute("src") !== "../index.html") {
                portfolioPreview.setAttribute("src", "../index.html");
            }
            requestAnimationFrame(resizePortfolioPreview);
        } else if (portfolioPreview.hasAttribute("src")) {
            // Libera recursos quando não estamos exibindo a prévia.
            portfolioPreview.removeAttribute("src");
        }
    }

    function openPortfolioViewer() {
        if (!portfolioViewer || !portfolioViewerFrame) return;
        viewerReturnFocus = document.activeElement;
        portfolioViewer.hidden = false;
        document.body.classList.add("portfolio-viewer-open");
        if (labShell) labShell.inert = true;
        if (portfolioViewerLoading) portfolioViewerLoading.hidden = false;
        updatePortfolioPreview();
        portfolioViewerFrame.src = "../index.html";
        if (portfolioViewerClose) portfolioViewerClose.focus();
    }

    function closePortfolioViewer() {
        if (!portfolioViewer || portfolioViewer.hidden) return;
        portfolioViewerFrame.removeAttribute("src");
        portfolioViewer.hidden = true;
        document.body.classList.remove("portfolio-viewer-open");
        if (labShell) labShell.inert = false;
        updatePortfolioPreview();
        if (viewerReturnFocus && typeof viewerReturnFocus.focus === "function") {
            viewerReturnFocus.focus();
        }
    }

    if (portfolioViewerFrame) {
        portfolioViewerFrame.addEventListener("load", () => {
            if (portfolioViewerLoading) portfolioViewerLoading.hidden = true;
        });
    }
    if (portfolioViewerClose) {
        portfolioViewerClose.addEventListener("click", closePortfolioViewer);
    }
    if (portfolioViewer) {
        portfolioViewer.querySelectorAll("[data-close-portfolio-viewer]").forEach(el => {
            el.addEventListener("click", closePortfolioViewer);
        });
    }
    document.addEventListener("keydown", event => {
        if (!portfolioViewer || portfolioViewer.hidden) return;
        if (event.key === "Escape") {
            event.preventDefault();
            closePortfolioViewer();
        }
        if (event.key === "Tab") {
            // Os controles de navegação do modal estão na mesma barra.
            const controls = Array.from(portfolioViewer.querySelectorAll(
                '.portfolio-viewer__toolbar a, .portfolio-viewer__toolbar button'
            ));
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });
    window.addEventListener("resize", resizePortfolioPreview, { passive: true });

    const exploreButton =
        document.getElementById("explore-project");

    const focusNote =
        document.getElementById("focus-note");

    /* Link adicional exibido somente no projeto do portfólio.
       Criado via JavaScript para não exigir alterações no HTML ou CSS. */
    const sourceLink = document.createElement("a");
    sourceLink.className = "focus-primary";
    sourceLink.href = "https://github.com/pedromartellitech/pedro-martelli";
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.setAttribute("aria-label", "Abrir o código-fonte do portfólio no GitHub");
    sourceLink.innerHTML = "<span>CÓDIGO-FONTE</span><b>↗</b>";
    sourceLink.style.display = "none";
    sourceLink.style.whiteSpace = "nowrap";

    if (exploreButton && exploreButton.parentElement) {
        exploreButton.insertAdjacentElement("afterend", sourceLink);
    }


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

       O painel lateral SOMENTE muda quando esta função
       é chamada por um clique no projeto.
    ========================================================= */

    function selectProject(projectId) {

        const project = projects[projectId];

        if (!project) {
            return;
        }


        selectedProject = projectId;


        /* Marca o projeto selecionado */

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
                    "preview-screen--portfolio",
                    "preview-screen--portfolio-live"
                );

                previewScreen.classList.add(
                    project.previewClass
                );
                updatePortfolioPreview();
            }


            /* Atualiza o botão */

            if (exploreButton) {

                const label =
                    exploreButton.querySelector(
                        "span"
                    );


                if (label) {

                    if (
                        project.status ===
                        "EM DESENVOLVIMENTO"
                    ) {

                        label.textContent =
                            "VER PROJETO";

                    } else if (projectId === "portfolio") {

                        label.textContent = "EXPLORAR DENTRO DO LAB";

                    } else if (
                        projectId === "finance-os"
                    ) {

                        label.textContent =
                            "EXPLORAR SISTEMA";

                    } else {

                        label.textContent =
                            "VER PROJETO";
                    }
                }


                exploreButton.disabled = !project.url;
                if (!project.url && label) label.textContent = "EM CONSTRUÇÃO";
            }


            /* Exibe o GitHub apenas quando o portfólio está selecionado. */
            if (project.sourceUrl) {
                sourceLink.href = project.sourceUrl;
                sourceLink.style.display = "inline-flex";
            } else {
                sourceLink.style.display = "none";
            }

            /* Atualiza status da página */

            if (focusNote) {

                focusNote.textContent = !project.url
                    ? "PÁGINA AINDA NÃO PUBLICADA"
                    : projectId === "portfolio"
                        ? "PROJETO FUNCIONAL · ABRE AQUI NO LAB"
                        : "PROJETO DISPONÍVEL PARA EXPLORAR";
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

       NÃO existe:
       mouseenter
       mouseover
       pointerenter

       O projeto muda SOMENTE quando houver clique.
    ========================================================= */

    function initProjectRows() {

        document
            .querySelectorAll(".project-row")
            .forEach((row) => {

                row.addEventListener(
                    "click",
                    () => {

                        selectProject(
                            row.dataset.project
                        );

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


                    /* Remove estado ativo */

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


                    /* Filtra projetos */

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
                     * Se o projeto selecionado tiver sido
                     * escondido pelo filtro, seleciona o
                     * primeiro projeto disponível.
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
       ABRIR PROJETO
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


                if (
                    !project ||
                    !project.url
                ) {

                    return;
                }


                // O Projeto 03 executa o portfólio real dentro do Lab.
                if (selectedProject === "portfolio") {
                    openPortfolioViewer();
                    return;
                }

                // Os outros projetos mantêm seu comportamento original.
                window.location.href = project.url;

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
                 * MANTIDA EXATAMENTE COMO APROVADA
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
       ENCERRAR VANTA
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
             * Projeto inicial:
             * Finance OS
             */

            selectProject(
                "finance-os"
            );

        }
    );

})();
