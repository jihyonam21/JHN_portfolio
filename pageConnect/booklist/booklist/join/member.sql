DROP TABLE IF EXISTS `MEMBER`;
CREATE TABLE `MEMBER`(
	`MEM_ID`   INT NOT NULL AUTO_INCREMENT,	
	`MEM_USERID`      CHAR(30) NOT NULL,
	`MEM_PASSWORD`    CHAR(100) NOT NULL,
	`MEM_USERNAME`    CHAR(100) NOT NULL,
	`MEM_NICKNAME`    CHAR(8) NOT NULL,
	`MEM_MOBILEPHONE` CHAR(20) NOT NULL,
	`MEM_EMAIL`       CHAR(50)NOT NULL,

 	PRIMARY KEY(`MEM_ID`)
) AUTO_INCREMENT=1;

INSERT INTO `MEMBER` (`MEM_ID`, `MEM_USERID`, `MEM_PASSWORD`, `MEM_USERNAME`, `MEM_NICKNAME`, `MEM_MOBILEPHONE`, `MEM_EMAIL`) VALUES (1, 'st23', 'c9st23', '지효남', '효남', '01087346373', 'hks4919@naver.com');