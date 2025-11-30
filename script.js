const palavras = ["ABACAXI", "LIVRO", "MELANCIA", "COMPUTADOR", "ESCOLA", "GATO", "BRASIL"];
let palavra = "";
let exibicao = [];
let erros = 0;
const maxErros = 6;


const wordDiv = document.getElementById("word");
const statusDiv = document.getElementById("status");
const keyboardDiv = document.getElementById("keyboard");
const restartBtn = document.getElementById("restart");


const partes = ["head", "body", "armL", "armR", "legL", "legR"]; // ordem


// ===== CONTROLE DE MÚSICA (NOVO CÓDIGO) =====

const musicaFundo = document.getElementById("musica-fundo");
const botaoSom = document.getElementById("botaoSom");
const iconeSom = botaoSom.querySelector('i');

// O estado inicial é MUDO, porque a música não pode tocar sem interação.
let estaTocando = false; 

// Inicializa o ícone como MUDO
iconeSom.classList.remove('fa-volume-high');
iconeSom.classList.add('fa-volume-xmark'); 


function toggleMusica() {
    if (estaTocando) {
        // Pausa a música
        musicaFundo.pause();
        iconeSom.classList.remove('fa-volume-high');
        iconeSom.classList.add('fa-volume-xmark'); 
        estaTocando = false;
    } else {
        // Tenta iniciar a música
        musicaFundo.play().catch(error => {
            console.log("Música não iniciada. Erro: ", error);
        });
        iconeSom.classList.remove('fa-volume-xmark');
        iconeSom.classList.add('fa-volume-high'); 
        estaTocando = true;
    }
}

// Adiciona o listener de clique ao botão
botaoSom.addEventListener('click', toggleMusica);

// Fim do controle de música
// ===========================================


/**
 * Função chamada ao final do jogo (vitória ou derrota).
 * Desativa o teclado e mostra o botão de Recomeçar.
 */
function finalizarJogo() {
    desativarTeclado();
    // MOSTRA o botão de recomeçar
    restartBtn.style.display = "block";
}


function escolherPalavra() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    exibicao = Array(palavra.length).fill("_");
    wordDiv.textContent = exibicao.join(" ");
    erros = 0;
    statusDiv.textContent = "";

    document.querySelectorAll(".part").forEach(p => (p.style.display = "none"));

    // Esconde o botão de recomeçar ao iniciar/recomeçar o jogo
    restartBtn.style.display = "none"; 

    gerarTeclado();
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
            statusDiv.textContent = "🎉 Você venceu!";
            // CHAMAR A NOVA FUNÇÃO AQUI PARA VITÓRIA
            finalizarJogo(); 
        }
    } else {
        erros++;
        document.getElementById(partes[erros - 1]).style.display = "block";

        if (erros >= maxErros) {
            statusDiv.textContent = `💀 Você perdeu! A palavra era: ${palavra}`;
            // CHAMAR A NOVA FUNÇÃO AQUI PARA DERROTA
            finalizarJogo(); 
        }
    }
}


function desativarTeclado() {
    document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = true);
}


restartBtn.onclick = escolherPalavra;


window.onload = escolherPalavra;