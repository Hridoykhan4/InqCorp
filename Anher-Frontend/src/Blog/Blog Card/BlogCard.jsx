import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setBlogs } = useOutletContext();

  const handleDelete = () => {
    if (!post) {
      Swal.fire("Changes are not saved", "", "info");
      return;
    }

    Swal.fire({
      title: `Do you want Delete ${post.title}?`,
      showDenyButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteBlog`, {
            data: { id: post._id },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: `${post.title} got deleted`,
              text: "Deletion successful!",
            });
            setBlogs(res.data.data);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops Image Couldnt Select...",
              text: error?.response?.data?.message || error.message,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  // Blogs are PDF documents now. Image optional.
  const imgSrc = post?.imageUrl?.[0] || "";
  const hasImg = Boolean(imgSrc);
  const pdfUrl = post?.pdfUrl || "";
  const category = post?.category || "Fire Safety";
  const title = post?.title || "SafetyPlus Update";
  const body =
    post?.description ||
    "Read SafetyPlus updates, product information, and practical fire safety insights for Bangladesh.";

  return (
    <div className="group relative px-2" 
    // data-aos="fade-up" data-aos-duration="1000"
    >
      {/* Card frame (no border; rounded big) */}
      <article className="relative">
        {/* Image / Gray placeholder */}
        <div className="overflow-hidden rounded-lg bg-safety-surface">
          {hasImg ? (
            <img
              src={imgSrc}
              alt={title}
              className="h-[220px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[220px] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-safety-red/90 to-safety-red-dark text-white">
              <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 3h7l5 5v13a0 0 0 0 1 0 0H7a0 0 0 0 1 0 0V3z" />
                <path d="M14 3v5h5" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">PDF Document</span>
            </div>
          )}
        </div>

        {/* Floating bottom panel (like the mock) */}
        <div className="pointer-events-none relative -top-15 ">
          <div className="pointer-events-auto rounded-lg bg-white px-6 py-5 shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-safety-red">
                  {category}
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-safety-ink">
                  {title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-6 text-slate-500">
                  {body.length > 70 ? `${body.slice(0, 70)}...` : body}
                </p>
              </div>

              {/* Corner CTA (rounded square, arrow) */}
              <button
                onClick={() => {
                  if (pdfUrl) {
                    window.open(pdfUrl, "_blank", "noopener,noreferrer");
                  } else {
                    navigate(`/blog/${post?._id}`, { state: { blogID: post?._id } });
                  }
                }}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-md bg-safety-red text-white transition hover:translate-x-0.5 hover:-translate-y-0.5 hover:bg-safety-red-dark"
                aria-label={pdfUrl ? "View PDF" : "Read more"}
                title={pdfUrl ? "View PDF" : "Read more"}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Dashboard controls (kept as-is) */}
      {location.pathname.startsWith("/dashboard") && (
        <div className="absolute right-2 top-2 space-x-2 opacity-100 transition-all duration-150 ease-in-out md:opacity-0 md:group-hover:opacity-100">
          {!post ? (
            <button className="btn btn-primary btn-dash rounded-sm px-2" disabled>
              Update
            </button>
          ) : null}
          <button className="btn btn-error btn-dash rounded-sm px-2" onClick={handleDelete}>
            Delete?
          </button>
        </div>
      )}
    </div>
  );
};
