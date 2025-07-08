import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CheckoutDrawer from "./CheckoutDrawer"; // adjust path
import AxiosInstance from "../../AxiosInstance";

const Wishlist = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [InputErrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  // default value as "1"

  const handleQuantityChange = (e, title) => {
    const value = e.target.value;
    setQuantities((prev) => ({
      ...prev,
      [title]: value,
    }));
  };
  const getTotalPrice = () => {
    return wishlist.reduce((total, item) => {
      const quantity = parseInt(quantities[item.title] || "1", 10);
      const price = parseInt(item.price || 0, 10);
      return total + quantity * price;
    }, 0);
  };

  const [checkoutInput, setCheckout] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCheckout((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInputErrorList((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const deleteWishlist = (e, title) => {
    let wishlistItem = JSON.parse(localStorage.getItem("wishList")) || [];
    const updateWishlist = wishlistItem.filter((item) => item.title !== title);
    localStorage.setItem("wishList", JSON.stringify(updateWishlist));
    setWishlist(updateWishlist);

    alert(title);
  };

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

  const checkoutSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: checkoutInput.name,
      email: checkoutInput.email,
      phone: checkoutInput.phone,
      address: checkoutInput.address,
      state: checkoutInput.state,
      total: getTotalPrice(),
      items: wishlist.map((item, id) => ({
        reserve_id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    AxiosInstance.post(
      `https://ticket-api-production-df9a.up.railway.app/api/checkout`,
      data
    )
      .then((response) => {
        if (response.status === 200) {
          window.location.href = `https://checkout.paystack.com/${response.data.access_code}`;
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
      });
  };

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
              ${item.price} for a seat
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
                className="ms-auto"
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
                className="form-select text-white"
                name="quantity"
                value={quantities[item.title] || "1"} // default to "1"
                onChange={(e) => handleQuantityChange(e, item.title)}
                style={{
                  backgroundColor: "#2c2f33",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                }}
              >
                <option value="" disabled>
                  --count--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="remove-cart"
                onClick={(e) => deleteWishlist(e, item.title)}
              >
                remove
              </button>

              <style>{`
  .remove-cart {
    font-weight: 600; /* Default weight */
    border: none;
    background: none;
    color: #dc3545; /* Bootstrap danger color */
    cursor: pointer;
  }

  @media (max-width: 576px) {
    .remove-cart {
      font-weight: 400 !important; /* Lighter on small screens */
      font-size: 0.85rem;
    }
  }
`}</style>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-white text-center py-3">Wishlist is empty.</div>
    );

  return (
    <>
      <div className="container mb-4">
        <div className="row justify-content-center text-white">
          <div className="col-12 mb-2">
            {wishlistDetails}
            <div className="col-md-12 text-end fw-bold fs-5">
              Total: ₦{getTotalPrice().toLocaleString()}
            </div>
            {wishlist.length >= 1 && (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn mt-3 w-100 w-md-auto"
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
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>

      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      >
        <div>
          <h5>checkout</h5>
          <form className="w-100 px-2" onSubmit={checkoutSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                value={checkoutInput.name}
                className="form-control bg-dark text-white border-secondary"
                placeholder="Your name"
                style={{ padding: "12px", fontSize: "1rem" }}
              />
              <span className="text-danger">{InputErrorList.name}</span>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleInput}
                value={checkoutInput.phone}
                className="form-control bg-dark text-white border-secondary"
                placeholder="Your phone number"
                style={{ padding: "12px", fontSize: "1rem" }}
              />
              <span className="text-danger">{InputErrorList.phone}</span>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleInput}
                value={checkoutInput.email}
                className="form-control bg-dark text-white border-secondary"
                placeholder="Your phone number"
                style={{ padding: "12px", fontSize: "1rem" }}
              />
              <span className="text-danger">{InputErrorList.email}</span>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                onChange={handleInput}
                value={checkoutInput.address}
                className="form-control bg-dark text-white border-secondary"
                placeholder="Your phone number"
                style={{ padding: "12px", fontSize: "1rem" }}
              />
              <span className="text-danger">{InputErrorList.address}</span>
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                onChange={handleInput}
                value={checkoutInput.state}
                className="form-control bg-dark text-white border-secondary"
                placeholder="Your phone number"
                style={{ padding: "12px", fontSize: "1rem" }}
              />
              <span className="text-danger">{InputErrorList.state}</span>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 text-white fw-semibold py-2"
              style={{ fontSize: "1rem" }}
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </CheckoutDrawer>
    </>
  );
};

export default Wishlist;
