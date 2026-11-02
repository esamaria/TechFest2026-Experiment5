import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const announcements = [
      "TechFest 2026 registration is now open!",
      "Coding Contest registrations are now open. Register before September 10.",
      "Web Development Workshop will be conducted on September 12.",
    ];

    setTimeout(() => {
      setPosts(announcements);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">
            MAR BASELIOS COLLEGE OF ENGINEERING & TECHNOLOGY
          </p>

          <h1>
            TECHFEST <span>2026</span>
          </h1>

          <p className="hero-description">
            Innovate. Create. Compete.
          </p>

          <p className="hero-info">
            📅 September 12–14, 2026 &nbsp; | &nbsp; 📍 MBCET Campus
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events →
            </Link>

            <Link to="/register" className="secondary-btn">
              Register Now
            </Link>
          </div>
        </div>
      </section>


      {/* FEATURES */}
      <section className="features">
        <h2>Experience TechFest</h2>

        <p className="section-description">
          Three exciting days packed with technology, creativity and competition.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Hackathons</h3>
            <p>
              Build innovative solutions and solve real-world problems.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Workshops</h3>
            <p>
              Learn new technologies from experts and industry professionals.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Competitions</h3>
            <p>
              Compete, showcase your skills and win exciting prizes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Cultural Events</h3>
            <p>
              Enjoy music, performances and unforgettable moments.
            </p>
          </div>

        </div>
      </section>


      {/* ANNOUNCEMENTS */}
      <section className="announcements">
        <h2>📢 Latest Announcements</h2>

        {loading ? (
          <p>Loading announcements...</p>
        ) : (
          <div className="announcement-list">
            {posts.map((post, index) => (
              <div className="announcement" key={index}>
                <span>📌</span>
                <p>{post}</p>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Ready to be part of TechFest?</h2>

        <p>
          Join hundreds of students and showcase your talent.
        </p>

        <Link to="/register" className="primary-btn">
          Register for TechFest 🚀
        </Link>
      </section>

    </div>
  );
}

export default Home;