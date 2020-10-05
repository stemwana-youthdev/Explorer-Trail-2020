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
(1,'Find the Location','Navigation using coordinates',1,12),
(2,'Converting to Binary','Learning to convert text to Binary - a fundamental concept in coding',1,1),
(3,'Understanding Forces','Understand the forces in our everyday lives',0,5),
(4,'The Golden Ratio','Learn the basic concepts of the Golden Ratio and what is it used for',3,10),
(5,'Identify the Mixture','Learning about different types of mixtures',0,7),
(6,'Measurement','Learning how to measure height of a tree without actually climbing it',3,9),
(7,'Identifying Directions','Learning how to identify direction by using the concept of a sundial',0,16),
(8,'Learning about Rock Types','Understanding the type of rocks and how they are formed',0,3),
(9,'Identify the State of Matter','Learning more about the states of matter',0,13),
(10,'Identify Railway parts','Learning about the parts of a railway and its functions',2,15),
(11,'Identify the Type of Bridge','Learning about types of bridges and why they are designed that way',2,6),
(12,'Understanding pH','Learning how to determine the pH of certain substances',0,2),
(13,'Soil pH','Understanding the effects of soil pH',0,2),
(14,'Identify the parts of the flower','Understanding the different parts of a flower and their functions',0,7),
(15,'Identify the angles','Learning how to identify angles based on their measurements',3,8),
(16,'Mystery of Automatic Doors','Understanding how automatic doors were made and how they operate',1,4),
(17,'The Science of Clouds','Understanding the science behind the formation of clouds and how to classify different types of clouds',0,14),
(18,'Stormwater Management','Understanding stormwater',0,11),
(19,'Raingarden','Understanding how a raingarden works',2,11);
EOF