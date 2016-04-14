import GameState from './game_state';
import _ from 'lodash';
import GridLayout from '../grid_layout'
import Style from '../style'

var {Font} = Style

// Stores a single bmd in the cache
// redraws 100 masks

// RESULTS: based on 50 circles / iphone 6s mobile safari
// mask wins!

// mask     : idle fps ~23
//            redraw fps ~23
//            time to complete frame ~1.7ms

// redrawBmp:
//            idle fps ~60
//            redraw fps ~10 (degrades as time goes on)
//            time to complete frame ~9ms (increases as time goes on)

class GraphicsTest extends GameState {

  create() {
    super.create()

    this.radius = 50
    this.tweener = {
      value: 0
    }

    this.willUpdateCircles = false
    this.mainTween = this.game.add.tween(this.tweener).to( {value: 1}, 4500, "Linear")
    this.mainTween.onComplete.add(()=> {
      this.willUpdateCircles = false
    })

    this.addCircles()

    this.startTest()
  }

  idle() {
    super.idle()
    this.willUpdateCircles = false
  }

  animate() {
    super.animate()
    this.tweener.value = 0
    this.mainTween.start()
    this.willUpdateCircles = true
  }

  update() {
    super.update()

    if (this.willUpdateCircles) {
      this.updateCircles()
    }
  }

  updateCircles() {
    this.circles.forEach((circle)=> {
      this.drawCircle(circle, this.tweener.value)
    })
  }

  drawCircle(circle, p) {
    if (this.config.type == 'mask') {
      this.redrawMask(circle, p)
    } else {
      this.redrawBmd(circle, p)
    }
  }

  redrawMask(circle, p) {
    circle.mask.clear()
               .beginFill(0xff0000)
               .arc(this.width/2, this.height/2, this.width/2, Phaser.Math.PI2*p, 0, true)
  }

  redrawBmd(circle, p) {
    let bmd = circle.bmd
    let offset = 0
    let c = bmd.ctx
    bmd.clear(0, 0, this.width, this.height)
    c.beginPath()
    c.arc(this.width/2, this.height/2, this.radius, offset, offset + (Phaser.Math.PI2-offset*2) * p)
    c.strokeStyle = bmd._color
    c.stroke()
    c.closePath()
  }

  addCircles() {
    let grid = new GridLayout(this.game, this.world, new Phaser.Rectangle(0, 100, this.world.width, this.world.height-100), {
      numColumns: 10,
      numRows: 10,
      xPadding: 10
    })

    var thickness = 10
    this.width = this.height = this.radius*2 + thickness

    this.circles = _.times(this.config.numCircles, ()=> {
      return this.addCircle(this.width, this.height, thickness)
    })

    grid.add(...this.circles)
    grid.update()

    this.circles.forEach((circle)=> {
      if (this.config.type == 'mask') {
        let mask = this.game.add.graphics(circle.x, circle.y, this.world)
        circle.mask = mask
      }

      this.drawCircle(circle, 1)
    })
  }

  // addBitmapDataToCache(w, h, thickness) {
  //   let bmd = this.game.add.bitmapData(w, h, 'circle', true)
  //   let lineDash = [2, 4]
  //   bmd.ctx.setLineDash(lineDash)
  //   bmd.ctx.lineWidth = thickness
  //   bmd._color = Phaser.Color.getWebRGB(Phaser.Color.getRandomColor())
  //   let offset = 0
  //   let c = bmd.ctx
  //   c.beginPath()
  //   c.arc(w/2, h/2, this.radius, offset, offset + (Phaser.Math.PI2-offset*2))
  //   c.strokeStyle = bmd._color
  //   c.stroke()
  // }

  addCircle(w, h, thickness) {
    let bmd = this.game.add.bitmapData(w, h)
    let lineDash = [2, 4]
    bmd.ctx.setLineDash(lineDash)
    bmd.ctx.lineWidth = thickness
    bmd._color = Phaser.Color.getWebRGB(Phaser.Color.getRandomColor())

    let sprite = this.game.add.sprite(0, 0, bmd)
    sprite.bmd = bmd

    this.redrawBmd(sprite, 1)

    return sprite
  }

}

GraphicsTest.prototype.config = {
  numCircles: 50, // 1- 100
  type: 'mask' // mask or redrawBmd
}

export default GraphicsTest;
