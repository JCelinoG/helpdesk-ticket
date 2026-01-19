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

    // Filtro por status
    if (filters.status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // Filtro por prioridade
    if (filters.priority !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }

    // Filtro por categoria
    if (filters.category !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }

    // Busca por título (case-insensitive)
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
}));

export default useTicketStore;