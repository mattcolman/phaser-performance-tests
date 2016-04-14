import _ from 'lodash';
import GraphicsTest from './graphics_test'

var GraphicsMask = Object.assign(Object.create(GraphicsTest.prototype), {
  config: {
    numCircles: 50, // 1- 100
    type: 'mask', // mask or redrawBmd
    description: `
    Draws to bmd, then mask it using a graphics arc. The mask (graphics) redraws each frame.
    Initial conclusion: Masking a bmd seems expensive because graphics redraw every frame regardless
    of them changing. With that said, when they are redrawing it's faster to redraw graphics than to
    redraw a bmd.
    `
  }
})

export default GraphicsMask;
