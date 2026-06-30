import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { socket } from "../Socket/socket";
import axios from "axios";
import { addLogo } from "../Redux/hvac";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ScrollTop } from "../Custom Hooks/ScrollTop";
import Footer from "../Footer/Footer";
import { useMemo } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Swal from "sweetalert2";
import { SeoManager } from "../SEO/SeoManager";
import {
  organizationStructuredData,
  SEO_CONFIG,
  websiteStructuredData,
} from "../SEO/seo";
import { COMPANY } from "../SEO/companyInfo";
import { UpdateLogoModal } from "../Dashboard/Logo/UpdateLogoModal";
import { Preloader } from "../Preloader/Preloader";

export const Root = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [queries, setQueries] = useState([]);
  const [banners, setBanners] = useState([]);
  const [dashboardBanners, setDashboardBanners] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [businessProducts, setBusinessProducts] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [country, setCountry] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.hvac.users);
  useEffect(() => {
    AOS.init();
  }, []);
  const data = useMemo(
    () => ({
      products,
      categories,
      setCategories,
      setProducts,
      queries,
      setQueries,
      banners,
      setBanners,
      blogs,
      setBlogs,
      services,
      setServices,
      businessProducts,
      setBusinessProducts,
      certificate,
      setCertificate,
      country,
      setCountry,
      dashboardBanners,
      setDashboardBanners,
      priceList,
      setPriceList,
    }),
    [
      products,
      categories,
      queries,
      banners,
      blogs,
      services,
      businessProducts,
      certificate,
      country,
      dashboardBanners,
      priceList,
    ]
  );

  useEffect(() => {
    if (admin && !socket.connected) {
      socket.emit("join");
    }
    socket.on("queries", (data) => {
      setQueries((prev) => [data.data, ...prev]);

      toast.info("New Queries!!", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });

    socket.on("bannerUpdated", (updated) => {
      if (Array.isArray(updated)) setBanners(updated);
    });

    return () => {
      socket.off("queries");
      socket.off("bannerUpdated");
    };
  }, [admin]);

  useEffect(() => {
    socket.connect();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getLogo`)
      .then((res) => {
        if (res.status == 200) {
          dispatch(addLogo(res.data.data));
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getBanners`)
      .then((res) => {
        if (res.status == 200) {
          setBanners(res.data.data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboardBanners`)
      .then((res) => {
        if (res.status == 200) {
          setDashboardBanners(res.data.data);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getBlogs`)
      .then((res) => {
        if (res.status == 200) {
          setBlogs(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getServices`)
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getQueries`)
      .then((res) => setQueries(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message || err.message,
        });
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getBusinessProducts`)
      .then((res) => setBusinessProducts(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message || err.message,
        });
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getCertificate`)
      .then((res) => setCertificate(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message || err.message,
        });
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getCountry`)
      .then((res) => setCountry(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message || err.message,
        });
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getPriceList`)
      .then((res) => setPriceList(res.data.data || []))
      .catch((err) => console.log(err));
  }, []);
  // eslint-disable-next-line no-unused-vars
  const handleToast = () => {
    toast.info("New Queries😱😱😱!!", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div>
      <Preloader />
      <SeoManager
        structuredData={[organizationStructuredData, websiteStructuredData]}
        path="/"
      />
      {admin && <UpdateLogoModal />}
      <Navbar categories={categories} country={country}></Navbar>
      <ScrollTop></ScrollTop>

      {/* Native scroll — one scrollbar, no jank during reveal animations.
          (Replaced smooth-scrollbar, which double-scrolled because the Footer
          lived outside its 100vh container.) */}
      <Outlet context={data}></Outlet>

      <Footer categories={categories}></Footer>
      <FloatingWhatsApp
        phoneNumber={COMPANY.phoneTel}
        accountName={SEO_CONFIG.siteName}
        avatar="/inqcorpLogo.jpeg"
        statusMessage="Typically replies within 30 Minutes"
        placeholder="Type your message here..."
        messageDelay={1}
        allowClickAway={true}
        allowEsc={true}
        notification={true}
        notificationDelay={10}
        notificationSound={true}
        chatMessage="Hello! How can we help you? Ask us about our sand, stone chips, or boulder pricing."
        buttonStyle={{
          backgroundColor: "#25D366",
          color: "white",
        }}
        chatboxStyle={{
          backgroundColor: "#F0F0F0",
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="!rounded-lg !shadow-lg !border !border-safety-border !text-safety-ink !font-medium"
        progressClassName="!bg-safety-red"
      />
    </div>
  );
};
