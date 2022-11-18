# rasa 

train:
	rasa train --fixed-model-name dentbud_model

shell:
	rasa shell -m ./models/dentbud_model.tar.gz

server:
	rasa run -m ./models/dentbud_model.tar.gz --enable-api --port 8080 --cors "*"