import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "../types";
export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="w-[200px] h-[40px] rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-auto mt-6 max-w-2xl">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="border p-6 shadow-lg rounded-md">
        <CardTitle className="text-3xl font-semibold">
          {product.title}
        </CardTitle>
        <CardContent>
          <p className="text-lg mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${product.price}</span>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
