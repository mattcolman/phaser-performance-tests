import GameState from './game_state';
import _ from 'lodash';
import {Font} from '../style'
import GridLayout from '../grid_layout'
import SpriteSheetBuilder from '../spritesheet_builder'

class SpriteSheetBuilderTest extends GameState {

  preload() {
    this.game.load.crossOrigin = 'anonymous'
  }

  create() {
    super.create()

    this.createShapes()

    window.State = this
  }

  createShapes() {
    let square = this.game.add.graphics(0, 0)
    square.beginFill(0xff0000)
          .drawRect(0, 0, 100, 100)
    let squareImage = square.generateTexture()
    square.destroy()

    let circle = this.game.add.graphics(0, 0)
    circle.beginFill(0x333333)
          .drawCircle(0, 0, 100)
    let circleImage = circle.generateTexture()
    circle.destroy()

    let ssb = new SpriteSheetBuilder(this.game)
    ssb.addFrames([['square', squareImage], ['circle', circleImage]])

    let im = this.game.add.image(0, 0, ssb.bmd)

    this.circles = _.times(50, ()=> {
      return this.addCircle(50, 10)
    })

    var i = 0
    ssb.addFrames(
      _.map(this.circles, (circle)=> {
        return [`circle${i++}`, circle.texture]
      })
    )

    ssb.buildToCache('new-atlas')
    // let sp = this.game.add.sprite(100, 100, 'avatar')
    // let squareSprite = this.game.add.sprite(100, 100, 'new-atlas', 'square')
    // let circleSprite = this.game.add.sprite(300, 300, 'new-atlas', 'circle')
    // squareSprite.anchor.set(.5)
    // TweenMax.to(squareSprite, 1, {angle: 360, repeat: -1})
    // let img = this.game.add.image(100, 100, 'new-sprite')
  }

  addCircle(r, thickness) {
    let w = r*2 + thickness
    let bmd = this.game.add.bitmapData(w, w)
    let c = bmd.ctx
    let offset = 0

    c.setLineDash([2, 4])
    c.lineWidth = thickness
    c.beginPath()
    c.arc(w/2, w/2, r, offset, offset + (Phaser.Math.PI2-offset*2) * 1)
    c.strokeStyle = Phaser.Color.getWebRGB(Phaser.Color.getRandomColor())
    c.stroke()
    c.closePath()

    return bmd
  }

}

export default SpriteSheetBuilderTest;
