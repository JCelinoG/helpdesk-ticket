export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketCategory = 'bug' | 'billing' | 'feature' | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  email: string;
  priority: TicketPriority;
  category: TicketCategory;
  status: TicketStatus;
  attachmentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketDTO {
  title: string;
  description: string;
  email: string;
  priority: TicketPriority;
  category: TicketCategory;
  attachmentUrl?: string;
}

export interface UpdateTicketDTO {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  description?: string;
}