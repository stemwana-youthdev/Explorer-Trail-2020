#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "ExternalContent";
INSERT INTO "ExternalContent" ("Id", "Title", "Url", "Order")
VALUES (1, 'Tauranga STEM Festival', 'https://www.taurangastemfestival.co.nz/', 3),
       (2, 'Contact Us', 'https://www.taurangastemfestival.co.nz/contact-us/', 2),
       (3, 'About the App', 'https://stemwana.nz/about-stem-explorer-trail/', 1);

EOF