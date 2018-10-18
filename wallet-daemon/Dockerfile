FROM node:9.11.2

USER root

WORKDIR /code

RUN apt-get update \
	&& apt-get install -y git build-essential python

ADD daemon /code/
ADD tx-db.json /code/tx_dump.json
ADD invoices.json /code/invoices.json
ADD config.json /code/config.json

RUN npm install

EXPOSE 80

ENTRYPOINT ["node", "dist"]
