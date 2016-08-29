.PHONY: build
build:
	bundle exec nanoc

.PHONY: output
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

.PHONY: diff
diff:
	cd output && git diff

.PHONY: commit
commit:
	cd output && \
		git add -A && \
		git commit -m "Site updated at $(shell LC_ALL=C date -u --rfc-3339=seconds)"

.PHONY: all
all: clean setup build
