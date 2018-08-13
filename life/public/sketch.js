
let cuadricula = 0, columnas, filas
let resolution = 10 // No se puede más de 10 ._.)

function crearTableroGame (columnas, filas) {
  let arr = new Array(columnas)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(filas)
  }
  return arr
}

function setup() {
  // Es una función de la libreria :3 junto con width y height
  createCanvas(600, 400)
  columnas = width / resolution
  filas = height / resolution

  cuadricula = crearTableroGame(columnas, filas)
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      cuadricula[i][j] = floor(random(2))
    }
  }
}

function draw() {
  background(0)

  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      let x = i * resolution
      let y = j * resolution
      if (cuadricula[i][j] === 1) {
        fill(255)
        stroke('#FF0000')
        rect(x, y, resolution - 1, resolution - 1)
      }
    }
  }

  let nextState = crearTableroGame(columnas, filas)

  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      let state = cuadricula[i][j]
      let sum = 0
      let neighbors = contadorVecinos(cuadricula, i, j) // Pasando posición de la celula

      if (state === 0 && neighbors === 3) {
        nextState[i][j] = 1
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        nextState[i][j] = 0
      } else {
        nextState[i][j] = state
      }
    }
  }

  cuadricula = nextState
}

function contadorVecinos (cuadricula, x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++)
    for (let j = -1; j < 2; j++) {
      let col = (x + i + columnas) % columnas
      let row = (y + j + filas) % filas
      sum += cuadricula[col][row]
    }

  sum -= cuadricula[x][y]
  return sum
}
