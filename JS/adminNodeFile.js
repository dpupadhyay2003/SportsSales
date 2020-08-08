const express = require('express');


const router = express.Router();

router.post('/admin/addItem', (req, res) => {
    var itemName = req.body.itemName;
    var itemType = req.body.itemType;
    var itemPrice = req.body.itemPrice;
    var itemImage = req.body.itemImage;
    var itemQty = req.body.itemQty;
    var itemDescription = req.body.itemDescription;

    console.log("Item Name ==> ", req.params.itemName);
    console.log("File Data ==> ", req.file);
    res.send("Done");
    // if (itemName && itemType && itemPrice && itemImage & itemQty & itemDescription) {

    //     console.log("IF Block. . .");
    //     console.log(req.route);
    //     res.send("IF Block. . .");
    // } else {
    //     console.log("ELSE Block. . .");
    //     res.send(req.body);
    // }
});

module.exports = router