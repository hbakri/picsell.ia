.PHONY: build
build:
	@docker-compose build

.PHONY: migrations
migrations:
	@docker-compose run --rm django sh -c "\
	python manage.py makemigrations images &&\
	python manage.py makemigrations &&\
	python manage.py migrate images &&\
	python manage.py migrate"
	@docker-compose stop postgres

.PHONY: deletemigrations
deletemigrations:
	@find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	@find . -path "*/migrations/*.pyc"  -delete

.PHONY: superuser
superuser:
	@docker-compose run --rm django python manage.py createsuperuser
	@docker-compose stop postgres

.PHONY: test
test:
	@docker-compose run --rm django python manage.py test
	@docker-compose stop postgres

.PHONY: up
up:
	@docker-compose up

.PHONY: down
down:
	@docker-compose down
