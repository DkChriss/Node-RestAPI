require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`${process.env.DATABASE_CONNECTION}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SERVER}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
