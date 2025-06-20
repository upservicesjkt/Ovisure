
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from 'lucide-react';

// IMPORTANT: These credentials are hardcoded for demonstration purposes only.
// In a production application, use a secure authentication system.
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password';
const ADMIN_COOKIE_NAME = 'admin-auth';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  async function handleLogin(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      cookies().set(ADMIN_COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      redirect('/admin/dashboard');
    } else {
      // Simple error handling, consider using useFormState for better UX
      redirect('/admin/login?error=Invalid credentials');
    }
  }

  const errorMessage = searchParams?.error;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
          <CardDescription>Masuk untuk mengelola konten website.</CardDescription>
        </CardHeader>
        <form action={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Masuk
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
