import _ from 'lodash';
import TextTest from './text_test'

var TextBitmapFont = Object.assign(Object.create(TextTest.prototype), {
  config: {
    type: 'bitmapFont' // bitmapFont or webFont
  }
})

export default TextBitmapFont;
