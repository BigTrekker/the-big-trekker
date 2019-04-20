SHELL := /bin/bash

COMPOSE = docker-compose -p "big-trekker"
PYTHON  = $(shell which python3)

logs: SERVICE=
logs:
	$(COMPOSE) logs --follow --tail 20 $(SERVICE)

bootstrap:
	virtualenv -p $(PYTHON) venv
	source venv/bin/activate
	pip3 install -r requirements.txt
	$(COMPOSE) pull

start:
	$(COMPOSE) up -d
	source venv/bin/activate
	python3 main.py

stop:
	$(COMPOSE) down

config:
	$(COMPOSE) config

exec:
	$(COMPOSE) exec $(SERVICE) sh

ps:
	$(COMPOSE) ps
