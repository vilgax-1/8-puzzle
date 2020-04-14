export class Game {
  state;
  actions = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
  };

  constructor() {

  }

  getAvaliableActionsandStates() {
    const result = {};
    let zeroIndex = this.state.indexOf('0');
    let row = Math.floor(zeroIndex / 3);
  }

}
