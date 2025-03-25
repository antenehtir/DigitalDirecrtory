document.addEventListener("DOMContentLoaded", function () {
  // Sample Facilities Data – add your full facility objects as needed.
  const facilities = [
    {
      id: 1,
      name: "Lancet General Hospital",
      facilityType: "general",
      specialty: "General Medicine",
      specialServices: "Dialysis, Nerve Conduction Study, EEG, EMG and Evoked Potential, Bronchoscopy and Spirometry",
      subCity: "bole",
      area: "24",
      location: "Near 24, Afarensis Building, Bole Sub-city",
      map: "https://maps.app.goo.gl/QWcejGM3CbdGbsqeA",
      contact: "9171 / 0977717171 / +251907177717",
      telegram: "https://t.me/lancethealthplc",
      website: "https://www.lancethealthservices.com/",
      email: "info@lancethealthservices.com",
      availability: "24/7"
    },
    {
      id: 2,
      name: "Silkroad General Hospital",
      facilityType: "general",
      specialty: "General Medicine",
      specialServices: "Densitometry, Bronchoscopy, Holter monitor, MRI, Ophthalmology service",
      subCity: "nifas silk-lafto",
      area: "sarbet",
      location: "Sarbet, opposite the Vatican embassy, Nifas Silk-Lafto Sub-City",
      map: "https://maps.app.goo.gl/r6afZySpnqYWVkis9",
      contact: "0936610666 / 0969044519 / 0903572361",
      telegram: "http://t.me/silkroadhospital",
      website: "https://www.silkroadhospitaladdis.com/",
      email: "silkroadhospital@afeiholding.com",
      availability: "24/7"
    },
    {
    id: 3,
    name: "Hallelujah General Hospital",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Dialysis, Sleep study, Spirometry, Chemotherapy, Bronchoscopy, MRI, Ophthalmology service",
    subCity: "kirkos",
    area: "",
    location: "Gotera Condominium, Kirkos Sub-City",
    map: "https://maps.app.goo.gl/twJuDtsdGckY2iNq7?g_st=ic",
    contact: "9975 / 0945211206 / 0965407886 / 0114704241",
    telegram: "https://t.me/hallelujah_GHospital",
    website: "",
    email: "info@hallelujahhospital.com",
    availability: "24/7"
  },
  {
    id: 4,
    name: "Ethio-Istanbul General Hospital",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Cardiac Intervention, Dialysis, Epiduroscopy",
    subCity: "bole",
    area: "bole homes",
    location: "Bole homes, Bole Sub-City",
    map: "https://maps.app.goo.gl/8zTUJzBzKfxo3ZrT6?g_st=ic",
    contact: "0962212223 / 0965212223",
    telegram: "https://t.me/ethioistanbulgeneralhospital",
    website: "https://ethioistanbulgeneralhospital.com/",
    email: "info@ethioIstanbulgeneralhospital.com",
    availability: "24/7"
  },
  {
    id: 5,
    name: "Amin General Hospital",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Chemotherapy, paediatric oncology, EEG",
    subCity: "lideta",
    area: "abenet",
    location: "Abenet, near coca cola factory, Lideta Sub-City",
    map: "https://maps.app.goo.gl/crsjxhMsju1cdc9V8",
    contact: "8080 / 0947101010",
    telegram: "https://t.me/amingeneralhospital2012",
    website: "http://www.amingeneralhospital.com",
    email: "amingeneralhospital2012@gmail.com",
    availability: "24/7"
  },
 {
    id: 6,
    name: "GIRUM HOSPITAL",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Dialysis, HSG scan, Barium studies, IVP, Spirometry",
    subCity: "Addis Ketema",
    area: "Medhanialem roundabout",
    location: "Addis Ketema Around Medhanialem roundabout, Addis Ketema Sub-City",
    map: "https://maps.app.goo.gl/FYBy4S7YoshRMP197?g_st=it",
    contact: "6722 / 0913557076 / 0112757676",
    telegram: "https://t.me/GirumGeneralHospital",
    website: "https://girum-hospital.com/",
    email: "info@girumhospital.com.et",
    availability: "24/7"
  },
 {
    id: 7,
    name: "Meqrez General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "rehabilitation center",
    subCity: "Kirkos",
    area: "Kazanchis",
    location: "Kazanchis, Kirkos sub-city",
    map: "https://maps.app.goo.gl/WzYWr7NJ5rxF8N5c8",
    contact: "0952272727 / 0921636465 / 6757",
    telegram: "https://t.me/MeQrezHealth",
    website: "https://generalhospital.meqrezhealth.com/",
    email: "",
    availability: "24/7"
  },
 {
    id: 8,
    name: "St. Gabriel General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "IVP, HSG, CUG, EEG , Laparoscopic surgery , Dialysis",
    subCity: "Bole",
    area: "Haya Hulet",
    location: "Haya Hulet around the road to Bole Medhanialem , Bole Sub-City",
    map: "https://maps.app.goo.gl/WvNFZdSYTUpsSVUS8",
    contact: "8819 / +251911124501 / +251116187352/ +251116187345",
    telegram: "",
    website: "https://saintgabrielgeneralhospitalplc.com/",
    email: "",
    availability: "24/7"
  },
 {
    id: 9,
    name: "Addis Hiwot General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Dialysis, MRI, ART, TB treatment center",
    subCity: "Bole",
    area: "Haya hulet",
    location: "Haya hulet area, Bole Sub-City",
    map: "http://maps.app.goo.gl/n12MA3SgsV8bv2MHA",
    contact: "7560 / 0923280828 / +251116180449",
    telegram: "https://t.me/AHGH22",
    website: "https://addishiwotgeneralhospital.com/",
    email: "info@addishiwothospital.com",
    availability: "24/7"
  },
 {
    id: 10,
    name: "MCM Comprehensive Specialized Hospital/ Korea Hospital Specialty",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Burn unit, Chemotherapy, Dialysis, MRI, ERCP, EEG",
    subCity: "Bole",
    area: "Gerji",
    location: "Gerji, Bole Sub-City",
    map: "https://maps.app.goo.gl/PBjAeM7JbdHq36BRA",
    contact: "+251929675507 / +251116295422 / +251116294602",
    telegram: "",
    website: "https://www.mcmkoreanhospital.org/",
    email: "contactmcmhospital@gmail.com",
    availability: "24/7"
  },
 {
    id: 11,
    name: "Hayat Hospital",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "",
    subCity: "Bole",
    area: "Bole",
    location: "Bole infront of moenco, Bole Sub-City ",
    map: "https://maps.app.goo.gl/N1WatNf41TFoTycK6",
    contact: "+251909464646",
    telegram: "https://t.me/hayathospitalmc",
    website: "",
    email: "",
    availability: "24/7"
  },
 {
    id: 12,
    name: "Bethzatha General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Dialysis unit, Ophthalmology Unit, Advanced lab",
    subCity: "Kirkos",
    area: "Addis Ababa Stadium",
    location: "Next to Addis Ababa Stadium, Kirkos Sub-City",
    map: "https://maps.app.goo.gl/1dEEm94BYWuUUhMu9?g_st=atm",
    contact: "7477 / 0902925592",
    telegram: "https://t.me/bethzathaheathservices",
    website: "https://bethzatha.com/",
    email: "info@bethzatha.com",
    availability: "24/7"
  },
 {
    id: 13,
    name: "Careland General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "MRI (1.5 Tesla) , EEG, EMG , Holter monitor , Dialysis, Chemotherapy ",
    subCity: "Sheger City",
    area: "Furi",
    location: "Furi, 50m Away from NOC(Abageda) Square, Adjacent to GM furniture, Sheger City Sub-city",
    map: "https://maps.app.goo.gl/Nies9PnjrvkSnFw68",
    contact: "8699  / +251977868686 / +25111805252",
    telegram: "https://t.me/careland_general_hospital",
    website: "https://carelandgeneralhospital.com/",
    email: "info@carlandgeneralhospital.com",
    availability: "24/7"
  },
 {
    id: 14,
    name: "Legehar General Hospital",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "",
    subCity: "lideta",
    area: "lideta",
    location: "Lideta, Next to Lideta Church, Lideta Sub-City",
    map: "https://maps.app.goo.gl/T2aMc1yv67ryku1bA?g_st=ic",
    contact: "+251115579705 / +251118549219",
    telegram: "https://t.me/legehageneralhospital",
    website: "http://www.legeharhospital.com",
    email: "legeharhospitallab@gmail.com",
    availability: "24/7"
  },
 {
    id: 15,
    name: "Teklehaimanot General Hospital ",
    facilityType: "general",
    specialty: "General Medicine",
    specialServices: "Dialysis, Fibrotouch scan , Spirometry",
    subCity: "Arada",
    area: "Sumale tera",
    location: "Sumale tera, Arada Sub-City",
    map: "https://maps.app.goo.gl/Fz2URwKEksw9m5jx8",
    contact: "8175/ 0940333333/ 0111561114",
    telegram: "https://t.me/Teklehaimanothospital1",
    website: "https://www.teklehaimnothospital.com",
    email: "info@teklehaimanothospital.com",
    availability: "24/7"
 },
{
  id: 16,
  name: "Kadisco General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "Rheumatology, ophthalmology, dental health care, sports medicine, Dialisis",
  subCity: "bole",
  area: "Gerji ", 
  location: "Gerji road, Roba, Bole Sub-city",
  map: "https://maps.app.goo.gl/rspP2atqDHv9ZQiz6",
  contact: "8825 / 0930901606 / +251116298902/03/04",
  telegram: "https://t.me/kadiscogeneralhospital",
  website: "https://kadiscohospital.com/",
  email: "kgh@kadcogroup.com",
  availability: "24/7"
},
{
  id: 17,
  name: "iCMC General Hospital (International Cardiovascular and Medical Center)",
  facilityType: "general",
  specialty: "General Medicine including cardiology",
  specialServices: "Cardiac intervention, Cath lab, Dialysis, Acupuncture, Gynaecologic oncology",
  subCity: "lemi kura",
  area: "CMC",
  location: "CMC roundabout behind Tsehay real estate, Lemi kura sub-city",
  map: "https://maps.app.goo.gl/jJ89axuwcpPHfWTg9?g_st=ic",
  contact: "9207 / 0116678646/ 0949020202",
  telegram: "https://t.me/icmcgeneralhospital",
  website: "http://www.icmc.com.et/",
  email: "info@icmc.com.et",
  availability: "24/7"
},
{
  id: 18,
  name: "Landmark General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "Chemotherapy, Cardiac intervention",
  subCity: "kirkos",
  area: "Genet Hotel", 
  location: "Down the road from the Mexico square to Kerra, Around Genet Hotel. Kirkos Sub-City",
  map: "https://maps.app.goo.gl/XR8A8MhoUZ3qqX1r6",
  contact: "0115525719 / 0115525463",
  telegram: "https://t.me/landmarkgeneralhospital",
  website: "https://landmarkhospital.et/",
  email: "contact@landmarkhospital.et",
  availability: "24/7"
},
{
  id: 19,
  name: "Afran General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "",
  subCity: "kolfe",
  area: "Ayertena",
  location: "Around Ayertena roundabout, Kolfe Sub-City",
  map: "https://maps.app.goo.gl/18v7ETaus2dt9Gqe9",
  contact: "6445 / +251966693626",
  telegram: "https://t.me/afran_general_hospital",
  website: "https://afranhospital.com/",
  email: "info@afranhospital.com",
  availability: "24/7"
},
{
  id: 20,
  name: "Yerer General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "Dialysis, MRI",
  subCity: "lemi kura",
  area: "Goro",
  location: "Goro round about, Lemi kura Sub-city",
  map: "https://maps.app.goo.gl/QDrq75vv1DTi77JJA?g_st=atm",
  contact: "0930060708 / 0930050607/ 0930040506",
  telegram: "https://t.me/yererhospital",
  website: "",
  email: "yererhospital2014@gmail.com",
  availability: "24/7"
},
{
  id: 21,
  name: "Yanet General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "Dialysis, Dental and ophthalmology service",
  subCity: "lemi kura",
  area: "Ayat",
  location: "Ayat Derartu Tulu Square, Lemi kura Sub-City",
  map: "https://maps.app.goo.gl/72NeYqZYrVG6iFfA7?g_st=atm",
  contact: "0903777755 / 0944447755",
  telegram: "https://t.me/yanetinternalmedicineaddisababa",
  website: "yanetmedicaladdis.com",
  email: "info@yanetmedicaladdis.com",
  availability: "24/7"
},
{
  id: 22,
  name: "Ethio TEBIB General Hospital",
  facilityType: "general",
  specialty: "General Medicine",
  specialServices: "Helipad, MRI, Ophtalmology and Dental service, EEG, EMG",
  subCity: "kolfe",
  area: "Sefere selam",
  location: "Sefere selam on the road to kolfe, Kolfe Sub-city",
  map: "https://maps.app.goo.gl/bXwVH7gR172cZTzr9?g_st=atm",
  contact: "9000 / 0935402078",
  telegram: "https://t.me/EthioTebibHospital",
  website: "ethiotebibhospital.org",
  email: "info@ethiotebibhospital.org",
  availability: "24/7"
},
{
      id: 23,
      name: "American Medical Center",
      facilityType: "speciality",
      specialty: "Internal Medicine (Gastroenterology, Cardiology, Infectious disease, Endocrinology, Haematology), and Paediatrics, Consultation (Nutritional, Psychiatry, Travel Medicine)",
      specialtyCategory: "multi speciality",
      specialServices: "Vaccination Service for travelers and children, Sleep study (PSG), Certified US and UK embassy visa medical clearance, Stress ECG, Holter Monitor, ABPM, Paediatric and adult Echo, Spirometry, Advanced Laboratory Service, Comprehensive General check-up package, Adult ICU",
      subCity: "lemi kura",
      area: ["sunshine real estate meri lokie"],
      location: "CMC inside sunshine real estate compound (Meri lokie), Lemi kura sub-city",
      map: "https://maps.app.goo.gl/pkWy8XdWjSMeK9Xt9",
      contact: "8551 / +251949648401 / +251116678004/ +251116678020",
      telegram: "https://t.me/AmericanMedicalCenterEthiopia",
      website: "http://www.amcethiopia.com/",
      email: "ethiopiaamc@gmail.com",
      availability: "24/7"
},
{    
	id: 24,
      name: "Hemen MCH Center",
      facilityType: "speciality",
      specialty: "Obstetrics, Gynecology, Pediatrics",
  specialServices: "Surfactant Administration at NICU, ENT",
      specialtyCategory: "mch",
      subCity: "arada",
      area: ["Arat Kilo","4 kilo"],
      location: "Arat Kilo, Behind Tourist Hotel, Arada Sub-City",
      map: "https://maps.app.goo.gl/ndjDmqb4czDJTmmJ8",
      contact: "0931225366 / 0919484405",
      telegram: "https://maps.app.goo.gl/ndjDmqb4czDJTmmJ8",
      website: "https://www.hemenmch.com/",
      email: "hemenmhc@gmail.com",
      availability: "24/7"
    },
    {
      id: 25,
      name: "Samaritan Surgical Center",
      facilityType: "speciality",
      specialty: "Comprehensive Surgical service, ENT",
specialServices: "Laparoscopic Surgery, Plastic and reconstructive surgery, Dialysis",
      specialtyCategory: "surgical center",
      subCity: "lemi kura",
      area: "Sunshine real estate meri lokie",
      location: "CMC inside sunshine real estate, Lemi kura sub-city",
      map: "https://maps.app.goo.gl/Wg8TV3dvruZxRFZj8",
      contact: "+251116680003 / +251944444801 / 0944444800",
      telegram: "https://t.me/samaritansscethiopia",
      website: "https://www.samaritansc.com/",
      email: "Samaritanscc@gmail.com",
      availability: "24/7"
    },
    {
  id: 26,
  name: "Happy Children’s Speciality Clinic",
  facilityType: "speciality",
  specialty: "General Paediatrics",
  specialServices: "",
specialtyCategory: "pediatric",
  subCity: "bole",
  area: "Ayat",
  location: "Ayat, on the road to Arabsa, Bole Sub-City",
  map: "https://maps.app.goo.gl/HNbYXySaa6CCzc9m7?g_st=ic",
  contact: "+251941627472 / +251932594604",
  telegram: "",
  website: "",
  email: "dusmoha20@gmail.com",
  availability: "Monday to Friday 9:00AM-7:00PM , Saturdays and Sundays->9:00 AM – 5:00 PM"
},
{
  id: 27,
  name: "Apex Indian Surgical and Internal Medicine Speciality Center",
  facilityType: "speciality",
  specialty: "General Surgery, Craniofacial Surgery, Internal Medicine, ICU",
  specialServices: "Neuro and spinal surgery, plastic and reconstructive surgery, Dentistry, Dermatology and Oncology", 
specialtyCategory: "multi speciality",
  subCity: "lemi kura",
  area: "feyel bet",
  location: "Summit, Feyel bet in front of Federal High Court, Lemi kura sub-city",
  map: "https://maps.app.goo.gl/3GJSrgik3WxrDkTx9?g_st=ic",
  contact: "+251949001133 / +251935101018 / +251116680403",
  telegram: "https://t.me/apexhospitalsplc",
  website: "http://www.apexindianhospital.com/",
  email: "info@apexindianhospital.com",
  availability: "24/7"
},
{
  id: 28,
  name: "Care MCH Center",
  facilityType: "speciality",
  specialty: "Paediatric, Gynaecology and Obstetrics",
  specialServices: "",
specialtyCategory: "mch",
  subCity: "nifas silk-lafto",
  area: "jemo",
  location: "Jemo micael in front of Ambessa Garage, Nifas Silk-Lafto Sub-City",
  map: "https://g.co/kgs/H8HhxVX",
  contact: "+251118838064 / 0911310134",
  telegram: "",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 29,
  name: "Redat Healthcare",
  facilityType: "speciality",
  specialty: "Internist, Orthopaedics, Paediatrics, Physiotherapy, Homecare service, Imaging, Ambulance service",
  specialServices: "Nerve conduction test, Teleradiograph",
specialtyCategory: "multi speciality",
  subCity: "bole",
  area: "bole alem cinema",
  location: "Bole Alem cinema, Bole Sub-City",
  map: "https://maps.app.goo.gl/p6CrJRihbLWPg7Jk7",
  contact: "9477 / 0909289285 / 0964404843",
  telegram: "",
  website: "http://www.redat-et.com",
  email: "contact@redat-et.com",
  availability: "24/7"
},
{
  id: 30,
  name: "Medstar Speciality Clinic",
  facilityType: "speciality",
  specialty: "Internal medicine, Surgery, Gyni-Obs, Dermatology, Psychiatry, ENT",
  specialServices: "Barium study, IVP, CUG, HSG, EEG, EMG, Pulmonary function test",
specialtyCategory: "multi speciality",
  subCity: "bole",
  area: "haya hulet",
  location: "Haya hulet in front of Water and Irrigation Ministry, Bole Sub-city",
  map: "https://maps.app.goo.gl/WVK9WefQdeY7bSh89?g_st=atm",
  contact: "+251920807650 / +251975704070",
  telegram: "",
  website: "https://medstarspecialityclinic.com/",
  email: "info@medstarspecialityclinic.com",
  availability: "24/7"
},
{
  id: 31,
  name: "Bloom Children’s Speciality Clinic (Dr. Selamawit Asmelash)",
  facilityType: "speciality",
  specialty: "Comprehensive pediatric care",
  specialServices: "",
specialtyCategory: "pediatric",
  subCity: "bole",
  area: "Fiyel bet",
  location: "On the road from Summit to Ayat, One Kilometer from Fiyel Bet, Bole Sub-City",
  map: "https://maps.app.goo.gl/NZEUNyN5DECNgydY8?g_st=ic",
  contact: "+251945420550",
  telegram: "",
  website: "",
  email: "",
  availability: "Monday to Saturday-> 8:00AM-6:30PM, Sunday-> 8:00AM-12:00PM"
},
{
  id: 32,
  name: "Dr. Shemse MCH Center",
  facilityType: "speciality",
  specialty: "Comprehensive pediatric, Gynaecology and Obstetric service",
  specialServices: "",
specialtyCategory: "mch",
  subCity: "kolfe",
  area: "torhayloch",
  location: "Torhayloch, behind the Swiss Embassy, Kolfe Sub-City",
  map: "https://maps.app.goo.gl/p3VrEDR42NBrdGCA6?g_st=ic",
  contact: "+251118689192 / +251911403089",
  telegram: "",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 33,
  name: "Trust Internal Medicine and Gastroenterology Speciality Clinic",
  facilityType: "speciality",
  specialty: "Internal Medicine and Gastroenterology Speciality Clinic",
  specialServices: "",
specialtyCategory: "multi speciality",
  subCity: "gulele",
  area: "gulele",
  location: "In front of St. Paul’s Hospital Renal Transplant Center, Gulele Sub-City",
  map: "https://maps.app.goo.gl/tTbn8Acuf2TdwSEe9?g_st=atm",
  contact: "+251987000888 / +251987000999",
  telegram: "https://t.me/trustClinicEthiopia",
  website: "",
  email: "trust.gastrology@gmail.com",
  availability: "Monday to Friday->8:00AM-6:00PM, Saturday->8:00AM-5:00PM"
},
{
  id: 34,
  name: "ACL ENT and Medical Center",
  facilityType: "speciality",
  specialty: "Internal medicine, Paediatric, Surgery, Dermatology, Dental and ENT",
  specialServices: "Dialysis, VPT foot exam, Spirometry, Tympanometry, PTA",
specialtyCategory: "multi speciality",
  subCity: "yeka",
  area: "kebena",
  location: "Minilik Hospital area, Kebena Roundabout, TK Building, Yeka Sub-City",
  map: "https://maps.app.goo.gl/1r6MJNhYJogaURRYA?g_st=atm",
  contact: "0986000007 / 0929651110 / +251118111293",
  telegram: "https://t.me/aclspecialitycenter",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 35,
  name: "Mestawot MCH Center",
  facilityType: "speciality",
  specialty: "Obstetrics, Gynaecology and Paediatrics care service",
  specialServices: "",
specialtyCategory: "mch",
  subCity: "nifas silk-lafto",
  area: "jemo",
  location: "On the road from Jemo Michael to Jemo 01, around 500 meters from the traffic light, Nifas Silk-Lafto Sub-City",
  map: "https://maps.app.goo.gl/MgraKtyAHKQNoarj9?g_st=ic",
  contact: "+251922266737 / +251911684861",
  telegram: "",
  website: "https://mestawotmchcenter.com/",
  email: "info@mestawotmchcenter.com",
  availability: "24/7"
},
{
  id: 36,
  name: "Birhaneselam Internal Medicine Speciality Clinic",
  facilityType: "speciality",
  specialty: "Internal medicine services",
  specialServices: "",
specialtyCategory: "internal medicine",
  subCity: "nifas silk-lafto",
  area: "gofa",
  location: "Gofa Sefer, 50 meters from Meseret Building, Nifas Silk-Lafto Sub-City",
  map: "https://maps.app.goo.gl/9YzJ575q7sdYHLdT8?g_st=ic",
  contact: "+251911226731 / +251911060742",
  telegram: "https://t.me/birhaneselamclinic",
  website: "",
  email: "",
  availability: ""
},
{
  id: 37,
  name: "Tazma Medical and Surgical Specialized Center",
  facilityType: "speciality",
  specialty: "Internal medicine, Surgery, Paediatrics",
  specialServices: "Cardiac Intervention, Dialysis, Spirometry",
specialtyCategory: "multi speciality",
  subCity: "kirkos",
  area: "gotera condominium",
  location: "Gotera Condominium, Kirkos sub-city",
  map: "https://maps.app.goo.gl/J9WqwKkh1A8HWpuH6",
  contact: "9893 / +251954886225 / +25111416333",
  telegram: "https://t.me/+VNtzuALu-P-LR4yO",
  website: "https://tazma.org/",
  email: "tazmamedical@gmail.com",
  availability: "24/7"
},
{
  id: 38,
  name: "Gesund Cardiac and Medical Center",
  facilityType: "speciality",
  specialty: "Internal medicine (Cardiology, Gastroenterology, Endocrinology, Pulmonology), Comprehensive Cardiology service",
  specialServices: "Cardiac Intervention, Trans Oesophageal ECHO, Coronary Angiography, Holter monitor, ABPM",
specialtyCategory: "cardiac",
  subCity: "lemi kura",
  area: "cmc michael",
  location: "CMC Michael area, Lemi Kura Sub-City",
  map: "https://maps.app.goo.gl/9U45Uwb3nTR1cQHt6",
  contact: "9537 / +251116676269 / +251994000095",
  telegram: "",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 39,
  name: "Hope Oncology Center",
  facilityType: "speciality",
  specialty: "Clinical Oncology, Paediatric Oncology",
  specialServices: "Chemotherapy",
specialtyCategory: "oncology",
  subCity: "kolfe",
  area: "torhayloch",
  location: "Torhayloch Infront of Ibrahim building, Kolfe Sub-city",
  map: "https://maps.app.goo.gl/waSqZnnuyZQyq2pb9",
  contact: "0916363738 / 0936161718 / 011 557 2896",
  telegram: "https://t.me/+-RL_xvc-k9k1Mjhk",
  website: "https://hope-oncology.com/",
  email: "info@hope-oncology.com",
  availability: "24/7"
},
{
  id: 40,
  name: "Nordic Medical Centre",
  facilityType: "speciality",
  specialty: "Paediatric and Internal Medicine services, Specialist Consultations (Surgery, Gyni-Obs, Radiology, and Psychiatry)",
  specialServices: "Burn unit, Travel Vaccinations",
specialtyCategory: "multi speciality",
  subCity: "bole",
  area: "bole rwanda",
  location: "Bole Rwanda, Bole Sub-City",
  map: "https://maps.app.goo.gl/vDUetww6uhkAc1sq6?g_st=ic",
  contact: "+251929105653 / 8901",
  telegram: "",
  website: "https://www.nordicmedicalcentre.com/",
  email: "reception@nordicmedicalcentre.com",
  availability: "24/7"
},
{
  id: 41,
  name: "Adera Medical and Surgical Center",
  facilityType: "speciality",
  specialty: "Internal Medicine and Surgical Care",
  specialServices: "Adult ICU, ART and TB clinic, Endoscopy, Colonoscopy, ERCP",
specialtyCategory: "multi speciality",
  subCity: "bole",
  area: "bole",
  location: "Bole Road, behind Flamingo Restaurant, Bole Sub-City",
  map: "https://maps.app.goo.gl/V91yiE6Sgko7Gckj8?g_st=ic",
  contact: "+251115575856 / 8635",
  telegram: "https://t.me/AderaMedicalCenterPLC",
  website: "https://aderamedicalcenter.com/",
  email: "customerservice@aderamedicalcenter.com",
  availability: "24/7"
},
{
  id: 42,
  name: "Danu Orthopaedic Center",
  facilityType: "speciality",
  specialty: "General Orthopaedics",
  specialServices: "",
specialtyCategory: "orthopedic",
  subCity: "arada",
  area: "general wingate street",
  location: "General Wingate Street, Arada Sub-City",
  map: "https://g.co/kgs/xJvV4eRv",
  contact: "+251111119266",
  telegram: "",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 43,
  name: "Washington Medical Centre",
  facilityType: "speciality",
  specialty: "Surgery, Internal Medicine, Gyni-Obs, Paediatrics, Emergency Medicine, Consultation on Dermatovenerology, ENT",
  specialServices: "Laparoscopic Surgery, Dialysis, MRI (1.5tesla) Bole Rwanda branch-, Full-time ambulance service",
  specialtyCategory: "multi speciality",
  subCity: "bole",
  area: ["bole rwanda", "bole bulbula"],
  location: [
    "Branch 1: Bole opposite Rwandan Embassy, Bole Sub-City",
    "Branch 2: Bole bulbula, Bole Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/hNh24BYMTbz6mNpF9",
    "https://g.co/kgs/kBvGwFZ"
  ],
  contact: "6511 / +251939515151",
  telegram: "https://t.me/Washingtonmedical",
  website: "https://washhealthcare.com/",
  email: "wmc@wmcethiopia.com",
  availability: "24/7 for non-consultation cases"
},
{
  id: 44,
  name: "Lancet Beherawi Specialized Medical and Surgical Center",
  facilityType: "speciality",
  specialty: "General Internal Medicine and General Surgery, Consultation on Gyn-Obs",
  specialServices: "Dental, ENT, Rheumatologist consultation, Laparoscopic surgery, Adult ICU",
  specialtyCategory: "multi speciality",
  subCity: "lideta",
  area: "goma kuteba",
  location: "Goma Kuteba, Next to the Ministry of Health, Lideta sub-city",
  map: "https://g.co/kgs/mt6nRbe",
  contact: "9905 / +251-907177717 / 0115576329",
  telegram: "https://t.me/lancetbeherawi",
  website: "",
  email: "annexlancethealth@gmail.com",
  availability: "24/7"
},
{
  id: 45,
  name: "Dream Orthopaedics, Trauma, and Spine Center",
  facilityType: "speciality",
  specialty: "General Orthopaedic Surgery, Sports Medicine and Arthroscopy, Spinal Surgery, Orthopedic Oncology",
  specialServices: "",
  specialtyCategory: "orthopedic",
  subCity: "kirkos",
  area: "sarbet",
  location: "On the way from Mexico to Sar bet in front of African Union",
  map: "https://maps.app.goo.gl/m5FUtBxBUPSrFfev7?g_st=ic",
  contact: "+251115500079 / +251946904290 / +251115500066",
  telegram: "https://t.me/DreamOrtho",
  website: "https://www.dreamorthospine.com/",
  email: "liyanadream06@gmail.com",
  availability: "24/7"
},
{
  id: 46,
  name: "Yehuleshet Specialty Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive Neurologic Care, Internal medicine, Gyn-obs", 
  specialServices: "NCS, EEG, EMG",
  specialtyCategory: "multi speciality",
  subCity: ["lideta", "arada"],
  area: ["lideta", "tewodros square"],
  location:[
    "Branch 1: lideta behind balcha hospital, Lideta Sub-City",
    "Branch 2: Around tewodros square, Arada Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/Pjz8yVtJ9b9sKoQE9?g_st=atm",
    "https://maps.app.goo.gl/P1dJJXF5RDptEc5c6?g_st=atm"
  ],
  contact: "093010050 / +251115508550",
  telegram: "",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 47,
  name: "Lancet Women and Children Hospital",
  facilityType: "speciality",
  specialty: "Comprehensive Paediatric, Gynaecology-Obstetrics and surgical service, consultations on ENT, Dermatovenerology",
  specialServices: "ICU, NICU, Paediatric Echocardiography, Paediatric Endocrinology, Pulmonary, Nephrology, Surgery and Neurology, Dialysis",
  specialtyCategory: "MCH",
  subCity: "bole",
  area: "signal",
  location: "Signal to 22 Road 200 m from the flyover bridge next to Blue Cave Hotel, Bole sub-city",
  map: "https://maps.google.com/?cid=17345188147198467565&entry=gps",
  contact: "+251946888883 / 0115532760",
  telegram: "https://t.me/LANCETMCH",
  website: "",
  email: "",
  availability: "24/7"
},
{
  id: 48,
  name: "Heal Venture Medical and Surgical Center",
  facilityType: "speciality",
  specialty: "Comprehensive Internal Medicine and Surgical service, ENT",
  specialServices: "Neurology, Oncology, Gastroenterology, Colorectal Surgery, Neuro-Spine Surgery, Sports and Arthroscopic Speciality Care, Breast and Endocrine Sub-Speciality Care, Pediatric Surgery",
  specialtyCategory: "multi speciality",
  subCity: "bole",
  area: "lem hotel",
  location: "By the end of the road that takes from Lem Hotel to 24, 50 meters along the first turn, Bole Sub-City",
  map: "https://maps.app.goo.gl/1j52DhHCnxQ2bwgm6?g_st=i",
  contact: "+251926454647 / +251925424344",
  telegram: "https://t.me/healventuremedical",
  website: "",
  email: "healventuremedical@gmail.com",
  availability: "24/7"
},
{
  id: 49,
  name: "SUISSE CLINIC",
  facilityType: "speciality",
  specialty: "Comprehensive Paediatric Care and Emergency Adult Care",
  specialServices: "Paediatric and Travel Vaccine Service, Travel Medicine Consultations",
  specialtyCategory: "pediatric",
  subCity: "kirkos",
  area: "kera",
  location: "Kera to Cherkos road, Kirkos sub-city",
  map: "https://maps.google.com/?cid=13073661226497916180&entry=gps&g_st=atm",
  contact: "0921 787120 / 011 4161649",
  telegram: "",
  website: "https://suisseclinic.com/",
  email: "info@suisseclinic.com",
  availability: "Mon—Fri: 8:30 AM – 5:00 PM, Sat and Sun: 9:00 AM – 5:00 PM"
},
{
  id: 50,
  name: "Lebeza Psychiatry Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive psychiatry service (Substance Rehabilitation, Emergency Psychiatry Admission, Child and Adolescent Psychiatry, Psychological Counseling including Sexual Disorders)",
  specialServices: "Sleep Study",
  specialtyCategory: "psychiatry",
  subCity: "bole",
  area: "capital hotel",
  location: "On the road from St Urael Church to Capital Hotel, Behind the old Plaza Hotel, Bole Sub-City",
  map: "https://maps.app.goo.gl/uNAGwkLuAYycFVns8",
  contact: "0966111111 / +251116662966",
  telegram: "https://t.me/lebezapsychiatryspecialityclinic",
  website: "https://lebeza.org/",
  email: "",
  availability: "24/7"
},
{
  id: 51,
  name: "Sitota Center for Mental Health Care",
  facilityType: "speciality",
  specialty: "Comprehensive psychiatry service (Substance Rehabilitation, Emergency Psychiatry Admission, Child and Adolescent Psychiatry, Psychological Counseling including Sexual Disorders, Professional Psychotherapy)",
  specialServices: "ECT (Electroconvulsive Therapy), EEG, ART, Yoga and Music Therapy",
  specialtyCategory: "psychiatry",
  subCity: "kolfe",
  area: "total 3kuter mazoria",
  location: "Total 3kuter Mazoria around Omega School, Kolfe Sub-City",
  map: "https://maps.app.goo.gl/oFVRaZFvWNugLYfv8",
  contact: "8187 / 0995011035 / +251955346528",
  telegram: "https://t.me/sitotapsy",
  website: "https://sitotapsy.com/",
  email: "sitotapsych.info@gmail.com / yonasbaheretibeb@yahoo.com",
  availability: "24/7"
},
{
  id: 52,
  name: "LA VISTA Specialty Eye Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive Ophthalmology Service",
  specialServices: "",
  specialtyCategory: "eye center",
  subCity: "yeka",
  area: "gurd shola",
  location: "Gurd Shola, Mercy Plaza 3rd Floor, in front of Century Mall, Yeka Sub-City",
  map: "https://maps.app.goo.gl/c3hudALcfZgZf9U67?g_st=ic",
  contact: "0944000111 / +251944000111 / +251944000222",
  telegram: "",
  website: "https://lavistaeyeclinic.com",
  email: "info@lavistaeyeclinic.com",
  availability: "Monday to Friday 8:00 AM-5:00 PM, Saturday->8:30 AM – 12:00 PM"
},
{
  id: 53,
  name: "WGGA Eye Center",
  facilityType: "speciality",
  specialty: "Comprehensive Ophthalmology and Optometry Service",
  specialServices: "Paediatric Eye Care",
  specialtyCategory: "eye center",
  subCity: "kirkos",
  area: "wello sefer",
  location: "On the road from Wollo Sefer to Gotera, WGGA Building, Kirkos Sub-City",
  map: "https://maps.app.goo.gl/Vx1Prrgc4qz3b87Y7?g_st=ic",
  contact: "+251907953991 / +251944123456 / +251945123456 / +25114702217 / +25114701665",
  telegram: "https://t.me/wggaeyecenter",
  website: "https://wggaeyecenter.com/",
  email: "info@wggaeyecenter.com",
  availability: "Mon - Thu: 8:00 AM - 5:00 PM, Fri - Sat: 8:00 AM - 3:00 PM"
},
{
  id: 54,
  name: "Biruh Vision Eye Specialty Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive Ophthalmology and Optometry Service",
  specialServices: "Laser Treatment",
  specialtyCategory: "eye center",
  subCity: "yeka",
  area: "gurd shola",
  location: "Gurd Shola, Addis Ababa Athletics Federation Building, 2nd Floor, Yeka Sub-City",
  map: "https://maps.app.goo.gl/J4pZ8bLQcqLB1M5b7?g_st=ic",
  contact: "+25116463977 / +25116463973 / +251909393950",
  telegram: "",
  website: "https://biruhvision.org/",
  email: "info@biruhvision.org",
  availability: "Monday to Friday 8:00 AM-7:00 PM, Saturday and Sunday->8:00 AM – 12:00 PM"
},
{
  id: 55,
  name: "Zion Physiotherapy Specialty Clinic",
  facilityType: "speciality",
  specialty: "Physiotherapy",
  specialServices: "",
  specialtyCategory: "physiotherapy",
  subCity: "arada",
  area: ["4 kilo"],
  location: "4 kilo, in front of Berhanena Selam printing press, Kidus Plaza Ground Floor, Arada Sub-city",
  map: "https://maps.app.goo.gl/acyarFWYbYhBJxfa8?g_st=ic",
  contact: "0969696924 / +251111265926",
  telegram: "",
  website: "zionphysiotherapyclinic.com",
  email: "Zionphysioclinic@gmail.com",
  availability: "Monday- Saturday -> 8:00AM-7:00 PM"
},
{
  id: 56,
  name: "Optimum Physiotherapy Specialty Clinic",
  facilityType: "speciality",
  specialty: "Physiotherapy",
  specialServices: "",
  specialtyCategory: "physiotherapy",
  subCity: "nifas silk-lafto",
  area: ["lebu", "bethel"],
  location: [
    "Branch 1: Lebu, In Front of Varniro Real Estate, OSAC Business Tower, Nifas Silk-Lafto Sub-city",
    "Branch 2: Bethel, New Road, Next to Water Tanker, Kolfe Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/GU95wE3dtbsQs6BH8?g_st=atm",
    "https://maps.app.goo.gl/54LdUP7nyymMWVSw9?g_st=atm"
  ],
  contact: "+251118442096 / +251939290222 / +251901863797 / +251901845797",
  telegram: "https://t.me/optimumphysiotherapyspecialty",
  website: "optimumphysiotherapy.com.et",
  email: "optimumphysiotherapy3@gmail.com",
  availability: "Mon to Sat 8:00 am – 7:00 pm"
},
{
  id: 57,
  name: "DROGA Physiotherapy Specialty Clinic",
  facilityType: "speciality",
  specialty: "Physiotherapy",
  specialServices: "Paediatric physical therapy",
  specialtyCategory: "physiotherapy",
  subCity: "arada",
  area: ["arat kilo", "bole"],
  location: [
    "Branch 1: Arat kilo in front of Tourist Hotel, Arada Sub-city",
    "Branch 2: Bole Next to Japan Embassy, Bole Sub-city"
  ],
  map: [
    "https://g.co/kgs/mLBjiM1",
    "https://maps.app.goo.gl/x9dyUDoAHeBZzdYR6?g_st=atm"
  ],
  contact: "+251115578906 / +251974959595 / +251116687006",
  telegram: "",
  website: "https://drogaphysiotherapy.com/",
  email: "info@drogaphysiotherapy.com",
  availability: "Mon - Sat: 8:00 AM - 9:00 PM"
},
{
  id: 58,
  name: "Addis Cardiac Hospital",
  facilityType: "speciality",
  specialty: "Comprehensive Cardiovascular service including interventions",
  specialServices: "",
  specialtyCategory: "cardiac",
  subCity: "bole",
  area: ["bole ring road"],
  location: "Bole Ring Road Infront of Ethiopian Airlines head quarter, Bole Sub-City",
  map: "https://g.co/kgs/mPwSRf5",
  contact: "9825 / 0952343434 / 0116634740/41/20",
  telegram: "https://t.me/addiscardiachoapital",
  website: "https://addiscardiacenter.com/e/",
  email: "info@addiscardiac.com",
  availability: "24/7"
},
{
  id: 59,
  name: "ElOuzeir Cardiac Center",
  facilityType: "speciality",
  specialty: "Comprehensive Cardiovascular service including interventions",
  specialServices: "",
  specialtyCategory: "cardiac",
  subCity: "bole",
  area: ["bole printing"],
  location: "Main street of Bole Airport, behind Bole Printing about 300 meters ahead, Bole Sub-City",
  map: "https://maps.app.goo.gl/HinCsbXFNCYTWM646?g_st=ic",
  contact: "8076 / 0943082040 / +251115574341",
  telegram: "https://t.me/ELOzeircardiaccenter",
  website: "elouzeircardiaccenter.com",
  email: "e.cardiac.center@gmail.com",
  availability: "24/7"
},
{
  id: 60,
  name: "Abed Dermatology and Venerology Speciality Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive Dermatovenerology Service",
  specialServices: "",
  specialtyCategory: "dermatology and venerology",
  subCity: "kolfe",
  area: ["betel", "bisrate gabriel"],
  location: [
    "Branch 1: Betel, near NIB bank (previously known as Shoa dabo area), Kolfe Sub-city",
    "Branch 2: Bisrate Gabriel, Shimekit building 11th floor (behind Adot Mall), Nifas Silk-Lafto Sub-city"
  ],
  map: [
    "https://maps.app.goo.gl/93iKB21dyxrJBVg19?g_st=atm",
    "https://maps.app.goo.gl/cx5qBqMUthej3iJ58?g_st=atm"
  ],
  contact: "+251902709999 / +251902650909 / 0931587121",
  telegram: "https://t.me/abedclinic",
  website: "",
  email: "",
  availability: "Monday to Saturday: - 2:00-11:30LT"
},
{
  id: 61,
  name: "Heal-Liv Hair Transplant and Dermatology Specialty Clinic",
  facilityType: "speciality",
  specialty: "Full-service Hair Transplant and Dermatology",
  specialServices: "",
  specialtyCategory: "dermatology and venerology",
  subCity: "bole",
  area: ["bole"],
  location: "Bole airport road, Snap plaza 1st floor Gate #107, Bole Sub-City",
  map: "https://maps.app.goo.gl/DhAZeKim2tPXdVaN8?g_st=ic",
  contact: "0909909090 / +251987808084 / +251987808048",
  telegram: "https://t.me/HLivhairtranplant",
  website: "",
  email: "heallivhairtransplant@gmail.com",
  availability: "Monday to Friday 8:00AM-5:00PM , Saturday->8:30 AM – 12:30 PM"
},
{
  id: 62,
  name: "Dr. Mihretu Dermatology Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive Dermatovenerology Care",
  specialServices: "",
  specialtyCategory: "dermatology and venerology",
  subCity: "yeka",
  area: ["shola"],
  location: "On the road from Megenagha square to Shola, Yeka Sub-City",
  map: "https://g.co/kgs/wDxvEY",
  contact: "091 393 1136",
  telegram: "",
  website: "",
  email: "",
  availability: ""
},
{
  id: 63,
  name: "Axon Stroke and Spine Center",
  facilityType: "speciality",
  specialty: "General Neurology, Emergency Stroke Service, Endovascular Procedures, Interventional Pain Management, Neurosurgery, ICU care, Rehabilitation Services",
  specialServices: "Bjplane angiography, CTHlab, EEG, EMG, NCS",
  specialtyCategory: "neurology and spine",
  subCity: "lemi kura",
  area: ["Sunshine real estate meri lokie", "Wossen area"],
  location: [
    "Branch 1: CMC, Inside the Sunshine Real-Estate Compound (Meri-Luki), Lemi kura sub-city",
    "Branch 2: Wossen, 500 meters up the road from Wossen Grocery to Kara, Lemi Kura sub-city"
  ],
  map: [
    "https://maps.app.goo.gl/GXhC9bKjdnsH4jD38?g_st=atm",
    "https://maps.app.goo.gl/vZGufHvCDhTzNpxT7?g_st=atm"
  ],
  contact: "+251974788888 / +251940155606 / +251957040103",
  telegram: "https://t.me/axon_ssc_official_telegram_group",
  website: "https://www.ethiopiastroke.com/",
  email: "info@ethiopiastroke.com",
  availability: "24/7"
},
{
  id: 64,
  name: "St. Paul's Hospital Center for Fertility and Reproductive Medicine (Michu Clinic)",
  facilityType: "speciality",
  specialty: "Comprehensive range of services to investigate and treat infertility",
  specialServices: "",
  specialtyCategory: "fertility and reproductive medicine",
  subCity: "bole",
  area: ["22 getahun besha building"],
  location: "22 Getahun Besha building area next to New Generation University, Bole sub-city",
  map: "https://maps.app.goo.gl/UBEWPV71wMPBa3h89?g_st=atm",
  contact: "+251970552055",
  telegram: "https://t.me/michuclinic",
  website: "",
  email: "",
  availability: "Mon – Fri- 8:00 am – 5:00 pm, Sat and Sun 8:00am – 12:00pm"
},
{
  id: 65,
  name: "Amina Speech and Language Therapy",
  facilityType: "speciality",
  specialty: "Language, speech, and occupational therapy",
  specialServices: "",
  specialtyCategory: "speech and language therapy",
  subCity: ["nifas silk-lafto", "kolfe"],
  area: ["bisrate gabriel", "bethel"],
  location: [
    "Branch 1: Bisrate Gabriel, Behind South Africa Embassy, Nifas silk-Lafto Sub-City",
    "Branch 2: Bethel inside Dr. Kalid and Family Pediatric Center, Kolfe Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/b7MnFj6mvbzcYt9t8?g_st=atm",
    "https://maps.app.goo.gl/64KTmPc9cADadhH3A?g_st=atm"
  ],
  contact: "+251912729827 / +251912729636",
  telegram: "https://t.me/aminemamu",
  website: "",
  email: "",
  availability: "Mon—Sat:- 8:00 am – 5:00 pm, need to make a call prior"
},
{
  id: 66,
  name: "Loza Nutritional Consulting and Therapy",
  facilityType: "speciality",
  specialty: "Comprehensive Nutritional Care",
  specialServices: "",
  specialtyCategory: "nutritional centers",
  subCity: "yeka",
  area: ["megenagna"],
  location: "Megenagna, at Grace City Mall 2nd floor Room 24, Yeka Sub-City",
  map: "https://maps.app.goo.gl/yzv6LHJaxEZfvbfr9?g_st=ic",
  contact: "+251989300007 / +251907868584",
  telegram: "https://t.me/famwel21",
  website: "https://lozanutrition.com/",
  email: "info@lozanutrition.com",
  availability: "Monday to Saturday-> 8:00AM - 5:30 PM"
},
{
  id: 67,
  name: "OTORINO ENT Surgical Center",
  facilityType: "speciality",
  specialty: "Comprehensive ENT service",
  specialServices: "",
  specialtyCategory: "ent",
  subCity: "yeka",
  area: [
	"cmc road", 
	"gurd shola"
],
  location: "CMC Road, Gurd Shola, Ethiopian Athletics Federation building 3rd floor, Yeka Sub-City",
  map: "https://maps.google.com/?cid=11256823995965605362&entry=gps&g_st=atm",
  contact: "+251935901212 / +251116675170 / +251116675171",
  telegram: "",
  website: "https://otorinoet.com/",
  email: "otorhino@ethionet.et",
  availability: "Mon- Fri: 8:00 am -- 5:00 pm, Sat: 9:00 am – 5:00 pm"
},
{
  id: 68,
  name: "OASIS E.N.T Head and Neck Speciality Center",
  facilityType: "speciality",
  specialty: "Comprehensive ENT service",
  specialServices: "",
  specialtyCategory: "ent",
  subCity: "gullele",
  area: ["kebena"],
  location: "Kebena Square opposite OLA gas station EPHA building 2nd floor, Gulele Sub-City",
  map: "https://maps.app.goo.gl/tqVyJntu3houJRFXA",
  contact: "+251940681111 / +251940691111 / +251940671111",
  telegram: "https://t.me/oasis_ent",
  website: "https://www.oasisentcenter.com/",
  email: "info@oasisentcenter.com",
  availability: "Mon – Sat; 8:00 am – 5:00 pm"
},
{
  id: 69,
  name: "Nahom Specialty Dental Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive dental health care services",
  specialServices: "",
  specialtyCategory: "dental center",
  // Using an array to represent multiple sub-cities (Bole, Yeka, Nifas Silk-Lafto)
  subCity: ["bole", "yeka", "nifas silk-lafto"],
  // Each branch's area
  area: [
    "bole", // Branch 1
    "cmc", // Branch 2
    "bisrate gabriel",             // Branch 3
    "gurd sholla",                 // Branch 4
    "sarbet",              // Branch 5
    "jemo"                             // Branch 6 
  ],
  // Branch locations for each branch
  location: [
    "Branch 1: Airport Dental Clinic located in TK bldg around bole bridge, Bole Sub-city",
    "Branch 2: Ethiopian Economics Association bldg. located around CMC st. Michael Ground floor, Yeka sub-city",
    "Branch 3: African Insurance building located around Bisrate Gabriel 9th floor, Nifas Silk-Lafto sub-city",
    "Branch 4: Ethiopian Athletics Federation around Gurd Sholla ground floor, Yeka sub-city",
    "Branch 5: Adams Pavilion around Sarbet 5th floor, Nifas Silk-Lafto sub-city",
    "Branch 6: Kelela Bldg around Jemo 14th floor, Nifas Silk-Lafto Sub-City"
  ],
  map: [
    "https://g.co/kgs/V82XKu1", 
    "https://g.co/kgs/N47XpsR", 
    "https://maps.app.goo.gl/xw6e7mNquACmC6Hp8?g_st=atm", 
    "https://maps.app.goo.gl/aBWLsaK4rQ7X7CKP9?g_st=atm", 
    "https://maps.app.goo.gl/QNEbfmJSvrXQ9qWp7?g_st=atm",
    "https://maps.app.goo.gl/dDQEHNE8M5Zgt7WZ8?g_st=atm" 
  ],
  contact: "+251913006741 / 0941148668 / 0937613650",
  telegram: "",
  website: "",
  email: "Info@nahomdental.com",
  availability: "Monday to Saturday: - 8:00am – 5:00pm"
},
{
  id: 70,
  name: "Babi Specialty Dental Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive dental health care services",
  specialServices: "",
  specialtyCategory: "dental center",
  // Use an array for branches in different sub-cities
  subCity: ["lemi kura", "nifas silk-lafto", "bole"],
  area: [
    "cmc",   // Branch 1 (Lemi kura)
    "jemo",       // Branch 2 (Nifas silk-lafto)
    "bole michael"       // Branch 3 (Bole)
  ],
  location: [
    "Branch 1: CMC Square, on Ejigayehu Dibaba tower, Lemi kura Sub-city",
    "Branch 2: jemo, on Delina Mall, Nifas silk-Lafto sub-city",
    "Branch 3: Bole Michael, few kilometers from the traffic light, Bole Sub-city"
  ],
  map: [
    "https://maps.app.goo.gl/3NwXFUGmxeh8o9zv7?g_st=atm",
    "https://maps.app.goo.gl/fEeYzGeh2W3V3Xgs7?g_st=atm",
    "https://maps.app.goo.gl/8Jp65AR9Bdnqwzzo6?g_st=atm"
  ],
  contact: "+251975777777 / +251938397934 / 0911659371 / 0921944894",
  telegram: "https://t.me/babispecialitydentalclinic",
  website: "http://babidental.com/",
  email: "info@babi.com.et",
  availability: "Monday to Saturday: - 8:00am – 8:00pm , Sundays: - 8:00am – 5:00pm"
},
{
  id: 71,
  name: "Lewi Specialty Dental Clinic",
  facilityType: "speciality",
  specialty: "Comprehensive dental health care services",
  specialServices: "",
  specialtyCategory: "dental center",
  // Both branches are in Bole
  subCity: ["bole"],
  area: [
    "bole", // Branch 1
    "urrael"          // Branch 2
  ],
  location: [
    "Branch 1: Bole Shewa Dabo, Getu Commercial Center, 3rd floor, Bole Sub-city",
    "Branch 2: Urael, in front of Urael Church, AB Business Center, Bole sub-city"
  ],
  map: [
    "https://g.co/kgs/FqZW3pS",
    "https://maps.app.goo.gl/GfxjCXnrVpYeJuj7A?g_st=atm"
  ],
  contact: "+251910363238 / +251975852323",
  telegram: "https://t.me/Lewispecialitydentalclinic",
  website: "",
  email: "",
  availability: "Monday to Saturday: - 8:00am – 6:00PM"
},
{
  id: 72,
  name: "Lifeline Addis",
  facilityType: "homecare",
  specialty: "Home care service",
  specialServices: "General Medical Examination and Consultations (Nursing, PT, Nutrition advises, Full lab, Family wellness packages, Medical Equipment supply)",
  subCity: "bole",
  area: [
"gazebo Square",
"bole"
],
  location: "Bole behind Denbel, in front of Gazebo Square, in Gazebo building 6th floor, Bole Sub-City",
  map: "https://maps.google.com/?cid=16650644885561946023&entry=gps&g_st=atm",
  contact: "0902300000",
  telegram: "https://t.me/lifelinehomebasedhealthcare",
  website: "http://www.lifelineaddis.com",
  email: "lifelineaddis@gmail.com",
  availability: "24/7"
},
{
  id: 73,
  name: "Chrocare Homecare Based Health Service and Consultancy",
  facilityType: "homecare",
  specialty: "Home care service",
  specialServices: "General Medical Examination and Consultations (General Medical examination and consultancy, Nursing, Medical Travel Consultancy, Medical Equipment supply, PT, Laboratory)",
  subCity: "bole",
  area: [
"bole medhanialem",
"bole"
],
  location: "Bole medhanialem, Helzer tower 10th floor, Bole Sub-city",
  map: "https://maps.google.com/?cid=17927944359878596625&entry=gps&g_st=atm",
  contact: "0978201120 / 0902470000 / 0978206620",
  telegram: "https://t.me/flourish_consultancies, https://t.me/chrocar",
  website: "",
  email: "chrocare@gmail.com",
  availability: ""
},
{
  id: 74,
  name: "International Clinical Laboratories (ICL)",
  facilityType: "diagnostic",
  specialty: "Comprehensive Laboratory and Diagnostic tests",
  specialServices: "",
  // For diagnostic centers, specialtyCategory can be left blank or set as needed.
  specialtyCategory: "",
  // Store multiple branch subCities as an array
  subCity: [
    "kirkos",          // Branch 1: Kera Bulgaria Mazoria, Kirkos sub-city
    "gullele",         // Branch 2: Gulele Enkulal Fabrica, Gullele sub-city
    "lemi kura",            // Branch 3: CMC Eyoel bldg 1st floor, Lemi kura Sub-city
    "lideta",          // Branch 4: In front of Tikur Anbessa, Ayu Shashe bldg. 1st floor, Lideta Sub-city
    "yeka",            // Branch 5: Near Menilik Referral Hospital in Infront of CBE, Yeka Sub-city
    "kolfe",           // Branch 6: About 200 meters from Torhailoch roundabout, Kolfe Sub-City
    "nifas silk-lafto" // Branch 7: Jemo 3 Square area, Yemesirach Building, Nifas Silk-Lafto Sub-City
  ],
  // Provide area names for each branch (you may adjust these to your desired short labels)
  area: [
    "kera bulgaria mazoria", // Branch 1
    "gullele", 
"enkulal fabrica",               // Branch 2
    "cmc michael",             // Branch 3
    "tikur ambessa area",         // Branch 4
    "minilik hospital area",                   // Branch 5
    "torhayloch",            // Branch 6
    "jemo 3"          // Branch 7
  ],
  // Array of branch locations
  location: [
    "Branch 1: Kera Bulgaria Mazoria, Kirkos sub-city",
    "Branch 2: Gulele Enkulal Fabrica, Gullele sub-city",
    "Branch 3: CMC Eyoel bldg 1st floor, Yeka Sub-city",
    "Branch 4: In front of Tikur Anbessa, Ayu Shashe bldg. 1st floor, Lideta Sub-city",
    "Branch 5: Near Menilik Referral Hospital in Infront of CBE, Yeka Sub-city",
    "Branch 6: About 200 meters from Torhailoch roundabout, the ground floor of the Att building, Kolfe Sub-City",
    "Branch 7: Jemo 3 Square area, Yemesirach Building, Nifas Silk-Lafto Sub-City"
  ],
  // Array of map links corresponding to each branch
  map: [
    "https://maps.app.goo.gl/TsCsJutCDDwYVB8i8?g_st=atm",
    "https://maps.app.goo.gl/zeZYBKPYPiMSTVXE8?g_st=atm",
    "https://maps.app.goo.gl/2FNe99ker6HeQdWB8?g_st=atm",
    "https://maps.app.goo.gl/neDK3VnPraropUt38?g_st=atm",
    "https://maps.app.goo.gl/b6WE8h64uba467xK9?g_st=atm",
    "https://maps.app.goo.gl/tS3EuknhcKdppuBS9?g_st=atm",
    "https://maps.google.com/?cid=13883000270459336548&entry=gps&g_st=atm"
  ],
  contact: "7960 / +251114671818 / +251900672580 / +251900672325 / +251900672579 / +251900672324 / +251930332482 / +251948332359",
  telegram: "https://t.me/InternationalClinicalLaboratory",
  website: "http://www.icladdis.com",
  email: "info@icladdis.com",
  availability: "24/7"
},
{
  id: 75,
  name: "ONCO Pathology Diagnostic Center",
  facilityType: "diagnostic",
  specialty: "Laboratory and comprehensive diagnostic tests",
  specialServices: "",
  specialtyCategory: "",
  // Branch 1 is in Arada; Branch 2 is in Kolfe.
  subCity: ["arada", "kolfe"],
  area: ["pasture", "alert hospital area"],
  location: [
    "Branch 1: Enkulal Fabrica Near Pasture Behind NOC fuel station, Arada Sub-city",
    "Branch 2: Near Alert hospital, infront of Abune Aregay church, Kolfe Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/TL4bYwRfbcsz1dfA9?g_st=com.google.maps.preview.copy",
    "https://maps.app.goo.gl/WJLSaYFW72DRMADGA?g_st=atm"
  ],
  contact: "0945003664 / 0945606969 / 0949045555 / 0949065555",
  telegram: "https://t.me/oncopathologydiagnosticcenter",
  website: "http://www.oncopathology.org",
  email: "oncopath2019@gmail.com",
  availability: "Mon-Fri: 8:00am – 5:00pm, Saturday: 8:00am – 12:00pm"
},
{
  id: 76,
  name: "Wudassie Diagnostic Center",
  facilityType: "diagnostic",
  specialty: "Comprehensive Laboratory, Diagnostic and Imaging Center, Ambulance service",
  specialServices: "",
  specialtyCategory: "",
  // Six branches across various sub-cities:
  subCity: ["arada","arada", "arada", "bole","bole", "gullele", "yeka", "yeka"],
  area: [
    "churchill road",      
"tewodros square",
    "Arogew Kera",                        
    "bole",           
"bole airport",
    "enkulal fabrica",                                   
    "megenagna",                    
    "minilik hospital area"                    
  ],
  location: [
    "Branch 1: Churchill Road, pass Tewodros square, MK building, Arada Sub-City",
    "Branch 2: Arogew Kera, near commercial printing press, Arada Sub-City",
    "Branch 3: Bole Airport Enterprise Building, Bole Sub-City",
    "Branch 4: Enqulal Fabrica, Endewoin building, Gullele Sub-City",
    "Branch 5: Megenagna, Bethlehem Plaza, Yeka Sub-City",
    "Branch 6: Infront of Minilik Hospital, Ato Mengesha building, Yeka Sub-City"
  ],
  map: [
    "https://maps.app.goo.gl/gNRynudbBfKpxank8",
    "https://maps.app.goo.gl/pJMjStUPFZD5Muf87",
    "https://maps.app.goo.gl/k9oW3B6BuLHGwEPL9",
    "https://maps.app.goo.gl/aapsJTT9oUzgSoT4A?g_st=atm", // No map provided for Branch 4
    "https://maps.app.goo.gl/Jg3nYQmVnWn6HkCM8",
    "https://maps.app.goo.gl/tWvb4L5YmRFrWXt88"
  ],
  contact: "9888 / 0940040404 / 0940050505 / 0922729112 / 0940101010",
  telegram: "",
  website: "https://wudassie.net/",
  email: "info@wudassie.com",
  availability: "24/7"
},
{
  id: 77,
  name: "Swiss Diagnostics Ethiopia",
  facilityType: "diagnostic",
  specialty: "Comprehensive Advanced Laboratory and Diagnostic tests (Day time x-ray and Ultrasound)",
  specialServices: "",
  specialtyCategory: "",
  subCity: "kirkos",
  area: ["wello sefer","wello sefer garad moll"],
  location: "Garad City Center 3rd Floor Welosefer, kirkos Sub-City",
  map: "https://maps.google.com/?cid=6924148755353648869&entry=gps&g_st=atm",
  contact: "7262 / +251911681357 / +251115577740 / +251115577730 / 0935603366",
  telegram: "https://t.me/Sdethiopia2022",
  website: "https://www.sdethiopia.com/",
  email: "info@sdethiopia.com",
  availability: "24/7"
},
{
  id: 78,
  name: "Pioneer Diagnostic Center",
  facilityType: "diagnostic",
  specialty: "Imaging and diagnostic Services",
  specialServices: "Thyroid scintigraphy, SPECT CT",
  specialtyCategory: "",
  // Five branches with differing subCity values
  subCity: ["bole", "kirkos", "lideta", "arada", "bole"],
  area: [
    "alem cinema",         // Branch 1 (Bole)
    "gotera",                    // Branch 2 (Kirkos) - not provided
    "tikur ambessa area",                    // Branch 3 (Lideta) - not provided
    "arat kilo",           // Branch 4 (Arada)
    "24"     // Branch 5 (Bole)
  ],
  location: [
    "Branch 1: Bole, Alem cinema, Bole Sub-city",
    "Branch 2: Gotera, Halelujah hospital branch, Kirkos sub-city",
    "Branch 3: Around Black lion Hospital Next to Fana Broadcasting corp, Lideta sub-city",
    "Branch 4: Arat kilo area around arsho laboratory, Arada Sub-city",
    "Branch 5: Afarencis Lancet branch, Bole sub-city"
  ],
  map: [
    "https://maps.app.goo.gl/wDTnTqnFjav8bp3g9?g_st=atm",
    "https://maps.app.goo.gl/twJuDtsdGckY2iNq7?g_st=ic",
    "https://maps.app.goo.gl/RT2igiqZ9quLWPVe9?g_st=atm", 
    "https://maps.app.goo.gl/EpCLQKBAKFcLRYT88?g_st=atm",
    "https://maps.app.goo.gl/QWcejGM3CbdGbsqeA"
  ],
  contact: "9485 / +251908696969 / 0908656565 ",
  telegram: "https://t.me/Pioneerdiagnostic",
  website: "https://www.pdc-et.com/index.html",
  email: "info@pdc-et.com",
  availability: "24/7"
},
{
  id: 79,
  name: "Manna Diagnostic Center",
  facilityType: "diagnostic",
  specialty: "Imaging and diagnostic Services",
  specialServices: "HSG, CUG, IVP, Barium studies",
  specialtyCategory: "",
  subCity: "kirkos",
  area: "kera",
  location: "On the road from kera to Kirkos, Kirkos sub-city",
  map: "https://maps.app.goo.gl/ZLMAHALeWmYf9smq5?g_st=it",
  contact: "0901330044 / 0903337766 / 0988079808",
  telegram: "https://t.me/mannadiagnosticcenter",
  website: "",
  email: "",
  availability: ""
},
{
  id: 80,
  name: "Tebita Ambulance",
  facilityType: "ambulance",
  specialty: "Ambulance Services, Emergency medical trainings",
  specialServices: "",
  specialtyCategory: "",
  subCity: "yeka",
  area: ["yeka", "yeka sub city area", "yeka area"],
  location: "Yeka sub city, behind Lex Plaza building, adjacent to Saron Orthopedic Center. Yeka Sub-City",
  map: "https://maps.google.com/?cid=1016156997315661479&entry=gps&g_st=atm",
  contact: "8035 / +251911225464 / +251118684868 / +251111263626 / +251118681323/24",
  telegram: "https://t.me/Tebita8035",
  website: "https://www.tebitambulance.com/",
  email: "info@tebitambulance.com",
  availability: "24/7"
},
{
  id: 81,
  name: "Gize Psychiatric and Rehabilitation Center",
  facilityType: "speciality",
  specialty: "Comprehensive psychiatry service (Substance Rehabilitation, Emergency Psychiatry Admission, Child and adolescent psychiatry)",
  specialServices: "",
  specialtyCategory: "psychiatry",
  subCity: "yeka", 
  area: ["yeka", "yeka sub city area", "yeka area"],
  location: "Yeka area, Yeka Sub-City",
  map: "https://maps.app.goo.gl/VVrm67h96qTA9hVd6?g_st=atm",
  contact: "+251989689565 / +251986689565",
  telegram: "https://t.me/gizepsyciatriccenter",
  website: "",
  email: "alemenorbooks@gmail.com",
  availability: "24/7"
},
{
  id: 82,
  name: "Asheten Psychiatry & Rehabilitation Specialized Center",
  facilityType: "speciality",
  specialty: "Comprehensive psychiatry service (Substance Rehabilitation, Emergency Psychiatry Admission, Child and adolescent psychiatry)",
  specialServices: "Neuropsychiatry, Psychotherapy, Geriatric psychiatry, marriage counselling, family therapy, psychological Assist, speech, yoga, art, music, occupational therapy",
  specialtyCategory: "psychiatry",
  subCity: "bole",
  area: "figa",
  location: "Figa traffic light 155m on the way to Goro, Bole Sub-City",
  map: "https://maps.app.goo.gl/NCtfLmbYmtYNNSqn9?g_st=atm",
  contact: "+251963269487 / +251953404142 / +251116676979",
  telegram: "https://t.me/ashetenmentalhealth",
  website: "ashetenpsy.com",
  email: "ashetenpsyche369@gmail.com",
  availability: "24/7"
},
{
  id: 83,
  name: "Renascent Mental Health and Rehabilitation Center",
  facilityType: "speciality",
  specialty: "Comprehensive psychiatry service (Inpatient Rehabilitation, outpatient treatment for substance related disorder, Assessment of Substance Use Behavior, Psychotherapy)",
  specialServices: "Medication-Assisted Withdrawal Management (Detoxification), Group Therapy, including Weekly Self-Help Groups",
  specialtyCategory: "psychiatry",
  subCity: "sheger city",
  area: "lege tafo",
  location: "Lege tafo, Sheger City Sub-City",
  map: "https://maps.app.goo.gl/5mvWX7mRvNLuVcHaA?g_st=atm",
  contact: "0978496060 / 0941776060",
  telegram: "https://t.me/renascentrehabcenter",
  website: "http://renascentrehabcenter.com/",
  email: "renascentrehab@gmail.com",
  availability: "24/7"
},
{
  id: 84,
  name: "Abrhot Specialized Psychotherapy Center",
  facilityType: "speciality",
  specialty: "Comprehensive psychological service (pediatric and adolescent care, Assessment, and Testing including personality, Cognitive, developmental milestone, speech-language assessment, adult mental health, and psychotherapy care)",
  specialServices: "Home based Program, School-based program",
  specialtyCategory: "psychological center",
  subCity: "bole",
  area: ["bole wellosefer", "bole"],
  location: "Bole, Wellosefer, infront of Tebaber Berta building, Bole Sub-city",
  map: "https://maps.app.goo.gl/g9W19h1SLgBa5u176?g_st=atm",
  contact: "+251989737372 / +251911998619 / 091 199 8619",
  telegram: "",
  website: "https://www.abrihot.com/",
  email: "info@abrihot.com",
  availability: "Mon—Fri: 9:00 am – 6:00 pm, Sat: 9:00 am – 12:00 pm, Sun: Emergency only"
}
];	

// Get references to form elements 
  const facilityTypeEl = document.getElementById("facilityType");
  const specialtyTypeEl = document.getElementById("specialtyType");
  const specialtyGroupEl = document.getElementById("specialtyGroup");
  const subCityEl = document.getElementById("subCity");
  const areaEl = document.getElementById("area");
  const areaSearchEl = document.getElementById("areaSearch");
  const nameSearchEl = document.getElementById("nameSearch");
  const filterForm = document.getElementById("filterForm");
  const resetButton = document.getElementById("resetButton");
  const resultsSection = document.getElementById("resultsSection");

  // Mapping of sub-cities to their areas
  const areaMapping = {
    "arada": ["Sumale tera", "Arat Kilo", "4 kilo", "General Wingate Street", "Printing press", "Pasture", "Tewodros Square", "Arogew Kera"],
    "addis ketema": ["Medhanialem roundabout"],
   "yeka": ["Minilik Hospital area", "Megenagha", "shola", "Kebena Round about", "Yeka Sub city Area","yeka area","yeka", "Kebena", "CMC road", "Shola", "Gurd shola"],
    "bole": ["24", "Bole homes","Bole wellosefer",  "Bole medhanialem", "Haya Hulet","urrael", "Gazebo Square", "bole alem cinema", "Bole Medhanialem", "Figa", "Gerji", "Bole", "Fiyel bet", "Bole Rwanda", "bole airport", "Bole bulbula", "Capital Hotel"],
    "gullele": ["Gullele", "kebena", "Enkulal Fabrica"],
    "kirkos": ["Gotera Condominium", "Kazanchis", "Addis Ababa Stadium", "Genet Hotel", "Kera", "Kera bulgaria mazoria", "Cherkos", "Wello sefer","Wello sefer garad moll",  "Gotera", "Bulgaria"],
    "kolfe": ["Kolfe", "Sefere selam", "Torhayloch", "Ayertena", "Total 3kuter Mazoria", "Bethel", "Alert hospital area"],
    "lideta": ["Abenet", "Lideta", "Goma Kuteba", "Tikur Ambessa area", "BIherawi area"],
    "nifas silk-lafto": ["Sarbet", "Jemo", "Jemo 3", "Gofa", "Bisrate Gabriel"],
    "akaki-kaliti": [],
    "lemi kura": ["CMC", "Goro", "Ayat", "Sunshine real estate meri lokie", "Feyel bet", "CMC Michael", "Wossen area"],
    "sheger city": ["Furi", "Lege tafo"]
  };

  // Function to populate the area dropdown and its datalist for manual suggestions
  function populateAreaOptions() {
    areaEl.innerHTML = '<option value="">-- Select Area --</option>';
    const areaDatalist = document.getElementById("areaSuggestions");
    areaDatalist.innerHTML = "";
    
    let areas = [];
    const subCity = subCityEl.value.toLowerCase().trim();
    if (subCity && areaMapping[subCity] && areaMapping[subCity].length > 0) {
      areas = areaMapping[subCity];
    } else {
      // If no sub-city is selected, combine all areas and remove duplicates.
      Object.values(areaMapping).forEach(arr => {
        areas = areas.concat(arr);
      });
      areas = [...new Set(areas)];
    }
    areas.forEach(a => {
      const opt = document.createElement("option");
      opt.value = a.toLowerCase().trim();
      opt.textContent = a;
      areaEl.appendChild(opt);
      
      const dataOpt = document.createElement("option");
      dataOpt.value = a;
      areaDatalist.appendChild(dataOpt);
    });
  }

  // Function to populate facility name suggestions for autocomplete
  function populateNameSuggestions() {
    const nameDatalist = document.getElementById("nameSuggestions");
    nameDatalist.innerHTML = "";
    const names = facilities.map(f => f.name);
    const uniqueNames = [...new Set(names)];
    uniqueNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      nameDatalist.appendChild(opt);
    });
  }

  // Populate area options and facility name suggestions on page load and when subCity changes
  subCityEl.addEventListener("change", populateAreaOptions);
  populateAreaOptions();
  populateNameSuggestions();

  // Toggle specialty dropdown when facility type is "speciality"
  facilityTypeEl.addEventListener("change", function () {
    specialtyGroupEl.style.display = this.value === "speciality" ? "block" : "none";
  });

  // Handle form submission for filtering
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const facilityType = facilityTypeEl.value;
    const subCity = subCityEl.value.toLowerCase().trim();
    const areaDropdown = areaEl.value.toLowerCase().trim();
    const areaSearch = areaSearchEl.value.toLowerCase().trim();
    const area = areaSearch || areaDropdown;
    const nameSearch = nameSearchEl.value.toLowerCase().trim();
    const specialtyType = facilityType === "speciality" && specialtyTypeEl ? specialtyTypeEl.value.toLowerCase().trim() : "";
    
    let filtered = facilities.filter(f => {
      // If facilityType is selected, filter by it; if not, allow free search by name.
      if (facilityType) {
        if (f.facilityType !== facilityType) return false;
      }
      
      // Facility name filter (free text; partial match)
      if (nameSearch && !f.name.toLowerCase().includes(nameSearch)) return false;
      
      // Sub-city filtering (partial match allowed)
      if (subCity) {
        if (typeof f.subCity === "string") {
          if (!f.subCity.trim().toLowerCase().includes(subCity)) return false;
        } else if (Array.isArray(f.subCity)) {
          if (!f.subCity.some(item => item.trim().toLowerCase().includes(subCity))) return false;
        }
      }
      
      // Area filtering
      if (area) {
        if (f.area) {
          if (typeof f.area === "string") {
            if (f.area.trim().toLowerCase() !== area) return false;
          } else if (Array.isArray(f.area)) {
            if (!f.area.some(item => item.trim().toLowerCase() === area)) return false;
          }
        } else {
          if (!f.location.trim().toLowerCase().includes(area)) return false;
        }
      }
      
      // Specialty Category filtering (for speciality facilities)
      if (facilityType === "speciality" && specialtyType) {
        if (Array.isArray(f.specialtyCategory)) {
          if (!f.specialtyCategory.some(item => item.trim().toLowerCase() === specialtyType)) return false;
        } else {
          if (!f.specialtyCategory || f.specialtyCategory.trim().toLowerCase() !== specialtyType) return false;
        }
      }
      return true;
    });
    
    renderResults(filtered);
  });

  // Reset button to clear the form and results
  resetButton.addEventListener("click", function () {
    filterForm.reset();
    specialtyGroupEl.style.display = "none";
    resultsSection.innerHTML = "<h2>Search Results</h2><p>No results yet. Use the filters above to search.</p>";
    populateAreaOptions();
  });

  // Render Search Results (supports multiple branch locations)
  function renderResults(results) {
    if (results.length === 0) {
      resultsSection.innerHTML = "<h2>Search Results</h2><p>No facilities match your criteria.</p>";
      return;
    }
    
    let html = "<h2>Search Results</h2>";
    results.forEach(facility => {
      const locationText = Array.isArray(facility.location)
        ? facility.location.join("<br>")
        : facility.location;
      const mapLinks = Array.isArray(facility.map)
        ? facility.map.map(link => `<a href="${link}" target="_blank">View Map <i class="fa-solid fa-map-marker-alt"></i></a>`).join("<br>")
        : `<a href="${facility.map}" target="_blank">View Map <i class="fa-solid fa-map-marker-alt"></i></a>`;
      
      html += `
        <div class="result-item">
          <h3>${facility.name}</h3>
          <p><strong>Specialty:</strong> ${facility.specialty}</p>
          <p><strong>Special Services:</strong> ${facility.specialServices ? facility.specialServices : "N/A"}</p>
          <p><strong>Location:</strong> ${locationText}</p>
          <p><strong>Map:</strong> ${mapLinks}</p>
          <p><strong>Contact:</strong> ${facility.contact.split('/').map(phone => `<a href="tel:${phone.trim()}">${phone.trim()}</a>`).join(' / ')}</p>
          <p><strong>Telegram:</strong> ${facility.telegram ? `<a href="${facility.telegram}" target="_blank">Join Telegram <i class="fa-brands fa-telegram"></i></a>` : "N/A"}</p>
          <p><strong>Website:</strong> ${facility.website ? `<a href="${facility.website}" target="_blank">Visit Website <i class="fa-solid fa-globe"></i></a>` : "N/A"}</p>
          <p><strong>Email:</strong> ${facility.email ? `<a href="mailto:${facility.email}">${facility.email} <i class="fa-solid fa-envelope"></i></a>` : "N/A"}</p>
          <p><strong>Availability:</strong> ${facility.availability}</p>
        </div>
      `;
    });
    resultsSection.innerHTML = html;
  }
});
