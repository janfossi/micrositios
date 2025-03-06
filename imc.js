document.querySelector('#altura').addEventListener('input', calcularIMC);
document.querySelector('#peso').addEventListener('input', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#altura').addEventListener('input', calcularIMC);
document.querySelector('#peso').addEventListener('input', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#altura').addEventListener('input', calcularIMC);
document.querySelector('#peso').addEventListener('input', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#altura').addEventListener('input', calcularIMC);
document.querySelector('#peso').addEventListener('input', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);
document.querySelector('#altura').addEventListener('input', calcularIMC);
document.querySelector('#peso').addEventListener('input', calcularIMC);
document.querySelector('#sexo').addEventListener('change', calcularIMC);

function calcularIMC() {
    const sexo = document.getElementById('sexo').value;
    const unidades = document.getElementById('sexo').value;
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const resultado = document.querySelector('.imc-container .form + div');

    if (!altura || !peso || altura <= 0 || peso <= 0) {
        resultado.innerHTML = '';
        return;
    }

    let alturaMetros = altura;
    let pesoKg = peso;

    if (unidades === 'imperial') {
        alturaMetros = altura * 0.0254;  // pulgadas a metros
        pesoKg = peso * 0.453592; // libras a kg
    } else {
        alturaMetros = altura / 100;  // cm a metros
        pesoKg = peso;
    }

    const imc = pesoKg / (alturaMetros * alturaMetros);
    const imcRedondeado = imc.toFixed(1);
    let rango = '';
    let explicacion = '';

    if (imc < 18.5) {
        rango = 'Bajo peso';
        explicacion = 'Tu peso está por debajo de lo recomendado.';
    } else if (imc >= 18.5 && imc < 24.9) {
        explicacion = 'Tu peso es saludable.';
    } else if (imc >= 25 && imc < 29.9) {
        explicacion = 'Tienes sobrepeso.';
    } else if (imc >= 30 && imc < 34.9) {
        explicacion = 'Presentas obesidad tipo I (moderada).';
    } else if (imc >= 30 && imc < 34.9) {
        explicacion = 'Tienes obesidad grado 1.';
    } else if (imc >= 35 && imc < 39.9) {
        explicacion = 'Tienes obesidad grado 2 (severa).';
    } else {
        explicacion = 'Tienes obesidad grado 3 (mórbida).';
    }

    resultado.innerHTML = `
        <div class="resultado">
            <h3>Tu IMC es: ${imc.toFixed(2)}</h3>
            <p>${explicacion}</p>
        </div>
    `;
}
