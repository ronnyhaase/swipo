LESSC=./node_modules/less/bin/lessc
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m

build:
	@echo "\n\n"
	@echo "Building Swipo"
	@echo "${HR}"
	$(LESSC)
	@echo "             ${CHECK}"

clean:
