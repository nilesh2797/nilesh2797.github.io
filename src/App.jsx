import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Mail, Moon, Sun, ExternalLink, ArrowLeft, X, GraduationCap, Github, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Theme Toggle
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // --- AUTO-LOADER & PARSER ---
  useEffect(() => {
    async function loadPosts() {
      const modules = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default' });
      const posts = [];

      for (const path in modules) {
        try {
          const rawContent = await modules[path]();
          const parsed = parseFrontmatter(rawContent);
          const id = path.split('/').pop().replace('.md', '');

          posts.push({
            id,
            ...parsed.metadata,
            content: parsed.content
          });
        } catch (e) {
          console.error("Error loading post:", path, e);
        }
      }

      posts.sort((a, b) => {
         if (!a.date) return 1;
         if (!b.date) return -1;
         return new Date(b.date) - new Date(a.date);
      });

      setPublications(posts);
      setLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${darkMode ? 'bg-[#1a1b1e] text-[#e5e7eb]' : 'bg-[#ffffff] text-[#2e2e2e]'}`} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} publications={publications} loading={loading} toggleTheme={toggleTheme} />} />
          <Route path="/publications/:id/" element={<PublicationPage darkMode={darkMode} publications={publications} toggleTheme={toggleTheme} />} />
        </Routes>

        <footer className={`mt-32 pt-10 border-t text-sm text-center ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-100 text-gray-400'}`}>
          <p>&copy; 2025 Nilesh Gupta.</p>
        </footer>
      </div>
    </div>
  );
}

// --- HEADER COMPONENT ---
function Header({ darkMode, toggleTheme }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
      <Link to="/" className="cursor-pointer group">
        <h1 className={`text-4xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
          Nilesh Gupta
        </h1>
      </Link>

      <nav className="flex items-center gap-6 text-lg font-bold">
        <a href="#publications" className="hover:opacity-70 transition-opacity">
          Publications
        </a>
        <a href="#" className="hover:opacity-70 transition-opacity">
          Blogs
        </a>
        <a href="/media/CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
          CV
        </a>
        <button onClick={toggleTheme} className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
}

// --- HOME PAGE COMPONENT ---
function HomePage({ darkMode, publications, loading, toggleTheme }) {
  return (
    <main className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      {/* Hero Section */}
      <section className="mb-16">
        <div className="flex flex-col-reverse md:flex-row-reverse items-start gap-12 md:gap-16 mb-8">
          <div className="flex-1">
            <div className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ lineHeight: '1.8', fontWeight: '500' }}>
              <p className="mb-4">
                I am final year CS PhD student at <a href="https://www.utexas.edu/">UT Austin</a> advised by <a href="https://www.cs.utexas.edu/~inderjit/" className=''>Inderjit Dhillon</a>.
              </p>
              <p className="mb-4">
              My research focuses on <span class="">End-to-end Information Retrieval</span> and <span class="">Efficient Large Language Models (LLMs)</span>. During my PhD, I have worked closely with <a href="https://www.prateekjain.org/">Prateek Jain</a>, <a href="https://www.felixyu.org/">Felix Yu</a> and <a href="https://web.cs.ucla.edu/~chohsieh/">Cho-jui Hsieh</a> across <a href="https://research.google/">Google Research</a> & <a href="https://deepmind.google/">Deepmind</a>.
              </p>
              <p className='mb-4'>
              Before PhD, I spent 2 years at <a href="https://www.microsoft.com/en-us/research/lab/microsoft-research-india/">MSR India</a> working with <a href="http://manikvarma.org/">Manik Varma</a>. I completed my undergraduate with Honours in CS from <a href="https://www.iitb.ac.in/">IIT Bombay</a>.
              </p>
            </div>
            <div className={`p-5 rounded-lg border-l-4 text-sm font-medium leading-6`} style={{
          backgroundColor: darkMode ? 'rgba(191, 87, 0, 0.1)' : 'rgba(191, 87, 0, 0.08)',
          borderColor: 'rgba(191, 87, 0, 1)',
          color: darkMode ? 'rgba(191, 87, 0, 0.8)' : 'rgb(71, 85, 105)'
        }}>
          I am on the industry job market next year (starting summer). Please <a href="mailto:nilesh@cs.utexas.edu" class="underline">reach out</a> if you think I am a good fit!
        </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center gap-6 self-center md:self-start">
            <div className="w-48 h-48 md:w-56 md:h-56 relative">
              <img src="/assets/me2.jpg" alt="Nilesh Gupta" className="w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out"/>
            </div>
            <div className="flex gap-6 justify-center">
              <SocialIcon icon={<Mail size={20} />} href="mailto:nilesh@cs.utexas.edu" label="Email" />
              <SocialIcon icon={<X size={20} />} href="https://x.com/nileshgupta2797" label="Twitter" />
              <SocialIcon icon={<GraduationCap size={20} />} href="https://scholar.google.com/citations?user=WDF2ldUAAAAJ&hl=en" label="Scholar" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/nilesh-gupta-iitb/" label="Linkedin" />
              <SocialIcon icon={<Github size={20} />} href="https://github.com/nilesh2797" label="Github" />
            </div>
          </div>
        </div>

        {/* Job market announcement - full width */}
        
      </section>

      {/* News Section */}
      <section className="mb-16">
        <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
          News
          <span className={`h-px flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></span>
        </h2>
        <div className={`max-h-48 overflow-y-auto pr-2 ${darkMode ? '[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-gray-800' : '[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100'} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full`}>
          <ul className="space-y-5">
          <li className="flex gap-4 items-baseline">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-md ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'} uppercase`}>
                Nov 25
              </span>
              <span className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Gave <a href="https://docs.google.com/presentation/d/1fSW3Ur5NHgaHApceDPoZuSfqj1wHX0wAl1KfrsowTqw/edit?usp=sharing">PhD Proposal Talk</a> on Towards Unified and Scalable End-to-end Search
              </span>
            </li>
            <li className="flex gap-4 items-baseline">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-md ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'} uppercase`}>
                Nov 25
              </span>
              <span className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Released our work on <a href="/publications/lattice/">LLM-guided hierarchical retrieval</a>, gets 3rd place on <a href="https://brightbenchmark.github.io/">BRIGHT</a> leaderboard
              </span>
            </li>
            <li className="flex gap-4 items-baseline">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-md ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'} uppercase`}>
                Oct 25
              </span>
              <span className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Gave <a href="https://docs.google.com/presentation/d/1zyvgCIZIjomIDUjeDOcdoiA55SGiiAe89Oz-Fm_KeYY/edit?usp=sharing">Talk</a> at Amazon AWS Transform team
              </span>
            </li>
            <li className="flex gap-4 items-baseline">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-md ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'} uppercase`}>Oct 25</span>
              <span className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <a href="publications/blockrank/">BlockRank</a> accepted at NeurIPS 2025, see y'all at San Diego!
              </span>
            </li>
            <li className="flex gap-4 items-baseline">
              <span className={`text-[11px] font-bold tracking-wider px-2 py-1 rounded-md ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'} uppercase`}>
                May 25
              </span>
              <span className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Started Internship at Google with Inderjit Dhillon & Cho-Jui Hsieh.
              </span>
            </li>

          </ul>
        </div>
      </section>

      {/* Publications List */}
      <section id="publications" className="mb-16">
        <h2 className={`text-3xl font-bold mb-10 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
          Selected Publications
          <span className={`h-px flex-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></span>
        </h2>

        <div>
          {loading ? (
            <p className="text-gray-500 italic">Loading publications from src/posts/...</p>
          ) : (
            publications.map((paper, index) => {
              const currentYear = paper.date ? new Date(paper.date).getFullYear() : null;
              const prevYear = index > 0 && publications[index - 1].date
                ? new Date(publications[index - 1].date).getFullYear()
                : null;
              const showYear = currentYear && currentYear !== prevYear;

              // Check if next publication is from same year
              const nextYear = index < publications.length - 1 && publications[index + 1].date
                ? new Date(publications[index + 1].date).getFullYear()
                : null;
              const sameYearNext = currentYear && nextYear && currentYear === nextYear;

              return (
                <React.Fragment key={paper.id}>
                  <div className="flex gap-8 items-start">
                    {/* Year label in left margin */}
                    <div className="hidden md:block w-16 flex-shrink-0 pt-1">
                      {showYear && (
                        <span className={`text-lg font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {currentYear}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <PaperEntry data={paper} darkMode={darkMode} />
                    </div>
                  </div>
                  {index < publications.length - 1 && (
                    sameYearNext ? (
                      // Same year: offset separator to align with content
                      <div className="flex gap-8 items-start">
                        <div className="hidden md:block w-16 flex-shrink-0"></div>
                        <div className="flex-1">
                          <hr className={`my-8 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />
                        </div>
                      </div>
                    ) : (
                      // Different year: full width separator
                      <hr className={`my-10 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />
                    )
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

// --- PUBLICATION PAGE COMPONENT ---
function PublicationPage({ darkMode, publications, toggleTheme }) {
  const { id } = useParams();
  const currentPaper = publications.find(p => p.id === id);
  const [activeSection, setActiveSection] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Extract headings from markdown content
  useEffect(() => {
    if (currentPaper?.content) {
      const extractedHeadings = extractHeadings(currentPaper.content);
      setHeadings(extractedHeadings);
    }
  }, [currentPaper]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(element.id);
          return;
        }
      }
      if (headingElements.length > 0) {
        setActiveSection(headingElements[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!currentPaper) {
    return (
      <main className="animate-in fade-in duration-500">
        <p className="text-gray-500">Publication not found.</p>
      </main>
    );
  }

  return (
    <main className="animate-in fade-in duration-500">
      {/* Hover-activated top navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50 group/nav">
        {/* Invisible hover trigger area */}
        <div className="h-16 w-full absolute top-0" />

        {/* Actual navigation bar - slides down on hover */}
          <div className={`
            transition-all duration-300 ease-in-out
            -translate-y-full group-hover/nav:translate-y-0
            ${darkMode ? 'bg-[#1a1b1e]/95' : 'bg-white/95'}
            backdrop-blur-sm
            border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}
            shadow-lg
          `}>
            <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link to="/" className="group flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
              </div>

              <article>
          <header className="mb-12 text-center flex flex-col">
            <h1 className={`text-3xl md:text-4xl font-semibold mb-4 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              {currentPaper.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {currentPaper.venue && (
                  <span className={`px-3 py-1 rounded text-xs font-bold leading-relaxed tracking-widest uppercase border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
              {currentPaper.venue}
                  </span>
                )}
              <div className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentPaper.authors && currentPaper.authors.map((author, index) => (
            <span key={index}>
              <span dangerouslySetInnerHTML={{ __html: author }} />
              {index < currentPaper.authors.length - 1 ? ", " : ""}
            </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
              {currentPaper.links && currentPaper.links.map((link) => (
                <a
            key={link.label}
            href={link.href}
            className="text-medium font-bold underline flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors"
            style={{ color: 'rgba(191, 87, 0, 1)' }}
                >
            <ExternalLink size={18} />
            {link.label}
                </a>
              ))}
            </div>
          </header>

          {/* <hr className={`border-t mb-12 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`} /> */}

          {/* Table of Contents - After header, before content */}
        {headings.length > 0 && (
          <>
            {/* Mobile: Collapsible section */}
            <aside className="block lg:hidden mb-8">
              <details className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-4`}>
                <summary className={`text-sm font-bold uppercase tracking-wider cursor-pointer ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contents
                </summary>
                <nav className="mt-4">
                  <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                      <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className={`block py-1 transition-colors border-l-2 pl-3 ${
                            activeSection === heading.id
                              ? 'border-[rgba(191,87,0,1)] font-medium opacity-100'
                              : darkMode
                              ? 'border-gray-700 hover:opacity-70 hover:border-gray-500'
                              : 'border-gray-200 hover:opacity-70 hover:border-gray-400'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            </aside>
          </>
        )}

        <div className="relative">
          {/* Desktop: Positioned in left margin */}
          {headings.length > 0 && (
            <aside className="hidden lg:block fixed left-0 w-56 top-24" style={{ marginLeft: 'calc((100vw - 1024px) / 2 - 200px)' }}>
              <div>
                <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contents
                </h3>
                <nav>
                  <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                      <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className={`block py-1 transition-colors border-l-2 pl-3 ${
                            activeSection === heading.id
                              ? 'border-[rgba(191,87,0,1)] font-medium opacity-100'
                              : darkMode
                              ? 'border-gray-700 hover:opacity-70 hover:border-gray-500'
                              : 'border-gray-200 hover:opacity-70 hover:border-gray-400'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          <div className={`
            prose max-w-3xl mx-auto
            ${darkMode ? 'prose-invert prose-headings:text-gray-100 prose-p:text-gray-300' : 'prose-slate prose-headings:text-slate-900 prose-p:text-slate-700'}
            prose-base
            prose-headings:font-bold prose-headings:scroll-mt-24
            [&_h1]:font-['Libre Franklin'] [&_h2]:font-['Libre Franklin'] [&_h3]:font-['Libre Franklin'] [&_h4]:font-['Libre Franklin'] [&_h5]:font-['Libre Franklin'] [&_h6]:font-['Libre Franklin']
            prose-p:leading-7 prose-p:mb-5 prose-p:font-medium
            prose-li:font-medium
            prose-a:no-underline hover:prose-a:underline
            prose-code:text-sm prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            ${darkMode ? 'prose-code:bg-gray-800 prose-code:text-gray-200' : 'prose-code:bg-gray-100 prose-code:text-gray-800'}
            ${darkMode ? 'prose-pre:bg-gray-800 prose-pre:text-gray-200 prose-pre:border-gray-700' : 'prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:border-gray-300'}
            prose-pre:border
            prose-img:rounded-lg
            prose-ul:list-disc prose-ol:list-decimal
            prose-strong:font-bold prose-strong:text-current
            prose-blockquote:italic
            [&_a]:text-[rgba(191,87,0,1)]
            [&_ul>li::marker]:text-[rgba(191,87,0,1)]
            [&_ol>li::marker]:text-[rgba(191,87,0,1)]
            [&_blockquote]:border-l-[rgba(191,87,0,1)]
          `}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                h1: ({node, ...props}) => <h1 id={generateId(props.children)} {...props} />,
                h2: ({node, ...props}) => <h2 id={generateId(props.children)} {...props} />,
                h3: ({node, ...props}) => <h3 id={generateId(props.children)} {...props} />,
                h4: ({node, ...props}) => <h4 id={generateId(props.children)} {...props} />,
                h5: ({node, ...props}) => <h5 id={generateId(props.children)} {...props} />,
                h6: ({node, ...props}) => <h6 id={generateId(props.children)} {...props} />,
              }}
            >
              {currentPaper.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Back to Home link at bottom */}
      <div className="mt-16 mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}

// --- SUBCOMPONENTS ---
function SocialIcon({ icon, href, label }) {
  return (
    <a href={href} className="hover:opacity-70 transition-all transform hover:-translate-y-1 hover:scale-110 duration-200" aria-label={label}>
      {icon}
    </a>
  );
}

function PaperEntry({ data, darkMode }) {
  const { title, authors, venue, summary, links, id } = data;
  return (
    <article className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className={`text-xl md:text-xl font-semibold leading-tight tracking-tight`} style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
            <Link
              to={`/publications/${id}/`}
              className="hover:opacity-70 transition-opacity"
              style={{ color: darkMode ? '#E5E7EB' : '#1F2937' }}
            >
              {title}
            </Link>
          </h3>
          {venue && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border" style={{
              borderColor: 'rgba(191, 87, 0, 0.3)',
              backgroundColor: darkMode ? 'rgba(191, 87, 0, 0.1)' : 'rgba(191, 87, 0, 0.08)',
              color: 'rgba(191, 87, 0, 1)'
            }}>
              {venue}
            </span>
          )}
        </div>

        <p className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {authors && authors.map((author, index) => (
            <React.Fragment key={index}>
              <span dangerouslySetInnerHTML={{ __html: author }} className={author.includes("Nilesh") ? (darkMode ? 'text-gray-100 font-semibold' : 'text-gray-900 font-semibold') : ''} />
              {index < authors.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </p>

        <p className={`text-sm font-medium leading-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {links && links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-bold hover:underline underline-offset-4 transition-colors" style={{ color: 'rgba(191, 87, 0, 1)' }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// --- HELPER: Generate slug from text ---
const generateId = (children) => {
  if (!children) return '';
  const text = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : String(children));
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// --- HELPER: Extract headings from markdown ---
const extractHeadings = (markdown) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateId(text);
    headings.push({ level, text, id });
  }

  return headings;
};

// --- HELPER: Robust Frontmatter Parser ---
const parseFrontmatter = (text) => {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { metadata: {}, content: text };

  const frontmatterRaw = match[1];
  const content = text.slice(match[0].length).trim();
  const metadata = {};

  const extract = (key) => {
    const regex = new RegExp(`${key}:\\s*(?:"|')?(.*?)(?:"|')?\\s*$`, "m");
    const m = frontmatterRaw.match(regex);
    return m ? m[1] : null;
  };

  metadata.title = extract('title');
  metadata.date = extract('date');
  metadata.venue = extract('venue');
  metadata.summary = extract('summary');

  const authorMatch = frontmatterRaw.match(/author:\s*\\?\[(.*?)(\\?\]|$)/);
  if (authorMatch) {
    const rawAuthors = authorMatch[1];
    metadata.authors = rawAuthors.split(',').map(a => a.trim().replace(/^["']|["']$/g, ''));
  }

  const linksMatch = frontmatterRaw.match(/links:\s*([\s\S]*?)(?=\n\w+:|$)/);
  if (linksMatch) {
    const linksBlock = linksMatch[1];
    const rawItems = linksBlock.split(/(?:\r\n|\r|\n)\s*[-*]\s+/);

    metadata.links = rawItems.map(item => {
      if (!item.trim()) return null;

      const textMatch = item.match(/text:\s*["']?(.*?)["']?(\s|$)/);
      const urlMatch = item.match(/url:\s*["']?(.*?)["']?(\s|$)/);

      if (textMatch && urlMatch) {
        return { label: textMatch[1], href: urlMatch[1] };
      }
      return null;
    }).filter(Boolean);
  }

  return { metadata, content };
};
