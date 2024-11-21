# Sopa de Letras Interactiva

## Descripción
Este proyecto es una **Sopa de Letras Interactiva** desarrollada en JavaScript. Genera una cuadrícula donde el jugador puede buscar y seleccionar palabras de una lista predefinida. Al seleccionar correctamente una palabra, esta se marca en un color aleatorio y se elimina de la lista de palabras pendientes.

---
## Mejoras Futuras

[ ] Soporte para direcciones inversas (derecha a izquierda o abajo hacia arriba).
[ ] Animaciones al completar una palabra.
[ ] Temporizador para crear un modo de juego contra reloj.
[ ] Integración con bases de datos para cargar listas de palabras dinámicamente.
[ ] Integración de palabras automáticas 
[ ] Cambio automático del Grid según el tamaño de la palabra más grande (si la palabra más larga tiene 10 letras el juego debería se 10x10 mínimo)


---

## Funcionalidades
1. **Generación Automática**:
   - Las palabras de la lista se colocan en la cuadrícula en direcciones horizontal, vertical y diagonal.
   - Los espacios vacíos se llenan con letras aleatorias.

2. **Interacción de Usuario**:
   - Selección de palabras haciendo clic y arrastrando con el ratón.
   - Verificación automática de palabras seleccionadas.
   - Dibujo dinámico de líneas SVG para conectar las letras seleccionadas.

3. **Retroalimentación Visual**:
   - Las palabras encontradas cambian de color en la cuadrícula.
   - Las palabras encontradas se eliminan de la lista visible de palabras.

4. **Colores Aleatorios**:
   - Cada palabra encontrada se resalta con un color generado aleatoriamente.

---

## Estructura de Archivos
. ├── index.html // Archivo HTML para la estructura base del proyecto. ├── styles.css // Archivo CSS para los estilos. └── script.js // Archivo JavaScript que contiene toda la lógica del proyecto.

---

## Código

### `index.html`
```html  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sopa de Letras Interactiva</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="wordsearch" class="wordsearch"></div>
  <ul id="word-list" class="word-list"></ul>
  <script src="script.js"></script>
</body>
</html> 
```

### styles.css
```css
    body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    }

    .wordsearch {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
    position: relative;
    }

    .letter {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    user-select: none;
    }

    .letter.selected {
    background: #ffeb3b;
    }

    .letter.found {
    background: #8bc34a !important;
    color: white;
    }

    .word-list {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    text-align: center;
    }
```

### script. js 
# Sopa de Letras Interactiva

El código completo de `script.js` se encuentra en la sección inicial del proyecto.

---

## Cómo Ejecutar

1. Clona el repositorio o copia los archivos en tu entorno local.
2. Abre el archivo `index.html` en cualquier navegador web.
3. ¡Empieza a buscar palabras en la sopa de letras!

---

## Requisitos Técnicos

- Navegador moderno compatible con ES6+.
- No se necesitan dependencias externas.

---

## Personalización

### Lista de Palabras
Modifica la variable `const words` en `script.js` para cambiar las palabras disponibles en la sopa de letras.

### Tamaño de la Cuadrícula
Cambia el valor de la variable `gridSize` para ajustar las dimensiones de la sopa de letras.

---



# Explicación del Código de la Sopa de Letras Interactiva

Este proyecto genera una sopa de letras interactiva en la que los usuarios pueden buscar palabras. Se compone de un archivo `script.js` que maneja toda la lógica, un archivo HTML (`index.html`) que sirve como estructura base, y un archivo CSS para el diseño.

---

## Componentes Principales del Código

### 1. **Generación de la Sopa de Letras**

#### **`generateWordSearch`**
Esta función genera una cuadrícula de letras (`gridSize x gridSize`) y coloca palabras en posiciones aleatorias.

- **Lógica**:
  - Crea una matriz vacía de `gridSize x gridSize`.
  - Las palabras se colocan en la cuadrícula en posiciones y direcciones aleatorias (horizontal, vertical o diagonal).
  - Rellena los espacios vacíos con letras aleatorias.

#### **`placeWordInGrid`**
Se encarga de colocar una palabra en una posición válida dentro de la cuadrícula.

- **Lógica**:
  - Selecciona una dirección (horizontal, vertical, diagonal) de forma aleatoria.
  - Verifica si hay espacio disponible en la cuadrícula con `canPlaceWord`.
  - Si encuentra un espacio válido, coloca las letras de la palabra.

#### **`canPlaceWord`**
Verifica si una palabra puede colocarse en una posición específica de la cuadrícula sin chocar con otras letras.

---

### 2. **Interfaz Visual**

#### **`renderGrid`**
Renderiza la cuadrícula en el DOM como un conjunto de celdas (`<div>`).

- **Lógica**:
  - Recorre la matriz generada.
  - Crea un elemento `<div>` para cada letra con las coordenadas correspondientes.
  - Asocia eventos (`mousedown`, `mouseover`, `mouseup`) para permitir la interacción del usuario.

#### **`renderWordList`**
Muestra la lista de palabras que el usuario debe buscar.

---

### 3. **Selección de Palabras**

#### **Eventos de Selección**
- `mousedown`: Inicia la selección y dibuja una línea en la dirección seleccionada.
- `mouseover`: Continúa la selección mientras el usuario pasa el ratón sobre las celdas.
- `mouseup`: Finaliza la selección, verifica si las letras seleccionadas forman una palabra válida y marca las palabras encontradas.

#### **`handleMouseDown`**
Registra el inicio de la selección:
- Marca la celda inicial.
- Crea una línea SVG para mostrar la selección.

#### **`handleMouseOver`**
Continúa la selección:
- Agrega las celdas al conjunto de letras seleccionadas.
- Extiende la línea SVG hasta la posición del ratón.

#### **`handleMouseUp`**
Finaliza la selección:
- Compara las letras seleccionadas con la lista de palabras.
- Si coinciden:
  - Cambia el color de la línea y las celdas seleccionadas.
  - Marca la palabra como encontrada y la elimina de la lista de palabras restantes.
- Si no coinciden, elimina la selección y la línea.

---

### 4. **Lógica de Colores y Línea**

#### **`createLine`**
Crea una línea SVG para representar la selección del usuario.

#### **`getRandomColor`**
Genera un color aleatorio que se aplica a las palabras encontradas.

---

### 5. **Inicialización**

#### **`initWordSearch`**
Es la función principal que ejecuta todo el programa:
1. Genera la cuadrícula de la sopa de letras con `generateWordSearch`.
2. Renderiza la cuadrícula en el DOM con `renderGrid`.
3. Muestra la lista de palabras en el DOM con `renderWordList`.

---

## Flujo General del Código

1. Se define una lista de palabras (`const words`) y el tamaño de la cuadrícula (`gridSize`).
2. Se genera la cuadrícula con letras aleatorias y las palabras escondidas.
3. Se renderizan las celdas y la lista de palabras en el navegador.
4. El usuario selecciona letras arrastrando el ratón:
   - Si las letras forman una palabra válida, se marcan con un color aleatorio.
   - Si no forman una palabra, se elimina la selección.
5. El proceso se repite hasta que el usuario encuentre todas las palabras.

---

## Funciones Clave del Proyecto

### Generación de la Sopa
- `generateWordSearch(words, gridSize)`
- `placeWordInGrid(word, grid)`
- `canPlaceWord(word, grid, x, y, direction)`
- `fillEmptySpaces(grid)`

### Renderizado
- `renderGrid(grid)`
- `renderWordList(words)`

### Selección de Letras
- `handleMouseDown(e)`
- `handleMouseOver(e)`
- `handleMouseUp()`

---

## Interactividad

El código utiliza eventos del DOM (`mousedown`, `mouseover`, `mouseup`) para manejar la selección de palabras. Además, se emplean líneas SVG dinámicas para mostrar la selección activa, lo que mejora la experiencia del usuario.

---

## Personalización del Código

### Cambiar Lista de Palabras
Modifica la variable `const words` para definir las palabras que se deben buscar.

### Cambiar Tamaño de la Cuadrícula
Ajusta el valor de la variable `gridSize` para definir las dimensiones de la sopa de letras.

---

## Mejoras Futuras

- **Soporte para palabras en direcciones inversas.**
- **Temporizador para modo contrarreloj.**
- **Puntuación basada en el tiempo o número de intentos.**
- **Compatibilidad con listas de palabras dinámicas (por ejemplo, desde una base de datos).**
- **Animaciones al encontrar palabras.**

---

## Conclusión

Este proyecto es un ejemplo sencillo pero completo de una sopa de letras interactiva, perfecta para practicar habilidades de JavaScript, manipulación del DOM, y uso de gráficos SVG. ¡Disfrútalo y siéntete libre de expandirlo según tus necesidades!

