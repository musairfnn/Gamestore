export async function GetAllGamesFromLib(id_user: any) {
    try {
        const endpoint = `http://localhost:4000/library/games/${id_user}`

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