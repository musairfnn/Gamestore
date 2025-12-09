const userModels = require('../model/users');
const bcryptjs = require('bcryptjs');

const { Resend } = require("resend")
const resend = new Resend(process.env.RESEND_API_KEY)


// ======================= REGISTER =======================
const CreateNewUser = async (req, res) => {
    try{
        const { username, email, password } = req.body; 

        const result = await userModels.createNewUser({
            username,
            email,
            password: await bcryptjs.hash(password, 10)
        })

        if(result.error){
           return res.json({
                message: result.error,
                status: 400
            })
        }  
        
        res.json({
            message: result.success,
            status: 200
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal membuat akun",
            status: 500,
            error: error.message
        });
    }
}


// ======================= LOGIN =======================
const LoginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedOTP = await bcryptjs.hash(otp.toString(), 10);

        const result = await userModels.GetUserByEmail(email, hashedOTP);

        if(result.error){
            return res.status(404).json({
                message: result.error,
                status: 404
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, result.data.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Password salah",
                status: 401
            });
        }

        res.json({
            message: result.success,
            status: 200,
            data: result.data,
            otp: otp
        })

        await SendOtpCode(result.data.email, otp)

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal login",
            status: 500,
            error: error.message
        });
    }
}


// ======================= SEND OTP EMAIL =======================
const SendOtpCode = async (email, otp_code) => {
    try {
        await resend.emails.send({
            from: "Gim Store <onboarding@resend.dev>",
            to: email,
            subject: "OTP CODE",
            html: `<p>Your OTP Code is: <strong>${otp_code}</strong></p>`
        })   
    } catch (error) {
        console.log(error)
    }
}


// ======================= VERIFY OTP =======================
const VerifyOTP = async (req, res) => {
    try{
        const id_user = req.params.id_user;
        const { otp } = req.body;

        const result = await userModels.GetUserById(id_user);

        if(result.error){
            return res.status(404).json({
                message: result.error,
                status: 404
            });
        }

        const isOTPValid = await bcryptjs.compare(otp.toString(), result.data.otp_code);

        if(!isOTPValid){
            return res.status(401).json({
                message: "OTP salah",
                status: 401
            });
        }

        res.json({
            message: result.success,
            status: 200
        })

        await userModels.ResetOtpCode(id_user)
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Gagal verifikasi OTP",
            status: 500,
            error: error.message
        });
    }
}


// ======================= CHANGE PASSWORD =======================
const ChangePassword = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        // PERBAIKAN DISINI ⬇⬇⬇
        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;

        const result = await userModels.GetUserById(id_user);

        if(result.error){
            return res.status(404).json({
                message: result.error,
                status: 404
            });
        }

        const user = result.data;

        const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Password lama salah",
                status: 401
            });
        }

        const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

        await userModels.ChangePassword(id_user, hashedNewPassword);

        res.json({
            message: "Password berhasil diganti",
            status: 200
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengganti password",
            status: 500,
            error: error.message
        });
    }
}



module.exports = {
    CreateNewUser,
    LoginUser,
    VerifyOTP,
    ChangePassword
}
