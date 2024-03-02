'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'title must be unique'
      },
      validate: {
        notNull: {
          msg: 'title cannot be empty'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'slug must be unique'
      },
      validate: {
        notNull: {
          msg: 'slug cannot be empty'
        }
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'desc cannot be empty'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: (article, options) => {
        article.slug = article.title.replace(/\s+/g, '-').toLowerCase();
      }
    },
    sequelize,
    modelName: 'Article',
  });
  return Article;
};