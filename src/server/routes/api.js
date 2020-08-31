const express = require("express");
const app = require("../app");
const router = express.Router();
const passport = require("passport");
const Repository = require("../repository");

//BIDDING/MANAGE AUCTIONS

router.get("/api/items", function (req, res) {
  res.status(200).json({
    message: "OK",
    data: Repository.items,
  });
});

router.put("/api/sold/:userId", function (req, res) {
  try {
    Repository.updateSoldStatus(req.params.userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/api/delete/:id", function (req, res) {
  try {
    Repository.deleteItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post(
  "/api/new/:userId/:item/:description/:startingPrice/:buyout",
  function (req, res) {
    try {
      Repository.newAuction(
        req.params.userId,
        req.params.item,
        req.params.description,
        req.params.startingPrice,
        req.params.buyout
      );
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }
);

router.put("/api/bid/:id/:userId/:amount/:isSold", function (req, res) {
  try {
    if (
      !Repository.placeBid(
        req.params.id,
        req.params.userId,
        req.params.amount,
        req.params.isSold
      )
    ) {
      res.status(403).send();
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// AUTHENTICATION
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

router.post("/api/signup", function (req, res) {
  const created = Repository.createUser(req.body.userId, req.body.password);

  if (!created) {
    res.status(400).send();
    return;
  }
  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    });
  });
});

router.post("/api/logout", function (req, res) {
  req.logout();
  res.status(204).send();
});

router.get("/api/user", (req, res) => {
  if (req.user) {
    res.json({
      userId: req.user.id,
    });
    return;
  }

  res.status(401).send();
});

module.exports = router;
