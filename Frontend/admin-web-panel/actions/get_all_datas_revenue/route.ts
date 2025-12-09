export async function GetAllDatasRevenue() {
    try {
        const endpoint = `http://localhost:4000/revenues`

        const res = await fetch(endpoint, {
            method: "GET", 
        })

        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
    }
}