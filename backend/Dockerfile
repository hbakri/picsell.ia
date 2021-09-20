# The Google App Engine python runtime is Debian Jessie with Python installed
# and various os-level packages to allow installation of popular Python
# libraries. The source is on github at:
# https://github.com/GoogleCloudPlatform/python-docker
FROM gcr.io/google_appengine/python

# This prevents Python from writing out pyc files.
ENV PYTHONDONTWRITEBYTECODE 1

# This keeps Python from buffering stdin/stdout.
ENV PYTHONUNBUFFERED 1

# Create a non-root user for the container.
RUN useradd --create-home user
ARG APP_DIRECTORY=/home/user/app/backend

# Create a virtualenv for the application dependencies.
RUN pip3 install --upgrade pip && pip3 install --upgrade virtualenv
RUN virtualenv -p python3 /home/user/env

# Set virtualenv environment variables. This is equivalent to running
# source /env/bin/activate. This ensures the application is executed within
# the context of the virtualenv and will have access to its dependencies.
ENV VIRTUAL_ENV /home/user/env
ENV PATH /home/user/env/bin:$PATH

ADD requirements.txt /home/user/requirements.txt
RUN pip3 install -r /home/user/requirements.txt
WORKDIR $APP_DIRECTORY
ADD --chown=user . $APP_DIRECTORY

# Run the container as a non-root user.
USER user
