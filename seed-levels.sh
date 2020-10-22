#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "ChallengeLevels";
INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "QuestionImage",
        "QuestionImageHelperText", "Difficulty", "AnswerType", "ChallengeId",
        "PossibleAnswers", "Answers","Instructions", "InstructionsImage",
        "InstructionsImageHelperText", "Hint", "VideoEmbedUrl")
VALUES 
(1,'Convert the word CODE in Binary.',NULL,NULL,1,2,1,NULL,'{01000011 010001111 01000100 01000101}',
        'Look at the image to help convert the word to binary','/assets/images/binary.png','The alphabet in binary. Image from: https://chandra.si.edu/binary/',
        'Another word for computer language',NULL),
(2,'Why do you think these boats float even if they are heavy?',NULL,NULL,1,0,2,
        '{The upward force of the water is greater than the weight of the boat,The weight of the boat is greater than the upward force of the water,both a and b}',
        '{The upward force of the water is greater than the downward force of gravity}',
        'Observe the boats docked at the harbour they are heavy, waves move them but they remain afloat.',NULL,NULL,
        'Buoyancy is a force that water exerts upward. If this force is greater than the weight of any object that gets dropped into water, then the object would float',NULL),
(3,'What do you call the force that kept you from accelerating while you go down the slide?',NULL,NULL,1,0,3,
        '{Push,Pull,Friction,Gravity}','{Friction}',
        'Have a go at the slide and pay attention to the resisting force that keeps you from moving too fast',NULL,NULL,
        'There is a reason why our shoes don''t slip when we run or the car wheels don''t skid when brakes are applied. This is called friction and it is the force that opposes motion and gets produced when two objects rub to another.',NULL),	
(4,'What kind of soil do you think is used to plant these roses?',NULL,NULL,1,0,4,'{Clay,Loam,Silt,Sand}','{Loam}',
        'Look at the soil and compare the appearance of it to the image below.','/assets/images/soil.png',
        'Four different types of soil. Image from: https://byjus.com/biology/types-of-soil/',
        'Common soils for gardening: Clay - for perennials such as bergamot or ornamental trees, Sandy soils - for shrubs and bulbs, Silts - for moisture-loving trees and some shrubs, Loam - good for almost everything especially perennials like roses, ferns and hydrangeas',NULL),
(5,'What type of rock do you think Obsidian is based on the image below?','/assets/images/Rock-Cycle.png','The cycle of rocks. Image from: http://www.cotf.edu/ete/modules/msese/earthsysflr/rock.html',
        1,2,5,NULL,'{Igneous,Igneous Rock}',
        'Obsidian is a rock that''s formed when lava from volcanoes cool rapidly. Look for Obsidian at the artifacts display and answer the question that followed.',NULL,NULL,
        'Obsidian is a natural glass formed by the rapid cooling of viscuous lava from the volcano.',NULL),
(6,'How do you think the fishes feel based on its behaviour?',NULL,NULL,1,0,6,'{Happy,Stressed,Sad,None of the above}',
        '{Happy}','Observe the fishes in the aquarium and evaluate their behaviour',NULL,NULL,
        'Fishes are happy when they actively swim and swim rapidly towards their food. They are stressed, however, if they don''t eat or just crash at the bottom of the aquarium.',NULL),
(7,'What technology is used to make this door open as people approach to enter this building?',NULL,NULL,1,0,7,
        '{Transmitter,Sensor,Robotics,All of the Above}','{Sensor}','Walk towards the door and observe how it automatically opens and closes.',
        NULL,NULL,'An automatic door is an advanced technology that uses motion or optical sensor. These are usually installed on each side of the door or mounted above the set of automatic doors, so that when people approach, it will trigger it to open and close.',NULL),
(8,'How does a raingarden work?',NULL,NULL,1,0,8,'{Magic is just happens,Water flows into the rain garden and slowly filters through plant roots and media which remove pollutants,Water flows into the rain garden which holds the water and the pollutants evaporate off}',
	'{Water flows into the rain garden and slowly filters through plant roots and media which remove pollutants}','Look at the Rain gardens, they are designed to temporarily hold rain water, allowing the water to filter through vegetation and soil media which remove the pollutants. They help to improve the water quality of stormwater discharges to waterways and the harbour',
        NULL,NULL,'Raingardens act as natural filters',NULL),
(9,'What do you think is its component that gives paint its color?',NULL,NULL,1,0,9,'{Dye,Binder,Pigment,Solvents}','{Pigment}',
        'Paint is a solution that are used to decorate or protect walls. It has four major components: Solvents, Additives, Pigments and Binder. Look at the paint on the wall and think about how they can be made into different colors.',NULL,NULL,
        'Solvents are the liquid part that allows paint to be applied on surfaces. Binders are used to bind the pigments together and create the paint film. Pigments give color to the paint, and Additives are ingredients that give paint its properties (i.e. water-soluble, mildew-resistant, etc.)',NULL),
(10,'What do you think is the measure of the angle on the lower left side of the window?',NULL,NULL,1,0,10,'{45 degrees,90 degrees,130 degrees,180 degrees}',
	'{90 degrees}','Look at the rectangular-shaped window of the car park behind you and compare the sape of the lower left side of it to the image below.',
        '/assets/images/angles.png','An image of 5 different angles. Image from: https://www.splashlearn.com/math-vocabulary/geometry/angle',
        'There are six different types of angles and each have different measurements. Acute angles measure less than 90 degrees, Right angles measure exactly 90 degrees, Obtuse angles are greater than 90 but less than 180, Straight angles measure at exactly 180 degrees, Reflex angles are more than 180 degrees and less than 360 degrees and Full revolution, which measures at 360 degrees.',NULL);
EOF
