import { NextRequest, NextResponse } from 'next/server';
import { mockApi } from '@/lib/mock-data';
import { CreateTicketDTO } from '@/types/ticket';

export async function GET() {
  try {
    const tickets = await mockApi.getTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTicketDTO = await request.json();
    const newTicket = await mockApi.createTicket(body);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}