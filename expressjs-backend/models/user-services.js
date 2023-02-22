const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);
mongoose.set('strictQuery',false);

mongoose
    .connect("mongodb://localhost:27017/users", {
    //.connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));



async function findUser(username, password) {
    ////return account['account_list'].find( (user) => 
    ////user['username'] === username && user['password'] === password);
    
    return await userModel.find({username: username, password: password});
}

async function findUserByUsername(username) {
    ////return account['account_list'].find( (user) => 
    ////user['username'] === username);

    return await userModel.find({ username: username });
    //return await userModel.find((user) => user['username'] === username);
}

async function getAllUsers() {
    return await userModel.find();
}

async function addUser(user) {
    try {
      const userToAdd = new userModel(user);
      const savedUser = await userToAdd.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
}


async function findUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
}



// async function getUsers(name, job) {
//   let result;
//   if (name === undefined && job === undefined) {
//     result = await userModel.find();
//   } else if (name && !job) {
//     result = await findUserByName(name);
//   } else if (job && !name) {
//     result = await findUserByJob(job);
//   }
//   return result;
// }


// async function findUserByName(name) {
//   return await userModel.find({ name: name });
// }

// async function findUserByJob(job) {
//   return await userModel.find({ job: job });
// }



//exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.findUser = findUser;
exports.findUserByUsername = findUserByUsername;
exports.addUser = addUser;
exports.getAllUsers = getAllUsers;