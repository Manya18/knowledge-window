FROM python:3.13-slim

WORKDIR ./model

COPY . /model/

RUN apt-get update

RUN apt-get --assume-yes install wget

RUN pip install --upgrade pip

RUN pip install --upgrade setuptools

RUN pip install -r requirements.txt

CMD ["python", "main.py", "--multiprocess"]
