const { getRepository } = require("typeorm");
const Order = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({
      relations: ["user", "package"],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderRepository = getRepository(Order);
    const order = orderRepository.create(req.body);
    const result = await orderRepository.save(order);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderRepository = getRepository(Order);
    const existingOrder = await orderRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (existingOrder) {
      orderRepository.merge(existingOrder, req.body);
      const result = await orderRepository.save(existingOrder);
      res.json(result);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderRepository = getRepository(Order);
    const result = await orderRepository.delete(id);
    if (result.affected === 0) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
