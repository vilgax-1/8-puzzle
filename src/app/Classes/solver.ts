import { Nodo } from './Nodo';
import { MinPQ } from './MinPQ';

export class Solver {
  public solution;
  public steps;
  public isSolvable = false;
  public winnig_board;

  obj = {
    solvable: false
  };

  s = {
    solve: this.solve,
    steps: 0,
    init(board) {
      this.solve(board);
    },
    getSolution() {
      return this.solution;
    },
    getWinningBlocks() {
      return this.winning_board.blocks;
    },
    isSolvable: false
  };
  constructor() {}

  getSol() {
    return this.obj.solvable;
  }

  solve(board) {
    this.winnig_board = board;
    const initialNode = new Nodo(board, undefined, 0);
    const initialTwin = new Nodo(board.twin(), undefined, 0);
    const PQ = new MinPQ();
    const PQTwin = new MinPQ();

    PQ.insert(initialNode);
    PQTwin.insert(initialTwin);
    const popo = new Solver();

    while (true) {
      const searchNode = PQ.delMin();
      const searchNodeTwin = PQTwin.delMin();

      if (searchNode.board.isGoal()) {
        this.isSolvable = true;
        this.steps = searchNode.steps;
        break;
      }

      if (searchNodeTwin.board.isGoal()) {
        this.isSolvable = false;
        this.winnig_board = this.winnig_board.twin();
        break;
      }
      popo.addVecinos(PQ, searchNode);
      popo.addVecinos(PQTwin, searchNodeTwin);
    }
  }

  constructSolution(nodo) {
    if (this.isSolvable) {
      const stack = [];
      stack.push(nodo.board);
      while (nodo.prev !== undefined) {
        nodo = nodo.prev;
        stack.push(nodo.board);
      }
      this.solution = stack.reverse();
    } else {
      this.solution = [];
    }
  }

  create(board) {
    const t = Object.create(this.s);
    t.init(board);
    return t;
  }

  addVecinos(queue, nodo) {
    const vecinos = nodo.board.getNeighbors();
    vecinos.forEach( (board, index) => {
      const n = new Nodo(board, nodo, nodo.steps + 1);

      if (nodo.prev !== undefined) {
        if (!board.equals(nodo.prev.board)) {
          queue.insert(n);
        }
      } else {
        queue.insert(n);
      }
    });
  }
}
