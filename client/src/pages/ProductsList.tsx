import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ProductsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <Alert variant="destructive" className="mx-auto mt-6 max-w-2xl">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }


  const filteredProducts = data?.filter((product: { title: string; description: string }) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Search input */}
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-6"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-4">
        {filteredProducts?.map(
          (product: { id: number; title: string; description: string }) => (
            <Card
              key={product.id}
              className="border p-4 shadow-md rounded-md hover:shadow-lg transition"
            >
              <CardTitle>
                <button
                  className="text-xl font-semibold"
                  onClick={() => handleNavigate(product.id)}
                >
                  {product.title}
                </button>
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {product.description}
              </CardDescription>
              <CardContent>
                <Button
                  className="mt-4"
                  onClick={() => handleNavigate(product.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
};
