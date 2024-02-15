import { Request, Response } from "express";
import Product from "../models/product.model";

const fetchAllProductsHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.currentPage) || 1;
  const pageSize = 8;

  // Calculate the skip value based on the current page and page size
  const skip = (page - 1) * pageSize;

  try {
    // Query the database to fetch the products for the current page

    const products = await Product.find()
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(pageSize);

    // Count the total number of products
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts: totalProducts,
      message: "yes",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "An error occured while fetching products.",
    });
  }
};

const fetchProductHandler = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const productQuery = Product.findById(productId);
    const product = await productQuery.exec();

    if (product !== null) {
      return res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product was not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Unfortunately something went wrong whilst fetching the product!",
    });
  }
};

const addReviewToProduct = async (req: Request, res: Response) => {
  const { productId, uid, createdAt, rating, comment, username } = req.body;
  const userId = req.query;
  console.log(req.body);

  if (
    productId.trim() === "" ||
    String(createdAt).trim() === "" ||
    rating.trim() === "" ||
    comment.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "Please insert all the relevant data" });
  }

  if (uid.trim() === "" || username.trim() === "") {
    return res
      .status(401)
      .json({ message: "Please login to create a review." });
  }

  const review = {
    username,
    rating,
    comment,
    uid,
    createdAt,
  };

  try {
    //Checking to see if product exist
    const productQuery = Product.findById(productId);
    const product = await productQuery.exec();

    if (product !== null) {
      //Checking if user has an existing review
      const reviewedProductQuery = Product.findOne({ "reviews.uid": uid });
      const reviewedProduct = await reviewedProductQuery.exec();

      if (reviewedProduct !== null) {
        return res
          .status(400)
          .json({ message: "You have already reviewed the product!" });
      }
      //Adding a review
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { $push: { reviews: review } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Review added successfully!", updatedProduct });
    } else {
      return res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong whilst trying to save review" });
  }
};

const searchProductsHandler = async (req: Request, res: Response) => {
  const { query: searchString, page } = req.query;
  const currentPage = Number(page) || 1;

  const pageSize = 8;
  const skip = (currentPage - 1) * pageSize;

  try {
    const searchedProducts = await Product.find(
      {
        $text: { $search: `"${searchString}"` as string },
      },
      { score: { $meta: "textScore" } }
    )
      .collation({ locale: "en", strength: 2 })
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const searchedProductsCount = await Product.countDocuments({
      $text: { $search: `"${searchString}"` as string },
    });

    return res.status(200).json({
      products: searchedProducts,
      totalProducts: searchedProductsCount,
      totalPages: Math.ceil(searchedProductsCount / pageSize),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong whilst trying to search for the products!",
    });
  }
};

const fetchOnSpeacialProductsHandler = async (req: Request, res: Response) => {
  const { page } = req.query;
  const currentPage = Number(page) || 1;
  const pageSize = 8;
  const skip = (currentPage - 1) * pageSize;

  try {
    const products = await Product.find({ special: true })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments({ special: true });
    const totalPages = Math.ceil(totalProducts / pageSize);

    return res.status(200).json({ products, totalProducts, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong whilst trying to fetch products.",
    });
  }
};

export {
  fetchProductHandler,
  addReviewToProduct,
  fetchAllProductsHandler,
  searchProductsHandler,
  fetchOnSpeacialProductsHandler,
};
