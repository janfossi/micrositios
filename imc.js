function calcularIMC() {
    const sexo = document.getElementById('sexo').value;
    const unidades = document.getElementById('unidades').value;
    let altura = parseFloat(document.getElementById('altura').value);
    let peso = parseFloat(document.getElementById('peso').value);
    const resultado = document.querySelector('.resultado');

    if (!altura || !peso) {
        resultado.innerHTML = "<p>Ingresa altura y peso válidos.</p>";
        return;
    }

    // Conversión a sistema métrico si es imperial
    if (unidades === 'imperial') {
        altura = altura * 0.0254;  // pulgadas a metros
        peso = peso * 0.453592; // libras a kg
    } else {
        altura = altura / 100; // centímetros a metros
    }

    const imc = peso / (altura * altura);
    let estado = '';
    let explicacion = '';

    if (imc < 18.5) {
        rango = 'Bajo peso';
        explicacion = 'Tu peso está por debajo del recomendado. Considera mejorar tu alimentación.';
    } else if (imc >= 18.5 && imc < 24.9) {
        rango = 'Peso saludable';
        explicacion = '¡Excelente! Mantienes un peso saludable.';
    } else if (imc >= 25 && imc < 29.9) {
        rango = 'Sobrepeso';
        explicacion = 'Tienes algo de sobrepeso. Un poco de actividad física te ayudaría.';
    } else if (imc >= 30 && imc < 34.9) {
        rango = 'Obesidad grado 1';
        explicacion = 'Tienes obesidad grado 1. Considera asesoría nutricional.';
    } else if (imc >= 35 && imc < 39.9) {
        rango = 'Obesidad grado 2';
        explicacion = 'Obesidad grado 2 (severa). Te recomiendo consultar un especialista.';
    } else {
        rango = 'Obesidad grado 3';
        explicacion = 'Obesidad grado 3 (mórbida). Es importante que busques ayuda médica profesional.';
    }

    document.querySelector('.resultado').innerHTML = `
        <h3>Tu IMC es: ${imc.toFixed(2)}</h3>
        <p><strong>Rango:</strong> ${rango}</p>
        <p>${explicacion}</p>
    `;
}

// Eventos automáticos al cambiar valores
document.querySelectorAll('#sexo, #unidades, #altura, #peso').forEach(input => {
    input.addEventListener('input', calcularIMC);
});
