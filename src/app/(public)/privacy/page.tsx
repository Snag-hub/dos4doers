import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
            <div className="mx-auto max-w-3xl px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
                <p className="text-zinc-500 mb-12 italic">Last updated: January 1, 2026</p>

                <div className="space-y-12 prose dark:prose-invert max-w-none font-medium text-zinc-600 dark:text-zinc-400">
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Information We Collect</h2>
                        <p>
                            DOs 4 DOERs collects your name, email address, and profile picture via Clerk for authentication purposes. We also store the URLs, metadata, and extracted content of any items you save to the platform.
                        </p>
                        <p className="mt-4">
                            <strong>Specifically, we collect:</strong>
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Account information (name, email, profile picture)</li>
                            <li>Saved items (URLs, titles, descriptions, images)</li>
                            <li>Notes, tasks, and meetings you create</li>
                            <li>Usage data (page views, feature usage)</li>
                            <li>Device information (browser type, IP address)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. How We Use Data</h2>
                        <p>
                            Your data is used solely to provide the services of DOs 4 DOERs, including saving your reading list, fetching metadata, sending notifications, and providing search functionality. We do not sell or share your personal data with third parties for marketing.
                        </p>
                        <p className="mt-4">
                            <strong>We use your data to:</strong>
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Provide and maintain the service</li>
                            <li>Send you reminders and notifications</li>
                            <li>Improve and optimize the service</li>
                            <li>Communicate with you about updates</li>
                            <li>Ensure security and prevent abuse</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Data Storage & Security</h2>
                        <p>
                            Your data is stored securely in a managed PostgreSQL database. Authentication is handled by Clerk, a leader in user identity management. We implement industry-standard security measures to protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Third-Party Services</h2>
                        <p>
                            We use the following third-party services to operate DOs 4 DOERs:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Clerk</strong> (clerk.com) - Authentication and user management</li>
                            <li><strong>Resend</strong> (resend.com) - Email delivery for notifications</li>
                            <li><strong>Vercel</strong> (vercel.com) - Hosting and infrastructure</li>
                        </ul>
                        <p className="mt-4">
                            Each service has its own privacy policy. We recommend reviewing them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">5. Your Rights</h2>
                        <p>
                            You have the following rights regarding your data:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Access:</strong> Request a copy of your data at any time</li>
                            <li><strong>Export:</strong> Download all your data in JSON format from Settings</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Delete your account and all associated data</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from email notifications</li>
                        </ul>
                        <p className="mt-4">
                            To exercise these rights, contact us at <a href="mailto:privacy@support.DOs 4 DOERs.snagdev.in" className="text-blue-600 underline">privacy@support.DOs 4 DOERs.snagdev.in</a> or use the data export feature in Settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">6. Data Retention</h2>
                        <p>
                            We retain your data as follows:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Active accounts:</strong> Data stored indefinitely while account is active</li>
                            <li><strong>Deleted accounts:</strong> All data permanently deleted within 30 days</li>
                            <li><strong>Trash items:</strong> Automatically deleted after 30 days</li>
                            <li><strong>System logs:</strong> Retained for 90 days for security purposes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">7. Cookies & Local Storage</h2>
                        <p>
                            DOs 4 DOERs uses:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Essential cookies:</strong> Required for authentication and security</li>
                            <li><strong>Local storage:</strong> Stores app preferences and settings</li>
                            <li><strong>No tracking cookies:</strong> We do not use third-party tracking or advertising cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">8. Children's Privacy</h2>
                        <p>
                            DOs 4 DOERs is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">9. User Isolation</h2>
                        <p>
                            DOs 4 DOERs is built with strict multi-user isolation. No user can access or view data belonging to another user. Each workspace is private and secured by your unique identity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of DOs 4 DOERs after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">11. Contact</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="list-none mt-2 space-y-1">
                            <li>Privacy inquiries: <a href="mailto:privacy@support.DOs 4 DOERs.snagdev.in" className="text-blue-600 underline">privacy@support.DOs 4 DOERs.snagdev.in</a></li>
                            <li>General support: <a href="mailto:support@support.DOs 4 DOERs.snagdev.in" className="text-blue-600 underline">support@support.DOs 4 DOERs.snagdev.in</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
