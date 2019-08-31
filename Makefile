# simple helper makefile, handles schema compilation, translations and zip file creation

.PHONY= zip-file

# files that go into the zip
ZIP= $(wildcard *.js) metadata.json

all:
	${MAKE} compile
	${MAKE} package

compile:
	glib-compile-schemas schemas/

package: $(ZIP)
	mkdir -p build
	rm -f build/nightscout.zip
	zip build/nightscout.zip $(ZIP)

clean:
	rm -rf build
