export async function GetRatingGame(id_game: any) {
    try {
        const endpoint = `http://localhost:4000/rating-players/get-ratings/${id_game}`;

        const res = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
    }
}