'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Torneo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Torneo.belongsTo(models.TipoTorneo, {
        foreignKey : 'tipoTorneoId'
      })
    }
  };
  Torneo.init({
    nombre: DataTypes.STRING,
    fecha: DataTypes.DATE,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Torneo',
    freezeTableName : true //necesario para crear mas tablas
  });
  return Torneo;
};