export async function InputTheGameIntoLib(datas: any) {
    try {
        const endpoint = `http://localhost:4000/library/input-game/${datas.id_user}`

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