const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 角色元素模型
 * @author ltyzzz
 */
const RoleElementModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "role_element",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);

module.exports = RoleElementModel;
