(() => {
    "use strict";

    const boot = document.getElementById("lab-boot");
    const bootProgress = document.getElementById("boot-progress");
    const bootPercent = document.getElementById("boot-percent");
    const bootSystems = document.getElementById("boot-systems");
    const bootInterface = document.getElementById("boot-interface");
    const bootArchive = document.getElementById("boot-archive");
    const bootAccess = document.getElementById("boot-access");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia(
        "(max-width: 767px)"
    ).matches;

    function runBootSequence() {
        if (!boot) return;

        if (reduceMotion) {
            boot.classList.add("is-hidden");
            return;
        }

        let value = 0;

        const timer = window.setInterval(() => {
            value += Math.floor(Math.random() * 12) + 5;

            if (value > 100) {
                value = 100;
            }

            bootProgress.style.width = `${value}%`;

            bootPercent.textContent =
                `${String(value).padStart(2, "0")}%`;

            if (value >= 28) {
                bootSystems.textContent = "READY";
                bootSystems.classList.add("is-ready");
            }

            if (value >= 58) {
                bootInterface.textContent = "READY";
                bootInterface.classList.add("is-ready");
            }

            if (value >= 84) {
                bootArchive.textContent = "READY";
                bootArchive.classList.add("is-ready");
            }

            if (value >= 100) {
                window.clearInterval(timer);

                bootAccess.textContent = "ACCESS GRANTED";
                bootAccess.classList.add("is-granted");

                window.setTimeout(() => {
                    boot.classList.add("is-hidden");
                }, 320);
            }
        }, 90);
    }

    async function initParticles() {
        if (reduceMotion || !window.tsParticles) {
            return;
        }

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
                        value: isMobile ? 20 : 48,

                        density: {
                            enable: true,
                            area: 920
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
                            min: 0.12,
                            max: 0.42
                        }
                    },

                    size: {
                        value: {
                            min: 1,
                            max: 2.3
                        }
                    },

                    links: {
                        enable: true,
                        distance: isMobile ? 100 : 145,
                        color: "#79B7C8",
                        opacity: 0.10,
                        width: 1
                    },

                    move: {
                        enable: true,
                        speed: isMobile ? 0.22 : 0.34,
                        direction: "none",
                        random: false,
                        straight: false,

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
                            distance: 105,
                            duration: 0.35,
                            factor: 0.7,
                            speed: 0.45
                        }
                    }
                }
            }
        });
    }

    function initPointerTelemetry() {
        if (isMobile) {
            return;
        }

        const x = document.getElementById("lab-x");
        const y = document.getElementById("lab-y");

        const footerX =
            document.getElementById("footer-x");

        const footerY =
            document.getElementById("footer-y");

        window.addEventListener(
            "pointermove",

            (event) => {
                const px = String(
                    Math.max(
                        0,
                        Math.round(event.clientX)
                    )
                ).padStart(4, "0");

                const py = String(
                    Math.max(
                        0,
                        Math.round(event.clientY)
                    )
                ).padStart(4, "0");

                if (x) {
                    x.textContent = px;
                }

                if (y) {
                    y.textContent = py;
                }

                if (footerX) {
                    footerX.textContent = px;
                }

                if (footerY) {
                    footerY.textContent = py;
                }
            },

            {
                passive: true
            }
        );
    }

    function initArchiveEntry() {
        const enter =
            document.getElementById("lab-enter");

        const archiveEntry =
            document.getElementById("archive-entry");

        if (!enter || !archiveEntry) {
            return;
        }

        enter.addEventListener("click", () => {
            archiveEntry.scrollIntoView({
                behavior:
                    reduceMotion
                        ? "auto"
                        : "smooth",

                block: "start"
            });
        });
    }

    document.addEventListener(
        "DOMContentLoaded",

        () => {
            runBootSequence();
            initParticles();
            initPointerTelemetry();
            initArchiveEntry();
        }
    );
})();
