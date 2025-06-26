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
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div className="d-flex justify-content-between flex-wrap">
            <div style={{ flex: 1 }}>{item.title}</div>
            <div style={{ flex: 1 }}>{item.price}</div>
          </div>
          <div style={{ maxWidth: "180px" }}>
            <select
              className="form-select text-white"
              name="quantity"
              style={{
                backgroundColor: "#2c2f33",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
              }}
            >
              <option value="">--select count--</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      ))
    ) : (
      <div className="text-white text-center py-3">Wishlist is empty.</div>
    );

  return (
    <div className="container">
      <div className="row justify-content-center text-white">
        <div className="col-md-10 col-lg-8">
          {wishlistDetails}
          <button
            className="btn mt-3"
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
