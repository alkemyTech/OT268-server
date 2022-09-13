const express = require('express');
const router = express.Router();
const { checkRol} = require('../middlewares/checkRol/checkRol')
const { 
    createTestimonials,
    getAllTestimonials,
    getTestimonialsById,
    updateTestimonial,
    deleteTestimonial,
    restoreTestimonial
 } = require('../controllers/testimonials.controller');


router.put('/:id',checkRol, updateTestimonial );
router.delete('/:id',checkRol, deleteTestimonial );
router.post('/:id',checkRol, createTestimonials );

module.exports = router;
