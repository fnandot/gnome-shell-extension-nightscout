
all: dist

ZIPFILES = *.js *.json schemas LICENSE README.md
BUILD_DIR=build/
DIST_DIR=dist/
UUID=nightscout@fnandot.github.io

_glib-schemas:
	glib-compile-schemas schemas/

_build:
	${MAKE} _glib-schemas

dist: _build
	mkdir -p $(DIST_DIR)
	zip -qjr $(DIST_DIR)/$(UUID).zip $(ZIPFILES)

