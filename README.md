# Visual Regression Testing usando Resemble and Backstop 



# Pasos para poder usar la herramienta de comparacion creada con ResembleJs

### Prerequisitos
- Estar en un directorió donde desee trabajar. 
- Descargar nodeJs en la versión v12.16.1 , descargar según sistema operativo [Node](https://nodejs.org/es/download/).  
- Clonar repo : git clone https://github.com/pruebas-miso/vrt.git.
- El analizador en ResembleJS se debe ejecutar desde Sistemas Operativos basados en Linux.
- Si se tiene una instancia recien instalada de Ghost, se debe configurar el aplicativo para que habilite el menú de Members. Para ello se debe ir a la opción Labs del panel de configuración de Ghost (http://localhost:2368/ghost/#/settings/labs) y habilitar la opción Members.

### Pasos para usar la herramienta
- Entrar a la carpeta analizador-resemble : cd analizador-resemble. 
- Instalar dependecias : npm install.

- Ingresar en el archivo config.json para ajustar los valores de :
  * functionalities : nombre del folder dentro de analizador-resemble>results que la herramienta va a analizar.

- Crear nombre del folder que se definio en el paso anterior dentro de: config.json>functionalities.
    * Crear un folder con la version 3.3.0 : Dentro de este folder deben de poner todas las imagenes que se tomaron para la version: 3.3.0.
    * Crear un folder con la version 3.42.5 : Dentro de este folder deben de poner todas las imagenes que se tomaron para la version: 3.42.5.

- Ejecutar las pruebas : 
```
node index.js
```
# Pasos para poder usar la herramienta de comparacion creada con BackstopJs

### Prerequisitos
- Estar en un directorió donde desee trabajar. 
- Descargar nodeJs en la versión v12.16.1 , descargar según sistema operativo [Node](https://nodejs.org/es/download/).  
- Clonar repo : git clone https://github.com/pruebas-miso/vrt.git.

### Pasos para usar la herramienta

- Entrar a la carpeta analizador-resemble : cd analizador-backstopjs. 
- Instalar dependecias : npm install.
- Ejecutar el comando backstop test


### Resulados de las pruebas : 


- Dentro del folder que se definio con el nombre dentro de: config.json>functionalities, automaticamente se generaran dos folders nuevos:

    * Compare: Este folder contiene los resultados de las imagenes comparadas unoVsUno dentro de los folders : 3.3.0 y 3.42.5
    * results>html: se genera un folder con el timeStamp de la ejecucion de las pruebas
        index.html: archivo que muestra la comparacion de cada una de las imagenes y los resultados
        
**************************
# Enlaces de interes:

Para ejecutar las pruebas correspondientes a: 
1. Pruebas de reconocimiento / MONKEYS, vaya a este [Link](https://github.com/pruebas-miso/monkeys)
2. Pruebas de reconocimiento / Rippers, vaya a este [Link](https://github.com/pruebas-miso/rippers)
3. Pruebas de extremo a extremo, vaya a este [Link](https://github.com/pruebas-miso/ghost-cypress-e2e/tree/v3.42.5)
4. Pruebas de regresión visual, vaya a este [Link](https://github.com/pruebas-miso/vrt)
5. Escenarios de validación de datos, vaya a este [Link](https://github.com/pruebas-miso/ghost-cypress-e2e/tree/v3.42.5)

**************************
A continuación se encuentran los enlaces para:
1. [Estrategia de pruebas](https://github.com/pruebas-miso/monkeys/raw/main/results/2021-05-26%20-%20ESTRATEGIA%20DE%20PRUEBAS%20DE%20GHOST%20-%20PRESUPUESTO%20FINAL.docx)
2. [Inventario de pruebas manuales](https://github.com/pruebas-miso/monkeys/raw/main/results/Inventario%20Pruebas%20Manuales%20Ghost%20Entrega%20Final.xlsx)
3. [Video descriptivo (estrategia, resultados, analisis y limitaciones)](https://youtu.be/6UDmNYdJdlE)
4. [Registro de las 20 incidencias](https://github.com/pruebas-miso/vrt/issues)
