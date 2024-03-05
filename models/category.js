'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Article, {
        foreignKey: 'categoryId'
      });
    }
  }
  
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Category name is required'
          }
        }
      },
    },
    {
      hooks: {
        afterValidate: (category, options) => {
          if (category.name) {
            category.name = category.name.toLowerCase();
          }
        }
      },
      sequelize, // Menambahkan instance Sequelize di sini
      modelName: 'Category',
    }
  );
  
  return Category;
};
