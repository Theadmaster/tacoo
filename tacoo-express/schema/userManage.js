const joi = require('joi')

const username = joi.string().alphanum().min(3).max(30).required()
const password = joi.string().required()
const email = joi.string().email()
const role = joi.string().required()

const id = joi.number().integer().min(1).required()

exports.add_user_schema = {
    body: {
        username,
        password,
        email,
        
    }
}

exports.delete_user_schema = {
    params: {
        id
    }
}

exports.get_user_schema = {
    params: {
      id,
    },
}

exports.update_user_schema = {
    body: {
        id: id,
        username,
        password,
        email,
        role
    }
}