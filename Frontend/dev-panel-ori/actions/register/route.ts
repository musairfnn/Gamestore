export async function RegisterMethod(datas: any) {
    try {
        const encpoint = "http://localhost:4000/dev/regist"

        const result = await fetch(encpoint, {
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