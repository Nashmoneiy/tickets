import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const expiry = localStorage.getItem("auth_token_expiry");
    const now = new Date().getTime();

    setTimeout(() => {
      if (token && expiry && now < parseInt(expiry)) {
        setLoading(false);
        const localWishlist = localStorage.getItem("wishList");
        if (localWishlist) {
          try {
            setWishlist(JSON.parse(localWishlist));
          } catch (err) {}
        }
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        localStorage.removeItem("auth_token_expiry");
        localStorage.removeItem("name");
        navigate("/login");
        window.location.reload();
      }
    }, 2000);
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

  const wishlistDetails =
    wishlist.length > 0 ? (
      wishlist.map((item, id) => (
        <div
          key={id}
          className="wishlist-row p-3 mb-3 text-white"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(2px)",
            borderRadius: "10px",
          }}
        >
          <div className="row align-items-center gy-2">
            <div
              className="col-12 col-sm-6 col-md-3"
              style={{
                background: "linear-gradient(90deg, #ffffff, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {item.title}
            </div>
            <div
              className="col-12 col-sm-6 col-md-3"
              style={{
                background: "linear-gradient(90deg, #ffffff, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {item.price} for a seat
            </div>
            <div className="col-12 col-md-5 d-flex flex-column flex-md-row justify-content-end justify-content-md-start text-end text-md-start gap-md-3">
              <div
                className=""
                style={{
                  background: "linear-gradient(90deg, #ffffff, #FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.time}
              </div>
              <div
                style={{
                  background: "linear-gradient(90deg, #ffffff, #FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.date}
              </div>
            </div>
            <div className="w-50 w-md-100">
              <p
                className="mt-3"
                style={{
                  background:
                    "linear-gradient(90deg, #ffffff,rgb(162, 159, 137))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                selct no of people
              </p>
              <select
                className="form-select text-white "
                name="quantity"
                style={{
                  backgroundColor: "#2c2f33",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                }}
              >
                <option selected value="1">
                  --count--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-white text-center py-3">Wishlist is empty.</div>
    );

  return (
    <div className="container">
      <div className="row justify-content-center text-white">
        <div className="col-12">
          {wishlistDetails}
          <button
            className="btn mt-3 w-100 w-md-auto mb-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, #006400, #FFD700, #800080)",
              color: "#fff",
              border: "none",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
