const { Post } = require("../models");

const add = async (req, res, next) => {
  try {
    const { user } = req;
    const { title, content } = req.body;

    const newPost = await Post.create({
      user_id: user.id,
      title,
      content,
    });

    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "success add new post",
      data: newPost,
    });

    // const { date } = req.body;

    // const checkDate = await DailyData.findOne({
    //   where: {
    //     date,
    //   },
    // });

    // if (checkDate) {
    // } else {
    //   const newData = await DailyData.create({
    //     date,
    //     user_id: user.id,
    //   });
    //   return res.status(201).json({
    //     status: "succes",
    //     code: 201,
    //     message: "success add new data",
    //     data: newData,
    //   });
    // }
  } catch (err) {
    return next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const { user } = req;

    const post = await Post.findAll({
      where: {
        user_id: user.id,
      },
    });

    return res.status(201).json({
      status: "succes",
      code: 201,
      message: "success get data",
      data: post,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  add,
  get,
};
