FROM python:3.8

RUN apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
        build-essential \
        curl \
        git \
        jq \
        libgomp1 \
        vim

WORKDIR /app

ADD requirements.txt /app/requirements.txt

# upgrade pip version
RUN pip install --no-cache-dir --upgrade pip

# install requirements
RUN pip install -r requirements.txt

# download language model for english
RUN python -m spacy download en_core_web_md

COPY ./ /app
