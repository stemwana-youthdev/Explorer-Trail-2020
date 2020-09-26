#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "ChallengeLevels";
INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "Difficulty", "AnswerType", "ChallengeId", "PossibleAnswers", "Answers","Instructions","Hint")
VALUES (3,'Where will these coordinates (-37.6859519,176.1656788) take you?',1,2,1,NULL,'{Basestation}','Switch on the GPS and enter the coordinates',NULL),
(4,'Convert the word STEM in Binary.',2,2,2,'{01010011 01010100 01000101 01001101}','{01010011 01010100 01000101 01001101}','Watch the video to know how. ','https://www.youtube.com/watch?v=FCFWu4NlUJQ'),
(5,'Look at the boats docked by the harbour. Why do you think they float even if they are heavy?',1,2,3,NULL,'{Buoyancy,Because they are buoyant}','Check this video for a hint. ','https://www.youtube.com/watch?v=c8bAI7oPkgc'),
(6,'Have a go at the slide. What do you call the force that kept you from going all the way down?',2,0,3,'{Push,Pull,Friction,Gravity}','{Friction}','Watch the video to understand how you don''t slip',NULL),
(7,'Take a handful of soil. What kind of mixture do you think is sand?',1,2,5,NULL,'{Heterogenous,Heterogenous Mixture}','Hint: ','https://www.youtube.com/watch?v=dW1Vn6cbTRE'),
(8,'Look around and name an item that has the golden ratio.',2,0,4,'{Waikato Building,Benches,Lampposts,Leaves}','{Waikato Building}','Watch the video to understand the Golden Ratio. ','https://www.youtube.com/watch?v=CPTmRSYZupA'),
(9,'What will you use to estimate the height of a tree without climbing it?',1,2,6,NULL,'{Hand}','Watch the video to find out how.','https://www.youtube.com/watch?v=F6fltSqImFM'),
(10,'Face the harbour and identify its direction (whether it''s North,South,East and West) based on the shadow of the lamp post',3,0,7,'{North,South,East,West}','{East}','Incorporate the concept of a Sundial to answer this question. More information on the video','https://www.youtube.com/watch?v=1SN1BOpLZAs'),
(11,'Look for Obsidian,which is one of the artifacts on display. It is a natural glass formed by the rapid cooling of viscuous lava from the volcano. What type of rock do you think it is?',2,2,8,NULL,'{Igneous,Igneous Rock}','The earth is made up of different types of rocks that are formed through different natural processes. Watch the video to know more about it.','https://www.youtube.com/watch?v=CeuYx-AbZdo'),
(12,'What is this state of matter that has a definite volume but no definite shape? ',1,0,9,'{Solid,Liquid,Gas,Plasma}','{Liquid}','Watch the video to answer this question','https://www.youtube.com/watch?v=JQ4WduVp9k4'),
(13,'What do you call the broken pieces of stone in the railway track that helps to hold the railway sleepers in place?',2,0,10,'{Sleeper,Fish Bolt,Fish Plate,Ballast}','{Ballast}','View the image', NULL),
(14,'What type of bridge is this?',1,0,11,'{Suspension,Slab,Truss,Cable-Stayed}','{Truss}','Read the short article to know more about the types of bridges','https://civiltoday.com/construction/bridge/243-bridge-definition-parts-types'),
(17,'Look at the roses. What do you call the yellow parts in the middle that holds the pollen?',1,2,14,'{Stamen}','{Stamen}','View the image', NULL),
(18,'What do you call this angle?',1,0,15,'{Right,Obtuse,Acute,None of the Above}','{Right}','View the image', NULL),
(19,'What technology is used to make this door open whenever there are people standing nearby?',2,0,16,'{Transmitter,Sensor,Robotics,All of the Above}','{Sensor}','Watch the video','https://www.youtube.com/watch?v=X0Ex1KXA08A'),
(20,'See how the clouds come in different shapes? There is a man who gave names to each type of cloud. Who is he?',1,2,17,'{Luke Howard}','{Luke Howard,Howard}','Watch the video about the Science of Clouds','https://www.youtube.com/watch?v=UuW1jhxCgx0'),
(21,'What do you call the type of cloud that is sometimes referred to as Cloud 9?',2,0,17,'{Nimbus,Cirro-stratus,Cumulus,Cumulo-nimbus}','{Cumulo-nimbus}',NULL,NULL),
(15,'What do you think is the pH of the soil based on the color of the Hydrangea?',2,0,12,'{pH 5-6,pH 7,pH 12-14,pH 0}','{pH 5-6}','Watch the video to know more','<a href=''https://www.youtube.com/watch?v=WRXihfUSAuk'' target=''_blank''>https://www.youtube.com/watch?v=WRXihfUSAuk</a>'),
(16,'Which of the following have a pH between 8-9?',3,0,13,'{Baking Soda}','{Baking Soda}','Dip the litmus paper to each of the solutions. Observe the color changes and answer the question.',NULL);

EOF