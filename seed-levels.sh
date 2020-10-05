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
(4,'Convert the word STEM in Binary',2,2,2,NULL,'{01010011 01010100 01000101 01001101}','Watch the video to know how.','
        <a href=''https://www.youtube.com/watch?v=FCFWu4NlUJQ'' target=''_blank''>Watch this video</a>'),
(8,'Look around and name an item that has the golden ratio.',2,0,4,'{Waikato Building,Benches,Lampposts,Leaves}','{Waikato Building}',
        'Watch the video to understand the Golden Ratio.','<a href=''https://www.youtube.com/watch?v=CPTmRSYZupA'' target=''_blank''>Watch this video</a>'),
(9,'What will you use to estimate the height of a tree without climbing it?',1,2,6,NULL,'{Hand}',
        'Watch the video to find out how.','<a href=''https://www.youtube.com/watch?v=F6fltSqImFM'' target=''_blank''>Watch this video</a>'),
(10,'Face the harbour and identify its direction (whether it''s North, South, East and West) based on the shadow of the lamp post',3,0,7,'{North,South,East,West}',
        '{East}','Incorporate the concept of a Sundial to answer this question. More information in the video in the hint','<a href=''https://www.youtube.com/watch?v=1SN1BOpLZAs'' target=''_blank''>Watch this video</a>'),
(11,'Look for Obsidian, which is one of the artifacts on display. It is a natural glass formed by the rapid cooling of viscuous lava from the volcano. What type of rock do you think it is?',2,2,8,NULL,
        '{Igneous,Igneous Rock}','The earth is made up of different types of rocks that are formed through different natural processes. Watch the video to know more about it.','<a href=''https://www.youtube.com/watch?v=CeuYx-AbZdo'' target=''_blank''>Watch this video</a>'),
(12,'What is this state of matter that has a definite volume but no definite shape?',1,0,9,'{Solid,Liquid,Gas,Plasma}','{Liquid}',
        'Watch the video in the hint to answer this question','<a href=''https://www.youtube.com/watch?v=JQ4WduVp9k4'' target=''_blank''>Watch this video</a>'),
(14,'What type of bridge is this?',1,0,11,'{Suspension,Slab,Truss,Cable-Stayed}','{Truss}','Read the short article in the link in the hint to know more about the types of bridges',
        '<a href=''https://civiltoday.com/construction/bridge/243-bridge-definition-parts-types'' target=''_blank''>Read this article</a>'),
(15,'What do you think is the pH of the soil based on the color of the Hydrangea?',2,0,12,'{pH 5-6,pH 7,pH 12-14,pH 0}','{pH 5-6}',
	'Watch the video in the hint to know more','<a href=''https://www.youtube.com/watch?v=WRXihfUSAuk'' target=''_blank''>Watch this video</a>'),
(16,'Which of the following have a pH between 8-9?',3,0,13,'{Baking Soda,Citric Acid,Bleach,Cream of Tartar}','{Baking Soda}',
        'Dip the litmus paper to each of the solutions. Observe the color changes. Use the pH scale to answer the questions.','<a href=''https://www.youtube.com/watch?v=V5Mq_cL9Bck'' target=''_blank''>Watch this video</a>'),
(19,'What technology is used to make this door open whenever there are people standing nearby?',2,0,16,'{Transmitter,Sensor,Robotics,All of the Above}','{Sensor}',
        'Watch the video in the hint','<a href=''https://www.youtube.com/watch?v=X0Ex1KXA08A'' target=''_blank''>Watch this video</a>'),
(20,'See how the clouds come in different shapes? There is a man who gave names to each type of cloud. Who is he?',1,2,17,NULL,'{Luke Howard,Howard}',
        'Watch the video in the hint about the Science of Clouds','<a href=''https://www.youtube.com/watch?v=UuW1jhxCgx0'' target=''_blank''>Watch this video</a>'),
(22,'What pollutants can be found in Stormwater run off?',1,0,18,'{Nothing it''s just water,Heavy metals suspended solids and litter,Wastewater}','{Heavy metals suspended solids and litter}',
        'Check the hint to know more about Stormwater system',
        'In Tauranga, stormwater is polluted with suspended solids from development, heavy metals from vehicles and roofing materials and litter that gets blown into or dropped in the streets. Unlike some other places in New Zealand, Tauranga’s wastewater and stormwater networks are not connected, so it’s very rare to have wastewater in our stormwater.'),
(23,'How does a raingarden work?',1,0,19,'{Magic is just happens,Water flows into the rain garden and slowly filters through plant roots and media which remove pollutants,Water flows into the rain garden which holds the water and the pollutants evaporate off}',
        '{Water flows into the rain garden and slowly filters through plant roots and media which remove pollutants}','Check the hint to find out','Rain gardens are designed to temporarily hold rain water, allowing the water to filter through vegetation and soil media which remove the pollutants. They help to improve the water quality of stormwater discharges to waterways and the harbour');

EOF