import React from "react";
import { useState, useEffect } from "react";
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
        setLoading(false); // token is valid
        const localWishlist = localStorage.getItem("wishList");
        if (localWishlist) {
          try {
            setWishlist(JSON.parse(localWishlist));
          } catch (err) {
            //  console.error("Error parsing local cart:", err);
          }
        }
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

  var wishlistDetails = [];
  if (wishlist.length > 0) {
    // alert("yes");
    wishlistDetails = wishlist.map((item, id) => {
      return (
        <tr>
          <td className="text-white">{item.title}</td>
          <td className="text-white">{item.price}</td>
          <td>
            {" "}
            <select className="form-select" name="quantity">
              <option>--select count--</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center text-white" style={{}}>
          <div className="col-md-6 text-white">
            <table className="table  table-striped">
              <tbody>{wishlistDetails}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
