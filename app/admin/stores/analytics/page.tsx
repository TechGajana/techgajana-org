"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/page-header";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function StoreAnalyticsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  async function fetchData() {
    const [pRes, cRes] = await Promise.all([
      fetch("/api/store/products/list"),
      fetch("/api/store/categories/list"),
    ]);

    const pData = await pRes.json();
    const cData = await cRes.json();

    setProducts(pData.products || []);
    setCategories(cData.categories || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ================= METRICS =================
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.active).length;
  const freeProducts = products.filter((p) => p.free_product).length;

  const revenue = products.reduce((acc, p) => {
    if (p.free_product) return acc;
    return acc + (p.discount_price || p.price || 0);
  }, 0);

  // ================= CATEGORY CHART =================
  const categoryData = categories.map((cat) => {
    const count = products.filter(
      (p) => p.category_id === cat.id
    ).length;

    return {
      name: cat.name,
      value: count,
    };
  });

  const COLORS = ["#00a0dc", "#0d426a", "#34d399", "#f59e0b", "#ef4444"];

  // ================= PRICE DISTRIBUTION =================
  const priceData = [
    {
      name: "Free",
      value: freeProducts,
    },
    {
      name: "Paid",
      value: totalProducts - freeProducts,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Store Analytics (Pro)"
        description="Advanced insights for your digital store"
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-xl bg-white">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold">{totalProducts}</h2>
        </div>

        <div className="p-4 border rounded-xl bg-white">
          <p>Active Products</p>
          <h2 className="text-2xl font-bold text-green-600">
            {activeProducts}
          </h2>
        </div>

        <div className="p-4 border rounded-xl bg-white">
          <p>Free Products</p>
          <h2 className="text-2xl font-bold text-blue-500">
            {freeProducts}
          </h2>
        </div>

        <div className="p-4 border rounded-xl bg-white">
          <p>Estimated Revenue</p>
          <h2 className="text-2xl font-bold text-purple-600">
            ₹{revenue}
          </h2>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CATEGORY BAR CHART */}
        <div className="border rounded-xl p-4 bg-white">
          <h2 className="font-semibold mb-4">Products by Category</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00a0dc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FREE VS PAID PIE CHART */}
        <div className="border rounded-xl p-4 bg-white">
          <h2 className="font-semibold mb-4">Free vs Paid Products</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priceData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {priceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REVENUE INSIGHT CARD */}
      <div className="border rounded-xl p-6 bg-white">
        <h2 className="text-lg font-semibold mb-2">
          Revenue Insight
        </h2>

        <p className="text-gray-600">
          Based on active paid products pricing structure.
        </p>

        <div className="mt-4 text-3xl font-bold text-green-600">
          ₹{revenue}
        </div>
      </div>
    </div>
  );
}