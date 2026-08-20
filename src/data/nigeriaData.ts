import { GeopoliticalZone, InecOffice, CoreFocusArea } from '../types';
import { ALL_NIGERIA_LGAS_BY_STATE } from './allNigeriaLgas';

export { ALL_NIGERIA_LGAS_BY_STATE };

export const GEOPOLITICAL_ZONES: Record<GeopoliticalZone, string[]> = {
  'South West': ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
  'North West': ['Kano', 'Kaduna', 'Katsina', 'Jigawa', 'Sokoto', 'Zamfara', 'Kebbi'],
  'North Central': ['FCT Abuja', 'Nasarawa', 'Niger', 'Kogi', 'Benue', 'Kwara', 'Plateau'],
  'North East': ['Borno', 'Yobe', 'Adamawa', 'Gombe', 'Bauchi', 'Taraba'],
  'South East': ['Anambra', 'Enugu', 'Imo', 'Abia', 'Ebonyi'],
  'South South': ['Rivers', 'Delta', 'Edo', 'Cross River', 'Akwa Ibom', 'Bayelsa']
};

// Full 774 Local Government Areas mapped across all 36 States + FCT Abuja
export const SAMPLE_LGAS_BY_STATE: Record<string, string[]> = ALL_NIGERIA_LGAS_BY_STATE;

export const SAMPLE_WARDS_BY_LGA: Record<string, string[]> = {
  // Lagos State LGAs
  'Ikeja': [
    'Ward A (GRA / Police Barracks)',
    'Ward B (Alausa / Secretariat)',
    'Ward C (Oregun / Olusosun)',
    'Ward D (Central Ikeja)',
    'Ward E (Computer Village / Anifowoshe)',
    'Ward F (Ipodo / Seriki)',
    'Ward G (Onigbongbo)',
    'Ward H (Agidingbi)',
    'Ward I (Ojodu / Berger)',
    'Ward J (Oke-Ira)'
  ],
  'Alimosho': [
    'Ward 01 (Akowonjo)',
    'Ward 02 (Egbeda)',
    'Ward 03 (Ikotun)',
    'Ward 04 (Igando)',
    'Ward 05 (Ipaja)',
    'Ward 06 (Ayobo)',
    'Ward 07 (Idimu)',
    'Ward 08 (Pleasure / Ijaiye)',
    'Ward 09 (Gowon Estate)',
    'Ward 10 (Miran / Egbe)'
  ],
  'Surulere': [
    'Ward 01 (Akerele / Ojuelegba)',
    'Ward 02 (Adeniran Ogunsanya)',
    'Ward 03 (Ijesha / Itire)',
    'Ward 04 (Aguda)',
    'Ward 05 (Coker)',
    'Ward 06 (Orile)',
    'Ward 07 (Masha / Bode Thomas)',
    'Ward 08 (Stadium / Tejuosho)',
    'Ward 09 (Lawanson)'
  ],
  'Lagos Island': [
    'Ward A (Olowogbowo)',
    'Ward B (Isale Eko)',
    'Ward C (Lafiaji)',
    'Ward D (Okepopo)',
    'Ward E (Epetedo)',
    'Ward F (Okesuna)',
    'Ward G (Anikantamo)',
    'Ward H (Idumota)'
  ],
  'Eti-Osa': [
    'Ward 01 (Ikoyi I)',
    'Ward 02 (Ikoyi II)',
    'Ward 03 (Victoria Island I)',
    'Ward 04 (Victoria Island II)',
    'Ward 05 (Lekki Phase 1)',
    'Ward 06 (Chevron / Ikota)',
    'Ward 07 (Ajah / Sangotedo)',
    'Ward 08 (Badore / Langbasa)',
    'Ward 09 (Ado / Ilasan)',
    'Ward 10 (Ogombo)'
  ],
  'Kosofe': [
    'Ward 01 (Gbagada Phase 1)',
    'Ward 02 (Gbagada Phase 2)',
    'Ward 03 (Ifako / Soluyi)',
    'Ward 04 (Anthony Village)',
    'Ward 05 (Mende / Maryland)',
    'Ward 06 (Ojota)',
    'Ward 07 (Ketu / Ikosi)',
    'Ward 08 (Mile 12 / Agiliti)',
    'Ward 09 (Owode Onirin)',
    'Ward 10 (Isheri)'
  ],
  'Ikorodu': [
    'Ward 01 (Ikorodu Central)',
    'Ward 02 (Ipakodo / Ogolonto)',
    'Ward 03 (Ikorodu North / Isiwu)',
    'Ward 04 (Igbogbo / Baiyeku)',
    'Ward 05 (Imota)',
    'Ward 06 (Ijede)',
    'Ward 07 (Agbede / Isawo)',
    'Ward 08 (Odogunyan / Ita-Oluwo)'
  ],
  'Oshodi-Isolo': [
    'Ward 01 (Oshodi Central)',
    'Ward 02 (Mafoluku)',
    'Ward 03 (Shogunle)',
    'Ward 04 (Isolo)',
    'Ward 05 (Okota)',
    'Ward 06 (Ejigbo Central)',
    'Ward 07 (Bucknor / Jakande)',
    'Ward 08 (Ilasamaja)'
  ],
  'Agege': [
    'Ward 01 (Agbotikuyo)',
    'Ward 02 (Dopemu)',
    'Ward 03 (Orile Agege)',
    'Ward 04 (Iloro / Agege Stadium)',
    'Ward 05 (Isale Oja)',
    'Ward 06 (Tabon Tabon)',
    'Ward 07 (Papa Ashafa)'
  ],
  'Amuwo-Odofin': [
    'Ward 01 (Festac 1st / 2nd Ave)',
    'Ward 02 (Festac 3rd / 4th Ave)',
    'Ward 03 (Festac 5th / 7th Ave)',
    'Ward 04 (Mile 2 / Amuwo Central)',
    'Ward 05 (Kirikiri)',
    'Ward 06 (Ijegun / Satellite Town)',
    'Ward 07 (Abule Ado)'
  ],
  'Apapa': [
    'Ward 01 (Apapa Central / Wharf)',
    'Ward 02 (GRA Apapa)',
    'Ward 03 (Ijora Oloye)',
    'Ward 04 (Ijora Badia)',
    'Ward 05 (Marine Beach)',
    'Ward 06 (Liverpool / Snake Island)'
  ],
  'Badagry': [
    'Ward 01 (Badagry Central)',
    'Ward 02 (Ajara)',
    'Ward 03 (Ibereko)',
    'Ward 04 (Aradagun)',
    'Ward 05 (Apa)',
    'Ward 06 (Seme / Border Post)',
    'Ward 07 (Ajido)'
  ],
  'Epe': [
    'Ward 01 (Epe Central)',
    'Ward 02 (Poka)',
    'Ward 03 (Noforija)',
    'Ward 04 (Oriba)',
    'Ward 05 (Ibonwon)',
    'Ward 06 (Agbowa)'
  ],
  'Ibeju-Lekki': [
    'Ward 01 (Ibeju 1)',
    'Ward 02 (Ibeju 2)',
    'Ward 03 (Lekki 1)',
    'Ward 04 (Lekki 2 / Free Trade Zone)',
    'Ward 05 (Eleko / Akodo)',
    'Ward 06 (Elerangbe)'
  ],
  'Ifako-Ijaiye': [
    'Ward 01 (Ifako Central)',
    'Ward 02 (Ijaiye / Ojokoro)',
    'Ward 03 (Fagba / Iju Station)',
    'Ward 04 (Alakuko / Kollington)',
    'Ward 05 (Old Ifako)'
  ],
  'Lagos Mainland': [
    'Ward 01 (Yaba / Sabo / UNILAG)',
    'Ward 02 (Ebute Metta East)',
    'Ward 03 (Ebute Metta West)',
    'Ward 04 (Iwaya / Makoko)',
    'Ward 05 (Oyadiran Estate)',
    'Ward 06 (Alagomeji)'
  ],
  'Mushin': [
    'Ward 01 (Mushin Central / Post Office)',
    'Ward 02 (Papa Ajao)',
    'Ward 03 (Ilasamaja)',
    'Ward 04 (Olateju)',
    'Ward 05 (Palm Avenue)',
    'Ward 06 (Idi-Araba / LUTH)'
  ],
  'Ojo': [
    'Ward 01 (Ojo Town)',
    'Ward 02 (Alaba International / Rago)',
    'Ward 03 (Iba / LASU)',
    'Ward 04 (Okokomaiko)',
    'Ward 05 (Ajangbadi)',
    'Ward 06 (Ijegun Egba)'
  ],
  'Somolu': [
    'Ward 01 (Somolu Central / Bajulaiye)',
    'Ward 02 (Akoka / St. Finbarrs)',
    'Ward 03 (Bariga Central)',
    'Ward 04 (Ilaje / Pedro)',
    'Ward 05 (Abule Okuta)',
    'Ward 06 (Fola Agoro)'
  ],

  // FCT Abuja LGAs
  'Abuja Municipal (AMAC)': [
    'Ward 01 (City Centre / Central Area / Maitama)',
    'Ward 02 (Garki / Area 1 - 11)',
    'Ward 03 (Wuse / Wuse II)',
    'Ward 04 (Asokoro / Guzape)',
    'Ward 05 (Gwarinpa / Life Camp / Jabi)',
    'Ward 06 (Utako / Mabushi / Katampe)',
    'Ward 07 (Kabusa / Lokogoma / Apo)',
    'Ward 08 (Lugbe / Airport Road / Pyakasa)',
    'Ward 09 (Karu / Jikwoyi / Orozo)',
    'Ward 10 (Nyanya Central)',
    'Ward 11 (Jiwa / Dei-Dei)',
    'Ward 12 (Karshi)'
  ],
  'Bwari': [
    'Ward 01 (Bwari Central / Law School)',
    'Ward 02 (Kubwa / Dawaki / Katampe Ext)',
    'Ward 03 (Dutse Alhaji / Dutse Makaranta)',
    'Ward 04 (Ushafa / Pottery Village)',
    'Ward 05 (Igu / Kawu)',
    'Ward 06 (Kuduru)',
    'Ward 07 (Byazhin)',
    'Ward 08 (Mpape / Katampe Hill)'
  ],
  'Gwagwalada': [
    'Ward 01 (Gwagwalada Central / UNIABUJA)',
    'Ward 02 (Kutunku)',
    'Ward 03 (Staff Quarters / Specialist Hospital)',
    'Ward 04 (Ibwa)',
    'Ward 05 (Paiko)',
    'Ward 06 (Dobi)',
    'Ward 07 (Zuba / Fruit Market / Expressway)',
    'Ward 08 (Gwako)'
  ],
  'Kuje': [
    'Ward 01 (Kuje Central / Secretariat)',
    'Ward 02 (Chibiri)',
    'Ward 03 (Gaube)',
    'Ward 04 (Kwaku)',
    'Ward 05 (Kabi)',
    'Ward 06 (Rubochi)',
    'Ward 07 (Gudun Karya)'
  ],
  'Kwali': [
    'Ward 01 (Kwali Central)',
    'Ward 02 (Ashara)',
    'Ward 03 (Gumbo)',
    'Ward 04 (Kilankwa)',
    'Ward 05 (Pai)',
    'Ward 06 (Yangoji / Sheda)',
    'Ward 07 (Dafa)'
  ],
  'Abaji': [
    'Ward 01 (Abaji Central)',
    'Ward 02 (Abaji North East)',
    'Ward 03 (Abaji South East)',
    'Ward 04 (Agyana / Pandagi)',
    'Ward 05 (Rimba / Ebagi)',
    'Ward 06 (Nuku)',
    'Ward 07 (Gurdi)'
  ],

  // Kano State LGAs
  'Kano Municipal': [
    'Ward 01 (Shahuchi / Emirs Palace)',
    'Ward 02 (Zango)',
    'Ward 03 (Gandun Albasa)',
    'Ward 04 (Chedi)',
    'Ward 05 (Kankarofi)',
    'Ward 06 (Yakasai)',
    'Ward 07 (Tudun Wada Kano)',
    'Ward 08 (Gidan Murtala / Kofar Nasarawa)',
    'Ward 09 (Sheshe)',
    'Ward 10 (Soron Dinki)'
  ],
  'Dala': [
    'Ward 01 (Dala Central)',
    'Ward 02 (Gwammaja)',
    'Ward 03 (Kabuwaya)',
    'Ward 04 (Kantudu)',
    'Ward 05 (Madabo)',
    'Ward 06 (Yalwa)'
  ],
  'Fagge': [
    'Ward 01 (Fagge A)',
    'Ward 02 (Fagge B)',
    'Ward 03 (Fagge C)',
    'Ward 04 (Fagge D)',
    'Ward 05 (Kwachiri)',
    'Ward 06 (Sabon Gari East)',
    'Ward 07 (Sabon Gari West)'
  ],
  'Nasarawa': [
    'Ward 01 (Gwagwarwa)',
    'Ward 02 (Giginyu)',
    'Ward 03 (Hotoro North)',
    'Ward 04 (Hotoro South)',
    'Ward 05 (Kaura Goje)',
    'Ward 06 (Tudun Murtala)',
    'Ward 07 (Badawa / GRA)'
  ],

  // Rivers State LGAs
  'Port Harcourt': [
    'Ward 01 (Old GRA / Diobu 1)',
    'Ward 02 (Diobu 2)',
    'Ward 03 (Diobu 3)',
    'Ward 04 (Town / Township)',
    'Ward 05 (Borokiri)',
    'Ward 06 (Marine Base / Creek Road)',
    'Ward 07 (Oroworukwo)',
    'Ward 08 (Rumuwoji / Mile 1)',
    'Ward 09 (Ogbunabali)',
    'Ward 10 (Ochiri)'
  ],
  'Obio/Akpor': [
    'Ward 01 (Rumuodomaya / LGA HQ)',
    'Ward 02 (Rumuokoro / Rukpokwu)',
    'Ward 03 (Choba / UNIPORT)',
    'Ward 04 (Rumuokwuta / Mgbuoba)',
    'Ward 05 (Rumuola / GRA Phase 4)',
    'Ward 06 (Elelenwo)',
    'Ward 07 (Woji)',
    'Ward 08 (Trans-Amadi / Slaughter)',
    'Ward 09 (Rumueme)',
    'Ward 10 (Ozuoba / Alakahia)'
  ],

  // Oyo State LGAs
  'Ibadan North': [
    'Ward 01 (Agodi / Total Garden)',
    'Ward 02 (Bodija / Ashi / Basorun)',
    'Ward 03 (Yemetu / Aladorin)',
    'Ward 04 (Nalende / Mokola)',
    'Ward 05 (Sango / Samonda)',
    'Ward 06 (University of Ibadan / Agbowo)',
    'Ward 07 (Secretariat / GRA)',
    'Ward 08 (Ikolaba / Kongi)',
    'Ward 09 (Orogun / Ojoo)'
  ],
  'Ibadan Southwest': [
    'Ward 01 (Ring Road / Molete)',
    'Ward 02 (Oke-Ado)',
    'Ward 03 (Ososami)',
    'Ward 04 (Aleshinloye / Iyaganku)',
    'Ward 05 (Challenge / Orita)',
    'Ward 06 (Apata / Oluyole Estate)'
  ],
  'Ogbomoso North': [
    'Ward 01 (Abogunde)',
    'Ward 02 (Arowomole)',
    'Ward 03 (Isale Afon)',
    'Ward 04 (Osupa / LAUTECH)',
    'Ward 05 (Sabo / Tara)'
  ],

  // Kaduna State LGAs
  'Kaduna North': [
    'Ward 01 (Kabala Costain / Doki)',
    'Ward 02 (Garki / Barnawa)',
    'Ward 03 (Badarawa / Kwaru)',
    'Ward 04 (Tudun Wada North)',
    'Ward 05 (Unguwar Rimi / State House)',
    'Ward 06 (Unguwar Shanu / Abakpa)',
    'Ward 07 (Kawo / Mando)'
  ],
  'Kaduna South': [
    'Ward 01 (Tudun Wada South)',
    'Ward 02 (Sabon Gari)',
    'Ward 03 (Tudun Nupawa)',
    'Ward 04 (Television / Kakuri)',
    'Ward 05 (Kakuri Hausa)',
    'Ward 06 (Makera / Stadium Area)',
    'Ward 07 (Barnawa GRA)'
  ],
  'Zaria': [
    'Ward 01 (Zaria City / Kwarbai)',
    'Ward 02 (Gyallesu / ABUSITE)',
    'Ward 03 (Tudun Wada Zaria)',
    'Ward 04 (Sabon Gari Zaria)',
    'Ward 05 (Kufena / Waje)',
    'Ward 06 (Samaru / ABU Main Campus)',
    'Ward 07 (Muchia)'
  ],

  // Ogun State LGAs
  'Abeokuta South': [
    'Ward 01 (Ake I)',
    'Ward 02 (Ake II)',
    'Ward 03 (Erunwon / Totoro)',
    'Ward 04 (Ijaiye)',
    'Ward 05 (Saje / Isale-Igbore)',
    'Ward 06 (Oke-Ijeun)',
    'Ward 07 (Iberekodo)',
    'Ward 08 (Imo / Itesi)'
  ],
  'Ado-Odo/Ota': [
    'Ward 01 (Ota 1 / Palace)',
    'Ward 02 (Ota 2 / Toll Gate)',
    'Ward 03 (Iju / Atan)',
    'Ward 04 (Sango Ota / Underbridge)',
    'Ward 05 (Agbado / Ijoko)',
    'Ward 06 (Iro / Ado-Odo)',
    'Ward 07 (Covenant / Canaanland)',
    'Ward 08 (Itele / Lafenwa)'
  ],
  'Ijebu Ode': [
    'Ward 01 (Isale Itun)',
    'Ward 02 (Porogun 1)',
    'Ward 03 (Porogun 2)',
    'Ward 04 (Ijasi)',
    'Ward 05 (Obalende / GRA)',
    'Ward 06 (Molipa / Oke Aje)'
  ],

  // Enugu State LGAs
  'Enugu North': [
    'Ward 01 (GRA / New Haven)',
    'Ward 02 (Ogbete / Market Area)',
    'Ward 03 (Asata Central)',
    'Ward 04 (Iva Valley / Coal Camp)',
    'Ward 05 (Independence Layout)',
    'Ward 06 (Ogui New Layout)',
    'Ward 07 (China Town / Abakpa)'
  ],
  'Nsukka': [
    'Ward 01 (Nsukka Urban 1 / UNN)',
    'Ward 02 (Nsukka Urban 2)',
    'Ward 03 (Ihe / Owerre)',
    'Ward 04 (Alor-Uno)',
    'Ward 05 (Eha-Alumona)',
    'Ward 06 (Obukpa)',
    'Ward 07 (Opi)'
  ],

  // Anambra State LGAs
  'Awka South': [
    'Ward 01 (Awka I / GRA / Secretariat)',
    'Ward 02 (Awka II / UNIZIK)',
    'Ward 03 (Amawbia)',
    'Ward 04 (Nise)',
    'Ward 05 (Okpuno)',
    'Ward 06 (Umuawulu / Ezinato)'
  ],
  'Onitsha North': [
    'Ward 01 (American Quarters / GRA)',
    'Ward 02 (Inland Town 1)',
    'Ward 03 (Inland Town 2)',
    'Ward 04 (Odoakpu 1 / Main Market)',
    'Ward 05 (Odoakpu 2)',
    'Ward 06 (Ogboli / Eke Market)'
  ],
  'Nnewi North': [
    'Ward 01 (Otolo 1)',
    'Ward 02 (Otolo 2)',
    'Ward 03 (Uruagu 1)',
    'Ward 04 (Uruagu 2)',
    'Ward 05 (Umudim)',
    'Ward 06 (Nnewichi)'
  ],

  // Edo State LGAs
  'Oredo (Benin City)': [
    'Ward 01 (GRA / Ring Road / Oba Palace)',
    'Ward 02 (Oredo Central / Mission Rd)',
    'Ward 03 (Ihogbe / Airport Rd)',
    'Ward 04 (New Benin / Market)',
    'Ward 05 (Uselu / UNIBEN)',
    'Ward 06 (Ogbelaka / Nekpenekpen)',
    'Ward 07 (Ugbowo)'
  ],

  // Delta State LGAs
  'Warri South': [
    'Ward 01 (Main Market / GRA)',
    'Ward 02 (Okere Urhobo)',
    'Ward 03 (Edjeba / NPA)',
    'Ward 04 (Ugborikoko / Pessu)',
    'Ward 05 (Bowen / Odion)',
    'Ward 06 (Ogunu / Shell Ramp)'
  ],
  'Oshimili South (Asaba)': [
    'Ward 01 (Asaba Central / Cable Point)',
    'Ward 02 (Umuagu / Nnebisi)',
    'Ward 03 (West End / GRA)',
    'Ward 04 (Oko / River Niger Bank)',
    'Ward 05 (Okpanam Road / Summit)'
  ],

  // Katsina State LGAs
  'Katsina Municipal': [
    'Ward 01 (Wakilin Gabas 1 / Emirs Palace)',
    'Ward 02 (Wakilin Gabas 2)',
    'Ward 03 (Wakilin Yamma 1)',
    'Ward 04 (Wakilin Yamma 2)',
    'Ward 05 (Kofar Kaura / GRA)',
    'Ward 06 (Kofar Sauri)',
    'Ward 07 (Kofar Marusa)'
  ],

  // Borno State LGAs
  'Maiduguri Municipal': [
    'Ward 01 (Shehuri North / Shehus Palace)',
    'Ward 02 (Shehuri South)',
    'Ward 03 (Maisandari)',
    'Ward 04 (Lamisula / Jabarmari)',
    'Ward 05 (Bulabulin / Gwange)',
    'Ward 06 (Hausari / Fezzan)',
    'Ward 07 (Bolori / UNIMAID)'
  ],

  // Kwara State LGAs
  'Ilorin West': [
    'Ward 01 (Adewole / GRA)',
    'Ward 02 (Ajikobi / Emirs Palace)',
    'Ward 03 (Badari / Mandate)',
    'Ward 04 (Oloje / Pakata)',
    'Ward 05 (Wara / Osin / Egbejila)',
    'Ward 06 (Baboko / Market)'
  ],

  // Plateau State LGAs
  'Jos North': [
    'Ward 01 (Ali Kazaure / Central)',
    'Ward 02 (Gangare)',
    'Ward 03 (Jenta Adamu / Rock Haven)',
    'Ward 04 (Kabong / Rukuba)',
    'Ward 05 (Tudun Wada / GRA)',
    'Ward 06 (Vwang / Unijos)'
  ]
};

export const getWardsForLga = (lgaName: string, stateName?: string): string[] => {
  if (!lgaName) {
    return [
      'Ward 01 (Central)',
      'Ward 02 (North)',
      'Ward 03 (South)',
      'Ward 04 (East)',
      'Ward 05 (West)',
      'Ward 06 (Township)',
      'Ward 07 (GRA)',
      'Ward 08 (Commercial)',
      'Ward 09 (Market)',
      'Ward 10 (Residential)'
    ];
  }
  
  if (SAMPLE_WARDS_BY_LGA[lgaName]) {
    return SAMPLE_WARDS_BY_LGA[lgaName];
  }

  // Clean the LGA name from any parentheses
  const cleanLga = lgaName.split('(')[0].trim() || lgaName;

  // Generate 10 standard, realistic electoral wards for this LGA
  return [
    `${cleanLga} - Ward 01 (Central / Palace)`,
    `${cleanLga} - Ward 02 (North)`,
    `${cleanLga} - Ward 03 (South)`,
    `${cleanLga} - Ward 04 (East)`,
    `${cleanLga} - Ward 05 (West)`,
    `${cleanLga} - Ward 06 (Township / Commercial)`,
    `${cleanLga} - Ward 07 (GRA / Secretariat)`,
    `${cleanLga} - Ward 08 (Market / Motor Park)`,
    `${cleanLga} - Ward 09 (Station / Model Area)`,
    `${cleanLga} - Ward 10 (Outskirts / Rural)`
  ];
};

export const SAMPLE_POLLING_UNITS_BY_WARD: Record<string, string[]> = {
  'Ward A (GRA / Police Barracks)': [
    'PU 001 - Police Barracks Gate / Ikeja Secretariat',
    'PU 002 - GRA Community Hall, Isaac John St.',
    'PU 003 - Govt College Ikeja, Oba Akinjobi Way',
    'PU 004 - Police College Open Space, Ikeja',
    'PU 005 - Maryland Primary School, Mobolaji Bank Anthony',
    'PU 006 - Ikeja Club Open Field'
  ],
  'Ward B (Alausa / Secretariat)': [
    'PU 001 - Alausa Primary School, Secretariat Road',
    'PU 002 - Lagos State House of Assembly Gate',
    'PU 003 - Agidingbi Primary School Field',
    'PU 004 - CBD Open Space, Alausa',
    'PU 005 - Central Mosque Open Space, Alausa'
  ],
  'Ward C (Oregun / Olusosun)': [
    'PU 001 - Oregun High School Open Space',
    'PU 002 - Kudirat Abiola Way Junction',
    'PU 003 - Olusosun Primary School',
    'PU 004 - Clay Bus Stop Open Space'
  ],
  'Ward 01 (City Centre / Maitama)': [
    'PU 001 - Maitama Model Primary School',
    'PU 002 - Transcorp Hilton Staff Quarters Open Space',
    'PU 003 - Minister\'s Hill Square',
    'PU 004 - Aguiyi Ironsi Street Open Field',
    'PU 005 - Maitama District Hospital Gate'
  ],
  'Ward 01 (City Centre / Central Area / Maitama)': [
    'PU 001 - Maitama Model Primary School, Aguiyi Ironsi',
    'PU 002 - Transcorp Hilton Staff Quarters Open Space',
    'PU 003 - Ministers Hill Square, Maitama',
    'PU 004 - Eagle Square Open Ground, Central Area',
    'PU 005 - Federal Secretariat Complex Gate, Shehu Shagari Way'
  ],
  'Ward 02 (Garki)': [
    'PU 001 - Garki Model Primary School, Area 11',
    'PU 002 - Area 1 Primary School',
    'PU 003 - Garki Village Square',
    'PU 004 - Area 8 Open Space'
  ],
  'Ward 02 (Garki / Area 1 - 11)': [
    'PU 001 - Garki Model Primary School, Area 11',
    'PU 002 - Area 1 Primary School Open Space',
    'PU 003 - Garki Village Square / Old Market',
    'PU 004 - Area 3 Neighborhood Centre',
    'PU 005 - Area 10 Post Office Open Field'
  ],
  'Ward 03 (Wuse)': [
    'PU 001 - Government Secondary School Wuse Zone 3',
    'PU 002 - Wuse Zone 6 Primary School',
    'PU 003 - Wuse Market Open Space',
    'PU 004 - Zone 2 Community Field'
  ],
  'Ward 03 (Wuse / Wuse II)': [
    'PU 001 - Government Secondary School Wuse Zone 3',
    'PU 002 - Wuse Zone 6 Primary School Field',
    'PU 003 - Wuse Market Gate / Bus Terminal',
    'PU 004 - Aminu Kano Crescent Open Space, Wuse II',
    'PU 005 - Zone 2 Community Field'
  ]
};

export const getPollingUnitsForWard = (wardName: string, lgaName?: string): string[] => {
  if (!wardName) {
    return [
      'PU 001 - Community Primary School Gate',
      'PU 002 - Local Govt Secretariat / Hall',
      'PU 003 - Primary Health Centre Open Space',
      'PU 004 - Central Market Square',
      'PU 005 - Community Civic Centre Field',
      'PU 006 - Town Square Junction',
      'PU 007 - Government Secondary School Gate',
      'PU 008 - Motor Park / Station Space'
    ];
  }

  if (SAMPLE_POLLING_UNITS_BY_WARD[wardName]) {
    return SAMPLE_POLLING_UNITS_BY_WARD[wardName];
  }

  // Extract clean label without brackets if any
  const cleanWard = wardName.split('(')[0].replace(/^Ward\s+\w+\s*-\s*/, '').trim() || wardName;

  if (SAMPLE_POLLING_UNITS_BY_WARD[cleanWard]) {
    return SAMPLE_POLLING_UNITS_BY_WARD[cleanWard];
  }

  // Dynamic realistic polling units for this ward
  return [
    `PU 001 - ${cleanWard} Community Primary School Gate`,
    `PU 002 - ${cleanWard} Town Hall / Civic Square`,
    `PU 003 - ${cleanWard} Central Market Open Space`,
    `PU 004 - ${cleanWard} Comprehensive Health Centre`,
    `PU 005 - ${cleanWard} Government Secondary School Field`,
    `PU 006 - ${cleanWard} Town Square Junction / Bus Stop`,
    `PU 007 - ${cleanWard} Customary Court Open Space`,
    `PU 008 - ${cleanWard} Community Play Ground / Field`,
    `PU 009 - ${cleanWard} Maternity Clinic / Dispensary`,
    `PU 010 - ${cleanWard} Postal Agency / Library Space`
  ];
};

export const CORE_FOCUS_AREAS: CoreFocusArea[] = [
  {
    id: 'economic-growth',
    title: 'Promoting Inclusive Economic Growth',
    description: 'Fostering diversified economic opportunities, infrastructure expansion, micro-enterprise funding, and agricultural revitalization to lift millions into prosperous livelihoods.',
    details: [
      'Targeted credit facilities for MSMEs and youth entrepreneurs',
      'Renewed Hope Infrastructure Development Fund across 36 states',
      'Agricultural modernization and food security initiatives',
      'Port and trade corridor optimization'
    ],
    iconName: 'TrendingUp',
    impactMetric: '36 States Covered'
  },
  {
    id: 'national-unity',
    title: 'Fostering National Unity & Peaceful Coexistence',
    description: 'Strengthening internal security, inter-community dialogues, rule of law, and peaceful harmony across every geopolitical zone and ethnicity.',
    details: [
      'Grassroots peace councils and community security partnerships',
      'Inter-regional trade and cultural exchange forums',
      'Equitable resource distribution and regional development commissions',
      'Comprehensive security sector reform & intelligence synergy'
    ],
    iconName: 'ShieldCheck',
    impactMetric: '774 LGAs Connected'
  },
  {
    id: 'youth-women',
    title: 'Empowering Youth & Women',
    description: 'Pioneering strategic empowerment funds, digital skill acquisition, leadership mentorship, and business grants for young visionaries and women leaders.',
    details: [
      '3 Million Technical Talent (3MTT) digital training initiative',
      'National Youth Investment Fund & Student Loan Scheme (NELFUND)',
      'Women Entrepreneurship & Maternal Health grants',
      'Civic leadership accelerator programs'
    ],
    iconName: 'Users',
    impactMetric: '2M+ Beneficiaries'
  },
  {
    id: 'democratic-ideals',
    title: 'Advocating Progressive Democratic Ideals',
    description: 'Upholding constitutional democracy, electoral integrity, transparent governance, accountable public institutions, and active citizen participation.',
    details: [
      'Electorate registration and PVC awareness campaigns',
      'Civic education & grassroots town halls',
      'Transparent public financial accountability frameworks',
      'Strengthening local government autonomy and grassroots governance'
    ],
    iconName: 'Award',
    impactMetric: '100% Grassroots'
  }
];

export const SAMPLE_INEC_OFFICES: InecOffice[] = [
  {
    state: 'FCT Abuja',
    lga: 'Abuja Municipal (AMAC)',
    address: 'INEC Headquarters, Plot 436 Zambezi Crescent, Maitama, Abuja',
    phone: '+234 9 290 1200',
    status: 'Main Office'
  },
  {
    state: 'FCT Abuja',
    lga: 'Bwari',
    address: 'INEC Area Office, Bwari Main Secretariat Road, Bwari, FCT',
    phone: '09138886874',
    status: 'Active'
  },
  {
    state: 'Abia',
    lga: 'Umuahia North',
    address: 'INEC State Office, Factory Road, Umuahia, Abia State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Adamawa',
    lga: 'Yola North',
    address: 'INEC State Office, Galadima Aminu Way, Jimeta, Yola, Adamawa State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Akwa Ibom',
    lga: 'Uyo',
    address: 'INEC State Headquarters, Information Drive, Uyo, Akwa Ibom State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Anambra',
    lga: 'Awka South',
    address: 'INEC State Office, House of Assembly Road, Awka, Anambra State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Bauchi',
    lga: 'Bauchi',
    address: 'INEC State Headquarters, Ahmadu Bello Way, Bauchi, Bauchi State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Bayelsa',
    lga: 'Yenagoa',
    address: 'INEC State Office, Swali Road, Yenagoa, Bayelsa State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Benue',
    lga: 'Makurdi',
    address: 'INEC State Headquarters, High Level, Makurdi, Benue State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Borno',
    lga: 'Maiduguri Municipal',
    address: 'INEC State Office, Kashim Ibrahim Way, Maiduguri, Borno State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Cross River',
    lga: 'Calabar Municipal',
    address: 'INEC State Headquarters, Murtala Mohammed Highway, Calabar, Cross River State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Delta',
    lga: 'Oshimili South (Asaba)',
    address: 'INEC State Office, Okpanam Road, Asaba, Delta State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Ebonyi',
    lga: 'Abakaliki',
    address: 'INEC State Headquarters, Town Planning Road, Abakaliki, Ebonyi State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Edo',
    lga: 'Oredo (Benin City)',
    address: 'INEC State Office, Ikpoba Hill / Sapele Road, Benin City, Edo State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Ekiti',
    lga: 'Ado Ekiti',
    address: 'INEC State Office, New Iyin Road, Ado-Ekiti, Ekiti State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Enugu',
    lga: 'Enugu North',
    address: 'INEC State Headquarters, Independence Layout, Enugu, Enugu State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Gombe',
    lga: 'Gombe Municipal',
    address: 'INEC State Office, Bauchi Road, Gombe, Gombe State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Imo',
    lga: 'Owerri Municipal',
    address: 'INEC State Headquarters, Port Harcourt Road, Owerri, Imo State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Jigawa',
    lga: 'Dutse',
    address: 'INEC State Office, Kiyawa Road, Dutse, Jigawa State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kaduna',
    lga: 'Kaduna North',
    address: 'INEC Kaduna State Secretariat, Sokoto Road, GRA Kaduna, Kaduna State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kano',
    lga: 'Kano Municipal',
    address: 'INEC State Headquarters, Hadejia Road, Kano, Kano State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Katsina',
    lga: 'Katsina Municipal',
    address: 'INEC State Headquarters, Daura Road, Katsina, Katsina State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kebbi',
    lga: 'Birnin Kebbi',
    address: 'INEC State Office, Emir Haruna Road, Birnin Kebbi, Kebbi State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kogi',
    lga: 'Lokoja',
    address: 'INEC State Headquarters, Marine Road, Lokoja, Kogi State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kwara',
    lga: 'Ilorin West',
    address: 'INEC State Office, Fate Road, GRA, Ilorin, Kwara State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Lagos',
    lga: 'Ikeja',
    address: 'INEC State Office, 6 Birrel Avenue, Sabo Yaba / Ikeja Secretariat, Lagos',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Nasarawa',
    lga: 'Lafia',
    address: 'INEC State Headquarters, Shendam Road, Lafia, Nasarawa State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Niger',
    lga: 'Chanchaga',
    address: 'INEC State Office, David Mark Road, Minna, Niger State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Ogun',
    lga: 'Abeokuta South',
    address: 'INEC State Office, Magbon, Abeokuta, Ogun State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Ondo',
    lga: 'Akure South',
    address: 'INEC State Office, Alagbaka GRA, Akure, Ondo State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Osun',
    lga: 'Osogbo',
    address: 'INEC State Headquarters, Gbongan-Osogbo Road, Osogbo, Osun State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Oyo',
    lga: 'Ibadan North',
    address: 'INEC Oyo Office, Agodi Gate / Secretariat Road, Ibadan, Oyo State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Plateau',
    lga: 'Jos North',
    address: 'INEC State Headquarters, Miango Road, Jos, Plateau State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Rivers',
    lga: 'Port Harcourt',
    address: 'INEC State Secretariat, 236 Aba Road, Port Harcourt, Rivers State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Sokoto',
    lga: 'Sokoto North',
    address: 'INEC State Office, Garba Duba Road, Sokoto, Sokoto State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Taraba',
    lga: 'Jalingo',
    address: 'INEC State Office, Barde Way, Jalingo, Taraba State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Yobe',
    lga: 'Damaturu',
    address: 'INEC State Office, Gujba Road, Damaturu, Yobe State',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Zamfara',
    lga: 'Gusau',
    address: 'INEC State Headquarters, Sokoto Road, Gusau, Zamfara State',
    phone: '09138886874',
    status: 'Main Office'
  }
];
