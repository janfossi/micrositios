function formatoMoneda(valor) {
    return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

function calcularResultado() {
    const costoNeto = parseFloat(document.getElementById('costoNeto').value);
    const compraIVA = document.getElementById('compraIVA').value === 'si';
    const ventaIVA = document.getElementById('ventaIVA').value === 'si';
    const tasaIVA = 0.19; // Puedes ajustar esto dinámicamente si lo deseas.

    if (!costoNeto || costoNeto <= 0) {
        alert("Por favor ingresa un costo neto válido.");
        return;
    }

    const ivaCredito = compraIVA ? costoNeto * tasaIVA : 0;
    const costoTotal = costoNeto + ivaCredito;

    const modo = document.querySelector('input[name="modo"]:checked').value;
    let resultadoHTML = '';

    if (modo === 'margen') {
        // Calcular Precio usando margen
        const margen = parseFloat(document.getElementById('margen').value);
        if (!margen || margen <= 0 || margen >= 100) {
            alert("Ingresa un margen válido entre 1 y 99%");
            return;
        }

        const baseCalculo = ventaIVA ? costoNeto : costoTotal;
        const precioVentaNeto = baseCalculo / (1 - (margen / 100));
        const ivaDebito = ventaIVA ? precioVentaNeto * tasaIVA : 0;
        const precioVentaFinal = precioVentaNeto + ivaDebito;

        resultadoHTML = `
            <ul>
                <li><strong>Costo Neto:</strong> ${formatoMoneda(costoNeto)}</li>
                <li><strong>IVA Crédito (IVA soportado):</strong> ${formatoMoneda(ivaCredito)}</li>
                <li><strong>Costo total:</strong> ${formatoMoneda(costoTotal)}</li>
                <li><strong>Precio de Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
        `;

        if (ventaIVA) {
            resultadoHTML += `
                <li><strong>IVA Débito (IVA cobrado):</strong> ${formatoMoneda(ivaDebito)}</li>
                <li><strong>Precio final con IVA:</strong> ${formatoMoneda(precioVentaFinal)}</li>
            `;
        } else {
            resultadoHTML += `<li><strong>Precio de Venta Exento:</strong> ${formatoMoneda(precioVentaNeto)}</li>`;
        }

    } else { // modo precio final
        const precioFinal = parseFloat(document.getElementById('precioFinal').value);
        
        if (!precioFinal || precioFinal <= costoTotal) {
            document.getElementById('resultado').innerHTML = '<p>El precio final debe ser mayor al costo total.</p>';
            return;
        }

        const precioVentaNeto = ventaIVA ? precioFinal / (1 + tasaIVA) : precioFinal;
        const ivaDebito = ventaIVA ? precioFinal - precioVentaNeto : 0;
        const baseCalculo = ventaIVA ? costoNeto : costoTotal;
        const margenObtenido = ((precioVentaNeto - baseCalculo) / precioVentaNeto) * 100;

        resultadoHTML = `
            <ul>
                <li><strong>Costo total:</strong> ${formatoMoneda(costoTotal)}</li>
                <li><strong>Precio Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
                ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
                <li><strong>Margen obtenido:</strong> ${margenObtenido.toFixed(2)}%</li>
        `;
    }

    // Obligación tributaria (IVA a pagar)
    const ivaPagar = ivaDebito - ivaCredito;
    let explicacionTributaria = '';

    if (ivaDebito > ivaCredito) {
        explicacion = `Debes pagar ${formatoMoneda(ivaDebito - ivaCredito)} al fisco.`;
    } else if (ivaDebito < ivaCredito) {
        explicacionTributaria = 'Tienes un crédito fiscal de IVA (más IVA soportado que cobrado), podrás usarlo en el futuro.';
    } else {
        explicacionTributaria = 'Tu IVA débito y crédito son iguales, no debes pagar IVA ni tienes crédito.';
    }

    resultadoHTML += `
        <li><strong>IVA Crédito (IVA soportado en compra):</strong> ${formatoMoneda(ivaCredito)}</li>
        <li><strong>IVA Débito (IVA de la venta):</strong> ${formatoMoneda(ivaDebito)}</li>
        <li><strong>Obligación tributaria:</strong> ${explicacionTributaria}</li>
    </ul>`;

    document.getElementById('resultado').innerHTML = resultadoHTML;
}

// Eventos para cambiar modo
document.querySelectorAll('input[name="modo"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.getElementById('resultado').innerHTML = '';
        document.getElementById('precioFinal').value = '';
        document.getElementById('margen').value = '';
        if (document.querySelector('input[name="modo"]:checked').value === 'precio') {
            document.getElementById('precioFinal').disabled = false;
            document.getElementById('margen').disabled = true;
        } else {
            document.getElementById('precioFinal').disabled = true;
            document.getElementById('margen').disabled = false;
        }
    });

// Inicialización al cargar la página
window.onload = () => {
    document.getElementById('precioFinal').disabled = true; // Por defecto margen activado
};
