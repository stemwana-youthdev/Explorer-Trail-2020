#!/bin/sh

# By default this script wipes the database and then fills it with some example content
# To skip wiping the DB, run `./db-seed.sh keep`

# Open a SQL prompt in the Docker container
db_connection() {
  docker exec -i explorer-trail-2020_explorer_trail_db_1 \
    psql -d StemExplorer -U stem
}

# Clean the database
if [ "$1" != "keep" ]; then
  # Everything inside of the brackets has it's stdout piped to db_connection
  {
    tables=(
      Progress
      Profiles
      Users
      ChallengeLevels
      Challenges
      Locations
      ExternalContent
    )
    for table in "${tables[@]}"; do
      # Log some stuff to stderr so that it isn't sent to db_connection
      echo Clearing \"$table\" table contents >&2

      echo DELETE FROM \"$table\"\;
    done
  } | db_connection
fi

# Add some example content
echo Inserting example content >&2
db_connection << EOF

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

DELETE FROM "Challenges";
INSERT INTO "Challenges" ("Id", "Title", "LocationId", "Description", "Category")
VALUES (1, 'Square Roots', 1, 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into', 3),
        (2, 'Microsoft Questions', 2, 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph', 1),
        (3, 'Months of the year', 3, 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic lif', 2),
        (4, 'Who let the dogs out?', 4, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam', 3),
        (5, 'Who discovered the atom?', 5, 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me?" he thought. It wasn''t a dream.', 0),
        (6, 'Find something blue', 6, 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph', 1),
        (7, 'Where is the mouse?', 7, 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic lif', 2),
        (8, 'Who let the dogs out?', 8, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam', 3),
        (9, 'Challenge 13', 9, 'It is a paradisematic country.', 0),
        (10, 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce.', 10, 'It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn''t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. ', 3),
        (11, 'Sugar-coated Lorem Ipsum Generator. Tired of how boring Lorem Ipsum got?', 11, 'Cupcake ipsum dolor sit amet. Wafer topping brownie pie sweet roll donut carrot cake sugar plum. Wafer pie candy cookie jelly-o sesame snaps. Sweet icing pudding biscuit sweet roll liquorice sugar plum jelly-o.', 3),
        (12, 'Two Challenges at one location but 10 levels', 11, 'Cookie cake icing croissant candy canes danish liquorice. Apple pie chocolate bar carrot cake sugar plum sesame snaps powder. ', 0),
        (13, 'Single Level Only', 12, 'Marzipan carrot cake marshmallow tiramisu dessert carrot cake. Pastry candy fruitcake danish cheesecake biscuit candy canes dragée donut. Lemon drops jelly beans pie marzipan chocolate lollipop cupcake gummies biscuit.', 0),
        (14, 'Challenge Title for one of the test locations', 13, 'Duplicate test data for a test location', 0),
        (15, 'Challenge Title for one of the test locations', 14, 'Duplicate test data for a test location', 1),
        (16, 'Challenge Title for one of the test locations', 15, 'Duplicate test data for a test location', 2),
        (17, 'Challenge Title for one of the test locations', 16, 'Duplicate test data for a test location', 3),
        (18, 'Challenge Title for one of the test locations', 17, 'Duplicate test data for a test location', 0),
        (19, 'Challenge Title for one of the test locations', 18, 'Duplicate test data for a test location', 1),
        (20, 'Challenge Title for one of the test locations', 19, 'Duplicate test data for a test location', 2),
        (21, 'Challenge Title for one of the test locations', 20, 'Duplicate test data for a test location', 3),
        (22, 'Challenge Title for one of the test locations', 21, 'Duplicate test data for a test location', 0),
        (23, 'Challenge Title for one of the test locations', 22, 'Duplicate test data for a test location', 1),
        (24, 'Challenge Title for one of the test locations', 23, 'Duplicate test data for a test location', 2),
        (25, 'Challenge Title for one of the test locations', 24, 'Duplicate test data for a test location', 3),
        (26, 'Challenge Title for one of the test locations', 25, 'Duplicate test data for a test location', 0),
        (27, 'Challenge Title for one of the test locations', 26, 'Duplicate test data for a test location', 1),
        (28, 'Challenge Title for one of the test locations', 27, 'Duplicate test data for a test location', 2),
        (29, 'Challenge Title for one of the test locations', 28, 'Duplicate test data for a test location', 3),
        (30, 'Challenge Title for one of the test locations', 29, 'Duplicate test data for a test location', 0),
        (31, 'Challenge Title for one of the test locations', 30, 'Duplicate test data for a test location', 1),
        (32, 'Challenge Title for one of the test locations', 31, 'Duplicate test data for a test location', 2),
        (33, 'Challenge Title for one of the test locations', 32, 'Duplicate test data for a test location', 3),
        (34, 'Challenge Title for one of the test locations', 33, 'Duplicate test data for a test location', 0),
        (35, 'Challenge Title for one of the test locations', 34, 'Duplicate test data for a test location', 1),
        (36, 'Challenge Title for one of the test locations', 35, 'Duplicate test data for a test location', 2),
        (37, 'Challenge Title for one of the test locations', 36, 'Duplicate test data for a test location', 3),
        (38, 'Challenge Title for one of the test locations', 37, 'Duplicate test data for a test location', 0),
        (39, 'Challenge Title for one of the test locations', 38, 'Duplicate test data for a test location', 1),
        (40, 'Challenge Title for one of the test locations', 39, 'Duplicate test data for a test location', 2),
        (41, 'Challenge Title for one of the test locations', 40, 'Duplicate test data for a test location', 3);

DELETE FROM "ExternalContent";
INSERT INTO "ExternalContent" ("Id", "Title", "Url", "Order")
VALUES (1, 'Tauranga STEM Festival', 'https://www.taurangastemfestival.co.nz/', 3),
       (2, 'Contact Us', 'https://www.taurangastemfestival.co.nz/contact-us/', 2),
       (3, 'About the App', 'https://stemwana.nz/about-stem-explorer-trail/', 1);

DELETE FROM "ChallengeLevels";
INSERT INTO "ChallengeLevels" ("Id", "QuestionText", "Difficulty", "AnswerType", "ChallengeId", "PossibleAnswers", "Answers","Instructions","Hint")
VALUES (11,
        'What is the square root of 16?',
        1,
        1,
        1,
        NULL,
        '{4}',
        'We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(12,'What is the square root of 81?',2,1,1,NULL,'{9}',' We forgot the create of great instruction text for testing so heres some very looong cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé. Sweet sweet bear claw sweet roll caramels tootsie roll toffee. Jujubes caramels chupa chups biscuit. Biscuit sugar plum muffin ice cream jelly-o pie apple pie chocolate bar. ),
(Dragée sesame snaps marzipan liquorice pie biscuit donut cake.),
(Pastry sweet roll powder powder toffee icing dessert. Caramels topping gummies cotton candy carrot cake chupa chups marshmallow donut. Tiramisu oat cake lollipop jelly-o apple pie danish oat cake. Marshmallow sesame snaps wafer. Pastry topping pie halvah pastry sesame snaps. Jujubes croissant caramels apple pie dragée cupcake croissant. ),
(Croissant tart chupa chups chocolate biscuit jelly powder apple pie. Pudding biscuit sweet sugar plum. Donut macaroon carrot cake powder dragée apple pie tootsie roll. Sweet roll toffee candy canes ice cream sweet roll. Pudding cotton candy muffin pie cotton candy carrot cake sweet roll cheesecake.','Don''t use your calculator!'),
(13,'What is the square root of 121?',3,1,1,NULL,'{11}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(14,'What is the square root of 529?',4,1,1,NULL,'{23}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(15,'What is the square root of 61,009?',9,1,1,NULL,'{247}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',' 1,000 characters follow. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.'),
(16,'What was the first Microsoft Operating System?',2,0,2,'{MS-DOS,Windows,iOS}','{MS-DOS}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Ask your granny.'),
(17,'Which Microsoft tool would you use to write a document?',3,2,2,NULL,'{Word,Microsoft Word,MS Word}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(18,'Who owns Microsoft',5,0,2,'{Bill Gates,Mark Zuckerberg,Elon Musk}','{Bill Gates}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(19,'Is January a month?',1,0,3,'{Yes,No}','{Yes}','Some short instruction text.','Hint hint'),
(20,'Is Neptune a month?',2,0,3,'{Yes,No}','{No}','Some short instruction text.','Hint hint'),
(21,'Which month has 29 days some years?',3,0,3,'{May,October,February,Thursday}','{February}','Some short instruction text.','Hint hint'),
(22,'Which month has the day with the most hours of daylight?',4,0,3,'{March,June,September,December}','{December}','Some short instruction text.','Hint hint'),
(23,'Name a green fruit',1,2,4,NULL,'{Kiwifruit, Grape, Apple}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(24,'Number Answer please - what is 2+2?',1,1,5,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(25,'Number Answer please - what is 2+2?',1,1,6,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(26,'Number Answer please - what is 2+2?',1,1,7,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(27,'What is the square root of 16?',1,1,8,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(28,'What is the square root of 81?',2,1,8,NULL,'{9}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','don''t use your calculator!'),
(29,'What is the square root of 121?',3,1,8,NULL,'{11}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(30,'What is the square root of 16?',1,1,9,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(31,'What is the square root of 81?',2,1,9,NULL,'{9}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','don''t use your calculator!'),
(32,'What is the square root of 121?',3,1,9,NULL,'{11}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(33,'What is the square root of 16?',1,1,10,NULL,'{4}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(34,'What is the square root of 81?',2,1,10,NULL,'{9}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','don''t use your calculator!'),
(35,'What is the square root of 121?',3,1,10,NULL,'{11}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(36,'Testing a long(ish) question text,please enter the following as the answer to test a long input [The United Nations Universal Declaration of Human Rights]',1,2,11,NULL,'{The United Nations Universal Declaration of Human Rights}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(37,'Pick one of the many answers below to pass this level.',1,0,12,'{1,2,3,4,5}','{1}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(38,'Type the level number',2,2,12,NULL,'{two}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(39,'Pick one of the many answers below to pass this level.',3,0,12,'{1,2,3,4,5}','{3}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(40,'Type the level number',4,3,12,NULL,'{four}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(41,'Pick one of the many answers below to pass this level.',5,0,12,'{1,2,3,4,5}','{5}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(42,'Type the level number',6,2,12,NULL,'{six}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(43,'Pick one of the many answers below to pass this level.',7,0,12,'{6,7,8,9}','{7}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(44,'Type the level number',8,2,12,NULL,'{eight}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(45,'Pick one of the many answers below to pass this level.',9,0,12,'{6,7,8,9}','{9}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(46,'What is this level?',10,1,12,NULL,'{10}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(47,'A single level,single choice',1,0,13,'{1}','{1}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.',NULL),
(48,'Single Level,pick one',1,0,14,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(49,'Single Level,pick one',1,0,15,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(50,'Single Level,pick one',1,0,16,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(51,'Single Level,pick one',1,0,17,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(52,'Single Level,pick one',1,0,18,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(53,'Single Level,pick one',1,0,19,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(54,'Single Level,pick one',1,0,20,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(55,'Single Level,pick one',1,0,21,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(56,'Single Level,pick one',1,0,22,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(57,'Single Level,pick one',1,0,23,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(58,'Single Level,pick one',1,0,24,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(59,'Single Level,pick one',1,0,25,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(60,'Single Level,pick one',1,0,26,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(61,'Single Level,pick one',1,0,27,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(62,'Single Level,pick one',1,0,28,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(63,'Single Level,pick one',1,0,29,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(64,'Single Level,pick one',1,0,30,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(65,'Single Level,pick one',1,0,31,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(66,'Single Level,pick one',1,0,32,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(67,'Single Level,pick one',1,0,33,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(68,'Single Level,pick one',1,0,34,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(69,'Single Level,pick one',1,0,35,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(70,'Single Level,pick one',1,0,36,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(71,'Single Level,pick one',1,0,37,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(72,'Single Level,pick one',1,0,38,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(73,'Single Level,pick one',1,0,39,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(74,'Single Level,pick one',1,0,40,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!'),
(75,'Single Level,pick one',1,0,41,'{answer a,option b,or pick the last one}','{answer a,option b,or pick the last one}','We forgot the create of great instruction text for testing so heres some cupcake ipsum. Cupcake ipsum dolor sit amet marshmallow. Topping lollipop bear claw danish jelly-o cheesecake. Dessert sweet roll donut cheesecake powder lemon drops. Gingerbread sweet soufflé.','Pick any of the options,they should all be correct!');


EOF