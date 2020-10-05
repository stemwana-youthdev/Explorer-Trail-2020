#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

DELETE FROM "Locations";
INSERT INTO "Locations" ("LocationId", "Name", "Latitude", "Longitude", "Url", "GooglePlaceId", "Phone", "Email", "Address")
VALUES 
(1,'Basestation','-37.686501','176.167175','https://www.basestation.nz','ChIJ905i8dzbbW0RIvN_2Wp8sJQ','0800 000 577',NULL,'148 Durham Street Tauranga 3110'),

(2,'STEM HQ','-37.685192','176.169379','https://stemwana.nz','ChIJcbv3p8vbbW0RDh2xBjVnW5Y',NULL,NULL,'27 Devonport Road, Tauranga 3110'),

(3,'Tauranga City Library','-37.683150','176.168412','https://library.tauranga.govt.nz/','ChIJD5sBYefbbW0RP-oj-NNSuoA','6475777177',NULL,'91 Willow Street, Tauranga 3110'),

(4,'Tauranga Art Gallery','-37.683226','176.169094','https://www.artgallery.org.nz/','ChIJ8TBZ9N3bbW0RvpRzvjAWLkY','6475787933',NULL,'108 Willow Street, Tauranga 3141'),

(5,'Playground at The Strand','-37.682759','176.170447',NULL,'ChIJiZqcT-XbbW0RkghoF1isOOQ',NULL,NULL,'78 The Strand, Tauranga 3110'),

(6,'Matapihi Railwaybridge','-37.687021','176.170609',NULL,NULL,NULL,NULL,'150 The Strand, Tauranga 3110'),

(7,'Robbins Park (Rose Garden)','-37.678620','176.169868','https://nzroses.org.nz/robbins-park-tauranga/','ChIJn-qg2v_bbW0RvJdrRFj9ICU',NULL,NULL,'7 Cliff Road, Tauranga 3110'),

(8,'Red Square','-37.684393','176.169347',NULL,'ChIJnQmXE93bbW0RJJfvr-mVObw',NULL,NULL,'Spring Street, Tauranga 3110'),

(9,'Memorial Park','-37.698406','176.165399','https://www.tauranga.govt.nz/exploring/parks-and-reserves/parks/memorial-park','ChIJMaygGc7bbW0R0B6dJGLvAA8',NULL,NULL,'Eleventh Avenue, Tauranga 3110'),

(10,'University of Waikato','-37.685510','176.167004','https://tauranga.waikato.ac.nz/','ChIJj3H6avzbbW0RULwvrR5XC34',NULL,NULL,'113 Durham Street, Tauranga 3110'),

(11,'Trustpower','-37.685489','176.167390','https://www.trustpower.co.nz/','ChIJgxvxUurYbW0RuC2eHkOaUQA','64800878787',NULL,'108 Durham Street, Tauranga 3110'),

(12,'Tourism BOP i-Site','-37.683588','176.169919','https://www.bayofplentynz.com/','ChIJn9OKit3bbW0ROSguplmSk5U','6475788103',NULL,'103 The Strand, Tauranga 3110'),

(13,'ANZ Bank','-37.684647','176.168299',NULL,'ChIJd11cu93bbW0RNOIA1Gw6-jU',NULL,NULL,'1 Grey Street, Tauranga 3110'),

(14,'The Elms','-37.676884','176.168024','https://www.theelms.org.nz/','ChIJZztOMeTbbW0RwatcxISscI8','6475779772',NULL,'15 Mission Street, Tauranga 3110'),

(15,'Angel Wings Mural','-37.684104','176.170213',NULL,'ChIJe0DLC97bbW0RDf9jo_ssV1g',NULL,NULL,'117 The Strand, Tauranga 3110'),

(16,'Tauranga Seafront','-37.682977','176.170535',NULL,'ChIJ6-7mp-XbbW0RrtFGblLrm1Q',NULL,NULL,'80 The Strand, Tauranga 3110');
EOF