const { items } = require("./db");
//ITEMS

let idCounter = 6;

function deleteItem(id) {
  const parsedId = parseInt(id);
  const index = parsedId - 1;
  console.log(parsedId);
  items.splice(index, 1);
}

function updateSoldStatus(id) {
  const parsedId = parseInt(id);
  let obj = items.find((e) => e.id === parsedId);
  obj.isSold = true;
  return true;
}

function placeBid(id, userId, bid, isSold) {
  let parsedId = parseInt(id);
  let obj = items.find((e) => e.id === parsedId);
  if (obj.seller === userId) {
    return false;
  } else {
    obj.currentBid = bid;
    obj.isSold = isSold;
    return true;
  }
}

function newAuction(userId, item, description, startingPrice, buyout) {
  items.push({
    id: idCounter,
    item: item,
    description: description,
    startingPrice: startingPrice,
    currentBid: 0,
    seller: userId,
    buyout: buyout,
    isSold: false,
  });
  idCounter++;
}

//AUTHENTICATION
const initId = "TestUser";
const initUser = {
  id: initId,
  password: "testuserpassword",
};

const users = new Map();
users.set(initId, initUser);

function getUser(id) {
  return users.get(id);
}

function verifyUser(id, password) {
  const user = getUser(id);

  if (!user) {
    return false;
  }

  return user.password === password;
}

function createUser(id, password) {
  if (getUser(id)) {
    return false;
  }

  const user = {
    id: id,
    password: password,
  };

  users.set(id, user);
  return true;
}

module.exports = {
  getUser,
  verifyUser,
  createUser,
  items,
  placeBid,
  newAuction,
  updateSoldStatus,
  deleteItem,
};
