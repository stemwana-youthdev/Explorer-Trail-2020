#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "Locations";

INSERT INTO "Locations" ("LocationId", "Name", "Latitude", "Longitude", "Url", "GooglePlaceId", "Phone", "Email")
VALUES 
(2, 'STEM HQ','-37.6852274','176.169554','https://stemwana.nz','ChIJcbv3p8vbbW0RDh2xBjVnW5Y',NULL,NULL),
(3, 'Tauranga City Library','-37.6828074','176.168648','https://library.tauranga.govt.nz/','ChIJD5sBYefbbW0RP-oj-NNSuoA',NULL,NULL),
(6, 'Tauranga Harbour Bridge','-37.6868384','176.170551',NULL,NULL,NULL,NULL),
(7, 'Robbins Park (Rose Garden)','-37.6785922','176.16993','https://nzroses.org.nz/robbins-park-tauranga/','ChIJn-qg2v_bbW0RvJdrRFj9ICU',NULL,NULL),
(8, 'The Red Square','-37.6843611','176.169493',NULL,'ChIJnQmXE93bbW0RJJfvr-mVObw',NULL,NULL),
(11, 'Trustpower','-37.6852996','176.167088','https://www.trustpower.co.nz/','ChIJgxvxUurYbW0RuC2eHkOaUQA',NULL,NULL),
(12, 'Tourism BOP i-Site','-37.6834958','176.169408','https://www.bayofplentynz.com/','ChIJn9OKit3bbW0ROSguplmSk5U',NULL,NULL),
(13, 'ANZ','-37.684608','176.168302',NULL,'ChIJd11cu93bbW0RNOIA1Gw6-jU',NULL,NULL),
(14, 'The Elms','-37.6769001','176.167888','https://www.theelms.org.nz/','ChIJZztOMeTbbW0RwatcxISscI8',NULL,NULL),
(15, 'Angel Wings Mural','-37.6840611','176.169742',NULL,'ChIJe0DLC97bbW0RDf9jo_ssV1g',NULL,NULL),
(16, 'Tauranga Seafront','-37.6828459','176.169782',NULL,NULL,NULL,NULL);
EOF