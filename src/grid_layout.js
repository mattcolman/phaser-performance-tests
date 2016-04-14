import _ from 'lodash';

class GridLayout {

  constructor(game, parent, bounds, options = {}) {
    this.game = game
    this.parent = parent
    this.bounds = bounds

    this.numColumns = options.numColumns
    this.numRows = options.numRows
    this.xPadding = (options.xPadding != null) ? options.xPadding : 4
    this.yPadding = (options.yPadding != null) ? options.yPadding : 4
    this.debug    = (options.debug != null)    ? options.debug    : false

    this.items = []
    if (this.debug) this.addDebugDraw()
  }

  add(...items) {
    items.forEach( function(item) {
      this.parent.addChild(item)
      this.items.push(item)
    }, this)
  }

  remove(...items) {
    items.forEach( function(item) {
      this.parent.removeChild(item)
    }, this)
    this.items = _.without(this.items, ...items)
  }

  setBounds(x, y, width, height) {
    this.bounds.x = x
    this.bounds.y = y
    this.bounds.width = width
    this.bounds.height = height
  }

  addDebugDraw() {
    this.debugRect = this.game.add.graphics(0, 0, this.parent)
    this.debugRect.alpha = .5
    this.debugRect.visible = false
  }

  drawBounds() {
    this.debugRect.visible = true
    this.debugRect.clear()
                  .beginFill(0xff0000)
                  .drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height)
  }

  update() {
    var i = 0
    for (var row = 0; row < this.numRows; row++) {
      for (var column = 0; column < this.numColumns; column++) {
        let item = this.items[i++]

        if (!item) return // run out of items

        let width = (this.bounds.width - (this.numColumns-1)*this.xPadding) / this.numColumns
        let height = (this.bounds.height - (this.numRows-1)*this.yPadding) / this.numRows
        item.x = this.bounds.x + column * width + this.xPadding * column
        item.y = this.bounds.y + row * height + this.yPadding * row
        if (item.layout) item.layout(width, height)
      }
    }
  }
}

export default GridLayout;
