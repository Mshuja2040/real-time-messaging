export default (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    }, {
      tableName: 'messages',
      timestamps: true,
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      Message.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'receiver',
      });
    };
  
    return Message;
  };
  