.PHONY: build-image
build-image: clean
	docker build -t f440.github.com .

.PHONY: build
build: clean
	mkdir -p build
	docker run --rm -v $(PWD)/build:/app/build f440.github.com

.PHONY: clean
clean:
	rm -rf build
	git clean -f
