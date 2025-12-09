export async function UploadMethod(datas: any) {
    try {
        const endpoint = `http://localhost:4000/games/upload/${datas.idDev}`

        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas)
        })

        if(!result.ok) throw new Error(`HTTP error! status: ${result.status}`);

        const res = await result.json()

        return res
    } catch (error) {
        console.log(error)
    }
}