import sequelize from "../config/db";
import User from "./User";
import Document from "./Document";

User.hasMany(Document, { foreignKey: "userId" });

Document.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true });

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Error connecting to the database:', err));

export { User, Document };



