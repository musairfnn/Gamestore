// actions/commentActions.ts

interface DeleteCommentPayload {
  id_review: number;
  id_user: string;
}

// Tambah komentar
export async function CreateNewCommentar(datas: any) {
  try {
    const endpoint = `http://localhost:4000/review-players`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Error CreateNewCommentar:", error);
  }
}

// Hapus komentar
export async function DeleteComment(payload: DeleteCommentPayload) {
  try {
    const { id_review, id_user } = payload;

    // Kirim id_user sebagai query param sesuai backend
    const endpoint = `http://localhost:4000/review-players/${id_review}?id_user=${id_user}`;

    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Error DeleteComment:", error);
  }
}

// Ambil semua komentar (optional, bisa dipakai untuk refresh)
export async function GetAllComments(id_game: number) {
  try {
    const endpoint = `http://localhost:4000/review-players/get-comments/${id_game}`;

    const res = await fetch(endpoint);
    const result = await res.json();
    return result.datas || [];
  } catch (error) {
    console.log("Error GetAllComments:", error);
    return [];
  }
}
