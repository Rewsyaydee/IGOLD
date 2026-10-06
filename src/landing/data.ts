// ============================================================================
// iGOLD Landing — content data (single source of truth for the public site)
// ----------------------------------------------------------------------------
// Every string is bilingual. Components render with L(value.en, value.bm).
// Sourced from the IGOLD executive proposal (Auckland, Nov 2026) and the
// official IGOLD x IIUM outreach materials.
// ============================================================================

export interface Bi {
  en: string;
  bm: string;
}

export interface LandingPartner {
  name: string;
  /** Path under /public. Falls back to a monogram tile when the file is absent. */
  logo: string;
}

export const LANDING_SITE = {
  brand: "iGOLD",
  url: "igoldiium.my",
  learnPath: "/learn",
  fullName:
    "International Global Outreach & Leadership Programme in New Zealand",
  copyright: "IIUM",
};

export const LANDING_NAV = [
  { id: "mission", label: { en: "Mission", bm: "Misi" } },
  { id: "curriculum", label: { en: "Curriculum", bm: "Kurikulum" } },
  {
    id: "impact",
    label: { en: "Community Impact", bm: "Impak Komuniti" },
  },
  { id: "support", label: { en: "Support", bm: "Sokongan" } },
];

export const LANDING_HERO = {
  badge: {
    en: "IIUM × Auckland Unity Outreach · November 2026",
    bm: "Jangkauan Perpaduan IIUM × Auckland · November 2026",
  },
  eyebrow: { en: "Aotearoa New Zealand", bm: "Aotearoa New Zealand" },
  titleA: { en: "Every prayer begins", bm: "Setiap solat bermula" },
  titleB: { en: "with understanding.", bm: "dengan kefahaman." },
  sub: {
    en: "An interactive prayer-learning platform built with IIUM for the New Zealand Muslim community — reverts, youth, families, and the teachers who guide them.",
    bm: "Platform pembelajaran solat interaktif yang dibina bersama IIUM untuk komuniti Muslim New Zealand — mualaf, belia, keluarga, dan para pendidik yang membimbing mereka.",
  },
  ctaPrimary: { en: "Enter Prayer Portal", bm: "Masuk Portal Solat" },
  ctaSecondary: { en: "Explore the mission", bm: "Terokai misi" },
  live: {
    en: "Now live at igoldiium.my/learn",
    bm: "Kini live di igoldiium.my/learn",
  },
  trust: [
    { en: "Shafi'i + Hanafi", bm: "Shafi'i + Hanafi" },
    { en: "13 guided steps", bm: "13 langkah berpanduan" },
    { en: "Free for the ummah", bm: "Percuma untuk ummah" },
    { en: "No account needed", bm: "Tiada akaun diperlukan" },
  ],
};

export const LANDING_TICKER = [
  "Knowledge made clear",
  "Shafi'i + Hanafi",
  "13 guided steps",
  "Free for the ummah",
  "Auckland · Aotearoa",
  "Listen · Read · Repeat",
  "Wudu · Niyyah · Janazah",
  "اقرأ",
];

export const LANDING_MISSION = {
  eyebrow: { en: "Who we are", bm: "Siapa kami" },
  heading: {
    en: "A bridge of knowledge, from Gombak to Aotearoa.",
    bm: "Jambatan ilmu, dari Gombak ke Aotearoa.",
  },
  lead: {
    en: "iGOLD is the digital front door of an IIUM-led outreach mission to Auckland — pairing an academically reviewed prayer-learning platform with on-the-ground community programmes for the minority Muslim community, indigenous Māori converts, and young families.",
    bm: "iGOLD ialah pintu digital bagi misi jangkauan yang diterajui IIUM ke Auckland — memadankan platform pembelajaran solat yang disemak secara akademik dengan program komuniti di lapangan untuk masyarakat Muslim minoriti, mualaf Māori, dan keluarga muda.",
  },
  body: [
    {
      en: "For those far from teachers and mosques, access to religious knowledge can be limited. This platform bridges that gap — clear, structured, and accessible guidance to learn solat correctly, anytime and anywhere.",
      bm: "Bagi mereka yang jauh daripada guru dan masjid, akses kepada ilmu agama boleh menjadi terhad. Platform ini merapatkan jurang itu — panduan yang jelas, tersusun dan mudah diakses untuk mempelajari solat dengan betul, pada bila-bila masa dan di mana sahaja.",
    },
    {
      en: "Every module is built with the IGOLD academic team, aligned to the Shafi'i and Hanafi schools, and designed to travel — across cities, time zones, and generations.",
      bm: "Setiap modul dibina bersama pasukan akademik IGOLD, selaras dengan mazhab Shafi'i dan Hanafi, serta direka untuk merentas kota, zon waktu, dan generasi.",
    },
  ],
  quote: {
    en: "Leading the way, serving with rahmah — from Gombak to the world.",
    bm: "Memimpin jalan, berkhidmat dengan rahmah — dari Gombak ke seluruh dunia.",
  },
  quoteAuthor: {
    en: "IGOLD · Mahallah Halimatus Sa'adiah, IIUM",
    bm: "IGOLD · Mahallah Halimatus Sa'adiah, IIUM",
  },
  evidence: [
    {
      value: 87,
      label: {
        en: "Māori Muslims report Islamophobia remains persistent",
        bm: "Muslim Māori melaporkan Islamofobia masih berterusan",
      },
    },
    {
      value: 56,
      label: {
        en: "experienced anti-Muslim discrimination in public",
        bm: "mengalami diskriminasi anti-Muslim di ruang awam",
      },
    },
    {
      value: 58,
      label: {
        en: "children faced discrimination or bullying at school",
        bm: "kanak-kanak berdepan diskriminasi atau buli di sekolah",
      },
    },
    {
      value: 40,
      label: {
        en: "live in a continuous state of heightened vigilance",
        bm: "hidup dalam keadaan berjaga-jaga berterusan",
      },
    },
  ],
  partners: [
    {
      name: "Universiti Teknologi MARA (UiTM)",
      logo: "/branding/partners/uitm.jpg",
    },
    {
      name: "Ulul Albāb Islamic Institute NZ",
      logo: "/branding/partners/uaiinz.jpg",
    },
    {
      name: "Fatimah Foundations",
      logo: "/branding/partners/fatimah-foundation.png",
    },
    {
      name: "Keluarga Kiwi",
      logo: "/branding/partners/keluarga-kiwi.jpg",
    },
    {
      name: "Mahallah Halimatus Sa'adiah",
      logo: "/branding/partners/mahallah-halimatus-saadiah.jpg",
    },
    {
      name: "Secretariat of Fiqh & Usul Al-Fiqh (SOFI)",
      logo: "/branding/partners/sofi.jpg",
    },
    {
      name: "Omani Research & Studies Center Malaysia",
      logo: "/branding/partners/omani-research-studies-centre.jpg",
    },
  ],
  partnersLabel: { en: "Working with", bm: "Bersama" },
  partnersHeading: {
    en: "Built together, with partners on the ground.",
    bm: "Dibina bersama, dengan rakan di lapangan.",
  },
  partnersSub: {
    en: "This mission is carried by institutions and community organisations across Malaysia and Aotearoa New Zealand.",
    bm: "Misi ini digalas oleh institusi dan pertubuhan komuniti di Malaysia dan Aotearoa New Zealand.",
  },
};

export const LANDING_BENTO = {
  eyebrow: { en: "Inside the guide", bm: "Di dalam panduan" },
  heading: {
    en: "Everything you need to pray.",
    bm: "Segalanya yang anda perlukan untuk bersolat.",
  },
  sub: {
    en: "Every posture demonstrated in video. Every word recited, transliterated, and explained. Built for phones, tablets, and classrooms.",
    bm: "Setiap gerakan ditunjukkan melalui video. Setiap lafaz dibaca, ditransliterasi dan dijelaskan. Dibina untuk telefon, tablet dan bilik darjah.",
  },
  posture: {
    title: { en: "Posture Studio", bm: "Studio Gerakan" },
    desc: {
      en: "Watch each posture play on loop — from the opening takbir to the closing salam.",
      bm: "Tonton setiap gerakan dimainkan secara berulang — dari takbir pembuka hingga salam penutup.",
    },
  },
  recitation: {
    title: { en: "Recitation Lab", bm: "Makmal Bacaan" },
    desc: {
      en: "Listen to the recitation, then read the Arabic, transliteration and meaning side by side.",
      bm: "Dengar bacaan, kemudian baca Arab, transliterasi dan maknanya bersebelahan.",
    },
  },
  schedule: {
    title: { en: "Auckland Times & Qibla", bm: "Waktu Auckland & Kiblat" },
    desc: {
      en: "Prayer times and qibla orientation tuned for Aotearoa New Zealand.",
      bm: "Waktu solat dan arah kiblat disesuaikan untuk Aotearoa New Zealand.",
    },
    sample: { en: "Sample day · Auckland", bm: "Hari contoh · Auckland" },
    prayers: [
      { name: { en: "Subuh", bm: "Subuh" }, time: "4:34" },
      { name: { en: "Zohor", bm: "Zohor" }, time: "13:06" },
      { name: { en: "Asar", bm: "Asar" }, time: "16:59" },
      { name: { en: "Maghrib", bm: "Maghrib" }, time: "20:19" },
      { name: { en: "Isyak", bm: "Isyak" }, time: "21:49" },
    ],
    qibla: { en: "Qibla 261°", bm: "Kiblat 261°" },
  },
  madhhab: {
    title: { en: "Two schools of law", bm: "Dua mazhab" },
    desc: {
      en: "Switch between Shafi'i and Hanafi at any time — every rukun, step and posture updates to match.",
      bm: "Tukar antara Shafi'i dan Hanafi pada bila-bila masa — setiap rukun, langkah dan gerakan berubah mengikut mazhab.",
    },
    shafii: "Shafi'i",
    hanafi: "Hanafi",
  },
  modules: {
    title: { en: "Wudu, Niyyah & Janazah", bm: "Wuduk, Niat & Jenazah" },
    desc: {
      en: "Ablution, the intention for each prayer, and the funeral prayer — each taught in full.",
      bm: "Wuduk, niat bagi setiap solat, dan solat jenazah — setiap satu diajar sepenuhnya.",
    },
  },
  bilingual: {
    title: { en: "Bilingual by design", bm: "Dwibahasa secara reka bentuk" },
    desc: {
      en: "English and Bahasa Melayu across every screen — switch at any time without losing your place.",
      bm: "Bahasa Inggeris dan Melayu pada setiap skrin — tukar bila-bila masa tanpa kehilangan tempat anda.",
    },
    pairs: [
      { en: "Prayer", bm: "Solat" },
      { en: "Intention", bm: "Niat" },
      { en: "Recitation", bm: "Bacaan" },
      { en: "Posture", bm: "Gerakan" },
    ],
  },
  quiz: {
    title: { en: "Knowledge Quiz", bm: "Kuiz Pengetahuan" },
    desc: {
      en: "Ten questions close the loop, so what you learn stays learned.",
      bm: "Sepuluh soalan memantapkan pembelajaran, supaya ilmu kekal.",
    },
  },
};

export const LANDING_METRICS = {
  eyebrow: { en: "Community impact", bm: "Impak komuniti" },
  heading: {
    en: "A mission measured in people.",
    bm: "Misi yang diukur dengan insan.",
  },
  sub: {
    en: "Targets and outcomes of the November 2026 Auckland outreach — the human programme behind the platform.",
    bm: "Sasaran dan hasil jangkauan Auckland November 2026 — program insani di sebalik platform ini.",
  },
  items: [
    {
      value: 23,
      suffix: "",
      label: { en: "Delegates to Aotearoa", bm: "Delegasi ke Aotearoa" },
    },
    {
      value: 11,
      suffix: "",
      label: { en: "Days of outreach", bm: "Hari jangkauan" },
    },
    {
      value: 5,
      suffix: "",
      label: { en: "Community modules", bm: "Modul komuniti" },
    },
    {
      value: 150,
      suffix: "",
      label: { en: "Meals to be served", bm: "Hidangan untuk diagihkan" },
    },
    {
      value: 50,
      suffix: "",
      label: { en: "Youth & children reached", bm: "Belia & kanak-kanak" },
    },
    {
      value: 100,
      suffix: "%",
      label: {
        en: "Jenazah competency target",
        bm: "Sasaran kompetensi jenazah",
      },
    },
  ],
  note: {
    en: "KPI targets from the approved IGOLD programme proposal · IIUM/206/12/2/1-SPM12/03/2025",
    bm: "Sasaran KPI daripada cadangan program IGOLD yang diluluskan · IIUM/206/12/2/1-SPM12/03/2025",
  },
};

export const LANDING_SUPPORT = {
  eyebrow: { en: "Support the mission", bm: "Sokong misi ini" },
  heading: {
    en: "Sponsor a module. Sustain a community.",
    bm: "Taja satu modul. Kekalkan satu komuniti.",
  },
  sub: {
    en: "Every ringgit is stewarded through IIUM's official channels, with tax-exempt receipts and transparent reporting.",
    bm: "Setiap ringgit disalurkan melalui saluran rasmi IIUM, dengan resit pelepasan cukai dan laporan yang telus.",
  },
  tiers: [
    {
      name: { en: "Pillars of Unity", bm: "Tiang Perpaduan" },
      range: { en: "RM 9,000 & above", bm: "RM 9,000 ke atas" },
      featured: true,
      benefits: [
        {
          en: "Official tax exemption receipt",
          bm: "Resit pelepasan cukai rasmi",
        },
        {
          en: "Logo on the main programme banner",
          bm: "Logo pada banner utama program",
        },
        {
          en: "Certificate and plaque of appreciation",
          bm: "Sijil dan plak penghargaan",
        },
        {
          en: "Logo on all community distribution materials",
          bm: "Logo pada semua bahan agihan komuniti",
        },
        {
          en: "Exclusive Main Sponsor branding on all collateral",
          bm: "Penjenamaan Penaja Utama eksklusif pada semua bahan",
        },
        {
          en: "Mention in press releases & social media",
          bm: "Sebutan dalam siaran media & sosial",
        },
        {
          en: "Logo on programme t-shirts & lanyards",
          bm: "Logo pada t-shirt & lanyard program",
        },
        {
          en: "Naming rights to dedicated modules",
          bm: "Hak penamaan modul khusus",
        },
        {
          en: "Exclusive sponsorship of toolkits & STEM kits",
          bm: "Penajaan eksklusif kit peserta & kit STEM",
        },
      ],
    },
    {
      name: { en: "Guardians of Harmony", bm: "Penjaga Keharmonian" },
      range: { en: "RM 5,000 – RM 8,000", bm: "RM 5,000 – RM 8,000" },
      featured: false,
      benefits: [
        {
          en: "Official tax exemption receipt",
          bm: "Resit pelepasan cukai rasmi",
        },
        {
          en: "Logo on the main programme banner",
          bm: "Logo pada banner utama program",
        },
        {
          en: "Certificate and plaque of appreciation",
          bm: "Sijil dan plak penghargaan",
        },
        {
          en: "Exclusive Main Sponsor branding on all collateral",
          bm: "Penjenamaan Penaja Utama eksklusif pada semua bahan",
        },
        {
          en: "Mention in press releases & social media",
          bm: "Sebutan dalam siaran media & sosial",
        },
        {
          en: "Naming rights to dedicated modules",
          bm: "Hak penamaan modul khusus",
        },
      ],
    },
    {
      name: { en: "Friends of Outreach", bm: "Sahabat Jangkauan" },
      range: { en: "RM 1,000 – RM 4,000", bm: "RM 1,000 – RM 4,000" },
      featured: false,
      benefits: [
        {
          en: "Official tax exemption receipt",
          bm: "Resit pelepasan cukai rasmi",
        },
        {
          en: "Logo on the main programme banner",
          bm: "Logo pada banner utama program",
        },
        {
          en: "Mention in press releases & social media",
          bm: "Sebutan dalam siaran media & sosial",
        },
      ],
    },
  ],
  taxNote: {
    en: "All cash and cheque donations are fully tax-deductible under Section 44(6) of the Malaysian Income Tax Act 1967 (Ref: JHDN 01/35/42/51/179-6.2952, Gazette No. 8271).",
    bm: "Semua sumbangan tunai dan cek layak mendapat pelepasan cukai sepenuhnya di bawah Seksyen 44(6) Akta Cukai Pendapatan Malaysia 1967 (Ruj: JHDN 01/35/42/51/179-6.2952, Warta No. 8271).",
  },
  bank: {
    title: { en: "Official banking details", bm: "Butiran bank rasmi" },
    rows: [
      {
        label: { en: "Bank", bm: "Bank" },
        value: "Bank Muamalat Malaysia Berhad",
      },
      {
        label: { en: "Account name", bm: "Nama akaun" },
        value: "IIUM Operating",
      },
      {
        label: { en: "Account number", bm: "Nombor akaun" },
        value: "1407-000000-4716",
      },
      { label: { en: "Reference", bm: "Rujukan" }, value: "MHGOLD" },
    ],
    copy: { en: "Copy", bm: "Salin" },
    copied: { en: "Copied", bm: "Disalin" },
    receiptNote: {
      en: "Email a copy of your transfer slip for receipt issuance.",
      bm: "E-mel salinan slip pindahan anda untuk pengeluaran resit.",
    },
  },
  contacts: {
    title: { en: "Speak with the secretariat", bm: "Hubungi urus setia" },
    people: [
      {
        role: { en: "Advisor", bm: "Penasihat" },
        name: "Assoc. Prof. Dr. Nan Noorhidayu Megat Laksana",
        detail: "nanhidayu@iium.edu.my",
        href: "mailto:nanhidayu@iium.edu.my",
      },
      {
        role: { en: "Programme Manager", bm: "Pengurus Program" },
        name: "Nur Syafiyah Maisarah binti Roslan",
        detail: "syafiyahmaisarah@gmail.com",
        href: "mailto:syafiyahmaisarah@gmail.com",
      },
      {
        role: { en: "Secretariat", bm: "Urus Setia" },
        name: "IGOLD Secretariat",
        detail: "iium.communityengagement@gmail.com",
        href: "mailto:iium.communityengagement@gmail.com",
      },
    ],
  },
};

export const LANDING_FINALE = {
  eyebrow: { en: "The portal is open", bm: "Portal telah dibuka" },
  heading: {
    en: "Begin the prayer that stays with you.",
    bm: "Mulakan solat yang kekal bersama anda.",
  },
  sub: {
    en: "Free, bilingual, and built for every learner — from the first takbir to a lifetime of prayer.",
    bm: "Percuma, dwibahasa, dan dibina untuk setiap pelajar — dari takbir pertama hingga seumur hidup.",
  },
  cta: { en: "Enter Prayer Portal", bm: "Masuk Portal Solat" },
  note: {
    en: "No account. No download. Works on any phone.",
    bm: "Tiada akaun. Tiada muat turun. Berfungsi pada mana-mana telefon.",
  },
};

export const LANDING_FOOTER = {
  about: {
    en: "An interactive Islamic prayer learning platform — a digital initiative of the IGOLD outreach programme in Aotearoa New Zealand.",
    bm: "Platform pembelajaran solat Islam interaktif — inisiatif digital program jangkauan IGOLD di Aotearoa New Zealand.",
  },
  explore: { en: "Explore", bm: "Jelajah" },
  official: { en: "Official", bm: "Rasmi" },
  contact: { en: "Contact", bm: "Hubungi" },
  address: {
    en: "Mahallah Halimatus Sa'adiah, IIUM Gombak, 53100 Kuala Lumpur, Malaysia",
    bm: "Mahallah Halimatus Sa'adiah, IIUM Gombak, 53100 Kuala Lumpur, Malaysia",
  },
  disclaimer: {
    en: "Religious content follows the Shafi'i and Hanafi schools and is reviewed with the IGOLD academic team. Please refer to a qualified ustaz for personal rulings.",
    bm: "Kandungan agama mengikut mazhab Shafi'i dan Hanafi serta disemak bersama pasukan akademik IGOLD. Sila rujuk ustaz yang berkelayakan untuk hukum peribadi.",
  },
  developedBy: { en: "Developed by", bm: "Dibangunkan oleh" },
  developerName: "Rusyaidi",
  developerUrl: "https://rewsyaydee.tech",
  developerLabel: "rewsyaydee.tech",
  builtWith: {
    en: "Built with love for the ummah.",
    bm: "Dibina dengan penuh kasih untuk ummah.",
  },
};
