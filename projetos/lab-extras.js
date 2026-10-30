/* ============================================================
   PM.OS / RECURSOS ADICIONAIS DO LABORATÓRIO
   Scripts originais do Project Lab permanecem funcionando.
   Sem APIs, sem monitoramento de hardware, sem envio de dados.
   ============================================================ */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const inicio = performance.now();
  const visitados = new Set(["finance-os"]);
  const selecoes = {"finance-os":"Finance OS",deployflow:"DeployFlow",portfolio:"Portfólio Pedro Martelli",delphi:"Projeto Delphi"};
  let som = false;
  let audio = null;
  let ultimoFoco = null;
  let fps = 0;

  function somCurto(frequencia = 520, duracao = 0.07) {
    if (!som) return;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      if (!audio) audio = new AudioCtor();
      if (audio.state === "suspended") audio.resume().catch(() => {});
      const t = audio.currentTime;
      const oscilador = audio.createOscillator();
      const ganho = audio.createGain();
      oscilador.type = "sine";
      oscilador.frequency.setValueAtTime(frequencia, t);
      oscilador.frequency.exponentialRampToValueAtTime(Math.max(100,frequencia*.7),t+duracao);
      ganho.gain.setValueAtTime(.0001,t);
      ganho.gain.exponentialRampToValueAtTime(.035,t+.012);
      ganho.gain.exponentialRampToValueAtTime(.0001,t+duracao);
      oscilador.connect(ganho).connect(audio.destination);
      oscilador.start(t);
      oscilador.stop(t+duracao+.015);
    } catch (_) { /* áudio opcional */ }
  }

  function iniciarCentral() {
    const btn = $("alternar-som");
    if (btn) btn.addEventListener("click", () => {
      som = !som;
      btn.setAttribute("aria-pressed", String(som));
      $("estado-som").textContent = som ? "Ativados" : "Desativados";
      somCurto(700,.10);
    });
    document.querySelectorAll(".project-row").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.project;
        if (id) visitados.add(id);
        $("metr-projetos").textContent = String(visitados.size).padStart(2,"0") + " / 04";
        somCurto(id === "portfolio" ? 750 : 520,.06);
        transicaoCurta();
      });
    });
    // Os dados do painel são relativos à sessão desta aba, não ao computador do visitante.
    function atualizarTempo() {
      const total = Math.floor((performance.now()-inicio)/1000);
      $("metr-tempo").textContent = String(Math.floor(total/60)).padStart(2,"0") + ":" + String(total%60).padStart(2,"0");
    }
    atualizarTempo();
    const intervalo = setInterval(() => {
      if (document.hidden) return;
      atualizarTempo();
      $("metr-fps").textContent = fps > 0 ? String(fps) : "—";
    },1000);
    let frames=0, janela=performance.now(), ativo=true;
    function amostrarFPS(t){
      if(!ativo)return;
      if(!document.hidden)frames++;
      if(t-janela >= 1000){fps=document.hidden?0:Math.round(frames*1000/(t-janela));frames=0;janela=t;}
      requestAnimationFrame(amostrarFPS);
    }
    requestAnimationFrame(amostrarFPS);
    window.addEventListener("pagehide",()=>{ativo=false;clearInterval(intervalo);},{once:true});
  }

  function transicaoCurta() {
    if (reduzido) return;
    const el=$("lab-transicao");
    if (!el) return;
    el.classList.remove("is-active");
    // Não bloqueia clique nem navegação: o efeito é puramente visual.
    requestAnimationFrame(()=>{
      el.classList.add("is-active");
      setTimeout(()=>el.classList.remove("is-active"),210);
    });
  }

  // A entrada começa OCULTA no HTML. Se este arquivo não carregar,
  // o laboratório continua acessível e nunca fica preso em 0%.
  function animacaoDeEntrada() {
    const modal = $("lab-entrada");
    if (!modal) return;
    const botao = $("lab-pular-entrada");
    const barra = $("lab-entrada-barra");
    const progresso = $("lab-entrada-progresso");
    const etapa = $("lab-entrada-etapa");
    let fechado = false;
    let seguranca = 0;

    function fechar() {
      if (fechado) return;
      fechado = true;
      window.clearTimeout(seguranca);
      modal.classList.add("is-done");
      modal.setAttribute("aria-hidden", "true");
      modal.style.pointerEvents = "none";
      window.setTimeout(() => {
        modal.hidden = true;
        modal.style.display = "none";
      }, 470);
    }

    botao?.addEventListener("click", fechar);
    if (reduzido) {
      modal.hidden = true;
      modal.style.display = "none";
      return;
    }

    // Só exibe o carregamento quando o próprio JavaScript estiver pronto.
    modal.hidden = false;
    modal.style.display = "grid";
    modal.style.pointerEvents = "auto";
    modal.classList.remove("is-done");
    modal.setAttribute("aria-hidden", "false");

    // Proteção adicional contra animações suspensas pelo navegador.
    seguranca = window.setTimeout(fechar, 1900);
    const inicioAnimacao = performance.now();
    const duracao = 1250;

    function passo(agora) {
      if (fechado) return;
      const p = Math.min(1, (agora - inicioAnimacao) / duracao);
      const valor = Math.round(p * 100);
      if (barra) barra.style.width = valor + "%";
      if (progresso) progresso.textContent = valor + "%";
      if (etapa) etapa.textContent = p < .33
        ? "Validando componentes…"
        : p < .7 ? "Carregando navegação…" : "Interface pronta.";
      if (p < 1) requestAnimationFrame(passo);
      else fechar();
    }
    requestAnimationFrame(passo);
  }

  function animarPrevia3D() {
    const alvo=document.querySelector(".focus-preview");
    if(!alvo || !ponteiroFino || reduzido)return;
    document.body.classList.add("lab-tilt-enabled");
    let atualX=0,atualY=0,quad=0;
    function atualizar(){
      quad=0;
      alvo.style.setProperty("--lab-tilt-x",atualX.toFixed(2)+"deg");
      alvo.style.setProperty("--lab-tilt-y",atualY.toFixed(2)+"deg");
      alvo.style.setProperty("--lab-tilt-lift",atualX===0&&atualY===0?"0px":"-3px");
    }
    alvo.addEventListener("pointermove",(event)=>{
      const r=alvo.getBoundingClientRect();
      atualX=(0.5-(event.clientY-r.top)/r.height)*8;
      atualY=((event.clientX-r.left)/r.width-.5)*10;
      if(!quad)quad=requestAnimationFrame(atualizar);
    },{passive:true});
    alvo.addEventListener("pointerleave",()=>{atualX=0;atualY=0;if(!quad)quad=requestAnimationFrame(atualizar);});
  }

  const areas={
    software:{titulo:"Desenvolvimento de Software",texto:"Desenvolvimento de páginas web, interfaces interativas, fundamentos de programação e organização de código. O próprio portfólio é uma demonstração prática.",tags:["HTML","CSS","JAVASCRIPT","INTERFACES"]},
    dados:{titulo:"Dados e Inteligência",texto:"Interesse em SQL, análise de informações, indicadores e painéis de dados. O Finance OS é um projeto relacionado à organização e à visualização de informações financeiras.",tags:["SQL","ANÁLISE","INDICADORES","DASHBOARDS"]},
    arquitetura:{titulo:"Arquitetura de Software",texto:"Estudo de integrações, modularidade, APIs, boas práticas e decisões que facilitam a evolução e a manutenção de sistemas.",tags:["APIs","INTEGRAÇÃO","MODELAGEM","SISTEMAS"]},
    gestao:{titulo:"Gestão e Projetos",texto:"Experiência com processos, implantação e organização de demandas, combinada ao interesse em planejamento, indicadores e gestão de projetos de tecnologia.",tags:["PROCESSOS","PLANEJAMENTO","GESTÃO DE TI"]},
    ia:{titulo:"IA, Automação e Inovação",texto:"Exploração de aplicações de inteligência artificial, automações e novas abordagens para resolver problemas e melhorar produtos digitais.",tags:["AUTOMAÇÃO","IA APLICADA","EXPERIMENTAÇÃO"]},
    quantica:{titulo:"Computação Quântica",texto:"Tema de estudo e curiosidade científica: qubits, portas e circuitos quânticos. Área de pesquisa pessoal, não experiência profissional declarada.",tags:["QUBITS","CIRCUITOS","PESQUISA"]}
  };
  function mostrarArea(chave) {
    const area=areas[chave];if(!area)return;
    const indice=Object.keys(areas).indexOf(chave)+1;
    $("mapa-area-titulo").textContent=area.titulo;
    $("mapa-area-texto").textContent=area.texto;
    document.querySelector(".mapa-lab__detalhe>small").textContent="ÁREA SELECIONADA / "+String(indice).padStart(2,"0")+" DE 06";
    const tags=$("mapa-area-tags");tags.replaceChildren();
    area.tags.forEach(tag=>{const span=document.createElement("span");span.textContent=tag;tags.append(span);});
    document.querySelectorAll("[data-area]").forEach(btn=>{const selecionado=btn.dataset.area===chave;btn.classList.toggle("is-selected",selecionado);btn.setAttribute("aria-pressed",String(selecionado));});
    somCurto(500+indice*40,.07);
  }
  function iniciarMapa() {
    document.querySelectorAll("[data-area]").forEach(botao=>botao.addEventListener("click",()=>mostrarArea(botao.dataset.area)));
    $("abrir-mapa")?.addEventListener("click",()=>{
      $("mapa-conhecimento")?.scrollIntoView({behavior:reduzido?"auto":"smooth",block:"center"});
      somCurto(650,.07);
    });
  }

  // Um assistente de respostas locais — não é um chatbot com IA generativa.
  function respostaPara(frase) {
    const t=frase.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
    if(/(03|portfolio|portifolio|site)/.test(t))return "O Projeto 03 é este próprio portfólio, construído com HTML, CSS e JavaScript. Você pode selecioná-lo na lista de projetos e clicar em ‘EXPLORAR DENTRO DO LAB’ para navegar pela aplicação aqui mesmo.";
    if(/(projet|trabalho|finance|deploy|delphi)/.test(t))return "O laboratório apresenta quatro projetos: 01 — Finance OS; 02 — DeployFlow (em desenvolvimento); 03 — Portfólio Pedro Martelli (publicado); 04 — Projeto Delphi (em desenvolvimento). Selecione uma linha para abrir seus detalhes.";
    if(/(tecnolog|linguage|ferrament|stack|codigo)/.test(t))return "O portfólio utiliza HTML5, CSS3, JavaScript e efeitos visuais. Os projetos também abordam tecnologias como Python, Streamlit, SQLite e Delphi. As experiências variam conforme cada projeto.";
    if(/(contato|linkedin|github|curricul|recrut)/.test(t))return "Para entrar em contato ou acessar perfis profissionais, volte ao portfólio principal e procure a seção ‘Contato’. O código deste site também pode ser explorado no GitHub pelo Projeto 03.";
    if(/(quantic|ia|inteligencia|arquitetura|dados|gestao|habilidad|area)/.test(t))return "As áreas de interesse incluem desenvolvimento de software, dados, arquitetura, gestão, IA e computação quântica. Explore o Mapa de Conhecimentos abaixo para descobrir os objetivos e o nível de abordagem de cada área.";
    if(/(quem|sobre|pedro|experienc|formac)/.test(t))return "Pedro é formado em Análise e Desenvolvimento de Sistemas, possui experiência prática com implantação, suporte e processos, e está direcionando a carreira a desenvolvimento, dados e arquitetura de software.";
    if(/(ola|oi|bom dia|boa noite|boa tarde|ajuda)/.test(t))return "Olá! Pergunte sobre projetos, tecnologias, formação, áreas de estudo ou como navegar pelo portfólio. Também existe um terminal interativo no painel superior.";
    return "Posso ajudar com: projetos, tecnologias, trajetória, áreas de estudo ou Projeto 03. Experimente perguntar ‘Quais são os projetos?’ ou selecionar uma sugestão acima.";
  }

  function inserirMensagem(pai,texto,classe) {
    const p=document.createElement("p");p.className=classe;p.textContent=texto;pai.append(p);pai.scrollTop=pai.scrollHeight;
  }
  function iniciarAssistente() {
    const mensagens=$("assistente-mensagens"),entrada=$("assistente-entrada");
    function perguntar(pergunta){
      if(!pergunta.trim())return;
      inserirMensagem(mensagens,pergunta,"assistente__pergunta");
      inserirMensagem(mensagens,respostaPara(pergunta),"assistente__resposta");
      somCurto(690,.08);
    }
    $("assistente-form")?.addEventListener("submit",(ev)=>{ev.preventDefault();perguntar(entrada.value);entrada.value="";entrada.focus();});
    document.querySelectorAll("[data-pergunta]").forEach(btn=>btn.addEventListener("click",()=>perguntar(btn.dataset.pergunta)));
  }

  const comandos={
    ajuda:"Comandos: ajuda | projetos | abrir 01/02/03/04 | mapa | sobre | tecnologias | som | limpar | fechar",
    projetos:"01 — Finance OS (disponível)\n02 — DeployFlow (em desenvolvimento)\n03 — Portfólio Pedro Martelli (publicado)\n04 — Projeto Delphi (em desenvolvimento)",
    sobre:"Pedro Martelli | Análise e Desenvolvimento de Sistemas | foco em desenvolvimento, dados, arquitetura, projetos e inovação.",
    tecnologias:"HTML, CSS, JavaScript, Python, Streamlit, SQLite e estudos em dados, APIs, arquitetura e outras tecnologias."
  };
  function iniciarTerminal() {
    const entrada=$("terminal-entrada"), historico=$("terminal-historico");
    function linha(texto,classe="") {inserirMensagem(historico,texto,classe);}
    function executar(texto) {
      const cmd=texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      if(!cmd)return;
      linha("pm:~$ "+texto,"terminal__comando");
      somCurto(440,.055);
      if(cmd==="limpar"){historico.replaceChildren();return;}
      if(cmd==="fechar"){fecharPaineis();return;}
      if(cmd==="mapa"){$("mapa-conhecimento")?.scrollIntoView({behavior:reduzido?"auto":"smooth"});linha("Mapa de Conhecimentos aberto.");return;}
      if(cmd==="som"){$("alternar-som")?.click();linha("Efeitos sonoros: "+(som?"ativados":"desativados"));return;}
      const projeto=cmd.match(/^(abrir|selecionar)\s+(0?[1-4])$/);
      if(projeto){
        const n=Number(projeto[2]);const botao=document.querySelectorAll(".project-row")[n-1];
        if(botao){botao.click();linha("Projeto "+String(n).padStart(2,"0")+" selecionado: "+botao.querySelector("strong").textContent+".");}
        return;
      }
      if(comandos[cmd]){linha(comandos[cmd]);return;}
      linha("Comando não reconhecido. Digite ‘ajuda’.","terminal__erro");
    }
    $("terminal-form")?.addEventListener("submit",ev=>{ev.preventDefault();executar(entrada.value);entrada.value="";entrada.focus();});
  }

  const controlePaineis=[[$("abrir-assistente"),$("painel-assistente")],[$("abrir-terminal"),$("painel-terminal")]];
  function fecharPaineis() {
    controlePaineis.forEach(([botao,painel])=>{if(painel)painel.hidden=true;if(botao)botao.setAttribute("aria-expanded","false");});
    if(ultimoFoco && document.contains(ultimoFoco))ultimoFoco.focus();
    ultimoFoco=null;
  }
  function iniciarPaineis() {
    controlePaineis.forEach(([botao,painel])=>{
      if(!botao || !painel)return;
      botao.addEventListener("click",()=>{
        const estavaAberto=!painel.hidden;
        fecharPaineis();
        if(estavaAberto)return;
        ultimoFoco=botao;
        painel.hidden=false;
        botao.setAttribute("aria-expanded","true");
        painel.querySelector("input")?.focus();
        somCurto(710,.08);
      });
    });
    document.querySelectorAll("[data-fechar-painel]").forEach(botao=>botao.addEventListener("click",fecharPaineis));
    document.addEventListener("keydown",ev=>{
      if(ev.key==="Escape" && controlePaineis.some(([,p])=>p&&!p.hidden)){ev.preventDefault();fecharPaineis();}
      if(ev.key==="`" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
        ev.preventDefault();$("abrir-terminal")?.click();
      }
    });
  }

  function iniciar() {
    iniciarCentral();
    iniciarMapa();
    animarPrevia3D();
    iniciarAssistente();
    iniciarTerminal();
    iniciarPaineis();
    animacaoDeEntrada();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",iniciar,{once:true});
  else iniciar();
})();
