import User from "../models/UserModel.js";
 
export const Login = async (req, res) =>{
    try {
		const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
		if (!user)
			return res.status(401).send({ message: "Username Tidak Tersedia" });

		if (req.body.password != user.password)
			return res.status(401).send({ message: "Password Salah" });
    
		res.status(200).send({ message: "Login berhasil" });
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
}

/*
export const Register = async(req, res) =>{
    const {username, password, role} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            username: username,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const password = user.password;
    const role = user.role;
    res.status(200).json({uuid, username, password, role});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','username','password','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}
*/
