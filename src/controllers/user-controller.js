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

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        // console.log(token);
        const response = await userService.isAuthenticated(token);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully authenticated the user & token is valid",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in sign-in of user(controller layer)",
            data: {},
            success: false,
            err: error,
        });
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched user is admin or not",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in checking isAdmin of user(controller layer)",
            data: {},
            success: false,
            err: error,
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}