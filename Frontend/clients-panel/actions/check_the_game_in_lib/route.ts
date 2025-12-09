export async function CheckTheGame(datas:any) {
    try {
        const endpoint = `http://localhost:4000/library/check-games/${datas.id_game}/${datas.id_user}`

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