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

INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "Difficulty", "AnswerType", "ChallengeId")
VALUES (1,
        'What is the best type of biscuit?',
        3, 0, 3),
       (2,
        'What does the "S" in STEM stand for?',
        0, 2, 4),
       (3,
        'What does the "T" in STEM stand for?',
        1, 2, 4),
       (4,
        'What does the "E" in STEM stand for?',
        2, 2, 4),
       (5,
        'What does the "M" in STEM stand for?',
        0, 2, 4);

INSERT INTO "ChallengeAnswers" ("Id", "AnswerText", "IsCorrect", "ChallengeLevelId")
VALUES (1, 'Shortbread', TRUE, 1),
       (2, 'Gingernuts', FALSE, 1),
       (3, 'Krispie', FALSE, 1),
       (4, 'Wine', FALSE, 1),
       (5, 'Science', TRUE, 2),
       (6, 'Technology', TRUE, 3),
       (7, 'Tech', TRUE, 3),
       (8, 'Engineering', TRUE, 4),
       (9, 'Mathematics', TRUE, 5),
       (10, 'Maths', TRUE, 5),
       (11, 'Math', TRUE, 5);

EOF