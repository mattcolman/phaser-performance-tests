## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Install dependencies

`npm install`

Run a development build...

`npm start`

Open up the dev console for some guidance.
Test on mobile to see different fps results.
Record a timeline from Chrome dev tools to see interesting results.

Search for `ADD NEW TESTS HERE` to add new tests yourself!

Original setup came from `https://github.com/belohlavek/phaser-es6-boilerplate`

## Results on iPhone 6S

### Mask Vs Redraw Bitmap Data (based on 50 circles / iphone 6s mobile safari)

mask     
- idle fps ~23
- redraw fps ~23
- time to complete frame ~1.7ms

redraw bitmap data
- idle fps ~60
- redraw fps ~10 (degrades as time goes on)
- time to complete frame ~9ms (increases as time goes on)

THE WINNER IS...depends!

### BitmapFont Vs WebFont (based on iphone 6s mobile safari)

bitmapFont 
- idle fps ~60
- redraw fps ~60

webFont    
- idle fps ~60
- redraw fps ~20

THE WINNER IS...BITMAP FONT!
