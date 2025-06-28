'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import React from 'react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'ROI Calculator', href: '#roi-calculator' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'How It Works', href: '#how-it-works' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Documentation', href: '/docs' },
			{ title: 'Support', href: '/support' },
			{ title: 'Status', href: '/status' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
			{ title: 'YouTube', href: '#', icon: YoutubeIcon },
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
		],
	},
];

export function Footer() {
	return (
		<footer 
			className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl md:rounded-t-6xl border-t border-white/10 bg-black/20 backdrop-blur-xl px-6 py-12 lg:py-16 mt-20"
			role="contentinfo"
			aria-label="Site footer"
		>
			{/* Top border glow effect - decorative */}
			<div 
				className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" 
				aria-hidden="true"
			/>

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				{/* Logo and tagline section */}
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-2">
						<div 
							className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
							aria-hidden="true"
						>
							<span className="text-white font-bold text-sm">V</span>
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
							Vibe DevSquad
						</span>
					</div>
					<p className="text-gray-300 text-sm leading-relaxed max-w-xs [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
						Built by a solo entrepreneur using AI orchestration. Scaled for teams of any size.
					</p>
					<p className="text-gray-400 mt-8 text-sm md:mt-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
						© {new Date().getFullYear()} Vibe DevSquad. All rights reserved.
					</p>
				</AnimatedContainer>

				{/* Footer links grid */}
				<nav 
					className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0"
					aria-label="Footer navigation"
				>
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
									{section.label}
								</h3>
								<ul className="space-y-3" role="list">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="text-gray-400 hover:text-white inline-flex items-center transition-all duration-300 text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] hover:[text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
												aria-label={section.label === 'Social Links' ? `Visit our ${link.title} page` : undefined}
											>
												{link.icon && (
													<link.icon 
														className="me-2 size-4 group-hover:text-blue-400 transition-colors" 
														aria-hidden="true"
													/>
												)}
												<span className="group-hover:translate-x-0.5 transition-transform">
													{link.title}
												</span>
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</nav>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export default Footer; 