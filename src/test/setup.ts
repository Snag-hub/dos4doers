import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock our auth helpers (avoids initializing Better Auth/DB during tests)
vi.mock('@/lib/auth', () => ({
    getUserId: vi.fn(() => Promise.resolve('test-user-id')),
    getCurrentUserId: vi.fn(() => Promise.resolve('test-user-id')),
    getSession: vi.fn(() =>
        Promise.resolve({
            user: { id: 'test-user-id', email: 'test@example.com', name: 'Test User', status: 'active' },
        })
    ),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => '/',
}));
