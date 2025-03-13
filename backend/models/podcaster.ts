import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";
// import hashPassword from "../utils/hashHook";

class Podcaster extends Model {
  public premium?: boolean;
  public disabled?: boolean;
  public email?: string;
  public id!: string;
  public username!: string;
  public verified!: boolean;
}

Podcaster.init(
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
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    links: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    about: {
      type: DataTypes.TEXT,
    },
    earnings: {
      type: DataTypes.INTEGER,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "podcaster",
  },
);

export default Podcaster;
