.PHONY: build-image
build-image: clean
	docker build -t f440.github.com .

.PHONY: build
build: clean
	mkdir -p build
	docker run --rm -v $(PWD)/build:/app/build f440.github.com

.PHONY: server
server:
	docker run --rm -p 4567:4567 f440.github.com middleman server

.PHONY: clean
clean:
	rm -rf build
	git clean -f
