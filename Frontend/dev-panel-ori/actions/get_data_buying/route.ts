export async function GetBuyingDatas(params: any) {
    try {
        const endpoint = `http://localhost:4000/laporan-keuangan/${params}`

        const res = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
    }
}