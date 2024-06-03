VENV := .venv

rm_venv:
	source deactivate || true
	rm -rf $(VENV)

$(VENV): rm_venv
	command -v deactivate && source deactivate || true
	python -m venv $(VENV)
	source $(VENV)/bin/activate && pip install --upgrade pip pip-tools

requirements.txt: requirements.in
	test -r $(VENV) || make $(VENV)
	source $(VENV)/bin/activate \
	&& pip-compile --no-emit-index-url --output-file requirements.txt requirements.in

setup:
	test -r $(VENV) || make $(VENV)
	test -f requirements.txt || make requirements.txt
	source $(VENV)/bin/activate && pip install -r requirements.txt

runserver:
	source $(VENV)/bin/activate && ./manage.py runserver 0.0.0.0:8000

pip_sync: requirements.txt
	source $(VENV)/bin/activate && pip-sync requirements.txt

runtest:
	$(VENV)/bin/python manage.py test --keepdb $(spec)
