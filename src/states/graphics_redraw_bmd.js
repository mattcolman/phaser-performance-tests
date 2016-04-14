import _ from 'lodash';
import GraphicsTest from './graphics_test'

var GraphicsRedrawBMD = Object.assign(Object.create(GraphicsTest.prototype), {
  config: {
    numCircles: 50, // 1- 100
    type: 'redrawBmd' // mask or redrawBmd
  }
})

export default GraphicsRedrawBMD;
