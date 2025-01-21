-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.4.32-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

create user 'zzan'@'localhost' identified by '1234';

GRANT ALL PRIVILEGES ON zzan.* TO 'zzan'@'localhost';

FLUSH PRIVILEGES;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- zzan 데이터베이스 구조 내보내기
DROP DATABASE IF EXISTS `zzan`;
CREATE DATABASE IF NOT EXISTS `zzan` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `zzan`;

-- 테이블 zzan.admin 구조 내보내기
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `id` char(20) NOT NULL,
  `pw` char(20) NOT NULL,
  `name` char(15) NOT NULL,
  `phone` char(20) NOT NULL,
  `regTM` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `num_UNIQUE` (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.admin:~0 rows (대략적) 내보내기
REPLACE INTO `admin` (`num`, `id`, `pw`, `name`, `phone`, `regTM`) VALUES
	(1, 'admin', '1234', '관리자', '010-1111-2222', '2024-11-14 07:55:09');

-- 테이블 zzan.bbs 구조 내보내기
DROP TABLE IF EXISTS `bbs`;
CREATE TABLE IF NOT EXISTS `bbs` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `content` text NOT NULL,
  `id` char(20) NOT NULL,
  `regTM` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`),
  KEY `MemId_idx` (`id`),
  CONSTRAINT `MemId` FOREIGN KEY (`id`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.bbs:~6 rows (대략적) 내보내기
REPLACE INTO `bbs` (`idx`, `title`, `content`, `id`, `regTM`) VALUES
	(1, '테스트제목1', '테스트내용1', 'Test01', '2024-11-15 02:37:26'),
	(2, '테스트제목2', '테스트내용2', 'Test02', '2024-11-15 02:37:26'),
	(3, '테스트제목3', '테스트내용3', 'Test03', '2024-11-15 02:37:26'),
	(4, '테스트제목4', '테스트내용4', 'Test01', '2024-11-15 02:37:26'),
	(5, '테스트제목5', '테스트내용5', 'Test02', '2024-11-15 02:37:26'),
	(6, '수정', '수정', 'test01', '2024-11-15 08:11:18');

-- 테이블 zzan.cart 구조 내보내기
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cartCode` int(11) NOT NULL AUTO_INCREMENT,
  `cMemid` char(20) NOT NULL,
  `createTM` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cartCode`),
  KEY `cartMemId_idx` (`cMemid`),
  CONSTRAINT `cartMemId` FOREIGN KEY (`cMemid`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.cart:~0 rows (대략적) 내보내기

-- 테이블 zzan.cartproduct 구조 내보내기
DROP TABLE IF EXISTS `cartproduct`;
CREATE TABLE IF NOT EXISTS `cartproduct` (
  `cpCode` int(11) NOT NULL AUTO_INCREMENT,
  `cartCode` int(11) NOT NULL,
  `cpPrCode` int(11) NOT NULL,
  `cpQuantity` int(11) NOT NULL,
  `cpRegTM` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cpCode`),
  KEY `cartCode_idx` (`cartCode`),
  KEY `cartProduct_idx` (`cpPrCode`),
  CONSTRAINT `cartCode` FOREIGN KEY (`cartCode`) REFERENCES `cart` (`cartCode`),
  CONSTRAINT `cartProduct` FOREIGN KEY (`cpPrCode`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.cartproduct:~0 rows (대략적) 내보내기

-- 테이블 zzan.member 구조 내보내기
DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `mNum` int(11) NOT NULL AUTO_INCREMENT,
  `mId` char(20) NOT NULL,
  `mPw` char(20) NOT NULL,
  `mName` char(15) NOT NULL,
  `mBirthday` char(10) NOT NULL,
  `mAddr` char(100) DEFAULT NULL,
  `mEmail` char(50) NOT NULL,
  `mPhone` char(20) NOT NULL,
  `regTM` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`mId`),
  UNIQUE KEY `mNum_UNIQUE` (`mNum`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.member:~5 rows (대략적) 내보내기
REPLACE INTO `member` (`mNum`, `mId`, `mPw`, `mName`, `mBirthday`, `mAddr`, `mEmail`, `mPhone`, `regTM`) VALUES
	(1, 'test01', '1234', '테스트1', '19990305', NULL, 'test01@naver.com', '010-2222-3333', '2024-11-15 00:44:54'),
	(2, 'test02', '1234', '테스트2', '19990305', NULL, 'test01@naver.com', '010-2222-3333', '2024-11-15 00:44:54'),
	(3, 'test03', '1234', '테스트3', '19990305', NULL, 'test01@naver.com', '010-2222-3333', '2024-11-15 00:44:54'),
	(4, 'test04', '1234', '테스트4', '19990305', NULL, 'test01@naver.com', '010-2222-3333', '2024-11-15 00:44:54'),
	(5, 'test05', '1234', '테스트5', '19990305', NULL, 'test01@naver.com', '010-2222-3333', '2024-11-15 00:44:54');

-- 테이블 zzan.notice 구조 내보내기
DROP TABLE IF EXISTS `notice`;
CREATE TABLE IF NOT EXISTS `notice` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `content` text NOT NULL,
  `id` char(20) NOT NULL,
  `regTM` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`),
  KEY `adminId_idx` (`id`),
  CONSTRAINT `adminId` FOREIGN KEY (`id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='        ';

-- 테이블 데이터 zzan.notice:~5 rows (대략적) 내보내기
REPLACE INTO `notice` (`idx`, `title`, `content`, `id`, `regTM`) VALUES
	(1, '공지사항입니다01.', '공지사항임', 'admin', '2024-11-15 07:11:30'),
	(2, '공지사항입니다02.', '공지사항임', 'admin', '2024-11-15 07:11:30'),
	(3, '공지사항입니다03.', '공지사항임', 'admin', '2024-11-15 07:11:30'),
	(4, '공지사항입니다04.', '공지사항임', 'admin', '2024-11-15 07:11:30'),
	(5, '공지사항입니다05.', '공지사항임', 'admin', '2024-11-15 07:11:30');

-- 테이블 zzan.order 구조 내보내기

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `oNum` int(11) NOT NULL AUTO_INCREMENT,
  `totalPrice` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `userPhone` char(20) NOT NULL,
  `userAddr` char(100) NOT NULL,
  `userId` char(20) NOT NULL,
  `orderTM` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`oNum`),
  KEY `orderMemId_idx` (`userId`),
  CONSTRAINT `orderMemId` FOREIGN KEY (`userId`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 테이블 데이터 zzan.order:~0 rows (대략적) 내보내기

-- 테이블 zzan.orderproduct 구조 내보내기
ALTER TABLE `orderproduct` DROP FOREIGN KEY `orderNum`;
ALTER TABLE `orderproduct` DROP FOREIGN KEY `orderProduct`;
DROP TABLE IF EXISTS `orderproduct`;

CREATE TABLE IF NOT EXISTS `orderproduct` (
  `opNum` INT(11) NOT NULL AUTO_INCREMENT,
  `productCode` INT(11) NOT NULL,
  `orderNum` INT(11) NOT NULL,
  `price` INT(11) NOT NULL,
  `opQuantity` INT(11) NOT NULL,
  PRIMARY KEY (`opNum`),
  KEY `orderNum_idx` (`orderNum`),
  KEY `orderProduct_idx` (`productCode`),
  CONSTRAINT `orderNumFK` FOREIGN KEY (`orderNum`) REFERENCES `order` (`oNum`),
  CONSTRAINT `orderProductFK` FOREIGN KEY (`productCode`) REFERENCES `product` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 zzan.orderproduct:~0 rows (대략적) 내보내기


-- 테이블 zzan.product 구조 내보내기
DELETE FROM `product`;
ALTER TABLE `product` AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(255) NOT NULL,
  `original_filename` VARCHAR(255) DEFAULT NULL,
  `stored_filename` VARCHAR(255) DEFAULT NULL,
  `file_size` BIGINT(20) DEFAULT NULL,
  `content` TEXT NOT NULL,
  `price` VARCHAR(255) NOT NULL,
  `upload_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `category` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `orderproduct`
ADD CONSTRAINT `orderProduct`
FOREIGN KEY (`cpPrCode`) REFERENCES `product`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;



-- 테이블 데이터 zzan.product:~4 rows (대략적) 내보내기
REPLACE INTO `product` (`id`, `subject`, `original_filename`, `stored_filename`, `file_size`, `content`, `price`, `upload_date`, `category`) VALUES
	(3, '무똥 까데 리저브 마고 750m', '무똥 까데 리저브 마고 750ml.png', '39007619-ab26-485c-ba31-fac2d83780b3_무똥 까데 리저브 마고 750ml.png', 3021582, '맛있어요', '30000', '2024-11-18 02:39:04', 'wine'),
	(4, '임페리얼 17년 450ml', '임페리얼 17년 450ml.jpg', '341d74ff-7e65-46a8-abeb-b1118c7b8caa_임페리얼 17년 450ml.jpg', 32049, '임페리얼에 취하다', '25000', '2024-11-18 02:43:51', 'whisky'),
	(6, '앱솔루트 750ml', '앱솔루트_360x480.jpg', 'a85419fc-6b70-4d00-a1a2-b38574d0644d_앱솔루트_360x480.jpg', 27854, '독하디 독한 보드카', '25000', '2024-11-18 02:45:19', 'bodca'),
	(7, '고운달 오크 500ml', '고운달 오크360x480.jpg', 'd3780a68-1070-488a-ae66-b08b52b37543_고운달 오크360x480.jpg', 31428, '달빛에 취하다.', '90000', '2024-11-18 02:48:06', 'traditional');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

select * from admin;
select * from member;
select * from notice;
select * from orderproduct;
select * from product;

DELETE FROM product;

SELECT * FROM cartproduct WHERE cpPrCode = 44;
SELECT * FROM orderproduct WHERE productCode = 44;


select * from cartproduct;