PROJECT_NAME = Dentbud Project
deploy_dir = app-release-4b0d95e3b518
landing_dir = frontend-web

create-conda-env:
	conda create -n rasa_env python=3.8

# Create an admin user before setting conda environment variables
# use admin # select admin colection
# db.createUser({user:"admin", pwd:"password", roles:[{role:"root", db:"admin"}]}) # create the admin user

set-conda-env-vars:
	@echo Setting environment variables for current environment...
	conda env config vars set MONGODB_URI=mongodb://localhost:27017/dentbud_tracker_store
	conda env config vars set MONGODB_NAME=dentbud_tracker_store
	conda env config vars set MONGODB_USERNAME=admin
	conda env config vars set MONGODB_PASSWORD=password
	@echo Done. Reactivate rasa_env with "conda activate rasa_env"

deploy-landing: frontend-rn/android/app/build/outputs/apk/release/app-release.apk
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


.PHONY: create-conda-env set-conda-env-vars deploy-landing