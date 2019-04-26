SHELL := /bin/bash

COMPOSE = docker-compose -p "big-trekker"
PYTHON  = $(shell which python3)
PWD = $(shell pwd)
SERVICE_ACCOUNT = $(PWD)/secret/service-account.json

logs: SERVICE=
logs:
	$(COMPOSE) logs --follow --tail 20 $(SERVICE)

bootstrap:
	virtualenv -p $(PYTHON) venv
	source venv/bin/activate
	pip3 install -r requirements.txt
	$(COMPOSE) pull

start:start-stack
	source venv/bin/activate
	BIG_TREKKER_ENV=dev GOOGLE_APPLICATION_CREDENTIALS=$(SERVICE_ACCOUNT) $(PYTHON) manage.py run 

test:start-stack
	source venv/bin/activate
	BIG_TREKKER_ENV=test GOOGLE_APPLICATION_CREDENTIALS=$(SERVICE_ACCOUNT) $(PYTHON) manage.py test 

stop-stack:
	$(COMPOSE) down

start-stack:
	$(COMPOSE) up -d

stack-config:
	$(COMPOSE) config

exec:
	$(COMPOSE) exec $(SERVICE) sh

ps:
	$(COMPOSE) ps

deploy: 
	gcloud app deploy --project big-trekker
