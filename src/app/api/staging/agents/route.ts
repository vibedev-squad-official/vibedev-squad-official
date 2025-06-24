import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '../../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');

    const supabase = getSupabase();
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
        { 
          error: 'Failed to fetch agents',
          details: error.message,
          environment: process.env.NODE_ENV || 'development'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agents || [],
      count: agents?.length || 0,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      filters: { project_id: projectId }
    });

  } catch (error) {
    console.error('Agents API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development'
      },
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

    const supabase = getSupabase();
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
        { 
          error: 'Failed to create agent',
          details: error.message,
          environment: process.env.NODE_ENV || 'development'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agent,
      message: 'Agent created successfully',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    }, { status: 201 });

  } catch (error) {
    console.error('Create agent API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development'
      },
      { status: 500 }
    );
  }
} 