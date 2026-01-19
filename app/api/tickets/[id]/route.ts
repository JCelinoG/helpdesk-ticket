import { NextRequest, NextResponse } from 'next/server';
import { mockApi } from '@/lib/mock-data';
import { UpdateTicketDTO } from '@/types/ticket';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const ticket = await mockApi.getTicket(params.id);
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body: UpdateTicketDTO = await request.json();
    const updatedTicket = await mockApi.updateTicket(params.id, body);
    if (!updatedTicket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const deleted = await mockApi.deleteTicket(params.id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
}