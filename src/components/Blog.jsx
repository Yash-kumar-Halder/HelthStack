import React from 'react';
import './Blog.css';

const Blog = () => {
    return (
        <section className="blog">
            <div className="blog-header">
                <h2>Stay Updated with Health Tips</h2>
                <p>
                    Discover expert tips, latest medical updates, and simple ways to stay healthy
                    every day.
                </p>
            </div>

            <div className="blog-container">
                <div className="blog-card">
                    {/* <img src="/images/blog1.jpg" alt="blog" /> */}
                    <h3>5 Tips for a Healthy Heart</h3>
                    <p>Learn simple daily habits to keep your heart strong and healthy.</p>
                    <button>Read More</button>
                </div>

                <div className="blog-card">
                    {/* <img src="/images/blog2.jpg" alt="blog" /> */}
                    <h3>How to Boost Your Immunity</h3>
                    <p>Improve your immune system with natural food and lifestyle changes.</p>
                    <button>Read More</button>
                </div>

                <div className="blog-card">
                    {/* <img src="/images/blog3.jpg" alt="blog" /> */}
                    <h3>Dental Care at Home</h3>
                    <p>Easy dental care tips to maintain healthy teeth and gums.</p>
                    <button>Read More</button>
                </div>
            </div>
        </section>
    );
};

export default Blog;
