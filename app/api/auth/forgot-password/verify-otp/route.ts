import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { otp } = body;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!otp) {
      return NextResponse.json(
        { message: 'OTP is required' },
        { status: 400 }
      );
    }

    // Mock Validation forrr valid OTP----
    if (otp === '123456') {
      return NextResponse.json(
        { message: 'OTP verified successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid OTP. Please try again.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
