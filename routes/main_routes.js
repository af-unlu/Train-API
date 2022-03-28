const { Router } = require('express');
const book_ride_controller = require("../controllers/book_ride_controller")
const {validate} = require("../middleware/validate");
const router = Router();


router.route('/bookride')
.get(book_ride_controller.get)
.post(validate,book_ride_controller.post);


module.exports = router;