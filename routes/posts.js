const express = require('express');
const router = express.Router();
const { Post } = require('../models/Post');

router.get('/', async (req, res) => {
    console.log('get art')
    const posts = await Post.find({})
    res.render('posts', {posts:posts})
})

router.get('/api', async (req, res) => {
    console.log('get art')
    const posts = await Post.find({})
    return res.json(posts);
})


router.post('/', async (req, res) => {
    console.log('post art')
    console.log(req.body)
    const title = req.body.title
    const artist = req.body.artist
    const post = new Post({title: title, artist: artist})
    await post.save()
    return res.json(post);
})

module.exports = {path:"/posts",router};