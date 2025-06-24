import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    // Test the database connection by fetching projects
    const supabase = getSupabase();
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        description,
        created_at,
        owner_id,
        users!projects_owner_id_fkey (
          id,
          email,
          display_name
        )
      `)
      .limit(10);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          details: error.message,
          environment: process.env.NODE_ENV || 'development'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects?.length || 0,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    console.error('API error:', error);
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
    const { name, description, owner_id } = body;

    if (!name || !owner_id) {
      return NextResponse.json(
        { error: 'Missing required fields: name, owner_id' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data: project, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          description: description || null,
          owner_id
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to create project', 
          details: error.message,
          environment: process.env.NODE_ENV || 'development'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
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