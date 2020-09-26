#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "ChallengeLevels";
INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "Difficulty", "AnswerType", "ChallengeId", "PossibleAnswers", "Answers","Instructions","Hint")
VALUES 
(7,'Take a handful of soil. What kind of mixture do you think is sand?',
        1,2,5,NULL,
        '{Heterogenous,Heterogenous Mixture}',
        'Watch the video in the hint!','<a href=''https://www.youtube.com/watch?v=dW1Vn6cbTRE'' target=''_blank''>https://www.youtube.com/watch?v=dW1Vn6cbTRE</a>'),
(10,'Face the harbour and identify its direction (whether it''s North, South, East or West) based on the shadow of the lamp post',
        3,0,7,'{North,South,East,West}','{East}',
        'Incorporate the concept of a Sundial to answer this question. More information on the video',
        '<a href=''https://www.youtube.com/watch?v=1SN1BOpLZAs'' target=''_blank''>https://www.youtube.com/watch?v=1SN1BOpLZAs</a>'),
(11,'Look for Obsidian, which is one of the artifacts on display. It is a natural glass formed by the rapid cooling of viscuous lava from the volcano. What type of rock do you think it is?',
        2,2,8,NULL,'{Igneous,Igneous Rock}',
        'The earth is made up of different types of rocks that are formed through different natural processes. Watch the video to know more about it.',
        '<a href=''https://www.youtube.com/watch?v=CeuYx-AbZdo'' target=''_blank''>https://www.youtube.com/watch?v=CeuYx-AbZdo</a>'),
(12,'What is this state of matter that has a definite volume but no definite shape?',
        1,0,9,'{Solid,Liquid,Gas,Plasma}','{Liquid}',
        'Watch the video to answer this question','<a href=''https://www.youtube.com/watch?v=JQ4WduVp9k4'' target=''_blank''>https://www.youtube.com/watch?v=JQ4WduVp9k4</a>'),
(14,'What type of bridge is this?',
        1,0,11,'{Suspension,Slab,Truss,Cable-Stayed}','{Truss}',
        'Read the short article to know more about the types of bridges',
        '<a href=''https://civiltoday.com/construction/bridge/243-bridge-definition-parts-types'' target=''_blank''>https://civiltoday.com/construction/bridge/243-bridge-definition-parts-types</a>'),
(20,'See how the clouds come in different shapes? There is a man who gave names to each type of cloud. Who is he?',
        1,2,17,NULL,'{Luke Howard,Howard}','Watch the video about the Science of Clouds',
        '<a href=''https://www.youtube.com/watch?v=UuW1jhxCgx0'' target=''_blank''>https://www.youtube.com/watch?v=UuW1jhxCgx0</a>'),
(21,'What do you call the type of cloud that is sometimes referred to as Cloud 9?',
        2,0,17,'{Nimbus,Cirro-stratus,Cumulus,Cumulo-nimbus}','{Cumulo-nimbus}',NULL,NULL),
(15,'What do you think is the pH of the soil based on the color of the Hydrangea?',
        2,0,12,'{pH 5-6,pH 7,pH 12-14,pH 0}','{pH 5-6}','Watch the video to know more',
        '<a href=''https://www.youtube.com/watch?v=WRXihfUSAuk'' target=''_blank''>https://www.youtube.com/watch?v=WRXihfUSAuk</a>'),
(16,'Which of the following have a pH between 8-9?',
        3,2,13,NULL,'{Baking Soda, Sodium hydrogen carbonate, Sodium bicarbonate, bicarb}',
        'Dip the litmus paper to each of the solutions. Observe the color changes and answer the question.',NULL);

EOF