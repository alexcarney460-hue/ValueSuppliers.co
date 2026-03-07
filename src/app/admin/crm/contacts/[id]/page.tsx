'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { crmFetch } from '@/app/admin/crm/components/api';
import StatusBadge from '@/app/admin/crm/components/StatusBadge';
import Modal from '@/app/admin/crm/components/Modal';

interface Activity { id: number; type: string; subject: string | null; notes: string | null; created_at: string; }
interface Communication { id: number; channel: string; direction: string; subject: string | null; body: string | null; sent_at: string; }
interface Order { id: number; order_number: string | null; status: string | null; total_amount: number | null; created_at: string; }

interface ContactDetail {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  lead_status: string | null;
  source: string | null;
  company_id: number | null;
  job_title: string | null;
  notes: string | null;
  last_contacted_at: string | null;
  created_at: string;
  company?: { id: number; name: string; domain: string | null } | null;
  activities: Activity[];
  communications: Communication[];
  orders: Order[];
}