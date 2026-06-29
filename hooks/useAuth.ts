"use client";
import { useState } from "react";

export default function useAuth() {
  const [isAuthenticated] = useState(false);
  return { isAuthenticated };
}
