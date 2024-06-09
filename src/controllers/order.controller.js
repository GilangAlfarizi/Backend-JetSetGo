const { orders, passengers, flights, tickets } = require("../models");
const { generateUUID } = require("../utils/uuid");
const { generateVirtualAccountNumber } = require("../utils/va");

module.exports = {
  newOrder: async (req, res) => {
    try {
      const { flight_id, profile_id } = req.body;

      const totalPassengers = await passengers.count({
        where: {
          profile_id: profile_id,
        },
      });

      const flightPrice = await flights.findUnique({
        where: {
          id: flight_id,
        },
      });

      const total_price = flightPrice?.price * totalPassengers;
      const order_code = generateUUID();
      const vaNumber = generateVirtualAccountNumber();

      const newOrder = await orders.create({
        data: {
          code: order_code,
          total_price: total_price,
          payment_number: vaNumber,
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

      const { status, payment_method } = req.body;

      const order = await orders.update({
        where: {
          id: order_id,
        },
        data: {
          status: status,
          payment_method: payment_method,
        },
      });

      const orderPassengers = await passengers.findMany({
        where: {
          profile_id: order?.profile_id,
        },
      });

      let createdTickets = [];
      for (const passenger of orderPassengers) {
        const ticketData = {
          code: generateUUID(),
          passenger_id: passenger.id,
          order_id: order_id,
        };
        createdTickets.push(ticketData);
      }

      const createTickets = await tickets.createMany({
        data: createdTickets,
      });

      return res.status(201).json({
        message: "Order status updated, tickets issued",
        status: status,
        payment_method: payment_method,
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
