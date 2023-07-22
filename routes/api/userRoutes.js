const router = require("express").Router();
const {
  getUsers: getStudents,
  getSingleUser: getSingleStudent,
  createUser: createStudent,
  deleteStudent,
  addFriend: addAssignment,
  removeFriend: removeAssignment,
} = require("../../controllers/UserController");

// /api/students
router.route("/").get(getStudents).post(createStudent);

// /api/students/:studentId
router.route("/:studentId").get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route("/:studentId/assignments").post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route("/:studentId/assignments/:assignmentId").delete(removeAssignment);

module.exports = router;
