import _ from 'lodash';
import GraphicsTest from './graphics_test'

var GraphicsRedrawBMD = Object.assign(Object.create(GraphicsTest.prototype), {
  config: {
    numCircles: 50, // 1- 100
    type: 'redrawBmd', // mask or redrawBmd
    description: `
    Calls bmd.clearRect() and redraws the shape every frame.
    Initial conclusion: Bmds perform well if you don't keep redrawing them. They are slow to redraw.
    `
  }
})

export default GraphicsRedrawBMD;
