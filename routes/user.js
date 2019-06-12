const express       = require('express'),
      router        = express.Router(),
      Hotel         = require("../models/hotel"),
      Dish          = require("../models/dish"),
      User          = require("../models/user")

router.get("/user", (req, res) => {
   console.log("User Route");
   res.redirect("/user/hotels");
});

// User Index Route
router.get("/user/hotels", (req, res) => {
    Hotel.find({}, (err, hotels) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("users/index", {hotels});
    })
});

// User Show Route
router.get("/user/hotels/:id", (req, res) => {
    Hotel.findById(req.params.id).populate("dishes").exec((err, hotel) => {
        if (err) {
            console.log(err);
            return res.redirect("user/hotels");
        }
        res.render("users/show", {hotel});
    });
});

// User Add to Cart Route
router.post("/user/hotels/:id", (req, res) => {
   Dish.findById(req.params.id, (err, dish) => {
       if(!err) {
          User.create({name: dish.name, image:dish.image, price: dish.price, quantity: req.body.quantity}, (err, dish) => {
              if (err){
                  console.log(err);
                res.redirect(`/user/hotels`)
              } else {
                  console.log(dish);
                  res.redirect(`/user/hotels`);
              }
          })
       }
   })
});

// User Delete Order from Cart Route
router.post("/user/dishes/:id/delete", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, dish) =>{
        if (err) {
            console.log(err);
            return res.redirect("/user/hotels");
        }
        res.redirect("/user/orders");
    });
});


// User Edit Quantity Route
router.post("/user/dishes/:id/edit", (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: {quantity: req.body.new_quantity}}, {new: true}, (err, dish) => {
        if (err) {
            console.log(err);
            return res.redirect("/user/hotels");
        }
        res.redirect("/user/orders");
    });
});

// User Show all Orders Route
router.get("/user/orders", (req, res) => {
   let price = 0
   console.log(typeof price)
   User.find({}, (err, orders) => {
       if (err) {
           console.log(err);
       } else {
           orders.forEach(order => {
               if (order.price)
                price += order.price * order.quantity;
           });
           res.render("users/checkout", {orders, price});
       }
   }) 
});

module.exports = router;