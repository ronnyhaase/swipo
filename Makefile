LESSC=./node_modules/less/bin/lessc
MINJS=./node_modules/uglify-js/bin/uglifyjs
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔ Done\033[39m

build:
	@echo "\n"
	@echo "Building Swipo"
	@echo "=============="
	@echo "Please note that the Build script does not run any Tests."
	@echo "\n"
	@echo "Creating output directories...\n"
	@-mkdir ./swipo
	@-mkdir ./swipo/js
	@-mkdir ./swipo/js/vendor
	@-mkdir ./swipo/css
	@echo "             ${CHECK}"
	@echo "\n"
	@echo "Compiling LESS stylesheets...\n"
	$(LESSC) ./less/swipo.less > ./swipo/css/swipo.css
	@echo "             ${CHECK}"
	@echo "\n"
	@echo "Minifying JavaScript files...\n"
	$(MINJS) ./js/swipo.js -o ./swipo/js/swipo.min.js -c
	$(MINJS) ./js/swipo-deck.js -o ./swipo/js/swipo-deck.min.js -c
	@cp ./js/vendor/*.js ./swipo/js/vendor
	@echo "             ${CHECK}"
	@echo "\n\n\033[32m✔ ✔ ✔  Swipo has been successfully build!\033[39m\n"

clean:
