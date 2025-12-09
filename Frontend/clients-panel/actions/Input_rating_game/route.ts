export async function CreateNewRating(datas: any) {
    try {
        const endpoint = `http://localhost:4000/rating-players/`

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
        });

        const result = await res.json();

        return result
    } catch (error) {
        console.log(error)
    }
}