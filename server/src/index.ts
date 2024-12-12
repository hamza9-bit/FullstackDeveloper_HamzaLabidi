import express, { Request, Response } from "express";
import productsData from "./products.json";
import { Product } from "./types";
import cors from "cors";
import rateLimit from "express-rate-limit";

const products: Product[] = productsData.products;

const app = express();
const port = 3000;


app.use(cors({ origin: '*' }));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Apply the rate limiting middleware to all routes
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/products/:id", (req: Request, res: Response): any => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = products.find((p: Product) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(product);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
