"use client";
// This route is used to delete the user key from the local storage and redirect the user to the home page
export default function Home() {
  localStorage.removeItem("user_id");
  window.location.href = "/";
  return;
}
