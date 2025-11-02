const { createUser, updateUser, allReadUser, readUserById, deleteUser } = require('../models/userModel.js');
const crypto = require('crypto-js/sha256.js');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    const user = {
      name,
      email,
      password: crypto(password).toString()
    };

    const data = await createUser(user);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "[Internal server error] " + error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const data = await allReadUser();
    if(data.length === 0){
      return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "[Internal server error] " + error.message });
  }
}

const readUser = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await readUserById(id);
    if(data.length === 0 | data === null){
      return res.status(404).json({error: "User not found"}); 
    }
    return res.status(200).json({
      data
    })
  } catch (error) {
    return res.status(500).json({error : "[Internal server error] " + error.message})
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const userData = {};

    if (name) {
      userData.name = name;
    }
    if (email) {
      userData.email = email;
    }
    if (password) {
      userData.password = crypto.password
    }

    const data = await updateUser(id, userData);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const destroy = async (req, res) => {
  try {
    const {id} = req.params;
    const foundUser = await readUserById(id);
    if(!foundUser){
      return res.status(404).json({error: "User not found"})
    }
    const data = await deleteUser(id);
    return res.status(200).json({data})
  } catch (error) {
    return res.status(500).json({error: "[Internal server error ]" + error})
  }
}


module.exports = {
  registerUser,
  allUsers,
  update,
  readUser,
  destroy

}