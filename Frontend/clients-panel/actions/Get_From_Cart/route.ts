export async function GetFromCartMethod(id_user: any) {
    try {
        const endpoint = `http://localhost:4000/carts/${id_user}`

        const res = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const result = await res.json();

        return result
    } catch (error) {
        console.log(error)
    }
}