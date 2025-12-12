import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        //=== Simulate network delay======
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //=== Mock Validation======
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        //=== Mock Authentication Logic======
        if (email === 'test@yopmail.com' && password === 'Password@123') {
            return NextResponse.json(
                {
                    user: {
                        id: '1',
                        name: 'John Doe',
                        email: 'test@yopmail.com',
                    },
                    token: 'mock-jwt-token',
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'Invalid email or password' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
