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
								The Fun Way to Study
							</div>
							<h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline text-on-surface tracking-tight leading-tight lg:leading-[1.1] mb-8 pb-2">
								Master Any Topic <br />
								<span className="gradient-text italic pr-4">Through Play</span>
							</h1>
							<p className="max-w-xl text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed">
								Turn your boring notes and PDFs into fun, interactive games instantly. Level up your grades, earn XP, and climb the leaderboards.
							</p>
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
								<Link href="/register">
									<Button className="px-10 py-5 text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1" variant="primary">
										Start Your First Quest
									</Button>
								</Link>
								<Link href="/demo" className="flex items-center justify-center gap-3 text-on-surface font-bold text-lg hover:text-primary transition-all px-6">
									<span className="material-symbols-outlined bg-white shadow-md p-3 rounded-full border border-surface-container-low">play_circle</span>
									See How It Works
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
							<h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight font-headline">Your Personal Study Buddy</h2>
							<p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
								Upload any lecture note or PDF. We instantly turn the hardest concepts into simple, bite-sized games that make learning a breeze.
							</p>
						</div>
						{/* Product UI Mockup */}
						<div className="relative max-w-5xl mx-auto">
							<div className="absolute -inset-10 bg-primary/10 rounded-[4rem] blur-3xl -z-10"></div>
							<div className="bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden p-2 sm:p-4">
								<div className="bg-surface rounded-2xl border border-surface-container-low p-6">
									<div className="flex items-center justify-between mb-8 border-b border-surface-container-low pb-4">
										<div className="flex gap-2">
											<div className="w-3 h-3 rounded-full bg-red-400"></div>
											<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
											<div className="w-3 h-3 rounded-full bg-green-400"></div>
										</div>
										<div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
											<span className="material-symbols-outlined text-sm text-primary">book_2</span> Course: Advanced AI
										</div>
									</div>
									<div className="grid md:grid-cols-3 gap-6">
										<div className="md:col-span-2 space-y-6">
											<div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-container-low">
												<h4 className="font-bold text-lg mb-4 flex items-center gap-2">
													<span className="material-symbols-outlined text-secondary">quiz</span> Generated Challenge
												</h4>
												<p className="text-on-surface-variant mb-6 italic">&quot;Based on the &apos;Neural Networks&apos; PDF you uploaded, how would back propagation change if the activation function was linear?&quot;</p>
												<div className="space-y-3">
													<div className="p-4 border-2 border-primary/20 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors font-medium">A. The network would collapse to a single layer.</div>
													<div className="p-4 border border-surface-container-low rounded-xl hover:border-primary/20 cursor-pointer transition-colors font-medium">B. Learning rate would become infinite.</div>
													<div className="p-4 border border-surface-container-low rounded-xl hover:border-primary/20 cursor-pointer transition-colors font-medium">C. No change in performance.</div>
												</div>
											</div>
										</div>
										<div className="space-y-6">
											<div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
												<h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-primary">Weekly Leaderboard</h4>
												<div className="space-y-4">
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-3">
															<div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white text-xs">1</div>
															<span className="font-bold text-sm">Alex M.</span>
														</div>
														<span className="text-xs font-bold">14,200 XP</span>
													</div>
													<div className="flex items-center justify-between border-y border-primary/10 py-3">
														<div className="flex items-center gap-3">
															<div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center font-bold text-white text-xs">2</div>
															<span className="font-bold text-sm">Sarah K.</span>
														</div>
														<span className="text-xs font-bold">12,100 XP</span>
													</div>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-3">
															<div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center font-bold text-white text-xs">3</div>
															<span className="font-bold text-sm">You</span>
														</div>
														<span className="text-xs font-bold">11,950 XP</span>
													</div>
												</div>
											</div>
											<button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Resume Mission</button>
										</div>
									</div>
								</div>
							</div>
						</div>
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
								<h3 className="text-2xl font-black mb-4">Instant Flashcards</h3>
								<p className="text-on-surface-variant leading-relaxed">
									Stop wasting time making cards. Drop your notes in, and we magically organize them into fun quizzes and flashcards so you can start playing right away.
								</p>
							</div>
							<div className="p-10 rounded-[2.5rem] bg-surface-container-low hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-surface-container-low group lg:translate-y-8">
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
									<span className="material-symbols-outlined text-secondary text-3xl">emoji_events</span>
								</div>
								<h3 className="text-2xl font-black mb-4">Level Up IRL</h3>
								<p className="text-on-surface-variant leading-relaxed">
									Turn study sessions into epic quests. Earn badges, hit milestones, and level up your rank as you crush difficult topics and build solid study habits.
								</p>
							</div>
							<div className="p-10 rounded-[2.5rem] bg-surface-container-low hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-surface-container-low group">
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
									<span className="material-symbols-outlined text-tertiary text-3xl">groups</span>
								</div>
								<h3 className="text-2xl font-black mb-4">Study with Friends</h3>
								<p className="text-on-surface-variant leading-relaxed">
									Why study alone when you can join a squad? Compete in group challenges, share your best study guides, and climb the leaderboard together.
								</p>
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
										{[1, 2, 3, 4, 5].map(i => (
											<span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
										))}
									</div>
									<p className="text-lg font-bold italic leading-relaxed">&quot;LearnLoop turned my Bar Exam prep from a nightmare into a game I actually wanted to play. I&apos;ve never felt more prepared.&quot;</p>
									<p className="mt-4 font-bold text-sm uppercase tracking-widest">— Maria J., Law Graduate</p>
								</div>
							</div>
						</div>
						<div className="order-1 lg:order-2">
							<h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight font-headline">Join thousands of students <span className="text-primary italic">having fun</span></h2>
							<p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
								Used by high schoolers, college students, and life-long learners who want to get great grades without giving up their free time.
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
							<h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight font-headline">Ready to Start Playing?</h2>
							<p className="text-on-primary/90 mb-12 max-w-xl mx-auto text-lg md:text-xl font-medium">
								Join thousands of learners who've turned their study time into a game they actually enjoy.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link href="/register">
									<Button className="w-full sm:w-auto px-12 py-5 text-xl font-black !bg-white !text-primary shadow-xl hover:scale-105 border-transparent">
										Get Started Free
									</Button>
								</Link>
								<Link href="/premium">
									<Button className="w-full sm:w-auto px-12 py-5 text-xl font-bold border-2 !border-white/30 !bg-transparent hover:!bg-white/10 !text-white">
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

			{/* Mobile Bottom Nav */}
			<nav className="fixed bottom-4 left-4 right-4 h-16 bg-white/90 backdrop-blur-xl border border-surface-container-low shadow-2xl rounded-2xl flex md:hidden justify-around items-center z-[100]">
				<Link href="/" className="flex flex-col items-center gap-1 text-primary">
					<span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
					<span className="text-[10px] font-bold">Home</span>
				</Link>
				<Link href="/missions" className="flex flex-col items-center gap-1 text-on-surface-variant">
					<span className="material-symbols-outlined text-2xl">rocket_launch</span>
					<span className="text-[10px] font-bold">Quests</span>
				</Link>
				<Link href="/leaderboard" className="flex flex-col items-center gap-1 text-on-surface-variant">
					<span className="material-symbols-outlined text-2xl">leaderboard</span>
					<span className="text-[10px] font-bold">Ranks</span>
				</Link>
				<Link href="/profile" className="flex flex-col items-center gap-1 text-on-surface-variant">
					<span className="material-symbols-outlined text-2xl">person</span>
					<span className="text-[10px] font-bold">Profile</span>
				</Link>
			</nav>
		</div>
	);
}
