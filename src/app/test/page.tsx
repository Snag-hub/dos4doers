import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function TestPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Session Test</h1>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
            </pre>
            <div className="mt-4">
                <Link href="/settings" className="text-blue-600 hover:underline">
                    Go to Settings
                </Link>
            </div>
        </div>
    );
}
