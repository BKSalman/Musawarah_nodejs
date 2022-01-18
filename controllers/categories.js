const { Category } = require("../models/Category");

const addCategory = async (req, res) => {
	const categoryName = req.body.name
	const category = await new Category({name: categoryName})
	category.save()
	return res.redirect("/category")
}

const getCategories = async (req, res) => {
	const categories = await Category.find().catch(err => console.log(err))
	return res.json(categories)
}

module.exports = { getCategories, addCategory }