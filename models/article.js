"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "title must be unique",
        },
        validate: {
          notNull: {
            msg: "title cannot be empty",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "slug must be unique",
        },
        validate: {
          notNull: {
            msg: "slug cannot be empty",
          },
        },
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "desc cannot be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "image cannot be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "categoryId cannot be empty",
          },
          async isExists(value) {
            const category = await Category.findByPk(value);
            if (!category) {
              throw new Error("Category not found");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
