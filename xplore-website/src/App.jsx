import { useEffect, useState } from "react";

function App() {
  const [screen, setScreen] = useState("landing");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      setScreen(hash === "inquiry" ? "inquiry" : "landing");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const goToScreen = (next) => {
    window.location.hash = next === "inquiry" ? "inquiry" : "landing";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.includes("@")) return "Valid email is required";
    if (!formData.description.trim()) return "Description is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to send your request");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        service: "",
        description: "",
      });
    } catch (submitError) {
      setError(submitError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary-fixed overflow-x-hidden">
      <header className="bg-slate-950/60 backdrop-blur-xl fixed top-0 w-full z-50 shadow-[0_0_20px_rgba(143,245,255,0.05)]">
        <nav className="flex justify-between items-center px-8 h-20 w-full max-w-none">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-10 w-10 object-contain" alt="Xplore Automation logo" />
            <div className="leading-none">
              <div className="text-lg text-slate-50 logo-xplore">XPLORE</div>
              <div className="text-[10px] text-slate-300 logo-automations mt-1">AUTOMATIONS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <button
              className={`${screen === "landing" ? "text-cyan-400 font-bold border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-100"} font-headline text-sm tracking-widest transition-all duration-300`}
              onClick={() => goToScreen("landing")}
            >
              HOME
            </button>
            <button
              className={`${screen === "inquiry" ? "text-cyan-400 font-bold border-b-2 border-cyan-400" : "text-slate-400 hover:text-slate-100"} font-headline text-sm tracking-widest transition-all duration-300`}
              onClick={() => goToScreen("inquiry")}
            >
              INQUIRY
            </button>
          </div>
          <button
            className="signature-gradient text-on-primary-fixed font-headline font-bold px-6 py-2 rounded-md text-xs tracking-widest scale-95 active:scale-90 transition-all duration-300"
            onClick={() => goToScreen("inquiry")}
          >
            CONTACT
          </button>
        </nav>
      </header>

      {screen === "landing" && (
        <main className="pt-20">
          <section className="relative min-h-[795px] flex items-center px-8 lg:px-24 overflow-hidden bg-surface">
          <div className="absolute right-[-10%] top-0 w-3/4 h-full opacity-40 mix-blend-screen pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent"></div>
            <img
              className="w-full h-full object-cover grayscale brightness-150 contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4dUp6Ec1J8qaweoy0vzEZOg598CKazeRNMuTNE27UyJal3fAjUHKblieC_wT5zvILuhioQojy5KCdbZry-wnRufyNzkHjwRtI0XgLCVzYWxmGoG3t-8XmqB_zRlaOM3cpbg_W7wgqKGxExao7rXvbk7N7hnnYCg4LifI1cdXTWNAbu0ly3mchH03nph61US1XVONNqsyeiH3cp9KDIlULSE_zE_RBwyAXE4yLy1JZ6cK4sX9NX-bq_1QvsKLI4MuKW1C2aXuhrQ"
              alt="Abstract data visualization background"
            />
          </div>
          <div className="relative z-10 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-8 border border-outline-variant/15">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">System Active: V.4.0.2</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[1] md:leading-[0.9] mb-6 md:mb-8 text-on-surface">
              THE ORCHESTRATED <br />
              <span className="text-transparent bg-clip-text signature-gradient">INTELLIGENCE.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-body max-w-4xl leading-relaxed mb-8 md:mb-12">
              At Xplore Automation, our vision is to transform how businesses operate by leveraging cutting-edge AI automation, intelligent agents, and high-performance digital platforms. We aim to simplify complex processes, enhance productivity, and deliver scalable web and mobile solutions tailored to every business need. From automation to marketing, we empower companies to grow faster, smarter, and more efficiently in the digital era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
              <button
                className="signature-gradient text-on-primary-fixed px-6 py-4 sm:px-10 sm:py-5 rounded-md font-headline font-bold tracking-widest hover:brightness-110 transition-all text-sm sm:text-base w-full sm:w-auto"
                onClick={() => goToScreen("inquiry")}
              >
                START YOUR PROJECT
              </button>
              <button
                className="bg-surface-container-high text-primary border border-outline-variant/20 px-6 py-4 sm:px-10 sm:py-5 rounded-md font-headline font-bold tracking-widest hover:bg-surface-bright transition-all text-sm sm:text-base w-full sm:w-auto"
                onClick={() => goToScreen("inquiry")}
              >
                SEND REQUIREMENTS
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 px-6 md:px-8 lg:px-24 bg-surface-container-low">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
            <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-highest rounded-xl p-8 md:p-10 border border-outline-variant/10 hover:border-primary/30 transition-all duration-500">
              <h3 className="text-label text-xs tracking-[0.3em] text-primary mb-4 font-bold">01 / ARCHITECTURE</h3>
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 md:mb-6 text-on-surface">Web Development.</h2>
              <p className="text-on-surface-variant font-body max-w-md mb-6 md:mb-8">Fast, scalable websites.</p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-surface-bright text-[10px] font-bold tracking-widest rounded-sm border border-outline-variant/20">REACT</span>
                <span className="px-3 py-1 bg-surface-bright text-[10px] font-bold tracking-widest rounded-sm border border-outline-variant/20">SCALABLE</span>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-high rounded-xl p-8 md:p-10 border border-outline-variant/10 hover:shadow-[0_0_40px_rgba(162,141,255,0.1)] transition-all duration-500">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">auto_awesome</span>
              <h3 className="text-label text-xs tracking-[0.3em] text-on-surface-variant mb-4 font-bold">02 / FLOW</h3>
              <h2 className="text-2xl font-bold font-headline mb-4 text-on-surface">AI Automation.</h2>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">Automate repetitive business processes with reliable, scalable workflows.</p>
            </div>

            <div className="md:col-span-12 relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 md:p-12 border border-outline-variant/20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full">
                <h3 className="text-label text-xs tracking-[0.3em] text-secondary mb-4 font-bold">03 / COGNITION</h3>
                <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 md:mb-8 text-on-surface leading-none">Services.</h2>
                <ul className="space-y-4 mb-8 md:mb-10">
                  <li className="flex items-center gap-3 text-on-surface-variant font-body"><span className="material-symbols-outlined text-primary">check_circle</span>AI Automation - Automate repetitive business processes</li>
                  <li className="flex items-center gap-3 text-on-surface-variant font-body"><span className="material-symbols-outlined text-primary">check_circle</span>AI Agents - Intelligent assistants for workflows</li>
                  <li className="flex items-center gap-3 text-on-surface-variant font-body"><span className="material-symbols-outlined text-primary">check_circle</span>Web Development - Fast, scalable websites</li>
                  <li className="flex items-center gap-3 text-on-surface-variant font-body"><span className="material-symbols-outlined text-primary">check_circle</span>App Development - Modern mobile apps</li>
                  <li className="flex items-center gap-3 text-on-surface-variant font-body"><span className="material-symbols-outlined text-primary">check_circle</span>Social Media Marketing - Growth-focused strategies</li>
                </ul>
                <button
                  className="bg-primary text-on-primary-fixed px-6 py-4 md:px-8 md:py-4 rounded-md font-headline font-bold text-sm tracking-widest w-full sm:w-auto"
                  onClick={() => goToScreen("inquiry")}
                >
                  TELL US WHAT YOU NEED
                </button>
              </div>
            </div>
          </div>
          </section>

          <section className="py-16 md:py-24 bg-surface border-y border-outline-variant/10">
            <div className="px-6 md:px-8 lg:px-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center items-start">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-primary mb-2">98.5%</div>
                <div className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-on-surface-variant font-bold uppercase leading-tight">Uptime Protocol</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-secondary mb-2">3.2k+</div>
                <div className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-on-surface-variant font-bold uppercase leading-tight">Tasks Automated</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-primary mb-2">1.8s</div>
                <div className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-on-surface-variant font-bold uppercase leading-tight">Avg Latency</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-headline text-secondary mb-2">120k</div>
                <div className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-on-surface-variant font-bold uppercase leading-tight">API Calls Daily</div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 px-6 md:px-8 lg:px-24">
            <div className="signature-gradient rounded-2xl p-8 md:p-16 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-700"></div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-headline text-on-primary-fixed mb-6 md:mb-8 tracking-tighter">
                  READY TO UPGRADE <br className="hidden sm:block" />
                  YOUR REALITY?
                </h2>
                <p className="text-on-primary-fixed/80 font-body text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-12">
                  Tell us what you want to automate and we will design the right AI-powered workflow for your business.
                </p>
                <button
                  className="bg-on-primary-fixed text-primary px-8 py-4 md:px-12 md:py-6 rounded-md font-headline font-black tracking-widest text-sm md:text-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                  onClick={() => goToScreen("inquiry")}
                >
                  SEND YOUR REQUIREMENT
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {screen === "inquiry" && (
        <main className="min-h-screen pt-28 pb-16 md:pt-32 md:pb-20 relative flex flex-col items-center justify-center geometric-bg px-4 sm:px-6 overflow-hidden">
          <div className="w-full max-w-4xl text-left mb-10 md:mb-12 mt-6 md:mt-0">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary-fixed-dim">Project Initiation Phase</span>
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-on-background mb-4 md:mb-6">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary break-words">Journey.</span>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Xplore Automation provides AI Automation, AI Agents, Web & App Development, and Social Media Marketing services to help businesses scale and operate efficiently.
            </p>
          </div>

          <section className="w-full max-w-4xl glass-panel border border-outline-variant/20 p-6 sm:p-8 md:p-12 rounded-xl relative overflow-hidden">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 font-body text-on-surface focus:ring-1 focus:ring-primary/50 placeholder:text-outline transition-all" placeholder="Your full name" type="text" />
              </div>

              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Secure Email Protocol</label>
                <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 font-body text-on-surface focus:ring-1 focus:ring-primary/50 placeholder:text-outline transition-all" placeholder="user@network.com" type="email" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Service</label>
                <input name="service" value={formData.service} onChange={handleChange} className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 font-body text-on-surface focus:ring-1 focus:ring-primary/50 placeholder:text-outline transition-all" placeholder="AI Automation / AI Agents / Web Development / App Development / Social Media Marketing" type="text" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center justify-between">
                  Brief Project Description
                  <span className="text-primary/40">MANDATORY</span>
                </label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-surface-container-high border-none rounded-lg p-4 font-body text-on-surface focus:ring-1 focus:ring-primary/50 placeholder:text-outline transition-all resize-none" placeholder="Define the scope of your automation requirements..." rows="4"></textarea>
              </div>

              {error && <p className="md:col-span-2 text-sm text-error">{error}</p>}
              {success && <p className="md:col-span-2 text-sm text-primary">Your request has been submitted successfully</p>}

              <div className="md:col-span-2 flex justify-end mt-4">
                <button disabled={loading} className="group relative px-12 py-5 bg-gradient-to-r from-primary to-secondary rounded-lg font-headline font-bold text-on-primary-fixed tracking-tight hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-3">{loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}</span>
                </button>
              </div>
            </form>
          </section>
        </main>
      )}

      <footer className="bg-slate-950 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-800/50">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-8 w-8 object-contain" alt="Xplore Automation logo" />
            <div className="leading-none">
              <div className="text-cyan-400 text-sm logo-xplore">XPLORE</div>
              <div className="text-slate-400 text-[9px] logo-automations mt-1">AUTOMATIONS</div>
            </div>
          </div>
          <p className="font-['Inter'] text-xs uppercase tracking-[0.2em] text-slate-500">© 2026 XPLORE AUTOMATION. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
