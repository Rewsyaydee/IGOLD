// ============================================================================
// IGOLD — Interactive Solat Guide  ·  Content data (single source of truth)
// ----------------------------------------------------------------------------
// Method: Shafi'i (as commonly taught in Malaysia). All religious content
// should be reviewed and approved by a qualified ustaz / the IGOLD academic
// team before public release. Every string below is editable here.
// ============================================================================

export const SITE = {
  brand: "IGOLD",
  brandFull: "International Global Outreach & Leadership Programme in New Zealand",
  title: "Panduan Solat",
  titleEn: "Interactive Solat Guide",
  tagline: "Belajar solat dengan betul, yakin, dan penuh makna — di mana sahaja.",
  taglineEn: "Learn to pray correctly, with confidence and meaning — anywhere.",
  org: "An initiative under IGOLD · IIUM",
};

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------
export const ABOUT = {
  heading: "Sebuah jambatan ilmu untuk ummah",
  headingEn: "A bridge of knowledge for the ummah",
  body: [
    "Panduan Solat Interaktif ini dibangunkan sebagai inisiatif di bawah program IGOLD — sebuah usaha sosial yang diterajui oleh Universiti Islam Antarabangsa Malaysia (UIAM) untuk memperkukuh identiti masyarakat Muslim minoriti di Auckland, New Zealand.",
    "Bagi mereka yang jauh daripada guru dan masjid, akses kepada ilmu agama boleh menjadi terhad. Platform ini merapatkan jurang itu — menawarkan panduan yang jelas, tersusun dan mudah diakses untuk mempelajari solat dengan betul, pada bila-bila masa dan di mana sahaja.",
  ],
  bodyEn: [
    "This Interactive Solat Guide is built as an initiative under the IGOLD programme — a social engagement effort led by the International Islamic University Malaysia (IIUM) to strengthen the identity of the minority Muslim community in Auckland, New Zealand.",
    "For those far from teachers and mosques, access to religious knowledge can be limited. This platform bridges that gap — offering clear, structured and accessible guidance to learn solat correctly, anytime and anywhere.",
  ],
  stats: [
    { value: "7+", label: "Untuk semua umur", labelEn: "For all ages" },
    { value: "100%", label: "Percuma & terbuka", labelEn: "Free & open" },
    { value: "24/7", label: "Akses di mana-mana", labelEn: "Access anywhere" },
  ],
};

// ---------------------------------------------------------------------------
// SYARAT SAH SOLAT — Conditions for a valid prayer
// ---------------------------------------------------------------------------
export interface Syarat {
  id: number;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  icon: string; // lucide icon name
}

export const SYARAT: Syarat[] = [
  {
    id: 1,
    title: "Islam",
    titleEn: "Being a Muslim",
    desc: "Solat hanya sah bagi seorang Muslim. Bukan Muslim tidak dituntut menunaikannya sehingga memeluk Islam.",
    descEn: "Prayer is only valid for a Muslim. A non-Muslim is not obligated until embracing Islam.",
    icon: "moon-star",
  },
  {
    id: 2,
    title: "Berakal",
    titleEn: "Being of sound mind",
    desc: "Seseorang itu waras dan berakal. Orang yang hilang akal tidak dituntut bersolat ketika itu.",
    descEn: "The person is sane and conscious. One who has lost their mind is not obligated at that time.",
    icon: "brain",
  },
  {
    id: 3,
    title: "Suci daripada hadas",
    titleEn: "Free from ritual impurity",
    desc: "Suci daripada hadas besar dan kecil — berwuduk, atau mandi wajib jika berhadas besar.",
    descEn: "Free from major and minor impurity — perform wudu', or ghusl if in a state of major impurity.",
    icon: "droplets",
  },
  {
    id: 4,
    title: "Suci badan, pakaian & tempat",
    titleEn: "Cleanliness of body, clothes & place",
    desc: "Badan, pakaian dan tempat solat hendaklah bersih daripada najis.",
    descEn: "The body, clothing and place of prayer must be clean of impurities (najis).",
    icon: "sparkles",
  },
  {
    id: 5,
    title: "Menutup aurat",
    titleEn: "Covering the 'awrah",
    desc: "Menutup bahagian aurat yang wajib — berbeza bagi lelaki dan perempuan.",
    descEn: "Covering the required parts of the body — which differs for men and women.",
    icon: "shirt",
  },
  {
    id: 6,
    title: "Masuk waktu solat",
    titleEn: "The prayer time has entered",
    desc: "Setiap solat fardhu mempunyai waktunya. Solat hanya sah apabila waktunya telah masuk.",
    descEn: "Each obligatory prayer has its time. The prayer is only valid once its time has begun.",
    icon: "clock",
  },
  {
    id: 7,
    title: "Menghadap kiblat",
    titleEn: "Facing the qiblah",
    desc: "Menghadap ke arah Kaabah di Makkah ketika menunaikan solat.",
    descEn: "Facing the direction of the Ka'bah in Makkah while performing the prayer.",
    icon: "compass",
  },
  {
    id: 8,
    title: "Mengetahui kefardhuan solat",
    titleEn: "Knowing the prayer is obligatory",
    desc: "Yakin dan tahu bahawa solat itu adalah kewajipan yang difardhukan oleh Allah.",
    descEn: "Being certain and aware that the prayer is an obligation ordained by Allah.",
    icon: "book-open",
  },
];

// ---------------------------------------------------------------------------
// RUKUN SOLAT — The 13 pillars (Shafi'i)
// ---------------------------------------------------------------------------
export interface Rukun {
  id: number;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  type: "Qauli" | "Fi'li" | "Qalbi"; // verbal / physical / of the heart
}

export const RUKUN: Rukun[] = [
  { id: 1, title: "Niat", titleEn: "Intention", type: "Qalbi", desc: "Berniat di dalam hati untuk menunaikan solat yang tertentu.", descEn: "Intending in the heart to perform the specific prayer." },
  { id: 2, title: "Berdiri bagi yang mampu", titleEn: "Standing if able", type: "Fi'li", desc: "Berdiri tegak bagi solat fardhu bagi mereka yang berkemampuan.", descEn: "Standing upright for the obligatory prayer for those who are able." },
  { id: 3, title: "Takbiratul Ihram", titleEn: "Opening takbir", type: "Qauli", desc: "Melafazkan 'Allahu Akbar' sebagai tanda bermulanya solat.", descEn: "Saying 'Allahu Akbar' to mark the beginning of the prayer." },
  { id: 4, title: "Membaca Al-Fatihah", titleEn: "Reciting Al-Fatihah", type: "Qauli", desc: "Membaca surah Al-Fatihah pada setiap rakaat.", descEn: "Reciting Surah Al-Fatihah in every rak'ah." },
  { id: 5, title: "Rukuk & tomakninah", titleEn: "Bowing with stillness", type: "Fi'li", desc: "Membongkok dengan tenang sehingga anggota badan stabil.", descEn: "Bowing calmly until the limbs are settled." },
  { id: 6, title: "Iktidal & tomakninah", titleEn: "Rising with stillness", type: "Fi'li", desc: "Bangun semula tegak selepas rukuk dengan tenang.", descEn: "Standing upright again after bowing, calmly." },
  { id: 7, title: "Sujud dua kali & tomakninah", titleEn: "Two prostrations with stillness", type: "Fi'li", desc: "Sujud sebanyak dua kali pada setiap rakaat dengan tenang.", descEn: "Prostrating twice in each rak'ah, calmly." },
  { id: 8, title: "Duduk antara dua sujud", titleEn: "Sitting between prostrations", type: "Fi'li", desc: "Duduk dengan tenang di antara dua sujud.", descEn: "Sitting calmly between the two prostrations." },
  { id: 9, title: "Duduk tahiyat akhir", titleEn: "Sitting for the final tashahhud", type: "Fi'li", desc: "Duduk untuk membaca tahiyat akhir.", descEn: "Sitting to recite the final tashahhud." },
  { id: 10, title: "Membaca tahiyat akhir", titleEn: "Reciting the final tashahhud", type: "Qauli", desc: "Membaca lafaz tahiyat pada duduk yang terakhir.", descEn: "Reciting the tashahhud in the final sitting." },
  { id: 11, title: "Selawat ke atas Nabi ﷺ", titleEn: "Salutations upon the Prophet ﷺ", type: "Qauli", desc: "Membaca selawat ke atas Nabi Muhammad ﷺ dalam tahiyat akhir.", descEn: "Sending salutations upon the Prophet Muhammad ﷺ in the final tashahhud." },
  { id: 12, title: "Memberi salam", titleEn: "The closing salam", type: "Qauli", desc: "Mengucapkan salam yang pertama untuk mengakhiri solat.", descEn: "Saying the first salam to conclude the prayer." },
  { id: 13, title: "Tertib", titleEn: "Performing in order", type: "Qalbi", desc: "Menunaikan setiap rukun mengikut susunannya yang betul.", descEn: "Performing each pillar in its correct sequence." },
];

// ---------------------------------------------------------------------------
// KAIFIAT SOLAT — Step-by-step procedure (the star feature)
// `pose` maps to a figure illustration in PrayerFigure.tsx
// ---------------------------------------------------------------------------
export type Pose =
  | "stand"
  | "takbir"
  | "qiyam"
  | "ruku"
  | "itidal"
  | "sujud"
  | "duduk"
  | "tashahhud"
  | "salam";

// Real looping demonstration clips (muted, optimized) provided by the client.
// One clip per posture — covers all 13 kaifiat steps (qiyam/sujud/tashahhud repeat).
export const POSE_VIDEO: Record<Pose, string> = {
  stand: "/kaifiat/stand.mp4",
  takbir: "/kaifiat/takbir.mp4",
  qiyam: "/kaifiat/qiyam.mp4",
  ruku: "/kaifiat/ruku.mp4",
  itidal: "/kaifiat/itidal.mp4",
  sujud: "/kaifiat/sujud.mp4",
  duduk: "/kaifiat/duduk.mp4",
  tashahhud: "/kaifiat/tashahhud.mp4",
  salam: "/kaifiat/salam.mp4",
};

// ---- Posture Explorer -------------------------------------------------------
export interface Posture {
  pose: Pose;
  name: string;
  nameEn: string;
  align: string[];
  alignEn: string[];
}

export const POSTURES: Posture[] = [
  {
    pose: "stand",
    name: "Berdiri (Qiyam)",
    nameEn: "Standing",
    align: [
      "Berdiri tegak, kaki seluas bahu.",
      "Pandangan pada tempat sujud.",
      "Badan tenang dan diam, menghadap kiblat.",
    ],
    alignEn: [
      "Stand upright, feet about shoulder-width apart.",
      "Gaze rests on the place of prostration.",
      "Body still and calm, facing the qiblah.",
    ],
  },
  {
    pose: "takbir",
    name: "Takbiratul Ihram",
    nameEn: "Opening Takbir",
    align: [
      "Angkat kedua tangan ke paras telinga / bahu.",
      "Tapak tangan menghadap kiblat, jari santai.",
      "Lafaz 'Allahu Akbar' ketika mengangkat tangan.",
    ],
    alignEn: [
      "Raise both hands to ear / shoulder level.",
      "Palms face the qiblah, fingers relaxed.",
      "Say 'Allahu Akbar' as the hands rise.",
    ],
  },
  {
    pose: "qiyam",
    name: "Qiyam (Membaca)",
    nameEn: "Standing & Reciting",
    align: [
      "Letak tangan kanan atas tangan kiri, di dada / bawah dada.",
      "Berdiri diam sambil membaca Al-Fatihah.",
      "Bahu santai, belakang lurus.",
    ],
    alignEn: [
      "Right hand over the left, on or below the chest.",
      "Stand still while reciting Al-Fatihah.",
      "Shoulders relaxed, back straight.",
    ],
  },
  {
    pose: "ruku",
    name: "Rukuk",
    nameEn: "Bowing (Ruku')",
    align: [
      "Tunduk pada pinggang sehingga belakang mendatar.",
      "Tangan memegang lutut, jari terbuka.",
      "Belakang dan kepala membentuk satu garisan lurus.",
    ],
    alignEn: [
      "Bend at the waist until the back is level.",
      "Hands grip the knees, fingers spread.",
      "Back and head form a straight line.",
    ],
  },
  {
    pose: "itidal",
    name: "Iktidal",
    nameEn: "Rising (I'tidal)",
    align: [
      "Bangun semula berdiri tegak sepenuhnya.",
      "Tangan turun di sisi secara semula jadi.",
      "Tenang sebentar sebelum gerakan seterusnya.",
    ],
    alignEn: [
      "Rise back to a full, upright standing position.",
      "Arms rest naturally at the sides.",
      "Settle calmly before the next movement.",
    ],
  },
  {
    pose: "sujud",
    name: "Sujud",
    nameEn: "Prostration (Sujud)",
    align: [
      "Tujuh anggota mencecah lantai: dahi & hidung, dua tapak tangan, dua lutut, hujung jari dua kaki.",
      "Siku diangkat, tidak melekat pada lantai atau rusuk.",
      "Jari menghala ke arah kiblat.",
    ],
    alignEn: [
      "Seven parts touch the floor: forehead & nose, both palms, both knees, toes of both feet.",
      "Elbows lifted away from the floor and the sides.",
      "Fingers point toward the qiblah.",
    ],
  },
  {
    pose: "duduk",
    name: "Duduk Antara Dua Sujud",
    nameEn: "Sitting Between Prostrations",
    align: [
      "Duduk tenang, tapak kaki kiri dibentang di bawah.",
      "Kaki kanan ditegakkan, jari melentur ke arah kiblat.",
      "Tangan di atas paha berhampiran lutut.",
    ],
    alignEn: [
      "Sit calmly with the left foot laid flat beneath you.",
      "Right foot upright, toes bent toward the qiblah.",
      "Hands rest on the thighs near the knees.",
    ],
  },
  {
    pose: "tashahhud",
    name: "Tahiyat (Tasyahhud)",
    nameEn: "Sitting for Tashahhud",
    align: [
      "Duduk seperti antara dua sujud (atau tawarruk pada tahiyat akhir).",
      "Tangan kanan di atas paha kanan, jari telunjuk diangkat ketika syahadah.",
      "Tangan kiri terbuka di atas paha kiri.",
    ],
    alignEn: [
      "Sit as between prostrations (tawarruk in the final sitting).",
      "Right hand on the right thigh, index finger raised at the shahadah.",
      "Left hand rests open on the left thigh.",
    ],
  },
  {
    pose: "salam",
    name: "Salam",
    nameEn: "Closing Salam",
    align: [
      "Palingkan kepala ke kanan, kemudian ke kiri.",
      "Ucap 'Assalamualaikum wa rahmatullah' setiap arah.",
      "Ini menandakan tamat solat.",
    ],
    alignEn: [
      "Turn the head to the right, then to the left.",
      "Say 'As-salamu alaykum wa rahmatullah' to each side.",
      "This marks the end of the prayer.",
    ],
  },
];

export interface Step {
  id: number;
  name: string;
  nameEn: string;
  pose: Pose;
  arabic?: string;
  transliteration?: string;
  meaning: string;
  meaningEn: string;
  note?: string;
  noteEn?: string;
  hasAudio?: boolean;
}

export const STEPS: Step[] = [
  {
    id: 1,
    name: "Niat & Berdiri",
    nameEn: "Intention & Standing",
    pose: "stand",
    meaning: "Berdiri tegak menghadap kiblat, dan berniat di dalam hati untuk menunaikan solat (contoh: solat fardhu Subuh dua rakaat kerana Allah Ta'ala).",
    meaningEn: "Stand upright facing the qiblah and make the intention in your heart to perform the prayer (e.g. the two-rak'ah Subuh prayer for the sake of Allah).",
    note: "Niat di dalam hati. Berdiri bagi yang mampu.",
    noteEn: "The intention is in the heart. Stand if you are able.",
  },
  {
    id: 2,
    name: "Takbiratul Ihram",
    nameEn: "Opening Takbir",
    pose: "takbir",
    arabic: "اللّٰهُ أَكْبَر",
    transliteration: "Allāhu Akbar",
    meaning: "Allah Maha Besar. Angkat kedua tangan sehingga paras telinga sambil melafazkannya.",
    meaningEn: "Allah is the Greatest. Raise both hands to ear level while saying it.",
    hasAudio: true,
  },
  {
    id: 3,
    name: "Doa Iftitah",
    nameEn: "Opening Supplication",
    pose: "qiyam",
    arabic: "اللّٰهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلّٰهِ كَثِيرًا وَسُبْحَانَ اللّٰهِ بُكْرَةً وَأَصِيلًا",
    transliteration: "Allāhu akbaru kabīrā, wal-ḥamdu lillāhi kathīrā, wa subḥānallāhi bukrataw wa aṣīlā",
    meaning: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan sebanyak-banyaknya, Maha Suci Allah pada waktu pagi dan petang.",
    meaningEn: "Allah is the Greatest, abundant praise be to Allah, and glory be to Allah morning and evening.",
    note: "Sunat dibaca selepas takbir, sebelum Al-Fatihah.",
    noteEn: "Recommended (sunnah) after the takbir, before Al-Fatihah.",
    hasAudio: true,
  },
  {
    id: 4,
    name: "Al-Fatihah",
    nameEn: "Surah Al-Fatihah",
    pose: "qiyam",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ ۝ الرَّحْمٰنِ الرَّحِيمِ ۝ مٰلِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    transliteration: "Bismillāhir-raḥmānir-raḥīm. Al-ḥamdu lillāhi rabbil-'ālamīn. Ar-raḥmānir-raḥīm. Māliki yawmid-dīn. Iyyāka na'budu wa iyyāka nasta'īn. Ihdinaṣ-ṣirāṭal-mustaqīm. Ṣirāṭal-lażīna an'amta 'alayhim ghayril-maghḍūbi 'alayhim wa laḍ-ḍāllīn.",
    meaning: "Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah Tuhan sekalian alam... Tunjukilah kami jalan yang lurus.",
    meaningEn: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is for Allah, Lord of all worlds... Guide us along the Straight Path.",
    note: "Rukun — wajib dibaca pada setiap rakaat.",
    noteEn: "A pillar — obligatory in every rak'ah.",
    hasAudio: true,
  },
  {
    id: 5,
    name: "Surah Lazim",
    nameEn: "A Short Surah",
    pose: "qiyam",
    arabic: "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul huwallāhu aḥad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan aḥad.",
    meaning: "Katakanlah: Dialah Allah Yang Maha Esa. Allah tempat bergantung. Dia tidak beranak dan tidak diperanakkan. Dan tidak ada sesuatu yang setara dengan-Nya.",
    meaningEn: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.",
    note: "Sunat membaca surah selepas Al-Fatihah pada dua rakaat pertama.",
    noteEn: "Recommended to recite a surah after Al-Fatihah in the first two rak'ahs.",
    hasAudio: true,
  },
  {
    id: 6,
    name: "Rukuk",
    nameEn: "Bowing",
    pose: "ruku",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
    transliteration: "Subḥāna rabbiyal-'aẓīmi wa biḥamdih",
    meaning: "Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya. (Dibaca 3 kali)",
    meaningEn: "Glory to my Lord, the Most Great, and praise be to Him. (Recited 3 times)",
    note: "Membongkok dengan tangan di atas lutut, belakang lurus.",
    noteEn: "Bow with the hands on the knees and the back straight.",
    hasAudio: true,
  },
  {
    id: 7,
    name: "Iktidal",
    nameEn: "Rising from Bowing",
    pose: "itidal",
    arabic: "سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ",
    transliteration: "Sami'allāhu liman ḥamidah. Rabbanā lakal-ḥamd",
    meaning: "Allah mendengar siapa yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala pujian.",
    meaningEn: "Allah hears whoever praises Him. Our Lord, to You belongs all praise.",
    note: "Bangun tegak semula dengan tenang.",
    noteEn: "Rise back upright calmly.",
    hasAudio: true,
  },
  {
    id: 8,
    name: "Sujud Pertama",
    nameEn: "First Prostration",
    pose: "sujud",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
    transliteration: "Subḥāna rabbiyal-a'lā wa biḥamdih",
    meaning: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya. (Dibaca 3 kali)",
    meaningEn: "Glory to my Lord, the Most High, and praise be to Him. (Recited 3 times)",
    note: "Tujuh anggota sujud: dahi & hidung, dua tapak tangan, dua lutut, hujung dua kaki.",
    noteEn: "Seven points of prostration: forehead & nose, both palms, both knees, and the tips of both feet.",
    hasAudio: true,
  },
  {
    id: 9,
    name: "Duduk Antara Dua Sujud",
    nameEn: "Sitting Between Prostrations",
    pose: "duduk",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    transliteration: "Rabbighfir lī, warḥamnī, wajburnī, warfa'nī, warzuqnī, wahdinī, wa 'āfinī, wa'fu 'annī",
    meaning: "Wahai Tuhanku, ampunilah aku, kasihanilah aku, cukupkanlah kekuranganku, angkatlah darjatku, berilah aku rezeki, berilah aku petunjuk, sihatkanlah aku, dan maafkanlah aku.",
    meaningEn: "O my Lord, forgive me, have mercy on me, support me, raise my rank, provide for me, guide me, grant me well-being, and pardon me.",
    hasAudio: true,
  },
  {
    id: 10,
    name: "Sujud Kedua",
    nameEn: "Second Prostration",
    pose: "sujud",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
    transliteration: "Subḥāna rabbiyal-a'lā wa biḥamdih",
    meaning: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya. (Dibaca 3 kali)",
    meaningEn: "Glory to my Lord, the Most High, and praise be to Him. (Recited 3 times)",
    note: "Selepas ini bangun ke rakaat berikutnya, atau duduk tahiyat.",
    noteEn: "After this, rise for the next rak'ah, or sit for the tashahhud.",
    hasAudio: true,
  },
  {
    id: 11,
    name: "Tahiyat Akhir",
    nameEn: "Final Tashahhud",
    pose: "tashahhud",
    arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلّٰهِ ۝ أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ",
    transliteration: "At-taḥiyyātul-mubārakātuṣ-ṣalawātuṭ-ṭayyibātu lillāh. Asyhadu allā ilāha illallāh, wa asyhadu anna Muḥammadar rasūlullāh.",
    meaning: "Segala penghormatan, keberkatan, rahmat dan kebaikan adalah milik Allah. Aku bersaksi bahawa tiada Tuhan melainkan Allah, dan aku bersaksi bahawa Nabi Muhammad itu pesuruh Allah.",
    meaningEn: "All greetings, blessings and good things are for Allah. I bear witness that there is no god but Allah, and that Muhammad is the Messenger of Allah.",
    hasAudio: true,
  },
  {
    id: 12,
    name: "Selawat",
    nameEn: "Salutations on the Prophet ﷺ",
    pose: "tashahhud",
    arabic: "اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ",
    transliteration: "Allāhumma ṣalli 'alā sayyidinā Muḥammad, wa 'alā āli sayyidinā Muḥammad",
    meaning: "Ya Allah, limpahkanlah rahmat ke atas junjungan kami Nabi Muhammad dan ke atas keluarga junjungan kami Nabi Muhammad.",
    meaningEn: "O Allah, send Your grace upon our master Muhammad and upon the family of our master Muhammad.",
    note: "Disambung dengan selawat penuh (Ibrahimiyyah) dalam tahiyat akhir.",
    noteEn: "Continued with the full salawat (Ibrahimiyyah) in the final tashahhud.",
    hasAudio: true,
  },
  {
    id: 13,
    name: "Salam",
    nameEn: "Closing Salam",
    pose: "salam",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
    transliteration: "As-salāmu 'alaykum wa raḥmatullāh",
    meaning: "Semoga kesejahteraan dan rahmat Allah ke atas kamu. Dipalingkan muka ke kanan, kemudian ke kiri.",
    meaningEn: "Peace and mercy of Allah be upon you. Turn the face to the right, then to the left.",
    note: "Mengakhiri solat — salam pertama adalah rukun.",
    noteEn: "Concludes the prayer — the first salam is a pillar.",
    hasAudio: true,
  },
];

// ---------------------------------------------------------------------------
// BACAAN LIBRARY — quick-reference recitations with audio
// ---------------------------------------------------------------------------
export interface Bacaan {
  id: string;
  title: string;
  titleEn: string;
  when: string;
  whenEn: string;
  arabic: string;
  transliteration: string;
  /** When true, Arabic/transliteration still awaits ustaz verification. */
  pending?: boolean;
}

export const BACAAN: Bacaan[] = [
  {
    id: "takbir",
    title: "Takbiratul Ihram",
    titleEn: "Opening takbir",
    when: "Permulaan solat",
    whenEn: "Start of prayer",
    arabic: "اللّٰهُ أَكْبَر",
    transliteration: "Allāhu Akbar",
  },
  {
    id: "ruku",
    title: "Tasbih Rukuk",
    titleEn: "Bowing glorification",
    when: "Ketika rukuk (3×)",
    whenEn: "During bowing (3×)",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
    transliteration: "Subḥāna rabbiyal-'aẓīmi wa biḥamdih",
  },
  {
    id: "itidal",
    title: "Iktidal",
    titleEn: "Rising",
    when: "Bangun dari rukuk",
    whenEn: "Rising from bowing",
    arabic: "سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ",
    transliteration: "Sami'allāhu liman ḥamidah · Rabbanā lakal-ḥamd",
  },
  {
    id: "sujud",
    title: "Tasbih Sujud",
    titleEn: "Prostration glorification",
    when: "Ketika sujud (3×)",
    whenEn: "During prostration (3×)",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
    transliteration: "Subḥāna rabbiyal-a'lā wa biḥamdih",
  },
  {
    id: "duduk",
    title: "Duduk Antara Dua Sujud",
    titleEn: "Between prostrations",
    when: "Antara dua sujud",
    whenEn: "Between the two prostrations",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
    transliteration: "Rabbighfir lī warḥamnī wajburnī warfa'nī warzuqnī wahdinī wa 'āfinī wa'fu 'annī",
  },
  {
    id: "salam",
    title: "Salam",
    titleEn: "Closing salam",
    when: "Mengakhiri solat",
    whenEn: "Ending the prayer",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
    transliteration: "As-salāmu 'alaykum wa raḥmatullāh",
  },
  {
    id: "tahiyatawal",
    title: "Tahiyat Awal",
    titleEn: "First tashahhud",
    when: "Duduk tahiyat pertama",
    whenEn: "First sitting (tashahhud)",
    arabic:
      "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلّٰهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللّٰهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللّٰهِ",
    transliteration:
      "At-taḥiyyātul mubārakātuṣ ṣalawātuṭ ṭayyibātu lillāh. As-salāmu 'alayka ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh. As-salāmu 'alaynā wa 'alā 'ibādillāhiṣ ṣāliḥīn. Ashhadu an lā ilāha illallāh, wa ashhadu anna Muḥammadar rasūlullāh",
    pending: true,
  },
  {
    id: "qunutsubuh",
    title: "Doa Qunut Subuh",
    titleEn: "Qunut supplication (Fajr)",
    when: "Iktidal rakaat kedua solat Subuh",
    whenEn: "Standing after bowing, 2nd rak'ah of Fajr",
    arabic:
      "اللّٰهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ",
    transliteration:
      "Allāhummahdinī fīman hadayt, wa 'āfinī fīman 'āfayt, wa tawallanī fīman tawallayt, wa bārik lī fīmā a'ṭayt, wa qinī sharra mā qaḍayt",
    pending: true,
  },
  {
    id: "sujudtilawah",
    title: "Doa Sujud Tilawah",
    titleEn: "Prostration of recitation",
    when: "Ketika sujud tilawah",
    whenEn: "During the prostration of recitation",
    arabic:
      "سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ وَصَوَّرَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللّٰهُ أَحْسَنُ الْخَالِقِينَ",
    transliteration:
      "Sajada wajhiya lillażī khalaqahu wa ṣawwarahu, wa shaqqa sam'ahu wa baṣarahu biḥawlihi wa quwwatih, fa tabārakallāhu aḥsanul khāliqīn",
    pending: true,
  },
];

// ---------------------------------------------------------------------------
// QUIZ — test understanding (10 questions)
// ---------------------------------------------------------------------------
export interface Quiz {
  id: number;
  q: string;
  qEn: string;
  options: string[];
  optionsEn: string[];
  answer: number; // index
  explain: string;
  explainEn: string;
}

export const QUIZ: Quiz[] = [
  {
    id: 1,
    q: "Apakah lafaz yang menandakan permulaan solat?",
    qEn: "Which phrase marks the beginning of the prayer?",
    options: ["Subhanallah", "Allahu Akbar (Takbiratul Ihram)", "Alhamdulillah", "Astaghfirullah"],
    optionsEn: ["Subhanallah", "Allahu Akbar (Opening Takbir)", "Alhamdulillah", "Astaghfirullah"],
    answer: 1,
    explain: "Takbiratul Ihram (Allahu Akbar) adalah rukun yang menandakan bermulanya solat.",
    explainEn: "Takbiratul Ihram (Allahu Akbar) is the pillar that marks the start of the prayer.",
  },
  {
    id: 2,
    q: "Surah apakah yang WAJIB dibaca pada setiap rakaat?",
    qEn: "Which surah is obligatory in every rak'ah?",
    options: ["Al-Ikhlas", "Al-Fatihah", "Al-Falaq", "An-Nas"],
    optionsEn: ["Al-Ikhlas", "Al-Fatihah", "Al-Falaq", "An-Nas"],
    answer: 1,
    explain: "Membaca Al-Fatihah adalah rukun dan wajib pada setiap rakaat.",
    explainEn: "Reciting Al-Fatihah is a pillar and is obligatory in every rak'ah.",
  },
  {
    id: 3,
    q: "Berapakah bilangan rukun solat dalam mazhab Syafie?",
    qEn: "How many pillars (rukun) of prayer are there in the Shafi'i school?",
    options: ["10", "13", "17", "5"],
    optionsEn: ["10", "13", "17", "5"],
    answer: 1,
    explain: "Terdapat 13 rukun solat dalam mazhab Syafie.",
    explainEn: "There are 13 pillars of prayer in the Shafi'i school.",
  },
  {
    id: 4,
    q: "Apakah yang dibaca ketika rukuk?",
    qEn: "What is recited while bowing (ruku')?",
    options: ["Subhana rabbiyal a'la", "Subhana rabbiyal 'azim", "Rabbana lakal hamd", "Allahu Akbar"],
    optionsEn: ["Subhana rabbiyal a'la", "Subhana rabbiyal 'azim", "Rabbana lakal hamd", "Allahu Akbar"],
    answer: 1,
    explain: "Ketika rukuk dibaca 'Subhana rabbiyal 'azimi wa bihamdih'.",
    explainEn: "While bowing, one recites 'Subhana rabbiyal 'azimi wa bihamdih'.",
  },
  {
    id: 5,
    q: "Berapakah jumlah anggota sujud yang menyentuh tempat sujud?",
    qEn: "How many body parts touch the ground in prostration?",
    options: ["5", "6", "7", "9"],
    optionsEn: ["5", "6", "7", "9"],
    answer: 2,
    explain: "Tujuh anggota: dahi & hidung, dua tapak tangan, dua lutut, dan hujung dua kaki.",
    explainEn: "Seven parts: the forehead & nose, both palms, both knees, and the tips of both feet.",
  },
  {
    id: 6,
    q: "Manakah antara berikut adalah SYARAT SAH solat?",
    qEn: "Which of the following is a CONDITION for a valid prayer?",
    options: ["Membaca doa iftitah", "Menghadap kiblat", "Membaca surah panjang", "Berjemaah"],
    optionsEn: ["Reciting the opening supplication", "Facing the qiblah", "Reciting a long surah", "Praying in congregation"],
    answer: 1,
    explain: "Menghadap kiblat adalah salah satu syarat sah solat.",
    explainEn: "Facing the qiblah is one of the conditions for a valid prayer.",
  },
  {
    id: 7,
    q: "Apakah yang dibaca ketika sujud?",
    qEn: "What is recited while prostrating (sujud)?",
    options: ["Subhana rabbiyal 'azim", "Subhana rabbiyal a'la wa bihamdih", "Sami'allahu liman hamidah", "At-tahiyyat"],
    optionsEn: ["Subhana rabbiyal 'azim", "Subhana rabbiyal a'la wa bihamdih", "Sami'allahu liman hamidah", "At-tahiyyat"],
    answer: 1,
    explain: "Ketika sujud dibaca 'Subhana rabbiyal a'la wa bihamdih'.",
    explainEn: "While prostrating, one recites 'Subhana rabbiyal a'la wa bihamdih'.",
  },
  {
    id: 8,
    q: "Bilakah tahiyat akhir dibaca?",
    qEn: "When is the final tashahhud recited?",
    options: ["Pada rakaat pertama", "Ketika rukuk", "Pada duduk terakhir sebelum salam", "Selepas salam"],
    optionsEn: ["In the first rak'ah", "While bowing", "In the final sitting before salam", "After the salam"],
    answer: 2,
    explain: "Tahiyat akhir dibaca pada duduk terakhir sebelum memberi salam.",
    explainEn: "The final tashahhud is recited in the last sitting, just before giving the salam.",
  },
  {
    id: 9,
    q: "Apakah lafaz untuk mengakhiri solat?",
    qEn: "What phrase ends the prayer?",
    options: ["Allahu Akbar", "Assalamu'alaikum warahmatullah", "Subhanallah", "Amin"],
    optionsEn: ["Allahu Akbar", "Assalamu'alaikum warahmatullah", "Subhanallah", "Amin"],
    answer: 1,
    explain: "Salam ('Assalamu'alaikum warahmatullah') mengakhiri solat.",
    explainEn: "The salam ('Assalamu'alaikum warahmatullah') concludes the prayer.",
  },
  {
    id: 10,
    q: "Apakah maksud 'tomakninah' dalam solat?",
    qEn: "What does 'tuma'ninah' mean in prayer?",
    options: ["Membaca dengan kuat", "Diam & tenang seketika pada setiap rukun", "Bersolat dengan cepat", "Mengangkat tangan"],
    optionsEn: ["Reciting loudly", "Pausing calmly and still at each pillar", "Praying quickly", "Raising the hands"],
    answer: 1,
    explain: "Tomakninah bermaksud berhenti tenang seketika sehingga anggota badan stabil pada setiap rukun fi'li.",
    explainEn: "Tuma'ninah means pausing calmly and still until the limbs settle at each physical pillar.",
  },
];

export const NAV_ITEMS = [
  { id: "about", label: "Pengenalan", labelEn: "About" },
  { id: "syarat", label: "Syarat Solat", labelEn: "Conditions" },
  { id: "rukun", label: "Rukun Solat", labelEn: "Pillars" },
  { id: "kaifiat", label: "Cara Solat", labelEn: "Steps" },
  { id: "explorer", label: "Posisi", labelEn: "Postures" },
  { id: "bacaan", label: "Bacaan", labelEn: "Recitations" },
  { id: "kuiz", label: "Kuiz", labelEn: "Quiz" },
  { id: "hubungi", label: "Hubungi", labelEn: "Contact" },
];
