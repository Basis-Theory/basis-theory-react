MAKEFLAGS += --silent

verify:
	./scripts/verify.sh

build:
	./scripts/build.sh

acceptance:
	./scripts/acceptance.sh

release:
	yarn release
