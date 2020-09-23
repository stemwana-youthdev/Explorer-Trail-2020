#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "Locations";

INSERT INTO "Locations" ("LocationId", "Name", "Latitude", "Longitude", "Url", "GooglePlaceId", "Phone", "Email")
VALUES (1,'Basestation','-37.6859551','176.16733','www.basestation.nz/en','ChIJ905i8dzbbW0RIvN_2Wp8sJQ','073456789','fred.smith@test.com'),
        (2,'Trustpower','-37.6857656','176.16797','www.trustpower.co.nz/','ChIJgxvxUurYbW0RuC2eHkOaUQA',NULL,NULL),
        (3,'i-SITE','-37.6855958','176.16909','www.newzealand.com/in/plan/business/tauranga-i-size-visitor-information-centre/','ChIJn9OKit3bbW0ROSguplmSk5U',NULL,NULL),
        (4,'Tauranga City Library','-37.6845175','176.16781','library.tauranga.govt.nz/','ChIJD5sBYefbbW0RP-oj-NNSuoA',NULL,NULL),
        (5,'Books a Plenty','-37.6859171','176.16779','www.booksaplenty.co.nz/','ChIJkyqysN3bbW0RRrh-Ace1gv8','073456789','fred.smith@test.com'),
        (6,'Alimento','-37.688499','176.16611','www.alimentoeatery.co.nz/','ChIJ_eXagdzbbW0RUQbIWy00x9Q',NULL,NULL),
        (7,'Cucumber','-37.6836433','176.16487','www.cucumber.co.nz/','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (8,'Farmers','-37.7416657','176.10072','www.farmers.co.nz/','ChIJP_Nj8kTbbW0RK93VBmEwep8',NULL,NULL),
        (9,'JB Hi-Fi','-37.675553','176.22124','www.jbhifi.co.nz/','ChIJX1yCTpjebW0RGyIxKXVn_ng','0213456789','fred.smith@test.com'),
        (10,'Tauranga Art Gallery','-37.6832424','176.16693','www.artgallery.org.nz/','ChIJ8TBZ9N3bbW0RvpRzvjAWLkY',NULL,NULL),
        (11,'Location of Challenge with a long name to test','-37.6895005','176.16982','www.facebook.com/GoldStarPatricksPies/',NULL,NULL,NULL),
        (12,'Location with no URL','-37.6789849','176.16858',NULL,NULL,NULL,'areally.long.email.address@longemailaddress.com'),
        (13,'Test Location 1','-37.683639','176.16486','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (14,'Test Location 2','-37.683439','176.165162','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (15,'Test Location 3','-37.683239','176.165462','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (16,'Test Location 4','-37.683039','176.165762','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (17,'Test Location 5','-37.682839','176.166062','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (18,'Test Location 6','-37.682639','176.166362','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (19,'Test Location 7','-37.682439','176.166662','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (20,' Test Location 8','-37.682239','176.166962','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (21,' Test Location 9','-37.682039','176.167262','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (22,'Test Location 10','-37.681839','176.167562','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (23,'Test Location','-37.681639','176.167862','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (24,'Test Location','-37.681439','176.168162','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (25,'Test Location','-37.681239','176.168462','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (26,'Test Location','-37.681039','176.168762','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (27,'Test Location','-37.683939','176.164462','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (28,'Test Location','-37.683739','176.164762','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (29,'Test Location','-37.683539','176.165062','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (30,'Test Location','-37.683339','176.165362','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (31,'Test Location','-37.683139','176.165662','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (32,'Test Location','-37.682939','176.165962','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (33,'Test Location','-37.682739','176.166262','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (34,'Test Location','-37.682539','176.166562','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (35,'Test Location','-37.682339','176.166862','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (36,'Test Location','-37.682139','176.167162','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (37,'Test Location','-37.681939','176.167462','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (38,'Test Location','-37.681739','176.167762','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (39,'Test Location','-37.681539','176.168062','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL),
        (40,'Test Location','-37.681339','176.168362','www.cucumber.co.nz','ChIJZemOP9vbbW0RPBgi3vEJfjE',NULL,NULL);

EOF