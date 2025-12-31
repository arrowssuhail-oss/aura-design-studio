

export interface ProjectPageData {
    heroTitle: string;
    heroDescription: string;
    heroImage?: string; // URL
    gallery?: string[]; // Array of image URLs/data for slideshow
    challenge: string;
    solution: string;
    features: string[];
    role: string;
    timeline: string;
    tools: string;
    year: string;
}

export const defaultPageContent: Record<number, ProjectPageData> = {
    1: { // Graphic Design (Identity)
        heroTitle: "Custom & Unique Identity",
        heroDescription: "A complete brand identity overhaul for a modern tech startup, encompassing logo design, color systems, typography, and comprehensive brand guidelines.",
        heroImage: undefined,
        gallery: [],
        challenge: "Establish a unified visual language that communicates innovation through layout and color, ensuring consistent graphic application across all brand touchpoints.",
        solution: "A geometric design framework utilizing a high-contrast color palette and structured typography to create a recognizable and scalable aesthetic for digital interfaces and physical media.",
        features: [
            "Core Brand Assets",
            "Color System",
            "Typography System",
            "Graphic Elements",
            "Brand Guidelines",
            "Visual Language"
        ],
        role: "Graphic Designer",
        timeline: "1/2 Days",
        tools: "Photoshop, Illustrator",
        year: "2025"
    },
    2: { // UX Design
        heroTitle: "Human Centered Design",
        heroDescription: "Transforming conceptual ideas into functional digital products using Figma for precise design systems and WordPress for responsive, live web solutions.",
        gallery: [],
        challenge: "Bridging the gap between complex business requirements and user needs while maintaining a clean, accessible interface.",
        solution: "Applying a user-centered design process to create modular, responsive interfaces that simplify navigation and improve overall digital interactions.",
        features: [
            "User Research & Analysis",
            "Wireframing & Prototyping",
            "Responsive Web Design",
            "Visual Design Systems",
            "Interactive UI Elements",
            "Replace the Checkmarks"
        ],
        role: "Product Designer",
        timeline: "2 Months",
        tools: "Figma, WordPress",
        year: "2025"
    },
    3: { // Web Design
        heroTitle: "AntiGravity",
        heroDescription: "Seamless navigation. Elegant design. Effortless checkout.\" Best for: Clean, modern web layouts where the visuals speak for themselves.",
        heroImage: undefined,
        gallery: [],
        challenge: "The goal was to build a high-converting platform that balances premium aesthetics with the technical capacity to support thousands of products. The architecture focuses on maintaining lightning-fast performance and intuitive navigation despite a vast inventory.",
        solution: "A minimalist approach using strategic whitespace, intuitive filtering, and quick-view modals was implemented to simplify the shopping experience. This streamlined design successfully optimized the checkout flow, resulting in a 35% reduction in cart abandonment.",
        features: [
            "Icon or Illustration",
            "Descriptive Text",
            "Call to Action",
            "Lead with Benefits",
            "Maintain Visual Hierarchy",
            "Mobile Responsiveness"
        ],
        role: "Designer",
        timeline: "2 Months",
        tools: "Figma, VS Code",
        year: "2025"
    },
    4: { // Video Editing
        heroTitle: "Video Editing",
        heroDescription: "A video editing app designed to help users build creative projects through gentle guidance, export tracking, and personalized template recommendations.",
        gallery: [],
        challenge: "Create a high-performance, intuitive desktop experience that encourages deep creative flow without feeling overwhelming, while making complex post-production workflows accessible and actionable.",
        solution: "A modern, streamlined interface with customizable workspaces, responsive real-time previews, and intelligent shortcuts that guide users through the editing process with precision and speed.",
        features: [
            "Multi-track timeline editing",
            "Real-time color correction",
            "Advanced transition engine",
            "Smart proxy management",
            "Dynamic template library",
            "High-bitrate export engine"
        ],
        role: "Video Editor",
        timeline: "1/2 Days",
        tools: "Premiere Pro, After Effects",
        year: "2025"
    }
};
