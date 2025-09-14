import { Sequelize } from "sequelize";

const sequelize = new Sequelize("metaflow", "root", "yourStrongPassword123", {
  host: "localhost",
  dialect: "mysql",
});
export default sequelize;