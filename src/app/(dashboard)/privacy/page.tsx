'use client';

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-4 text-center pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                    We are committed to protecting your personal data and ensuring transparency.
                </p>
                <p className="text-xs text-zinc-400">Last updated: January 2026</p>
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                <section>
                    <p className="lead">
                        DOs 4 DOERs collects your name, email address, and profile picture via Clerk for authentication purposes. We also store the URLs, metadata, and extracted content of any items you save to the platform.
                    </p>
                    <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider text-zinc-500">Specifically, we collect:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Account information (name, email, profile picture)</li>
                            <li>Saved items (URLs, titles, descriptions, images)</li>
                            <li>Notes, tasks, and meetings you create</li>
                            <li>Usage data (page views, feature usage)</li>
                            <li>Device information (browser type, IP address)</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">1</span>
                        How We Use Data
                    </h2>
                    <p>
                        Your data is used solely to provide the services of DOs 4 DOERs, including saving your reading list, fetching metadata, sending notifications, and providing search functionality. We do not sell or share your personal data with third parties for marketing.
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li>Provide and maintain the service</li>
                        <li>Send you reminders and notifications</li>
                        <li>Improve and optimize the service</li>
                        <li>Communicate with you about updates</li>
                        <li>Ensure security and prevent abuse</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">2</span>
                        Data Storage & Security
                    </h2>
                    <p>
                        Your data is stored securely in a managed PostgreSQL database. Authentication is handled by Clerk, a leader in user identity management. We implement industry-standard security measures to protect your information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">3</span>
                        Third-Party Services
                    </h2>
                    <p>
                        We use the following third-party services to operate DOs 4 DOERs:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                            <strong>Clerk</strong>
                            <p className="text-xs text-zinc-500 mt-1">Authentication</p>
                        </div>
                        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                            <strong>Resend</strong>
                            <p className="text-xs text-zinc-500 mt-1">Email Delivery</p>
                        </div>
                        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                            <strong>Vercel</strong>
                            <p className="text-xs text-zinc-500 mt-1">Hosting</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">4</span>
                        Your Rights
                    </h2>
                    <p>
                        You have the following rights regarding your data:
                    </p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                        <li><strong>Access:</strong> Request a copy of your data at any time</li>
                        <li><strong>Export:</strong> Download all your data in JSON format from Settings</li>
                        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong>Deletion:</strong> Delete your account and all associated data</li>
                        <li><strong>Opt-out:</strong> Unsubscribe from email notifications</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">5</span>
                        Data Retention
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Active accounts:</strong> Data stored indefinitely while active.</li>
                        <li><strong>Deleted accounts:</strong> Permanently deleted within 30 days.</li>
                        <li><strong>Trash items:</strong> Automatically deleted after 30 days.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">6</span>
                        Cookies & Children's Privacy
                    </h2>
                    <p>
                        We use essential cookies for authentication. We do not use tracking cookies.
                        The service is not intended for users under 13.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">7</span>
                        Changes
                    </h2>
                    <p>
                        We may update this policy. Continued use constitutes acceptance.
                    </p>
                </section>
            </div>

            <footer className="pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-500 mb-2">Have questions?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a href="mailto:privacy@support.dos4doers.snagdev.in" className="text-blue-600 hover:underline">
                        privacy@support.dos4doers.snagdev.in
                    </a>
                    <span className="hidden sm:inline text-zinc-300">•</span>
                    <a href="mailto:support@support.dos4doers.snagdev.in" className="text-blue-600 hover:underline">
                        support@support.dos4doers.snagdev.in
                    </a>
                </div>
            </footer>
        </div>
    );
}
