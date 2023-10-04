"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Dialog = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.Dialog),
  {
    ssr: false,
  }
);
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "./button";
import { InfoCircledIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
export function AddCategoryCard({ userId }: { userId: string }) {
  const [categories, setCategories]: any = React.useState([]);
  const [error, setError] = React.useState("");
  const addCategory = async (category: string) => {
    // add the category to the array
    // check if the category already exists
    const formattedCategory = category.trim().toLowerCase();
    if (
      categories
        .map((c: string) => c.trim().toLowerCase())
        .includes(formattedCategory)
    ) {
      setError("Category already exists");
      return;
    }
    setError("");
    const newCategories = [...categories, formattedCategory];
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
    // clear the input
    const input = document.getElementById("name") as HTMLInputElement;
    input.value = "";
    // close the dialog
    if (error === "") {
      const btn = document.getElementById("dialogtriggerBtn");
      btn?.click();
    }
  };
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
  const triggerDialog = () => {
    const btn = document.getElementById("dialogtriggerBtn");
    btn?.click();
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button id="dialogtriggerBtn"></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a category</DialogTitle>
            <DialogDescription>
              Add a new category here, for example: Social Media
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
          </div>
          {error !== "" && (
            <div className="flex gap-1 items-center justify-start">
              <InfoCircledIcon className="w-4 h-4 text-red-500 " />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => {
                // get the value of the input
                const input = document.getElementById(
                  "name"
                ) as HTMLInputElement;
                const category = input.value;
                addCategory(category);
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div
        style={{
          marginTop: "-2rem",
        }}
      >
        <CardHeader>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Add a new category</CardTitle>
              <CardDescription>
                Add new distractions categories to your list.
              </CardDescription>
            </div>
            <Button onClick={triggerDialog} variant="outline" size="icon">
              <PlusIcon />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {categories.map((category: any, index: number) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/021.png" alt="Avatar" />
                  <AvatarFallback>
                    {category[0].toUpperCase()}
                    {category[1].toUpperCase()}
                  </AvatarFallback>
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
        </CardContent>
      </div>
    </>
  );
}
