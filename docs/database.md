# What is PostgreSQL?

PostgreSQL is an open-source, relational SQL database. A relational database stores data in tables, and has links between these tables. SQL is a language that is used to interact with the database, but we will not have to worry about this as we are using Entity Framework.

# What is Entity Framework?

Entity Framework (EF) is an object-relational mapper for .NET Core. It bridges the gap between the relational world of SQL and the object-oriented world of .NET. Some of its benifits are:

* Using normal C# types in our classes,
* Handling performance optimizations for us so we can concentrate on functionality,
* Mapping between objects in a nice object oriented way,
* Models are written just in C#, without worrying about SQL,
* It allows the same code to be used with a range of databases,

*Summarized from https://docs.microsoft.com/en-us/ef/ef6/. EF6 is not EF Core, but they share the same principles.*

# Setting up a database

This tutorial is for setting up the database defined in docker-compose.yml. You may prefer to run the database directly on your machine, but you will have to adapt the commands that I am using.

* You need to have Docker installed and running. If you don't please read [the Docker tutorial](./docker.md). You also need the .NET Core SDK.
* Navigate to the project folder and start the Docker containers using `docker-compose up --build` if they are not already running.
* In a new terminal tab, run `./db-seed.sh`.
* Open [localhost:4200](http://localhost:4200/) in your browser and check that the website is getting the right data.
* The db is now setup with the example data.

# Usage notes

If you are going to modify the database structure you will need to install the Entity Framework tools using `dotnet tool install --global dotnet-ef`.

To use `dotnet ef` you need to set the following environment variables. You can either run these before you use it each time or put them in `~/.bash_profile` (`~/.zprofile` if your vscode terminal says zsh).

```sh
export PATH="$PATH:~/dotnet/tools"
export ConnectionStrings__StemExplorer='User ID=stem;\
Password=stem2020;Server=localhost;Database=StemExplorer'
```

You can also open a SQL prompt inside of the container using:

```sh
docker exec -it explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem
```
