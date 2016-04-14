import _ from 'lodash';
import TextTest from './text_test'

var TextWebFont = Object.assign(Object.create(TextTest.prototype), {
  config: {
    type: 'webFont' // bitmapFont or webFont
  }
})

console.log('TextWebFont', TextWebFont)

export default TextWebFont;
