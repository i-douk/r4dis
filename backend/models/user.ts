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
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [8, 100], // Minimum length requirement
    //     isStrongPassword(value: string) {
    //       if (
    //         !/[A-Z]/.test(value) ||
    //         !/[a-z]/.test(value) ||
    //         !/[0-9]/.test(value) ||
    //         !/[@$!%*?&#]/.test(value)
    //       ) {
    //         throw new Error(
    //           "Password must contain uppercase, lowercase, number, and special character",
    //         );
    //       }
    //     },
    //   },
    // },
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
    defaultScope: {
      attributes: { exclude: [ "role"] },
    },
    scopes: {
      sensitive: {
        attributes: { include: [ "role"] },
      },
    },
  },
);

export default User;
