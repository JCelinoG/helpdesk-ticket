import { TicketStatus, TicketPriority } from '@/types/ticket';

export const statusColors: Record<TicketStatus, { bg: string; text: string; border: string }> = {
  open: { 
    bg: '#FFEBEE', 
    text: '#C62828',
    border: '#FFCDD2'
  },
  in_progress: { 
    bg: '#FFF3E0', 
    text: '#EF6C00',
    border: '#FFE0B2'
  },
  resolved: { 
    bg: '#E8F5E9', 
    text: '#2E7D32',
    border: '#C8E6C9'
  },
};

export const priorityColors: Record<TicketPriority, { bg: string; text: string; border: string }> = {
  high: { 
    bg: '#FFEBEE', 
    text: '#C62828',
    border: '#FFCDD2'
  },
  medium: { 
    bg: '#FFF3E0', 
    text: '#EF6C00',
    border: '#FFE0B2'
  },
  low: { 
    bg: '#E8F5E9', 
    text: '#2E7D32',
    border: '#C8E6C9'
  },
};