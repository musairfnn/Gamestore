export async function verifyOTPMethod(datas: any) {
    try {
       const { idUser, otpCode } = datas

       const otp = {
        otp: otpCode
       }
       
       const endpoint = `http://localhost:4000/user/verify-otp/${idUser}`

       const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(otp)
       })

       const res = await result.json()

       return res
    } catch (error) {
        console.log(error)
    }
}