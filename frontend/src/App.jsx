import { useState } from "react";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <h1 className="text-red-700 bg-orange-400 p-10 text-3xl">
        Welcome to the App
      </h1>

      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
