import { BuyingMethod } from '@/actions/buy_the_game/route';
import { CheckTheGame } from '@/actions/check_the_game_in_lib/route';
import { DeleteFromCartMethod } from '@/actions/Delete_From_Cart/route';
import { GetFromCartMethod } from '@/actions/Get_From_Cart/route';
import { InputTheGameIntoLib } from '@/actions/input_game_into_lib/route';
import React, { useEffect, useState } from 'react';

interface CartProps {
  id_user?: number;
  id_game?: number;
  image_profile_url?: string;
  title?: string;
  price?: number;
  file_url?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  const GetDataCartByIdUser = async (id_user: any) => {
    try {
      const result = await GetFromCartMethod(id_user);
      const data: CartProps[] = result?.data && Array.isArray(result.data) ? result.data : [];
      
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const id_user = localStorage.getItem('id_user');

    if (id_user) {
      GetDataCartByIdUser(id_user);
    } else {
      alert('Please login first to view your cart.');
    }
  }, []);

  if (!isClient) return null;

  const HandleRemoveProductFromCart = async (datas: any) => {
    const result = await DeleteFromCartMethod(datas);

    if (result.status === 200) {
      alert('Product berhasil dihapus.');
      setCartItems(prev => prev.filter(i => i.id_game !== datas.id_game));
    } else {
      alert('Gagal menghapus produk dari cart.');
    }
  };

  const HandleBuyProductFromCart = async (datas: any) => {
    try {
      if (!datas.id_user) {
        alert('Please login dahulu!');
        return;
      }

      // Pastikan game belum dimiliki user
      const check = await CheckTheGame(datas);
      if (check.status === 200) {
        alert('Game ini sudah ada di Library kamu.');
        return;
      }

      // Tambahkan script snap Midtrans
      if (!document.getElementById('midtrans-script')) {
        const script = document.createElement('script');
        script.id = 'midtrans-script';
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute(
          'data-client-key',
          process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
        );
        document.body.appendChild(script);
      }

      const resultPaymentMethod = await BuyingMethod(datas);

      if (resultPaymentMethod?.token) {
        (window as any).snap.pay(resultPaymentMethod.token, {
          onSuccess: async function (result: any) {
            // Setelah sukses, tambahkan game ke library
            const datasGameLib = {
              id_user: datas.id_user,
              id_game: datas.id_game,
              cover_image_game: datas.image_profile_url,
              title: datas.title,
              file_url: datas.file_url,
            };
            const inputResult = await InputTheGameIntoLib(datasGameLib);

            if (inputResult.status === 200) {
              alert('Game berhasil dimasukkan ke Library!');
              await HandleRemoveProductFromCart(datas);
            } else {
              alert('Gagal menambahkan game ke Library.');
            }
          },
          onPending: function (result: any) {
            console.log('Menunggu pembayaran:', result);
            alert('Pembayaran sedang diproses. Silakan tunggu.');
          },
          onError: function (result: any) {
            console.error('Error pembayaran:', result);
            alert('Terjadi kesalahan saat pembayaran.');
          },
          onClose: function () {
            console.log('Popup pembayaran ditutup tanpa menyelesaikan transaksi.');
          },
        });
      } else {
        alert('Token pembayaran tidak ditemukan.');
      }
    } catch (error) {
      console.log(error);
      alert('Terjadi kesalahan saat proses pembelian.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm gap-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_profile_url || '/placeholder.png'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-gray-500">
                      Rp {item.price?.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      HandleRemoveProductFromCart({
                        id_user: localStorage.getItem('id_user'),
                        id_game: item.id_game,
                      })
                    }
                  >
                    Remove
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      HandleBuyProductFromCart({
                        id_user: localStorage.getItem('id_user'),
                        id_game: item.id_game,
                        title: item.title,
                        price: item.price,
                        gross_amount: item.price,
                        image_profile_url: item.image_profile_url,
                        file_url: item.file_url,
                      })
                    }
                  >
                    Pay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
