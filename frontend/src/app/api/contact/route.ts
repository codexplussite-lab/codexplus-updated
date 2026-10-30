import { NextResponse } from 'next/server';
import { ContactFormSubmissionSchema } from '@codexplus/shared';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // 1. Strict Server-Side Validation via shared Zod schema
    const parseResult = ContactFormSubmissionSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || 'form';
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid submission data. Please review the highlighted fields.',
            details: fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 2. Anti-spam honeypot verification
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Your project brief has been received.',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project brief has been received. Our senior engineering team will review it within 24 hours.',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while processing your brief. Please try again or contact us directly at contact@codexplus.site.',
        },
      },
      { status: 500 }
    );
  }
}
