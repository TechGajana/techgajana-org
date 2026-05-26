"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/page-header";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState<any>({
    id: "", // 🔥 ADD THIS
    admin_name: "",
    admin_email: "",
    app_name: "",
    support_email: "",
    maintenance_mode: false,
    debug_mode: false,
  });

  // FETCH SETTINGS
  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings/get");
      const data = await res.json();

      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  // SAVE SETTINGS
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/settings/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert("Settings updated successfully");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Settings"
        description="Manage global admin panel configuration"
      />

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-2xl border bg-white p-6"
      >
        {/* ADMIN NAME */}
        <div>
          <label className="text-sm font-medium">Admin Name</label>
          <input
            value={settings.admin_name}
            onChange={(e) =>
              setSettings({ ...settings, admin_name: e.target.value })
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* ADMIN EMAIL */}
        <div>
          <label className="text-sm font-medium">Admin Email</label>
          <input
            value={settings.admin_email}
            onChange={(e) =>
              setSettings({ ...settings, admin_email: e.target.value })
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* APP NAME */}
        <div>
          <label className="text-sm font-medium">App Name</label>
          <input
            value={settings.app_name}
            onChange={(e) =>
              setSettings({ ...settings, app_name: e.target.value })
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* SUPPORT EMAIL */}
        <div>
          <label className="text-sm font-medium">Support Email</label>
          <input
            value={settings.support_email ?? ""}
            onChange={(e) =>
              setSettings({ ...settings, support_email: e.target.value })
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* TOGGLES */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.maintenance_mode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maintenance_mode: e.target.checked,
                })
              }
            />
            Maintenance Mode
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.debug_mode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  debug_mode: e.target.checked,
                })
              }
            />
            Debug Mode
          </label>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}