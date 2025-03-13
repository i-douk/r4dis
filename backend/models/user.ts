import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";
// import hashPassword from "../utils/hashHook";

class User extends Model {
  public disabled?: boolean;
  public email?: string;
  public id!: string;
  public username?: string;
  // public password?: string;
  public role!: "admin" | "user" | "superuser";
  public avatar_url: string | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: { model: { tableName: 'users', schema: 'auth' }, key: 'id' }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Validation isEmail on email failed",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM({ values: ["user", "superuser", "admin"] }),
      defaultValue: "user",
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
    balance: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
  },
);

export default User;
