export async function VerifyOtp(id_dev: any, code: any) {
    try {
        const endpoint = `http://localhost:4000/dev/verify-otp/${id_dev}`

        const otp = {
            otp: code
        }

        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(otp)
        })

        if(!result.ok) throw new Error(`HTTP error! status: ${result.status}`);

        const res = await result.json()

        return res
    } catch (error) {
        console.log(error)
        return null
    }
}