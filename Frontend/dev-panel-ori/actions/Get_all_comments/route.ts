export async function GetAllComments(id_game: any) {
    try {
        const endpoint = `http://localhost:4000/review-players/get-comments/${id_game}`

        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
    }
}