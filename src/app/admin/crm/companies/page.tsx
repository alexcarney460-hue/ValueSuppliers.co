"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { crmFetch } from "@/app/admin/crm/components/api";
import SearchBar from "@/app/admin/crm/components/SearchBar";
import Pagination from "@/app/admin/crm/components/Pagination";
import Modal from "@/app/admin/crm/components/Modal";

interface Company {
  id: number;
  name: string;
  domain: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  industry: string | null;
  source: string | null;
  contacts_count: number;
  created_at: string | null;
}

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", domain: "", phone: "", city: "", state: "", industry: "", source: "" });
  const [saving, setSaving] = useState(false);
  const limit = 25;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("q", search);
    const res = await crmFetch(`/api/admin/crm/companies?${params}`);
    if (res.ok) { setCompanies(res.data); setTotal(res.total); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body: Record<string, string> = {};
    Object.entries(form).forEach(([k, v]) => { if (v.trim()) body[k] = v.trim(); });
    const res = await crmFetch("/api/admin/crm/companies", { method: "POST", body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) {
      setModalOpen(false);
      setForm({ name: "", domain: "", phone: "", city: "", state: "", industry: "", source: "" });
      load();
    }
  };

  const inputCls = "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Companies</h1>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors">+ Add Company</button>
      </div>

      <div className="mb-4 max-w-md">
        <SearchBar value={search} onChange={setSearch} placeholder="Search companies..." />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Domain</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">City / State</th>
                <th className="px-4 py-3 font-medium text-right">Contacts</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">Loading...</td></tr>
              ) : companies.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">No companies found.</td></tr>
              ) : (
                companies.map((c) => (
                  <tr
                    key={String(c.id)}
                    onClick={() => router.push(`/admin/crm/companies/${c.id}`)}
                    className="border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-slate-300">{c.domain || "--"}</td>
                    <td className="px-4 py-3 text-slate-300">{c.industry || "--"}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {[c.city, c.state].filter(Boolean).join(", ") || "--"}
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-right">{c.contacts_count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-800">
          <Pagination page={page} limit={limit} total={total} onPageChange={setPage} />
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Company">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Domain</label>
              <input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className={inputCls} placeholder="example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">State</label>
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Industry</label>
              <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Source</label>
              <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
              {saving ? "Saving..." : "Create Company"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
