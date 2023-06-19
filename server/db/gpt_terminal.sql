/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : gpt_terminal

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 19/06/2023 18:31:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `userId` bigint(11) NOT NULL COMMENT '用户 ID',
  `keyword` varchar(255) NOT NULL COMMENT '角色 keyword',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名',
  `description` varchar(255) NOT NULL COMMENT '角色描述',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for role_element
-- ----------------------------
DROP TABLE IF EXISTS `role_element`;
CREATE TABLE `role_element` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `roleId` bigint(11) NOT NULL COMMENT '角色 ID',
  `name` varchar(255) NOT NULL COMMENT '角色元素名',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(256) NOT NULL COMMENT '用户名',
  `password` varchar(512) NOT NULL COMMENT '密码',
  `email` varchar(512) DEFAULT NULL COMMENT '邮箱',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0 - 正常',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户';

SET FOREIGN_KEY_CHECKS = 1;
