export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      tableName: 'users',
      timestamps: true,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'sentMessages',
      });
      User.hasMany(models.Message, {
        foreignKey: 'receiverId',
        as: 'receivedMessages',
      });
    };
  
    return User;
  };
  