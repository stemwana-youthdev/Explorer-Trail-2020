#!/bin/sh

# If you want to clear the database (and any other docker volumes) run:
# docker-compose down --volumes

# Open a SQL prompt in the Docker container
# and send some sql into it
docker exec -i explorer-trail-2020_explorer_trail_db_1 \
psql -d StemExplorer -U stem << EOF

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

EOF