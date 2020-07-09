#!/bin/sh

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

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

INSERT INTO "ExternalContent" ("Id", "Title", "Url", "Order")
VALUES (1, 'Tauranga STEM Festival', 'https://www.taurangastemfestival.co.nz/', 2),
       (2, 'Google Maps', 'https://www.google.co.nz/maps', 1);

EOF