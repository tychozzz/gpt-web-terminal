/**
 * 默认配置
 * @author yupi
 */
module.exports = {
  // Redis 配置
  redisConfig: {
    host: "localhost",
    port: "6379",
    password: "123456",
    db: 2,
  },
  // MySQL 配置
  dbConfig: {
    database: "gpt_terminal",
    username: "root",
    password: "root",
    host: "localhost",
    port: 3306,
  },
  // gpt-key 配置
  gptConfig: {
    key: "",
  },
};
