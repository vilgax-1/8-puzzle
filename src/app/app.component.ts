import { Component, OnInit } from '@angular/core';
import { Board } from './Classes/Board';
import { Solver } from './Classes/solver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  divido = [[ 1, 3, 0 ],
            [ 2, 4, 7 ],
            [ 6, 5, 8 ]];

  numeroOrden: any = [1, 3, 0, 2, 4, 7, 6, 5, 8];
  historial: Array<any>;
  finalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  constructor(
  ) {
  }

  get randomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
  }

  orden() {
    let flag = false;
    const order = prompt('Ingresa el orden y el espacio vacio como 0 (ejem: 01234..)');

    if (order.length !== 9) {
      alert('Se ha cometido un error, intentalo de nuevo');

    } else {
      const aux = [];
      let posX = 0;
      let posY = 0;
      for (let i = 0; i < order.length; i++) {
        aux.push(order[i]);

        if (i % 3 === 0 && i < 9 && i !== 0) {
          posX++;
          posY = 0;
        }
        if (this.numeroOrden[i] == '0') {
          flag = true;
        }
        this.divido[posX][posY++] = parseInt(order[i]);
      }
      if (flag) {
        this.numeroOrden = [];
        this.numeroOrden = aux;

      } else {
        alert('No se ingreso el espacio en blanco');
      }
    }
  }
  queue(funcs, delay) {
    let i;
    let o;
    setTimeout(function run() {
      o = funcs.shift();
      if (o !== undefined) {
        o.fnc(o.args[0], o.args[1]);
        setTimeout(run, delay);
      }
    }, delay);
  }

  resolver() {
    const board = new Board(this.divido);
    console.log('board', board);
    const solver = new Solver();
    const solution = solver.create(board);

    if (solution.isSolvable) {
      const q = [];
      const boards = solution.getSolution();
      console.log(boards);
      // for (let i = 0; i < boards.length; i++) {
      //   boards[i].printBoard();
      //   if (boards[i].move !== undefined) {
      //     q.push({ fnc: game.movePosition, args: [boards[i].move[0], boards[i].move[1]] })
      //   }
      // }

      this.queue(q, 200);
    } else {
      console.log('No solution found');
    }
  }
}

