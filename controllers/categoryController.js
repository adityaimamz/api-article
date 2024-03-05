const { Category, Article } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id, {
      include: [
        {
          model: Article,
          attributes: ["categoryId"],
        },
      ],
    });
    if (!category) {
      return res.status(404).json({
        status: "Fail",
        message: "Category not found",
      });
    }
    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    const category = await Category.update(
      { name },
      {
        where: {
          id,
        },
      }
    );

    const updateCategory = await Category.findByPk(id);

    if (!updateCategory) {
      return res.status(404).json({
        status: "Fail",
        message: "Category not found",
      });
    }

    return res.status(200).json({
      data: updateCategory,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const idCategory = await Category.findByPk(id);

    if (!idCategory) {
      return res.status(404).json({
        status: "Fail",
        message: "Category not found",
      })
    }

    await Category.destroy({
      where: {
        id
      }
    })

  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}