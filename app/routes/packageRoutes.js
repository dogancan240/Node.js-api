const express = require("express");
const packageController = require("../controllers/packageController");

const router = express.Router();

router.get("/", packageController.getPackages);
router.get("/:id", packageController.getPackageById);
router.post("/", packageController.createPackage);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;
