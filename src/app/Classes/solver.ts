import { Nodo } from './Nodo';
import { MinPQ } from './MinPQ';

export class Solver {
  public solution;
  public steps;
  public isSolvable = false;
  public winingBoard;

  obj = {
    solvable: false
  };

  s = {
    steps: 0,
    init(board) {
      this.solve(board);
    },
    getSolution() {
      return this.solution;
    },
    getWinningBlocks() {
      return this.winingBoard.blocks;
    },
    isSolvable: false
  };

  constructor() { }

  getSol() {
    return this.obj.solvable;
  }

  public getSolution() {
    return this.solution;
  }
  solve(board) {
    this.winingBoard = board;
    const initialNode = new Nodo(board, undefined, 0);
    const initialTwin = new Nodo(board.twin(), undefined, 0);
    const PQ = new MinPQ();
    const PQTwin = new MinPQ();

    PQ.insert(initialNode);
    PQTwin.insert(initialTwin);

    const popo = new Solver();

    let searchNode;
    let searchNodeTwin;

    while (true) {
      searchNode = PQ.delMin();
      searchNodeTwin = PQTwin.delMin();

      if (searchNode.board.isGoal()) {
        this.isSolvable = true;
        this.steps = searchNode.steps;
        break;
      }

      if (searchNodeTwin.board.isGoal()) {
        this.isSolvable = false;
        this.winingBoard = this.winingBoard.twin();
        break;
      }
      popo.addVecinos(PQ, searchNode);
      popo.addVecinos(PQTwin, searchNodeTwin);
    }

    this.constructSolution(searchNode);
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
    this.solve(board);
    return this.s;
  }

  addVecinos(queue, nodo: Nodo) {
    const neighbours = nodo.board.getNeighbors();
    neighbours.forEach((board, index) => {
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
