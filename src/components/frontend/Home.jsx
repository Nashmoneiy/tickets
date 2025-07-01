import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img3 from "../images/img3.jpg";
import img2 from "../images/img2.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.jpg";
import img7 from "../images/img7.jpg";
import img8 from "../images/img8.jpg";
import AxiosInstance from "../../AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const movies = [
    {
      img: img3,
      price: "200",
      title: "Movie One",
      date: "10th Aug 2025",
      time: "12:00pm",
      genres: ["Drama"],
    },
    {
      img: img2,
      price: "250",
      title: "Movie Two",
      date: "13th Aug 2025",
      time: "2:00pm",
      genres: ["Horror", "Action"],
    },
    {
      img: img4,
      price: "180",
      title: "Movie Four",
      date: "20th Aug 2025",
      time: "1:30pm",
      genres: ["Drama", "Action"],
    },
    {
      img: img5,
      price: "180",
      title: "Movie Five",
      date: "20th Aug 2025",
      time: "1:30pm",
      genres: ["Drama", "Action"],
    },
  ];
  const moreMovies = [
    {
      img: img6,
      price: "300",
      title: "Movie Six",
      date: "25th Aug 2025",
      time: "3:00pm",
      genres: ["Action"],
    },
    {
      img: img8,
      price: "230",
      title: "Movie Eight",
      date: "28th Aug 2025",
      time: "5:00pm",
      genres: ["Action"],
    },
  ];

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [filteredMoreMovies, setFilteredMoreMovies] = useState(moreMovies);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((genre) => genre !== value)
    );
  };

  const handleFilter = () => {
    setShowMore(false);
    if (selectedGenres.length === 0) {
      setFilteredMovies(movies);
      setFilteredMoreMovies(moreMovies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre))
      );
      const filteredTitles = new Set(filtered.map((m) => m.title));
      const filteredMore = moreMovies.filter(
        (movie) =>
          movie.genres.some((genre) => selectedGenres.includes(genre)) &&
          !filteredTitles.has(movie.title)
      );
      setFilteredMovies(filtered);
      setFilteredMoreMovies(filteredMore);
    }
  };

  const addToWishlist = (e, movie) => {
    e.preventDefault();
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    if (wishList.find((item) => item.title === movie.title)) {
      toast.error("Already in wishlist!");
    } else {
      wishList.push(movie);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      toast.success("Added to wishlist!");
    }
  };

  const handleViewList = () => navigate("/wishlist");

  useEffect(() => {
    const reference = new URLSearchParams(location.search).get("reference");
    if (reference) {
      AxiosInstance.get(`/api/verify-transaction/${reference}`)
        .then((response) => {
          if (response.data.status === "success") {
            localStorage.removeItem("wishList");
            window.history.replaceState({}, document.title, "/home");
            toast.success(
              "Payment was successful, you will receive an email soon."
            );
          } else {
            toast.error("Something went wrong with the payment.");
          }
        })
        .catch(() => toast.error("Error verifying payment."));
    }

    const token = localStorage.getItem("auth_token");
    const expiry = localStorage.getItem("auth_token_expiry");
    const now = Date.now();

    setTimeout(() => {
      if (token && expiry && now < parseInt(expiry)) {
        setUsername(localStorage.getItem("name") || "");
        setLoading(false);
      } else {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      }
    }, 1000);
  }, [location.search, navigate]);

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

  const renderMoviesRow = (moviesArray) => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "nowrap",
        overflowX: "auto",
        padding: "1rem",
      }}
      className="hide-scrollbar"
    >
      {moviesArray.map((movie) => (
        <div
          key={movie.title}
          style={{
            position: "relative",
            width: "clamp(240px, 30vw, 500px)",
            height: "280px",
            borderRadius: "12px",
            overflow: "hidden",
            flex: "0 0 auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={movie.img}
            alt={movie.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            ${movie.price}
          </div>
          <button
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "0.8rem",
              cursor: "pointer",
              border: "none",
            }}
            onClick={(e) => addToWishlist(e, movie)}
          >
            Add to wishlist
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Header */}
      <div
        className="container"
        style={{ marginTop: "-50px", marginBottom: "60px" }}
      >
        <p className="text-white">👋 Hello {username}</p>
      </div>

      {/* Filter */}
      <div
        className="container mt-2 p-3 rounded"
        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      >
        <form>
          {["Action", "Drama", "Horror"].map((genre) => (
            <label key={genre} style={{ marginRight: "12px", color: "#fff" }}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
              />{" "}
              {genre}
            </label>
          ))}
          <button
            type="button"
            className="btn btn-info btn-sm ms-2"
            onClick={handleFilter}
          >
            Filter
          </button>
        </form>
      </div>

      {/* Movies */}
      <section className="mt-4">{renderMoviesRow(filteredMovies)}</section>
      {showMore && (
        <section className="mt-4">
          {renderMoviesRow(filteredMoreMovies)}
        </section>
      )}

      {/* Show More */}
      <div className="text-center mt-3">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="btn btn-outline-light"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* View Wishlist */}
      <div className="text-center mt-4 mb-5">
        <button
          onClick={handleViewList}
          className="btn btn-success"
          style={{
            background: "linear-gradient(90deg, #28a745, #6c757d)",
            padding: "0.6rem 1.5rem",
            fontWeight: "bold",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "250px",
          }}
        >
          View Wishlist
        </button>
      </div>
    </div>
  );
};

export default Home;
