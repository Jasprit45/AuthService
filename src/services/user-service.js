const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
            try {
                const user = this.userRepository.create(data);
                return user;
            } catch (error) {
                console.log("Something went wrong in user-service layer");
                throw(error);
            }
        }
        
    createToken(user) {
        try {
            const result = jwt.sign(user , JWT_KEY , {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation(service layer)");
            // console.log(error);
            throw(error);
        }
    }
        
    verifyToken(token) {
        try {
            const result = jwt.verify(token,JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong in token verification(service layer)");
            // console.log(error);
            throw(error);
        }
    }

    async signIn(email, plainPassword) {
        try {
            //get the user data by id
            const user = await this.userRepository.getByEmail(email); 

            //check the password and verify the user
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch) {
                console.log("password did not match");
                throw {error: "wrong password"};
            }

            //create a token for user
            const response = this.createToken({email:user.email, id:user.id});
            return response;
        } catch (error) {
            console.log("Something went wrong in sign in process(service layer)");
            // console.log(error);
            throw(error);
        }
    }

    checkPassword(userInputplainPassword , encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputplainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password check(service layer)");
            throw(error);
        }
    }
}

module.exports = UserService;