import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for staging with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');

    let query = supabase
      .from('agents')
      .select(`
        id,
        name,
        description,
        type,
        project_id,
        config,
        created_at,
        updated_at,
        projects!agents_project_id_fkey (
          id,
          name,
          description
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by project_id if provided
    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data: agents, error } = await query;

    if (error) {
      console.error('Error fetching agents:', error);
      return NextResponse.json(
        { error: 'Failed to fetch agents' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      agents: agents || [],
      count: agents?.length || 0,
      timestamp: new Date().toISOString(),
      environment: 'staging',
      filters: { project_id: projectId }
    });

  } catch (error) {
    console.error('Agents API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, project_id, config } = body;

    // Validate required fields
    if (!name || !project_id) {
      return NextResponse.json(
        { error: 'Name and project_id are required' },
        { status: 400 }
      );
    }

    // Validate agent type
    const validTypes = ['general', 'planning', 'coding', 'testing', 'deployment'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid agent type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const { data: agent, error } = await supabase
      .from('agents')
      .insert({
        name,
        description,
        type: type || 'general',
        project_id,
        config: config || {}
      })
      .select(`
        id,
        name,
        description,
        type,
        project_id,
        config,
        created_at,
        updated_at,
        projects!agents_project_id_fkey (
          id,
          name,
          description
        )
      `)
      .single();

    if (error) {
      console.error('Error creating agent:', error);
      return NextResponse.json(
        { error: 'Failed to create agent' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      agent,
      message: 'Agent created successfully',
      environment: 'staging'
    }, { status: 201 });

  } catch (error) {
    console.error('Create agent API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 