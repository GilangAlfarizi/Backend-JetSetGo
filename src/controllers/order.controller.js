const { orders, tickets } = require("../models");
const { generateUUID } = require("../utils/uuid");

module.exports = {
  newOrder: async (req, res) => {
    try {
      const total_price = req.body.total_price;
      const order_code = generateUUID();

      const { status, flight_id, profile_id } = req.body;

      const newOrder = await orders.create({
        data: {
          code: order_code,
          total_price: total_price,
          status: status,
          flight_id: flight_id,
          profile_id: profile_id,
        },
      });
      // logic bikin tiket

      return res.status(201).json({
        message: "Order created",
        order_details: newOrder,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating a new order",
        error: error.message,
      });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const order_id = parseInt(req.params.id, 10);
      const status = req.body.status;

      const order = await orders.update({
        where: {
          id: order_id,
        },
        data: {
          status: status,
        },
      });

      return res.status(201).json({
        message: "Order status updated",
        status: status,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating order status",
        error: error.message,
      });
    }
  },

  getAllUserOrder: async (req, res) => {
    try {
      const profileId = parseInt(req.params.profile_id, 10);

      const userOrders = await orders.findMany({
        where: {
          profile_id: profileId,
        },
      });

      return res.status(200).json({
        data: userOrders,
      });
    } catch (error) {
      console.log(data);
      return res.status(500).json({
        message: "Error getting orders",
        error: error.message,
      });
    }
  },

  getOrderDetail: async (req, res) => {
    try {
      const order_id = parseInt(req.params.id, 10);

      const orderDetail = await orders.findUnique({
        where: {
          id: order_id,
        },
      });
      // Logic nampilin tiket-tiket

      return res.status(201).json({
        data: orderDetail,
      });
    } catch (error) {
      console.log(data);
      return res.status(500).json({
        message: "Error getting order detail",
        error: error.message,
      });
    }
  },
};
