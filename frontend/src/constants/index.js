export const COLORS = {
  NONE: "none",
  RED: "#E07D83",
  GRAY: "#161616",
  BLACK: "#000000",
  WHITE: "#ffffff",
  GREEN: "#0f5132",
  GRAY_2: "#87888c",
  YELLOW: "#fff000",
  ORANGE: "#f5593d",
  LIGHT_BLUE: "#A9DFD8",
  TRANSPARENT: "transparent",
};

export const API = {
  GET: "get",
  POST: "post",
  DOMAIN: {
    CONTACT: "https://akatary.com/api",
  },
};

export const SECTIONS = {
  HOME: {
    TITLE: "home",
  },

  DONATE: {
    TITLE: "donate",
  },

  LIFE: {
    TITLE: "life",
  },

  MAILING_LIST: {
    TITLE: "mailing-list",
  },

  CONTACT: {
    TITLE: "contact",
  },

  INFO: {
    TITLE: "info",
  },

  TEAM: {
    TITLE: "team",
  },

  RESOURCES: {
    TITLE: "resources",
  },

  CAREER: {
    TITLE: "career",
    SUB_SECTIONS: [
      { title: "referral-listings", component: "ReferralPage" },
      { title: "job-postings", component: "" },
      { title: "resume-book", href: "https://forms.gle/11Dxz3mB3U3CiRPC6" },
    ],
  },

  SIGN_IN: {
    TITLE: "sign-in",
  },

  RAMADAN: {
    TITLE: "ramadan",
  },
};

export const THEME = {
  PRIMARY: "#ffffff",
  SECONDARY: "#000000",

  FONT: {
    TITLE: "28px",
  },

  GALLERY: {
    SLIDESHOW: {
      STYLE: {
        margin: "10px",
        width: "400px",
        height: "400px",
      },
      IMG: {
        STYLE: {
          width: "400px",
          height: "400px",
          objectFit: "cover",
        },
      },
    },
  },

  CONTACT: {
    WIDTH: 400,
    STYLE: {
      SEND_BTN: {
        padding: "10px",
        paddingLeft: "40px",
        paddingRight: "40px",
      },
      CONTAINER: {
        margin: "10px",
        padding: "30px",
      },
    },
    EMAIL: "akatary23@gmail.com",
  },

  NAV: {
    WIDTH: 225,
    HEIGHT: 180,
    STYLE: {
      LINK: { textDecoration: "none" },
      BTN: {
        // width: "40%",
        color: "#000000",
        fontSize: "12px",
        fontWeight: "bold",
        textDecoration: "none",
        justifyContent: "flex-start",
      },
    },
  },

  MAILING_LIST: {
    FORM_FIELD: {
      STYLE: {
        height: "45px",
        margin: "30px 15px 0 15px",
        width: "max(min(calc(35% - 20px), 350px), 300px)",
      },

      INPUT_STYLE: {
        height: "35px",
        padding: "5px",
        fontSize: "14px",
        color: COLORS.GRAY,
      },

      LABEL_STYLE: {
        fontSize: "16px",
        color: COLORS.GRAY_2,
      },
    },

    SEND_BTN: {
      STYLE: {
        height: "40px",
        width: "200px",
        fontSize: "1em",
        color: COLORS.WHITE,
        backgroundColor: COLORS.ORANGE,
      },
    },
  },
};

export const DATE = {
  DATE_FORMAT: "mm/dd/yyyy",
  DAYS: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  MONTHS: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
};

export const PRAYERS = {
  NAMES: ["fajr", "dhuhr", "asr", "maghrib", "isha"],
};

export const chaplainInfo = {
  name: "Sister Nada Miqdadi El-Alami",
  role: "MIT Muslim Chaplain",
  biography: `Sister Nada Miqdadi El-Alami has been the MIT Muslim Chaplain to the Institute since 2017. Nada serves the needs of MIT Muslims by providing spiritual programming, supporting students, and advocating for student needs on campus. Prior to coming to MIT, Sister Nada served for over 15 years in leading spiritual study circles. She has planned and supported faith-oriented programs, such as camps and retreats, both locally and nationally. In addition, Sister Nada has led educational institutions focusing on young Muslims. Sister Nada holds a BA in psychology and an MA in Administration and Leadership, and is pursuing a second MA in Islamic Leadership at Boston Islamic Seminary. She has been awarded an Ijaza (authenticated certificate) in teaching Qur’anic reading.`,
  activities: [
    {
      title: "Leads Friday Connect",
      description: `A weekly spiritual gathering where a variety of topics are discussed, and speakers are welcome. Topics are suggested by attendees. Connect runs during the school year at 5:30 in the Musalla (Room W11-110). Dinner is provided for free.`,
    },
    {
      title: "Student Outreach",
      description: `Reaches out to Muslim students to check on their wellbeing and hear about their experiences.`,
    },
    {
      title: "Mentorship",
      description: `Mentors some students and helps others with personal, social, spiritual, or academic concerns.`,
    },
    {
      title: "Collaboration with Dr. Hossein Mosallaei",
      description: `Works with Dr. Hossein Mosallaei, the Muslim Shia Chaplain and advisor to Mobin, to ensure all students are served with equity.`,
    },
    {
      title: "Advocacy",
      description: `Advocates for the needs of Muslims on campus, including housing accommodations, halal food, academic accommodations during Ramadan, and more.`,
    },
    {
      title: "Representation",
      description: `Represents Muslims during meetings or when asked to speak as part of a panel.`,
    },
    {
      title: "Islam 101 Sessions",
      description: `Provides introductory Islam sessions during the Independent Activities Period (IAP).`,
    },
    {
      title: "Interfaith Programs",
      description: `Works with other chaplains from ORSEL (Office of Religious Spiritual Ethical Life) to provide programs for all students.`,
    },
  ],
  contact: {
    address: "40 Massachusetts Avenue, Building W11 - Room 011",
    phone: "(617) 258-9285",
    email: "mchnada@mit.edu",
  },
};

export const resources = [
  {
    category: "Muslim Mental Health Resources",
    items: [
      { name: "Khalil Center", link: "https://khalilcenter.com/" },
      { name: "Family Youth Institute", link: "https://www.thefyi.org/" },
      { name: "Naseeha", link: "https://naseeha.org" },
    ],
  },
  {
    category: "Qur’an Resources",
    items: [
      { name: "Quran.com", link: "https://quran.com/" },
      { name: "Tanzeel.com", link: "https://www.tanzeel.com/" },
    ],
  },
  {
    category: "Qur’an Exegesis Resources",
    items: [
      {
        name: "Ibn Katheer (audio)",
        link: "https://www.salafisounds.com/tafsir-ibn-kathir-by-abu-hakeem-bilal-davis/",
      },
      { name: "Al-Mawdudi", link: "http://www.englishtafsir.com/" },
      {
        name: "In the Shade of the Qur’an",
        link: "https://alhamdolillah.com/book/in-the-shade-of-the-quran-english-sayyid-qutb-shaheed/",
      },
    ],
  },
  {
    category: "Hadith Resources",
    items: [
      { name: "Sunnah.com", link: "https://sunnah.com/" },
      {
        name: "Forty Hadith Nawawi",
        link: "https://d1.islamhouse.com/data/en/ih_books/single2/en-hadith-nawawy-sahih.pdf",
      },
    ],
  },
  {
    category: "Seerah / Life Story of Prophet Muhammad",
    items: [
      {
        name: "Meeting Muhammad (videos)",
        link: "https://www.youtube.com/playlist?app=desktop&amp;list=PLQ02IYL5pmhHvZ02LKQVeey8H-2XBKMGb",
      },
      {
        name: "Seerah by Yasir Qadhi (videos)",
        link: "https://www.youtube.com/watch?v=95K8HQbbeS0&amp;list=PLAEA99D24CA2F9A8F",
      },
      {
        name: "Men and Women Around the Messenger",
        link: "https://www.kalamullah.com/Books/Men%20And%20Women%20Around%20the%20Messenger.pdf",
      },
    ],
  },
  {
    category: "Theology",
    items: [
      {
        name: "Al-Sanusi",
        link: "https://sunnianswers.files.wordpress.com/2011/08/sanusicreed-abuadam.pdf",
      },
      {
        name: "Al-Hanbali’s The Keys to Paradise",
        link: "https://maktabahassunnahblog.files.wordpress.com/2015/10/the-key-to-paradise.pdf",
      },
      {
        name: "Dehlevi’s Perfection of Faith",
        link: "https://archive.org/details/PerfectionOfFaith/page/n15/mode/2up",
      },
    ],
  },
  {
    category: "Women",
    items: [
      {
        name: "Female Scholars",
        link: "https://muslimmatters.org/2021/03/15/two-questions-about-the-dictionary-of-female-scholars/",
      },
      {
        name: "Upheld by Allah (videos)",
        link: "https://yaqeeninstitute.org/yaqeen-institute/trailer-upheld-by-allah-women-in-the-quran",
      },
      {
        name: "Yasmin Mogahed (video)",
        link: "https://www.youtube.com/watch?v=m5Wt_h7_WPQ",
      },
      {
        name: "Female Companions",
        link: "https://ayeina.com/stories-of-sahabiyat/",
      },
      {
        name: "Islamic Ruling on Hijab",
        link: "https://yaqeeninstitute.org/read/paper/is-hijab-religious-or-cultural-how-islamic-rulings-are-formed",
      },
    ],
  },
  {
    category: "Purification",
    items: [
      {
        name: "Purification of the Heart",
        link: "https://data.nur.nu/Kutub/English/Hamza-Yusuf_Purification-of-the-Heart.pdf",
      },
      {
        name: "Heart Therapy by Albarghouthi",
        link: "http://www.kalamullah.com/Books/Heart%20Therapy.pdf",
      },
    ],
  },
  {
    category: "General Topics",
    items: [
      { name: "About Islam", link: "https://aboutislam.net/" },
      { name: "Yaqeen Institute", link: "https://yaqeeninstitute.org/" },
      { name: "Muslim Matters", link: "http://muslimmatters.org/" },
    ],
  },
  {
    category: "Questions about Islam and Muslims",
    items: [
      {
        name: "ING - Answers to FAQs about Islam and Muslims",
        link: "https://ing.org/resources/for-all-groups/answers-to-frequently-asked-questions/answers-to-frequently-asked-questions-about-islam-and-muslims/",
      },
      {
        name: "Towards Eternity (videos)",
        link: "https://www.youtube.com/@TowardsEternity/videos",
      },
      {
        name: "Institute of Social Policy and Understanding",
        link: "https://www.ispu.org/",
      },
      {
        name: "American Muslims: Facts vs. Fiction",
        link: "https://www.upf.tv/films/american-muslim-facts/",
      },
    ],
  },
  {
    category: "Ramadan and Eid",
    items: [
      { name: "Ramadan", link: "https://www.whyislam.org/ramadan/" },
      { name: "Eid-al-Adha", link: "https://www.whyislam.org/eidaladha/" },
    ],
  },
  {
    category: "Just for Fun",
    items: [
      {
        name: "Fit for Allah",
        link: "https://www.instagram.com/zainab_fitforallah/?hl=en",
      },
      { name: "Aida Azlin", link: "https://www.aidaazlin.com/" },
      {
        name: "Deen and Chai",
        link: "https://www.youtube.com/channel/UCiTGEEhMAaBu6LPuPXsDYYQ/featured",
      },
    ],
  },
];
