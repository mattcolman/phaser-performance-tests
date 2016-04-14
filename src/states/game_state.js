import {Font} from '../style'

const TEST_LENGTH = 5000;
const TEST_RECORDING_TIME = 4000;

class GameState extends Phaser.State {

	create() {
    this.actors = []
    this.game.time.advancedTiming = true
    this.stage.backgroundColor = "#4488AA";
    this.fpsTxt = this.game.add.text(50, 20, this.game.time.fps || '--', { font: "24px Arial", fill: "#00ff00" })
    let txt = this.add.text(this.world.centerX, 50, this.name || this.game.state.current, { font: "bold 32px Arial", fill: "#fff"})
    txt.anchor.set(.5)
  }

  startTest() {
    this.idle()
    this.game.time.events.add(TEST_LENGTH, this.animate, this)
    this.game.time.events.add(TEST_LENGTH*2, this.complete, this)
  }

  idle() {
    console.log('start idle')
    this.game.time.events.add(TEST_RECORDING_TIME, this.recordFPS, this, 'idle')
  }

  animate() {
    console.log('start animate')
    this.game.time.events.add(TEST_RECORDING_TIME, this.recordFPS, this, 'animate')
  }

  recordFPS(type) {
    let str = `${this.game.state.current} : ${type} : ${this.game.time.fps}fps\n`
    console.log('record', str)
    this.game.results += str
  }

  complete() {
    this.game.state.start(this.game.stateQueue.shift())
  }

  update() {
    this.fpsTxt.text = this.game.time.fps // debug text doesn't work with the canvas renderer??
    this.fpsTxt.bringToTop()
  }

  makeButton(str, x, y) {
    var style = { font: "bold 32px Arial", fill: "#fff"};
    let txt = this.add.text(x, y, str, style)
    txt.anchor.set(.5, 0)
    txt.inputEnabled = true
    txt.events.onInputUp.add(this.handleClick, this, 0, str)
  }

  handleClick(pointer, e, type) {
    console.log('clicked', type)
    if (type == 'next') {
      this.game.nextState()
    } else if (type == 'back') {
      this.game.prevState()
    }
  }

  addActor(name, klass, ...args) {
    this.actors.push([name, klass])
    let k = Object.assign(Object.create(klass), {game: this.game})
    k.added(...args)
    return k
  }

  addButton(parent, x, y, w, h, str) {
    let group = this.game.add.group(parent)
    group.position.set(x, y)
    let rect = this.game.add.graphics(0, 0, group)
    rect.setColor = function(color) {
      this.beginFill(color)
          .lineStyle(1, 0x333333)
          .drawRoundedRect(0, 0, w, h, 9)
    }
    rect.setColor(0xffffff)

    let txt = this.game.add.text(0, 0, str, {font: `24px ${Font.Panton.EXTRA_BOLD_ITALIC}`, fill: "#333", align: 'center'}, group)
    txt.wordWrap = true
    txt.wordWrapWidth = w-10

    txt.position.set(w/2, h/2)
    txt.pivot.set(txt.width/2, txt.height/2)

    rect.inputEnabled = true
    rect.input.useHandCursor = true;
    rect.events.onInputOver.add(()=> {
      rect.setColor(0x91bac5)
    })
    rect.events.onInputOut.add(()=> {
      rect.setColor(0xffffff)
    })
    rect.events.onInputDown.add(()=> {
      rect.setColor(0x3f5388)
    })
    rect.events.onInputUp.add(()=> {
      rect.setColor(0xffffff)
    })

    group.layout = (w, h)=> {
      group.x += w/2
    }

    group.name = str
    group.rect = rect
    group.pivot.set(group.width/2, group.height/2)
    return group
  }

}

export default GameState;
