import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faTrash,
  faImages,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const NAVY = "#1B3A8A";
const GOLD = "#C49B2B";

export const DashboardGallery = () => {
  const { gallery = [], setGallery } = useOutletContext();

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const removePreview = (i) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleUpload = async () => {
    if (!files.length) return Swal.fire({ icon: "warning", title: "Select at least one image" });
    setLoading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("images", f));
      if (title) fd.append("title", title);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addGalleryImages`,
        fd
      );
      setGallery(res.data.data);
      setFiles([]);
      setPreviews([]);
      setTitle("");
      Swal.fire({ icon: "success", title: `${files.length} photo(s) uploaded!`, timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete this photo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/deleteGalleryImage`,
          { data: { id: item._id } }
        );
        setGallery(res.data.data);
        Swal.fire({ icon: "success", title: "Deleted!", timer: 1200, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: "error", title: err.response?.data?.message || err.message });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-800">Gallery</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Upload photos — they appear on the public Gallery page
        </p>
      </div>

      {/* Upload card */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div
          className="px-6 py-4"
          style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
        >
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            Upload New Photos
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Drop zone */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full rounded-xl border-2 border-dashed border-gray-200 py-10 flex flex-col items-center gap-3 text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faImages} className="text-4xl" />
            <span className="text-sm font-semibold">Click to select photos</span>
            <span className="text-xs">PNG, JPG, WEBP — up to 20 images at once</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {previews.map((src, i) => (
                <div key={i} className="relative group aspect-square overflow-hidden rounded-lg">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePreview(i)}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Optional title */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              Caption / Title <span className="font-normal text-gray-400">(optional — applies to all selected photos)</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stone chips delivery — Chittagong port"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !files.length}
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
          >
            {loading
              ? `Uploading ${files.length} photo(s)…`
              : `Upload ${files.length ? files.length : ""} Photo${files.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>

      {/* Existing photos grid */}
      <div>
        <p className="mb-3 text-sm font-bold text-gray-700">
          Published Photos ({gallery.length})
        </p>

        {gallery.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
            <FontAwesomeIcon icon={faImages} className="text-5xl mb-3 opacity-30" />
            <p className="font-semibold">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {gallery.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title || "Gallery photo"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(item)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                  </button>
                </div>
                {item.title && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-2 pt-6">
                    <p className="text-white text-[10px] font-semibold truncate">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
