import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.type || !body.testId || !body.variantId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, testId, variantId' },
        { status: 400 }
      );
    }

    // Log the A/B test event (in production, send to your analytics service)
    console.log('A/B Test Event Received:', {
      type: body.type,
      testId: body.testId,
      variantId: body.variantId,
      conversionType: body.conversionType,
      timestamp: body.timestamp,
      metadata: body.metadata,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-forwarded-for'),
    });

    // In production, you would send this data to your analytics service:
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - Custom database
    // - PostHog
    // - etc.

    // For now, we'll just acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'A/B test event tracked successfully' 
    });

  } catch (error) {
    console.error('Error processing A/B test analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 