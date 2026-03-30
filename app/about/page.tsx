import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | LearnLoop",
  description: "Meet the team making learning fun again. Discover our mission to end boring study sessions and turn education into an adventure.",
};

export default function AboutPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body selection:bg-primary-container selection:text-on-primary-container">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-primary text-on-primary">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed-dim rounded-full blur-[120px] opacity-20 -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-[100px] opacity-10 -ml-40 -mb-40 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-tight mb-8">
              Bringing the <span className="italic opacity-90 text-primary-fixed">Fun</span> Back to Learning.
            </h1>
            <p className="text-xl md:text-2xl text-on-primary/80 font-medium leading-relaxed max-w-3xl mx-auto">
              We're a passionate team of creators, gamers, and students on a mission to end boring study sessions forever.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
                <span className="material-symbols-outlined text-base">rocket_launch</span>
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-8 leading-tight">
                Make Learning Feel Like <span className="text-primary italic">Play</span>.
              </h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  We've all been there—staring at dry textbooks for hours, feeling totally unmotivated, and wishing we were doing anything else. At LearnLoop, we believe learning should be just as engaging as playing your favorite video games.
                </p>
                <p>
                  By taking the tedious parts out of studying and adding in proven fun mechanics—like XP, streaks, badges, and playing with friends—we're creating an app perfectly designed to help you crush your goals with a smile.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-surface-container-low rounded-[3rem] p-8 border border-outline-variant/20 shadow-premium relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-4">psychology</span>
                    <h3 className="font-black text-2xl mb-1">50M+</h3>
                    <p className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Flashcards</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center translate-y-6">
                    <span className="material-symbols-outlined text-secondary text-4xl mb-4">public</span>
                    <h3 className="font-black text-2xl mb-1">120+</h3>
                    <p className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Countries</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-tertiary text-4xl mb-4">groups</span>
                    <h3 className="font-black text-2xl mb-1">12k</h3>
                    <p className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Study Squads</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center translate-y-6">
                    <span className="material-symbols-outlined text-error text-4xl mb-4">local_fire_department</span>
                    <h3 className="font-black text-2xl mb-1">2.4M</h3>
                    <p className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Total Streaks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6 bg-surface-container-lowest border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-16">Why We Built This</h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-10 rounded-[2.5rem] bg-surface-container-low border border-transparent hover:border-surface-container-high transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-primary">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="text-2xl font-black mb-4 font-headline">Zero Friction Prep</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Making flashcards takes too much time. You just drop your notes in, and we instantly generate a fun study session for you.
                </p>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-surface-container-low border border-transparent hover:border-surface-container-high transition-all group lg:-translate-y-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-secondary">
                  <span className="material-symbols-outlined text-3xl">sports_esports</span>
                </div>
                <h3 className="text-2xl font-black mb-4 font-headline">Reward Your Effort</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Studying doesn't have to feel like a chore. Earning XP, hitting milestones, and unlocking badges make hard work satisfying.
                </p>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-surface-container-low border border-transparent hover:border-surface-container-high transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-tertiary">
                  <span className="material-symbols-outlined text-3xl">hub</span>
                </div>
                <h3 className="text-2xl font-black mb-4 font-headline">Better Together</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Studying alone gets lonely fast. We make it easy to team up with friends, share resources, and help each other succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center bg-surface">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-6">Ready to Join the Revolution?</h2>
            <p className="text-xl text-on-surface-variant mb-10">We're always looking for brilliant minds to join our team or become power users.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/register">
                    <Button variant="primary" className="px-10 py-4 text-lg w-full sm:w-auto hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                        Join the Beta
                    </Button>
                </Link>
                <Link href="/support">
                    <Button variant="glass" className="px-10 py-4 text-lg w-full sm:w-auto !bg-surface flex items-center gap-2">
                        Get in Touch
                    </Button>
                </Link>
            </div>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
