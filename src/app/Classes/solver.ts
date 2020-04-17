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
    solve: this.solve,
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
    const popo = new Solver();

    let searchNode: any;
    let searchNodeTwin: any;
    const initialNode = new Nodo(board, undefined, 0);
    const initialTwin = new Nodo(board.twin(), undefined, 0);
    const PQ = new MinPQ();
    const PQTwin = new MinPQ();

    PQ.insert(initialNode);
    PQTwin.insert(initialTwin);


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

    if (this.isSolvable) {
      const stack = [];
      stack.push(searchNode.board);
      while (searchNode.prev !== undefined) {
        searchNode = searchNode.prev;
        stack.push(searchNode.board);
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
    // this.solve(board);
    // return this.s;
  }

  addVecinos(queue, node) {
    const neighbours = node.board.getNeighbors();
    neighbours.forEach((board, index) => {
    const n = new Nodo(board, node, node.steps + 1);

    if (node.prev !== undefined) {
        if (!board.equals(node.prev.board)) {
          queue.insert(n);
        }
      } else {
        queue.insert(n);
      }
    });
  }
}
