const userModel = require('../models/users')

const getUsers = async () => {
  const users = await userModel.find({})
  return users
}

const getUserById = async (_id) => {
  return userModel.findOne({ _id })
}

const createUser = async (body) => {
  const newUser = new userModel(body)
  await newUser.save()
  return newUser
}

const updateUser = async (_id, updateObject) => {
  return userModel.findOneAndUpdate({ _id }, updateObject, {
    upsert: false,
    new: true
  })
}

const removeUser = async (_id) => {
  return userModel.findOneAndDelete({ _id })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
}
