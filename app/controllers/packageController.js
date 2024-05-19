const { getRepository } = require("typeorm");
const Package = require("../models/package");

const getPackages = async (req, res) => {
  try {
    const packageRepository = getRepository(Package);
    const packages = await packageRepository.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const packageRepository = getRepository(Package);
    const package = await packageRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (package) {
      res.json(package);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const packageRepository = getRepository(Package);
    const package = packageRepository.create(req.body);
    const result = await packageRepository.save(package);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const packageRepository = getRepository(Package);
    const existingPackage = await packageRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (existingPackage) {
      packageRepository.merge(existingPackage, req.body);
      const result = await packageRepository.save(existingPackage);
      res.json(result);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const packageRepository = getRepository(Package);
    const result = await packageRepository.delete(id);
    if (result.affected === 0) {
      res.status(404).json({ message: "Package not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
