const models = require('../models');
const { News } = models

// GET ALL NEWS

const getAllNews = async (req, res) => {

    let news = {};
    const { page } = req.query;
    news = await News.findAll();

    try {
       
        if (page) {
            const countNews = news.length
            const totalPage = Number.isInteger(countNews / 10) ? countNews / 10 : parseInt(countNews / 10) + 1;
            let validPage = parseInt(page) <= 0 ? 1 : page > totalPage ? totalPage : page;
            
            await News.findAndCountAll({ limit: 10, offset: (validPage - 1) * 10 })
                .then(response => {
                    res.status(200).send({
                        nextPage: parseInt(validPage) == totalPage ? '' : parseInt(validPage) + 1,
                        prevPage: parseInt(validPage) > 1 ? parseInt(validPage) - 1 : '',
                        News: response
                    });
                });

        } else {
            res.json(news)
        }


    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
}


// CREATE NEWS

const createNews = async (req, res, next) => {

    let news = {};
    const {
        name,
        content,
        image,
        categoryId
    } = req.body;

    try {
        news = await News.create({
            name,
            content,
            image,
            categoryId
        });
        res.json(news)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
};

// UP DATE NEWS
const updateNews = async (req, res) => {

    let news = {};
    const { id } = req.params;
    const {
        name,
        content,
        image,
        categoryId
    } = req.body;

    try {
        const article = await News.findOne({ where: { id } });
        if (!article) return res.status(404).send("news not found")
        news = await article.update({
            name,
            content,
            image,
            categoryId
        });
        return res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    };
};

// DELETE NEWS
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await News.destroy({ where: { id: +id } });
        res.status(201).json({
            message: `the New with ID=${id} was deleted`,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
}

module.exports = {
    getAllNews,
    createNews,
    updateNews,
    deleteNews
}