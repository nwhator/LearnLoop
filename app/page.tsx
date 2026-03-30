import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";
import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="bg-surface text-on-surface min-h-screen flex flex-col">
			<PublicHeader />
			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative pt-12 pb-24 lg:pt-24 lg:pb-40 overflow-hidden">
					<div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10 rounded-l-[10rem]" />
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						<div className="text-left">
							<div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
								<span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
								Gamified Learning Engine
							</div>
							<h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline text-on-surface tracking-tight leading-[0.9] mb-8">
								Master Any Topic <br />
								<span className="gradient-text italic">Through Play</span>
							</h1>
							<p className="max-w-xl text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed">
								Transform boring PDFs and dry notes into high-stakes quests. Build your knowledge base while earning XP and climbing global leaderboards.
							</p>
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
								<Link href="/register" passHref legacyBehavior>
									<Button as="a" className="px-10 py-5 text-lg" variant="primary">
										Start Your First Quest
									</Button>
								</Link>
								<Link href="/demo" passHref legacyBehavior>
									<Button as="a" variant="glass" className="text-lg">
										<span className="material-symbols-outlined bg-white shadow-md p-3 rounded-full border border-surface-container-low mr-2">play_circle</span>
										See How It Works
									</Button>
								</Link>
							</div>
							<div className="mt-12 flex items-center gap-4">
								<div className="flex -space-x-3">
									<img alt="User" className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiz-UCdFxiPgwwvFV372e6CUeTmiCHSzSmtXPIDipKbq8RA5p4_Y3RQwPyFK_1Tx3ZmnrXnGwwB000GVUKXFwEzTItFin6dLgIHh9lQyH0RdQ9ypfa0r95ZgiQ2mgcJc7PyWhQC7CrF69AnO3bASMr_-XBWn0v2CNSW4-X8Uq87jLjQjGYzGUrTZOYUgnwvuKM8Gc9wQQiXPrHRQXQkSdzYku5ghn-VF5PklV_G5S8zb_fBDvesuaWVuKDMlFnmzUVHKB27EsUy8A" />
									<img alt="User" className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRX02B8w71K-ki9askVKN9OZ1zzLRe-M96Gx0ZlB0wFQOkOUQFRVpeZaglNoDRwkMUhy2MmnEYwGjMb3jTSUYSYnZL41nVMG8Jfgod0AGjrhmWZs9ETNoozvIkBNIHpmVbUbwLGQU3WoOfOkxBRqurRRZynZJvy6ND3DZqXFNqYyUqDThoUsRSj2M2pgMz1nSVLRja-IEy_U7tvZCkYoB1N4hNiiVPiJoJm3FmHWCMn4nvGnPWZrj86C0jGabHEtv5FaQb2k87BXM" />
									<img alt="User" className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_kzos5xMgGY0Lc0IXz_gDVhitX7u_hdnB-nn0CssBYJ3UmN8xHrI7y46z5uRH4Ul1d3KJO17E7SncUi4yENIhUFQB0s5G_qDQV4zcOBkb8Yh7J5cPZxRIXJWvCu9AI3BHwTQJs92vqjD2LEpUyKtbY55z_yT8TpmYWlRlEAOS2iha2XjZVNT9hMgDHrKJKMlScJnH7JMPkLIJuKXSRGyDbEjo4q9C_Lf547lbbG2yeeYxkOPJ4fCgYwtQV9urq-yLtz5WI3qO77E" />
								</div>
								<p className="text-sm font-medium text-on-surface-variant">Joined by <span className="text-primary font-bold">12,000+</span> active scholars</p>
							</div>
						</div>
						<div className="relative hidden lg:block">
							<div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
								<img alt="Student studying with tablet and books" className="w-full h-auto object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtE-K3mg-OV632dgWTwsYO8N_wQHPIIOxZDll00o3ddY1ZXB_YA6_IWiEsuEbtDye5YjuE_Q2SrveJXYhWNuKTZtTxNi3aIuHikAzbVh-RqlNQe0YOGqLpLiBMQbXFC78HlvWdd62qd7vkuQiO7B6OxI7thUsHQYoDYYg1NFbtcvnPUlUTDgeSuAuWQdUKluNWpu5RAUuAfrnggbiO8lqdl2T4nQsYTPikDOwx3h7QJ5xwrpBzKTDejkZEfxPdvilgKlknU1W3B4k" />
							</div>
							{/* XP Badge Floating */}
							<div className="absolute -top-6 -right-6 glass-card p-6 rounded-3xl shadow-xl animate-float z-20">
								<div className="flex flex-col items-center gap-2">
									<div className="w-14 h-14 bg-tertiary-container rounded-2xl flex items-center justify-center">
										<span className="material-symbols-outlined text-on-tertiary-container text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
									</div>
									<p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Level Up</p>
									<p className="text-2xl font-black">+250 XP</p>
								</div>
							</div>
							{/* Progress Card Floating */}
							<div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl shadow-xl animate-float hidden sm:block z-20" style={{ animationDelay: "-2s" }}>
								<p className="text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Macroeconomics Mastery</p>
								<div className="flex items-center gap-4 mb-2">
									<div className="flex-1 h-3 bg-surface-container-low rounded-full overflow-hidden">
										<div className="w-3/4 h-full bg-gradient-to-r from-primary to-secondary" />
									</div>
									<span className="text-sm font-bold">75%</span>
								</div>
								<p className="text-[10px] text-on-surface-variant italic">Next Reward: Silver Badge</p>
							</div>
						</div>
					</div>
				</section>

				{/* Product Interface Showcase */}
				<section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-headline">Your Personal Knowledge Forge</h2>
							<p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
								Upload any material. Our AI carves out the core concepts and builds a personalized curriculum designed for flow-state learning.
							</p>
						</div>
						{/* ... Product UI mockup and leaderboard ... */}
					</div>
				</section>

				{/* Features */}
				<section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
					<div className="max-w-7xl mx-auto">
						<div className="grid md:grid-cols-3 gap-8">
							<div className="p-10 rounded-[2.5rem] bg-surface-container-low hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-surface-container-low group">
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
									<span className="material-symbols-outlined text-primary text-3xl">psychology</span>
								</div>
								<h3 className="text-2xl font-black mb-4">AI Deep Scan</h3>
								<p className="text-on-surface-variant leading-relaxed">
									Upload notes, books, or web links. Our neural engine extracts key concepts and creates interactive flashcards automatically.
								</p>
							</div>
							<div className="p-10 rounded-[2.5rem] bg-surface-container-low hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-surface-container-low group lg:translate-y-8">
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
									<span className="material-symbols-outlined text-secondary text-3xl">emoji_events</span>
								</div>
								<h3 className="text-2xl font-black mb-4">Progression Loops</h3>
								<p className="text-on-surface-variant leading-relaxed">
									Turn study sessions into RPG-style quests. Earn badges, unlock new skill trees, and level up as you master difficult topics.
								</p>
							</div>
							<div className="p-10 rounded-[2.5rem] bg-surface-container-low hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-surface-container-low group">
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
									<span className="material-symbols-outlined text-tertiary text-3xl">groups</span>
								</div>
								<h3 className="text-2xl font-black mb-4">Peer Squads</h3>
								<div className="text-on-surface-variant leading-relaxed">
									Join specialized study groups. Compete in group missions, share resources, and help your squad climb the global ranking.
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Social Proof */}
				<section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low relative overflow-hidden">
					<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
						<div className="order-2 lg:order-1 relative">
							<div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
								<img alt="Study group working together" className="w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdFJr-fyEE7qo3YUuiBSMKTQfgoXHufrGvbgdxD5qE7VV1HCEwRatesSXkW_OINudm3UMW60G0upa-LVGNvuZChZ4tcYcEnZYRf5YBJD4qYVq_vcs-GPg06BFxIEm5ISvOm4lVfWp2N3vTDJwoXF3J_XFjBne9c7IlkpZIRCQAtwGOCgN8ak16GPuk0Bc-JO3iYkWUORdBJBIFj-TthN3tSVXT5nO38wICrk6lKbI7iS7zM7kfrB2PgkO6eW8ct-FeBv_TcbuUDbc" />
								<div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
								<div className="absolute bottom-8 left-8 right-8 text-white">
									<div className="flex items-center gap-2 mb-2">
										<span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
										<span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
										<span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
										<span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
										<span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
									</div>
									<p className="text-lg font-bold italic leading-relaxed">"LearnLoop turned my Bar Exam prep from a nightmare into a game I actually wanted to play. I've never felt more prepared."</p>
									<p className="mt-4 font-bold text-sm uppercase tracking-widest">— Maria J., Law Graduate</p>
								</div>
							</div>
						</div>
						<div className="order-1 lg:order-2">
							<h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight font-headline">The Modern Standard for <span className="text-primary italic">Deep Learning</span></h2>
							<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
								Used by medical students, engineers, and life-long learners who value their time and mental energy.
							</p>
							<div className="grid grid-cols-2 gap-6">
								<div className="bg-white p-6 rounded-2xl shadow-sm">
									<p className="text-3xl font-black text-primary mb-1">98%</p>
									<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Retention Rate</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm">
									<p className="text-3xl font-black text-secondary mb-1">50M+</p>
									<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">XP Earned</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm">
									<p className="text-3xl font-black text-tertiary mb-1">4.9/5</p>
									<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">App Rating</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm">
									<p className="text-3xl font-black text-primary mb-1">10k+</p>
									<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Active Squads</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
					<div className="bg-primary rounded-[3rem] py-20 px-8 sm:px-16 text-center text-on-primary relative overflow-hidden shadow-2xl shadow-primary/20">
						<div className="absolute inset-0 opacity-20 pointer-events-none select-none">
							<svg className="w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
								<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
									<path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
								</pattern>
								<rect width="100" height="100" fill="url(#grid)" />
							</svg>
						</div>
						<div className="relative z-10">
							<h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight font-headline">Ready to Level Up Your Mind?</h2>
							<p className="text-on-primary/90 mb-12 max-w-xl mx-auto text-lg md:text-xl font-medium">
								Join the thousands of learners who have turned their study materials into a competitive advantage.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link href="/register" passHref legacyBehavior>
									<Button as="a" className="px-12 py-5 text-xl font-black" variant="glass">
										Get Started Free
									</Button>
								</Link>
								<Link href="/premium" passHref legacyBehavior>
									<Button as="a" className="px-12 py-5 text-xl font-bold border-2 border-white/30" variant="primary">
										Compare Plans
									</Button>
								</Link>
							</div>
							<p className="mt-8 text-sm text-on-primary/70">No credit card required. Start earning XP immediately.</p>
						</div>
					</div>
				</section>
			</main>
			<PublicFooter />
		</div>
	);
}
