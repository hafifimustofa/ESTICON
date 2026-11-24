const projects = [
  { number: "128", label: "Proyek selesai", accent: "text-amber-300" },
  { number: "14", label: "Tahun pengalaman", accent: "text-white" },
  { number: "32", label: "Kota terhubung", accent: "text-white" },
];

const services = [
  {
    code: "01",
    title: "Rekayasa Struktur",
    description:
      "Perhitungan presisi untuk struktur yang tangguh, efisien, dan siap menghadapi masa depan.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 40h32M12 40V12h24v28M12 20h24M18 12v28M30 12v28" />
        <path d="m12 20 6-8 6 8 6-8 6 8" />
      </svg>
    ),
  },
  {
    code: "02",
    title: "Infrastruktur",
    description:
      "Jalan, jembatan, dan sistem perkotaan yang dirancang untuk menghubungkan setiap kemungkinan.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 38h36M10 38V24M38 38V24M10 26c7 0 8-10 14-10s7 10 14 10" />
        <path d="M16 35v3M24 32v6M32 35v3M6 24h36" />
      </svg>
    ),
  },
  {
    code: "03",
    title: "Manajemen Konstruksi",
    description:
      "Mengawal mutu, waktu, dan biaya dari garis pertama hingga bangunan berdiri sempurna.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 40V9h20v31M11 17h20M17 9v31M25 9v31M7 40h34" />
        <path d="M31 22h7v18M31 29h7" />
      </svg>
    ),
  },
];

function CraneScene() {
  return (
    <div className="crane-scene" aria-hidden="true">
      <div className="sun-disc" />
      <div className="blueprint-ring ring-one" />
      <div className="blueprint-ring ring-two" />
      <svg className="crane" viewBox="0 0 760 590" fill="none">
        <g className="crane-lines" stroke="currentColor" strokeWidth="2">
          <path d="M463 73V530M412 530h105M438 73h50M451 73l-38 457M475 73l40 457" />
          <path d="M428 430h73M421 344h87M414 258h94M438 172h52" />
          <path d="m429 430 72-86-80-86 69-86M501 430l-80-86 87-86-70-86" />
          <path d="M463 73 154 134h548L488 73" />
          <path d="m178 129 46-32 47 32 48-50 52 50 50-47 42 47M488 77l55 52 53-44 54 44" />
          <path d="M213 134v151" className="crane-cable" />
          <path d="M205 285h16v26l-8 10-8-10v-26Z" />
          <path d="M598 134v72" />
          <rect x="574" y="204" width="48" height="39" />
          <path d="M574 218h48M586 204v39M610 204v39" />
          <path d="M376 530h166M396 546h126" />
        </g>
        <g className="building-lines" stroke="currentColor" strokeWidth="1.5">
          <path d="M80 530V393h140v137M95 393v-34h110v34M113 359v-36h74v36" />
          <path d="M96 421h30v28H96zM143 421h30v28h-30zM190 421h30v28h-30zM96 468h30v28H96zM143 468h30v28h-30zM190 468h30v28h-30z" />
          <path d="M542 530V314h128v216M559 340h94M559 376h94M559 412h94M559 448h94M559 484h94" />
          <path d="M574 314v216M622 314v216" />
        </g>
      </svg>
      <div className="scan-line" />
      <div className="coordinate coordinate-a">X 06°12'40"</div>
      <div className="coordinate coordinate-b">ELV +42.80</div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071b2b] text-white">
      <section className="hero">
        <div className="blueprint-grid" />
        <header className="site-header">
          <a href="#" className="brand" aria-label="Arkana Engineering beranda">
            <span className="brand-mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              <b>ARKANA</b>
              <small>ENGINEERING</small>
            </span>
          </a>

          <nav aria-label="Navigasi utama">
            <a href="#tentang">Tentang</a>
            <a href="#layanan">Layanan</a>
            <a href="#proyek">Proyek</a>
          </nav>

          <a href="#kontak" className="header-cta">
            <span>Diskusikan Proyek</span>
            <ArrowIcon />
          </a>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow reveal delay-one">
              <span className="pulse-dot" />
              Infrastruktur untuk generasi berikutnya
            </div>
            <h1 className="reveal delay-two">
              Merancang
              <span>fondasi masa depan.</span>
            </h1>
            <p className="reveal delay-three">
              Kami mengubah tantangan kompleks menjadi struktur yang kokoh, efisien, dan memberikan
              dampak nyata bagi kehidupan.
            </p>
            <div className="hero-actions reveal delay-four">
              <a href="#proyek" className="primary-button">
                <span>Lihat karya kami</span>
                <ArrowIcon />
              </a>
              <div className="scroll-cue">
                <span className="mouse">
                  <i />
                </span>
                <span>Gulir untuk menjelajah</span>
              </div>
            </div>
          </div>

          <CraneScene />
        </div>

        <div className="project-status">
          <span className="status-index">A—01</span>
          <div>
            <small>PROYEK BERJALAN</small>
            <strong>Jembatan Nusantara</strong>
          </div>
          <span className="status-line">
            <i />
          </span>
          <span className="status-value">72%</span>
        </div>
      </section>

      <section className="stats-strip" id="tentang">
        <div className="stats-intro">
          <span>REKAM JEJAK</span>
          <p>Membangun kepercayaan melalui hasil yang terukur.</p>
        </div>
        <div className="stats-list">
          {projects.map((item) => (
            <article key={item.label}>
              <strong className={item.accent}>
                {item.number}
                <sup>+</sup>
              </strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="layanan">
        <div className="section-heading">
          <div>
            <span className="section-kicker">YANG KAMI KERJAKAN</span>
            <h2>
              Keahlian yang membentuk <em>ruang hidup.</em>
            </h2>
          </div>
          <p>
            Setiap garis memiliki tujuan. Setiap perhitungan membawa tanggung jawab. Kami menyatukan
            keduanya untuk hasil terbaik.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.code}>
              <div className="card-top">
                <span>{service.code}</span>
                <div className="service-icon">{service.icon}</div>
              </div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#kontak" aria-label={`Pelajari ${service.title}`}>
                  Pelajari lebih lanjut <ArrowIcon />
                </a>
              </div>
              <span className="card-blueprint-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section" id="proyek">
        <div className="moving-dash" />
        <span>IDE BESAR DIMULAI DARI PERCAKAPAN</span>
        <h2>
          Punya tantangan untuk <em>kami pecahkan?</em>
        </h2>
        <a
          href="mailto:hello@arkana.id"
          id="kontak"
          className="circle-link"
          aria-label="Hubungi kami"
        >
          <ArrowIcon />
        </a>
      </section>
    </main>
  );
}
