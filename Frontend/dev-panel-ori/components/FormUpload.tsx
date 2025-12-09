"use client"
import React, { useState, useEffect } from "react"
import { useEdgeStore } from "../lib/edgestore"
import { UploadMethod } from "@/actions/upload-game/route"

const FormUpload = () => {
  const [datas, setDatas] = useState({
    title: "",
    publisher: "",
    description: "",
    category: "",
    price: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [cover, setCover] = useState<File | null>(null)       // <-- Cover
  const [screenshots, setScreenshots] = useState<File[]>([])  // <-- Screenshot
  const [loading, setLoading] = useState(false)
  const [idDev, setIdDev] = useState<string | null>(null)
  const [loadingUploadZip, setLoadingUploadZip] = useState<number | null>(null)
  const [loadingUploadImage, setLoadingUploadImage] = useState<number | null>(null)

  const { edgestore } = useEdgeStore()

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let fileUrl = ""
      let coverUrl = ""
      let screenshotUrls: string[] = []

      // Upload file .zip
      if (file) {
        const resFile = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => setLoadingUploadZip(progress),
        })
        fileUrl = resFile.url
      }

      // Upload cover (1 file)
      if (cover) {
        const resCover = await edgestore.publicFiles.upload({
          file: cover,
          onProgressChange: (progress) => setLoadingUploadImage(progress),
        })
        coverUrl = resCover.url
      }

      // Upload screenshots (multiple)
      if (screenshots.length > 0) {
        for (const img of screenshots) {
          const resImg = await edgestore.publicFiles.upload({
            file: img,
            onProgressChange: (progress) =>
              setLoadingUploadImage(progress),
          })
          screenshotUrls.push(resImg.url)
        }
      }

      // Data game final
      const gameData = {
        ...datas,
        price: parseFloat(datas.price),
        fileUrl,
        coverUrl,
        screenshotUrls,
        idDev,
      }

      await UploadMethod(gameData)

      alert("Game berhasil diupload!")
      setDatas({ title: "", publisher: "", description: "", category: "", price: "" })
      setFile(null)
      setCover(null)
      setScreenshots([])
    } catch (error) {
      console.error(error)
      alert("Upload gagal, coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedId = localStorage.getItem("id_dev")
    setIdDev(storedId)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
      <form
        onSubmit={HandleSubmit}
        className="w-full max-w-2xl bg-[#1c1c1c] text-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Upload Game to Store</h2>

        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Game Title</label>
          <input
            type="text"
            value={datas.title}
            onChange={(e) => setDatas({ ...datas, title: e.target.value })}
            placeholder="Enter game title"
            required
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block mb-2 font-medium">Publisher</label>
          <input
            type="text"
            value={datas.publisher}
            onChange={(e) => setDatas({ ...datas, publisher: e.target.value })}
            placeholder="Enter publisher name"
            required
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={datas.description}
            onChange={(e) => setDatas({ ...datas, description: e.target.value })}
            placeholder="Write a short description"
            rows={4}
            required
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            value={datas.category}
            onChange={(e) => setDatas({ ...datas, category: e.target.value })}
            required
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Category --</option>
            <option value="Action">Action</option>
            <option value="Online">Online</option>
            <option value="Shooter">Shooter</option>
            <option value="Offline">Offline</option>
            <option value="Casual">Casual</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price (Rp)</label>
          <input
            type="number"
            value={datas.price}
            onChange={(e) => setDatas({ ...datas, price: e.target.value })}
            required
            placeholder="Enter price"
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload .zip */}
        <div>
          <label className="block mb-2 font-medium">
            Game File (.zip) {loadingUploadZip !== null && loadingUploadZip > 0 ? loadingUploadZip.toString() : ""}
          </label>
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
          />
        </div>

        {/* Upload Cover (1 file) */}
        <div>
          <label className="block mb-2 font-medium">
            Cover Image {loadingUploadImage !== null && loadingUploadImage > 0 ? loadingUploadImage.toString() : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
            required
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-green-600 file:text-white hover:file:bg-green-500 cursor-pointer"
          />
        </div>

        {/* Upload Screenshots (multiple) */}
        <div>
          <label className="block mb-2 font-medium">
            Screenshots (drop multiple) {loadingUploadImage !== null && loadingUploadImage > 0 ? loadingUploadImage.toString() : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setScreenshots(e.target.files ? Array.from(e.target.files) : [])}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 transition font-semibold"
        >
          {loading ? "Uploading..." : "Upload Game"}
        </button>
      </form>
    </div>
  )
}

export default FormUpload
