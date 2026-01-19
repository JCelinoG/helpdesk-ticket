'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketSchema, TicketFormData } from '@/lib/validations/ticket';
import { TicketCategory, TicketPriority } from '@/types/ticket';
import styles from './TicketForm.module.scss';
import { useState } from 'react';

interface TicketFormProps {
  initialData?: Partial<TicketFormData>;
  onSubmit: (data: TicketFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitText?: string;
}

export default function TicketForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitText = 'Create Ticket'
}: TicketFormProps) {
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      email: initialData?.email || '',
      priority: initialData?.priority || 'medium',
      category: initialData?.category || 'bug',
      attachmentUrl: initialData?.attachmentUrl || '',
    },
  });

  const watchedCategory = watch('category');
  const watchedPriority = watch('priority');

  const handleFormSubmit = async (data: TicketFormData) => {
    try {
      setServerError('');
      await onSubmit(data);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Failed to save ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      {serverError && (
        <div className={styles.serverError}>
          {serverError}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          placeholder="Enter ticket title"
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
        {watchedCategory === 'bug' && (
          <span className={styles.hint}>Must include [BUG] prefix for bug tickets</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          placeholder="Describe your issue in detail"
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
        {watchedPriority === 'high' && (
          <span className={styles.hint}>High priority requires at least 60 characters</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
        {watchedCategory === 'billing' && (
          <span className={styles.hint}>Billing issues require corporate email (e.g., @company.com)</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="priority">Priority *</label>
          <select id="priority" {...register('priority')} aria-invalid={!!errors.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <span className={styles.error}>{errors.priority.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category *</label>
          <select id="category" {...register('category')} aria-invalid={!!errors.category}>
            <option value="bug">Bug</option>
            <option value="billing">Billing</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="attachmentUrl">Attachment URL (Optional)</label>
        <input
          id="attachmentUrl"
          type="url"
          {...register('attachmentUrl')}
          placeholder="https://example.com/screenshot.png"
          aria-invalid={!!errors.attachmentUrl}
        />
        {errors.attachmentUrl && (
          <span className={styles.error}>{errors.attachmentUrl.message}</span>
        )}
        <span className={styles.hint}>Link to screenshots or supporting documents</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => window.history.back()}
          className={styles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
}