.PHONY: build
build:
	bundle exec nanoc

output:
	git worktree add -f output master

.PHONY: setup
setup:
	bundle install
	npm install

.PHONY: watch
watch:
	bundle exec guard

.PHONY: clean
clean:
	rm -rf output crash.log tmp .sass-cache
	git worktree prune

.PHONY: serve
serve:
	npm start

.PHONY: all
all: clean setup build
