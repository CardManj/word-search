// Palabras para la sopa de letras
const words = ["APPLE", "BANANA", "ORANGE", "GRAPE", "WATERMELON"];
const gridSize = 10; // Tamaño de la cuadrícula (10x10)

// Referencias al DOM
const wordSearchContainer = document.getElementById("wordsearch");
const wordListContainer = document.getElementById("word-list");

// Agregar un contenedor SVG para las líneas
const svgContainer = document.createElement("svg");
svgContainer.setAttribute("id", "svg-lines");
svgContainer.setAttribute("width", "100%");
svgContainer.setAttribute("height", "100%");
svgContainer.style.position = "absolute";
svgContainer.style.top = "0";
svgContainer.style.left = "0";
svgContainer.style.pointerEvents = "none";
document.body.appendChild(svgContainer);

// Variables para la selección
let selectedLetters = [];
let isMouseDown = false;
let startX = 0;
let startY = 0;
let currentLine = null;

// Generar la sopa de letras
function generateWordSearch(words, gridSize) {
  const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("")
  );

  // Colocar palabras en la cuadrícula
  words.forEach((word) => {
    placeWordInGrid(word, grid);
  });

  // Rellenar la cuadrícula con letras aleatorias
  fillEmptySpaces(grid);

  return grid;
}

// Colocar una palabra en la cuadrícula
function placeWordInGrid(word, grid) {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal
  ];

  let placed = false;

  while (!placed) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const startX = Math.floor(Math.random() * gridSize);
    const startY = Math.floor(Math.random() * gridSize);

    if (canPlaceWord(word, grid, startX, startY, direction)) {
      for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction[0];
        const y = startY + i * direction[1];
        grid[x][y] = word[i];
      }
      placed = true;
    }
  }
}

// Verificar si se puede colocar una palabra en la cuadrícula
function canPlaceWord(word, grid, x, y, direction) {
  for (let i = 0; i < word.length; i++) {
    const newX = x + i * direction[0];
    const newY = y + i * direction[1];

    if (
      newX < 0 ||
      newX >= gridSize ||
      newY < 0 ||
      newY >= gridSize ||
      (grid[newX][newY] !== "" && grid[newX][newY] !== word[i])
    ) {
      return false;
    }
  }
  return true;
}

// Rellenar los espacios vacíos con letras aleatorias
function fillEmptySpaces(grid) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
}

// Renderizar la cuadrícula en el DOM
function renderGrid(grid) {
  wordSearchContainer.innerHTML = "";

  grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      const cell = document.createElement("div");
      cell.className = "letter";
      cell.textContent = letter;
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      // Agregar eventos para la selección de letras
      cell.addEventListener("mousedown", handleMouseDown);
      cell.addEventListener("mouseover", handleMouseOver);
      cell.addEventListener("mouseup", handleMouseUp);

      wordSearchContainer.appendChild(cell);
    });
  });
}

// Renderizar la lista de palabras
function renderWordList(words) {
  words.forEach((word) => {
    const listItem = document.createElement("li");
    listItem.textContent = word;
    wordListContainer.appendChild(listItem);
  });
}

// Crear una línea SVG
function createLine(x1, y1, x2, y2, color) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "10");
  svgContainer.appendChild(line);
  return line;
}

// Generar un color aleatorio
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Manejadores de eventos para la selección
function handleMouseDown(e) {
  isMouseDown = true;
  const cell = e.target;
  selectedLetters.push(cell);
  cell.classList.add("selected");

  const rect = cell.getBoundingClientRect();
  startX = rect.left + rect.width / 2;
  startY = rect.top + rect.height / 2;

  currentLine = createLine(startX, startY, startX, startY, "black");
}

function handleMouseOver(e) {
  if (isMouseDown) {
    const cell = e.target;
    if (!selectedLetters.includes(cell)) {
      selectedLetters.push(cell);
      cell.classList.add("selected");

      const rect = cell.getBoundingClientRect();
      const endX = rect.left + rect.width / 2;
      const endY = rect.top + rect.height / 2;

      if (currentLine) {
        currentLine.setAttribute("x2", endX);
        currentLine.setAttribute("y2", endY);
      }
    }
  }
}

function handleMouseUp() {
  isMouseDown = false;

  // Verificar si la selección forma una palabra
  const selectedWord = selectedLetters
    .map((cell) => cell.textContent)
    .join("");

  const reversedWord = selectedLetters
    .map((cell) => cell.textContent)
    .reverse()
    .join("");

  if (words.includes(selectedWord) || words.includes(reversedWord)) {
    // Cambiar el color de la línea y las letras seleccionadas
    const color = getRandomColor();
    selectedLetters.forEach((cell) => {
      cell.classList.add("found");
      cell.style.backgroundColor = color;
    });

    if (currentLine) {
      currentLine.setAttribute("stroke", color);
    }

    // Eliminar la palabra de la lista
    const wordIndex = words.indexOf(selectedWord);
    if (wordIndex !== -1) words.splice(wordIndex, 1);

    const reversedIndex = words.indexOf(reversedWord);
    if (reversedIndex !== -1) words.splice(reversedIndex, 1);

    updateWordList();
  } else {
    // Eliminar la línea si no forma una palabra
    if (currentLine) {
      svgContainer.removeChild(currentLine);
    }
  }

  // Limpiar selección
  selectedLetters.forEach((cell) => cell.classList.remove("selected"));
  selectedLetters = [];
  currentLine = null;
}

// Actualizar la lista de palabras en el DOM
function updateWordList() {
  wordListContainer.innerHTML = "";
  renderWordList(words);
}

// Inicializar la sopa de letras
function initWordSearch() {
  const grid = generateWordSearch(words, gridSize);
  renderGrid(grid);
  renderWordList(words);
}

// Ejecutar la sopa de letras
initWordSearch();
