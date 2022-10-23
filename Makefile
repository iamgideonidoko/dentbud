#
# Dentbud Project
#

PROJECT = "Dentbud Project"


all: install test server

debug: ;@echo "Debugging ${PROJECT}.....http://0.0.0.0:8080/debug?port=5858 to start debugging"; \
	export NODE_PATH=.; \
	node-inspector & coffee --nodejs --debug app.coffee;

test: ;@echo "Testing ${PROJECT}....."; \
	export NODE_PATH=.; \
	./node_modules/mocha/bin/mocha;

server : ;@echo "Starting ${PROJECT}....."; \
	export NODE_PATH=.; \
	coffee app.coffee

install: ;@echo Installing ${PROJECT}.....
	npm install

update: ;@echo "Updating ${PROJECT}....."; \
	git pull --rebase; \
	npm install

clean : ;
	rm -rf node_modules

create-conda-env:
	conda create -n rasa_env python=3.8

set-conda-env-vars:
	;@echo Setting environment variables for current environment...
	conda env config vars set MONGODB_URI=mongodb://localhost:27017/dentbud_tracker_store
	conda env config vars set MONGODB_NAME=dentbud_tracker_store
	conda env config vars set MONGODB_USERNAME=admin
	conda env config vars set MONGODB_PASSWORD=password
	;@echo Done. Reactivate rasa_env with "conda activate rasa_env"


.PHONY: test server install clean update