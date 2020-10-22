#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "Challenges";
INSERT INTO "Challenges" ("Id","Title","Description","Category","LocationId")
VALUES 
(1,'Converting to Binary','Learning to convert text to binary - a fundamental concept in coding',1,1),
(2,'Buoyancy','Exploring the concept of buoyancy',0,9),
(3,'Understanding Forces','Understand the forces in our everyday lives',0,5),
(4,'Understanding Soil','Identifying the differet types of soils that are used for gardening',3,6),
(5,'Rocks','Identifying the different types of rocks and how they are formed',0,3),
(6,'Understanding Fishes','Learning about the behaviour of fishes',0,2),
(7,'Mystery of Automatic Doors','Understanding how automatic doors were made and how they operate',1,4),
(8,'Raingarden','Understanding how a raingarden works',2,7),
(9,'Paints','Understanding the composition of paint',0,10),
(10,'Understanding Angles','Identifying and learning about angles and measurements',3,8),

(11,'Find the Location','Navigation using coordinates',1,12),
(12,'The Golden Ratio','Learn the basic concepts of the Golden Ratio and what is it used for',3,10),
(13,'Identify the Mixture','Learning about different types of mixtures',0,7),
(14,'Measurement','Learning how to measure height of a tree without actually climbing it',3,9),
(15,'Identifying Directions','Learning how to identify direction by using the concept of a sundial',0,16),
(16,'Identify the State of Matter','Learning more about the states of matter',0,13),
(17,'Identify Railway parts','Learning about the parts of a railway and its functions',2,15),
(18,'Identify the Type of Bridge','Learning about types of bridges and why they are designed that way',2,6),
(19,'Understanding pH','Learning how to determine the pH of certain substances',0,2),
(20,'Soil pH','Understanding the effects of soil pH',0,2),
(21,'Identify the parts of the flower','Understanding the different parts of a flower and their functions',0,7),
(22,'The Science of Clouds','Understanding the science behind the formation of clouds and how to classify different types of clouds',0,14),
(23,'Stormwater Management','Understanding stormwater',0,11);
EOF