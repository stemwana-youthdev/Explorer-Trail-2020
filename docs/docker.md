# What is Docker?

Docker is a popular tool to create containers. It allows code to be run in an environment that is consistent, so that all of the same software is installed no matter who runs the container. It also isolates programs so that they can not interfere with each other.
For more information check out the explanation on [the Docker website](https://www.docker.com/resources/what-container).

Docker Desktop is an application that allows Docker to be run on macOS and Windows computers.

Docker Compose is a tool that is bundled with Docker Desktop for creating groups of Docker containers. It is designed for development, and separate tools are used on servers.

# Running the app with Docker

* Download [Docker Desktop](https://www.docker.com/products/docker-desktop).
* Start Docker Destop.
* Open a terminal and go to the Explorer Trail folder (you need to have cloned it).
* Run `docker-compose up` to start the containers. The first time that you do this it will take some time to download the dependencies.
* Wait until the containers have started. You should see some lines with coloured text starting with `explorer_trail`. These are logs from the containers with those names.
* Once the output stops moving you can check that it is working by going to [localhost:4200](http://localhost:4200/) in your browser. You may not see any content, as the database is not setup.
* You can also check that the .NET back-end is working by going to [http://localhost:5000/api/Home/HealthCheck](http://localhost:5000/api/Home/HealthCheck).
* To stop the containers, press `ctrl-c`. The shortcut is also `control-c` on macOS.

When you make some changes, you may need to run `docker-compose build` to tell Docker Compose that it needs to rebuild the container images.
