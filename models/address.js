'use strict';

module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        address: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});

    Address.associate = function(models) {
        // Associations can be defined here
        Address.belongsTo(models.User);
    };

    return Address;
};
