exports.getAllArticle = (req, res) => {
  res.status(200).json({
    status: "success",
    data: [
      {
        id: 1,
        title: "Belajar NodeJS",
        desc: "Belajar NodeJS itu menyenangkan",
      },
      {
        id: 2,
        title: "Belajar Express",
        desc: "Belajar Express itu menyenangkan",
      },
    ],
  });
};

exports.storeArticle = (req, res) => {
  let { title, desc } = req.body;

  if (!title && !desc) {
    return res
      .status(400)
      .json({ status: "fail", message: "title and body is required" });
  }

  return res.status(200).json({
    status: "success",
    message: "Berhasil Respond",
    data: {
      title,
      desc,
    },
  });
};
