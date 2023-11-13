const express = require('express');
const router = express.Router();
// no need here of mergeParams as in reviews file, because the /:id param is defined in the route

const campgrounds = require('../controllers/campgrounds');

const catchAsync = require('../utilities/catchasync');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })


const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

router.route('/')
        .get(catchAsync(campgrounds.index))
        .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm));

router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;