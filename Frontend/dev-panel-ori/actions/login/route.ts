export async function LoginMethod(datas: any) {
    try {
    const endpoint = "http://localhost:4000/dev/login";

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    // Cek kalau respon bukan 2xx
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const responseData = await result.json();

    return responseData;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}