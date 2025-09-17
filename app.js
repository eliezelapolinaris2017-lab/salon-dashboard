// app.js

// ==================== Exportación ====================
function exportTableToExcel(tableID, filename = '') {
    const table = document.getElementById(tableID);
    const wb = XLSX.utils.table_to_book(table, { sheet: "Hoja1" });
    XLSX.writeFile(wb, filename ? filename + '.xlsx' : 'reporte.xlsx');
}

function exportTableToPDF(tableID, filename = '') {
    const element = document.getElementById(tableID);
    const opt = {
        margin:       0.5,
        filename:     filename ? filename + '.pdf' : 'reporte.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
}

// ==================== Filtros ====================
function filtrarTabla() {
    const fechaFiltro = document.getElementById("filtroFecha").value;
    const horaFiltro = document.getElementById("filtroHora").value;
    const tecnicaFiltro = document.getElementById("filtroTecnica").value.toLowerCase();

    const filas = document.querySelectorAll("#tablaHistorial tbody tr");

    filas.forEach(fila => {
        const fecha = fila.querySelector(".col-fecha").textContent;
        const hora = fila.querySelector(".col-hora").textContent;
        const tecnica = fila.querySelector(".col-tecnica").textContent.toLowerCase();

        let mostrar = true;

        if (fechaFiltro && fecha !== fechaFiltro) {
            mostrar = false;
        }
        if (horaFiltro && hora !== horaFiltro) {
            mostrar = false;
        }
        if (tecnicaFiltro && !tecnica.includes(tecnicaFiltro)) {
            mostrar = false;
        }

        fila.style.display = mostrar ? "" : "none";
    });
}

// ==================== Inicialización ====================
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnExcel").addEventListener("click", () => {
        exportTableToExcel("tablaHistorial", "historial_cobros");
    });

    document.getElementById("btnPDF").addEventListener("click", () => {
        exportTableToPDF("tablaHistorial", "historial_cobros");
    });

    document.getElementById("filtroFecha").addEventListener("change", filtrarTabla);
    document.getElementById("filtroHora").addEventListener("change", filtrarTabla);
    document.getElementById("filtroTecnica").addEventListener("keyup", filtrarTabla);
});
