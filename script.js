const range = document.querySelector('input');
const div = document.querySelector('.imagem');
const imgElement = div.querySelector('img');
const anoDisplaySmallScreen = document.getElementById('ano-display-small-screen');
const dataList = document.getElementById('ano-lista');

function gerarSequencia(base, length, formatter = (value) => value) {
  return Array.from({ length }, (_, i) => formatter(base + i));
}

const images = gerarSequencia(2013, 11, (ano) => `./imagens/${ano}.png`); // Carrega as imagens nomeadas de 2013-2023
const anos = gerarSequencia(2013, 11);

// Pré-carrega as imagens
const imagensPreCarregadas = {};
images.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  imagensPreCarregadas[index] = img;
});

range.max = images.length - 1;

anos.forEach((ano, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.label = ano;
  dataList.appendChild(option);
});

const updateImagemDisplay = (index) => {
  const novaImagem = imagensPreCarregadas[index];
  if (imgElement.src !== novaImagem.src) {
    div.classList.add('loading'); // Adiciona blur
    imgElement.src = novaImagem.src;
    imgElement.onload = () => {
      div.classList.remove('loading'); // Remove blur após imagem carregar por completo
    };
  }
  anoDisplaySmallScreen.textContent = anos[index];
};

updateImagemDisplay(0);

range.addEventListener('input', (e) => {
  updateImagemDisplay(e.target.value);
});