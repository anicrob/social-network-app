const router = require("express").Router();
const {
  getUsers: getUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  deleteUser,
  addFriend: addFriend,
  removeFriend: removeFriend,
  updateUser,
} = require("../../controllers/UserController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route("/:userId/friends").post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
