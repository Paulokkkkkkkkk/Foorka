const palavras = [
    { palavra: "ABACAXI", dica: "Fruta com uma 'coroa' no topo" },
    { palavra: "VIADUTO", dica: "Estrutura que permite passagem sobre vias" },
    { palavra: "METEOROLOGIA", dica: "Ciência que estuda o clima e o tempo" },
    { palavra: "COMPUTADOR", dica: "Máquina usada para acessar a internet" },
    { palavra: "QUARENTENA", dica: "Isolamento para evitar propagação de doenças" },
    { palavra: "PARALELEPIPEDO", dica: "Forma geométrica usada em calçamentos" },
    { palavra: "BRASIL", dica: "É o maior país da América do Sul" },
    { palavra: "BIBLIOTECA", dica: "Local onde se guardam e emprestam livros" },
    { palavra: "PLANETA", dica: "Corpo celeste que orbita uma estrela" },
    { palavra: "ESFERA", dica: "Forma geométrica perfeitamente redonda" },
    { palavra: "CAPIVARA", dica: "O maior roedor do mundo, comum no Brasil" },
    { palavra: "CACHOEIRA", dica: "Queda d’água natural muito bonita" },
    { palavra: "RELAMPAGO", dica: "Descarga elétrica luminosa durante tempestades" },
    { palavra: "ABSTRATO", dica: "Algo que não é físico, existe apenas como ideia"},
    { palavra: "ESTALACTITE", dica: "Formação que desce do teto de cavernas"},
    { palavra: "CONTORNO", dica: "Linha que define o limite de uma forma"},
    { palavra: "FLUENTE", dica: "Alguém que fala com facilidade"},
    { palavra: "GENESIS", dica: "Primeiro livro da Bíblia"},
    { palavra: "ORUN", dica: "Mundo espiritual, morada dos orixás (Candomblé)"},
    { palavra: "QUIROPRAXISTA", dica: "Profissional que alinha a coluna"},
    { palavra: "CARIOCA", dica: "Pessoa que mora no RJ"},
    { palavra: "ANIME", dica: "Animações Japonesas"},
    { palavra: "CANETA", dica: "É usada pra escrever"},
    { palavra: "MUNDIAL", dica: "Coisa que o palmeiras não tem"},
    { palavra: "MARATONA", dica: "Corrida de longa distância, 42 km" }
];

let palavra = "";
let dicaAtual = "";
let exibicao = [];
let erros = 0;
const maxErros = 6;

const wordDiv = document.getElementById("word");
const statusDiv = document.getElementById("status");
const keyboardDiv = document.getElementById("keyboard");
const restartBtn = document.getElementById("restart");
const endScreen = document.getElementById("endScreen");
let dicaDiv = null;

const partes = ["head", "body", "armL", "armR", "legL", "legR"];

/* ===== CONTROLE DA MÚSICA ===== */
const musicaFundo = document.getElementById("musica-fundo");
const botaoSom = document.getElementById("botaoSom");
const iconeSom = botaoSom.querySelector('i');
let estaTocando = false;

iconeSom.classList.remove('fa-volume-high');
iconeSom.classList.add('fa-volume-xmark');

function toggleMusica() {
    if (estaTocando) {
        musicaFundo.pause();
        iconeSom.classList.remove('fa-volume-high');
        iconeSom.classList.add('fa-volume-xmark');
        estaTocando = false;
    } else {
        musicaFundo.play().catch(err => console.log(err));
        iconeSom.classList.remove('fa-volume-xmark');
        iconeSom.classList.add('fa-volume-high');
        estaTocando = true;
    }
}

botaoSom.addEventListener('click', toggleMusica);

/* ===== LÓGICA DO JOGO ===== */

function finalizarJogo() {
    desativarTeclado();
    const wordArea = document.querySelector(".word-area");
    wordArea.appendChild(restartBtn);
    restartBtn.style.display = "block";
}

function escolherPalavra() {
    const item = palavras[Math.floor(Math.random() * palavras.length)];

    palavra = item.palavra;
    dicaAtual = item.dica;

    exibicao = Array(palavra.length).fill("_");
    wordDiv.textContent = exibicao.join(" ");
    erros = 0;

    endScreen.style.display = "none";
    endScreen.className = "end-screen";

    statusDiv.textContent = "";

    document.querySelectorAll(".part").forEach(p => (p.style.display = "none"));
    restartBtn.style.display = "none";

    gerarTeclado();
    mostrarDica();
}

function mostrarDica() {
    if (!dicaDiv) {
        dicaDiv = document.createElement("div");
        dicaDiv.id = "dica";
        dicaDiv.style.marginTop = "20px";
        dicaDiv.style.fontSize = "1.2rem";
        dicaDiv.style.opacity = "0.9";
        dicaDiv.style.fontWeight = "bold";
        dicaDiv.style.color = "#ffe393";
        dicaDiv.style.textAlign = "center";
        document.querySelector(".word-area").appendChild(dicaDiv);
    }

    dicaDiv.textContent = "💡 Dica: " + dicaAtual;
}

function gerarTeclado() {
    keyboardDiv.innerHTML = "";
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    alfabeto.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => tentativa(letra, btn);
        keyboardDiv.appendChild(btn);
    });

    // === BOTÃO ESPECIAL DE DICA ===
    const btnRevelar = document.createElement("button");
    btnRevelar.textContent = "?";
    btnRevelar.classList.add("botao-especial");
    btnRevelar.onclick = revelarLetra;
    keyboardDiv.appendChild(btnRevelar);
}

function revelarLetra() {
    const ocultas = exibicao
        .map((v, i) => v === "_" ? i : null)
        .filter(i => i !== null);

    if (ocultas.length === 0) return;

    const indice = ocultas[Math.floor(Math.random() * ocultas.length)];
    const letra = palavra[indice];

    // Clica automaticamente na letra correta
    document.querySelectorAll(".keyboard button").forEach(btn => {
        if (btn.textContent === letra) {
            btn.click();
        }
    });

    // ==== DESATIVAR O BOTÃO ESPECIAL ====
    const botaoEspecial = document.querySelector(".botao-especial");
    if (botaoEspecial) {
        botaoEspecial.disabled = true;
        botaoEspecial.style.opacity = "0.5";
        botaoEspecial.style.cursor = "not-allowed";
        botaoEspecial.style.animation = "none"; // para parar o brilho
    }
}


function tentativa(letra, btn) {
    btn.disabled = true;

    if (palavra.includes(letra)) {
        palavra.split("").forEach((l, i) => {
            if (l === letra) exibicao[i] = letra;
        });

        wordDiv.textContent = exibicao.join(" ");

        if (!exibicao.includes("_")) {
            statusDiv.textContent = "";
            endScreen.className = "end-screen win";
            endScreen.innerHTML = "🎉 Você venceu!";
            endScreen.style.display = "block";
            finalizarJogo();
        }
    } else {
        erros++;
        document.getElementById(partes[erros - 1]).style.display = "block";

        if (erros >= maxErros) {
            statusDiv.textContent = "";
            endScreen.className = "end-screen lose";
            endScreen.innerHTML = `💀 Você perdeu!<br>📌 Palavra correta: <strong>${palavra}</strong>`;
            endScreen.style.display = "block";
            finalizarJogo();
        }
    }
}

function desativarTeclado() {
    document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = true);
}

restartBtn.onclick = escolherPalavra;

window.onload = escolherPalavra;
