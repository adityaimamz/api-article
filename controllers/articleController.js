const { Article } = require("../models"); // Mengimpor model Artikel
const slugify = require("slugify"); // Mengimpor pustaka slugify untuk membuat slug dari judul artikel
const fs = require("fs"); // Mengimpor modul fs untuk mengelola file sistem
const { Op } = require("sequelize");

// Fungsi untuk mendapatkan satu artikel berdasarkan slug
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: {
        slug: req.params.slug, // Menggunakan slug dari parameter URL untuk mencari artikel
      },
    });
    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "Artikel tidak ditemukan", // Mengembalikan pesan jika artikel tidak ditemukan
      });
    }
    return res.status(200).json({
      data: article, // Mengembalikan data artikel jika berhasil ditemukan
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message, // Mengembalikan pesan error jika terjadi kesalahan
    });
  }
};

// Fungsi untuk mendapatkan semua artikel

exports.getAllArticle = async (req, res) => {
  try {
    const { search, limit, page } = req.query;

    let listArticle = "";

    if (search || limit || page) {
      const pageData = page * 1 || 1;
      const limitData = limit * 1 || 5;
      const offset = (pageData - 1) * limitData;
      const searchData = search || "";

      const articles = await Article.findAndCountAll({
        limit: limitData,
        offset: offset,
        where: {
          title: {
            [Op.like]: "%" + searchData + "%", // Menggunakan nilai dari search untuk melakukan pencarian berdasarkan judul artikel
          },
        },
      });

      listArticle = articles;
    } else {
      const articles = await Article.findAndCountAll(); // Mengambil semua artikel dari database

      listArticle = articles;
    }
    res.status(200).json({
      data: listArticle, // Mengembalikan data semua artikel
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message, // Mengembalikan pesan error jika terjadi kesalahan
    });
  }
};

// Fungsi untuk menyimpan artikel baru
exports.storeArticle = async (req, res) => {
  try {
    let { title, desc , categoryId } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error("Please upload a file"); // Melemparkan error jika tidak ada file yang diunggah
    }
    const filename = file.filename;
    const pathFile = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/${filename}`;

    const slug = slugify(title, { lower: true }); // Generate slug dari judul

    const newArticle = await Article.create({
      title,
      slug,
      desc,
      categoryId,
      image: pathFile,
    });

    return res.status(200).json({
      data: newArticle, // Mengembalikan data artikel yang baru dibuat
    });
  } catch (error) {
    if (req.file) {
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // Menghapus file yang diunggah jika terjadi error
    }
    return res.status(400).json({
      status: "error",
      message: error.message, // Mengembalikan pesan error jika terjadi kesalahan
    });
  }
};

// Fungsi untuk mengupdate artikel
exports.updateArticle = async (req, res) => {
  try {
    const { title, desc } = req.body;
    let slug;
    if (title) {
      slug = slugify(title, { lower: true }); // Generate slug dari judul jika judul tersedia
    }

    let article = await Article.findOne({
      where: {
        slug: req.params.slug, // Mencari artikel berdasarkan slug dari parameter URL
      },
    });

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "Artikel tidak ditemukan", // Mengembalikan pesan jika artikel tidak ditemukan
      });
    }

    // Update artikel dengan data yang baru
    if (title) {
      article.title = title;
      article.slug = slug;
    }
    if (desc) {
      article.desc = desc;
    }

    // Jika ada gambar baru yang diunggah, perbarui properti gambar
    const file = req.file;
    if (file) {
      const nameImage = article.image.replace(
        `${req.protocol}://${req.get("host")}/public/uploads/`,
        ""
      );
      const filePath = `./public/uploads/${nameImage}`;

      // Hapus gambar lama
      fs.unlinkSync(filePath, (err) => {
        if (err) {
          console.error("Gagal menghapus gambar lama:", err);
        }
      });

      // Simpan lokasi gambar yang baru di database
      const filename = file.filename;
      const pathFile = `${req.protocol}://${req.get(
        "host"
      )}/public/uploads/${filename}`;

      article.image = pathFile;
    }

    // Simpan perubahan ke database
    await article.save();

    return res.status(200).json({
      status: "sukses",
      data: article, // Mengembalikan data artikel yang telah diperbarui
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message, // Mengembalikan pesan error jika terjadi kesalahan
    });
  }
};

// Fungsi untuk menghapus artikel
exports.destroyArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: {
        slug: req.params.slug, // Mencari artikel berdasarkan slug dari parameter URL
      },
    });

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "Artikel tidak ditemukan", // Mengembalikan pesan jika artikel tidak ditemukan
      });
    }

    if (article) {
      const nameImage = article.image.replace(
        `${req.protocol}://${req.get("host")}/public/uploads/`,
        ""
      );
      const filePath = `./public/uploads/${nameImage}`;

      fs.unlinkSync(filePath, (err) => {
        res.status(400);
        throw new Error("image not found"); // Melemparkan error jika gambar tidak ditemukan
      });
    }

    await Article.destroy({
      where: {
        slug: article.slug, // Menghapus artikel berdasarkan slug
      },
    });
    return res.status(200).json({
      message: "Artikel berhasil dihapus", // Mengembalikan pesan sukses setelah menghapus artikel
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message, // Mengembalikan pesan error jika terjadi kesalahan
    });
  }
};
