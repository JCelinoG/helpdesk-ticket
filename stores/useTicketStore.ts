import { create } from 'zustand';
import { Ticket, TicketStatus, TicketPriority, TicketCategory } from '@/types/ticket';

interface TicketStore {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  filters: {
    status: TicketStatus | 'all';
    priority: TicketPriority | 'all';
    category: TicketCategory | 'all';
    search: string;
  };
  setTickets: (tickets: Ticket[]) => void;
  setFilters: (filters: Partial<TicketStore['filters']>) => void;
  updateTicketInStore: (updatedTicket: Ticket) => void;
  removeTicketFromStore: (ticketId: string) => void;
  refreshTickets: () => Promise<void>;
  applyFilters: () => void;
  clearFilters: () => void;
}

const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  filteredTickets: [],
  
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
  },

  setTickets: (tickets) => {
    set({ tickets, filteredTickets: tickets });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { tickets, filters } = get();
    
    let filtered = [...tickets];

    // filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // filter by priority
    if (filters.priority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }

    // filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }

    // find by title(case-insensitive)
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm) ||
        ticket.email.toLowerCase().includes(searchTerm)
      );
    }

    set({ filteredTickets: filtered });
  },

  clearFilters: () => {
    set({
      filters: {
        status: 'all',
        priority: 'all',
        category: 'all',
        search: '',
      },
      filteredTickets: get().tickets,
    });
  },
  
  updateTicketInStore: (updatedTicket) => {
    
    set((state) => {
      const newTickets = state.tickets.map(ticket => {
        if (ticket.id === updatedTicket.id) {
          return { ...ticket, ...updatedTicket };
        }
        return ticket;
      });
      
      
      // return new state with new array
      return {
        tickets: newTickets,
      };
    });
    
    // replace filters after refresh
    setTimeout(() => {
      get().applyFilters();
    }, 0);
  },

  removeTicketFromStore: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.filter(ticket => ticket.id !== ticketId),
    }));
    
    setTimeout(() => {
      get().applyFilters();
    }, 0);
  },

  refreshTickets: async () => {
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const tickets = await response.json();
        set({ tickets, filteredTickets: tickets });
      }
    } catch (error) {
      console.error('Failed to refresh tickets:', error);
    }
  },
}));

export default useTicketStore;