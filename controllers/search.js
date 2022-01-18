const { Post } = require("../models/Post");
const { User } = require("../models/User");

const searchEngine = async (req, res) => {
    try {
      const query = req.body.search;
      const user = await User.findOne({
            username: new RegExp(query, "i")
      })
      if(user){
        const posts = await Post.find(
      {
        $or: [
          {
            postTitle: new RegExp(query, "i")
        },
        {
            postDesc: new RegExp(query, "i")
          },
        {
            postAuthor: user._id
          },
        ],
      },
      {
        __v: 0,
      }
    );}
    const posts = await Post.find(
      {
        $or: [
          {
            postTitle: new RegExp(query, "i")
        },
        {
            postDesc: new RegExp(query, "i")
          }
        ],
      },
      {
        __v: 0,
      }
    );
    return res.render("search", { posts: posts });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { searchEngine };