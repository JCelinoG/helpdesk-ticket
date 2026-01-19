import { Ticket } from '@/types/ticket';

let tickets: Ticket[] = [
  {
    id: '1',
    title: 'Login button not working',
    description: 'The login button on the homepage does not respond when clicked. This started happening after the last update.',
    email: 'user@company.com',
    priority: 'high',
    category: 'bug',
    status: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Billing issue for subscription',
    description: 'I was charged twice for my monthly subscription. Need refund for duplicate charge.',
    email: 'customer@corporate.com',
    priority: 'medium',
    category: 'billing',
    status: 'in_progress',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    title: 'Feature request: Dark mode',
    description: 'Please add a dark mode theme option for better night-time usage.',
    email: 'dev@example.com',
    priority: 'low',
    category: 'feature',
    status: 'resolved',
    createdAt: '2024-01-10T08:45:00Z',
    updatedAt: '2024-01-12T11:20:00Z',
  },
];

const shouldSimulateError = () => {
  return false; 
};

export const mockApi = {
  async delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async getTickets(): Promise<Ticket[]> {
    await this.delay();
    
    // if (shouldSimulateError()) {
    //   throw new Error('Failed to load tickets: Network error');
    // }
    
    return [...tickets];
  },

  async getTicket(id: string): Promise<Ticket | null> {
    await this.delay();
    
    // if (shouldSimulateError()) {
    //   throw new Error('Failed to load ticket: Server error');
    // }
    
    const ticket = tickets.find(t => t.id === id);
    return ticket || null;
  },

  async createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Ticket> {
    await this.delay();
    
    // if (shouldSimulateError()) {
    //   throw new Error('Failed to create ticket: Validation error');
    // }
    
    const newTicket: Ticket = {
      ...data,
      id: Date.now().toString(),
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    tickets.unshift(newTicket);
    
    return newTicket;
  },

  async updateTicket(id: string, data: Partial<Ticket>): Promise<Ticket | null> {
    await this.delay();
    
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) {
      return null;
    }

    const updatedTicket = {
      ...tickets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    tickets[index] = updatedTicket;
    
    
    return updatedTicket;
  },

  async deleteTicket(id: string): Promise<boolean> {
    await this.delay();
    
    
    const initialLength = tickets.length;
    tickets = tickets.filter(t => t.id !== id);
    
    const deleted = tickets.length < initialLength;
    
    return deleted;
  },
};