/*--- instructions ---*/

npm install
npm install stylefmt
npm install css-mqpacker

/*--- bower ---*/

npm i -g bower
npm i -g preen

bower install       install bower packages
preen               remove unneeded plugin's files

/*--- one-use commands ---*/
gulp svg            compile svg sprite (after in sprite.svg reformat code)
gulp img            images optimization
gulp media          copy media files from src to build
gulp fonts          copy fonts files from src to build

/*--- build commands ---*/
gulp builder:html   compile html from templates
gulp builder:js     compile js file from vendors
gulp builder:css    compile css file from sass

/*--- watcher ---*/
gulp                run watch with all builders

