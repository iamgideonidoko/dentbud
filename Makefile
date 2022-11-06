PROJECT_NAME = Dentbud Project

create-conda-env:
	conda create -n rasa_env python=3.8

set-conda-env-vars:
	@echo Setting environment variables for current environment...
	conda env config vars set MONGODB_URI=mongodb://localhost:27017/dentbud_tracker_store
	conda env config vars set MONGODB_NAME=dentbud_tracker_store
	conda env config vars set MONGODB_USERNAME=admin
	conda env config vars set MONGODB_PASSWORD=password
	@echo Done. Reactivate rasa_env with "conda activate rasa_env"


.PHONY: create-conda-env set-conda-env-vars