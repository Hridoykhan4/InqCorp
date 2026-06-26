import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { BlogCard } from "../Blog/Blog Card/BlogCard";

const BlogSlider = () => {
  const { blogs: outletBlogs = [] } = useOutletContext();
  const blogs = outletBlogs || [];

  return (
    <section className="section-page bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Safety Resources</p>
            <h2 className="heading-lg mt-3">Updates, datasheets, and safety knowledge.</h2>
            <p className="body-lead mt-4">
              As SafetyPlus grows, this area can support search traffic with
              fire safety guides, product explainers, and Bangladesh-focused
              technical content.
            </p>
          </div>
          <Link to="/blog" className="btn-brand-outline self-start md:self-auto">
            View Articles
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
          </Link>
        </div>

        {blogs.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((post, index) => (
              <BlogCard post={post} key={post._id || index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-safety-border bg-safety-surface p-8 text-center">
            <FontAwesomeIcon icon={faNewspaper} className="text-3xl text-safety-red" />
            <h3 className="mt-4 text-xl font-extrabold text-safety-ink">
              Safety articles will appear here soon.
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-safety-muted">
              Add blog posts from the dashboard for fire safety SEO, product
              education, and buyer trust.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSlider;
