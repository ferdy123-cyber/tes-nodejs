const sequelize = require("../connection");
const User = require("./user");
const Post = require("./posts");

User.hasMany(Post, {
  as: "datas",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  sequelize,
  User,
  Post,
};
