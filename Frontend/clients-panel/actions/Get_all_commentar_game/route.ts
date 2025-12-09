export async function GetAllCommentarGame(id_game: any) {
    try {
        const endpoint = `http://localhost:4000/review-players/get-comments/${id_game}`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error)
    }
}