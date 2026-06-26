import React, { useEffect, useState } from "react";
import { FaFolder, FaUser } from "react-icons/fa6";
import { Description } from "../About/About Descrption/Description";
import { BlogCard } from "./Blog Card/BlogCard";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { DescriptionModal } from "./Blog Description Modal/DescriptionModal";
import { SeoManager } from "../SEO/SeoManager";
// import banner from "../assets/image/Banner Image/Blog Banner.png";
export const Blog = () => {
  const location = useLocation();
  const { blogs, setBlogs } = useOutletContext();
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    if (location.state?.blogID && blogs) {
      const blog = blogs?.filter(
        (item, index) => item._id == location?.state?.blogID
      );
      if (blog.length == 1) {
        setCurrentBlog(blog[0]);
        setTimeout(() => {
          document.getElementById(blog[0]._id).checked = true;
        }, 500);
      }
    }
  }, [location.state, blogs]);
  // useEffect(() => {

  //     window.scroll(0, 0)
  // }, [])

  return (
    <div className="space-y-10">
      {!location.pathname.startsWith("/dashboard") && (
        <SeoManager
          title="SafetyPlus Blog"
          description="Updates, guides, and insights from SafetyPlus on fire safety, industrial protection, compliance, and equipment installation in Bangladesh."
          path="/blog"
          keywords="fire safety blog, industrial safety Bangladesh, fire door guide, hose cabinet installation, SafetyPlus blog"
        />
      )}
      {!location.pathname.startsWith("/dashboard") && (
        <div className=" relative h-[400px] w-[95%] mx-auto rounded-2xl  overflow-hidden  ">
          <div className="h-[400px] w-full bg-[#0A3161] "></div>
          <div className="absolute inset-0 backdrop-blur-xs bg-white/0"></div>
          <div className="absolute top-1/2  left-1/2 -translate-x-1/2 w-full h-full">
            <h1 className="text-5xl  text-center  text-white font-semibold ">
              Blog
            </h1>
          </div>
        </div>
      )}

      {blogs.length == 0 && (
        <div className="min-h-[330px]">
          <p className="font-semibold text-3xl text-center">No Blog Yet..</p>
        </div>
      )}

      <div className="my-20">
        <section className="grid     grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 max-w-[1340px] mx-auto">
          {blogs.length > 0
            ? blogs?.map((post, i) => <BlogCard key={i} post={post}></BlogCard>)
            : ""}
        </section>
      </div>

      {currentBlog && (
        <DescriptionModal
          index={currentBlog._id}
          description={currentBlog.description}
          location={location}
        ></DescriptionModal>
      )}
    </div>
  );
};
