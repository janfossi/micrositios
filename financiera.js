function formatoMoneda(valor) {
    return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

document.querySelectorAll('input[name="modo"]').forEach(input => {
    input.addEventListener('change', () => {
        const modo = document.querySelector('input[name="modo"]:checked').value;
        document.getElementById('margen').disabled = (modo === 'precio');
        document.getElementById('precioFinal').disabled = (modo === 'margen');
    });
});

// Inicializa estado por defecto
document.getElementById('precioFinal').disabled = true;

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

    const ivaCredito = compraIVA ? costoNeto * tasaIVA : 0;
    const costoTotal = costoNeto + ivaCredito;

    let resultadoHTML = `<h3>Resultados Financieros</h3><ul>`;

    if (modo === 'margen') {
        const margen = parseFloat(document.getElementById('margen').value);
        if (!margen || margen <= 0 || margen >=100) {
            resultadoHTML += '<li>Introduce un margen válido (entre 0 y 100%).</li>';
        } else {
            const baseCostoCalculo = ventaIVA ? costoNeto : costoTotal;
            const precioVentaNeto = baseCalculo / (1 - (margen / 100));
            const ivaDebito = ventaIVA ? precioVentaNeto * tasaIVA : 0;
            const precioVentaFinal = precioVentaNeto + ivaDebito;

            resultadoHTML += `
                <li><strong>Costo Neto:</strong> ${formatoMoneda(costoNeto)}</li>
                <li><strong>IVA Crédito:</strong> ${formatoMoneda(ivaCredito)}</li>
                <li><strong>Costo Total:</strong> ${formatoMoneda(costoTotal)}</li>
                <li><strong>Precio de Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
                ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
                <li><strong>Precio de Venta Final:</strong> ${formatoMoneda(precioVentaFinal)}</li>`;
    } else {
        const precioFinal = parseFloat(document.getElementById('precioFinal').value);
        const precioVentaNeto = ventaIVA ? precioFinal / (1 + tasaIVA) : precioFinal;
        const ivaDebito = ventaIVA ? precioFinal - precioVentaNeto : 0;
        const baseCalculo = ventaIVA ? costoNeto : costoTotal;
        const margenObtenido = ((precioVentaNeto - baseCalculo) / precioVentaNeto) * 100;

        resultadoHTML += `
            <li><strong>Costo Neto:</strong> ${formatoMoneda(costoNeto)}</li>
            <li><strong>IVA Crédito:</strong> ${formatoMoneda(ivaCredito)}</li>
            <li><strong>Costo total:</strong> ${formatoMoneda(costoTotal)}</li>
            <li><strong>Precio de Venta Neto:</strong> ${formatoMoneda(precioVentaNeto)}</li>
            ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
            <li><strong>Margen obtenido:</strong> ${margenObtenido.toFixed(2)}%</li>
        `;
    }

    const ivaPagar = ivaDebito - ivaCredito;
    resultadoHTML += `
        <li><strong>IVA Crédito:</strong> ${formatoMoneda(ivaCredito)}</li>
        ${ventaIVA ? `<li><strong>IVA Débito:</strong> ${formatoMoneda(ivaDebito)}</li>` : ''}
        <li><strong>IVA a Pagar:</strong> ${formatoMoneda(ivaDebito - ivaCredito)}<br>
            ${ivaDebito - ivaCredito > 0 ? 'Este es el IVA que debes pagar al fisco.' : 'Este valor negativo representa un crédito a tu favor.'}</li>
    </ul>`;

    document.getElementById('resultado').innerHTML = resultadoHTML;
}
