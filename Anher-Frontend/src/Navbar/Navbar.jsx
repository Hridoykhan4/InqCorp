import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faChevronDown,
  faPenToSquare,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { capitalizeWords } from "../Functions/functions";
import { useSelector } from "react-redux";
import { SideNavbar } from "./SideNav/SideNavbar";
import {
  getCategoryList,
  isExternalCategory,
  MAIN_NAV_ITEMS,
  openCategoryDestination,
} from "../config/navigation";

const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

const HOVER_OPEN_DELAY = 160;
const HOVER_CLOSE_DELAY = 220;

const getCategoryImage = (item) => {
  if (Array.isArray(item?.imageUrl)) {
    return item.imageUrl[0] || fallbackImage;
  }
  return item?.imageUrl || fallbackImage;
};

export const Navbar = ({ categories = [] }) => {
  const [showProducts, setShowProducts] = useState(false);
  const productsMenuRef = useRef(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const logo = useSelector((state) => state.hvac.logo);
  const admin = useSelector((state) => state.hvac.users);
  const isDashboard = location.pathname.startsWith("/dashboard");

  const productPreview = useMemo(() => getCategoryList(categories), [categories]);

  const clearTimers = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    if (showProducts) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) return;
    openTimer.current = setTimeout(() => {
      setShowProducts(true);
      openTimer.current = null;
    }, HOVER_OPEN_DELAY);
  };

  const scheduleClose = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) return;
    closeTimer.current = setTimeout(() => {
      setShowProducts(false);
      closeTimer.current = null;
    }, HOVER_CLOSE_DELAY);
  };

  const toggleClick = () => {
    clearTimers();
    setShowProducts((v) => !v);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target)
      ) {
        clearTimers();
        setShowProducts(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowProducts(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setShowProducts(false);
    clearTimers();
  }, [location.pathname]);

  useEffect(() => () => clearTimers(), []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const goToCategory = (item) => {
    setShowProducts(false);
    openCategoryDestination(item, navigate);
  };

  return (
    <div className="relative z-50">
      <nav className="fixed inset-x-0 top-0 border-b border-safety-border/70 glass-panel shadow-[0_4px_24px_-12px_rgba(0,0,0,0.12)]">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {admin && isDashboard && (
              <label
                htmlFor="dashboard-drawer"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-safety-border text-safety-ink transition hover:border-safety-red hover:text-safety-red lg:hidden"
                aria-label="Open dashboard menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </label>
            )}

            <button
              type="button"
              className="group relative flex min-w-0 items-center gap-3"
              onClick={() => navigate("/")}
              aria-label="Go to Kawsar Anher home"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md border border-safety-border bg-white shadow-sm">
                <img
                  src={logo || "/inqcorpLogo.jpeg"}
                  alt="Kawsar Anher logo"
                  className="h-9 w-9 object-contain"
                  onError={(e) => { e.currentTarget.src = "/inqcorpLogo.jpeg"; }}
                />
              </span>
              <span className="hidden min-w-0 text-left sm:block">
                <span className="block text-base font-extrabold leading-5 tracking-tight text-safety-ink">
                  Kawsar Anher
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-safety-muted">
                  Inqilab Trading Corporation
                </span>
              </span>

              {admin && (
                <label
                  htmlFor="uploadLogo"
                  className="absolute -right-2 -top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-safety-red text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100"
                  title="Upload logo"
                  onClick={(event) => event.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                </label>
              )}
            </button>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-md px-4 py-2 text-sm font-semibold transition ${
                  isActive(item.path)
                    ? "text-safety-red"
                    : "text-safety-muted hover:text-safety-ink"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-safety-red" />
                )}
              </Link>
            ))}

            <div
              className="relative"
              ref={productsMenuRef}
              onMouseEnter={scheduleOpen}
              onMouseLeave={scheduleClose}
            >
              <div
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${
                  location.pathname.includes("product") ||
                  location.pathname.includes("category") ||
                  showProducts
                    ? "text-safety-red"
                    : "text-safety-muted hover:text-safety-ink"
                }`}
              >
                <Link to="/all-products" onClick={() => setShowProducts(false)}>
                  Products
                </Link>
                <button
                  type="button"
                  onClick={toggleClick}
                  aria-expanded={showProducts}
                  aria-haspopup="true"
                  aria-label="Toggle product categories"
                  className="grid place-items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs transition-transform duration-300 ${showProducts ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {showProducts && (
                <>
                  {/* invisible hover bridge prevents flicker between trigger & panel */}
                  <div className="absolute inset-x-0 -bottom-3 h-3" />
                  <div
                    onMouseEnter={scheduleOpen}
                    onMouseLeave={scheduleClose}
                    className="absolute right-0 top-[calc(100%+10px)] w-[min(820px,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-safety-border bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] animate-rise"
                  >
                    <div className="flex items-center justify-between border-b border-safety-border/70 bg-gradient-to-r from-safety-surface to-white px-6 py-4">
                      <div>
                        <p className="eyebrow flex items-center gap-2">
                          <FontAwesomeIcon icon={faMountain} />
                          Product Categories
                        </p>
                        <p className="mt-1 text-sm text-safety-muted">
                          {productPreview.length > 0
                            ? `${productPreview.length} aggregate product lines`
                            : "Categories populate from the dashboard"}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-brand min-h-10 px-4 py-2 text-xs uppercase tracking-[0.14em]"
                        onClick={() => {
                          setShowProducts(false);
                          navigate("/all-products");
                        }}
                      >
                        View All
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[10px]" />
                      </button>
                    </div>

                    <div className="grid max-h-[440px] grid-cols-3 gap-2 overflow-y-auto no-scrollbar p-4">
                      {productPreview.length > 0 ? (
                        productPreview.map((item) => (
                          <button
                            type="button"
                            key={item?._id || item?.name}
                            className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 text-left transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-safety-red/30 hover:bg-blue-50"
                            onClick={() => goToCategory(item)}
                          >
                            <img
                              loading="lazy"
                              src={getCategoryImage(item)}
                              className="h-12 w-12 shrink-0 rounded-md border border-safety-border bg-white object-cover transition duration-300 group-hover:scale-105"
                              alt={item?.name || "Kawsar Anher product"}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold text-safety-ink group-hover:text-safety-red">
                                {capitalizeWords(item?.label || item?.name) || "Category"}
                              </span>
                              <span className="mt-0.5 block text-[11px] leading-4 text-safety-muted">
                                {isExternalCategory(item) ? "Open site" : "Open category"}
                              </span>
                            </span>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="text-[10px] text-safety-border transition-all group-hover:translate-x-0.5 group-hover:text-safety-red"
                            />
                          </button>
                        ))
                      ) : (
                        <div className="col-span-3 rounded-md bg-safety-surface p-5 text-sm text-safety-muted">
                          Categories will appear here after they are added.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {admin && (
              <Link
                to="/dashboard"
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  isDashboard
                    ? "bg-red-50 text-safety-red"
                    : "text-safety-muted hover:bg-safety-surface hover:text-safety-ink"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="hidden sm:inline-flex btn-brand min-h-10 px-4 py-2"
            >
              Get Quote
            </button>

            <label
              htmlFor="navbar-drawer"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-safety-border text-safety-ink transition hover:border-safety-red hover:text-safety-red lg:hidden"
              aria-label="Open navigation menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </label>
          </div>
        </div>

        <SideNavbar categories={categories} />
      </nav>

      <div className="h-16" />
    </div>
  );
};
