const express       = require('express'),
      router        = express.Router(),
      Hotel         = require("../models/hotel"),
      Dish          = require("../models/dish"),
      User          = require("../models/user")

router.get("/", (req, res) => {
   console.log("ROOT Route");
   res.redirect("/hotels");
});

// RESTful Routing
// Index Route
router.get("/hotels", (req, res) => {
    Hotel.find({}, (err, hotels) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("hotels/index", {hotels});
    })
});

// New Route
router.get("/hotels/new", (req, res) => {
   res.render("hotels/new");
});

// Create Route
router.post("/hotels", (req, res) => {
    Hotel.create(req.body.hotel, (err, hotel) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(hotel);
    })
    res.redirect("/hotels");
})

// Show Route
router.get("/hotels/:id", (req, res) => {
    Hotel.findById(req.params.id).populate("dishes").exec((err, hotel) => {
        if (err) {
            console.log(err);
            return res.redirect("/hotels");
        }
        res.render("hotels/show", {hotel});
    });
});


// Dish Routes
// New Dish
router.get("/hotels/:id/dishes/new", (req, res) => {
    Hotel.findById(req.params.id, (err, hotel) => {
        if(!err) {
            console.log(hotel)
            res.render("dishes/new", {hotel});
        }
    })
})

// Create Dish
router.post("/hotels/:id/dishes", (req, res) => {
    Hotel.findById(req.params.id, (err, hotel) => {
        if (err) {
            console.log(err);
            return;
        }
        Dish.create(req.body.dish, (err, dish) => {
            if (err) {
                console.log(err);
                return res.redirect(`/hotels/${req.params.id}`);
            } else {
                hotel.dishes.push(dish);
                hotel.save();
                console.log(dish);
                res.redirect(`/hotels/${req.params.id}`)
            }
        });
    });
});

module.exports = router;