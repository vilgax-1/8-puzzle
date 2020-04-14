export class Nodo {
  public board;
  public prev;
  public steps;

  constructor(board, prev, steps) {
    this.board = board;
    this.prev = prev;
    this.steps = steps || 0;
  }

  score(method?) {
    if (method === undefined) {
      return this.board.manhattan() + this.steps;
    }

    if (method === 'hamming') {
      return this.board.hamming() + this.steps;
    }
  }

  compareTo(other) {
    if (this.score() < other.score()) {
      return -1;
    }
    if (this.score() > other.score()){
      return 1;
    } else {
      if (this.score('hamming') < other.score('hamming')) {
        return -1;
      }
      if (this.score('hamming') > other.score('hamming')) {

      }
    }
    return 0;
  }
}
