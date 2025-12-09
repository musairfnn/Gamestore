export async function RegisterMethod(datas: any) {
    try {
        const endpoint = `http://localhost:4000/user/regist`

        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas)
        })

        const res = await result.json()

        console.log(res)

        return res
    } catch (error) {
        console.log(error)
    }
}