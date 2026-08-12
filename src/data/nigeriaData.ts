import { GeopoliticalZone, InecOffice, CoreFocusArea } from '../types';

export const GEOPOLITICAL_ZONES: Record<GeopoliticalZone, string[]> = {
  'South West': ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
  'North West': ['Kano', 'Kaduna', 'Katsina', 'Jigawa', 'Sokoto', 'Zamfara', 'Kebbi'],
  'North Central': ['FCT Abuja', 'Nasarawa', 'Niger', 'Kogi', 'Benue', 'Kwara', 'Plateau'],
  'North East': ['Borno', 'Yobe', 'Adamawa', 'Gombe', 'Bauchi', 'Taraba'],
  'South East': ['Anambra', 'Enugu', 'Imo', 'Abia', 'Ebonyi'],
  'South South': ['Rivers', 'Delta', 'Edo', 'Cross River', 'Akwa Ibom', 'Bayelsa']
};

export const SAMPLE_LGAS_BY_STATE: Record<string, string[]> = {
  'FCT Abuja': ['Abuja Municipal (AMAC)', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Abaji'],
  'Lagos': ['Alimosho', 'Ikeja', 'Surulere', 'Lagos Island', 'Eti-Osa', 'Kosofe', 'Ikorodu', 'Agege', 'Oshodi-Isolo', 'Badagry'],
  'Kano': ['Kano Municipal', 'Dala', 'Fagge', 'Gwale', 'Nasarawa', 'Tarauni', 'Ungogo', 'Kumbotso', 'Bichi', 'Gwarzo'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Ikwerre', 'Okrika', 'Degema', 'Bonny', 'Ahoada East'],
  'Oyo': ['Ibadan North', 'Ibadan Southwest', 'Ibadan Southeast', 'Ogbomoso North', 'Oyo East', 'Iseyin'],
  'Kaduna': ['Kaduna North', 'Kaduna South', 'Zaria', 'Chikun', 'Igabi', 'Jemaa', 'Soba'],
  'Ogun': ['Abeokuta South', 'Abeokuta North', 'Ifo', 'Ado-Odo/Ota', 'Ijebu Ode', 'Sagamu'],
  'Enugu': ['Enugu North', 'Enugu South', 'Enugu East', 'Nsukka', 'Udi', 'Nkanu West'],
  'Anambra': ['Awka South', 'Awka North', 'Onitsha North', 'Onitsha South', 'Nnewi North', 'Aguata'],
  'Edo': ['Oredo (Benin City)', 'Ikpoba-Okha', 'Egor', 'Etsako West', 'Esan West'],
  'Delta': ['Warri South', 'Uvwie', 'Oshimili South (Asaba)', 'Ethiope East', 'Ughelli North'],
  'Katsina': ['Katsina Municipal', 'Batagarawa', 'Daura', 'Funtua', 'Malumfashi', 'Kankia'],
  'Borno': ['Maiduguri Municipal', 'Jere', 'Biu', 'Bama', 'Monguno'],
  'Kwara': ['Ilorin West', 'Ilorin East', 'Ilorin South', 'Offa', 'Edu', 'Irepodun'],
  'Plateau': ['Jos North', 'Jos South', 'Jos East', 'Barkin Ladi', 'Pankshin', 'Mangu'],
  'Kogi': ['Lokoja', 'Okene', 'Kabba/Bunu', 'Ankpa', 'Idah', 'Ajaokuta'],
  'Nasarawa': ['Lafia', 'Karu', 'Keffi', 'Awe', 'Akwanga', 'Nasarawa'],
  'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Gwer East'],
  'Akwa Ibom': ['Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Abak'],
  'Cross River': ['Calabar Municipal', 'Calabar South', 'Ikom', 'Ogoja', 'Ugep'],
  'Ondo': ['Akure South', 'Akure North', 'Ondo West', 'Owo', 'Ikare Akoko'],
  'Osun': ['Osogbo', 'Olorunda', 'Ife Central', 'Ilesa East', 'Ede South'],
  'Ekiti': ['Ado Ekiti', 'Ikere', 'Ijero', 'Oye', 'Ikole'],
  'Jigawa': ['Dutse', 'Hadejia', 'Gumel', 'Kazaure', 'Ringim'],
  'Sokoto': ['Sokoto North', 'Sokoto South', 'Wamako', 'Bodinga', 'Gwadabawa'],
  'Zamfara': ['Gusau', 'Kaura Namoda', 'Talata Mafara', 'Bungudu'],
  'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yauri', 'Zuru'],
  'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Nguru'],
  'Adamawa': ['Yola North', 'Yola South', 'Mubi North', 'Jimeta', 'Numan'],
  'Gombe': ['Gombe Municipal', 'Dukku', 'Funakaye', 'Kaltungo'],
  'Bauchi': ['Bauchi Municipal', 'Azare (Katagum)', 'Misau', 'Toro'],
  'Taraba': ['Jalingo', 'Wukari', 'Bali', 'Sardauna'],
  'Imo': ['Owerri Municipal', 'Owerri North', 'Owerri West', 'Orlu', 'Okigwe'],
  'Abia': ['Umuahia North', 'Aba North', 'Aba South', 'Ohafia'],
  'Ebonyi': ['Abakaliki', 'Afikpo North', 'Ezza North'],
  'Bayelsa': ['Yenagoa', 'Brass', 'Ogbia', 'Sagbama']
};

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
    'Ward 10 (Miran)'
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
    'Ward F (Okesuna)'
  ],
  'Eti-Osa': [
    'Ward 01 (Ikoyi I)',
    'Ward 02 (Ikoyi II)',
    'Ward 03 (Victoria Island I)',
    'Ward 04 (Victoria Island II)',
    'Ward 05 (Lekki Phase 1)',
    'Ward 06 (Chevron / Ikota)',
    'Ward 07 (Ajah / Sangotedo)'
  ],
  'Kosofe': [
    'Ward 01 (Gbagada Phase 1)',
    'Ward 02 (Gbagada Phase 2)',
    'Ward 03 (Ifako / Soluyi)',
    'Ward 04 (Anthony Village)',
    'Ward 05 (Mende / Maryland)',
    'Ward 06 (Ojota)',
    'Ward 07 (Ketu / Ikosi)',
    'Ward 08 (Mile 12)'
  ],
  'Ikorodu': [
    'Ward 01 (Ikorodu Central)',
    'Ward 02 (Ipakodo)',
    'Ward 03 (Ikorodu North / Isiwu)',
    'Ward 04 (Igbogbo)',
    'Ward 05 (Imota)',
    'Ward 06 (Ijede)',
    'Ward 07 (Agbede / Isawo)'
  ],
  'Oshodi-Isolo': [
    'Ward 01 (Oshodi Central)',
    'Ward 02 (Mafoluku)',
    'Ward 03 (Shogunle)',
    'Ward 04 (Isolo)',
    'Ward 05 (Okota)',
    'Ward 06 (Ejigbo Central)',
    'Ward 07 (Bucknor)'
  ],
  'Agege': [
    'Ward 01 (Agbotikuyo)',
    'Ward 02 (Dopemu)',
    'Ward 03 (Orile Agege)',
    'Ward 04 (Iloro)',
    'Ward 05 (Isale Oja)',
    'Ward 06 (Tabon Tabon)'
  ],
  'Badagry': [
    'Ward 01 (Badagry Central)',
    'Ward 02 (Ajara)',
    'Ward 03 (Ibereko)',
    'Ward 04 (Aradagun)',
    'Ward 05 (Apa)',
    'Ward 06 (Seme)'
  ],

  // FCT Abuja LGAs
  'Abuja Municipal (AMAC)': [
    'Ward 01 (City Centre / Maitama)',
    'Ward 02 (Garki)',
    'Ward 03 (Wuse)',
    'Ward 04 (Asokoro)',
    'Ward 05 (Gui)',
    'Ward 06 (Gwarinpa)',
    'Ward 07 (Jiwa)',
    'Ward 08 (Kabusa)',
    'Ward 09 (Karshi)',
    'Ward 10 (Karu)',
    'Ward 11 (Nyanya)',
    'Ward 12 (Orozo)'
  ],
  'Bwari': [
    'Ward 01 (Bwari Central)',
    'Ward 02 (Kubwa / Dawaki)',
    'Ward 03 (Dutse)',
    'Ward 04 (Ushafa)',
    'Ward 05 (Igu)',
    'Ward 06 (Kuduru)',
    'Ward 07 (Byazhin)',
    'Ward 08 (Mpape)'
  ],
  'Gwagwalada': [
    'Ward 01 (Gwagwalada Central)',
    'Ward 02 (Kutunku)',
    'Ward 03 (Staff Quarters)',
    'Ward 04 (Ibwa)',
    'Ward 05 (Paiko)',
    'Ward 06 (Dobi)',
    'Ward 07 (Zuba)'
  ],

  // Kano LGAs
  'Kano Municipal': [
    'Ward 01 (Shahuchi)',
    'Ward 02 (Zango)',
    'Ward 03 (Gandun Albasa)',
    'Ward 04 (Chedi)',
    'Ward 05 (Kankarofi)',
    'Ward 06 (Yakasai)',
    'Ward 07 (Tudun Wada)',
    'Ward 08 (Gidan Murtala)'
  ],

  // Rivers LGAs
  'Port Harcourt': [
    'Ward 01 (Old GRA / Diobu 1)',
    'Ward 02 (Diobu 2)',
    'Ward 03 (Diobu 3)',
    'Ward 04 (Town / Township)',
    'Ward 05 (Borokiri)',
    'Ward 06 (Marine Base)',
    'Ward 07 (Oroworukwo)',
    'Ward 08 (Rumuwoji / Mile 1)'
  ],

  // Oyo LGAs
  'Ibadan North': [
    'Ward 01 (Agodi / Total Garden)',
    'Ward 02 (Bodija / Ashi)',
    'Ward 03 (Yemetu)',
    'Ward 04 (Nalende / Mokola)',
    'Ward 05 (Sango / Samonda)',
    'Ward 06 (University of Ibadan / Agbowo)',
    'Ward 07 (Secretariat / GRA)'
  ],
  'Ibadan Southwest': [
    'Ward 01 (Ring Road / Molete)',
    'Ward 02 (Oke-Ado)',
    'Ward 03 (Ososami)',
    'Ward 04 (Aleshinloye)',
    'Ward 05 (Challenge / Iyaganku)'
  ],

  // Kaduna LGAs
  'Kaduna North': [
    'Ward 01 (Kabala Costain / Doki)',
    'Ward 02 (Garki / Barnawa)',
    'Ward 03 (Badarawa / Kwaru)',
    'Ward 04 (Tudun Wada North)',
    'Ward 05 (Unguwar Rimi)',
    'Ward 06 (Unguwar Shanu)',
    'Ward 07 (Kawo)'
  ],
  'Kaduna South': [
    'Ward 01 (Tudun Wada South)',
    'Ward 02 (Sabon Gari)',
    'Ward 03 (Tudun Nupawa)',
    'Ward 04 (Television / Barnawa)',
    'Ward 05 (Kakuri Hausa)',
    'Ward 06 (Makera)'
  ],
  'Zaria': [
    'Ward 01 (Zaria City / Kwarbai)',
    'Ward 02 (Gyallesu / ABUSITE)',
    'Ward 03 (Tudun Wada Zaria)',
    'Ward 04 (Sabon Gari Zaria)',
    'Ward 05 (Kufena / Waje)'
  ],

  // Ogun LGAs
  'Abeokuta South': [
    'Ward 01 (Ake I)',
    'Ward 02 (Ake II)',
    'Ward 03 (Erunwon / Totoro)',
    'Ward 04 (Ijaiye)',
    'Ward 05 (Saje / Isale-Igbore)',
    'Ward 06 (Oke-Ijeun)'
  ],
  'Ado-Odo/Ota': [
    'Ward 01 (Ota 1)',
    'Ward 02 (Ota 2)',
    'Ward 03 (Iju / Atan)',
    'Ward 04 (Sango Ota)',
    'Ward 05 (Agbado / Ijoko)',
    'Ward 06 (Iro / Ado-Odo)'
  ],

  // Enugu LGAs
  'Enugu North': [
    'Ward 01 (GRA / New Haven)',
    'Ward 02 (Ogbete / Market Area)',
    'Ward 03 (Asata)',
    'Ward 04 (Iva Valley)',
    'Ward 05 (Independence Layout)',
    'Ward 06 (Ogui New Layout)'
  ],
  'Enugu South': [
    'Ward 01 (Akwuke)',
    'Ward 02 (Amechi)',
    'Ward 03 (Gariki / Ugwuaji)',
    'Ward 04 (Uwani East)',
    'Ward 05 (Uwani West)'
  ],

  // Anambra LGAs
  'Awka South': [
    'Ward 01 (Awka I / GRA)',
    'Ward 02 (Awka II)',
    'Ward 03 (Amawbia)',
    'Ward 04 (Nise)',
    'Ward 05 (Okpuno)',
    'Ward 06 (Umuawulu / Ezinato)'
  ],
  'Onitsha North': [
    'Ward 01 (American Quarters / GRA)',
    'Ward 02 (Inland Town 1)',
    'Ward 03 (Inland Town 2)',
    'Ward 04 (Odoakpu 1)',
    'Ward 05 (Odoakpu 2)'
  ],

  // Edo LGAs
  'Oredo (Benin City)': [
    'Ward 01 (GRA / Ring Road)',
    'Ward 02 (Oredo Central)',
    'Ward 03 (Ihogbe)',
    'Ward 04 (New Benin)',
    'Ward 05 (Uselu / UNIBEN)',
    'Ward 06 (Ogbelaka / Nekpenekpen)'
  ],

  // Delta LGAs
  'Warri South': [
    'Ward 01 (Main Market / GRA)',
    'Ward 02 (Okere Urhobo)',
    'Ward 03 (Edjeba / NPA)',
    'Ward 04 (Ugborikoko / Pessu)',
    'Ward 05 (Bowen / Odion)'
  ],
  'Oshimili South (Asaba)': [
    'Ward 01 (Asaba Central / Cable Point)',
    'Ward 02 (Umuagu)',
    'Ward 03 (West End / GRA)',
    'Ward 04 (Oko)',
    'Ward 05 (Okpanam)'
  ],

  // Katsina LGAs
  'Katsina Municipal': [
    'Ward 01 (Wakilin Gabas 1)',
    'Ward 02 (Wakilin Gabas 2)',
    'Ward 03 (Wakilin Yamma 1)',
    'Ward 04 (Wakilin Yamma 2)',
    'Ward 05 (Kofar Kaura / GRA)'
  ],

  // Borno LGAs
  'Maiduguri Municipal': [
    'Ward 01 (Shehuri North)',
    'Ward 02 (Shehuri South)',
    'Ward 03 (Maisandari)',
    'Ward 04 (Lamisula / Jabarmari)',
    'Ward 05 (Bulabulin / Gwange)'
  ],

  // Kwara LGAs
  'Ilorin West': [
    'Ward 01 (Adewole / GRA)',
    'Ward 02 (Ajikobi)',
    'Ward 03 (Badari)',
    'Ward 04 (Oloje)',
    'Ward 05 (Wara / Osin / Egbejila)'
  ],

  // Plateau LGAs
  'Jos North': [
    'Ward 01 (Ali Kazaure)',
    'Ward 02 (Gangare)',
    'Ward 03 (Jenta Adamu / Rock Haven)',
    'Ward 04 (Kabong)',
    'Ward 05 (Tudun Wada / GRA)'
  ],

  // Kogi LGAs
  'Lokoja': [
    'Ward 01 (Lokoja A / GRA)',
    'Ward 02 (Lokoja B / Market Area)',
    'Ward 03 (Kupa South)',
    'Ward 04 (Kupa North)',
    'Ward 05 (Oworo)'
  ],

  // Nasarawa LGAs
  'Lafia': [
    'Ward 01 (Lafia East)',
    'Ward 02 (Lafia Central / GRA)',
    'Ward 03 (Lafia North)',
    'Ward 04 (Gayam)',
    'Ward 05 (Kwandere)'
  ],

  // Benue LGAs
  'Makurdi': [
    'Ward 01 (Agan)',
    'Ward 02 (Ankpa / Wadata)',
    'Ward 03 (Fiidi)',
    'Ward 04 (Modern Market)',
    'Ward 05 (Wurukum / High Level)'
  ],

  // Akwa Ibom LGAs
  'Uyo': [
    'Ward 01 (Uyo Urban 1 / GRA)',
    'Ward 02 (Uyo Urban 2)',
    'Ward 03 (Uyo Urban 3)',
    'Ward 04 (Etoi)',
    'Ward 05 (Ikono)'
  ],

  // Cross River LGAs
  'Calabar Municipal': [
    'Ward 01 (Calabar Urban 1 / GRA)',
    'Ward 02 (Calabar Urban 2)',
    'Ward 03 (Calabar Urban 3)',
    'Ward 04 (Big Qua)',
    'Ward 05 (Akim)'
  ],

  // Ondo LGAs
  'Akure South': [
    'Ward 01 (Gbogi / Oba Adesida)',
    'Ward 02 (Ijomu)',
    'Ward 03 (Oja Oshodi)',
    'Ward 04 (Oke-Aro)',
    'Ward 05 (Alagbaka / GRA)'
  ],

  // Osun LGAs
  'Osogbo': [
    'Ward 01 (Oja Oba)',
    'Ward 02 (Oke-Fia / GRA)',
    'Ward 03 (Alekuwodo)',
    'Ward 04 (Sabongida)',
    'Ward 05 (Ayetoro / Igbona)'
  ],

  // Ekiti LGAs
  'Ado Ekiti': [
    'Ward 01 (Ake / Okesa)',
    'Ward 02 (Odo Ado)',
    'Ward 03 (Ejigbo)',
    'Ward 04 (Oke-Ila)',
    'Ward 05 (Basiri / GRA)'
  ],

  // Jigawa LGAs
  'Dutse': [
    'Ward 01 (Dutse Central)',
    'Ward 02 (Garu / Takur)',
    'Ward 03 (Kachi)',
    'Ward 04 (Kudai)',
    'Ward 05 (Madobi)'
  ],

  // Sokoto LGAs
  'Sokoto North': [
    'Ward 01 (Magajin Gari A)',
    'Ward 02 (Magajin Gari B)',
    'Ward 03 (Sarki Musulmi A)',
    'Ward 04 (Sarki Musulmi B)',
    'Ward 05 (Vaziri)'
  ],

  // Zamfara LGAs
  'Gusau': [
    'Ward 01 (Gusau Central)',
    'Ward 02 (Galadima)',
    'Ward 03 (Mayana)',
    'Ward 04 (Sabon Gari / GRA)',
    'Ward 05 (Tudun Wada)'
  ],

  // Kebbi LGAs
  'Birnin Kebbi': [
    'Ward 01 (Birnin Kebbi Central)',
    'Ward 02 (Dangaladima)',
    'Ward 03 (Marafa)',
    'Ward 04 (Gwadangaji)',
    'Ward 05 (Nassarawa)'
  ],

  // Yobe LGAs
  'Damaturu': [
    'Ward 01 (Damaturu Central)',
    'Ward 02 (Bindigari)',
    'Ward 03 (Nayi Nawa)',
    'Ward 04 (Maisandari)',
    'Ward 05 (Pompomari)'
  ],

  // Adamawa LGAs
  'Yola North': [
    'Ward 01 (Jimeta Central)',
    'Ward 02 (Demsawo)',
    'Ward 03 (Gwadabawa)',
    'Ward 04 (Luggere)',
    'Ward 05 (Yelwa)'
  ],

  // Gombe LGAs
  'Gombe Municipal': [
    'Ward 01 (Gombe Central)',
    'Ward 02 (Herwagana)',
    'Ward 03 (Jekadafari)',
    'Ward 04 (Pantami)',
    'Ward 05 (Bolari)'
  ],

  // Bauchi LGAs
  'Bauchi Municipal': [
    'Ward 01 (Bauchi Central)',
    'Ward 02 (Dawaki)',
    'Ward 03 (Daniya)',
    'Ward 04 (Hardalawa)',
    'Ward 05 (Zango)'
  ],

  // Taraba LGAs
  'Jalingo': [
    'Ward 01 (Jalingo Central)',
    'Ward 02 (Baraye)',
    'Ward 03 (Kona)',
    'Ward 04 (Majidadi)',
    'Ward 05 (Turaki)'
  ],

  // Imo LGAs
  'Owerri Municipal': [
    'Ward 01 (Azuzi 1 / GRA)',
    'Ward 02 (Azuzi 2)',
    'Ward 03 (Ikenegbu)',
    'Ward 04 (Gra Phase 1 & 2)',
    'Ward 05 (Aladinma)'
  ],

  // Abia LGAs
  'Umuahia North': [
    'Ward 01 (Umuahia Urban 1 / GRA)',
    'Ward 02 (Umuahia Urban 2)',
    'Ward 03 (Umuahia Urban 3)',
    'Ward 04 (Ibeku East)',
    'Ward 05 (Ibeku West)'
  ],

  // Ebonyi LGAs
  'Abakaliki': [
    'Ward 01 (Abakaliki Urban 1)',
    'Ward 02 (Abakaliki Urban 2)',
    'Ward 03 (Azunyaba)',
    'Ward 04 (Izzi Unuhu)',
    'Ward 05 (Nkaleke)'
  ],

  // Bayelsa LGAs
  'Yenagoa': [
    'Ward 01 (Yenagoa Central / Swali)',
    'Ward 02 (Amarata / Ekeki)',
    'Ward 03 (Ovom / Onopa)',
    'Ward 04 (Kpansia / Yenizue-Epie)',
    'Ward 05 (Okutukutu / Obele)'
  ]
};

export const getWardsForLga = (lgaName: string): string[] => {
  if (!lgaName) {
    return [
      'Ward 01 (Central)',
      'Ward 02 (North)',
      'Ward 03 (South)',
      'Ward 04 (East)',
      'Ward 05 (West)'
    ];
  }
  
  if (SAMPLE_WARDS_BY_LGA[lgaName]) {
    return SAMPLE_WARDS_BY_LGA[lgaName];
  }

  // Fallback: Generate standard electoral wards dynamically for any LGA
  return [
    `${lgaName} - Ward 01 (Central)`,
    `${lgaName} - Ward 02 (North)`,
    `${lgaName} - Ward 03 (South)`,
    `${lgaName} - Ward 04 (East)`,
    `${lgaName} - Ward 05 (West)`,
    `${lgaName} - Ward 06 (Township)`,
    `${lgaName} - Ward 07 (Commercial)`,
    `${lgaName} - Ward 08 (GRA)`,
    `${lgaName} - Ward 09 (Market)`,
    `${lgaName} - Ward 10 (Residential)`
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
  'Ward 02 (Garki)': [
    'PU 001 - Garki Model Primary School, Area 11',
    'PU 002 - Area 1 Primary School',
    'PU 003 - Garki Village Square',
    'PU 004 - Area 8 Open Space'
  ],
  'Ward 03 (Wuse)': [
    'PU 001 - Government Secondary School Wuse Zone 3',
    'PU 002 - Wuse Zone 6 Primary School',
    'PU 003 - Wuse Market Open Space',
    'PU 004 - Zone 2 Community Field'
  ]
};

export const getPollingUnitsForWard = (wardName: string, lgaName?: string): string[] => {
  if (!wardName) {
    return [
      'PU 001 - Community Primary School',
      'PU 002 - Local Govt Hall / Square',
      'PU 003 - Health Centre Open Space',
      'PU 004 - Market Square Center',
      'PU 005 - Civic Centre Open Field'
    ];
  }

  if (SAMPLE_POLLING_UNITS_BY_WARD[wardName]) {
    return SAMPLE_POLLING_UNITS_BY_WARD[wardName];
  }

  // Extract clean label without brackets if any
  const cleanWard = wardName.split('(')[0].trim() || wardName;

  if (SAMPLE_POLLING_UNITS_BY_WARD[cleanWard]) {
    return SAMPLE_POLLING_UNITS_BY_WARD[cleanWard];
  }

  // Dynamic fallback generation based on Ward name
  return [
    `PU 001 - ${cleanWard} Primary School Gate`,
    `PU 002 - ${cleanWard} Community Hall / Civic Square`,
    `PU 003 - ${cleanWard} Central Market Open Space`,
    `PU 004 - ${cleanWard} Health Centre / Dispensary`,
    `PU 005 - ${cleanWard} Town Square Junction`,
    `PU 006 - ${cleanWard} Government Secondary School Field`,
    `PU 007 - ${cleanWard} Post Office / Library Open Field`
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
    state: 'Lagos',
    lga: 'Ikeja',
    address: 'INEC State Office, 6 Birrel Avenue, Yaba / Ikeja Secretariat, Lagos',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kano',
    lga: 'Kano Municipal',
    address: 'INEC State Headquarters, Hadejia Road, Kano',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Rivers',
    lga: 'Port Harcourt',
    address: 'INEC State Secretariat, Aba Road, Port Harcourt',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Oyo',
    lga: 'Ibadan North',
    address: 'INEC Oyo Office, Agodi Gate, Ibadan',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Kaduna',
    lga: 'Kaduna North',
    address: 'INEC Kaduna State Secretariat, Sokoto Road, Kaduna',
    phone: '09138886874',
    status: 'Main Office'
  },
  {
    state: 'Enugu',
    lga: 'Enugu North',
    address: 'INEC Enugu Office, Independence Layout, Enugu',
    phone: '09138886874',
    status: 'Main Office'
  }
];
