//const {Testimonials} = require ('../models/testimonials.js');
const { validationResult } = require('express-validator');
const models = require('../models');
const { Testimonials } = models

const getTestimonialsById = async (req, res) => {

    const { id } = req.params
    const testimonials = await Testimonials.findByPk(id).catch(err => console.log(err))
    if (!testimonials) return res.status(404).json({ ok: false })
    return res.status(200).json({ testimonials })
}

const getAllTestimonials = async (req, res) => {

    let testimonial = {};

    testimonial = await Testimonials.findAll({ offset: 0, limit: 12 });
    if (!req.query.page) return res.send(testimonial)

    const { page } = req.query;


    let back = parseInt(page) - 1;
    const next = parseInt(page) + 1
    if (back === 0) {
        back = 1;
    }
    try {
        testimonial = await Testimonials.findAll({ offset: parseInt((page - 1) * 10), limit: 10 });
        if (!testimonial.length) return res.status(404).json({ msg: 'testimonials not found' });
        return res.status(200).json({
            back: `localhost:${process.env.PORT}/testimonials?page=${back}`,
            next: `localhost:${process.env.PORT}/testimonials?page=${next}`,
            testimonial
        });
    }
    catch (err) {
        return err;
    }
}

const deleteTestimonial = async (req, res) => {

    const { id } = req.params;
    if (!id) return res.status(400).send("no id found");

    const isDeleted = await Testimonials.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if (!isDeleted) return res.status(400).send(`Deletion failed Testimonial`).json({ ok: false })
    return res.status(200).json({ ok: false })

}

const restoreTestimonial = async (req, res) => {

    const { id } = req.body
    if (!id) return res.status(404).send("no id found")
    const isRestored = await Testimonials.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if (!isRestored) return res.status(400).send("restoring failed").json({ ok: false })
    return res.status(200).json({ ok: false })
}

const updateTestimonial = async (req, res) => {
    const { id } = req.params
    const { newValues } = req.body
    if (!id) return res.status(404).send("no id found");
    const updated = await Testimonials.update({ ...newValues }, { where: { id: id } }).catch(err => console.log(err))
    if (!updated) return res.status(400).json({ ok: false })
    return res.status(200).send(updated)
}

const createTestimonials = async (req, res) => {

    // const Testimonial = {};
    // Testimonial.name = req.body.name;
    // Testimonial.content = req.body.content;
    // Testimonial.image= req.body.image;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
    // const result = await Testimonials.create({...Testimonial}).catch(err => console.log(err))
    // if(!result) return res.status(400).json({ok: false})
    // return res.status(200).send(result)

    let testimonials = {};
    const {
        name,
        content,
        image
    } = req.body;

    try {
        testimonials = await Testimonials.create({
            name,
            content,
            image,
        });
        res.json(testimonials)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
}

module.exports = {
    getAllTestimonials,
    getTestimonialsById,
    createTestimonials,
    updateTestimonial,
    deleteTestimonial,
    restoreTestimonial
};
