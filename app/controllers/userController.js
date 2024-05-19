const { getRepository } = require("typeorm");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the id parameter from the request
    console.log(id);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneBy({
      id: id, // where id is your column name
    }); // Query the database using the id
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract the id parameter from the request
    console.log(id);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const result = await userRepository.delete(req.params.id);
    if (result.affected === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user by email
    const userRepository = getRepository(User);
    const user = await userRepository.findOneBy({
      email: email, // where id is your column name
    });

    if (!user) {
      return res.status(404).json(false);
    }

    // Compare the provided password with the stored hashed password
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = user.password == password;
    console.log(password);
    console.log(user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      console.log("password wrong");
      return res.status(404).json(false);
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
};
