"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "./button";
import { TrashIcon } from "@radix-ui/react-icons";
export function RecentSales({ userId }: { userId: string }) {
  const [categories, setCategories] = React.useState([]);
  const deleteCategory = async (category: string) => {
    // find the category in the array and remove it
    const newCategories = categories.filter((c: string) => c !== category);
    setCategories(newCategories);
    // send the new array to the server to update the database
    try {
      const res = await fetch(`/api/viewEditCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extension_user_id: userId,
          categories: newCategories,
          view: "post",
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchData = async () => {
    if (userId) {
      try {
        const res = await fetch(`/api/viewEditCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extension_user_id: userId, view: "get" }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        if (data.categories) {
          console.log(data.categories);
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };
  //
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="space-y-8">
      {categories.map((category: any, index: number) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{category}</p>
            <p className="text-sm text-muted-foreground">
              &middot; Added 3d ago{" "}
            </p>
          </div>
          <Button
            className="ml-auto"
            size="sm"
            variant="outline"
            color="primary"
          >
            <TrashIcon
              onClick={() => deleteCategory(category)}
              className="w-4 h-4"
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
