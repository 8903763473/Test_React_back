const express = require('express');
const router = express.Router();
const WishController = require('../controller/wishListController');

router.post('/getmyWish', WishController.getWish);
router.post('/addtoWish', WishController.addToWish);
router.delete('/removeWish/:productId', WishController.removeFromWish);
router.delete('/clearMyWish', WishController.clearWish);

module.exports = router;
