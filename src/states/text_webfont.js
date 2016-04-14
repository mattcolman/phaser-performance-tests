import _ from 'lodash';
import TextTest from './text_test'

var TextWebFont = Object.assign(Object.create(TextTest.prototype), {
  config: {
    type: 'webFont', // bitmapFont or webFont
    description: `
    Web fonts perform well if you don't update them. Updating the text every frame is expensive!
    `
  }
})

export default TextWebFont;
