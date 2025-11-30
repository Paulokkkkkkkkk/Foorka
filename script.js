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


function escolherPalavra() {
palavra = palavras[Math.floor(Math.random() * palavras.length)];
exibicao = Array(palavra.length).fill("_");
wordDiv.textContent = exibicao.join(" ");
erros = 0;
statusDiv.textContent = "";


document.querySelectorAll(".part").forEach(p => (p.style.display = "none"));


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
desativarTeclado();
}
} else {
erros++;
document.getElementById(partes[erros - 1]).style.display = "block";


if (erros >= maxErros) {
statusDiv.textContent = `💀 Você perdeu! A palavra era: ${palavra}`;
desativarTeclado();
}
}
}


function desativarTeclado() {
document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = true);
}


restartBtn.onclick = escolherPalavra;


window.onload = escolherPalavra;