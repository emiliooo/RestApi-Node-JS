const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'orders get'
    });
});

router.post('/',(req,res,next) => {
    const order = {
        productId:req.body.productId,
        quanity:req.body.quanity
     };
    res.status(201).json({
        message:'orders POST /orders ',
        createdOrder:order
    });
});

router.get('/:orderid',(req,res,next) => {
    res.status(200).json({
        message:'orders details ',
        orderid:req.params.orderId
    });
});

router.delete('/',(req,res,next) => {
    res.status(200).json({
        message:'orders deleted '
    });
});

module.exports = router;