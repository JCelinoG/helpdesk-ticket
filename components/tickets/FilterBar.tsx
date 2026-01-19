'use client';

import { TicketStatus, TicketPriority, TicketCategory } from '@/types/ticket';
import useTicketStore from '@/stores/useTicketStore';
import styles from './FilterBar.module.scss';

const statusOptions: Array<{ value: TicketStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

const priorityOptions: Array<{ value: TicketPriority | 'all'; label: string }> = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const categoryOptions: Array<{ value: TicketCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All Categories' },
  { value: 'bug', label: 'Bug' },
  { value: 'billing', label: 'Billing' },
  { value: 'feature', label: 'Feature' },
  { value: 'other', label: 'Other' },
];

export default function FilterBar() {
  const { filters, setFilters, clearFilters } = useTicketStore();
  const hasActiveFilters = 
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.search.trim() !== '';

  return (
    <div className={styles.filterBar}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search tickets..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className={styles.searchInput}
          aria-label="Search tickets"
        />
        {filters.search && (
          <button
            onClick={() => setFilters({ search: '' })}
            className={styles.clearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as TicketStatus | 'all' })}
          className={styles.select}
          aria-label="Filter by status"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as TicketPriority | 'all' })}
          className={styles.select}
          aria-label="Filter by priority"
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value as TicketCategory | 'all' })}
          className={styles.select}
          aria-label="Filter by category"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className={styles.clearButton}>
          Clear Filters
        </button>
      )}
    </div>
  );
}