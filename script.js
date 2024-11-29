const range = document.querySelector('input');
const div = document.querySelector('.imagem');
const yearDisplay = document.getElementById('ano-display');
const yearDisplaySmallScreen = document.getElementById('ano-display-small-screen');
const dataList = document.getElementById('ano-lista');

function gerarSequencia(base, length, formatter = (value) => value) {
    return Array.from({ length }, (_, i) => formatter(base + i));
  }
  
const images = gerarSequencia(2013, 11, (ano) => `./imagens/${ano}.png`); // Carrega as imagens nomeadas de 2013-2023
const anos = gerarSequencia(2013, 11);
  
// Pré carrega as imagens
images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

range.max = images.length - 1;

anos.forEach((year, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.label = year;
      dataList.appendChild(option);
    });

const updateDisplay = (index) => {
      div.innerHTML = `<img src="${images[index]}" alt="imagem" />`;
      yearDisplay.textContent = `ANO: ${anos[index]}`;
      yearDisplaySmallScreen.textContent = anos[index];
    };

// Inicializa com a primeira imagem e ano
updateDisplay(0);

range.addEventListener('input', (e) => {
    updateDisplay(e.target.value);
});