import { computed, Injectable, signal } from '@angular/core';

export type Lang = 'de' | 'en';

const STORAGE_KEY = 'portfolio-lang';

interface Value {
  icon: string;
  title: string;
  text: string;
}

interface ProjectText {
  tagline: string;
  description: string;
}

interface Dict {
  hero: {
    eyebrow: string;
    greeting: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    values: Value[];
  };
  skills: {
    eyebrow: string;
    title: string;
    lead: string;
    photoCaption: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<string, ProjectText>;
    liveButton: string;
    nda: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    status: string;
    labels: {
      name: string;
      email: string;
      company: string;
      subject: string;
      message: string;
    };
    placeholders: {
      company: string;
      subject: string;
      message: string;
    };
    errors: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMin: string;
      consentRequired: string;
    };
    consent: {
      before: string;
      link: string;
      after: string;
    };
    submit: string;
    success: {
      title: string;
      textBefore: string;
      reset: string;
    };
    outro: string;
  };
  toggle: {
    label: string;
    title: string;
  };
}

const translations: Record<Lang, Dict> = {
  de: {
    hero: {
      eyebrow: 'Frontend-Entwickler aus Österreich',
      greeting: 'Hallo, ich bin',
      lead:
        'Ich entwickle moderne Web-Oberflächen — unter anderem mit <span class="hero__accent">Angular</span>, ' +
        '<span class="hero__accent">TypeScript</span> und dem gesamten Frontend-Werkzeugkasten. ' +
        'Jetzt suche ich die passende Gelegenheit, mein Handwerk in einem engagierten Team ' +
        'einzubringen und mit jedem Projekt weiterzuwachsen.',
      ctaPrimary: 'Jetzt kontaktieren',
      ctaSecondary: 'Projekte ansehen',
    },
    about: {
      eyebrow: '// about.ts',
      title: 'Über mich',
      p1:
        'Ich bin Phillip, Frontend-Entwickler aus Österreich. Als Quereinsteiger habe ich mir ' +
        'das Programmieren aus Leidenschaft angeeignet — heute, mit rund drei Jahren Erfahrung, ' +
        'baue ich Oberflächen, die sich gut anfühlen und zuverlässig funktionieren.',
      p2:
        'Kreativität, Neugier und Disziplin sind mein Antrieb. Ich lerne schnell, arbeite ' +
        'strukturiert und nehme jedes Code-Review als Chance, besser zu werden.',
      p3:
        'Jetzt suche ich ein Team, in dem ich mit echten Produkten Verantwortung übernehmen ' +
        'kann — und weiter wachse, Tag für Tag.',
      values: [
        {
          icon: 'lightbulb',
          title: 'Kreativität',
          text: 'Ich denke in Lösungen und hole das Beste aus jeder Idee heraus.',
        },
        {
          icon: 'explore',
          title: 'Neugier',
          text:
            'Aktuell bin ich in einer Backend-Ausbildung — um auch jenseits des Frontends ' +
            'sicher zu Hause zu sein.',
        },
        {
          icon: 'bolt',
          title: 'Disziplin',
          text: 'Klarer Code, klare Commits, klarer Fokus — Tag für Tag.',
        },
      ],
    },
    skills: {
      eyebrow: '// skills.json',
      title: 'Mein Werkzeugkasten',
      lead:
        'Technologien, mit denen ich täglich arbeite — von der ersten Idee bis zur ' +
        'ausgelieferten Oberfläche.',
      photoCaption: '// Immer offen für Neues.',
    },
    projects: {
      eyebrow: '// projects/',
      title: 'Projekte',
      lead:
        'Eine Auswahl meiner Arbeiten — hier wird aus Code ein Produkt, das man anfassen kann.',
      items: {
        'project-petru': {
          tagline: 'Web-Entwicklung für einen echten Kunden',
          description:
            'Umsetzung der Web-Präsenz für Petru — vom Konzept bis zum Deployment. ' +
            'Fokus auf klare Typografie, schnelle Ladezeit und einfache Wartbarkeit.',
        },
        'project-join': {
          tagline: 'Kanban-Taskmanager mit Echtzeit-Backend',
          description:
            'Team-Taskmanager im Trello-Stil mit Drag-and-Drop, Kontakten und Prioritäten. ' +
            'Firebase als Backend für Auth und Echtzeit-Daten — sauberes UI und ' +
            'verlässliche Persistenz.',
        },
        'project-pollo': {
          tagline: '2D Jump-and-Run Game',
          description:
            'Objektorientiertes Browser-Spiel mit Canvas, Collision-Detection, Sound und ' +
            'Game-Loop. Charakter, Gegner und Items als eigene Klassen — sauber getrennt, ' +
            'leicht erweiterbar.',
        },
        'project-mietbar': {
          tagline: 'Logistik-Tool für LKW- und Routenplanung',
          description:
            'Maßgeschneiderte Software zur LKW- und Routenplanung für Mietbar. Entwickelt ' +
            'auf die konkreten Abläufe des Unternehmens — vereinfacht den Tagesbetrieb im ' +
            'Logistik-Team.',
        },
      },
      liveButton: 'Live ansehen',
      nda: 'Kundenprojekt — auf Anfrage',
    },
    contact: {
      eyebrow: '// contact.ts',
      title: 'Lass uns reden',
      lead:
        'Auf der Suche nach einem Frontend-Entwickler mit Drive, Neugier und dem Willen zu ' +
        'wachsen? Schreib mir — je mehr Kontext, desto besser kann ich antworten.',
      status: 'Verfügbar ab sofort · Österreich · remote oder vor Ort',
      labels: {
        name: 'Name',
        email: 'E-Mail',
        company: 'Firma / Rolle',
        subject: 'Betreff',
        message: 'Nachricht',
      },
      placeholders: {
        company: 'z. B. HR bei Firma XY',
        subject: 'Worum geht\u2019s?',
        message: 'Erzähl mir kurz, was du vorhast …',
      },
      errors: {
        nameRequired: 'Name fehlt noch.',
        nameMin: 'Mindestens 2 Zeichen.',
        emailRequired: 'E-Mail fehlt noch.',
        emailInvalid: 'Bitte eine gültige E-Mail.',
        messageRequired: 'Nachricht fehlt noch.',
        messageMin: 'Ein paar Zeilen mehr bitte.',
        consentRequired: 'Bitte stimme der Datenschutzerklärung zu.',
      },
      consent: {
        before: 'Ich habe die ',
        link: 'Datenschutzerklärung',
        after: ' gelesen und stimme zu.',
      },
      submit: 'Nachricht senden',
      success: {
        title: 'Dein Mail-Programm sollte sich gerade öffnen.',
        textBefore: 'Falls nicht, schreib mir direkt an',
        reset: 'Neue Nachricht schreiben',
      },
      outro: 'return thanks_for_reading;',
    },
    toggle: { label: 'DE', title: 'Sprache wechseln' },
  },
  en: {
    hero: {
      eyebrow: 'Frontend developer based in Austria',
      greeting: "Hi, I'm",
      lead:
        'I build modern web interfaces — with <span class="hero__accent">Angular</span>, ' +
        '<span class="hero__accent">TypeScript</span> and the wider frontend toolbox. ' +
        "I'm looking for the right team where I can put my craft to work and keep growing " +
        'with every project.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View projects',
    },
    about: {
      eyebrow: '// about.ts',
      title: 'About me',
      p1:
        "I'm Phillip, a frontend developer from Austria. As a career changer I taught myself " +
        'programming out of pure passion — today, with around three years of experience, I ' +
        'craft interfaces that feel right and behave reliably.',
      p2:
        'Creativity, curiosity and discipline drive me. I learn fast, work in a structured ' +
        'way, and treat every code review as a chance to get better.',
      p3:
        "Now I'm looking for a team where I can take ownership of real products — and keep " +
        'growing, day by day.',
      values: [
        {
          icon: 'lightbulb',
          title: 'Creativity',
          text: 'I think in solutions and pull the best out of every idea.',
        },
        {
          icon: 'explore',
          title: 'Curiosity',
          text:
            "I'm currently studying backend development — to feel at home beyond the " +
            'frontend too.',
        },
        {
          icon: 'bolt',
          title: 'Discipline',
          text: 'Clear code, clear commits, clear focus — every day.',
        },
      ],
    },
    skills: {
      eyebrow: '// skills.json',
      title: 'My toolbox',
      lead:
        'Tech I use every day — from the first idea to a shipped, polished interface.',
      photoCaption: '// Always up for something new.',
    },
    projects: {
      eyebrow: '// projects/',
      title: 'Projects',
      lead: 'A selection of my work — where code becomes something you can actually use.',
      items: {
        'project-petru': {
          tagline: 'Web work for a real client',
          description:
            'Built the web presence for Petru end-to-end — from concept to deployment. ' +
            'Focus on clear typography, fast load times and easy maintenance.',
        },
        'project-join': {
          tagline: 'Kanban task manager with real-time backend',
          description:
            'Trello-style team task manager with drag-and-drop, contacts and priorities. ' +
            'Firebase for auth and live data — clean UI, reliable persistence.',
        },
        'project-pollo': {
          tagline: '2D jump-and-run game',
          description:
            'Object-oriented browser game with canvas, collision detection, sound and a ' +
            'real game loop. Player, enemies and items as their own classes — cleanly ' +
            'separated, easy to extend.',
        },
        'project-mietbar': {
          tagline: 'Logistics tool for truck & route planning',
          description:
            'Custom software for truck and route planning at Mietbar. Built around their ' +
            "actual workflows — simplifying the logistics team's daily operations.",
        },
      },
      liveButton: 'View live',
      nda: 'Client project — available on request',
    },
    contact: {
      eyebrow: '// contact.ts',
      title: "Let's talk",
      lead:
        'Looking for a frontend developer with drive, curiosity and the will to grow? ' +
        'Drop me a line — the more context, the better I can answer.',
      status: 'Available immediately · Austria · remote or on-site',
      labels: {
        name: 'Name',
        email: 'Email',
        company: 'Company / Role',
        subject: 'Subject',
        message: 'Message',
      },
      placeholders: {
        company: 'e.g. HR at Company XY',
        subject: "What's it about?",
        message: 'Tell me briefly what you have in mind …',
      },
      errors: {
        nameRequired: 'Name is missing.',
        nameMin: 'At least 2 characters.',
        emailRequired: 'Email is missing.',
        emailInvalid: 'Please use a valid email.',
        messageRequired: 'Message is missing.',
        messageMin: 'A few more lines please.',
        consentRequired: 'Please accept the privacy policy.',
      },
      consent: {
        before: "I've read the ",
        link: 'privacy policy',
        after: ' and agree.',
      },
      submit: 'Send message',
      success: {
        title: 'Your mail client should be opening now.',
        textBefore: 'If not, write me directly at',
        reset: 'Write another message',
      },
      outro: 'return thanks_for_reading;',
    },
    toggle: { label: 'EN', title: 'Change language' },
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly _lang = signal<Lang>(this.loadInitial());

  readonly lang = this._lang.asReadonly();
  readonly t = computed(() => translations[this._lang()]);

  constructor() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this._lang();
    }
  }

  toggle(): void {
    this.setLang(this._lang() === 'de' ? 'en' : 'de');
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore — private mode etc. */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  private loadInitial(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'de' || stored === 'en') return stored;
    } catch {
      /* ignore */
    }
    if (typeof navigator !== 'undefined' && navigator.language?.startsWith('de')) {
      return 'de';
    }
    return 'en';
  }
}
