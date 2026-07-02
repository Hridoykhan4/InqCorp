import {
  faArrowRight,
  faChevronDown,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { capitalizeWords } from "../../Functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/hvac";
import {
  getCategoryList,
  isExternalCategory,
  MAIN_NAV_ITEMS,
  openCategoryDestination,
} from "../../config/navigation";

const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

const getCategoryImage = (item) => {
  if (Array.isArray(item?.imageUrl)) {
    return item.imageUrl[0] || fallbackImage;
  }
  return item?.imageUrl || fallbackImage;
};

const NAVY = "#1B3A8A";
const GOLD = "#C49B2B";

export const SideNavbar = ({ categories = [] }) => {
  const [isProductsOpen, setProductsOpen] = useState(true);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.hvac.users);
  const logo = useSelector((state) => state.hvac.logo);
  const dispatch = useDispatch();

  const productItems = useMemo(() => getCategoryList(categories, { limit: 10 }), [categories]);

  const closeDrawer = () => {
    const drawer = document.getElementById("navbar-drawer");
    if (drawer) drawer.checked = false;
  };

  const goTo = (path) => {
    navigate(path);
    closeDrawer();
  };

  const goToCategory = (item) => {
    openCategoryDestination(item, navigate);
    closeDrawer();
  };

  return (
    <div className="drawer drawer-end z-50 lg:hidden">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="navbar-drawer"
          aria-label="Close navigation menu"
          className="drawer-overlay bg-safety-ink/40"
        />

        <aside className="flex h-full w-[88vw] max-w-[420px] flex-col bg-white shadow-2xl">
          {/* Header */}
          <div
            className="border-b px-5 py-5"
            style={{ borderColor: "rgba(27,58,138,0.12)" }}
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="flex min-w-0 items-center gap-3 text-left"
                onClick={() => goTo("/")}
              >
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border bg-white shadow-sm"
                  style={{ borderColor: "rgba(27,58,138,0.15)" }}
                >
                  <img
                    src={logo || "/inqcorpLogo.jpeg"}
                    className="h-10 w-10 object-contain"
                    alt="ITC logo"
                    onError={(e) => { e.currentTarget.src = "/inqcorpLogo.jpeg"; }}
                  />
                </span>
                <span>
                  <span
                    className="block text-base font-extrabold leading-5 tracking-tight"
                    style={{ color: NAVY }}
                  >
                    ITC
                  </span>
                  <span
                    className="block text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    Inqilab Trading Corporation
                  </span>
                </span>
              </button>

              <label
                htmlFor="navbar-drawer"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-safety-border text-safety-muted transition hover:border-safety-red hover:text-safety-red"
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </label>
            </div>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <nav className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-safety-ink transition hover:text-white"
                  style={{}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = NAVY;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                  }}
                >
                  {item.label}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs opacity-50" />
                </button>
              ))}
            </nav>

            {/* Products accordion */}
            <div
              className="mt-4 overflow-hidden rounded-xl border"
              style={{ borderColor: "rgba(27,58,138,0.15)" }}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-4 text-left transition"
                aria-expanded={isProductsOpen}
                style={{ background: isProductsOpen ? "rgba(27,58,138,0.04)" : "white" }}
              >
                <span>
                  <span
                    className="block text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: GOLD }}
                  >
                    Our Products
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-safety-ink">
                    Browse Aggregate Categories
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-sm transition-transform`}
                  style={{
                    color: NAVY,
                    transform: isProductsOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {isProductsOpen && (
                <div
                  className="border-t p-2"
                  style={{ borderColor: "rgba(27,58,138,0.1)" }}
                >
                  {productItems.length > 0 ? (
                    productItems.map((item) => (
                      <button
                        type="button"
                        key={item?._id || item?.name}
                        onClick={() => goToCategory(item)}
                        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-50"
                      >
                        <img
                          src={getCategoryImage(item)}
                          alt={item?.label || item?.name || "ITC product"}
                          className="h-12 w-12 shrink-0 rounded-lg border border-safety-border object-cover"
                          loading="lazy"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-safety-ink">
                            {capitalizeWords(item?.label || item?.name) || "Product Category"}
                          </span>
                          <span className="block text-xs text-safety-muted">
                            {isExternalCategory(item) ? "Open site" : "View products"}
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-xl p-4 text-sm text-safety-muted" style={{ background: "rgba(27,58,138,0.04)" }}>
                      Product categories will appear after they are added.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => goTo("/all-products")}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition"
                    style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
                  >
                    View All Products
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => goTo("/gallery")}
              className="mt-4 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-safety-ink transition"
              style={{ background: "rgba(196,155,43,0.06)", border: `1px solid rgba(196,155,43,0.2)` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,155,43,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(196,155,43,0.06)"; }}
            >
              Gallery
              <FontAwesomeIcon icon={faArrowRight} className="text-xs opacity-50" />
            </button>

            {admin && (
              <button
                type="button"
                onClick={() => goTo("/dashboard")}
                className="mt-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-safety-ink transition"
                style={{ background: "rgba(27,58,138,0.05)", border: `1px solid rgba(27,58,138,0.12)` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(27,58,138,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(27,58,138,0.05)"; }}
              >
                Dashboard
                <FontAwesomeIcon icon={faArrowRight} className="text-xs opacity-50" />
              </button>
            )}
          </div>

          {/* Footer CTA */}
          <div
            className="border-t p-5"
            style={{ borderColor: "rgba(27,58,138,0.1)" }}
          >
            <button
              type="button"
              onClick={() => goTo("/contact")}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
            >
              Request a Quote
            </button>

            {admin && (
              <button
                type="button"
                onClick={() => {
                  dispatch(removeUser());
                  closeDrawer();
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-safety-border px-4 py-3 text-sm font-bold text-safety-muted transition hover:border-red-400 hover:text-red-500"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
