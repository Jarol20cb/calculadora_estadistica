// Obtener elementos del DOM
const numerosInput = document.getElementById('numeros');
const calcularBtn = document.getElementById('calcular');
const mediaSpan = document.getElementById('media');
const medianaSpan = document.getElementById('mediana');
const modaSpan = document.getElementById('moda');
const errorSpan = document.getElementById('error');

// Función para calcular la media
function calcularMedia(numeros) {
  const sum = numeros.reduce((a, b) => a + b, 0);
  return sum / numeros.length;
}

// Función para calcular la mediana
function calcularMediana(numeros) {
  const sorted = numeros.sort((a, b) => a - b);
  const middle = Math.floor(numeros.length / 2);

  if (numeros.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}

// Función para calcular la moda
function calcularModa(numeros) {
  const counts = {};
  let maxCount = 0;
  let moda = null;

  numeros.forEach(num => {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }

    if (counts[num] > maxCount) {
      maxCount = counts[num];
      moda = num;
    }
  });

  return moda;
}

// Función para calcular el coeficiente de variación
function calcularCoeficienteVariacion(numeros) {
  const media = calcularMedia(numeros);
  const desviacion = Math.sqrt(numeros.reduce((sum, x) => sum + Math.pow(x - media, 2), 0) / numeros.length);
  return (desviacion / media) * 100;
}

function mostrarResultados(media, mediana, moda, coeficienteVariacion) {
  mediaSpan.textContent = media.toFixed(2);
  medianaSpan.textContent = mediana.toFixed(2);
  modaSpan.textContent = moda;
  if (isNaN(coeficienteVariacion)) {
    errorSpan.textContent = 'No se puede calcular el coeficiente de variación';
  } else {
    errorSpan.textContent = 'El coeficiente de variación es ' + coeficienteVariacion.toFixed(2) + '%';
  }
}


// Función para manejar el click del botón "Calcular"
function handleCalcular() {
  const numeros = numerosInput.value.split(',').map(num => parseFloat(num.trim()));

  if (numeros.some(isNaN)) {
    errorSpan.textContent = 'Ingrese números válidos separados por coma';
  } else {
    const media = calcularMedia(numeros);
    const mediana = calcularMediana(numeros);
    const moda = calcularModa(numeros);
    const coeficienteVariacion = calcularCoeficienteVariacion(numeros);
    mostrarResultados(media, mediana, moda, coeficienteVariacion);
  }
}

// Event listeners
calcularBtn.addEventListener('click', handleCalcular);
