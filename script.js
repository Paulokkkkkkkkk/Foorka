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
    { palavra: "QUIROPRAXISTA", dica: "Profissional que alinha a coluna"},
    { palavra: "CARIOCA", dica: "Pessoa que mora no RJ"},
    { palavra: "ANIME", dica: "Animações Japonesas"},
    { palavra: "MICROSOFT", dica: "Empresa criadora do Windows" },
    { palavra: "CANETA", dica: "É usada pra escrever"},
    { palavra: "MUNDIAL", dica: "Coisa que o palmeiras não tem"},
    { palavra: "CRIPTOGRAFIA", dica: "Técnica de proteger dados por códigos" },
    { palavra: "CLOROFILA", dica: "Pigmento verde das plantas" },
    { palavra: "DOWNLOAD", dica: "Baixar arquivos da internet" },
    { palavra: "CICLOPE", dica: "Criatura mitológica de um olho só" },
    { palavra: "SATURAR", dica: "Encher até o limite" },
    { palavra: "INTRIGANTE", dica: "Desperta curiosidade ou mistério" },
    { palavra: "PIXEL", dica: "Menor unidade de uma imagem digital" },
    { palavra: "ALGORITMO", dica: "Um sistema que decide o que você vê" },
    { palavra: "FENOMENAL", dica: "Extraordinário, impressionante" },
    { palavra: "MAGNETISMO", dica: "Força de atração e repulsão de ímãs" },
    { palavra: "VERIFICADO", dica: "Conta oficial marcada com selo especial" },
    { palavra: "ANFITRIAO", dica: "Quem recebe convidados em casa ou eventos" },
    { palavra: "WINDOWS", dica: "Sistema operacional muito usado no mundo" },
    { palavra: "ENGENHEIRO", dica: "Profissional que cria e projeta soluções técnicas" },
    { palavra: "SOFTWARE", dica: "Programas que rodam no computador" },
    { palavra: "GUEPARDO", dica: "Animal mais rápido do mundo" },
    { palavra: "LASANHA", dica: "Prato feito com camadas e molho" },
    { palavra: "BATERIA", dica: "Fonte de energia portátil" },
    { palavra: "GUACAMOLE", dica: "Pastosa mexicana feita de abacate" },
    { palavra: "MACARRONADA", dica: "Prato italiano com massa" },
    { palavra: "GRAVIDADE", dica: "Força que mantém tudo no chão" },
    { palavra: "MOUSE", dica: "Dispositivo para controlar o cursor" },
    { palavra: "ANTARTIDA", dica: "Maior deserto do mundo" },
    { palavra: "WALLYSON", dica: "É um professor do CETI Artur" },
    { palavra: "ADMINISTRADOR", dica: "Gerencia equipes e empresas" },
    { palavra: "BACALHAU", dica: "Peixe muito usado na culinária portuguesa" },
    { palavra: "CROISSANT", dica: "Pão francês leve e amanteigado" },
    { palavra: "DRIFT", dica: "Condução controlada com derrapagens" },
    { palavra: "HORIZONTE", dica: "Linha aparente que separa céu e terra" },
    { palavra: "TERREMOTO", dica: "Movimento brusco da crosta terrestre" },
    { palavra: "SKATE", dica: "Esporte com manobras em prancha" },
    { palavra: "TYKE", dica: "Nome do filho do Spike (tom e jerry)" },
    { palavra: "GARFIELD", dica: "Gato preguiçoso que ama lasanha" },
    { palavra: "GOHAN", dica: "Filho mais velho do Goku (Dragon ball)" },
    { palavra: "SERTANEJO", dica: "Gênero musical mais ouvido no Brasil" },
    { palavra: "VATICANO", dica: "Menor país do mundo" },
    { palavra: "LICHIA", dica: "Fruta avermelhada, por dentro branca" },
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
    document.querySelectorAll("#keyboard button").forEach(btn => {
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
        botaoEspecial.style.animation = "none";
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
    document.querySelectorAll("#keyboard button").forEach(btn => btn.disabled = true);
}

restartBtn.onclick = escolherPalavra;


/* ============================================================
   ===== SUPORTE AO TECLADO FÍSICO (A–Z + ESPAÇO + ENTER) =====
   ============================================================ */
document.addEventListener("keydown", (event) => {
    // ENTER → Recomeçar se o jogo terminou
    if ((event.key === "Enter") && endScreen.style.display === "block") {
        restartBtn.click();
        return;
    }

    let tecla = event.key.toUpperCase();

    // Detecta letras
    if (/^[A-Z]$/.test(tecla)) {
        const botoes = document.querySelectorAll("#keyboard button");
        botoes.forEach(btn => {
            if (btn.textContent === tecla && !btn.disabled) {
                btn.click();
            }
        });
    }

    // Tecla ESPAÇO → Botão especial
    if (event.code === "Space") {
        event.preventDefault();
        const botaoEspecial = document.querySelector(".botao-especial");
        if (botaoEspecial && !botaoEspecial.disabled) {
            botaoEspecial.click();
        }
    }
});

window.onload = escolherPalavra;
