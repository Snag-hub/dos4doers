import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
            <div className="mx-auto max-w-3xl px-6 py-20">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-600 transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
                <p className="text-zinc-500 mb-12 italic">Last updated: January 1, 2026</p>

                <div className="space-y-12 prose dark:prose-invert max-w-none font-medium text-zinc-600 dark:text-zinc-400">
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using DOs 4 DOERs, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. Eligibility</h2>
                        <p>
                            You must be at least 13 years old to use DOs 4 DOERs. By using the service, you represent that you meet this age requirement. If you are under 18, you must have permission from a parent or guardian.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Account Terms</h2>
                        <p>
                            When you create an account with DOs 4 DOERs:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>You must provide accurate and complete information</li>
                            <li>You are responsible for maintaining account security</li>
                            <li>You are responsible for all activity under your account</li>
                            <li>You may not share your account with others</li>
                            <li>You must notify us immediately of any unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Use of Service</h2>
                        <p>
                            DOs 4 DOERs is a personal productivity tool. You agree to use the service for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">5. Prohibited Activities</h2>
                        <p>
                            You may not:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Use DOs 4 DOERs to store or distribute illegal content</li>
                            <li>Attempt to breach security or access other users' data</li>
                            <li>Use the service for any malicious purposes</li>
                            <li>Abuse, harass, or harm other users</li>
                            <li>Interfere with the proper functioning of the service</li>
                            <li>Attempt to reverse engineer or copy the service</li>
                            <li>Use automated tools to access the service without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">6. Intellectual Property</h2>
                        <p>
                            <strong>Your Content:</strong> You retain all rights to the content you save and create in DOs 4 DOERs. By using the service, you grant us a limited license to store, display, and process your content solely to provide the service.
                        </p>
                        <p className="mt-4">
                            <strong>Our Property:</strong> The DOs 4 DOERs name, logo, and all service features are our intellectual property. You may not use them without permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">7. Account Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account if:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>You violate these Terms of Service</li>
                            <li>You engage in illegal activity</li>
                            <li>You abuse the service or other users</li>
                            <li>We are required to do so by law</li>
                        </ul>
                        <p className="mt-4">
                            You may delete your account at any time by contacting us. Upon deletion, your data will be permanently removed within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">8. Service Modifications</h2>
                        <p>
                            We reserve the right to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Modify or discontinue features with or without notice</li>
                            <li>Update these Terms of Service (changes will be posted here)</li>
                            <li>Change pricing for future features (with advance notice)</li>
                            <li>Temporarily suspend the service for maintenance</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">9. Disclaimer of Warranty</h2>
                        <p>
                            DOs 4 DOERs is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or secure. You use the service at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">10. Limitation of Liability</h2>
                        <p>
                            In no event shall DOs 4 DOERs or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service, including but not limited to loss of data, loss of profits, or business interruption.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">11. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless DOs 4 DOERs and its creator from any claims, damages, losses, or expenses (including legal fees) arising from your use of the service or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">12. Governing Law</h2>
                        <p>
                            These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of DOs 4 DOERs shall be subject to the exclusive jurisdiction of the courts in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">13. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">14. Contact</h2>
                        <p>
                            For questions about these Terms of Service, please contact:
                        </p>
                        <ul className="list-none mt-2 space-y-1">
                            <li>Legal inquiries: <a href="mailto:legal@support.dos4doers.snagdev.in" className="text-blue-600 underline">legal@support.dos4doers.snagdev.in</a></li>
                            <li>General support: <a href="mailto:support@support.dos4doers.snagdev.in" className="text-blue-600 underline">support@support.dos4doers.snagdev.in</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
