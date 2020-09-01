#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

INSERT INTO "Locations" ("LocationId", "Name", "Latitude", "Longitude", "GooglePlaceId", "Url", "Phone", "Email")
VALUES (1, 'Basestation', -37.6865807, 176.1649332, 'ChIJ905i8dzbbW0RIvN_2Wp8sJQ',
        'https://www.basestation.nz/en', "0800000577", "info@basestation.nz"),
       (2, 'Trustpower', -37.6865807, 176.1649332, 'ChIJgxvxUurYbW0RuC2eHkOaUQA',
        'https://www.trustpower.co.nz/', "0800878787", "info@trustpower.co.nz"),
       (3, 'i-SITE', -37.6835924, 176.1677695, 'ChIJn9OKit3bbW0ROSguplmSk5U',
        'https://www.newzealand.com/in/plan/business/tauranga-i-size-visitor-information-centre/', "075788103", "tauranga@newzealand.com"),
       (4, 'Tauranga City Library', -37.6828031, 176.1664596, 'ChIJD5sBYefbbW0RP-oj-NNSuoA'
        'https://library.tauranga.govt.nz/', "075777177", "library@tauranga.govt.nz");

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
        3, 4),
        (5, 'How many numbers',
        'We need to know how many numbers there are before 20, can you count them?',
        3, 2);

INSERT INTO "ExternalContent" ("Id", "Title", "Url", "Order")
VALUES (1, 'Tauranga STEM Festival', 'https://www.taurangastemfestival.co.nz/', 3),
       (2, 'Google Maps', 'https://www.google.co.nz/maps', 2),
       (3, 'Contact Us', 'https://www.taurangastemfestival.co.nz/contact-us/', 1),
       (4, 'About the App', 'https://stemwana.nz/about-stem-explorer-trail/', 4);

INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "Difficulty", "AnswerType", "ChallengeId", "PossibleAnswers", "Answers")
VALUES (1,
        'Is Monday a day of the week?',
        1, 0, 1,
        '{Yes, No}',
        '{Yes}'),
       (2,
        'Is Tuesday a day of the week?',
        2, 0, 1,
        '{Yes, No}',
        '{Yes}'),
       (3,
        'Is Wednesday a day of the week?',
        3, 0, 1,
        '{Yes, No}',
        '{Yes}'),
       (4,
        'Is Thursday a day of the week?',
        4, 0, 1,
        '{Yes, No}',
        '{Yes}'),
       (5,
        'How many numbers are there before 10?',
        1, 1, 2,
        null,
        '{10}'),
       (6,
        'What is the best type of biscuit?',
        4, 0, 3,
        '{Shortbread, Gingernut, Krispie, Wine}',
        '{Shortbread}'),
       (7,
        'What does S stand for in STEM?',
        1, 2, 4,
        null,
        '{Science}'),
       (8,
        'What does T stand for in STEM?',
        2, 2, 4,
        null,
        '{Technology, Tech}'),
       (9,
        'What does E stand for in STEM?',
        3, 2, 4,
        null,
        '{Engineering}'),
       (10,
        'What does M stand for in STEM?',
        4, 2, 4,
        null,
        '{Mathematics, Math, Maths}');

UPDATE "ChallengeLevels"
        SET "Instructions" = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
        WHERE "Id" = 1 OR "Id" = 9;
UPDATE "ChallengeLevels"
        SET "Instructions" = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
        WHERE "Id" = 2 OR "Id" = 4 OR "Id" = 6 OR "Id" = 8;
UPDATE "ChallengeLevels"
        SET "Instructions" = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        WHERE "Id" = 3 OR "Id" = 7 OR "Id" = 10;
UPDATE "ChallengeLevels"
        SET "Instructions" = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'
        WHERE "Id" = 5;

UPDATE "ChallengeLevels"
        SET "Hint" = 'Hint goes here testing...';

EOF