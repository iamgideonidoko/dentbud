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

RUN pip install -r requirements.txt

COPY ./ /app
