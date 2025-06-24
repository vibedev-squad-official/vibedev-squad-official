import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    // Test the database connection by fetching projects
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
          environment: process.env.NODE_ENV 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      projectCount: projects?.length || 0,
      projects: projects || [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    // For staging, we'll use a dummy user ID
    const dummyUserId = '00000000-0000-0000-0000-000000000000';

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        name,
        description: description || null,
        owner_id: dummyUserId
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to create project', 
          details: error.message,
          environment: process.env.NODE_ENV 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV 
      },
      { status: 500 }
    );
  }
} 