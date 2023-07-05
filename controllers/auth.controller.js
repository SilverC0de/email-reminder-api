const { v4 : uuidv4 } = require('uuid');
const userService = require('../services/users.service');
const bcryptHelper = require('../helpers/bcrypt.helper');
const jwtHelper = require('../helpers/jwt.helper');


exports.registerUser = async (req, res) => {
    const {email, password, name } = req.body;
    const uuid = uuidv4();
       
    try {
        const checkUser = await userService.fetchUser(email);
        if(checkUser.rowCount > 0){
            // user already exist
            return res.status(406).json({
                status: false,
                message: 'Email already exist'
            });
        }
        
        
        // hash password
        const hashedPassword = await bcryptHelper.encryptPassword(password);


        // register user then fetch user details
        await userService.registerUser(email, uuid, hashedPassword, name);

        
        // generate JWT token
        const jwtToken = await jwtHelper.generateToken(email, uuid);
        
        return res.status(200).json({
            status: true,
            message: 'User registered successfully',
            data: {
                uuid,
                email,
                name,
                token: jwtToken
            }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return res.status(500).json({
            status: false,
            message: 'Server error, please try again later'
        });
    }
};


exports.signInUser = async (req, res) => {
    const {email, password } = req.body;
       
    try {
        // check user
        const fetchedUser = await userService.fetchUser(email);


        if(fetchedUser.rowCount === 0){
            // showing little infomation for security reasons
            return res.status(401).json({
                status: false,
                message: 'Incorrect email/password combination'
            });
        }


        // get user info
        const { uuid: userUUID, email: userEmail, name: userName, password: hashedPassword } = fetchedUser.rows[0];


        // check password
        const passwordMatch = await bcryptHelper.comperePassword(password, hashedPassword);
        if(!passwordMatch){
            return res.status(401).json({
                status: false,
                message: 'Incorrect email/password combination'
            });
        }


        // generate JWT token
        const jwtToken = await jwtHelper.generateToken(email, userUUID);
        

        return res.status(200).json({
            status: true,
            message: 'User registered successfully',
            data: {
                uuid: userUUID,
                email: userEmail,
                name: userName,
                token: jwtToken
            }
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Server error, please try again later'
        });
    }
};