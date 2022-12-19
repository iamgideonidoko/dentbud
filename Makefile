PROJECT_NAME = Dentbud Project
deploy_dir = app-release-4b0d95e3b518
landing_dir = frontend-web

conda-env:
	conda create -n rasa_env python=3.8

# Create an admin user before setting conda environment variables
# use admin # select admin colection
# db.createUser({user:"admin", pwd:"password", roles:[{role:"root", db:"admin"}]}) # create the admin user

conda-env-vars:
	@echo Setting environment variables for current environment...
	conda env config vars set MONGODB_URI=mongodb://localhost:27017/dentbud_tracker_store
	conda env config vars set MONGODB_NAME=dentbud_tracker_store
	conda env config vars set MONGODB_USERNAME=admin
	conda env config vars set MONGODB_PASSWORD=password
	@echo Done. Reactivate rasa_env with "conda activate rasa_env"

frontend-rn-deps:
	yarn --cwd ./frontend-rn install

backend-express-deps:
	yarn --cwd ./backend-express install
	
backend-rasa-deps:
	pip install -r ./backend-rasa/requirements.txt

backend-rasa-spacy-model:
	python -m spacy download en_core_web_md

frontend-rn-server:
	yarn --cwd ./frontend-rn start

frontend-rn-android:
	yarn --cwd ./frontend-rn android

frontend-rn-ios:
	yarn --cwd ./frontend-rn ios

backend-express-server:
	yarn --cwd ./backend-express server:prod

frontend-rn-env:
	cp ./frontend-rn/.env.example ./frontend-rn/.env

backend-express-env:
	cp ./backend-express/.env.example ./backend-express/.env

backend-rasa-env:
	cp ./backend-rasa/.env.example ./backend-rasa/.env

landing-deploy: frontend-rn/android/app/build/outputs/apk/release/app-release.apk
	@echo Copying release apk
	sleep 3
	mkdir -p ${landing_dir}/${deploy_dir}
	cp $^ ${landing_dir}/${deploy_dir}/Dentbud.apk
	@echo Done copying release apk
	sleep 3
	@echo Starting surge deploy...
	sleep 3
	surge ${landing_dir}
	@echo Done.


.PHONY: create-conda-env set-conda-env-vars landing-deploy