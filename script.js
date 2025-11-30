const palavras = [
    { palavra: "ABACAXI", dica: "Fruta com o nome de uma marca" },
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
    { palavra: "ORUM", dica: "Mundo espiritual, morada dos orixás"},
    { palavra: "QUIROPRAXISTA", dica: "Profissional que alinha a coluna"},
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
