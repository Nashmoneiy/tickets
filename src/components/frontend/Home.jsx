import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import img3 from "../images/img3.jpg";
import img2 from "../images/img2.jpg";
import img4 from "../images/img4.jpg";
import AxiosInstance from "../../AxiosInstance";

const Home = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishList, setWishlist] = useState([]);
  const navigate = useNavigate();
  const movies = [
    {
      img: img3,
      price: "$200",
      title: "Movie One",
    },
    {
      img: img2,
      price: "$250",
      title: "Movie Two",
    },
    {
      img: img4,
      price: "$180",
      title: "Movie Three",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const expiry = localStorage.getItem("auth_token_expiry");
    const now = new Date().getTime();

    setTimeout(() => {
      if (token && expiry && now < parseInt(expiry)) {
        const username = localStorage.getItem("name");
        setUsername(username);
        setLoading(false); // token is valid
      } else {
        // token expired or not present
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        localStorage.removeItem("auth_token_expiry");
        localStorage.removeItem("name");
        navigate("/login");
        window.location.reload();
      }
    }, 2000); // Optional delay for loading effect
  }, [navigate]);
  if (loading) {
    return (
      <div className="loader-container">
        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  const addToWishlist = (e, movie) => {
    e.preventDefault();
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    const newId =
      wishList.length > 0
        ? Math.max(...wishList.map((item) => item.id)) + 1
        : 1;

    const exists = wishList.find((item) => item.title === movie.title);
    if (exists) {
      alert("no");
    } else {
      const wishLists = [...wishList, movie];
      //wishList.push(wishlistItem);
      localStorage.setItem("wishList", JSON.stringify(wishLists));

      alert("ok");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ marginTop: "-75px" }}>
            <div className="glass-box mb-3">
              <p className="m-0 text-white">Hello {username}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section justify-content-center">
        <div className="row">
          <div className="col-md-12 text-center justify-content-center">
            <p
              style={{
                fontSize: "1rem", // reduced font size
                width: "85%", // increased width
                maxWidth: "800px",
                color: "grey",
                fontFamily: "'Orbitron', sans-serif",
                textAlign: "right",
                lineHeight: "1.6",
                marginLeft: "auto",
                marginRight: "0",
                paddingRight: "20px",
                textShadow: "0 0 6px rgba(255, 255, 255, 0.2)",
                letterSpacing: "0.4px",
              }}
            >
              Discover and book a ticket for your <br /> next favorite movie.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingRight: "20px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "28px",
              marginBottom: "30px",
              background: "linear-gradient(90deg, #d4af37, #6c757d)", // gold to grey
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 6px rgba(0, 0, 0, 0.1)", // optional soft shadow
            }}
          >
            Coming soon
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "nowrap",
              paddingLeft: "clamp(16px, 6vw, 0px)",
              overflowX: "auto",
              whiteSpace: "nowrap",

              // ✅ Hide scrollbar
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            className="hide-scrollbar" // 👈 we'll define this class below for WebKit
          >
            {movies.map((movie) => (
              <div
                key={movie.title}
                id={movie.id}
                style={{
                  position: "relative",
                  width: "clamp(260px, 30vw, 600px)",
                  height: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  flex: "0 0 auto",
                }}
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Price Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backdropFilter: "blur(4px)",
                    textShadow: "0 0 6px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {movie.price}
                </div>

                {/* Wishlist Button */}
                <button
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: "0.9rem",
                    backdropFilter: "blur(4px)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.25)";
                    e.target.style.transform = "scale(1)";
                  }}
                  onClick={(e) => addToWishlist(e, movie)}
                >
                  Add to wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-4 d-flex justify-content-center">
              <button
                className="mb-3"
                style={{
                  background: "linear-gradient(90deg, #28a745, #6c757d)", // green to grey
                  padding: "0.6rem 1.5rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  width: "100%", // Optional: full width in its column
                  maxWidth: "250px", // 👈 Optional: control max width
                }}
              >
                View Lists
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
