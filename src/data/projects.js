// Project preview screenshots
import hivesuiteWeb from "../images/hivesuite-web-app.png";
import hivesuiteGit from "../images/hivesuite-git-code.png";

import hsnapsPlaystore from "../images/hsnaps-playstore.png";
import hsnapsGit from "../images/hsnaps-git-code.png";

import hreplierPlaystore from "../images/hreplier-playstore.png";
import hreplierAppstore from "../images/hreplier-appstore.png";
import hreplierGit from "../images/hreplier-git-code.png";

import hiveReactKitNpm from "../images/hive-react-kit-npm-ui-package.png";
import hiveReactKitGit from "../images/hive-react-kit-git-code.png";

import securepoolNpm from "../images/securepool-npm-auth-package.png";
import securepoolGit from "../images/securepool-git-code.png";

import distriatorWeb from "../images/distriator-web-app.png";
import distriatorPlaystore from "../images/distriator-playstore.png";
import distriatorAppstore from "../images/distriator-appstore.png";
import distriatorGit from "../images/distriator-git-code.png";

import hiveAuthNpm from "../images/hive-authenttication-npm.png";
import hiveAuthGit from "../images/hive-authentication-git-code.png";

import hstatsPlaystore from "../images/hstats-playstore.png";
import hstatsAppstore from "../images/hstats-appstore.png";
import hstatsGit from "../images/hive-stats-git-code.png";

import hffWeb from "../images/hive-fest-facts-webapp.png";
import hffPlaystore from "../images/hive-fest-facts-playstore.png";
import hffAppstore from "../images/hive-fest-facts-ios-appstore.png";
import hffGit from "../images/hive-fest-facts-git-code.png";

import threespeakPlaystore from "../images/threespeak-playstore.png";
import threespeakAppstore from "../images/threespeak-appstore.png";
import threespeakGit from "../images/threespeak-git-code.png";

import checkinWeb from "../images/checkinwithxwz.png";
import checkinPlaystore from "../images/checkinwithxyz-playstore.png";
import checkinAppstore from "../images/checkinwithxyz-appstore.png";
import checkinGit from "../images/checkinwithxyz-git-code.png";

import hiveFlutterKitPub from "../images/hive-flutter-kit.png";
import hiveFlutterKitGit from "../images/hive-flutter-kit-git-code.png";

// Earlier project screenshots (2022 – early 2024)
import workIt from "../images/workIt.png";
import leaderBoard from "../images/leaderBoard.png";
import missingPeople from "../images/0.png";
import flipkartClone from "../images/1.png";
import shreeKrushana from "../images/10.png";
import krupasindhuNgo from "../images/2.png";
import personalLibrary from "../images/5.png";
import crackitAcademy from "../images/6.png";

// Preview-type metadata: label, icon, accent — used by ProjectCard
export const PREVIEW_TYPES = {
  web: { label: "Web App", icon: "fa-solid fa-globe", color: "text-sky-blue" },
  playstore: {
    label: "Play Store",
    icon: "fa-brands fa-google-play",
    color: "text-mint",
  },
  appstore: {
    label: "App Store",
    icon: "fa-brands fa-app-store-ios",
    color: "text-cyan-glow",
  },
  git: {
    label: "Source",
    icon: "fa-brands fa-github",
    color: "text-text-white",
  },
  npm: {
    label: "npm",
    icon: "fa-brands fa-npm",
    color: "text-red-400",
  },
  pubdev: {
    label: "pub.dev",
    icon: "fa-solid fa-cube",
    color: "text-sky-blue",
  },
};

export const PROJECT_CATEGORIES = ["All", "Mobile", "Web", "SDK / Package"];

// Projects in display order — most recent / most important first.
// (User listed them oldest-to-newest; this array is the reversed display order.)
export const PROJECTS = [
  {
    title: "HiveSuite — Master App",
    tagline: "One app for the whole Hive ecosystem",
    description:
      "A unified master app combining hStats, hReplier, hSnaps, hPolls, 3Speak videos & shorts, and free games under a single experience. Built on top of Hive React Kit (UI components) and hive-authentication (auth). Web app live; Play Store and App Store releases in progress.",
    tags: ["Web", "Mobile"],
    badge: "Flagship · In Progress",
    techStack: [
      "React.js",
      "Capacitor.js",
      "Tailwind CSS",
      "Zustand",
      "Hive React Kit",
      "hive-authentication",
    ],
    previews: [
      {
        type: "web",
        image: hivesuiteWeb,
        url: "https://hivesuite.app/",
      },
      {
        type: "git",
        image: hivesuiteGit,
        url: "https://github.com/TechCoderLabz/hivesuite.app",
        private: true,
      },
    ],
  },
  {
    title: "hSnaps — Unified Hive Snaps Reader",
    tagline: "All Hive snap platforms in one social feed",
    description:
      "A single Hive social app that aggregates snaps from across the ecosystem — Peakd Snaps, Ecency Waves, Leo Threads, and LikeTu Snaps — into one unified feed. Originally shipped as a standalone Capacitor.js app with auth via hive-authentication; the experience now lives inside HiveSuite while the original build remains live on Google Play.",
    tags: ["Mobile"],
    badge: "Live on Play Store",
    techStack: [
      "React.js",
      "Vite",
      "Capacitor.js",
      "Tailwind CSS",
      "Zustand",
      "hive-authentication",
      "Hive React Kit",
    ],
    previews: [
      {
        type: "playstore",
        image: hsnapsPlaystore,
        url: "https://play.google.com/store/apps/details?id=one.sagarkothari88.hsnaps",
      },
      {
        type: "git",
        image: hsnapsGit,
        url: "https://github.com/techCoderLabz/hSnaps",
        private: true,
      },
    ],
  },
  {
    title: "hReplier — Inbox & Replies",
    tagline: "Mobile inbox manager, now folded into HiveSuite",
    description:
      "Mobile inbox & reply manager for the Hive community. Originally shipped as a standalone Capacitor.js app on Play Store and App Store; the experience now lives inside HiveSuite while the original builds remain live on both stores.",
    tags: ["Mobile"],
    badge: "Play Store + App Store",
    techStack: [
      "React.js",
      "Capacitor.js",
      "REST APIs",
      "hive-authentication",
    ],
    previews: [
      {
        type: "playstore",
        image: hreplierPlaystore,
        url: "https://play.google.com/store/apps/details?id=com.thehivemobile.inbox",
      },
      {
        type: "appstore",
        image: hreplierAppstore,
        url: "https://apps.apple.com/us/app/hreplier/id6596756765",
      },
      {
        type: "git",
        image: hreplierGit,
        url: "https://github.com/sag333ar/hreplier-react",
        private: true,
      },
    ],
  },
  {
    title: "Hive React Kit",
    tagline: "Open-source React UI library powering the Hive apps",
    description:
      "An open-source React component library that powers the UI across HiveSuite, hStats, hReplier, hSnaps and the rest of the ecosystem. Modular components for video feeds, social interactions, and blockchain auth — all typed and Tailwind-friendly.",
    tags: ["SDK / Package", "Web"],
    badge: "Open Source · Production",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Zustand", "npm"],
    previews: [
      {
        type: "npm",
        image: hiveReactKitNpm,
        url: "https://www.npmjs.com/package/hive-react-kit",
      },
      {
        type: "git",
        image: hiveReactKitGit,
        url: "https://github.com/sag333ar/hivereactkit",
      },
    ],
  },
  {
    title: "securepool",
    tagline: "Personal open-source npm package",
    description:
      "An open-source npm package providing secure connection-pooling and lightweight authentication utilities for Node.js services. One of three SDKs I've published to accelerate downstream development.",
    tags: ["SDK / Package"],
    badge: "Open Source",
    techStack: ["Node.js", "TypeScript", "npm"],
    previews: [
      {
        type: "npm",
        image: securepoolNpm,
        url: "https://www.npmjs.com/package/securepool",
      },
      {
        type: "git",
        image: securepoolGit,
        url: "https://github.com/Lokeshburade007/lds-auth",
      },
    ],
  },
  {
    title: "Distriator — Hive Commerce & Cashback",
    tagline: "Full-stack commerce platform with blockchain cashback",
    description:
      "A responsive full-stack commerce platform built with React + Vite + Tailwind on the front-end and a Node.js + MongoDB backend serving REST APIs. Hive blockchain integration via dhive powers purchase proofs and on-chain cashback rewards. Shipped as a web app, Android app, and iOS app from a single Capacitor.js codebase.",
    tags: ["Web", "Mobile"],
    badge: "Production",
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "dhive",
      "Capacitor.js",
    ],
    previews: [
      {
        type: "web",
        image: distriatorWeb,
        url: "https://distriator.com",
      },
      {
        type: "playstore",
        image: distriatorPlaystore,
        url: "https://play.google.com/store/apps/details?id=com.distriator.app",
      },
      {
        type: "appstore",
        image: distriatorAppstore,
        url: "https://play.google.com/store/apps/details?id=com.distriator.app",
      },
      {
        type: "git",
        image: distriatorGit,
        url: "https://github.com/sag333ar/cashback-distriator",
        private: true,
      },
    ],
  },
  {
    title: "hive-authentication",
    tagline: "Aioha-powered auth package for the Hive ecosystem",
    description:
      "An open-source npm package built on top of aioha (aioha.dev) — the all-in-one Hive authentication library — wrapping every major Hive sign-in method (Keychain, HiveAuth, HiveSigner, PeakVault, Ledger) behind a single, React-friendly API with JWT session management. Powers auth across every Hive app I work on.",
    tags: ["SDK / Package", "Web"],
    badge: "Open Source · Production",
    techStack: ["React.js", "TypeScript", "aioha", "JWT", "npm"],
    previews: [
      {
        type: "npm",
        image: hiveAuthNpm,
        url: "https://www.npmjs.com/package/hive-authentication",
      },
      {
        type: "git",
        image: hiveAuthGit,
        url: "https://github.com/techCoderLabz/hive-authentication",
      },
    ],
  },
  {
    title: "hStats — Hive Account Info",
    tagline: "Comprehensive Hive account analytics on mobile",
    description:
      "A mobile app providing deep Hive blockchain account stats and analytics. Live on Google Play Store and Apple App Store with auth via hive-authentication and UI from Hive React Kit.",
    tags: ["Mobile"],
    badge: "Play Store + App Store",
    techStack: [
      "React.js",
      "Capacitor.js",
      "Tailwind CSS",
      "Hive React Kit",
      "hive-authentication",
    ],
    previews: [
      {
        type: "playstore",
        image: hstatsPlaystore,
        url: "https://play.google.com/store/apps/details?id=one.sagarkothari88.hivestats",
      },
      {
        type: "appstore",
        image: hstatsAppstore,
        url: "https://apps.apple.com/us/app/hstats-hive-account-info/id6759279628",
      },
      {
        type: "git",
        image: hstatsGit,
        url: "https://github.com/sag333ar/hive-stats-reactjs",
        private: true,
      },
    ],
  },
  {
    title: "Hive Fest Facts",
    tagline: "Web + mobile companion for HiveFest events",
    description:
      "A cross-platform companion app for HiveFest — surfacing facts, schedules, and updates. Available as a web app, Android app, and iOS app, all backed by a single shared codebase.",
    tags: ["Web", "Mobile"],
    badge: "Web · Play Store · App Store",
    techStack: [
      "React.js",
      "Capacitor.js",
      "Tailwind CSS",
      "Hive React Kit",
    ],
    previews: [
      {
        type: "web",
        image: hffWeb,
        url: "https://hivefestfacts.sagarkothari88.one/",
      },
      {
        type: "playstore",
        image: hffPlaystore,
        url: "https://play.google.com/store/search?q=hive+fest+facts",
      },
      {
        type: "appstore",
        image: hffAppstore,
        url: "https://apps.apple.com/us/search?term=hive+fest+facts",
      },
      {
        type: "git",
        image: hffGit,
        url: "https://github.com/sag333ar/hivefestLeaks",
        private: true,
      },
    ],
  },
  {
    title: "3Speak — Decentralized Video",
    tagline: "Cross-platform video streaming for the 3Speak community",
    description:
      "A cross-platform video streaming and social app built with React + Capacitor.js. Live on Google Play Store and Apple App Store with real-time API integrations, authentication, and smooth video playback — accelerating the team's release cycles by 40%.",
    tags: ["Mobile"],
    badge: "Play Store + App Store",
    techStack: ["React.js", "Capacitor.js", "REST APIs", "Node.js"],
    previews: [
      {
        type: "playstore",
        image: threespeakPlaystore,
        url: "https://play.google.com/store/apps/details?id=tv.threespeak.app",
      },
      {
        type: "appstore",
        image: threespeakAppstore,
        url: "https://apps.apple.com/us/search?term=3speak",
      },
      {
        type: "git",
        image: threespeakGit,
        url: "https://github.com/TechCoderLabz/3speak-reactjs",
      },
    ],
  },
  {
    title: "checkinwith.xyz — Hive Onboarding",
    tagline: "Guided onboarding for new Hive users",
    description:
      "A cross-platform onboarding application that helps new users join the Hive ecosystem with guided check-in flows. Available as a web app, Android app, and iOS app — built on Hive React Kit and hive-authentication.",
    tags: ["Web", "Mobile"],
    badge: "Web · Play Store · App Store",
    techStack: [
      "React.js",
      "Capacitor.js",
      "Tailwind CSS",
      "Hive React Kit",
      "hive-authentication",
    ],
    previews: [
      {
        type: "web",
        image: checkinWeb,
        url: "https://checkinwith.xyz",
      },
      {
        type: "playstore",
        image: checkinPlaystore,
        url: "https://play.google.com/store/apps/details?id=one.sagarkothari88.checkinwithxyz",
      },
      {
        type: "appstore",
        image: checkinAppstore,
        url: "https://apps.apple.com/us/app/checkinwithxyz-hive-onboarding/id6759791998",
      },
      {
        type: "git",
        image: checkinGit,
        url: "https://github.com/sag333ar/checkinwithxyz",
        private: true,
      },
    ],
  },
  {
    title: "Hive Flutter Kit",
    tagline: "Open-source Flutter SDK on pub.dev",
    description:
      "A Flutter SDK published on pub.dev with multi-method authentication (Keychain, HiveAuth, private keys), blockchain operations, and pre-built UI components — open-source for the Flutter Hive community.",
    tags: ["SDK / Package", "Mobile"],
    badge: "Open Source · pub.dev",
    techStack: ["Flutter", "Dart", "REST APIs"],
    previews: [
      {
        type: "pubdev",
        image: hiveFlutterKitPub,
        url: "https://pub.dev/packages/hive_flutter_kit",
      },
      {
        type: "git",
        image: hiveFlutterKitGit,
        url: "https://github.com/sag333ar/HiveFlutterKit",
      },
    ],
  },
];

// Earlier projects from college / freelance / first internship (2022 – early 2024).
// Kept in their own array so the page can render them as a separate section
// with a clear divider, while filtering still applies to both.
export const EARLIER_PROJECTS = [
  {
    title: "WorkIt — Software Ecommerce App",
    tagline: "Lead-generation app for TWJ IT Solutions",
    description:
      "Software-based ecommerce web application built during my internship at TWJ IT Solutions. Employees use it to generate leads from clients with an in-built rewards list.",
    tags: ["Web"],
    badge: "Internship Project",
    techStack: [
      "React.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Firebase",
      "Figma",
    ],
    previews: [
      {
        type: "git",
        image: workIt,
        url: "https://github.com/Lokeshburade007/WorkIT.git",
      },
    ],
  },
  {
    title: "LeaderBoard — Android App",
    tagline: "Companion Android leaderboard for WorkIt",
    description:
      "Native Android app showing weekly / monthly / yearly leaderboards based on the lead-generation reward system used at TWJ IT Solutions.",
    tags: ["Mobile"],
    badge: "Internship Project",
    techStack: ["Flutter", "Dart", "Android Studio", "Firebase", "Figma"],
    previews: [
      {
        type: "git",
        image: leaderBoard,
        url: "https://github.com/Lokeshburade007/LeaderBoard.git",
      },
    ],
  },
  {
    title: "Missing People Identification",
    tagline: "Final-year B.Tech project (Deep Learning)",
    description:
      "When a missing-person complaint is filed at any police station it's auto-entered into our database. Anyone who spots that person can search the web app and notify the nearest police station with one click.",
    tags: ["Web"],
    badge: "Final Year Project",
    techStack: [
      "Node.js",
      "Express",
      "EJS",
      "Tailwind CSS",
      "FaceAPI",
      "Twilio",
      "MongoDB",
    ],
    previews: [
      {
        type: "web",
        image: missingPeople,
        url: "https://missing-people-identification.onrender.com/",
      },
      {
        type: "git",
        image: missingPeople,
        url: "https://github.com/Lokeshburade007/missing-people-identification.git",
      },
    ],
  },
  {
    title: "Krupa Sindhu Seva — NGO Website",
    tagline: "Realtime NGO website (freelance)",
    description:
      "A static realtime website for Krupa Sindhu Seva, a real NGO. Delivered as a freelance build with HTML, Tailwind CSS, and JavaScript.",
    tags: ["Web"],
    badge: "Freelance",
    techStack: ["HTML", "Tailwind CSS", "JavaScript"],
    previews: [
      {
        type: "web",
        image: krupasindhuNgo,
        url: "https://krupasindhuseva.org/",
      },
      {
        type: "git",
        image: krupasindhuNgo,
        url: "https://github.com/Lokeshburade007/krupasindhuNGO.git",
      },
    ],
  },
  {
    title: "Shree Krushana Nagari",
    tagline: "Realtime freelance website for a layout seller",
    description:
      "Static realtime website built for a layout seller as a freelance project — HTML, Tailwind CSS, and JavaScript.",
    tags: ["Web"],
    badge: "Freelance",
    techStack: ["HTML", "Tailwind CSS", "JavaScript"],
    previews: [
      {
        type: "web",
        image: shreeKrushana,
        url: "https://shreekrushananagari.github.io/",
      },
    ],
  },
  {
    title: "FlipKart Clone",
    tagline: "First front-end mini-project",
    description:
      "A Flipkart UI clone — the project I started my web-development journey with. Pure HTML, CSS, JavaScript, and Bootstrap.",
    tags: ["Web"],
    badge: "Mini Project",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    previews: [
      {
        type: "web",
        image: flipkartClone,
        url: "https://fanciful-swan-db72de.netlify.app",
      },
      {
        type: "git",
        image: flipkartClone,
        url: "https://github.com/Lokeshburade007/Frontend-CSS-Project.git",
      },
    ],
  },
  {
    title: "My Personal Library",
    tagline: "Tailwind CSS UI design challenge",
    description:
      "A personal library UI built with TailwindCSS in under an hour as a quick design challenge to sharpen Tailwind muscle memory.",
    tags: ["Web"],
    badge: "Mini Project",
    techStack: ["HTML", "Tailwind CSS"],
    previews: [
      {
        type: "web",
        image: personalLibrary,
        url: "https://my-personal-library-bookset.netlify.app/",
      },
      {
        type: "git",
        image: personalLibrary,
        url: "https://github.com/Lokeshburade007/My-Personal-Library.git",
      },
    ],
  },
  {
    title: "Crackit Academy",
    tagline: "GATE learning platform (PHP + MySQL)",
    description:
      "Built from scratch with pure HTML, CSS, JavaScript, PHP, and MySQL — covered both frontend and backend including database design and server-side logic.",
    tags: ["Web"],
    badge: "Mini Project",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    previews: [
      {
        type: "git",
        image: crackitAcademy,
        url: "https://github.com/Lokeshburade007/Crackit_Academy.git",
      },
    ],
  },
];
