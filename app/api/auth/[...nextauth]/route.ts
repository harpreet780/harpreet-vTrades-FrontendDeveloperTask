import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
    providers: [
        // ============ getting Google Provider fron next auth==============
        GoogleProvider({
            clientId: "mock-client-id",
            clientSecret: "mock-client-secret",
        }),
        // ============ get Microsoft Azure AD Provider ==============
        AzureADProvider({
            clientId: "mock-client-id",
            clientSecret: "mock-client-secret",
            tenantId: "mock-tenant-id",
        }),
        // ============ Credentials Provider ==============
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                social: { label: "Social", type: "text" }
            },
            async authorize(credentials) {
                // -==Handle Mock Social Login===
                if (credentials?.social) {
                    const isGoogle = credentials.social === 'google';
                    return {
                        id: isGoogle ? 'g-1' : 'm-1',
                        name: isGoogle ? 'Google User' : 'Microsoft User',
                        email: `test@${credentials.social}.com`,
                    };
                }

                // --create mock user for authentication
                if (credentials?.email && credentials?.password) {
                    return {
                        id: "1",
                        name: "Demo User",
                        email: credentials.email,
                    };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
