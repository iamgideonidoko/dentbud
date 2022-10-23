# backend-rasa

AI backend for Dentbud

## Getting Started

Follow the below steps to set up this project on your local machine.

1. Install the latest version of [anaconda](https://www.anaconda.com/). 
2. Clone this project and open a shell in its directory.
2. Upgrade pip to 21.3 and above
```bash
	pip3 install -U --user pip
```

4. Create a virtual python environment with python version 3.8 for Rasa with the name `rasa_env` 

```bash
conda create -n rasa_env python=3.8
```

You can view all available environments on your machine with:

```bash
conda env list
```

5. Activate the new environment ( `rasa_env` )

```bash
conda activate rasa_env
```

6. Install dependencies listed in `requirements.txt`

```bash
pip install -r requirements.txt
```

7. Run rasa:

   ```shell
   rasa run --connector rest
   ```

   

## Validate Data

```shell
rasa data validate
```

## Create MongoDB User for Tracker Store
```shell
   db.createUser({user:"admin", pwd:"notmypassword", roles:[{role:"root", db:"admin"}]})
```
The yaml file in your `endpoint.yml` should be like this:

```yaml
tracker_store:
    type: mongod
    url: mongodb://localhost:27017
    db: dentbud_tracker_store
    username: admin
    password: password
```



## Select only the events needed in MongoDB
```shell
   db.conversations.aggregate( [
       { $unwind : "$events"},
       { $match: { $and:
           [
               {"sender_id": "default"},
               { $or: [{ "events.event":"user"}, {"events.event":"bot"}]}
           ]}},
       { $project: { "sender_id": 1, "events.timestamp": 1, "events.event": 1, "events.text": 1}}
   ]).pretty()
```