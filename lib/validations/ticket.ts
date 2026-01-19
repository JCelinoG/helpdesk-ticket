import { z } from 'zod';

export const ticketSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be at most 100 characters'),
  
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be at most 1000 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  priority: z.enum(['low', 'medium', 'high']),
  
  category: z.enum(['bug', 'billing', 'feature', 'other']),
  
  attachmentUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
})
.refine((data) => {
  // Validação condicional 1: Se category = billing, email deve ser corporativo
  if (data.category === 'billing') {
    const corporateDomains = ['company.com', 'corporate.com', 'business.com'];
    const emailDomain = data.email.split('@')[1];
    return corporateDomains.some(domain => emailDomain?.endsWith(domain));
  }
  return true;
}, {
  message: 'Billing issues require a corporate email address',
  path: ['email'],
})
.refine((data) => {
  // Validação condicional 2: Se priority = high, description deve ter pelo menos 60 chars
  if (data.priority === 'high') {
    return data.description.length >= 60;
  }
  return true;
}, {
  message: 'High priority tickets require at least 60 characters in description',
  path: ['description'],
})
.refine((data) => {
  // Validação condicional 3: Se category = bug, title deve conter [BUG]
  if (data.category === 'bug') {
    return data.title.includes('[BUG]');
  }
  return true;
}, {
  message: 'Bug tickets must include [BUG] in the title',
  path: ['title'],
});

export type TicketFormData = z.infer<typeof ticketSchema>;