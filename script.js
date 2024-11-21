// Palabras para la sopa de letras
const words = ["APPLE", "BANANA", "ORANGE", "GRAPE", "WATERMELON", "PEAR", "CHERRY", "PINEAPPLE","MANGO"];
const gridSize = 10; // Tamaño de la cuadrícula (10x10)

// Referencias al DOM
const wordSearchContainer = document.getElementById("wordsearch");
const wordListContainer = document.getElementById("word-list");


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


// Generar un color aleatorio a la selección
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


    // Eliminar la palabra de la lista
  // Verifica si la palabra seleccionada está en la lista
  const wordIndex = words.indexOf(selectedWord);
  if (wordIndex !== -1) {
    // Aplicar el estilo de tachado a la palabra encontrada en la lista
    const listItems = wordListContainer.querySelectorAll("li");
    
    listItems.forEach((item) => {
      if (item.textContent === selectedWord) {
        item.style.color = color; // Cambiar color de la palabra
        item.style.textDecoration = "underline"; // Tachado
      }
    });
  }}

  // Verifica si la palabra invertida está en la lista
  const reversedIndex = words.indexOf(reversedWord);
  if (reversedIndex !== -1) {
    // Aplicar el estilo de tachado a la palabra encontrada en la lista
    const listItems = wordListContainer.querySelectorAll("li");

    listItems.forEach((item) => {
      if (item.textContent === reversedWord) {
        item.style.textDecoration = "line-through"; // Tachado
      }
    });
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
