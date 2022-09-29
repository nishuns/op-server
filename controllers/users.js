const { User } = require("../models/models"); // User from Models @desc used for operations in mongodb
const bcrypt = require("bcrypt"); // ** npm install bcrypt @desc used for created hash passwords

/**
 *  @description API to view all users
 *  @method POST /view
 */
exports.view = async (req, res) => {
   try {
      const users = await User.find().select(["-password"]);
      res.send({ users: users });
   } catch (error) {
      res.status(404).send([]);
   }
};

/**
 *  @description API to view selected user
 *  @method POST /add
 */
exports.viewOne = async (req, res) => {
   try {
      const user = await User.findOne({ _id: req.params.id });
      res.send({ user: user });
   } catch (error) {
      res.status(404).send({});
   }
};

/**
 *  @description API for adding user
 *  @method POST /add
 */
exports.add = async (req, res) => {
   console.log(req.body);
   const { firstName, lastName, username, email, password } = req.body;
   try {
      const checkEmail = await User.findOne({ email: email });
      if (!checkEmail) {
         const hashedPassword = await bcrypt.hash(password, 10);
         const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
         });

         user
            .save()
            .then(() => {
               res.send("User Registered Successfully");
            })
            .catch((error) => {
               console.log(error);
               res.status(404).send("Unable to Register, Try Again!");
            });
      } else {
        res.status(400).send("Already Registerd");
      }
   } catch (error) {
      console.log(error);
      res.status(404).send("Unable to Register, Try Again!");
   }
};

/**
 *  @description API for updating user
 *  @method PUT /upate
 */
exports.update = async (req, res) => {
   try {
      await User.updateOne({ _id: req.params.id }, { ...req.body });
      res.send("Updated Users");
   } catch (error) {
      res.status(404).send("Unable to Update, Try Again!");
   }
};

/**
 *  @description API for deleting user
 *  @method DELETE /delete
 */
exports.delete = async (req, res) => {
   try {
      await User.deleteOne({ _id: req.params.id });
      res.send("deleted Successfully");
   } catch (error) {
      res.status(404).send("Unable to Delete, Try Again!");
   }
};
