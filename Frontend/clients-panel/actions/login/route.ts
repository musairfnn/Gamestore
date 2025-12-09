export async function LoginMethod(datas: any) {
    try {
        const endpoint = `http://localhost:4000/user/login`

        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas)
        })

        const res = await result.json()

        return res
    } catch (error) {
        console.log(error)
    }
}