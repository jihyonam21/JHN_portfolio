DROP TABLE IF EXISTS `BOOKLIST`;
CREATE TABLE `BOOKLIST`(
	`BOOKNUMBER` INT NOT NULL AUTO_INCREMENT,		-- 책 번호
	`TITLE` VARCHAR(100) NOT NULL,					-- 제목
	`AUTHOR` VARCHAR(30) NOT NULL,					-- 저자
	`SUMMARY` VARCHAR(1000),						-- 요약
	`PUBLICATIONDATE` DATE NOT NULL,				-- 출판일
	`PRICE` INT NOT NULL,							-- 가격
	`TEMP_IMG_NAME` VARCHAR(100) NOT NULL,  		-- 임시파일 이름 (tempName.tmp)
    `ORIGIN_IMG_NAME` VARCHAR(100) NOT NULL,		-- 원본파일 이름 (imgName.jpg)

	PRIMARY KEY (`BOOKNUMBER`)
) AUTO_INCREMENT=6;

INSERT INTO `BOOKLIST` (`BOOKNUMBER`, `TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES
(1, 'LEAN START UP', 'ERIC RIES', "Most new businesses fail. But most of those failures are preventable. The Lean Startup is a new approach to business that's being adopted around the world. It is changing the way companies are built and new products are launched.The Lean Startup is about learning what your customers really want. It's about testing your vision continuously, adapting and adjusting before it's too late. Now is the time to think Lean.", '2011-10-06', '25000', 'LEAN_START_UP.jpg', 'LEAN_START_UP.jpg');
INSERT INTO `BOOKLIST` (`BOOKNUMBER`, `TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES
(2, 'SAPIENS', 'YUVAL NOAH HARAR', "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us. We are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens? In this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going. Sapiens is a thrilling account of humankind’s extraordinary history - from the Stone Age to the Silicon Age - and our journey from insignificant apes to rulers of the world ‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel For more, visit www.ynharari.com", '2015-04-30', '15000', 'SAPIENS.jpg', 'SAPIENS.jpg');
INSERT INTO `BOOKLIST` (`BOOKNUMBER`, `TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES
(3, 'GRIT', 'DUCKWORTH', "In this must-read for anyone seeking to succeed, pioneering psychologist Angela Duckworth takes us on an eye-opening journey to discover the true qualities that lead to outstanding achievement. Winningly personal, insightful and powerful, Grit is a book about what goes through your head when you fall down, and how that – not talent or luck – makes all the difference.", '2016-05-03', '23400', 'GRIT.jpg', 'GRIT.jpg');
INSERT INTO `BOOKLIST` (`BOOKNUMBER`, `TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES
(4, 'ATOMIC HABITS', 'JAMES CLEAR', "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.", '2018-10-26', '22000', 'ATOMIC_HABITS.jpg', 'ATOMIC_HABITS.jpg');
INSERT INTO `BOOKLIST` (`BOOKNUMBER`, `TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES
(5, '12 RULES FOR LIFE', 'JORDAN B. PETERSON', "Drawing on vivid examples from his clinical practice and personal life, cutting-edge psychology and philosophy, and lessons from humanity's oldest myths and stories, Peterson takes the listener on an intellectual journey like no other. Gripping, thought-provoking and deeply rewarding, 12 Rules for Life offers an antidote to the chaos in our lives: eternal truths applied to our modern problems.", '2019-04-30', '15500', '12_RULES_FOR_LIFE.jpg', '12_RULES_FOR_LIFE.jpg');
