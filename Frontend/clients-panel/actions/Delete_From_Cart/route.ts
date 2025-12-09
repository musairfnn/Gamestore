export async function DeleteFromCartMethod(datas: any) {
    try {
        const endpoint = `http://localhost:4000/carts/delete/${datas.id_user}`;

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_game: datas.id_game })
        })

        const result = await res.json();

        return result;
    } catch (error) {
        console.log(error)
    }
}