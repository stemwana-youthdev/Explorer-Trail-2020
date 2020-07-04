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
* Open a terminal and install the Entity Framework tools using `dotnet tool install --global dotnet-ef`.
* Navigate to the project folder and start the Docker containers using `docker-compose up --build` if they are not already running.
* In a new terminal tab, run the following commands:

```sh
# Navigate to the right directory
cd path/to/Explorer-Trail-2020
cd StemExplorerAPI/StemExplorerAPI

# Specify how to connect to the database
export ConnectionStrings__StemExplorer='User ID=stem;\
Password=stem2020;Server=localhost;Database=StemExplorer'

# Update the database to match the schemas
~/.dotnet/tools/dotnet-ef database update

# Open a SQL prompt in the Docker container
docker exec -it explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem
```

* You should see a prompt like `StemExplorer=#`.
* Copy and paste the following to create the example challenges and locations:

```sql
INSERT INTO "Locations" ("LocationId", "Name", "Latitude", "Longitude", "Url")
VALUES (1, 'Basestation', -37.6865807, 176.1649332,
        'https://www.basestation.nz/en'),
       (2, 'Trustpower', -37.6857656, 176.1679695,
        'https://www.trustpower.co.nz/'),
       (3, 'i-SITE', -37.6855958, 176.1690853,
        'https://www.newzealand.com/in/plan/business/tauranga-i-size-visitor-information-centre/'),
       (4, 'Tauranga City Library', -37.6845175, 176.1678085,
        'https://library.tauranga.govt.nz/');

INSERT INTO "Challenges" ("Id", "Title", "Description", "Category", "LocationId")
VALUES (1, 'Day of the Week',
        'Do you know what day of the week it is?',
        0, 1),
       (2, 'How many numbers',
        'We need to know how many numbers there are before 10, can you count them?',
        1, 2),
       (3, 'Biscuits, biscuits, biscuits!',
        'There may be a lot of different types of biscuits, but which ones are the best? There''s only one right answer!',
        2, 3),
       (4, 'Do you know your STEM',
        'Do you know what this letter in STEM stands for?',
        3, 4);
```

* Open [localhost:4200](http://localhost:4200/) in your browser and check that the website is getting the right data.
* The db is now setup with the example data.

# Usage notes

If you want to run any dotnet command that accesses the database inside of the docker container you will need to run:

```sh
export ConnectionStrings__StemExplorer='User ID=stem;\
Password=stem2020;Server=localhost;Database=StemExplorer'
```

For example you may wish to run `dotnet watch run` to restart dotnet when you edit the source code.