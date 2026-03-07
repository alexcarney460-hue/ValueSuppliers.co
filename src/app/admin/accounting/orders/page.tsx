'use client';

import React from 'react';
import { useEffect, useState, useCallback } from 'react';

interface Order {
  id: string;
  contact_id: string | null;
  email: string;
  status: string;
  total: number;
  items: unknown[];
  shipping_address: unknown;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

const token = process.env.NEXT_PUBLIC_ADMIN_ANALYTICS_TOKEN ?? '';
async function apiFetch(path: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer `;
  const res = await fetch(path, { headers });
  return res.json();
}

function fmtCurrency(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso: string): string {
  if (\!iso) return '--';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
