const models = require('../models');
const { News } = models

class NewsController {
    // GET ALL NEWS
    static async getAllNews(req, res) {

        let news = {};

        try {
            news = await News.findAll();
            res.json(news)
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });

        };
    }

    // CREATE NEWS
    static async createNews(req, res, next) {

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

    // UPDATE NEWS
    static async updateNews(req, res) {

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
            news = await article.update({
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

    // DELETE NEWS
    static async deleteNews(req, res) {
        try {
            const { id } = req.params;

            const news = await News.destroy({ where: { id: +id } });
            res.status(201).json({ 
                message: `the New with ID=${news} was deleted`, 
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        };
    }
}


module.exports = NewsController;