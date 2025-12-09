export async function GetGames(idDev: any) {
  try {
    const endpoint = `http://localhost:4000/games/${idDev}`;

    const result = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);

    // ✅ Parse JSON supaya dapat array of objects dari Express
    const data = await result.json();
    return data;

  } catch (error) {
    console.error("Error GetGames:", error);
    return [];
  }
}
