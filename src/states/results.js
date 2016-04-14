import GameState from './game_state';
import _ from 'lodash';
import {Font} from '../style'
import GridLayout from '../grid_layout'

class Results extends GameState {

  create() {
    super.create()

    console.log(this.game.results)

    this.printResults(this.game.results)

    let btn = this.addButton(this.world, this.world.centerX, this.world.height - 100, 200, 100, 'Back to Menu')
    btn.rect.events.onInputUp.add(()=> {
      this.game.state.start('lobby')
    })
  }

  printResults(str) {
    let [w, h] = [800, 400]
    let txt = this.game.add.text(this.world.centerX, 100, str, {font: `24px ${Font.Panton.EXTRA_BOLD_REGULAR}`, fill: "#fff"})
    txt.anchor.set(.5, 0)
    txt.wordWrap = true
    txt.wordWrapWidth = w-10
  }

}

export default Results;
