'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { crmFetch } from '@/app/admin/crm/components/api';
import SearchBar from '@/app/admin/crm/components/SearchBar';
import Pagination from '@/app/admin/crm/components/Pagination';
import StatusBadge from '@/app/admin/crm/components/StatusBadge';
import Modal from '@/app/admin/crm/components/Modal';

interface Contact {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  lead_status: string | null;
  source: string | null;
  last_contacted_at: string | null;
  companies?: { id: number; name: string; domain: string | null } | null;
}

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', phone: '', source: '', lead_status: 'new' });
  const [saving, setSaving] = useState(false);
  const limit = 25;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('q', search);
    const res = await crmFetch(`/api/admin/crm/contacts?${params}`);
    if (res.ok) { setContacts(res.data); setTotal(res.total); }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await crmFetch('/api/admin/crm/contacts', { method: 'POST', body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModalOpen(false); setForm({ firstname: '', lastname: '', email: '', phone: '', source: '', lead_status: 'new' }); load(); }
  };

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString() : '--';
  const inputCls = "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Contacts</h1>
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors">+ Add Contact</button>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search contacts..." />
      <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Company</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Last Contacted</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : contacts.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No contacts found.</td></tr>
              ) : contacts.map((c) => (
                <tr key={String(c.id)} onClick={() => router.push(`/admin/crm/contacts/${c.id}`)} className="border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{[c.firstname, c.lastname].filter(Boolean).join(' ') || '--'}</td>
                  <td className="px-4 py-3 text-slate-300">{c.email || '--'}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">{c.phone || '--'}</td>
                  <td className="px-4 py-3 text-slate-300 hidden lg:table-cell">{c.companies?.name || '--'}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.lead_status} /></td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{fmtDate(c.last_contacted_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4"><Pagination page={page} total={total} limit={limit} onPageChange={setPage} /></div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Contact">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-400 mb-1">First Name</label><input className={inputCls} value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} /></div>
            <div><label className="block text-xs font-medium text-slate-400 mb-1">Last Name</label><input className={inputCls} value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-400 mb-1">Email</label><input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="block text-xs font-medium text-slate-400 mb-1">Phone</label><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><label className="block text-xs font-medium text-slate-400 mb-1">Source</label><input className={inputCls} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. website, referral" /></div>
          <div><label className="block text-xs font-medium text-slate-400 mb-1">Lead Status</label>
            <select className={inputCls} value={form.lead_status} onChange={(e) => setForm({ ...form, lead_status: e.target.value })}>
              <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="unqualified">Unqualified</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">{saving ? 'Saving...' : 'Create Contact'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
