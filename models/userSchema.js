const { Entity, Schema } = require('redis-om');

class User extends Entity {}

const userSchema = new Schema(User, {
    uname: {type: 'string'},
    message: {type: 'string'}
  })

module.exports = userSchema;
  