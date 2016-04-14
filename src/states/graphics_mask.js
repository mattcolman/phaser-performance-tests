import _ from 'lodash';
import GraphicsTest from './graphics_test'

var GraphicsMask = Object.assign(Object.create(GraphicsTest.prototype), {
  config: {
    numCircles: 50, // 1- 100
    type: 'mask' // mask or redrawBmd
  }
})

export default GraphicsMask;
