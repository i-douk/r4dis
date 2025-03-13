import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class Podcast extends Model {
  public transcribed?: boolean;
  public username?: string;
  public id?: number;
  public name?: string;
  public urls!: string[];
  public description?: string;
  public podcastId!: number;
  public slug!: string;
  public cover_url?: string;
}

Podcast.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    urls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    transcribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    slug : {
      type : DataTypes.STRING,
      allowNull: false
    },
    cover_url : {
      type : DataTypes.STRING
    },
    created_at : {
      type : DataTypes.DATE
    },
    updated_at : {
      type : DataTypes.DATE
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "podcast",
  },
);

export default Podcast;
