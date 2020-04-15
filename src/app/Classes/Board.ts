export class Board {
  blocks;
  N;
  move;
  blankR;
  blankC;
  blank;
  hammingScore;
  manhattanScore;
  tilesSwapped;
  prevBlank;
  steps;
  prevNode;

  constructor(blocks) {
    this.blocks = blocks;
    this.N = blocks[0].length;
    this.blankR = 0;
    this.blankC = 0;
    this.hammingScore = 0;
    this.manhattanScore = 0;
    this.contructGoalBoard();
  }

  dimension() {
    return this.N;
  }

  contructGoalBoard() {
    let hScore = 0;
    let mScore = 0;
    let counter = 1;

    for (let i = 0; i < this.N; i++) {
        for (let j = 0; j < this.N; j++) {

            if (this.blocks[i][j] === 0) {
                this.blankR = i;
                this.blankC = j;
                this.blank = [i, j];
            }
            // Calculate the Hamming and Manhattan here since we are
            // going through the board to find the blank space

            if (this.blocks[i][j] !== 0) {
                if (this.blocks[i][j] !== counter) {
                    hScore += 1;

                    const cRow = i;
                    const cCol = j;
                    let val = this.blocks[i][j];

                    if (val !== 0) {
                        val -= 1;
                    }

                    const wRow = Math.floor(val / this.N);
                    const wCol = Math.floor(val % this.N);

                    mScore += Math.abs(cRow - wRow);
                    mScore += Math.abs(wCol + cCol);
                }
            }
            counter += 1;
        }
        this.hammingScore = hScore;
        this.manhattanScore = mScore;
    }
  }

  hamming() {
    return this.hammingScore;
  }

  manhattan() {
    return this.manhattanScore;
  }

  getNeighbors() {
    const b = this.blank;
    let a = [];
    const limit = this.N - 1;

    a.push([b[0] + 1, b[1]]);
    a.push([b[0] - 1, b[1]]);
    a.push([b[0], b[1] + 1]);
    a.push([b[0], b[1] - 1]);

    a = a.filter((arg) => {
        return ((arg[0] <= limit && arg[0] >= 0) && (arg[1] <= limit && arg[1] >= 0));
    });

    const neighbours = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < a.length; i++) {
        const newBlocks = this.createNewBlocks(a[i]);
        const n = new Board(newBlocks);
        n.move = newBlocks.move;
        n.prevBlank = {from: b, to: a[i] };
        n.steps = this.steps + 1;
        n.prevNode = this;
        neighbours.push(n);
    }
    return neighbours;
  }

  createNewBlocks(newPosition) {
    function copy(arr) {
        const newArr = arr.slice(0);
        for (let i = newArr.length; i--;) {
          if (newArr[i] instanceof Array) {
            newArr[i] = copy(newArr[i]);
          }
        }
        return newArr;
    }
    const blank = this.blank;
    const newBlocks = copy(this.blocks);
    const row = newPosition[0];
    const col = newPosition[1];
    newBlocks[blank[0]][blank[1]] = this.blocks[newPosition[0]][newPosition[1]];
    newBlocks[newPosition[0]][newPosition[1]] = 0;
    newBlocks.move = [row, col];
    return newBlocks;
  }

  twin() {
    let r = this.blocks[0][0] * this.blocks[0][1];
    let copiedBlocks = this.copy(this.blocks);

    if (r !== 0) {
        // I can swap [0][0] and [0][1]
        this.tilesSwapped = { tile_1: { x: 0, y: 0 }, tile_2: { x: 0, y: 1 }};
        copiedBlocks = this.swap(copiedBlocks, 0, 0, 0, 1);
        let brd = new Board(copiedBlocks);
        return brd;
    } else {
        // I can swap [1][0] and [1][1]
        this.tilesSwapped = { tile_1: { x: 1, y: 0 }, tile_2: { x: 1, y: 1 }};
        copiedBlocks = this.swap(copiedBlocks, 1, 0, 1, 1);
        let brd = new Board(copiedBlocks);
        return brd;
    }
  }

  tiles_swapped() {
    return this.tilesSwapped;
  }

  copy(arr) {
    const newArr = arr.slice(0);
    for (let i = newArr.length; i--;) {
      if (newArr[i] instanceof Array) {
        newArr[i] = this.copy(newArr[i]);
      }
    }
    return newArr;
  }

  swap(blks, x1, y1, x2, y2) {
    const temp = blks[x1][y1];
    blks[x1][y1] = blks[x2][y2];
    blks[x2][y2] = temp;
    return blks;
  }

  isGoal() {
    const maximum = this.N * this.N;
    let counter = 0;
    for (let i = 0; i < this.N; i++) {
        for (let j = 0; j < this.N; j++) {
            counter += 1;
            if (counter === maximum) {
              return true;
            }
            if (this.blocks[i][j] !== counter) {
              return false;
            }
        }
    }
    return true;
  }

  equals(other) {
    if (this.N !== other.blocks[0].length) {
      return false;
    }
    for (let i = 0; i < this.N; i++) {
        for (let k = 0; k < this.N; k++) {
            if (this.blocks[i][k] !== other.blocks[i][k]) {
              return false;
            }
        }
    }
    return true;
  }
}
