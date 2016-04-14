import GameState from './game_state';
import _ from 'lodash';
import {Font} from '../style'
import GridLayout from '../grid_layout'

var str = "text test"
// RESULTS: based on iphone 6s mobile safari
// bitmapFont wins!

// bitmapFont : idle fps ~60
//              redraw fps ~60

// webFont    : idle fps ~60
//              redraw fps ~20


class TextTest extends GameState {

  preload() {
    this.game.load.bitmapFont('panton', 'fonts/panton_bitmapfont/panton.png', 'fonts/panton_bitmapfont/panton.xml')
  }

  create() {
    super.create()

    this.scramble = false

    this.addTexties()

    this.startTest()
  }

  idle() {
    super.idle()
    this.scramble = false
  }

  animate() {
    super.animate()
    this.scramble = true
  }

  addTexties() {
    let grid = new GridLayout(this.game, this.world, new Phaser.Rectangle(0, 100, this.world.width, this.world.height-100), {
      numColumns: 10,
      numRows: 10,
      xPadding: 10
    })

    this.texties = _.times(100, (i)=> {
      return Factory[this.config.type].apply(this)
    })

    grid.add(...this.texties)
    grid.update()
  }

  createWebFont() {
    return this.game.add.text(0, 0, str, {font: `20px ${Font.Panton.EXTRA_BOLD_ITALIC}`, fill: "#333"})
  }

  createBitmapFont() {
    return this.game.add.bitmapText(0, 0, 'panton', str, 20)
  }

  update() {
    super.update()

    if (!this.scramble) return
    str = str[str.length - 1] + str.substring(0, str.length - 1) // rotate the string
    this.texties.forEach((txt)=> {
      txt.text = str
    })
  }

}

var Factory = {
  webFont: TextTest.prototype.createWebFont,
  bitmapFont: TextTest.prototype.createBitmapFont
}


export default TextTest;
