import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

export const DashboardCatalogue = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCatalogues();
  }, []);

  const fetchCatalogues = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getCatalogues`,
      );
      setCatalogues(response.data);
    } catch (error) {
      console.error("Error fetching catalogues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (catalogue) => {
    Swal.fire({
      title: `Do you want to delete ${catalogue.title}?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/deleteCatalogue/${catalogue._id}`,
          );
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Catalogue deleted successfully",
          });
          fetchCatalogues();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || error.message,
          });
        }
      }
    });
  };

  const getSafeFileName = (title) => {
    return `${title || "SafetyPlus Catalogue"}.pdf`
      .replace(/[\\/:*?"<>|]+/g, "")
      .replace(/\s+/g, "-");
  };

  const openCatalogue = (pdfUrl) => {
    if (!pdfUrl) return;
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (event, pdfUrl, title) => {
    event?.stopPropagation?.();
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to download catalogue: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getSafeFileName(title);
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("Error downloading catalogue:", error);
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event, pdfUrl, title) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCatalogue(pdfUrl, title);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-ring text-warning  w-[100px] h-[100px]"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full px-5 py-8">
      <div className="flex justify-center mb-6">
        <label
          htmlFor="add_catalogue_modal"
          className="btn text-base font-semibold hover:bg-cyan-400 bg-cyan-500 rounded-md text-white"
        >
          Add Catalogue <FontAwesomeIcon icon={faPlus} />
        </label>
      </div>

      <section className="flex justify-center items-center max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {catalogues.map((catalogue, index) => (
            <div
              key={index}
              role={catalogue.pdfUrl ? "button" : undefined}
              tabIndex={catalogue.pdfUrl ? 0 : undefined}
              aria-label={catalogue.pdfUrl ? `View catalogue: ${catalogue.title}` : undefined}
              onClick={() => openCatalogue(catalogue.pdfUrl)}
              onKeyDown={(event) => handleKeyDown(event, catalogue.pdfUrl, catalogue.title)}
              className="relative group w-full h-[320px] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white border border-blue-100 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-[240px] overflow-hidden bg-gray-100">
                <img
                  src={catalogue.imageUrl || "/pdf/HVAC-Image.jpg.jpeg"}
                  alt={catalogue.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-lg bg-slate-900/80 px-3 py-2 text-white text-xs font-semibold flex items-center justify-between backdrop-blur-sm">
                  <span className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEye} className="text-amber-300" />
                    Click to view
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="p-4 h-[80px] flex items-center justify-center">
                <p className="text-center font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-[#0062f5] transition-colors">
                  {catalogue.title}
                </p>
              </div>

              {/* Action Buttons - Visible on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex flex-col gap-2 w-[80%] max-w-[180px]">
                  {catalogue.pdfUrl && (
                    <button
                      type="button"
                      onClick={(event) => handleDownload(event, catalogue.pdfUrl, catalogue.title)}
                      className="flex items-center justify-center gap-2 bg-[#0062f5] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      title="Download PDF"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      Download
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(catalogue);
                    }}
                    className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Catalogue Modal */}
      <input
        type="checkbox"
        id="add_catalogue_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Catalogue</h3>
          <AddCatalogueForm onSuccess={fetchCatalogues} />
          <div className="modal-action">
            <label htmlFor="add_catalogue_modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddCatalogueForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (pdfFile) data.append("pdf", pdfFile);
    if (imageFile) data.append("image", imageFile);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addCatalogue`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Catalogue added successfully",
      });
      onSuccess();
      setFormData({ title: "", description: "" });
      setPdfFile(null);
      setImageFile(null);
      document.getElementById("add_catalogue_modal").checked = false;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Catalogue Title"
        className="input input-bordered w-full"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      {/* <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            /> */}
      <h1>Catalogue File</h1>
      <input
        type="file"
        accept="application/pdf"
        className="file-input file-input-bordered w-full"
        onChange={(e) => setPdfFile(e.target.files[0])}
        required
      />
      <h1>Catalogue Cover Image</h1>
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Catalogue"}
      </button>
    </form>
  );
};
