/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : kaoshi

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 08/08/2024 17:23:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `pid` int NOT NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `conpenent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, '主页', 0, '/admin', '/admin-view.vue');
INSERT INTO `menus` VALUES (2, 'one', 1, '/one', '/one-view.vue');
INSERT INTO `menus` VALUES (3, 'two', 1, '/two', '/two-view.vue');
INSERT INTO `menus` VALUES (4, 'three', 0, '/three', '/three-view.vue');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `rid` int NOT NULL,
  `mid` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1);
INSERT INTO `role_menu` VALUES (1, 4);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '管理员');
INSERT INTO `roles` VALUES (2, '开发者');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `uid` int NOT NULL,
  `rid` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1);
INSERT INTO `user_role` VALUES (1, 2);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '123', '321');
INSERT INTO `users` VALUES (2, '1', '1');
INSERT INTO `users` VALUES (3, '12', '12');
INSERT INTO `users` VALUES (4, '12345', '12345');
INSERT INTO `users` VALUES (5, '123321', '123321');
INSERT INTO `users` VALUES (6, '1234554321', '1234554321');
INSERT INTO `users` VALUES (7, '123123123', '123123123');

-- ----------------------------
-- View structure for v_clazz
-- ----------------------------
DROP VIEW IF EXISTS `v_clazz`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_clazz` AS select `c`.`id` AS `id`,`c`.`name` AS `name`,`c`.`wid` AS `wid`,`c`.`cid` AS `cid`,`c`.`tid` AS `tid`,`c`.`historyteacher` AS `historyteacher`,`c`.`types` AS `types`,`c`.`state` AS `state`,`c`.`monitor` AS `monitor`,`c`.`prepTime` AS `prepTime`,`c`.`startTime` AS `startTime`,`c`.`endTime` AS `endTime`,`c`.`deftpwd` AS `deftpwd`,`c`.`remark` AS `remark`,`c`.`crtm` AS `crtm`,`c`.`crer` AS `crer`,`c`.`mdtm` AS `mdtm`,`c`.`mder` AS `mder`,count(`s`.`id`) AS `stucnt` from (`clazz` `c` left join `stu` `s` on((`s`.`cid` = `c`.`id`))) group by `c`.`id` order by `c`.`crtm` desc;

SET FOREIGN_KEY_CHECKS = 1;
