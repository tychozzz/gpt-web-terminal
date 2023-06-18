const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 角色模型
 * @author ltyzzz
 */
const RoleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "role",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);

module.exports = RoleModel;
