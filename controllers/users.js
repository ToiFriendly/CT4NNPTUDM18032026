let userModel = require('../schemas/users')
let bcrypt = require('bcrypt');
module.exports = {
    CreateAnUser: async function (username, password, email, role,
        fullName, avatarUrl, status, loginCount) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        });
        await newItem.save();
        return newItem;
    },
    GetAnUserByUsername: async function (username) {
        return await userModel.findOne({
            isDeleted: false,
            username: username
        })
    }, GetAnUserById: async function (id) {
        return await userModel.findOne({
            isDeleted: false,
            _id: id
        })
    },
    ChangePassword: async function (userId, oldpassword, newpassword) {
        let user = await userModel.findOne({ _id: userId, isDeleted: false });
        if (!user) throw new Error("User not found");
        if (!bcrypt.compareSync(oldpassword, user.password)) {
            throw new Error("Mật khẩu cũ không đúng");
        }
        user.password = newpassword;
        await user.save();
        return { message: "Đổi mật khẩu thành công" };
    }
}