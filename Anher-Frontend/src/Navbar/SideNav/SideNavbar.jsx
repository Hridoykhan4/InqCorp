import {
  faArrowRight,
  faChevronDown,
  faLayerGroup,
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

export const SideNavbar = ({ categories = [] }) => {
  const [isProductsOpen, setProductsOpen] = useState(true);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.hvac.users);
  const logo = useSelector((state) => state.hvac.logo);
  const dispatch = useDispatch();

  const productItems = useMemo(() => getCategoryList(categories, { limit: 10 }), [categories]);

  const closeDrawer = () => {
    const drawer = document.getElementById("navbar-drawer");
    if (drawer) {
      drawer.checked = false;
    }
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
          <div className="border-b border-safety-border px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="flex min-w-0 items-center gap-3 text-left"
                onClick={() => goTo("/")}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md border border-safety-border bg-white shadow-sm">
                  {logo ? (
                    <img src={logo} className="h-9 w-9 object-contain" alt="SafetyPlus logo" />
                  ) : (
                    <FontAwesomeIcon icon={faLayerGroup} className="text-safety-red" />
                  )}
                </span>
                <span>
                  <span className="block text-base font-extrabold leading-5 text-safety-ink">
                    SafetyPlus
                  </span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-safety-muted">
                    Fire Safety
                  </span>
                </span>
              </button>

              <label
                htmlFor="navbar-drawer"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-md border border-safety-border text-safety-muted transition hover:border-safety-red hover:text-safety-red"
                aria-label="Close navigation menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </label>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <nav className="space-y-2">
              {MAIN_NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-base font-bold text-safety-ink transition hover:bg-red-50 hover:text-safety-red"
                >
                  {item.label}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs text-safety-muted" />
                </button>
              ))}
            </nav>

            <div className="mt-5 rounded-lg border border-safety-border">
              <button
                type="button"
                onClick={() => setProductsOpen((value) => !value)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
                aria-expanded={isProductsOpen}
              >
                <span>
                  <span className="eyebrow">Products</span>
                  <span className="mt-1 block text-sm font-bold text-safety-ink">
                    Browse Safety Categories
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-sm text-safety-red transition-transform ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && (
                <div className="border-t border-safety-border p-2">
                  {productItems.length > 0 ? (
                    productItems.map((item) => (
                      <button
                        type="button"
                        key={item?._id || item?.name}
                        onClick={() => goToCategory(item)}
                        className="flex w-full items-center gap-3 rounded-md p-3 text-left transition hover:bg-red-50"
                      >
                        <img
                          src={getCategoryImage(item)}
                          alt={item?.label || item?.name || "SafetyPlus product category"}
                          className="h-12 w-12 shrink-0 rounded-md border border-safety-border object-cover"
                          loading="lazy"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-safety-ink">
                            {capitalizeWords(item?.label || item?.name) || "Product Category"}
                          </span>
                          <span className="block text-xs text-safety-muted">
                            {isExternalCategory(item) ? "Open site" : "Open category"}
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-md bg-safety-surface p-4 text-sm text-safety-muted">
                      Product categories will appear after they are added.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => goTo("/all-products")}
                    className="mt-2 flex w-full items-center justify-center rounded-md bg-safety-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-safety-red"
                  >
                    View All Products
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
                  </button>
                </div>
              )}
            </div>

            {admin && (
              <button
                type="button"
                onClick={() => goTo("/dashboard")}
                className="mt-5 flex w-full items-center justify-between rounded-md bg-safety-surface px-4 py-3 text-left text-base font-bold text-safety-ink transition hover:bg-red-50 hover:text-safety-red"
              >
                Dashboard
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            )}
          </div>

          <div className="border-t border-safety-border p-5">
            <button
              type="button"
              onClick={() => goTo("/contact")}
              className="btn-brand w-full"
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
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-safety-border px-4 py-3 text-sm font-bold text-safety-muted transition hover:border-safety-red hover:text-safety-red"
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
