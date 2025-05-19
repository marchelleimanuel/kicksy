import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const User = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, 
    {timestamps: true},
);

