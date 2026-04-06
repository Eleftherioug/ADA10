const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Set it in Render or your local .env file.');
}

const isProduction = process.env.NODE_ENV === 'production';

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: isProduction
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
        : {},
    logging: false
});

// User Model
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Task Model
const Task = db.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium'
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Relationships
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Initialize DB
async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Database connected successfully.');

        await db.sync();
        console.log('Database synced.');
    } catch (error) {
        console.error('Database error:', error);
    }
}

initializeDatabase();

module.exports = {
    db,
    User,
    Task
};
