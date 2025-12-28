import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Legal = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 px-6 pb-20">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Documents</h1>
                        <p className="text-muted-foreground">Last Updated: Dec 28 2025</p>
                    </div>

                    <ScrollArea className="h-[calc(100vh-300px)] pr-6">
                        <div className="space-y-12">
                            <section id="terms" className="scroll-mt-32">
                                <h2 className="text-2xl font-semibold mb-6">Terms and Conditions</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        The terms "we", "us", and "our" refer to Muhammed Suhail K, with a registered/operational office at Arrows Design Malappuram KERALA 673638. The terms "you", "your", "user", and "visitor" refer to any natural or legal person visiting the website or agreeing to purchase from the business.
                                    </p>

                                    <h3 className="text-foreground font-medium mt-4">Key Usage Terms</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Website Content:</strong> The content on this website is subject to change without notice.</li>
                                        <li><strong>No Warranty:</strong> Neither the business nor third parties provide a warranty or guarantee regarding the accuracy, timeliness, performance, or suitability of the information and materials found on the site.</li>
                                        <li><strong>Liability:</strong> Use of any information or materials on the website or product pages is entirely at your own risk. We exclude liability for inaccuracies or errors to the fullest extent permitted by law.</li>
                                        <li><strong>Intellectual Property:</strong> The website contains material owned by or licensed to us, including design, layout, look, appearance, and graphics. Reproduction is prohibited except in accordance with the copyright notice.</li>
                                        <li><strong>Trademarks:</strong> All trademarks reproduced on this website that are not the property of, or licensed to, the operator are acknowledged.</li>
                                        <li><strong>External Links:</strong> The website may include links to other websites for further information and convenience.</li>
                                        <li><strong>Unauthorized Use:</strong> Unauthorized use of information provided by the business may result in a claim for damages and/or be a criminal offense.</li>
                                        <li><strong>Linking:</strong> You may not create a link to this website from another document or website without prior written consent from Muhammed Suhail K.</li>
                                        <li><strong>Legal Jurisdiction:</strong> Any dispute arising from the use of the website or purchases is subject to the laws of India.</li>
                                        <li><strong>Transaction Limits:</strong> We shall be under no liability for any loss or damage arising from the decline of authorization for any transaction on account of a cardholder exceeding the preset limit mutually agreed upon with our acquiring bank.</li>
                                    </ul>
                                </div>
                            </section>

                            <div className="h-px bg-border/50 w-full" />

                            <section id="refund" className="scroll-mt-32">
                                <h2 className="text-2xl font-semibold mb-6">Cancellation and Refund Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    <strong>No Refunds:</strong> No cancellations & refunds are entertained.
                                </p>
                            </section>

                            <div className="h-px bg-border/50 w-full" />

                            <section id="shipping" className="scroll-mt-32">
                                <h2 className="text-2xl font-semibold mb-6">Shipping and Delivery Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    <strong>Policy:</strong> Shipping is not applicable for this business.
                                </p>
                            </section>

                            <div className="h-px bg-border/50 w-full" />

                            <section id="privacy" className="scroll-mt-32">
                                <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>Based on the provided business context and standard Razorpay onboarding requirements:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Data Controller:</strong> Your personal information is collected and managed by Muhammed Suhail K at Arrows Design.</li>
                                        <li><strong>Information Usage:</strong> We use the information provided to facilitate transactions, provide access to website content, and ensure services meet your specific requirements.</li>
                                        <li><strong>Security:</strong> Your use of our website and purchase of services are governed by the laws of India, ensuring your data is handled according to regional legal standards.</li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Legal;
