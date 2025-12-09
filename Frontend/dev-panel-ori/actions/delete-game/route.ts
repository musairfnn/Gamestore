export async function DeleteGameMethod(id_game:any) {
    try {
        const endpoint = `http://localhost:4000/games/delete/${id_game}`

        const result = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const res = await result.json()
        return res
    } catch (error) {
        console.log(error)
    }
}