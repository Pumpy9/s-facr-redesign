// js/db.js - Kompletní databáze 10 týmů podle reálné tabulky (Zlínský kraj)

const db = {
  // SOUTĚŽ a TABULKA (přesně podle screenshotu)
  league: {
    id: "2026721A2B",
    name: "9. liga mužů – skupina B",
    region: "Zlínský kraj",
    season: "Aktuální sezóna",
    standings: [
      { rank: 1, clubId: "7210111", played: 14, w: 12, d: 1, l: 1, goalsFor: 75, goalsAgainst: 9, points: 37 },
      { rank: 2, clubId: "7210002", played: 14, w: 12, d: 1, l: 1, goalsFor: 82, goalsAgainst: 25, points: 37 },
      { rank: 3, clubId: "7210003", played: 14, w: 11, d: 1, l: 2, goalsFor: 68, goalsAgainst: 26, points: 34 },
      { rank: 4, clubId: "7210321", played: 14, w: 8, d: 0, l: 6, goalsFor: 50, goalsAgainst: 35, points: 24 },
      { rank: 5, clubId: "7210222", played: 14, w: 6, d: 1, l: 7, goalsFor: 38, goalsAgainst: 38, points: 19 },
      { rank: 6, clubId: "7210006", played: 14, w: 4, d: 3, l: 7, goalsFor: 29, goalsAgainst: 45, points: 15 },
      { rank: 7, clubId: "7210007", played: 14, w: 5, d: 0, l: 9, goalsFor: 34, goalsAgainst: 57, points: 15 },
      { rank: 8, clubId: "7210008", played: 14, w: 3, d: 2, l: 9, goalsFor: 25, goalsAgainst: 38, points: 11 },
      { rank: 9, clubId: "7210009", played: 14, w: 3, d: 1, l: 10, goalsFor: 26, goalsAgainst: 58, points: 10 },
      { rank: 10, clubId: "7210010", played: 14, w: 0, d: 2, l: 12, goalsFor: 13, goalsAgainst: 109, points: 2 }
    ]
  },

  // --- NOVÉ: ÚČTY UŽIVATELŮ (Rozhodčí a Kluby) ---
  users: [
    // 3 rozhodčí
    { id: "ref1", email: "mutny@facr.cz", pass: "1234", role: "referee", name: "Tomáš Mutný (Rozhodčí)" },
    { id: "ref2", email: "kral@facr.cz",  pass: "1234", role: "referee", name: "Lukáš Král (Rozhodčí)" },
    { id: "ref3", email: "novotny@facr.cz", pass: "1234", role: "referee", name: "Petr Novotný (Rozhodčí)" },
    // 3 administrátoři klubů
    { id: "club1", email: "prusinovice@facr.cz", pass: "1234", role: "club", clubId: "7210321", name: "Admin – TJ Prusinovice" },
    { id: "club2", email: "kostelec@facr.cz",    pass: "1234", role: "club", clubId: "7210111", name: "Admin – FC Kostelec" },
    { id: "club3", email: "rymice@facr.cz",      pass: "1234", role: "club", clubId: "7210222", name: "Admin – TJ Sokol Rymice B" }
  ],

  // KLUBY (10 týmů)
  clubs: [
    { id: "7210111", name: "FC Kostelec u Holešova", shortName: "Kostelec u Holešova", district: "Kroměříž", colors: ["#E3001B", "#FFFFFF"], manager: "Jan Kopecký" },
    { id: "7210002", name: "TJ Pravčice", shortName: "Pravčice", district: "Kroměříž", colors: ["#0000FF", "#FFFF00"], manager: "Petr Novák" },
    { id: "7210003", name: "TJ Tučapy", shortName: "Tučapy", district: "Kroměříž", colors: ["#008000", "#FFFFFF"], manager: "Jiří Svoboda" },
    { id: "7210321", name: "TJ Prusinovice, z.s.", shortName: "Prusinovice", district: "Kroměříž", colors: ["#0055A4", "#FFFFFF"], manager: "Martin Dvořák" },
    { id: "7210222", name: "TJ Sokol Rymice B", shortName: "Rymice \"B\"", district: "Kroměříž", colors: ["#008000", "#000000"], manager: "Petr Zeman" },
    { id: "7210006", name: "AC Holešov", shortName: "AC Holešov", district: "Kroměříž", colors: ["#000000", "#FFFFFF"], manager: "Tomáš Marek" },
    { id: "7210007", name: "TJ Roštění", shortName: "Roštění", district: "Kroměříž", colors: ["#FF0000", "#000000"], manager: "Michal Horák" },
    { id: "7210008", name: "TJ Zahnašovice", shortName: "Zahnašovice", district: "Kroměříž", colors: ["#000080", "#FFFFFF"], manager: "Petr Fiala" },
    { id: "7210009", name: "TJ Ludslavice", shortName: "Ludslavice", district: "Kroměříž", colors: ["#FFD700", "#0000FF"], manager: "Lukáš Černý" },
    { id: "7210010", name: "Sokol Martinice", shortName: "Sokol Martinice", district: "Kroměříž", colors: ["#FFFFFF", "#0000FF"], manager: "Zdeněk Král" }
  ],

  // HRÁČI (10 týmů × 15 hráčů = 150 hráčů)
  players: [
    // --- 1. KOSTELEC U HOLEŠOVA (7210111) ---
    { id: "101", name: "Stanislav Blaha", year: 1995, clubId: "7210111", position: "Brankář", goals: 0, number: 1 },
    { id: "102", name: "Petr Čech", year: 1997, clubId: "7210111", position: "Obránce", goals: 1, number: 2 },
    { id: "103", name: "Ondřej Beran", year: 1999, clubId: "7210111", position: "Obránce", goals: 2, number: 3 },
    { id: "104", name: "Pavel Svoboda", year: 2001, clubId: "7210111", position: "Obránce", goals: 5, number: 4 },
    { id: "105", name: "Martin Hájek", year: 2002, clubId: "7210111", position: "Záložník", goals: 8, number: 5 },
    { id: "106", name: "Jan Soukup", year: 1998, clubId: "7210111", position: "Záložník", goals: 6, number: 6 },
    { id: "107", name: "Lukáš Černý", year: 2000, clubId: "7210111", position: "Záložník", goals: 10, number: 7 },
    { id: "108", name: "David Havel", year: 2003, clubId: "7210111", position: "Záložník", goals: 3, number: 8 },
    { id: "109", name: "Karel Doležal", year: 1996, clubId: "7210111", position: "Útočník", goals: 12, number: 9 },
    { id: "110", name: "Tomáš Říha", year: 1994, clubId: "7210111", position: "Útočník", goals: 18, number: 10 },
    { id: "111", name: "Vojtěch Zeman", year: 2004, clubId: "7210111", position: "Útočník", goals: 5, number: 11 },
    { id: "112", name: "Adam Kopecký", year: 1999, clubId: "7210111", position: "Obránce", goals: 1, number: 12 },
    { id: "113", name: "Filip Král", year: 2001, clubId: "7210111", position: "Záložník", goals: 2, number: 13 },
    { id: "114", name: "Matěj Růžička", year: 2005, clubId: "7210111", position: "Záložník", goals: 1, number: 14 },
    { id: "115", name: "Jiří Horák", year: 1997, clubId: "7210111", position: "Brankář", goals: 0, number: 22 },

    // --- 2. PRAVČICE (7210002) ---
    { id: "201", name: "Milan Šťastný", year: 1991, clubId: "7210002", position: "Brankář", goals: 0, number: 1 },
    { id: "202", name: "Radek Pilař", year: 1993, clubId: "7210002", position: "Obránce", goals: 3, number: 2 },
    { id: "203", name: "Kamil Vlček", year: 1995, clubId: "7210002", position: "Obránce", goals: 2, number: 3 },
    { id: "204", name: "Jakub Navrátil", year: 1997, clubId: "7210002", position: "Obránce", goals: 4, number: 4 },
    { id: "205", name: "Tomáš Sýkora", year: 1999, clubId: "7210002", position: "Záložník", goals: 8, number: 5 },
    { id: "206", name: "Martin Kovář", year: 2001, clubId: "7210002", position: "Záložník", goals: 11, number: 6 },
    { id: "207", name: "Petr Janda", year: 2003, clubId: "7210002", position: "Záložník", goals: 7, number: 7 },
    { id: "208", name: "Lukáš Holub", year: 2005, clubId: "7210002", position: "Záložník", goals: 5, number: 8 },
    { id: "209", name: "Jiří Macháček", year: 1994, clubId: "7210002", position: "Útočník", goals: 15, number: 9 },
    { id: "210", name: "Jan Blažek", year: 1996, clubId: "7210002", position: "Útočník", goals: 19, number: 10 },
    { id: "211", name: "David Zelenka", year: 1998, clubId: "7210002", position: "Útočník", goals: 6, number: 11 },
    { id: "212", name: "Michal Polák", year: 2000, clubId: "7210002", position: "Obránce", goals: 0, number: 12 },
    { id: "213", name: "Ondřej Kadlec", year: 2002, clubId: "7210002", position: "Záložník", goals: 2, number: 13 },
    { id: "214", name: "Vojtěch Hrubý", year: 2004, clubId: "7210002", position: "Útočník", goals: 0, number: 14 },
    { id: "215", name: "Adam Procházka", year: 2006, clubId: "7210002", position: "Brankář", goals: 0, number: 20 },

    // --- 3. TUČAPY (7210003) ---
    { id: "301", name: "Tomáš Strnad", year: 1990, clubId: "7210003", position: "Brankář", goals: 0, number: 1 },
    { id: "302", name: "Petr Němec", year: 1992, clubId: "7210003", position: "Obránce", goals: 1, number: 2 },
    { id: "303", name: "Jan Hladík", year: 1994, clubId: "7210003", position: "Obránce", goals: 3, number: 3 },
    { id: "304", name: "Martin Kříž", year: 1996, clubId: "7210003", position: "Obránce", goals: 2, number: 4 },
    { id: "305", name: "Lukáš Vacek", year: 1998, clubId: "7210003", position: "Záložník", goals: 8, number: 5 },
    { id: "306", name: "Jiří Benda", year: 2000, clubId: "7210003", position: "Záložník", goals: 9, number: 6 },
    { id: "307", name: "David Toman", year: 2002, clubId: "7210003", position: "Záložník", goals: 7, number: 7 },
    { id: "308", name: "Michal Moravec", year: 2004, clubId: "7210003", position: "Záložník", goals: 6, number: 8 },
    { id: "309", name: "Kamil Ševčík", year: 1988, clubId: "7210003", position: "Útočník", goals: 11, number: 9 },
    { id: "310", name: "Ondřej Kučera", year: 1995, clubId: "7210003", position: "Útočník", goals: 15, number: 10 },
    { id: "311", name: "Václav Pospěch", year: 1997, clubId: "7210003", position: "Útočník", goals: 5, number: 11 },
    { id: "312", name: "Adam Kraus", year: 1999, clubId: "7210003", position: "Obránce", goals: 1, number: 12 },
    { id: "313", name: "Jakub Liška", year: 2001, clubId: "7210003", position: "Záložník", goals: 0, number: 13 },
    { id: "314", name: "Filip Slanina", year: 2003, clubId: "7210003", position: "Útočník", goals: 0, number: 14 },
    { id: "315", name: "Radek Zezula", year: 2005, clubId: "7210003", position: "Brankář", goals: 0, number: 16 },

    // --- 4. PRUSINOVICE (7210321) ---
    { id: "401", name: "Pavel Hruška", year: 1998, clubId: "7210321", position: "Brankář", goals: 0, number: 1 },
    { id: "402", name: "Tomáš Beneš", year: 1995, clubId: "7210321", position: "Obránce", goals: 2, number: 2 },
    { id: "403", name: "Jan Kolář", year: 1999, clubId: "7210321", position: "Obránce", goals: 1, number: 3 },
    { id: "404", name: "Zdeněk Adámek", year: 2006, clubId: "7210321", position: "Obránce", goals: 3, number: 4 },
    { id: "405", name: "Michal Novotný", year: 2001, clubId: "7210321", position: "Záložník", goals: 6, number: 5 },
    { id: "406", name: "Lukáš Pospíšil", year: 1997, clubId: "7210321", position: "Záložník", goals: 4, number: 6 },
    { id: "407", name: "David Vávra", year: 2002, clubId: "7210321", position: "Záložník", goals: 9, number: 7 },
    { id: "408", name: "Jiří Adámek", year: 2010, clubId: "7210321", position: "Záložník", goals: 5, number: 8 },
    { id: "409", name: "Roman Šimek", year: 2000, clubId: "7210321", position: "Útočník", goals: 11, number: 9 },
    { id: "410", name: "Ondřej Fiala", year: 1996, clubId: "7210321", position: "Útočník", goals: 7, number: 10 },
    { id: "411", name: "Václav Sedláček", year: 1994, clubId: "7210321", position: "Obránce", goals: 0, number: 11 },
    { id: "412", name: "Dominik Marek", year: 2003, clubId: "7210321", position: "Záložník", goals: 1, number: 12 },
    { id: "413", name: "Jakub Novák", year: 2004, clubId: "7210321", position: "Obránce", goals: 0, number: 13 },
    { id: "414", name: "Julián Ančinec", year: 2015, clubId: "7210321", position: "Útočník", goals: 1, number: 14 },
    { id: "415", name: "Karel Urban", year: 1999, clubId: "7210321", position: "Brankář", goals: 0, number: 20 },

    // --- 5. RYMICE B (7210222) ---
    { id: "501", name: "Lukáš Veselý", year: 1995, clubId: "7210222", position: "Brankář", goals: 0, number: 1 },
    { id: "502", name: "Jan Jelínek", year: 1997, clubId: "7210222", position: "Obránce", goals: 1, number: 2 },
    { id: "503", name: "David Růžička", year: 1999, clubId: "7210222", position: "Záložník", goals: 3, number: 3 },
    { id: "504", name: "Jakub Mach", year: 2001, clubId: "7210222", position: "Útočník", goals: 7, number: 4 },
    { id: "505", name: "Filip Němec", year: 2003, clubId: "7210222", position: "Záložník", goals: 4, number: 5 },
    { id: "506", name: "Tomáš Kocián", year: 1990, clubId: "7210222", position: "Obránce", goals: 2, number: 6 },
    { id: "507", name: "Petr Hanák", year: 1992, clubId: "7210222", position: "Obránce", goals: 1, number: 7 },
    { id: "508", name: "Martin Vacek", year: 1994, clubId: "7210222", position: "Obránce", goals: 0, number: 8 },
    { id: "509", name: "Jiří Kovář", year: 1996, clubId: "7210222", position: "Záložník", goals: 5, number: 9 },
    { id: "510", name: "Ondřej Hrubý", year: 1998, clubId: "7210222", position: "Záložník", goals: 3, number: 10 },
    { id: "511", name: "David Polák", year: 2000, clubId: "7210222", position: "Útočník", goals: 8, number: 11 },
    { id: "512", name: "Michal Březina", year: 2002, clubId: "7210222", position: "Útočník", goals: 4, number: 12 },
    { id: "513", name: "Adam Zbořil", year: 2004, clubId: "7210222", position: "Záložník", goals: 0, number: 13 },
    { id: "514", name: "Jakub Navrátil", year: 2006, clubId: "7210222", position: "Obránce", goals: 0, number: 14 },
    { id: "515", name: "Kamil Růžička", year: 1988, clubId: "7210222", position: "Brankář", goals: 0, number: 22 },

    // --- 6. AC HOLEŠOV (7210006) ---
    { id: "601", name: "Petr Vávra", year: 1991, clubId: "7210006", position: "Brankář", goals: 0, number: 1 },
    { id: "602", name: "Martin Švec", year: 1993, clubId: "7210006", position: "Obránce", goals: 1, number: 2 },
    { id: "603", name: "Tomáš Král", year: 1995, clubId: "7210006", position: "Obránce", goals: 0, number: 3 },
    { id: "604", name: "Jiří Zavadil", year: 1997, clubId: "7210006", position: "Obránce", goals: 2, number: 4 },
    { id: "605", name: "Lukáš Bílý", year: 1999, clubId: "7210006", position: "Záložník", goals: 4, number: 5 },
    { id: "606", name: "Jan Čermák", year: 2001, clubId: "7210006", position: "Záložník", goals: 3, number: 6 },
    { id: "607", name: "David Malý", year: 2003, clubId: "7210006", position: "Záložník", goals: 2, number: 7 },
    { id: "608", name: "Michal Vlček", year: 2005, clubId: "7210006", position: "Záložník", goals: 1, number: 8 },
    { id: "609", name: "Ondřej Pospíšil", year: 1989, clubId: "7210006", position: "Útočník", goals: 6, number: 9 },
    { id: "610", name: "Kamil Novák", year: 1992, clubId: "7210006", position: "Útočník", goals: 8, number: 10 },
    { id: "611", name: "Vojtěch Sedlák", year: 1994, clubId: "7210006", position: "Útočník", goals: 1, number: 11 },
    { id: "612", name: "Adam Dvořák", year: 1996, clubId: "7210006", position: "Obránce", goals: 0, number: 12 },
    { id: "613", name: "Filip Janda", year: 1998, clubId: "7210006", position: "Záložník", goals: 1, number: 13 },
    { id: "614", name: "Radek Toman", year: 2000, clubId: "7210006", position: "Útočník", goals: 0, number: 14 },
    { id: "615", name: "Jakub Zezula", year: 2002, clubId: "7210006", position: "Brankář", goals: 0, number: 20 },

    // --- 7. ROŠTĚNÍ (7210007) ---
    { id: "701", name: "Milan Kovář", year: 1990, clubId: "7210007", position: "Brankář", goals: 0, number: 1 },
    { id: "702", name: "Petr Hladík", year: 1992, clubId: "7210007", position: "Obránce", goals: 1, number: 2 },
    { id: "703", name: "Jan Sýkora", year: 1994, clubId: "7210007", position: "Obránce", goals: 0, number: 3 },
    { id: "704", name: "Tomáš Růžička", year: 1996, clubId: "7210007", position: "Obránce", goals: 3, number: 4 },
    { id: "705", name: "Jiří Mach", year: 1998, clubId: "7210007", position: "Záložník", goals: 5, number: 5 },
    { id: "706", name: "Lukáš Benda", year: 2000, clubId: "7210007", position: "Záložník", goals: 4, number: 6 },
    { id: "707", name: "David Zelenka", year: 2002, clubId: "7210007", position: "Záložník", goals: 2, number: 7 },
    { id: "708", name: "Michal Kraus", year: 2004, clubId: "7210007", position: "Záložník", goals: 1, number: 8 },
    { id: "709", name: "Ondřej Liška", year: 1988, clubId: "7210007", position: "Útočník", goals: 7, number: 9 },
    { id: "710", name: "Kamil Moravec", year: 1991, clubId: "7210007", position: "Útočník", goals: 9, number: 10 },
    { id: "711", name: "Adam Pospěch", year: 1993, clubId: "7210007", position: "Útočník", goals: 2, number: 11 },
    { id: "712", name: "Vojtěch Slanina", year: 1995, clubId: "7210007", position: "Obránce", goals: 0, number: 12 },
    { id: "713", name: "Filip Zezula", year: 1997, clubId: "7210007", position: "Záložník", goals: 0, number: 13 },
    { id: "714", name: "Radek Ševčík", year: 1999, clubId: "7210007", position: "Útočník", goals: 0, number: 14 },
    { id: "715", name: "Jakub Kučera", year: 2001, clubId: "7210007", position: "Brankář", goals: 0, number: 33 },

    // --- 8. ZAHNAŠOVICE (7210008) ---
    { id: "801", name: "Zdeněk Mach", year: 1992, clubId: "7210008", position: "Brankář", goals: 0, number: 1 },
    { id: "802", name: "Pavel Kříž", year: 1994, clubId: "7210008", position: "Obránce", goals: 1, number: 2 },
    { id: "803", name: "Martin Vlček", year: 1996, clubId: "7210008", position: "Obránce", goals: 0, number: 3 },
    { id: "804", name: "Tomáš Kučera", year: 1998, clubId: "7210008", position: "Obránce", goals: 2, number: 4 },
    { id: "805", name: "Jiří Pokorný", year: 2000, clubId: "7210008", position: "Záložník", goals: 3, number: 5 },
    { id: "806", name: "Lukáš Malý", year: 2002, clubId: "7210008", position: "Záložník", goals: 4, number: 6 },
    { id: "807", name: "David Veselý", year: 2004, clubId: "7210008", position: "Záložník", goals: 2, number: 7 },
    { id: "808", name: "Michal Jelínek", year: 2006, clubId: "7210008", position: "Záložník", goals: 1, number: 8 },
    { id: "809", name: "Ondřej Růžička", year: 1989, clubId: "7210008", position: "Útočník", goals: 5, number: 9 },
    { id: "810", name: "Kamil Mach", year: 1991, clubId: "7210008", position: "Útočník", goals: 6, number: 10 },
    { id: "811", name: "Adam Němec", year: 1993, clubId: "7210008", position: "Útočník", goals: 1, number: 11 },
    { id: "812", name: "Vojtěch Kocián", year: 1995, clubId: "7210008", position: "Obránce", goals: 0, number: 12 },
    { id: "813", name: "Filip Hanák", year: 1997, clubId: "7210008", position: "Záložník", goals: 0, number: 13 },
    { id: "814", name: "Radek Vacek", year: 1999, clubId: "7210008", position: "Útočník", goals: 0, number: 14 },
    { id: "815", name: "Jakub Kovář", year: 2001, clubId: "7210008", position: "Brankář", goals: 0, number: 21 },

    // --- 9. LUDSLAVICE (7210009) ---
    { id: "901", name: "Martin Kříž", year: 1996, clubId: "7210009", position: "Brankář", goals: 0, number: 1 },
    { id: "902", name: "Josef Vlček", year: 1998, clubId: "7210009", position: "Obránce", goals: 2, number: 2 },
    { id: "903", name: "Tomáš Kučera", year: 2000, clubId: "7210009", position: "Záložník", goals: 3, number: 3 },
    { id: "904", name: "Petr Pokorný", year: 2002, clubId: "7210009", position: "Útočník", goals: 4, number: 4 },
    { id: "905", name: "Ondřej Malý", year: 2004, clubId: "7210009", position: "Útočník", goals: 5, number: 5 },
    { id: "906", name: "Pavel Veselý", year: 1991, clubId: "7210009", position: "Obránce", goals: 1, number: 6 },
    { id: "907", name: "Jiří Jelínek", year: 1993, clubId: "7210009", position: "Obránce", goals: 0, number: 7 },
    { id: "908", name: "Lukáš Růžička", year: 1995, clubId: "7210009", position: "Obránce", goals: 2, number: 8 },
    { id: "909", name: "David Mach", year: 1997, clubId: "7210009", position: "Záložník", goals: 3, number: 9 },
    { id: "910", name: "Michal Němec", year: 1999, clubId: "7210009", position: "Záložník", goals: 4, number: 10 },
    { id: "911", name: "Kamil Kocián", year: 2001, clubId: "7210009", position: "Záložník", goals: 1, number: 11 },
    { id: "912", name: "Adam Hanák", year: 2003, clubId: "7210009", position: "Obránce", goals: 0, number: 12 },
    { id: "913", name: "Vojtěch Vacek", year: 2005, clubId: "7210009", position: "Záložník", goals: 1, number: 13 },
    { id: "914", name: "Filip Kovář", year: 1989, clubId: "7210009", position: "Útočník", goals: 0, number: 14 },
    { id: "915", name: "Radek Hrubý", year: 1992, clubId: "7210009", position: "Brankář", goals: 0, number: 22 },

    // --- 10. SOKOL MARTINICE (7210010) ---
    { id: "1001", name: "Tomáš Polák", year: 1993, clubId: "7210010", position: "Brankář", goals: 0, number: 1 },
    { id: "1002", name: "Petr Březina", year: 1995, clubId: "7210010", position: "Obránce", goals: 0, number: 2 },
    { id: "1003", name: "Jan Zbořil", year: 1997, clubId: "7210010", position: "Obránce", goals: 0, number: 3 },
    { id: "1004", name: "Martin Navrátil", year: 1999, clubId: "7210010", position: "Obránce", goals: 1, number: 4 },
    { id: "1005", name: "Lukáš Růžička", year: 2001, clubId: "7210010", position: "Záložník", goals: 2, number: 5 },
    { id: "1006", name: "Jiří Vávra", year: 2003, clubId: "7210010", position: "Záložník", goals: 1, number: 6 },
    { id: "1007", name: "David Švec", year: 2005, clubId: "7210010", position: "Záložník", goals: 0, number: 7 },
    { id: "1008", name: "Michal Král", year: 1988, clubId: "7210010", position: "Záložník", goals: 1, number: 8 },
    { id: "1009", name: "Ondřej Zavadil", year: 1990, clubId: "7210010", position: "Útočník", goals: 3, number: 9 },
    { id: "1010", name: "Kamil Bílý", year: 1992, clubId: "7210010", position: "Útočník", goals: 4, number: 10 },
    { id: "1011", name: "Adam Čermák", year: 1994, clubId: "7210010", position: "Útočník", goals: 1, number: 11 },
    { id: "1012", name: "Vojtěch Malý", year: 1996, clubId: "7210010", position: "Obránce", goals: 0, number: 12 },
    { id: "1013", name: "Filip Vlček", year: 1998, clubId: "7210010", position: "Záložník", goals: 0, number: 13 },
    { id: "1014", name: "Radek Pospíšil", year: 2000, clubId: "7210010", position: "Útočník", goals: 0, number: 14 },
    { id: "1015", name: "Jakub Novák", year: 2002, clubId: "7210010", position: "Brankář", goals: 0, number: 30 }
  ],

  // ZÁPASY (Ukázky)
  matches: [
    { id: "1001", round: 14, date: "31.10.2026 14:00", homeId: "7210111", awayId: "7210321", refereeId: "ref1", scoreHome: 3, scoreAway: 1, status: "played", events: [] },
    { id: "1002", round: 15, date: "07.11.2026 14:00", homeId: "7210321", awayId: "7210111", refereeId: "ref2", scoreHome: null, scoreAway: null, status: "scheduled", events: [] },
    { id: "1003", round: 16, date: "27.03.2027 15:00", homeId: "7210321", awayId: "7210222", refereeId: "ref1", scoreHome: null, scoreAway: null, status: "scheduled", events: [] },
    { id: "1004", round: 17, date: "03.04.2027 15:30", homeId: "7210006", awayId: "7210321", refereeId: "ref3", scoreHome: null, scoreAway: null, status: "scheduled", events: [] },
    { id: "1005", round: 17, date: "04.04.2027 15:30", homeId: "7210002", awayId: "7210003", refereeId: "ref2", scoreHome: null, scoreAway: null, status: "scheduled", events: [] }
  ]
};

function getClub(id) {
  return db.clubs.find(c => c.id === id);
}

function getClubName(id) {
  const club = getClub(id);
  return club ? club.shortName : "Neznámý klub";
}

function getPlayer(id) {
  return db.players.find(p => p.id === id);
}

function getPlayersByClub(clubId) {
  return db.players.filter(p => p.clubId === clubId).sort((a, b) => a.number - b.number);
}

function getCurrentUser() {
  const id = localStorage.getItem('facr-user-id');
  return db.users.find(u => u.id === id) || null;
}

function getMatch(id) {
  return db.matches.find(m => m.id === id);
}

// --- Automatické zobrazení přihlášeného uživatele v horní liště veřejného portálu ---
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.public-nav');
  if (!nav) return;

  const role = localStorage.getItem('facr-role');
  
  // Odstraníme případné staré statické tlačítko pro přihlášení
  const oldLoginBtn = nav.querySelector('a[href="login.html"]');
  if (oldLoginBtn) oldLoginBtn.remove();

  if (role === 'club' || role === 'referee') {
    const isClub = role === 'club';
    const userName = isClub ? 'Administrátor Klubu' : 'Tomáš Mutný (Rozhodčí)';
    const dashUrl = isClub ? 'dashboard.html' : 'referee.html';

    const userBox = document.createElement('div');
    userBox.style.cssText = 'display: flex; align-items: center; gap: 10px; margin-left: 8px; padding-left: 16px; border-left: 1px solid rgba(255,255,255,0.25);';
    userBox.innerHTML = `
      <a href="${dashUrl}" title="Přejít do administrace" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 6px 14px; border-radius: 20px; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.9rem;">
        <span style="width: 8px; height: 8px; background: #4ADE80; border-radius: 50%; display: inline-block;"></span>
        ${userName}
      </a>
      <button type="button" id="public-logout-btn" style="background: none; border: 1px solid rgba(255,255,255,0.35); color: #fff; border-radius: 20px; padding: 6px 14px; cursor: pointer; font: inherit; font-size: 0.85rem; font-weight: 500;">
        Odhlásit
      </button>
    `;
    nav.appendChild(userBox);

    // Funkce pro odhlášení přímo z veřejného portálu
    document.getElementById('public-logout-btn').addEventListener('click', () => {
      localStorage.removeItem('facr-role');
      window.location.reload();
    });
  } else {
    // Pokud uživatel není přihlášen, zobrazíme tlačítko Přihlásit do IS
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.className = 'btn outline small';
    loginLink.style.cssText = 'background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); color: #fff; display: inline-flex; align-items: center; justify-content: center;';
    loginLink.textContent = 'Přihlásit do IS';
    nav.appendChild(loginLink);
  }
});

// --- Automatická synchronizace uzavřených zápisů do veřejné databáze ---
(function syncClosedMatches() {
  let standingsChanged = false;

  db.matches.forEach(m => {
    const raw = localStorage.getItem('facr-zapis-v1-' + m.id);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);
      // Propisujeme jen skutečně uzavřené zápisy (fáze 4 = Uzavření)
      if (!saved || saved.phase !== 4) return;

      const wasScheduled = m.status === 'scheduled';

      // 1. Výpočet finálního skóre (včetně vlastních branek)
      let scoreHome = 0;
      let scoreAway = 0;

      for (const e of (saved.events || [])) {
        if (e.type !== 'goal') continue;
        const isHomeGoal = e.goalKind === 'own' ? (e.team === 'away') : (e.team === 'home');
        if (isHomeGoal) scoreHome++;
        else scoreAway++;

        // Přičtení gólu střelci v databázi hráčů (mimo vlastní branky)
        if (wasScheduled && e.goalKind !== 'own') {
          const rosterPlayer = saved.teams[e.team].roster.find(p => p.number === e.playerNum);
          if (rosterPlayer) {
            const dbPlayer = getPlayer(rosterPlayer.id);
            if (dbPlayer) dbPlayer.goals += 1;
          }
        }
      }

      // 2. Aktualizace zápasu a převod událostí pro veřejný detail (public-match.html)
      m.status = 'played';
      m.scoreHome = scoreHome;
      m.scoreAway = scoreAway;
      m.events = (saved.events || []).map(e => {
        const teamId = e.team === 'home' ? m.homeId : m.awayId;
        const rosterPlayer = saved.teams[e.team].roster.find(p => p.number === e.playerNum);
        const note = e.goalKind === 'penalty' ? 'pokutový kop' : e.goalKind === 'own' ? 'vlastní branka' : '';
        return {
          minute: e.minute,
          type: e.type,
          teamId: teamId,
          playerId: rosterPlayer ? rosterPlayer.id : null,
          note: note
        };
      });

      // 3. Přepočet tabulky soutěže (jen pokud zápas nebyl započítán už dříve)
      if (wasScheduled) {
        standingsChanged = true;
        const homeRow = db.league.standings.find(s => s.clubId === m.homeId);
        const awayRow = db.league.standings.find(s => s.clubId === m.awayId);

        if (homeRow && awayRow) {
          homeRow.played += 1;
          awayRow.played += 1;
          homeRow.goalsFor += scoreHome;
          homeRow.goalsAgainst += scoreAway;
          awayRow.goalsFor += scoreAway;
          awayRow.goalsAgainst += scoreHome;

          if (scoreHome > scoreAway) {
            homeRow.w += 1; homeRow.points += 3;
            awayRow.l += 1;
          } else if (scoreHome < scoreAway) {
            awayRow.w += 1; awayRow.points += 3;
            homeRow.l += 1;
          } else {
            homeRow.d += 1; homeRow.points += 1;
            awayRow.d += 1; awayRow.points += 1;
          }
        }
      }
    } catch (err) {
      console.error('Chyba při synchronizaci zápisu:', err);
    }
  });

  // 4. Přeseřazení tabulky podle bodů, rozdílu skóre a vstřelených branek
  if (standingsChanged) {
    db.league.standings.sort((a, b) =>
      b.points - a.points ||
      (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
      b.goalsFor - a.goalsFor
    );
    db.league.standings.forEach((row, index) => {
      row.rank = index + 1;
    });
  }
})();

function resetAllMatches() {
  if (!confirm('Opravdu chcete smazat všechny vyplněné a uzavřené zápisy a vrátit soutěž do výchozího stavu?')) {
    return;
  }
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('facr-zapis-v1-')) {
      localStorage.removeItem(key);
    }
  });
  window.location.reload();
}