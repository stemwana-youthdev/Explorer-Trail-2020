# What is Docker?

Docker is a popular tool to create containers. It allows code to be run in an environment that is consistent, so that all of the same software is installed no matter who runs the container. It also isolates programs so that they can not interfere with each other.
For more information check out the explanation on [the Docker website](https://www.docker.com/resources/what-container).

Docker Desktop is an application that allows Docker to be run on macOS and Windows computers.

Docker Compose is a tool that is bundled with Docker Desktop for creating groups of Docker containers. It is designed for development, and separate tools are used on servers.

# Running the app with Docker

To get started with Docker you will need to download [Docker Desktop](https://www.docker.com/products/docker-desktop).

Once that is downloaded, open up a terminal and go to the Explorer Trail folder (you need to have cloned it earlier). Run `docker-compose up` to start the containers. The first time that you do this it will take some time to download the dependencies, but once the output calms down you can check that it is working by going to [localhost:4200](http://localhost:4200/) in your browser.

When you make some changes, you may need to run `docker-compose build` to tell Docker Compose that it needs to rebuild the container images.
