import _ from 'lodash';
import TextTest from './text_test'

var TextBitmapFont = Object.assign(Object.create(TextTest.prototype), {
  config: {
    type: 'bitmapFont', // bitmapFont or webFont
    description: `
    Initial conclusion: Bitmap fonts, as expected, draw really fast. They usually don't look as crisp as a web font though...
    `
  }
})

export default TextBitmapFont;
