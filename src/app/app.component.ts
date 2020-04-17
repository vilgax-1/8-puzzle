import { Component, OnInit } from '@angular/core';
import { Board } from './Classes/Board';
import { Solver } from './Classes/solver';
import * as _ from 'lodash';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dividido = [[ 1, 2, 0 ],
  [ 6, 7, 8 ],
  [ 4, 3, 5 ]];

  numberOrder: any = [1, 2, 0, 6, 7, 8, 4, 3, 5];
  history = [];
  constructor(
  ) {}

  get randomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
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
        if (this.numberOrder[i] == '0') {
          flag = true;
        }
        this.dividido[posX][posY++] = Number(order[i]);
      }
      if (flag) {
        this.numberOrder = [];
        this.numberOrder = aux;

      } else {
        alert('No se ingreso el espacio en blanco');
      }
    }
  }

  resolver() {
    const time = timer(1000);
    this.history = [];
    const board = new Board(this.dividido);
    const solver = new Solver();
    const solution = solver.create(board);

    if (solution.isSolvable) {
      const boards = solution.getSolution();
      for(let i = 0; i < boards.length; i++) {
        time.subscribe(() => {
          this.numberOrder = [];
          this.history.push( _.concat( boards[i].blocks[0], boards[i].blocks[1], boards[i].blocks[2]));
          this.numberOrder = _.concat( boards[i].blocks[0], boards[i].blocks[1], boards[i].blocks[2]);
        });
      }
    } else {
      alert('Solucion no encontrada');
    }
  }
}

