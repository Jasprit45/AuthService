const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created a new user",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in creating user(controller layer)",
            data: {},
            success: false,
            err: error,
        })
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created a token and sign in a user",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in sign-in of user(controller layer)",
            data: {},
            success: false,
            err: error,
        })
    }
}

module.exports = {
    create,
    signIn,
}