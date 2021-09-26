.PHONY: all
all: clean setup build copy # diff, commit and publish

.PHONY: clean
clean:
	rm -rf output
	git worktree prune

.PHONY: setup
setup:
	npm ci

output:
	git worktree add -f output master

.PHONY: build
build: output
	npm run export

.PHONY: copy
copy: output
	cd output && git ls-files | xargs rm -f
	find output -mindepth 1 -type d -delete
	rsync -a out/ output/

.PHONY: diff
diff:
	cd output && git diff

.PHONY: commit
commit:
	cd output && \
		git add -A && \
		git commit -m "Site updated at $(shell LC_ALL=C node -e 'console.log(new Date().toISOString())')"

.PHONY: publish
publish:
	cd output && git push origin master
