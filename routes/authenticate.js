var express = require('express');
var routes = express.Router();
var userDB = require('../controllers/user.js');
const config = require('../model/config');
const jwt = require('jsonwebtoken');

routes.post('/authennormal', (req, res, next) => {//complete callback test
    const email = req.body.email;
    const password = req.body.password;
    userDB.getUserByemail(email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ success: false, msg: 'ไม่พบ email นี้ในระบบ' });
        else{
            userDB.comparePassword(password, user.pass, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({user: user.user_id}, config.secret, {
                        expiresIn: 86400 // 1 day
                    });
					userDB.getNormalUserInfo(user.user_id, (err, userInfo) => {
						console.log(user.user_id);
						if (err) throw err;
						res.json({
							success: true,
							token: 'JWT ' + token,
							user: {
								id: user.user_id,
								rank: user.rank
							}
						});
					});
					userDB.updateTimeLogin(user.user_id);
                } else {
                    return res.json({ success: false, msg: 'password ไม่ถูกต้อง' });
                }
            });
        }
    });
});

module.exports = routes;