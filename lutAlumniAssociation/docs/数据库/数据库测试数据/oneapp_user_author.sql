/*
Navicat MySQL Data Transfer

Source Server         : mysite
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : mysite_db

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-03-09 21:55:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `oneapp_user_author`
-- ----------------------------
DROP TABLE IF EXISTS `oneapp_user_author`;
CREATE TABLE `oneapp_user_author` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) NOT NULL,
  `update_time` datetime(6) NOT NULL,
  `author_group` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `is_enable` tinyint(1) NOT NULL,
  `is_edit` tinyint(1) NOT NULL,
  `is_del` tinyint(1) NOT NULL,
  `am_enable` tinyint(1) NOT NULL,
  `um_search_space` varchar(50) COLLATE utf8_bin NOT NULL,
  `um_search_time` varchar(30) COLLATE utf8_bin NOT NULL,
  `om_search` tinyint(1) NOT NULL,
  `as_enable` tinyint(1) NOT NULL,
  `om_add_del_up` tinyint(1) NOT NULL,
  `om_enable` tinyint(1) NOT NULL,
  `uim_add_del_up` tinyint(1) NOT NULL,
  `uim_enable` tinyint(1) NOT NULL,
  `uim_search` tinyint(1) NOT NULL,
  `um_add` tinyint(1) NOT NULL,
  `um_del_up` tinyint(1) NOT NULL,
  `um_del_up_space` varchar(50) COLLATE utf8_bin NOT NULL,
  `um_del_up_time` varchar(50) COLLATE utf8_bin NOT NULL,
  `um_enable` tinyint(1) NOT NULL,
  `um_is_export_excel` tinyint(1) NOT NULL,
  `um_is_import_excel` tinyint(1) NOT NULL,
  `um_search` tinyint(1) NOT NULL,
  `nuv_enable` tinyint(1) NOT NULL,
  `nuv_search_add_del_up` tinyint(1) NOT NULL,
  `nuv_search_add_del_up_space` varchar(50) COLLATE utf8_bin NOT NULL,
  `usim_enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of oneapp_user_author
-- ----------------------------
INSERT INTO `oneapp_user_author` VALUES ('1', '2017-12-02 17:47:30.443000', '2017-12-02 17:47:35.939000', '管理员', '1', '0', '0', '1', '全校', '全部', '1', '1', '1', '1', '1', '1', '1', '1', '1', '全校', '全部', '1', '1', '1', '1', '1', '1', '专业', '1');
INSERT INTO `oneapp_user_author` VALUES ('2', '2017-12-02 17:51:31.972000', '2017-12-02 17:51:34.976000', '普通用户', '1', '1', '0', '0', '自己', '本年级', '0', '1', '0', '0', '0', '0', '1', '0', '1', '本专业', '前后三年', '0', '1', '1', '1', '0', '0', '专业', '1');
INSERT INTO `oneapp_user_author` VALUES ('3', '2018-03-09 21:31:11.000000', '2018-03-09 21:31:19.000000', '未审核用户', '1', '1', '0', '0', '自己', '本年级', '0', '0', '0', '0', '0', '0', '0', '0', '0', '本专业', '前后三年', '0', '0', '0', '0', '0', '1', '专业', '1');
INSERT INTO `oneapp_user_author` VALUES ('4', '2018-03-09 21:35:32.000000', '2018-03-09 21:35:37.000000', '学院管理员', '1', '1', '0', '1', '本学院', '全部', '1', '1', '1', '1', '0', '0', '0', '1', '1', '本学院', '全部', '1', '1', '1', '1', '1', '1', '专业', '1');
