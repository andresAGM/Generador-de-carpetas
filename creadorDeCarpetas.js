const ExcelJS = require('exceljs');
const fs = require('fs-extra');
const path = require('path');

// Ruta del archivo Excel
let ruta_archivo = "archivo_excel/pruebanombres.xlsx";

async function crearCarpetasDesdeExcel() {
    try {
        // Leer el archivo Excel
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(ruta_archivo);
        const sheet = workbook.worksheets[0]; // Obtener la primera hoja

        // Contador y lista para los nombres de las carpetas
        let carpetasCreadas = 0;
        const nombresCarpetas = [];
        const nombresDuplicados = [];

        // Crear un array de promesas
        const promesas = [];

        // Iterar sobre las filas de la hoja
        sheet.eachRow({ includeEmpty: false }, (fila, rowIndex) => {
            // Ignorar la primera fila (encabezados)
            if (rowIndex === 1) return;

            const nombre = fila.getCell(1).value; // Obtener el valor de la primera celda
            const nombreTrimmed = nombre ? nombre.toString().trim() : '';

            // Verificar que el nombre no esté vacío
            if (nombreTrimmed) {
                const rutaCarpeta = path.join('carpetas', nombreTrimmed);

                // Crear una promesa para la creación de la carpeta
                const promesa = (async () => {
                    // Verificar si la carpeta ya existe
                    if (await fs.pathExists(rutaCarpeta)) {
                        console.warn(`La carpeta "${nombreTrimmed}" ya existe.`);
                        nombresDuplicados.push(nombreTrimmed);
                    } else {
                        // Crear la carpeta
                        await fs.mkdirp(rutaCarpeta); // mkdirp es asíncrono
                        console.log(`Carpeta creada: "${nombreTrimmed}"`);
                        carpetasCreadas++;
                        nombresCarpetas.push(nombreTrimmed);
                    }
                })();

                // Agregar la promesa al array
                promesas.push(promesa);
            } else {
                console.warn('Nombre vacío, no se creará carpeta.');
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promesas);

        // Resumen de la ejecución
        console.log(`\nResumen de la ejecución:`);
        console.log(`Total de carpetas creadas: ${carpetasCreadas}`);
        console.log(`Nombres de las carpetas creadas: ${nombresCarpetas.join(', ')}`);
        
        if (nombresDuplicados.length > 0) {
            console.log(`Carpetas duplicadas: ${nombresDuplicados.join(', ')}`);
        }

        console.log('Ejecución completada correctamente.');
        
    } catch (error) {
        console.error("Error al procesar el archivo Excel:", error);
    }
}

// Ejecutar la función
crearCarpetasDesdeExcel();
