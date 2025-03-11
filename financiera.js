console.log("✅ financiera.js se ha cargado correctamente.");
alert("¡El script financiera.js se ha ejecutado!");


function formatoMoneda(valor) {
    return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

// Función para cambiar el modo entre "margen" y "precio final"
function cambiarModo() {
    const modo = document.querySelector('input[name="modo"]:checked').value;
    document.getElementById('margen').disabled = (modo === 'precio');
    document.getElementById('precioFinal').disabled = (modo === 'margen');

    // Mostrar u ocultar los campos correspondientes
    document.getElementById('contenedorMargen').style.display = (modo === 'margen') ? "block" : "none";
    document.getElementById('contenedorPrecio').style.display = (modo === 'precio') ? "block" : "none";
}

// Inicializa el estado de los inputs
document.addEventListener("DOMContentLoaded", () => {
    cambiarModo();
});

function calcularResultado() {
    const costoNeto = parseFloat(document.getElementById('costoNeto').value);
    const compraIVA = document.getElementById('compraIVA').value === 'si';
    const ventaIVA = document.getElementById('ventaIVA').value === 'si';
    const tasaIVA = parseFloat(document.getElementById('tasaIVA').value) / 100;
    const modo = document.querySelector('input[name="modo"]:checked').value;
    const resultado = document.getElementById('resultado');

    if (!costoNeto || costoNeto <= 0) {
        resultado.innerHTML = "<p>Por favor ingresa un costo neto válido.</p>";
        return;
    }

    // Cálculo de IVA crédito
    const ivaCredito = compraIVA ? costoNeto * tasaIVA : 0;
    const costoTotal = costoNeto + ivaCredito;
    let resultadoHTML = `<h3>Resultados Financieros</h3><ul>`;

    if (modo === 'margen') {
        const margen = parseFloat(document.getElementById('margen').value);
        if (!margen || margen <= 0 || margen >= 100) {
            resultado.innerHTML = "<p>Introduce un margen válido (entre 0 y 100%).</p>";
            return;
        }

        const baseCostoCalculo = ventaIVA ? costoNeto : costoTotal;
        const precioVentaNeto = baseCostoCalculo / (1 - (margen / 100));
        const ivaDebito = ventaIVA ? precioVentaNeto * tasaIVA : 0;
        const precioVentaFinal = precioVentaNeto + ivaDebito;

        resultadoHTML += `
            <li><strong>Costo Neto:</strong> ${formatoMoneda(costoNeto)}</li>
            <li><strong>IVA Crédito:</strong> ${formatoMoneda(ivaCredito)}</li>
            <li><strong>Costo Total:</strong> ${formatoMoneda(costoTotal)}</li>
            <li><strong>Precio de Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
            ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
            <li><strong>Precio de Venta Final:</strong> ${formatoMoneda(precioVentaFinal)}</li>
        `;
    } else {
        const precioFinal = parseFloat(document.getElementById('precioFinal').value);
        if (!precioFinal || precioFinal <= costoTotal) {
            resultado.innerHTML = "<p>El precio final debe ser mayor al costo total.</p>";
            return;
        }

        const precioVentaNeto = ventaIVA ? precioFinal / (1 + tasaIVA) : precioFinal;
        const ivaDebito = ventaIVA ? precioFinal - precioVentaNeto : 0;
        const baseCostoCalculo = ventaIVA ? costoNeto : costoTotal;
        const margenObtenido = ((precioVentaNeto - baseCostoCalculo) / precioVentaNeto) * 100;

        resultadoHTML += `
            <li><strong>Costo Neto:</strong> ${formatoMoneda(costoNeto)}</li>
            <li><strong>IVA Crédito:</strong> ${formatoMoneda(ivaCredito)}</li>
            <li><strong>Costo Total:</strong> ${formatoMoneda(costoTotal)}</li>
            <li><strong>Precio de Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
            ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
            <li><strong>Margen obtenido:</strong> ${margenObtenido.toFixed(2)}%</li>
        `;
    }

    resultadoHTML += `</ul>`;
    resultado.innerHTML = resultadoHTML;
}
