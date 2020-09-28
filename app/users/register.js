const users = require('./schema')
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    try{

        //validation
        if( !req.body.login || !req.body.password )
            return res.status(400).json({
                status: false,
                message: "Validation Failed"
            })

        //Check user already exist
        const userExist = await users.findOne({email: req.body.login})
        if(userExist)   return res.status(409).json({
            status: false,
            message: 'user already exist'
        })
        

        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(req.body.password, salt)
        const user = new users({
            email: req.body.login,
            password: hashpwd
        })

        const response = await user.save();

        if(response)
            return res.json({
                status: true,
                message: 'Registered',
                data: user
            })
    }
    catch(err){
        res.status(400).json({
            status: false,
            message: 'Somethign went wrong',
            data: err
        })
    }
}