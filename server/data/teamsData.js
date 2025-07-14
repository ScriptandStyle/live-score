const leagues = require('./leaguesData');

// Teams data organized by league
const teams = [
  // Premier League teams
  {
    id: 1,
    name: 'Manchester United',
    shortName: 'MUN',
    tla: 'MUN',
    crest: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    address: 'Sir Matt Busby Way Manchester M16 0RA',
    website: 'http://www.manutd.com',
    founded: 1878,
    clubColors: 'Red / White',
    venue: 'Old Trafford',
    leagueId: 'premier-league',
    coach: { name: 'Erik ten Hag', nationality: 'Netherlands' },
    players: [
      { id: 101, name: 'David De Gea', position: 'Goalkeeper', number: 1, nationality: 'Spain' },
      { id: 102, name: 'Harry Maguire', position: 'Defender', number: 5, nationality: 'England' },
      { id: 103, name: 'Bruno Fernandes', position: 'Midfielder', number: 8, nationality: 'Portugal' },
      { id: 104, name: 'Marcus Rashford', position: 'Attacker', number: 10, nationality: 'England' },
      { id: 105, name: 'Mason Mount', position: 'Midfielder', number: 7, nationality: 'England' },
      { id: 106, name: 'Lisandro Martínez', position: 'Defender', number: 6, nationality: 'Argentina' },
      { id: 107, name: 'Casemiro', position: 'Midfielder', number: 18, nationality: 'Brazil' },
      { id: 108, name: 'Rasmus Højlund', position: 'Attacker', number: 11, nationality: 'Denmark' }
    ]
  },
  {
    id: 2,
    name: 'Liverpool FC',
    shortName: 'LIV',
    tla: 'LIV',
    crest: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    address: 'Anfield Road Liverpool L4 0TH',
    website: 'http://www.liverpoolfc.com',
    founded: 1892,
    clubColors: 'Red / White',
    venue: 'Anfield',
    leagueId: 'premier-league',
    coach: { name: 'Jürgen Klopp', nationality: 'Germany' },
    players: [
      { id: 201, name: 'Alisson Becker', position: 'Goalkeeper', number: 1, nationality: 'Brazil' },
      { id: 202, name: 'Virgil van Dijk', position: 'Defender', number: 4, nationality: 'Netherlands' },
      { id: 203, name: 'Trent Alexander-Arnold', position: 'Defender', number: 66, nationality: 'England' },
      { id: 204, name: 'Mohamed Salah', position: 'Attacker', number: 11, nationality: 'Egypt' },
      { id: 205, name: 'Andrew Robertson', position: 'Defender', number: 26, nationality: 'Scotland' },
      { id: 206, name: 'Diogo Jota', position: 'Attacker', number: 20, nationality: 'Portugal' },
      { id: 207, name: 'Luis Díaz', position: 'Attacker', number: 7, nationality: 'Colombia' },
      { id: 208, name: 'Dominik Szoboszlai', position: 'Midfielder', number: 8, nationality: 'Hungary' }
    ]
  },
  {
    id: 3,
    name: 'Manchester City FC',
    shortName: 'MCI',
    tla: 'MCI',
    crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    address: 'SportCity Manchester M11 3FF',
    website: 'https://www.mancity.com',
    founded: 1880,
    clubColors: 'Sky Blue / White',
    venue: 'Etihad Stadium',
    leagueId: 'premier-league',
    coach: { name: 'Pep Guardiola', nationality: 'Spain' },
    players: [
      { id: 301, name: 'Ederson', position: 'Goalkeeper', number: 31, nationality: 'Brazil' },
      { id: 302, name: 'Rúben Dias', position: 'Defender', number: 3, nationality: 'Portugal' },
      { id: 303, name: 'Kevin De Bruyne', position: 'Midfielder', number: 17, nationality: 'Belgium' },
      { id: 304, name: 'Erling Haaland', position: 'Attacker', number: 9, nationality: 'Norway' },
      { id: 305, name: 'Phil Foden', position: 'Midfielder', number: 47, nationality: 'England' },
      { id: 306, name: 'Rodri', position: 'Midfielder', number: 16, nationality: 'Spain' },
      { id: 307, name: 'Jack Grealish', position: 'Attacker', number: 10, nationality: 'England' },
      { id: 308, name: 'Bernardo Silva', position: 'Midfielder', number: 20, nationality: 'Portugal' }
    ]
  },
  
  // La Liga teams
  {
    id: 4,
    name: 'FC Barcelona',
    shortName: 'BAR',
    tla: 'FCB',
    crest: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    address: 'Avenida Arístides Maillol s/n 08028 Barcelona',
    website: 'http://www.fcbarcelona.com',
    founded: 1899,
    clubColors: 'Red / Blue / Maroon',
    venue: 'Camp Nou',
    leagueId: 'la-liga',
    coach: { name: 'Xavi Hernández', nationality: 'Spain' },
    players: [
      { id: 401, name: 'Marc-André ter Stegen', position: 'Goalkeeper', number: 1, nationality: 'Germany' },
      { id: 402, name: 'Ronald Araújo', position: 'Defender', number: 4, nationality: 'Uruguay' },
      { id: 403, name: 'Pedri', position: 'Midfielder', number: 8, nationality: 'Spain' },
      { id: 404, name: 'Robert Lewandowski', position: 'Attacker', number: 9, nationality: 'Poland' },
      { id: 405, name: 'Gavi', position: 'Midfielder', number: 6, nationality: 'Spain' },
      { id: 406, name: 'Frenkie de Jong', position: 'Midfielder', number: 21, nationality: 'Netherlands' },
      { id: 407, name: 'Ansu Fati', position: 'Attacker', number: 10, nationality: 'Spain' },
      { id: 408, name: 'Jules Koundé', position: 'Defender', number: 23, nationality: 'France' }
    ]
  },
  {
    id: 5,
    name: 'Real Madrid CF',
    shortName: 'RMA',
    tla: 'RMA',
    crest: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    address: 'Avenida de Concha Espina 1, Chamartín 28036 Madrid',
    website: 'http://www.realmadrid.com',
    founded: 1902,
    clubColors: 'White / Purple',
    venue: 'Santiago Bernabéu',
    leagueId: 'la-liga',
    coach: { name: 'Carlo Ancelotti', nationality: 'Italy' },
    players: [
      { id: 501, name: 'Thibaut Courtois', position: 'Goalkeeper', number: 1, nationality: 'Belgium' },
      { id: 502, name: 'Éder Militão', position: 'Defender', number: 3, nationality: 'Brazil' },
      { id: 503, name: 'Luka Modrić', position: 'Midfielder', number: 10, nationality: 'Croatia' },
      { id: 504, name: 'Vinícius Júnior', position: 'Attacker', number: 7, nationality: 'Brazil' },
      { id: 505, name: 'Jude Bellingham', position: 'Midfielder', number: 5, nationality: 'England' },
      { id: 506, name: 'Federico Valverde', position: 'Midfielder', number: 15, nationality: 'Uruguay' },
      { id: 507, name: 'Rodrygo', position: 'Attacker', number: 11, nationality: 'Brazil' },
      { id: 508, name: 'Antonio Rüdiger', position: 'Defender', number: 22, nationality: 'Germany' }
    ]
  },
  
  // Bundesliga teams
  {
    id: 6,
    name: 'Bayern Munich',
    shortName: 'BAY',
    tla: 'FCB',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    address: 'Säbener Straße 51-57 81547 München',
    website: 'http://www.fcbayern.com',
    founded: 1900,
    clubColors: 'Red / White / Blue',
    venue: 'Allianz Arena',
    leagueId: 'bundesliga',
    coach: { name: 'Thomas Tuchel', nationality: 'Germany' },
    players: [
      { id: 601, name: 'Manuel Neuer', position: 'Goalkeeper', number: 1, nationality: 'Germany' },
      { id: 602, name: 'Dayot Upamecano', position: 'Defender', number: 2, nationality: 'France' },
      { id: 603, name: 'Joshua Kimmich', position: 'Midfielder', number: 6, nationality: 'Germany' },
      { id: 604, name: 'Harry Kane', position: 'Attacker', number: 9, nationality: 'England' },
      { id: 605, name: 'Leroy Sané', position: 'Attacker', number: 10, nationality: 'Germany' },
      { id: 606, name: 'Alphonso Davies', position: 'Defender', number: 19, nationality: 'Canada' },
      { id: 607, name: 'Jamal Musiala', position: 'Midfielder', number: 42, nationality: 'Germany' },
      { id: 608, name: 'Thomas Müller', position: 'Attacker', number: 25, nationality: 'Germany' }
    ]
  },
  {
    id: 7,
    name: 'Borussia Dortmund',
    shortName: 'DOR',
    tla: 'BVB',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    address: 'Rheinlanddamm 207-209 44137 Dortmund',
    website: 'http://www.bvb.de',
    founded: 1909,
    clubColors: 'Black / Yellow',
    venue: 'Signal Iduna Park',
    leagueId: 'bundesliga',
    coach: { name: 'Edin Terzić', nationality: 'Germany' },
    players: [
      { id: 701, name: 'Gregor Kobel', position: 'Goalkeeper', number: 1, nationality: 'Switzerland' },
      { id: 702, name: 'Mats Hummels', position: 'Defender', number: 15, nationality: 'Germany' },
      { id: 703, name: 'Marco Reus', position: 'Midfielder', number: 11, nationality: 'Germany' },
      { id: 704, name: 'Julian Brandt', position: 'Midfielder', number: 10, nationality: 'Germany' },
      { id: 705, name: 'Niclas Füllkrug', position: 'Attacker', number: 14, nationality: 'Germany' },
      { id: 706, name: 'Emre Can', position: 'Midfielder', number: 23, nationality: 'Germany' },
      { id: 707, name: 'Karim Adeyemi', position: 'Attacker', number: 27, nationality: 'Germany' },
      { id: 708, name: 'Nico Schlotterbeck', position: 'Defender', number: 4, nationality: 'Germany' }
    ]
  },
  
  // Serie A teams
  {
    id: 8,
    name: 'Juventus FC',
    shortName: 'JUV',
    tla: 'JUV',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg',
    address: 'Via Druento, 175 10151 Torino',
    website: 'http://www.juventus.com',
    founded: 1897,
    clubColors: 'Black / White',
    venue: 'Allianz Stadium',
    leagueId: 'serie-a',
    coach: { name: 'Massimiliano Allegri', nationality: 'Italy' },
    players: [
      { id: 801, name: 'Wojciech Szczęsny', position: 'Goalkeeper', number: 1, nationality: 'Poland' },
      { id: 802, name: 'Bremer', position: 'Defender', number: 3, nationality: 'Brazil' },
      { id: 803, name: 'Federico Chiesa', position: 'Attacker', number: 7, nationality: 'Italy' },
      { id: 804, name: 'Dušan Vlahović', position: 'Attacker', number: 9, nationality: 'Serbia' },
      { id: 805, name: 'Manuel Locatelli', position: 'Midfielder', number: 5, nationality: 'Italy' },
      { id: 806, name: 'Danilo', position: 'Defender', number: 6, nationality: 'Brazil' },
      { id: 807, name: 'Adrien Rabiot', position: 'Midfielder', number: 25, nationality: 'France' },
      { id: 808, name: 'Weston McKennie', position: 'Midfielder', number: 8, nationality: 'United States' }
    ]
  },
  {
    id: 9,
    name: 'AC Milan',
    shortName: 'MIL',
    tla: 'ACM',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    address: 'Via Aldo Rossi, 8 20149 Milano',
    website: 'http://www.acmilan.com',
    founded: 1899,
    clubColors: 'Red / Black',
    venue: 'San Siro',
    leagueId: 'serie-a',
    coach: { name: 'Stefano Pioli', nationality: 'Italy' },
    players: [
      { id: 901, name: 'Mike Maignan', position: 'Goalkeeper', number: 16, nationality: 'France' },
      { id: 902, name: 'Theo Hernández', position: 'Defender', number: 19, nationality: 'France' },
      { id: 903, name: 'Rafael Leão', position: 'Attacker', number: 10, nationality: 'Portugal' },
      { id: 904, name: 'Olivier Giroud', position: 'Attacker', number: 9, nationality: 'France' },
      { id: 905, name: 'Fikayo Tomori', position: 'Defender', number: 23, nationality: 'England' },
      { id: 906, name: 'Ismaël Bennacer', position: 'Midfielder', number: 4, nationality: 'Algeria' },
      { id: 907, name: 'Christian Pulisic', position: 'Attacker', number: 11, nationality: 'United States' },
      { id: 908, name: 'Davide Calabria', position: 'Defender', number: 2, nationality: 'Italy' }
    ]
  },
  
  // Ligue 1 teams
  {
    id: 10,
    name: 'Paris Saint-Germain FC',
    shortName: 'PSG',
    tla: 'PSG',
    crest: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    address: '24, Rue du Commandant Guilbaud 75016 Paris',
    website: 'http://www.psg.fr',
    founded: 1970,
    clubColors: 'Red / Blue',
    venue: 'Parc des Princes',
    leagueId: 'ligue-1',
    coach: { name: 'Luis Enrique', nationality: 'Spain' },
    players: [
      { id: 1001, name: 'Gianluigi Donnarumma', position: 'Goalkeeper', number: 99, nationality: 'Italy' },
      { id: 1002, name: 'Marquinhos', position: 'Defender', number: 5, nationality: 'Brazil' },
      { id: 1003, name: 'Kylian Mbappé', position: 'Attacker', number: 7, nationality: 'France' },
      { id: 1004, name: 'Achraf Hakimi', position: 'Defender', number: 2, nationality: 'Morocco' },
      { id: 1005, name: 'Marco Asensio', position: 'Attacker', number: 11, nationality: 'Spain' },
      { id: 1006, name: 'Vitinha', position: 'Midfielder', number: 17, nationality: 'Portugal' },
      { id: 1007, name: 'Ousmane Dembélé', position: 'Attacker', number: 10, nationality: 'France' },
      { id: 1008, name: 'Lucas Hernández', position: 'Defender', number: 21, nationality: 'France' }
    ]
  },
  // Add more teams for other leagues as needed
];

module.exports = { teams, leagues };
