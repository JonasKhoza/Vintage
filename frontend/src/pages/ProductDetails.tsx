import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

//My own files imports
import classes from "./styles/product_details.module.css";
import { useContext, useEffect, useState } from "react";
import { CartProductInterface } from "../models/product.models";
import CartContext from "../context/ManageUserCartContext";
import { UserAuthContext } from "../context/ManageUserAuthContext";
import { toast } from "react-toastify";
import Toastify from "../components/toastify/Toastify";

function formattedDate(d: Date) {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return (
      "Today at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  } else if (date.toDateString() === yesterday.toDateString()) {
    return (
      "Yesterday at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  } else {
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }
}

const initialState: CartProductInterface = {
  _id: "",
  title: "",
  image: "",
  summary: "",
  oldPrice: 0,
  price: 0,
  description: "",
  color: [],
  quantity: 0,
  special: false,
  brand: "",
  reviews: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

function ProductDetails() {
  const [product, setProduct] = useState<CartProductInterface>(initialState);
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);
  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });
  const [addedReview, setAddedReview] = useState(false);
  const { userId, userName } = useContext(UserAuthContext);

  useEffect(() => {
    const fetchProductHandler = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products/${id}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        } else {
          const errorData = await res.json();
          throw errorData;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductHandler();
  }, [id, addedReview]);

  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const descriptionHandler = () => {
    setIsLeftOpen(true);
    setIsRightOpen(false);
  };

  const productInfoHandler = () => {
    setIsLeftOpen(false);
    setIsRightOpen(true);
  };

  let rating;
  if (product.reviews && product.reviews.length > 0) {
    rating =
      product.reviews.reduce((sum, review) => {
        if (review.rating) {
          return sum + review.rating;
        }
        return sum;
      }, 0) / product.reviews.length;
  } else {
    rating = 0;
  }

  const getReviewChangeDataHandler = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProductReviewHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const review = {
      username: userName,
      productId: product._id,
      uid: userId,
      createdAt: Date.now(),
      ...reviewData,
    };
    try {
      const res = await fetch(`http://localhost:8000/products/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAddedReview((prevV) => !prevV);
        toast.success(data.message);
      } else {
        const errorData = await res.json();
        throw errorData;
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }

    setReviewData({
      rating: "",
      comment: "",
    });
  };
  return (
    <div className={classes.product_details_container}>
      <Toastify />
      <header>
        <div className={classes.image_container}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={classes.product_info}>
          <div>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>
            <p>Product ID: {product._id}</p>
            <h2>
              Brand: <span className={classes.brand}>{product.brand}</span>
            </h2>
          </div>

          <div className={classes.table_summary}>
            <table>
              <thead>
                <tr>
                  <th>Price</th>
                  <td>
                    <p>R{product.price}</p>
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    {product.quantity ? (
                      <p>Available</p>
                    ) : (
                      <p className={classes.out_of_stock}>Out of stock</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Reviews</th>
                  <td>
                    <p>
                      <span>
                        <FaStar color={rating >= 1 ? "red" : ""} />
                        <FaStar color={rating >= 2 ? "red" : ""} />
                        <FaStar color={rating >= 3 ? "red" : ""} />
                        <FaStar color={rating >= 4 ? "red" : ""} />
                        <FaStar color={rating >= 5 ? "red" : ""} />
                      </span>
                      {product.reviews && product.reviews?.length}
                      review(s)
                    </p>
                  </td>
                </tr>
              </thead>
            </table>
          </div>

          <div className={classes.to_cart}>
            <button
              className="btn alt-reset btn_alt"
              onClick={() => addProductToCart(product._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </header>

      <div className={classes.product_rev_desc}>
        <div className={classes.product_desc_info}>
          <div className={classes.desc_info_actions}>
            <button
              className={isLeftOpen ? classes.open : ""}
              onClick={descriptionHandler}
            >
              Description
            </button>
            <button
              className={isRightOpen ? classes.open : ""}
              onClick={productInfoHandler}
            >
              Product Information
            </button>
          </div>
          {isLeftOpen ? (
            <p
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {product.description}
            </p>
          ) : isRightOpen ? (
            <table>
              <tbody>
                <tr>
                  <th>Product Brand</th>
                  <td>{product.brand}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
        <div className={classes.reviews}>
          <div className={classes.review}>
            <h1>Reviews</h1>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => {
                return (
                  <div className={classes.review_content} key={review.uid}>
                    <h2>{review.username}</h2>
                    <p>
                      <span>
                        <FaStar
                          color={
                            review.rating && review.rating >= 1 ? "red" : ""
                          }
                        />
                        <FaStar
                          color={
                            review.rating && review.rating >= 2 ? "red" : ""
                          }
                        />
                        <FaStar
                          color={
                            review.rating && review.rating >= 3 ? "red" : ""
                          }
                        />
                        <FaStar
                          color={
                            review.rating && review.rating >= 4 ? "red" : ""
                          }
                        />
                        <FaStar
                          color={
                            review.rating && review.rating >= 5 ? "red" : ""
                          }
                        />
                      </span>
                    </p>
                    <p>Reviewed: {formattedDate(review.createdAt as Date)}</p>
                    <p className={classes.comment}>
                      {review.comment && review.comment}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>There are no reviews for the product yet.</p>
            )}
          </div>

          <div className={classes.write_review}>
            <h1>Write a customer review</h1>
            <form onSubmit={addProductReviewHandler}>
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                onChange={getReviewChangeDataHandler}
                value={reviewData.rating}
              >
                <option value="">--Select--</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <label htmlFor="comment">Comment</label>
              <textarea
                rows={2}
                cols={100}
                id="comment"
                placeholder="Comment"
                name="comment"
                onChange={getReviewChangeDataHandler}
              ></textarea>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
