import GameState from './game_state';
import _ from 'lodash';
import GridLayout from '../grid_layout'
import Style from '../style'

var {Font} = Style

class Lobby extends GameState {

  create() {
    super.create()

    let message = `
      Hi! Welcome to Phaser Performance Tests!!
      This is designed to discover what works best on mobile.
      Whilst most tests run at 60fps on a macbook pro with Chrome, it's still very interesting to record a timeline in Chrome dev tools.
      Some tests show the CPU maxing out!
    `
    console.log(message)

    let xPadding = 100
    let yPadding = 100
    let grid = new GridLayout(this.game, this.world, new Phaser.Rectangle(xPadding, 150, this.world.width - xPadding*2, this.world.height - yPadding*2), {
      numColumns: 5,
      numRows: 3,
      xPadding: 10
    })

    this.game.tests.forEach((test)=> {
      let btn = this.addButton(this.world, 0, 0, 200, 100, test[0])
      btn.rect.events.onInputUp.add(()=> {
        this.game.stateQueue = ['Results']
        this.state.start(btn.name)
      })

      grid.add(btn)
    })

    let btn = this.addButton(this.world, this.world.width/2, this.world.height - 150, 200, 100, "Run all tests")
    btn.rect.events.onInputUp.add(()=> {
      this.game.stateQueue = _.map(this.game.tests, (test)=> test[0]).concat(['Results'])
      this.state.start(this.game.stateQueue.shift())
    })

    grid.update()

    this.game.results = ""
  }

}

Lobby.prototype.name = "Phaser Performance Tests"

export default Lobby;
