export async function GetAllGames() {
    try {
        // Endpoint baru khusus game + promo aktif
        const endpoint = "http://localhost:4000/games/client-with-promo";

        const result = await fetch(endpoint, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await result.json();

        // Pastikan selalu return struktur yang konsisten
        return res;
    } catch (error) {
        console.error("Error GetAllGames:", error);

        return {
            status: 500,
            message: "Gagal mengambil data game",
            data: [],
        };
    }
}
