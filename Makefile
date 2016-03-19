.PHONY: setup
all: build

output:
	git worktree add -f output master

.PHONY: setup
setup: output
	bundle install

.PHONY: build
build:
	bundle exec nanoc

.PHONY: watch
watch:
	bundle exec guard

.PHONY: clean
clean:
	rm -rf output crash.log tmp .sass-cache
	git worktree prune
