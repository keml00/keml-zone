"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("visited");
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstVisit: !stored }),
    })
      .then((r) => r.json())
      .then((d) => {
        setVisitors(d.uniqueVisitors);
        setViews(d.totalVisits);
      })
      .catch(() => {});
    if (!stored) localStorage.setItem("visited", "1");
  }, []);

  if (!visitors && !views) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-[#64748b]">
      <span className="flex items-center gap-1">
        <Eye size={12} />
        {visitors} уникальных
      </span>
      <span className="w-1 h-1 rounded-full bg-[#64748b]" />
      <span>{views} просмотров</span>
    </div>
  );
}
