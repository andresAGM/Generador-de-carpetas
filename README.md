# Crear carpetas desde un archivo Excel
Este proyecto permite crear carpetas en el sistema de archivos basándose en los nombres extraídos de un archivo Excel. A continuación, se detallan los pasos para configurar y ejecutar el código.

## Instala las dependencias necesarias

```
npm install exceljs fs-extra
```

## Crea una carpeta para el archivo Excel

```cmd
mkdir archivo_excel
```

## Crea una carpeta donde se crearán las nuevas carpetas

```cmd
mkdir carpetas
```

Coloca tu archivo Excel en la carpeta <code>archivo_excel</code>. Asegúrate de cambiar el nombre del archivo en la ruta que define <code>ruta_archivo</code>

```javascript
let ruta_archivo = "archivo_excel/pruebanombres.xlsx";
```

Asegúrate de que la carpeta donde se crearán las carpetas esté correctamente definida en el código. 

```javascript
const rutaCarpeta = path.join('carpetas', nombreTrimmed);
```

Finalmente ejecuta el codigo

```cmd
node tu_archivo.js
```
