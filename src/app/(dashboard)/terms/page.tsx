'use client';

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-12 space-y-8 animate-in fade-in duration-500">
            <header className="space-y-4 text-center pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Terms & Conditions</h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                    Please read these terms carefully before using DOs 4 DOERs.
                    By using our service, you agree to be bound by these terms.
                </p>
                <p className="text-xs text-zinc-400">Last updated: January 2026</p>
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                <section>
                    <p className="lead">
                        DOs 4 DOERs operates the website and application DOs 4 DOERs, a digital intelligence and productivity platform that enables users to save content, use reader mode, and receive intelligent reminders.
                    </p>
                    <p className="mt-4">
                        We are committed to protecting your privacy and ensuring compliance with applicable Indian laws including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Information Technology Act, 2000</li>
                        <li>IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                        <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">1</span>
                        Acceptance of Terms
                    </h2>
                    <p>
                        By accessing and using DOs 4 DOERs ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Service, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">2</span>
                        Disclaimer of Warranty
                    </h2>
                    <p>
                        The Service is provided on an “as is” and “as available” basis. While DOs 4 DOERs endeavours to provide uninterrupted and secure access, no warranty is given that the Service will be error-free, uninterrupted, timely, or completely secure. To the maximum extent permitted under applicable Indian law, all warranties, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement, are hereby disclaimed.
                    </p>
                    <p className="mt-4 font-semibold">
                        Use of the Service is at the User’s own discretion and risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">3</span>
                        Limitation of Liability
                    </h2>
                    <p>
                        To the fullest extent permitted by applicable law, DOs 4 DOERs and its creator shall not be liable for any indirect, incidental, special, consequential, or exemplary damages, including but not limited to loss of profits, loss of data, loss of goodwill, or business interruption, arising out of or in connection with the use of or inability to use the Service.
                    </p>
                    <p className="mt-4">
                        Nothing in these Terms shall exclude liability for fraud, wilful misconduct, or any liability which cannot be excluded under Indian law.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">4</span>
                        Indemnification
                    </h2>
                    <p>
                        You agree to indemnify, defend, and hold harmless DOs 4 DOERs and its creator from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising out of or related to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>(a) your use or misuse of the Service;</li>
                        <li>(b) your violation of these Terms; or</li>
                        <li>(c) your violation of any applicable law or third-party rights.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">5</span>
                        Governing Law and Jurisdiction
                    </h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of India. Any dispute, claim, or controversy arising out of or in connection with these Terms or the use of the Service shall be subject to the exclusive jurisdiction of the competent courts in India.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">6</span>
                        Severability
                    </h2>
                    <p>
                        If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall continue in full force and effect.
                    </p>
                </section>
            </div>

            <footer className="pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-400 text-sm">
                    Questions? Contact us at support@dos4doers.com
                </p>
            </footer>
        </div>
    );
}
