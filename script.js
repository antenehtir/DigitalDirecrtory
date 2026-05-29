// ============================================================
//  OPEN CORRECTION — window-scope (v7.7)
//  Defined before DOMContentLoaded so inline onclicks fire
//  immediately without timing issues.
// ============================================================
window.openCorrection = function(facilityName) {
  // 1. Open accordion directly — avoids setupBottomTab's 50 ms scrollIntoView
  //    side-effect that could briefly expose the Registration tab
  var submitTabBody = document.getElementById('submitTabBody');
  var submitTabIcon = document.getElementById('submitTabIcon');
  var submitTabBtn  = document.getElementById('submitTabBtn');
  if (submitTabBody && submitTabBody.style.display === 'none') {
    submitTabBody.style.display = 'block';
    if (submitTabIcon) submitTabIcon.classList.add('open');
    if (submitTabBtn)  submitTabBtn.setAttribute('aria-expanded', 'true');
  }

  // 2. Switch to "Suggest a Correction" tab via direct DOM — no .click() indirection
  //    so the user lands there immediately with zero chance of seeing Register tab
  var tab1   = document.getElementById('registrationTabBtn');
  var tab2   = document.getElementById('correctionTabBtn');
  var panel1 = document.getElementById('registrationTabContent');
  var panel2 = document.getElementById('correctionTabContent');
  if (tab2)   tab2.classList.add('fdm-tab--active');
  if (tab1)   tab1.classList.remove('fdm-tab--active');
  if (panel2) panel2.style.display = '';
  if (panel1) panel1.style.display = 'none';

  // 3. Scroll to section
  var section = document.getElementById('facilityManagementSection');
  if (section) {
    setTimeout(function() {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }

  // 4. Populate correction search + auto-select the facility
  setTimeout(function() {
    var search = document.getElementById('correctionFacilitySearch');
    if (search) {
      search.value = facilityName;
      search.dispatchEvent(new Event('input', { bubbles: true }));
      setTimeout(function() {
        var opts = document.querySelectorAll('.correction-facility-option');
        opts.forEach(function(opt) {
          if (opt.getAttribute('data-facility-name') === facilityName) {
            opt.click();
          }
        });
      }, 200);
    }
  }, 400);
};
// Backward-compatible aliases
window.openCorr = window.openCorrection;

// ============================================================
//  GLOBAL RESET — v7.8
//  Clears all filters, returns to "All Facilities" view.
// ============================================================
window.globalReset = function() {
  // Clear filter form dropdowns
  ['facilityType','specialtyType','subCity','area'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['areaSearch','nameSearch'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  // Clear hero search bar
  var heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.value = '';
    heroSearch.dispatchEvent(new Event('input', { bubbles: true }));
  }
  // Return to All Facilities tab and render
  if (typeof handleUnifiedTabClick === 'function') {
    handleUnifiedTabClick('all');
  }
  // Scroll to top of page smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.closeCorr = function() {
  var m = document.getElementById('successModal');
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
};

// ============================================================
//  "OTHER" FIELD DELEGATION — global, before DOMContentLoaded
//  Handles every SELECT with data-other-target in both forms.
// ============================================================
document.addEventListener('change', function(e) {
  var sel = e.target;
  if (!sel || sel.tagName !== 'SELECT') return;
  var targetId = sel.getAttribute('data-other-target');
  if (!targetId) return;
  var wrap = document.getElementById(targetId);
  if (!wrap) return;
  var isOther = (sel.value === 'Other' || sel.value === 'other' || sel.value === 'OTHER');
  wrap.style.display = isOther ? 'block' : 'none';
  wrap.style.marginTop = isOther ? '8px' : '0';
  var inp = wrap.querySelector('input, textarea');
  if (inp) {
    inp.required = isOther;
    if (!isOther) inp.value = '';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  //  SITE CONFIG — flip hasNewNews to true to show red dot
  // ============================================================
  var hasNewNews = false;
  var openNearMeWheel = null;
  var _nearMeCategoryFilter = "";
  var _nearMeSpecialtyFilter = "";

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
      name: "American Medical & MCH Center",
      facilityType: "speciality",
      specialty: "Internal Medicine (Gastroenterology, Cardiology, Infectious disease, Endocrinology, Haematology), and Paediatrics, Consultation (Nutritional, Psychiatry, Travel Medicine)",
      specialtyCategory: "multi speciality",
      specialServices: "Vaccination Service for travelers and children, Sleep study (PSG), Certified US and UK embassy visa medical clearance, Stress ECG, Holter Monitor, ABPM, Paediatric and adult Echo, Spirometry, Advanced Laboratory Service, Comprehensive General check-up package, Adult ICU",
      subCity: "lemi kura",
      area: ["sunshine real estate meri lokie"],
      location: "CMC inside sunshine real estate compound (Meri lokie), Lemi kura sub-city",
      map: "https://www.google.com/maps/place/American+Medical+Center/@9.031014,38.8490357,17z",
      contact: "8551 / +251116678004 / +251116678020 / +251949648401",
      telegram: "https://t.me/AmericanMedicalCenterEthiopia",
      website: "https://amcethiopia.com/",
      email: "ethiopiaamc@gmail.com",
      whatsapp: "https://api.whatsapp.com/send/?phone=%2B251949648401",
      facebook: "https://web.facebook.com/AmericanMedicalCenterEthiopia",
      instagram: "https://www.instagram.com/american_medicalcenter/",
      tiktok: "https://www.tiktok.com/@american_medicalcenter",
      linkedin: "https://www.linkedin.com/company/american-medical-center-et",
      booking: "https://amcethiopia.com/book-an-appointment-american-medical-center-ethiopia.html",
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
      instagram: "https://www.instagram.com/samaritansurgical/",
      linkedin: "https://www.linkedin.com/company/samaritansurgical",
      tiktok: "https://www.tiktok.com/@samaritan_surgical_cent",
      booking: "https://drsamuelhailu.com/booking/",
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
  website: "https://ethiopiastroke.com/",
  email: "info@ethiopiastroke.com",
  tiktok: "https://www.tiktok.com/@axon.stroke.spine",
  facebook: "https://web.facebook.com/profile.php?id=100092109993264",
  instagram: "https://www.instagram.com/axon_stroke_spine_center",
  linkedin: "https://www.linkedin.com/company/axon-stroke-spine-center-official",
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
},
{
  id: 85,
  name: "Habari Medical Plaza",
  facilityType: "medical_plaza",
  specialty: "Internal Medicine, Gastroenterology, Cardiology, Oncology, Pulmonology, Emergency Medicine, Dermatology, Pediatrics, ENT, Dental, Ophthalmology, OBGYN, Psychiatry, Telemedicine",
  specialServices: "24/7 CT, Ultrasound, X-Ray & Scope, 24/7 Ophthalmology & ENT, 24/7 Helpline 9873 answered by doctors, Advanced Laboratory",
  specialtyCategory: "centers",
  subCity: "yeka",
  area: ["NOC building yeka", "civil service college"],
  location: "NOC Building, next to NOC Gas Station, near Civil Service College, Yeka Sub-City, Addis Ababa",
  map: "https://maps.app.goo.gl/Zwk7DqL4GqZTrxbv6",
  contact: "+251961588888 / 9873",
  telegram: "https://t.me/HabariDocdigitalhealth",
  website: "https://habarihealth.com/",
  email: "plaza@habarihealth.com",
  whatsapp: "https://wa.me/251963838485",
  facebook: "https://web.facebook.com/HabariDoc",
  instagram: "https://www.instagram.com/habari_9873/",
  tiktok: "https://www.tiktok.com/@habarimedicalplaza",
  linkedin: "https://www.linkedin.com/company/habaridoc/",
  booking: "https://habarihealth.com/",
  accentColor: "#af0405",
  monogram: "HMP",
  featured: true,
  emergency: true,
  notes: "2-storey parking available · Restaurant on-site",
  availability: "Emergency: 24/7 · Specialty OPD: Mon–Fri 8am–5pm · Sat 8am–12pm"
},
{
  id: 86,
  name: "American Medical Laboratories",
  facilityType: "diagnostic",
  specialty: "Clinical Chemistry, Hematology, Microbiology, Serology, Molecular Diagnostics, Pathology, Allergy Test, TB Screening, NIFT",
  specialServices: "24/7 Sample Collection, Home Visit Sample Collection, Rapid Test Results, Online Result Portal",
  specialtyCategory: "centers",
  subCity: "yeka",
  area: ["NOC building yeka", "habari medical plaza"],
  location: "Inside Habari Medical Plaza, NOC Building, near Civil Service College, Yeka Sub-City, Addis Ababa",
  map: "https://maps.app.goo.gl/VwRVsbi8fvfE1rXP8",
  contact: "+251937000710 / 9873",
  telegram: "https://t.me/aaml2026",
  website: "",
  email: "amclabratory2012@gmail.com",
  accentColor: "#0d7a5f",
  monogram: "AML",
  emergency: true,
  notes: "24/7 advanced laboratory service",
  availability: "24/7"
},
{
  id: 87,
  name: "HabariDOC",
  facilityType: "telemedicine",
  specialty: "Video Consultations, Specialist Access, Electronic Health Records, Prescription Management, Follow-Up Care",
  specialServices: "Available on iOS & Android, Multi-specialist access, Private & secure consultations",
  specialtyCategory: "telemedicine",
  subCity: "",
  area: [],
  location: "Online — Available across Ethiopia",
  map: "",
  contact: "+251961588888 / 9873",
  telegram: "https://t.me/HabariDocdigitalhealth",
  website: "https://habaridoc.com/",
  email: "info@habaridoc.com",
  whatsapp: "https://wa.me/251963838485",
  facebook: "https://web.facebook.com/HabariDoc",
  instagram: "https://instagram.com/habaridoc",
  tiktok: "https://www.tiktok.com/@habarimedicalplaza",
  linkedin: "https://www.linkedin.com/company/habaridoc/",
  booking: "https://habaridoc.com/",
  ios_app: "https://apps.apple.com/za/app/habaridoc/id6474964053",
  android_app: "https://play.google.com/store/apps/details?id=com.GlobalHealthcareConsultancy.HabariDOC",
  accentColor: "#af0405",
  monogram: "HD",
  notes: "Available on App Store & Google Play",
  availability: "24/7"
},
{
  id: 88,
  name: "Habari Pharmacy",
  facilityType: "pharmacy",
  specialty: "Prescription Medications, OTC Products, Medication Delivery, Pharmacy Consultation, Refill Reminders",
  specialServices: "Home delivery across Addis Ababa, App available on iOS & Android",
  specialtyCategory: "online_pharmacy",
  subCity: "",
  area: [],
  location: "Online — Delivery across Addis Ababa",
  map: "",
  contact: "+251961588888 / 9873",
  telegram: "",
  website: "https://habaripharmacy.com/",
  email: "info@habaridoc.com",
  whatsapp: "https://wa.me/251963838485",
  booking: "https://habaripharmacy.com/",
  ios_app: "https://apps.apple.com/us/app/habari-pharmacy/id6747916313",
  android_app: "https://play.google.com/store/apps/details?id=com.habaripharmacy.com",
  accentColor: "#af0405",
  monogram: "Rx",
  notes: "Prescription medication delivery",
  availability: "24/7"
},
{
  id: 89,
  name: "Wastina",
  facilityType: "financing",
  specialty: "Healthcare Financing, Diaspora Sponsorship, Family Health Plans, Remote Coverage, Elderly Care Support",
  specialServices: "Sponsor from anywhere in the world, Covers all network centers",
  specialtyCategory: "financing",
  subCity: "",
  area: [],
  location: "Online — Available worldwide for Ethiopian diaspora",
  map: "",
  contact: "+251116678004 / +251116678007 / 8551",
  telegram: "",
  website: "https://mywastina.com/",
  email: "Support@mywastina.com",
  whatsapp: "https://wa.me/251963838485",
  facebook: "https://web.facebook.com/mywastina/",
  instagram: "https://www.instagram.com/mywastina/",
  tiktok: "https://www.tiktok.com/@mywastina",
  linkedin: "https://www.linkedin.com/company/mywastina/",
  bookingLabel: "Sponsor Your Loved Ones",
  booking: "https://mywastina.com/",
  accentColor: "#62a8a1",
  monogram: "WS",
  notes: "Healthcare financing for the Ethiopian diaspora",
  availability: "Support available 24/7"
}
];

  // ============================================================
  //  DOM REFERENCES — v2.0
  // ============================================================
  const facilityTypeEl  = document.getElementById("facilityType");
  const specialtyTypeEl = document.getElementById("specialtyType");
  const specialtyGroupEl= document.getElementById("specialtyGroup");
  const subCityEl       = document.getElementById("subCity");
  const areaEl          = document.getElementById("area");
  const areaSearchEl    = document.getElementById("areaSearch");
  const nameSearchEl    = document.getElementById("nameSearch");
  const filterForm      = document.getElementById("filterForm");
  const resetButton     = document.getElementById("resetButton");

  // Results UI elements
  const resultsInitial  = document.getElementById("resultsInitial");
  const searchLoading   = document.getElementById("searchLoading");
  const resultsGrid     = document.getElementById("resultsGrid");
  const resultsCount    = document.getElementById("resultsCount");

  // Hero search elements
  const heroSearch    = document.getElementById("heroSearch");
  const heroSearchBtn = document.getElementById("heroSearchBtn");

  // Submit form elements
  const submitForm       = document.getElementById("submitForm");

  // ============================================================
  //  AREA MAPPING
  // ============================================================
  const areaMapping = {
    "arada":          ["Sumale tera","Arat Kilo","4 kilo","General Wingate Street","Printing press","Pasture","Tewodros Square","Arogew Kera"],
    "addis ketema":   ["Medhanialem roundabout"],
    "yeka":           ["Minilik Hospital area","Megenagha","shola","Kebena Round about","Yeka Sub city Area","yeka area","yeka","Kebena","CMC road","Shola","Gurd shola"],
    "bole":           ["24","Bole homes","Bole wellosefer","Bole medhanialem","Haya Hulet","urrael","Gazebo Square","bole alem cinema","Bole Medhanialem","Figa","Gerji","Bole","Fiyel bet","Bole Rwanda","bole airport","Bole bulbula","Capital Hotel"],
    "gullele":        ["Gullele","kebena","Enkulal Fabrica"],
    "kirkos":         ["Gotera Condominium","Kazanchis","Addis Ababa Stadium","Genet Hotel","Kera","Kera bulgaria mazoria","Cherkos","Wello sefer","Wello sefer garad moll","Gotera","Bulgaria"],
    "kolfe":          ["Kolfe","Sefere selam","Torhayloch","Ayertena","Total 3kuter Mazoria","Bethel","Alert hospital area"],
    "lideta":         ["Abenet","Lideta","Goma Kuteba","Tikur Ambessa area","BIherawi area"],
    "nifas silk-lafto":["Sarbet","Jemo","Jemo 3","Gofa","Bisrate Gabriel"],
    "akaki-kaliti":   [],
    "lemi kura":      ["CMC","Goro","Ayat","Sunshine real estate meri lokie","Feyel bet","CMC Michael","Wossen area"],
    "sheger city":    ["Furi","Lege tafo"]
  };

  // ============================================================
  //  HELPERS
  // ============================================================
  function getFacilityTypeInfo(type) {
    switch (type) {
      case "general":       return { icon: "fa-solid fa-hospital",          label: "General Hospital",       cls: "type-general",        emoji: "🏥" };
      case "speciality":    return { icon: "fa-solid fa-stethoscope",       label: "Specialty Center",       cls: "type-speciality",     emoji: "🏨" };
      case "diagnostic":    return { icon: "fa-solid fa-microscope",        label: "Diagnostic Center",      cls: "type-diagnostic",     emoji: "🔬" };
      case "ambulance":     return { icon: "fa-solid fa-truck-medical",     label: "Ambulance Service",      cls: "type-ambulance",      emoji: "🚑" };
      case "homecare":      return { icon: "fa-solid fa-house-medical",     label: "Home Care",              cls: "type-homecare",       emoji: "🏡" };
      case "telemedicine":  return { icon: "fa-solid fa-laptop-medical",    label: "Telemedicine",           cls: "type-telemedicine",   emoji: "💻" };
      case "pharmacy":      return { icon: "fa-solid fa-pills",             label: "Pharmacy",               cls: "type-pharmacy",       emoji: "💊" };
      case "medical_plaza": return { icon: "fa-solid fa-building-columns",  label: "Medical Plaza",          cls: "type-medical-plaza",  emoji: "🏛️" };
      case "financing":     return { icon: "fa-solid fa-credit-card",       label: "Healthcare Financing",   cls: "type-financing",      emoji: "💳" };
      default:              return { icon: "fa-solid fa-hospital",          label: type,                     cls: "type-general",        emoji: "🏥" };
    }
  }

  // ============================================================
  //  GRADIENT AVATAR HELPERS  (must be before buildTicker call)
  // ============================================================
  const GRAD_PALETTE = [
    ["#0A2647","#1B98E0"],
    ["#1B98E0","#06b6d4"],
    ["#0d7a5f","#34d399"],
    ["#4f46e5","#818cf8"],
    ["#7c3aed","#c084fc"],
    ["#be123c","#fb7185"],
    ["#92400e","#f59e0b"],
    ["#065f46","#6ee7b7"],
  ];

  function getFacilityInitials(name) {
    if (!name) return "?";
    return name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map(w => w[0]).join("").toUpperCase() || "?";
  }

  function getFacilityGradient(name, accentColor) {
    if (accentColor) {
      return "linear-gradient(135deg, " + accentColor + ", " + accentColor + "99)";
    }
    const hash = name.split("").reduce(function(a, c) { return a + c.charCodeAt(0); }, 0);
    const pair  = GRAD_PALETTE[hash % GRAD_PALETTE.length];
    const angle = (hash * 7 + 45) % 360;
    return "linear-gradient(" + angle + "deg, " + pair[0] + ", " + pair[1] + ")";
  }

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function ensureHttp(url) {
    if (!url) return "";
    return url.startsWith("http") ? url : "https://" + url;
  }

  // ============================================================
  //  SPECIALTY TYPES — shared across sub-tabs, filter, near-me wheel
  // ============================================================
  const SPECIALTY_TYPES = [
    { value: "",                              label: "All Specialty Centers",                emoji: "🏨" },
    { value: "medical_plaza",                 label: "Medical Plaza",                        emoji: "🏛️" },
    { value: "multi speciality",              label: "Multi-Specialty",                      emoji: "🏥" },
    { value: "mch",                           label: "MCH (Mother & Child Health)",           emoji: "👶" },
    { value: "pediatric",                     label: "Pediatric Center",                     emoji: "🧒" },
    { value: "psychiatry",                    label: "Psychiatry Center",                    emoji: "🧠" },
    { value: "psychological center",          label: "Psychological Center",                 emoji: "🧬" },
    { value: "eye center",                    label: "Eye Center (Ophthalmology)",            emoji: "👁️" },
    { value: "ent",                           label: "ENT Center",                           emoji: "👂" },
    { value: "dental center",                 label: "Dental Center",                        emoji: "🦷" },
    { value: "cardiac",                       label: "Cardiac Center",                       emoji: "❤️" },
    { value: "oncology",                      label: "Oncology Center",                      emoji: "🎗️" },
    { value: "orthopedic",                    label: "Orthopedic Center",                    emoji: "🦴" },
    { value: "neurology and spine",           label: "Neurology & Spine Center",             emoji: "🧠" },
    { value: "internal medicine",             label: "Internal Medicine Center",             emoji: "🩺" },
    { value: "dermatology and venerology",    label: "Dermatology & Venerology Center",      emoji: "🧴" },
    { value: "physiotherapy",                 label: "Physiotherapy Center",                 emoji: "🤸" },
    { value: "speech and language therapy",   label: "Speech & Language Therapy Center",     emoji: "🗣️" },
    { value: "fertility and reproductive medicine", label: "Fertility & Reproductive Medicine Center", emoji: "🌱" },
    { value: "nutritional centers",           label: "Nutritional Center",                   emoji: "🥗" },
    { value: "surgical center",               label: "Surgical Center",                      emoji: "🔪" },
  ];

  // ============================================================
  //  INLINE SVG ICONS for social media (no FA dependency)
  // ============================================================
  function socialSvg(platform) {
    var svgs = {
      facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      linkedin:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      tiktok:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
      whatsapp:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
      youtube:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>',
      twitter:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
      telegram:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
    };
    return svgs[platform] || '';
  }

  // ============================================================
  //  AREA DROPDOWN POPULATION
  // ============================================================
  function populateAreaOptions() {
    areaEl.innerHTML = '<option value="">All Areas</option>';
    const areaDatalist = document.getElementById("areaSuggestions");
    areaDatalist.innerHTML = "";

    let areas = [];
    const subCity = subCityEl.value.toLowerCase().trim();
    if (subCity && areaMapping[subCity] && areaMapping[subCity].length > 0) {
      areas = areaMapping[subCity];
    } else {
      Object.values(areaMapping).forEach(arr => { areas = areas.concat(arr); });
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

  // ============================================================
  //  FACILITY NAME AUTOCOMPLETE
  // ============================================================
  function populateNameSuggestions() {
    const nameDatalist = document.getElementById("nameSuggestions");
    nameDatalist.innerHTML = "";
    [...new Set(facilities.map(f => f.name))].forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      nameDatalist.appendChild(opt);
    });
  }

  subCityEl.addEventListener("change", populateAreaOptions);
  populateAreaOptions();
  populateNameSuggestions();

  // ============================================================
  //  SPECIALTY CARD TOGGLE
  // ============================================================
  facilityTypeEl.addEventListener("change", function () {
    if (this.value === "speciality") {
      specialtyGroupEl.style.display = "flex";
      // Trigger fade-in animation
      specialtyGroupEl.classList.remove("specialty-appear");
      void specialtyGroupEl.offsetWidth; // force reflow so animation restarts
      specialtyGroupEl.classList.add("specialty-appear");
      setTimeout(function () { specialtyGroupEl.classList.remove("specialty-appear"); }, 300);
    } else {
      specialtyGroupEl.style.display = "none";
    }
  });

  // ============================================================
  //  CORE FILTER LOGIC
  // ============================================================
  function runFilter() {
    const facilityType  = facilityTypeEl.value;
    const subCity       = subCityEl.value.toLowerCase().trim();
    const areaDropdown  = areaEl.value.toLowerCase().trim();
    const areaSearchVal = areaSearchEl.value.toLowerCase().trim();
    const area          = areaSearchVal || areaDropdown;
    const nameSearch    = nameSearchEl.value.toLowerCase().trim();
    const specialtyType = (facilityType === "speciality" && specialtyTypeEl)
                          ? specialtyTypeEl.value.toLowerCase().trim() : "";

    return facilities.filter(f => {
      if (facilityType) {
        if (facilityType === "speciality") {
          if (f.facilityType !== "speciality" && f.facilityType !== "medical_plaza") return false;
        } else {
          if (f.facilityType !== facilityType) return false;
        }
      }
      if (nameSearch) {
        var searchHaystack = [
          f.name,
          f.specialty || '',
          f.specialServices || '',
          Array.isArray(f.subCity) ? f.subCity.join(' ') : (f.subCity || ''),
          Array.isArray(f.area)    ? f.area.join(' ')    : (f.area    || '')
        ].join(' ').toLowerCase();
        if (!searchHaystack.includes(nameSearch)) return false;
      }

      if (subCity) {
        if (typeof f.subCity === "string") {
          if (!f.subCity.trim().toLowerCase().includes(subCity)) return false;
        } else if (Array.isArray(f.subCity)) {
          if (!f.subCity.some(s => s.trim().toLowerCase().includes(subCity))) return false;
        }
      }

      if (area) {
        if (f.area) {
          if (typeof f.area === "string") {
            if (f.area.trim().toLowerCase() !== area) return false;
          } else if (Array.isArray(f.area)) {
            if (!f.area.some(a => a.trim().toLowerCase() === area)) return false;
          }
        } else {
          const locText = Array.isArray(f.location) ? f.location.join(" ") : f.location;
          if (!locText.toLowerCase().includes(area)) return false;
        }
      }

      if (facilityType === "speciality" && specialtyType) {
        if (specialtyType === "medical_plaza") {
          if (f.facilityType !== "medical_plaza") return false;
        } else {
          if (f.facilityType !== "speciality") return false;
          if (Array.isArray(f.specialtyCategory)) {
            if (!f.specialtyCategory.some(c => c.trim().toLowerCase() === specialtyType)) return false;
          } else {
            if (!f.specialtyCategory || f.specialtyCategory.trim().toLowerCase() !== specialtyType) return false;
          }
        }
      }
      return true;
    });
  }

  // ============================================================
  //  SHOW / HIDE RESULTS UI
  // ============================================================
  function showLoading() {
    resultsInitial.style.display  = "none";
    searchLoading.style.display   = "flex";
    resultsGrid.innerHTML         = "";
    resultsCount.style.display    = "none";
  }

  function hideLoading() {
    searchLoading.style.display = "none";
  }

  function showInitial() {
    resultsInitial.style.display = "flex";
    searchLoading.style.display  = "none";
    resultsGrid.innerHTML        = "";
    resultsCount.style.display   = "none";
  }

  // ============================================================
  //  PAGINATION STATE
  // ============================================================
  var _allResults = [];
  var _curPage    = 1;
  const PAGE_SIZE = 10;

  // ============================================================
  //  BUILD SINGLE FACILITY CARD HTML
  // ============================================================
  function buildFacilityCard(facility) {
    const typeInfo = getFacilityTypeInfo(facility.facilityType);
    const subCities = Array.isArray(facility.subCity)
      ? [...new Set(facility.subCity)].map(capitalize).join(", ")
      : capitalize(facility.subCity || "");
    const locationText = Array.isArray(facility.location)
      ? facility.location.join("<br>")
      : (facility.location || "");
    const firstMap = Array.isArray(facility.map) ? facility.map[0] : facility.map;
    const phones = facility.contact ? facility.contact.split("/") : [];
    const firstPhone = phones.length ? phones[0].trim().replace(/\s/g, "") : "";
    const allPhoneLinks = phones
      .map(p => `<a href="tel:${p.trim().replace(/\s/g,'')}">${p.trim()}</a>`)
      .join(" / ");
    const avatarGrad     = getFacilityGradient(facility.name, facility.accentColor);
    const avatarInitials = getFacilityInitials(facility.name);

    return `
      <div class="result-card" data-type="${facility.facilityType}">
        <div class="result-card-header">
          <div class="grad-avatar" style="background:${avatarGrad}">${facility.monogram || avatarInitials}</div>
          <div class="result-card-header-meta">
            <div class="result-card-badges">
              <span class="result-card-type ${typeInfo.cls}">
                <i class="${typeInfo.icon}"></i> ${typeInfo.label}
              </span>
              ${subCities ? `<span class="result-card-subcity"><i class="fa-solid fa-location-dot"></i> ${subCities}</span>` : ""}
            </div>
          </div>
        </div>
        <div class="result-card-body">
          <h3 class="result-card-name">${facility.name}</h3>
          <div class="result-card-detail">
            <i class="fa-solid fa-stethoscope"></i>
            <span>${facility.specialty}</span>
          </div>
          ${facility.specialServices ? `
          <div class="result-card-detail">
            <i class="fa-solid fa-star"></i>
            <span><strong>Special services:</strong> ${facility.specialServices}</span>
          </div>` : ""}
          <div class="result-card-detail">
            <i class="fa-solid fa-location-dot"></i>
            <span>${locationText}</span>
          </div>
          ${facility.availability ? `
          <div class="result-card-detail">
            <i class="fa-solid fa-clock"></i>
            <span>${facility.availability}</span>
          </div>` : ""}
          <div class="result-card-detail">
            <i class="fa-solid fa-phone"></i>
            <span>${allPhoneLinks}</span>
          </div>
        </div>
        <div class="result-card-actions">
          ${firstPhone ? `<a href="tel:${firstPhone}" class="action-btn action-call"><i class="fa-solid fa-phone"></i> Call</a>` : ""}
          ${facility.whatsapp ? `<a href="${facility.whatsapp}" target="_blank" class="action-btn action-whatsapp">${socialSvg('whatsapp')} WhatsApp</a>` : ""}
          ${facility.telegram ? `<a href="${facility.telegram}" target="_blank" class="action-btn action-telegram">${socialSvg('telegram')} Telegram</a>` : ""}
          ${facility.booking ? `<a href="${facility.booking}" target="_blank" class="action-btn action-booking"><i class="fa-solid fa-calendar-check"></i> ${facility.bookingLabel || "Book"}</a>` : ""}
          ${facility.website ? `<a href="${ensureHttp(facility.website)}" target="_blank" class="action-btn action-website"><i class="fa-solid fa-globe"></i> Website</a>` : ""}
          ${firstMap ? `<a href="${firstMap}" target="_blank" class="action-btn action-map"><i class="fa-solid fa-map-location-dot"></i> Map</a>` : ""}
          ${(facility.ios_app || facility.android_app) ? `<div class="result-card-apps">
            ${facility.ios_app ? `<a href="${facility.ios_app}" target="_blank" class="action-btn action-app">🍎 App Store</a>` : ""}
            ${facility.android_app ? `<a href="${facility.android_app}" target="_blank" class="action-btn action-app">▶ Google Play</a>` : ""}
          </div>` : ""}
          ${(facility.facebook || facility.instagram || facility.linkedin || facility.tiktok || facility.twitter || facility.youtube) ? `<div class="result-card-social">
            ${facility.facebook  ? `<a href="${facility.facebook}"  target="_blank" class="social-link social-facebook"  title="Facebook">${socialSvg('facebook')}</a>` : ""}
            ${facility.instagram ? `<a href="${facility.instagram}" target="_blank" class="social-link social-instagram" title="Instagram">${socialSvg('instagram')}</a>` : ""}
            ${facility.linkedin  ? `<a href="${facility.linkedin}"  target="_blank" class="social-link social-linkedin"  title="LinkedIn">${socialSvg('linkedin')}</a>` : ""}
            ${facility.tiktok    ? `<a href="${facility.tiktok}"    target="_blank" class="social-link social-tiktok"    title="TikTok">${socialSvg('tiktok')}</a>` : ""}
            ${facility.twitter   ? `<a href="${facility.twitter}"   target="_blank" class="social-link social-twitter"   title="Twitter/X">${socialSvg('twitter')}</a>` : ""}
            ${facility.youtube   ? `<a href="${facility.youtube}"   target="_blank" class="social-link social-youtube"   title="YouTube">${socialSvg('youtube')}</a>` : ""}
          </div>` : ""}
          <a href="#facilityManagementSection" class="action-btn action-correction" onclick="window.openCorrection(${JSON.stringify(facility.name)})">
            ✏️ Request Correction ↓
          </a>
        </div>
      </div>`;
  }

  // ============================================================
  //  RENDER ONE PAGE OF CARDS (append mode = Show More)
  // ============================================================
  function renderPage(append) {
    const start     = (_curPage - 1) * PAGE_SIZE;
    const end       = _curPage * PAGE_SIZE;
    const pageItems = _allResults.slice(start, end);

    // Remove any existing show-more/less wrap
    const existingWrap = document.getElementById("showMoreWrap");
    if (existingWrap) existingWrap.remove();

    if (!append) resultsGrid.innerHTML = "";

    let html = "";
    pageItems.forEach(f => { html += buildFacilityCard(f); });
    resultsGrid.insertAdjacentHTML("beforeend", html);

    const total = _allResults.length;
    const shown = Math.min(end, total);

    // Helper: create the inline Reset button
    function makeInlineReset() {
      var resetBtn = document.createElement("button");
      resetBtn.className = "show-more-reset-btn";
      resetBtn.innerHTML = "↺ Reset";
      resetBtn.addEventListener("click", function () {
        filterForm.reset();
        specialtyGroupEl.style.display = "none";
        hideSpecialtySubTabs();
        hideClearFilter();
        populateAreaOptions();
        document.querySelectorAll(".hero-tag").forEach(function(t) { t.classList.remove("active"); });
        setUnifiedTabActive("all");
        updateFilterBadge();
        renderResults(facilities);
        var rs = document.getElementById("resultsSection");
        if (rs) rs.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return resetBtn;
    }

    // Add Show More / Show Less button if needed
    if (total > PAGE_SIZE) {
      const wrap = document.createElement("div");
      wrap.className = "show-more-wrap";
      wrap.id = "showMoreWrap";

      if (shown < total) {
        const remaining = total - shown;
        const btn = document.createElement("button");
        btn.className = "show-more-btn btn";
        btn.textContent = "Show More (" + remaining + " remaining)";
        btn.addEventListener("click", function () {
          _curPage++;
          renderPage(true);
          // Scroll the first new card into view smoothly
          const cards = resultsGrid.querySelectorAll(".result-card");
          if (cards[start]) cards[start].scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        wrap.appendChild(btn);
      } else {
        const btn = document.createElement("button");
        btn.className = "show-more-btn show-less-btn btn";
        btn.textContent = "Show Less";
        btn.addEventListener("click", function () {
          _curPage = 1;
          renderPage(false);
          resultsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        wrap.appendChild(btn);
      }

      wrap.appendChild(makeInlineReset());
      resultsGrid.insertAdjacentElement("afterend", wrap);
    }
  }

  // ============================================================
  //  RENDER RESULT CARDS
  // ============================================================
  function renderResults(results) {
    hideLoading();
    resultsInitial.style.display = "none";

    // Clear any stale show-more wrap
    const staleWrap = document.getElementById("showMoreWrap");
    if (staleWrap) staleWrap.remove();

    if (results.length === 0) {
      resultsCount.style.display = "none";
      resultsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-magnifying-glass-minus empty-state-icon"></i>
          <h3>No Facilities Found</h3>
          <p>Try adjusting your filters or search term. You can also submit a missing facility below.</p>
          <a href="#submitTabBtn" class="btn btn-primary" style="margin-top:8px;">
            <i class="fa-solid fa-plus"></i> Register Your Facility
          </a>
        </div>`;
      return;
    }

    resultsCount.textContent = results.length + " result" + (results.length !== 1 ? "s" : "") + " found";
    resultsCount.style.display = "inline-flex";

    _allResults = results;
    _curPage    = 1;
    renderPage(false);
  }

  // ============================================================
  //  FORM SUBMIT — with loading animation
  // ============================================================
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showLoading();

    // Small delay so spinner is visible, then render + close dropdown + scroll
    setTimeout(() => {
      const filtered = runFilter();
      renderResults(filtered);
      closeFilterDropdown();
      updateFilterBadge();
      var rs = document.getElementById("resultsSection");
      if (rs) rs.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 380);
  });

  // ============================================================
  //  RESET
  // ============================================================
  resetButton.addEventListener("click", function () {
    filterForm.reset();
    specialtyGroupEl.style.display = "none";
    hideSpecialtySubTabs();
    hideClearFilter();
    populateAreaOptions();
    showInitial();
    // Clear any active hero tag highlight
    document.querySelectorAll(".hero-tag").forEach(t => t.classList.remove("active"));
    // Reset unified tabs to "All Facilities"
    setUnifiedTabActive("all");
    // Update badge (will show 0)
    updateFilterBadge();
  });

  // ============================================================
  //  HERO SEARCH BAR
  // ============================================================
  function triggerHeroSearch() {
    const val = heroSearch.value.trim();
    if (val) nameSearchEl.value = val;
    // Close dropdown if open, then trigger filter search
    closeFilterDropdown();
    setTimeout(() => filterForm.dispatchEvent(new Event("submit")), 120);
  }

  heroSearchBtn.addEventListener("click", triggerHeroSearch);
  heroSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); triggerHeroSearch(); }
  });
  heroSearch.addEventListener("search-submit", triggerHeroSearch);

  // ============================================================
  //  HERO QUICK-FILTER TAGS
  // ============================================================
  document.querySelectorAll(".hero-tag").forEach(tag => {
    tag.addEventListener("click", function () {
      // Highlight active tag
      document.querySelectorAll(".hero-tag").forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      // Set facility type (and optional specialty sub-type) then trigger search
      const filter      = this.dataset.filter;
      const specialtyVal = this.dataset.specialty || "";
      facilityTypeEl.value = filter;
      facilityTypeEl.dispatchEvent(new Event("change"));
      if (specialtyVal && specialtyTypeEl) specialtyTypeEl.value = specialtyVal;

      closeFilterDropdown();
      setTimeout(() => filterForm.dispatchEvent(new Event("submit")), 200);
    });
  });

  // ============================================================
  //  SHARED: Success popup modal
  // ============================================================
  function showSuccessModal(type) {
    var modal   = document.getElementById('successModal');
    var titleEl = document.getElementById('successModalTitle');
    var msgEl   = document.getElementById('successModalMsg');
    if (!modal) return;
    if (type === 'correction') {
      titleEl.textContent = 'Correction Submitted! 🎉';
      msgEl.textContent   = "Thank you for helping us improve accuracy. We'll review your correction and update the directory.";
    } else {
      titleEl.textContent = 'Submitted Successfully! 🎉';
      msgEl.textContent   = "Thank you for contributing to Tiru MedDirectory. We'll review and add the facility shortly.";
    }
    modal.dataset.type = type;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Animate SVG checkmark draw
    var circle = modal.querySelector('.success-check-circle');
    var path   = modal.querySelector('.success-check-path');
    if (circle) {
      circle.style.transition = 'none'; circle.style.strokeDashoffset = '151';
      void circle.offsetWidth;
      circle.style.transition = 'stroke-dashoffset 0.5s ease'; circle.style.strokeDashoffset = '0';
    }
    if (path) {
      path.style.transition = 'none'; path.style.strokeDashoffset = '40';
      void path.offsetWidth;
      path.style.transition = 'stroke-dashoffset 0.4s ease 0.4s'; path.style.strokeDashoffset = '0';
    }
  }

  // ============================================================
  //  REGISTRATION FORM v7.5 — Formspree async submit
  // ============================================================
  function showRegError(msg) {
    var el = document.getElementById("regError");
    if (el) { el.textContent = msg; el.style.display = "block"; }
  }
  function hideRegError() {
    var el = document.getElementById("regError");
    if (el) el.style.display = "none";
  }
  function regSetLoading(on) {
    var btn    = document.getElementById("regSubmitBtn");
    var textEl = btn ? btn.querySelector(".reg-submit-text") : null;
    var spinEl = btn ? btn.querySelector(".reg-submit-spinner") : null;
    if (!btn) return;
    btn.disabled = on;
    if (textEl) textEl.style.display = on ? "none" : "";
    if (spinEl) spinEl.style.display = on ? "flex" : "none";
  }

  if (submitForm) {
    submitForm.addEventListener("submit", function(e) {
      e.preventDefault();
      hideRegError();
      var fname      = document.getElementById("sf-name").value.trim();
      var ftype      = document.getElementById("sf-type").value;
      var fsubcity   = document.getElementById("sf-subcity").value;
      var farea      = document.getElementById("sf-area").value.trim();
      var fphone     = document.getElementById("sf-phone").value.trim();
      var fspecialty = document.getElementById("sf-specialty").value;
      var hoursRadio = document.querySelector('input[name="working_hours"]:checked');
      if (!fname || !ftype || !fsubcity || !farea || !fphone || !fspecialty) {
        showRegError("Please fill in all required fields marked with *."); return;
      }
      if (!hoursRadio) { showRegError("Please select working hours."); return; }
      if (ftype === "Other") {
        var to = (document.getElementById("sf-type-other") || {}).value || "";
        if (!to.trim()) { showRegError("Please specify the facility type."); return; }
      }
      if (fspecialty === "Other") {
        var so = (document.getElementById("sf-specialty-other") || {}).value || "";
        if (!so.trim()) { showRegError("Please specify the specialty."); return; }
      }
      if (hoursRadio.value === "other") {
        var ht = (document.getElementById("sf-hours-other") || {}).value || "";
        if (!ht.trim()) { showRegError("Please describe your working hours."); return; }
      }
      regSetLoading(true);
      var formData = new FormData(submitForm);
      if (hoursRadio.value === "other") {
        formData.set("working_hours", document.getElementById("sf-hours-other").value.trim());
      }
      fetch("https://formspree.io/f/mgoqpjqe", {
        method: "POST", body: formData, headers: { "Accept": "application/json" }
      })
      .then(function(res) {
        regSetLoading(false);
        if (res.ok) { showSuccessModal('registration'); }
        else { showRegError("Submission failed. Please try again or contact @AntenehTir on Telegram."); }
      })
      .catch(function() {
        regSetLoading(false);
        showRegError("Submission failed. Please try again or contact @AntenehTir on Telegram.");
      });
    });
  }

  // "Other" SELECT delegation is now global (before DOMContentLoaded) — see top of file.
  // Working hours radio buttons (radios don't bubble through SELECT delegation):
  document.querySelectorAll('input[name="working_hours"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
      var ho = document.getElementById("sf-hours-other");
      if (ho) ho.style.display = (radio.value === "other" && radio.checked) ? "block" : "none";
    });
  });

  // ============================================================
  //  TICKER — build from live facility data, shuffle on load + 30s
  // ============================================================
  function buildTicker() {
    const track = document.getElementById("tickerTrack");
    if (!track) return;

    function getSubCityDisplay(subCity) {
      if (Array.isArray(subCity)) return capitalize(subCity[0] || "");
      return capitalize(subCity || "");
    }

    function buildCard(facility) {
      const info     = getFacilityTypeInfo(facility.facilityType);
      const subCity  = getSubCityDisplay(facility.subCity);
      const safeName = facility.name.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      const grad     = getFacilityGradient(facility.name, facility.accentColor);
      const initials = facility.monogram || getFacilityInitials(facility.name);
      return `<div class="ticker-card" data-name="${safeName}" data-type="${facility.facilityType}" tabindex="0" role="button" aria-label="Search ${safeName}">
        <div class="grad-avatar" style="background:${grad}">${initials}</div>
        <div class="ticker-card-info">
          <span class="ticker-name">${facility.name}</span>
          <div class="ticker-badges">
            <span class="result-card-type ${info.cls}">${info.label}</span>
            ${subCity ? `<span class="result-card-subcity"><i class="fa-solid fa-location-dot"></i> ${subCity}</span>` : ""}
          </div>
        </div>
      </div>`;
    }

    // Fisher-Yates shuffle
    function shuffleFacilities(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      return a;
    }

    function bindTickerCards() {
      track.querySelectorAll(".ticker-card").forEach(function(card) {
        function activate() {
          var facilityName = card.dataset.name;
          document.getElementById("nameSearch").value = facilityName;
          closeFilterDropdown();
          setTimeout(function() { filterForm.dispatchEvent(new Event("submit")); }, 200);
        }
        card.addEventListener("click", activate);
        card.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
        });
      });
    }

    function rebuildTicker() {
      var shuffled = shuffleFacilities(facilities);
      var cardsHTML = shuffled.map(buildCard).join("");
      // Pause, rebuild, restart animation
      track.style.animationPlayState = "paused";
      track.innerHTML = cardsHTML + cardsHTML;
      var totalPx = shuffled.length * 280;
      var speed   = 80;
      var dur     = Math.round(totalPx / speed) + "s";
      track.style.animation = "none";
      track.offsetHeight; // force reflow
      track.style.animation = "";
      track.style.animationDuration = dur;
      track.style.animationPlayState = "running";
      bindTickerCards();
    }

    // Build immediately (shuffled)
    rebuildTicker();

    // Re-shuffle silently every 30 seconds
    setInterval(rebuildTicker, 30000);
  }

  buildTicker();

  // ============================================================
  //  FDM TAB SWITCHER v7.6
  // ============================================================
  (function() {
    var tab1   = document.getElementById('registrationTabBtn');
    var tab2   = document.getElementById('correctionTabBtn');
    var panel1 = document.getElementById('registrationTabContent');
    var panel2 = document.getElementById('correctionTabContent');
    if (!tab1 || !tab2 || !panel1 || !panel2) return;
    function switchTab(activeTab, inactiveTab, activePanel, inactivePanel) {
      activeTab.classList.add('fdm-tab--active');
      inactiveTab.classList.remove('fdm-tab--active');
      activePanel.style.display = '';
      inactivePanel.style.display = 'none';
    }
    tab1.addEventListener('click', function() { switchTab(tab1, tab2, panel1, panel2); });
    tab2.addEventListener('click', function() { switchTab(tab2, tab1, panel2, panel1); });
  })();

  // ============================================================
  //  CORRECTION FORM v7.6 — inline facility search + Formspree
  // ============================================================
  (function() {
    var searchInput   = document.getElementById('correctionFacilitySearch');
    var dropdown      = document.getElementById('corrSearchDropdown');
    var step2         = document.getElementById('corrStep2');
    var step3         = document.getElementById('corrStep3');
    var submitWrap    = document.getElementById('corrSubmitWrap');
    var corrForm2     = document.getElementById('corrForm2');
    var corrFormError = document.getElementById('corrFormError');
    var selectedFacility = null;
    if (!searchInput) return;

    var sortedFacilities = facilities.slice().sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    function renderDropdown(query) {
      var q = (query || '').toLowerCase().trim();
      var results = q
        ? sortedFacilities.filter(function(f) { return f.name.toLowerCase().indexOf(q) > -1; })
        : sortedFacilities;
      if (results.length === 0) {
        dropdown.innerHTML = '<div class="corr-dropdown-empty">No facilities found</div>';
      } else {
        dropdown.innerHTML = results.slice(0, 60).map(function(f) {
          var info = getFacilityTypeInfo(f.facilityType);
          var sc   = Array.isArray(f.subCity) ? f.subCity[0] : (f.subCity || '');
          var safeName = f.name.replace(/"/g, '&quot;');
          return '<div class="corr-dropdown-item correction-facility-option" data-id="' + f.id + '" data-facility-name="' + safeName + '" role="option" tabindex="0">' +
            '<div class="corr-dropdown-name">' + f.name + '</div>' +
            '<div class="corr-dropdown-meta">' + info.label + (sc ? ' · ' + sc : '') + '</div>' +
            '</div>';
        }).join('');
        dropdown.querySelectorAll('.corr-dropdown-item').forEach(function(item) {
          item.addEventListener('click', function() {
            var id = parseInt(item.dataset.id);
            selectedFacility = facilities.find(function(f) { return f.id === id; });
            if (selectedFacility) {
              searchInput.value = selectedFacility.name;
              dropdown.style.display = 'none';
              populateCorrectionFields(selectedFacility);
            }
          });
          item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
          });
        });
      }
      dropdown.style.display = 'block';
    }

    searchInput.addEventListener('input', function() { renderDropdown(searchInput.value); });
    searchInput.addEventListener('focus', function() { renderDropdown(searchInput.value); });
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    function setFieldState(id, value) {
      var el = document.getElementById(id);
      if (!el) return;
      el.value = value || '';
      el.classList.remove('cf-has-data', 'cf-empty', 'cf-changed');
      el.classList.add(value ? 'cf-has-data' : 'cf-empty');
      function onChange() {
        el.classList.remove('cf-has-data', 'cf-empty');
        el.classList.add('cf-changed');
      }
      el.removeEventListener('input', onChange);
      el.removeEventListener('change', onChange);
      el.addEventListener('input', onChange);
      el.addEventListener('change', onChange);
    }

    function populateCorrectionFields(f) {
      var subjectEl = document.getElementById('corrSubject2');
      if (subjectEl) subjectEl.value = 'Correction Request — ' + f.name + ' — Tiru MedDirectory';
      var hiddenEl = document.getElementById('cf-facility-hidden');
      if (hiddenEl) hiddenEl.value = f.name;
      var typeInfo = getFacilityTypeInfo(f.facilityType);
      var sc   = Array.isArray(f.subCity) ? f.subCity.join(', ') : (f.subCity || '');
      var area = Array.isArray(f.area)    ? f.area.join(', ')    : (f.area    || '');
      var mapVal = f.map || f.location || '';
      if (Array.isArray(mapVal)) mapVal = mapVal[0] || '';
      // Section A
      setFieldState('cf-name',     f.name);
      setFieldState('cf-type',     typeInfo.label);
      setFieldState('cf-specialty',f.specialty || '');
      // Section B
      setFieldState('cf-subcity',  sc);
      setFieldState('cf-area',     area);
      setFieldState('cf-mapurl',   mapVal);
      // Section C
      setFieldState('cf-phone',    f.contact || '');
      // Section D
      setFieldState('cf-telegram', f.telegram  || '');
      setFieldState('cf-facebook', f.facebook  || '');
      setFieldState('cf-linkedin', f.linkedin  || '');
      setFieldState('cf-instagram',f.instagram || '');
      setFieldState('cf-tiktok',   f.tiktok    || '');
      setFieldState('cf-email',    f.email     || '');
      setFieldState('cf-website',  f.website   || '');
      setFieldState('cf-booking',  f.booking   || '');
      // Section E
      setFieldState('cf-services', f.specialServices || '');
      setFieldState('cf-hours',    f.availability    || '');
      // Show steps
      if (step2) { step2.style.display = ''; step2.style.animation = 'fadeInUp 0.3s ease'; }
      if (step3) { step3.style.display = ''; }
      if (submitWrap) submitWrap.style.display = '';
    }

    // Note: "Other" position field is handled by global event delegation above.

    // Correction form submit
    if (corrForm2) {
      corrForm2.addEventListener('submit', function(e) {
        e.preventDefault();
        if (corrFormError) corrFormError.style.display = 'none';
        if (!selectedFacility) {
          if (corrFormError) { corrFormError.textContent = 'Please select a facility first.'; corrFormError.style.display = 'block'; }
          return;
        }
        var cfName    = (document.getElementById('cf-submitter-name')     || {}).value || '';
        var cfPos     = (document.getElementById('cf-submitter-position') || {}).value || '';
        var cfContact = (document.getElementById('cf-submitter-contact')  || {}).value || '';
        if (!cfName.trim() || !cfPos || !cfContact.trim()) {
          if (corrFormError) { corrFormError.textContent = 'Please fill in all required fields in the "About You" section.'; corrFormError.style.display = 'block'; }
          return;
        }
        if (cfPos === 'Other') {
          var posOther = (document.getElementById('cf-position-other') || {}).value || '';
          if (!posOther.trim()) {
            if (corrFormError) { corrFormError.textContent = 'Please specify your position.'; corrFormError.style.display = 'block'; }
            return;
          }
        }
        var corrBtn    = document.getElementById('corrSubmitBtn');
        var corrTextEl = corrBtn ? corrBtn.querySelector('.reg-submit-text')   : null;
        var corrSpinEl = corrBtn ? corrBtn.querySelector('.reg-submit-spinner') : null;
        if (corrBtn) corrBtn.disabled = true;
        if (corrTextEl) corrTextEl.style.display = 'none';
        if (corrSpinEl) corrSpinEl.style.display = 'flex';

        var formData = new FormData(corrForm2);
        // Dynamic subject so Formspree email clearly identifies the facility
        var facilityNameForSubject = (document.getElementById('correctionFacilitySearch') || {}).value || 'Unknown Facility';
        formData.set('_subject', 'Correction Request — ' + facilityNameForSubject + ' — Tiru MedDirectory');
        formData.set('form_type', 'CORRECTION REQUEST');
        // Debug: log all form fields before submission
        console.log('[Correction Form] Fields being submitted:');
        for (var pair of formData.entries()) { console.log('  ' + pair[0] + ':', pair[1]); }
        fetch('https://formspree.io/f/mgoqpjqe', {
          method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
        })
        .then(function(res) {
          if (corrBtn) corrBtn.disabled = false;
          if (corrTextEl) corrTextEl.style.display = '';
          if (corrSpinEl) corrSpinEl.style.display = 'none';
          if (res.ok) { showSuccessModal('correction'); }
          else {
            if (corrFormError) { corrFormError.textContent = 'Submission failed. Please try again or contact @AntenehTir on Telegram.'; corrFormError.style.display = 'block'; }
          }
        })
        .catch(function() {
          if (corrBtn) corrBtn.disabled = false;
          if (corrTextEl) corrTextEl.style.display = '';
          if (corrSpinEl) corrSpinEl.style.display = 'none';
          if (corrFormError) { corrFormError.textContent = 'Submission failed. Please try again or contact @AntenehTir on Telegram.'; corrFormError.style.display = 'block'; }
        });
      });
    }
  })();

  // ============================================================
  //  SUCCESS MODAL v7.8 — always resets on every close action
  // ============================================================
  (function() {
    var modal    = document.getElementById('successModal');
    var closeBtn = document.getElementById('successModalClose');
    var closeTxt = document.getElementById('successModalCloseText');
    var another  = document.getElementById('successModalAnother');

    // Shared field-reset logic (called on every close)
    function _doFieldReset(formType) {
      ['sf-type-other-wrap', 'sf-specialty-other-wrap', 'cf-position-other-wrap'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) { el.style.display = 'none'; var inp = el.querySelector('input,textarea'); if (inp) { inp.required = false; inp.value = ''; } }
      });
      if (formType === 'correction') {
        var corrForm = document.getElementById('corrForm2');
        if (corrForm) corrForm.reset();
        var step2 = document.getElementById('corrStep2'); if (step2) step2.style.display = 'none';
        var step3 = document.getElementById('corrStep3'); if (step3) step3.style.display = 'none';
        var sw    = document.getElementById('corrSubmitWrap'); if (sw) sw.style.display = 'none';
        var si    = document.getElementById('correctionFacilitySearch'); if (si) si.value = '';
        var fe    = document.getElementById('corrFormError'); if (fe) fe.style.display = 'none';
        document.querySelectorAll('.cf-field').forEach(function(f) {
          f.classList.remove('cf-has-data', 'cf-empty', 'cf-changed');
        });
      } else {
        if (submitForm) submitForm.reset();
        var ho = document.getElementById('sf-hours-other'); if (ho) ho.style.display = 'none';
        var re = document.getElementById('regError'); if (re) re.style.display = 'none';
      }
    }

    // Close the modal AND reset fields (always)
    function closeSuccessModal() {
      var type = (modal && modal.dataset.type) || 'registration';
      if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
      _doFieldReset(type);
    }

    // "Submit Another" — same reset + scroll back to the form
    function closeAndReset(formType) {
      if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
      _doFieldReset(formType);
      var section = document.getElementById('facilityManagementSection');
      if (section) setTimeout(function() { section.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSuccessModal);
    if (closeTxt) closeTxt.addEventListener('click', closeSuccessModal);
    if (modal)    modal.addEventListener('click', function(e) { if (e.target === modal) closeSuccessModal(); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.style.display === 'flex') closeSuccessModal();
    });
    if (another) another.addEventListener('click', function() {
      var type = (modal && modal.dataset.type) || 'registration';
      closeAndReset(type);
    });
  })();

  // ============================================================
  //  MOBILE SWIPE INDICATORS v7.8 — pure CSS via .swipe-hint-container::after
  //  (JS-based hint removed; CSS handles it on touch devices)
  // ============================================================

  // Expose specialty sub-tab function globally (for any inline onclick usage)
  window.selectSpecialtyType = function(val) {
    var subTabs = document.getElementById("specialtySubTabs");
    if (!subTabs) return;
    var chip = subTabs.querySelector('[data-specialty="' + val + '"]');
    if (chip) chip.click();
  };

  // ============================================================
  //  SPECIALTY SUB-TABS — shown when Specialty Centers pill is clicked
  // ============================================================
  function filterBySpecialtyType(specialtyVal) {
    var filtered;
    if (!specialtyVal) {
      filtered = facilities.filter(function(f) { return f.facilityType === "speciality" || f.facilityType === "medical_plaza"; });
    } else if (specialtyVal === "medical_plaza") {
      filtered = facilities.filter(function(f) { return f.facilityType === "medical_plaza"; });
    } else {
      filtered = facilities.filter(function(f) {
        if (f.facilityType !== "speciality") return false;
        if (Array.isArray(f.specialtyCategory)) {
          return f.specialtyCategory.some(function(c) { return c.trim().toLowerCase() === specialtyVal; });
        }
        return f.specialtyCategory && f.specialtyCategory.trim().toLowerCase() === specialtyVal;
      });
    }
    return filtered;
  }

  function buildSpecialtySubTabs() {
    var subTabs = document.getElementById("specialtySubTabs");
    if (!subTabs) return;
    subTabs.innerHTML = "";
    var wrap = document.getElementById("specialtySubTabsWrap");
    if (wrap) wrap.style.display = "flex";

    SPECIALTY_TYPES.forEach(function(st) {
      var chip = document.createElement("button");
      chip.className = "specialty-chip" + (st.value === "" ? " active" : "");
      chip.dataset.specialty = st.value;
      chip.textContent = st.emoji + " " + st.label;
      chip.addEventListener("click", function() {
        subTabs.querySelectorAll(".specialty-chip").forEach(function(c) { c.classList.remove("active"); });
        this.classList.add("active");
        var specialtyVal = this.dataset.specialty;
        var filtered = filterBySpecialtyType(specialtyVal);
        var titleEl = document.getElementById("resultsTitle");
        if (titleEl) {
          var found = SPECIALTY_TYPES.find(function(s) { return s.value === specialtyVal; });
          titleEl.innerHTML = "<i class=\"fa-solid fa-stethoscope\"></i> " + (found ? found.emoji + " " + found.label : "All Specialty Centers");
        }
        setTimeout(function() {
          renderResults(filtered);
          var rs = document.getElementById("resultsSection");
          if (rs) rs.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
      subTabs.appendChild(chip);
    });

    // Wire scroll arrow buttons
    var leftBtn  = document.getElementById("specTabLeft");
    var rightBtn = document.getElementById("specTabRight");
    if (leftBtn && rightBtn) {
      function updateSpecArrows() {
        leftBtn.disabled  = subTabs.scrollLeft <= 0;
        rightBtn.disabled = subTabs.scrollLeft >= subTabs.scrollWidth - subTabs.clientWidth - 1;
      }
      leftBtn.onclick  = function() { subTabs.scrollBy({ left: -200, behavior: "smooth" }); };
      rightBtn.onclick = function() { subTabs.scrollBy({ left: 200, behavior: "smooth" }); };
      subTabs.addEventListener("scroll", updateSpecArrows);
      updateSpecArrows();
    }

    // Activate "All Specialty Centers" and render results WITHOUT scrolling to them
    (function() {
      var allChip = subTabs.querySelector('[data-specialty=""]');
      if (allChip) {
        subTabs.querySelectorAll(".specialty-chip").forEach(function(c) { c.classList.remove("active"); });
        allChip.classList.add("active");
        var filtered = filterBySpecialtyType("");
        var titleEl = document.getElementById("resultsTitle");
        if (titleEl) titleEl.innerHTML = "<i class=\"fa-solid fa-stethoscope\"></i> 🏨 All Specialty Centers";
        setTimeout(function() { renderResults(filtered); }, 100);
      }
    })();
  }

  function hideSpecialtySubTabs() {
    var wrap = document.getElementById("specialtySubTabsWrap");
    if (wrap) wrap.style.display = "none";
  }

  // ============================================================
  //  UNIFIED TABS — v4.6 (replaces both stat pills and main tabs)
  // ============================================================

  function setUnifiedTabActive(key) {
    var container = document.getElementById("unifiedTabsScroll");
    if (!container) return;
    container.querySelectorAll(".unified-tab-btn").forEach(function(t) {
      var active = t.dataset.key === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
  }

  function showClearFilter() {
    var row = document.getElementById("clearFilterRow");
    if (row) row.style.display = "flex";
  }

  function hideClearFilter() {
    var row = document.getElementById("clearFilterRow");
    if (row) row.style.display = "none";
  }

  function handleUnifiedTabClick(key) {
    setUnifiedTabActive(key);

    // Near Me — open the category wheel
    if (key === "nearme") {
      if (typeof openNearMeWheel === "function") {
        openNearMeWheel();
      } else {
        activateTab("nearme", false);
        var nm = document.getElementById("nearmeSection");
        if (nm) nm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // Show results section
    if (resultsSectionEl) resultsSectionEl.style.display = "block";
    if (nearMeSectionEl)  nearMeSectionEl.style.display  = "none";
    if (aboutSectionEl)   aboutSectionEl.style.display   = "none";
    history.pushState({ tab: key }, "", "#" + key);

    hideSpecialtySubTabs();

    var titleEl = document.getElementById("resultsTitle");

    if (key === "all") {
      hideClearFilter();
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-list-ul"></i> All Facilities';
      showLoading();
      setTimeout(function() {
        renderResults(facilities);
        closeFilterBody();
        if (resultsSectionEl) resultsSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 280);
      return;
    }

    showClearFilter();

    // Specialty Centers — show sub-tabs
    if (key === "speciality") {
      buildSpecialtySubTabs();
      closeFilterBody();
      setTimeout(function() {
        var tabsZone = document.getElementById("tabsStickyZone");
        if (tabsZone) tabsZone.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return;
    }

    // All other categories — filter directly
    var filterMap = {
      "general":      { fn: function(f) { return f.facilityType === "general"; },      title: "🏥 General Hospitals" },
      "diagnostic":   { fn: function(f) { return f.facilityType === "diagnostic"; },   title: "🔬 Diagnostic Centers" },
      "ambulance":    { fn: function(f) { return f.facilityType === "ambulance"; },     title: "🚑 Ambulance Services" },
      "homecare":     { fn: function(f) { return f.facilityType === "homecare"; },      title: "🏡 Home Care Services" },
      "telemedicine": { fn: function(f) { return f.facilityType === "telemedicine"; },  title: "💻 Telemedicine Services" },
      "pharmacy":     { fn: function(f) { return f.facilityType === "pharmacy"; },      title: "💊 Online Pharmacies" },
      "financing":    { fn: function(f) { return f.facilityType === "financing"; },     title: "💳 Healthcare Financing" },
    };

    var info = filterMap[key];
    if (!info) return;

    var filtered = facilities.filter(info.fn);
    if (titleEl) titleEl.innerHTML = info.title;
    showLoading();
    setTimeout(function() {
      renderResults(filtered);
      closeFilterBody();
      if (resultsSectionEl) resultsSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
  }

  function buildUnifiedTabs() {
    var container = document.getElementById("unifiedTabsScroll");
    if (!container) return;

    var defs = [
      { key: "all",          label: "All Facilities",         emoji: "📋", count: facilities.length },
      { key: "general",      label: "General Hospitals",      emoji: "🏥", count: facilities.filter(function(f){return f.facilityType==="general";}).length },
      { key: "speciality",   label: "Specialty Centers",      emoji: "🏨", count: facilities.filter(function(f){return f.facilityType==="speciality"||f.facilityType==="medical_plaza";}).length },
      { key: "diagnostic",   label: "Diagnostic Centers",     emoji: "🔬", count: facilities.filter(function(f){return f.facilityType==="diagnostic";}).length },
      { key: "ambulance",    label: "Ambulance",              emoji: "🚑", count: facilities.filter(function(f){return f.facilityType==="ambulance";}).length },
      { key: "homecare",     label: "Home Care",              emoji: "🏡", count: facilities.filter(function(f){return f.facilityType==="homecare";}).length },
      { key: "telemedicine", label: "Telemedicine",           emoji: "💻", count: facilities.filter(function(f){return f.facilityType==="telemedicine";}).length },
      { key: "pharmacy",     label: "Pharmacy",               emoji: "💊", count: facilities.filter(function(f){return f.facilityType==="pharmacy";}).length },
      { key: "financing",    label: "Health Care Financing",  emoji: "💳", count: facilities.filter(function(f){return f.facilityType==="financing";}).length },
      { key: "nearme",       label: "Near Me",                emoji: "📍", count: null },
    ];

    defs.forEach(function(def) {
      // Skip empty categories (except All and Near Me)
      if (def.key !== "all" && def.key !== "nearme" && def.count === 0) return;
      var btn = document.createElement("button");
      btn.className = "unified-tab-btn" + (def.key === "all" ? " active" : "");
      btn.dataset.key = def.key;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", def.key === "all" ? "true" : "false");
      var countHtml = def.count !== null
        ? ' <span class="unified-tab-count">' + def.count + '</span>'
        : "";
      btn.innerHTML =
        '<span class="unified-tab-emoji">' + def.emoji + '</span>' +
        ' <span class="unified-tab-label">' + def.label + '</span>' +
        countHtml;
      btn.addEventListener("click", function() { handleUnifiedTabClick(def.key); });
      container.appendChild(btn);
    });
  }

  // ============================================================
  //  FILTER DROPDOWN — v4.8 (replaces collapsible filter section)
  // ============================================================
  var _filterDropdownEl  = document.getElementById("filterDropdown");
  var _filterBackdropEl  = document.getElementById("filterBackdrop");
  var _heroFilterBtnEl   = document.getElementById("heroFilterBtn");
  var _filterCloseBtnEl  = document.getElementById("filterDropdownClose");

  function positionFilterDropdown() {
    if (!_filterDropdownEl || window.innerWidth <= 640) return;
    var wrap = document.querySelector(".hero-search-bar-wrap");
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    _filterDropdownEl.style.position = "fixed";
    _filterDropdownEl.style.top      = (rect.bottom + 8) + "px";
    _filterDropdownEl.style.left     = rect.left + "px";
    _filterDropdownEl.style.width    = rect.width + "px";
    _filterDropdownEl.style.maxHeight = Math.min(520, window.innerHeight - rect.bottom - 20) + "px";
    _filterDropdownEl.style.right    = "auto";
    _filterDropdownEl.style.bottom   = "auto";
  }

  function openFilterDropdown() {
    if (!_filterDropdownEl) return;
    positionFilterDropdown();
    _filterDropdownEl.style.display = "block";
    if (_filterBackdropEl) {
      _filterBackdropEl.style.display = "block";
      setTimeout(function() { _filterBackdropEl.classList.add("visible"); }, 10);
    }
    setTimeout(function() { _filterDropdownEl.classList.add("is-open"); }, 10);
    if (_heroFilterBtnEl) _heroFilterBtnEl.setAttribute("aria-expanded", "true");
  }

  function closeFilterDropdown() {
    if (!_filterDropdownEl) return;
    _filterDropdownEl.classList.remove("is-open");
    if (_heroFilterBtnEl) _heroFilterBtnEl.setAttribute("aria-expanded", "false");
    if (_filterBackdropEl) {
      _filterBackdropEl.classList.remove("visible");
      setTimeout(function() {
        if (!_filterDropdownEl.classList.contains("is-open")) {
          _filterBackdropEl.style.display = "none";
        }
      }, 280);
    }
    setTimeout(function() {
      if (!_filterDropdownEl.classList.contains("is-open")) {
        _filterDropdownEl.style.display = "none";
      }
    }, 280);
  }

  // Backward-compat aliases (called by handleUnifiedTabClick, activateTab, etc.)
  function openFilterBody()  { openFilterDropdown(); }
  function closeFilterBody() { closeFilterDropdown(); }

  if (_heroFilterBtnEl) {
    _heroFilterBtnEl.addEventListener("click", function(e) {
      e.stopPropagation();
      if (_filterDropdownEl && _filterDropdownEl.classList.contains("is-open")) {
        closeFilterDropdown();
      } else {
        openFilterDropdown();
      }
    });
  }
  if (_filterCloseBtnEl) {
    _filterCloseBtnEl.addEventListener("click", closeFilterDropdown);
  }
  if (_filterBackdropEl) {
    _filterBackdropEl.addEventListener("click", closeFilterDropdown);
  }

  // Close dropdown on outside click
  document.addEventListener("click", function(e) {
    if (!_filterDropdownEl || !_filterDropdownEl.classList.contains("is-open")) return;
    var combined = document.querySelector(".hero-search-combined");
    if (combined && combined.contains(e.target)) return;
    if (_filterDropdownEl.contains(e.target)) return;
    closeFilterDropdown();
  });

  // Reposition on resize
  window.addEventListener("resize", function() {
    if (_filterDropdownEl && _filterDropdownEl.classList.contains("is-open")) {
      positionFilterDropdown();
    }
  });

  // ============================================================
  //  FILTER BADGE — count active filters
  // ============================================================
  function updateFilterBadge() {
    var count = 0;
    if (facilityTypeEl  && facilityTypeEl.value)          count++;
    if (specialtyTypeEl && specialtyTypeEl.value)          count++;
    if (subCityEl       && subCityEl.value)                count++;
    if (areaEl          && areaEl.value)                   count++;
    if (areaSearchEl    && areaSearchEl.value.trim())      count++;
    if (nameSearchEl    && nameSearchEl.value.trim())      count++;
    var badge = document.getElementById("filterBadge");
    var btn   = document.getElementById("heroFilterBtn");
    if (badge) {
      if (count > 0) { badge.textContent = count; badge.style.display = "inline-flex"; }
      else { badge.style.display = "none"; }
    }
    if (btn) btn.classList.toggle("has-filters", count > 0);
  }

  // ============================================================
  //  MAIN TABS — v4.0
  // ============================================================
  const mainTabsEl = document.getElementById("mainTabs");
  const resultsSectionEl  = document.getElementById("resultsSection");
  const nearMeSectionEl   = document.getElementById("nearmeSection");
  const aboutSectionEl    = document.getElementById("aboutSection");

  function syncTabToType(type) {
    // Map facility type to unified tab key
    var unifiedKeyMap = {
      "telemedicine": "telemedicine",
      "pharmacy":     "pharmacy",
      "financing":    "financing",
      "speciality":   "speciality",
      "medical_plaza":"speciality",
      "general":      "general",
      "diagnostic":   "diagnostic",
      "ambulance":    "ambulance",
      "homecare":     "homecare",
    };
    var unifiedKey = unifiedKeyMap[type] || "all";
    setUnifiedTabActive(unifiedKey);
    // Also activate legacy tab for section switching
    var legacyTabMap = { "telemedicine": "telemedicine", "pharmacy": "pharmacy", "financing": "financing" };
    activateTab(legacyTabMap[type] || "facilities", false);
  }

  function activateTab(tabKey, renderImmediately) {
    // Keep hidden legacy main-tabs in sync (for JS compatibility)
    if (mainTabsEl) {
      mainTabsEl.querySelectorAll(".main-tab").forEach(function(t) {
        const isActive = t.dataset.tab === tabKey;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-selected", String(isActive));
      });
    }
    // Sync unified tabs visual state
    var unifiedKeyMap = {
      "facilities": "all",
      "telemedicine": "telemedicine",
      "pharmacy": "pharmacy",
      "financing": "financing",
      "nearme": "nearme",
    };
    setUnifiedTabActive(unifiedKeyMap[tabKey] || tabKey);

    // Show/hide panels
    if (tabKey === "nearme") {
      resultsSectionEl.style.display = "none";
      nearMeSectionEl.style.display  = "block";
      if (aboutSectionEl) aboutSectionEl.style.display = "none";
      history.pushState({ tab: tabKey }, "", "#" + tabKey);
      return;
    }
    if (tabKey === "about") {
      resultsSectionEl.style.display = "none";
      nearMeSectionEl.style.display  = "none";
      if (aboutSectionEl) aboutSectionEl.style.display = "block";
      history.pushState({ tab: tabKey }, "", "#about");
      return;
    }
    resultsSectionEl.style.display = "block";
    nearMeSectionEl.style.display  = "none";
    if (aboutSectionEl) aboutSectionEl.style.display = "none";
    history.pushState({ tab: tabKey }, "", "#" + tabKey);

    if (!renderImmediately) return;

    const titleEl = document.getElementById("resultsTitle");
    let filtered;
    if (tabKey === "facilities") {
      filtered = facilities;
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-list-ul"></i> All Facilities';
    } else if (tabKey === "telemedicine") {
      filtered = facilities.filter(f => f.facilityType === "telemedicine");
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-laptop-medical"></i> Telemedicine Services';
    } else if (tabKey === "pharmacy") {
      filtered = facilities.filter(f => f.facilityType === "pharmacy");
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-pills"></i> Online Pharmacies';
    } else if (tabKey === "financing") {
      filtered = facilities.filter(f => f.facilityType === "financing");
      if (titleEl) titleEl.innerHTML = '<i class="fa-solid fa-credit-card"></i> Healthcare Financing';
    } else {
      filtered = facilities;
    }

    // Sync dropdown
    const ftEl = document.getElementById("facilityType");
    if (ftEl) {
      const typeMap = { telemedicine:"telemedicine", pharmacy:"pharmacy", financing:"financing" };
      ftEl.value = typeMap[tabKey] || "";
      ftEl.dispatchEvent(new Event("change"));
    }

    showLoading();
    setTimeout(() => {
      renderResults(filtered);
      if (resultsSectionEl) resultsSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
  }

  // Legacy main-tabs click wiring (hidden, kept for JS compatibility)
  if (mainTabsEl) {
    mainTabsEl.querySelectorAll(".main-tab").forEach(function(tab) {
      tab.addEventListener("click", function () {
        const key = this.dataset.tab;
        if (key === "nearme" && typeof openNearMeWheel === "function") {
          openNearMeWheel();
          return;
        }
        activateTab(key, true);
      });
    });
  }

  // Browser back/forward
  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.tab) activateTab(e.state.tab, e.state.tab !== "nearme" && e.state.tab !== "about");
  });

  // ============================================================
  //  TOP NAV BAR — About / News / Quiz / Contact
  // ============================================================
  (function () {
    // Show news dot if hasNewNews
    var newsDot = document.getElementById("topNavNewsDot");
    if (newsDot && hasNewNews) newsDot.style.display = "inline-block";

    var topNavTabs    = document.querySelectorAll(".top-nav-tab");
    var topNavContent = document.getElementById("topNavContent");
    if (!topNavContent) return;

    // Collect main page sections to hide when a panel is active
    // NOTE: .header is NOT hidden — tabs live inside it and it stays visible
    var mainSections = Array.prototype.slice.call(
      document.querySelectorAll(".hero, .tabs-section-outer, .ticker-section, .main-content, .followup-section, .footer")
    );
    // Also the floating call button
    var floatBtn = document.querySelector(".float-call-btn");

    var activePanel = null;

    function showMainPage() {
      // Clear active state from all top nav tabs
      topNavTabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      mainSections.forEach(function (el) { el.style.display = ""; });
      if (floatBtn) floatBtn.style.display = "";
      topNavContent.style.display = "none";
      document.querySelectorAll(".top-panel").forEach(function (p) { p.style.display = "none"; });
      activePanel = null;
    }

    // Home button + clickable logo both return to main page
    function goHome() { showMainPage(); }
    var homeBtn   = document.getElementById("homeBtn");
    var navBrand  = document.getElementById("navBrand");
    if (homeBtn)  homeBtn.addEventListener("click", goHome);
    if (navBrand) navBrand.addEventListener("click", goHome);
    if (navBrand) navBrand.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goHome(); }
    });

    function showPanel(panelId) {
      // Hide main page
      mainSections.forEach(function (el) { el.style.display = "none"; });
      if (floatBtn) floatBtn.style.display = "none";
      // Hide all panels, show chosen
      document.querySelectorAll(".top-panel").forEach(function (p) { p.style.display = "none"; });
      var panel = document.getElementById(panelId);
      if (panel) panel.style.display = "block";
      topNavContent.style.display = "block";
      activePanel = panelId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    topNavTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var panelId = this.dataset.panel;
        // Toggle off if already active
        if (activePanel === panelId) {
          topNavTabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
          showMainPage();
          return;
        }
        // Activate tab
        topNavTabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        this.classList.add("active");
        this.setAttribute("aria-selected", "true");
        showPanel(panelId);
      });
    });
  })();

  // ============================================================
  //  HERO SEARCH AUTOCOMPLETE
  // ============================================================
  (function () {
    var heroInput   = document.getElementById("heroSearch");
    var suggestBox  = document.getElementById("heroSuggest");
    if (!heroInput || !suggestBox) return;

    // Build corpus from facility data
    var corpus = [];
    facilities.forEach(function (f) {
      corpus.push({ label: f.name, category: "Facility" });
      if (f.specialty && typeof f.specialty === "string") corpus.push({ label: f.specialty, category: "Specialty" });
      // Special services — split by comma and add individually
      if (f.specialServices && typeof f.specialServices === "string") {
        f.specialServices.split(',').forEach(function(svc) {
          var s = svc.trim();
          if (s) corpus.push({ label: s, category: "Service" });
        });
      }
      // subCity can be an array — flatten each entry individually
      if (f.subCity) {
        var subCities = Array.isArray(f.subCity) ? f.subCity : [f.subCity];
        subCities.forEach(function (sc) { if (sc && typeof sc === "string") corpus.push({ label: sc, category: "Sub-City" }); });
      }
      if (f.area) {
        var areas = Array.isArray(f.area) ? f.area : [f.area];
        areas.forEach(function (a) { if (a && typeof a === "string") corpus.push({ label: a, category: "Area" }); });
      }
    });
    // Deduplicate (case-insensitive)
    var seen = {};
    corpus = corpus.filter(function (item) {
      var key = item.label.toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });

    var activeIdx = -1;

    function showSuggestions(q) {
      suggestBox.innerHTML = "";
      activeIdx = -1;
      if (q.length < 2) { suggestBox.style.display = "none"; return; }
      var ql = q.toLowerCase();
      var matches = corpus.filter(function (c) { return c.label.toLowerCase().indexOf(ql) !== -1; }).slice(0, 6);
      if (!matches.length) { suggestBox.style.display = "none"; return; }
      matches.forEach(function (m, i) {
        var div = document.createElement("div");
        div.className = "hero-suggest-item";
        div.setAttribute("role", "option");
        div.dataset.idx = i;
        div.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>' +
          '<span>' + m.label + '</span>' +
          '<span class="hero-suggest-category">' + m.category + '</span>';
        div.addEventListener("mousedown", function (e) {
          e.preventDefault();
          heroInput.value = m.label;
          suggestBox.style.display = "none";
          heroInput.dispatchEvent(new Event("search-submit"));
        });
        suggestBox.appendChild(div);
      });
      suggestBox.style.display = "block";
    }

    heroInput.addEventListener("input", function () { showSuggestions(this.value); });
    heroInput.addEventListener("focus", function () { if (this.value.length >= 2) showSuggestions(this.value); });
    document.addEventListener("click", function (e) {
      if (!heroInput.contains(e.target) && !suggestBox.contains(e.target)) {
        suggestBox.style.display = "none";
      }
    });

    heroInput.addEventListener("keydown", function (e) {
      var items = suggestBox.querySelectorAll(".hero-suggest-item");
      if (!items.length || suggestBox.style.display === "none") return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        items.forEach(function (el, i) { el.classList.toggle("active", i === activeIdx); });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        items.forEach(function (el, i) { el.classList.toggle("active", i === activeIdx); });
      } else if (e.key === "Enter" && activeIdx >= 0) {
        heroInput.value = corpus.filter(function (c) {
          var ql = heroInput.value.toLowerCase();
          return c.label.toLowerCase().indexOf(ql) !== -1;
        })[activeIdx].label;
        suggestBox.style.display = "none";
        heroInput.dispatchEvent(new Event("search-submit"));
      } else if (e.key === "Escape") {
        suggestBox.style.display = "none";
      }
    });
  })();

  // ============================================================
  //  BOTTOM TABS — Submit & Rules — v4.0
  // ============================================================
  function setupBottomTab(btnId, bodyId, iconId) {
    const btn  = document.getElementById(btnId);
    const body = document.getElementById(bodyId);
    const icon = document.getElementById(iconId);
    if (!btn || !body || !icon) return;
    btn.addEventListener("click", function () {
      const open = body.style.display !== "none";
      if (open) {
        body.style.display = "none";
        icon.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        body.style.display = "block";
        icon.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        setTimeout(() => body.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
      }
    });
  }
  setupBottomTab("submitTabBtn", "submitTabBody", "submitTabIcon");
  setupBottomTab("rulesTabBtn",  "rulesTabBody",  "rulesTabIcon");

  // ============================================================
  //  NEAR ME — v4.0
  // ============================================================
  // Approximate sub-city centers in Addis Ababa (lat, lng)
  const subCityCoords = {
    "arada":           [9.0300, 38.7565],
    "addis ketema":    [9.0200, 38.7300],
    "yeka":            [9.0200, 38.8200],
    "bole":            [8.9950, 38.8100],
    "gullele":         [9.0750, 38.7500],
    "kirkos":          [9.0050, 38.7820],
    "kolfe":           [8.9800, 38.7300],
    "lideta":          [8.9900, 38.7500],
    "nifas silk-lafto":[8.9600, 38.7800],
    "akaki-kaliti":    [8.9200, 38.8000],
    "lemi kura":       [9.0400, 38.8400],
    "sheger city":     [8.8950, 38.6500],
  };

  let leafletMap = null;

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  // Parse lat/lng from a Google Maps URL if it contains coordinates
  function parseLatLngFromMapUrl(url) {
    if (!url || typeof url !== 'string') return null;
    // Pattern: @lat,lng,zoom  (works for most maps.app.goo.gl and full URLs)
    var atMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) return [parseFloat(atMatch[1]), parseFloat(atMatch[2])];
    // Pattern: q=lat,lng
    var qMatch = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (qMatch) return [parseFloat(qMatch[1]), parseFloat(qMatch[2])];
    // Pattern: ll=lat,lng
    var llMatch = url.match(/[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (llMatch) return [parseFloat(llMatch[1]), parseFloat(llMatch[2])];
    return null;
  }

  function getFacilityCoords(facility) {
    // Try URL-parsed coords first (most accurate)
    var mapUrl = Array.isArray(facility.map) ? facility.map[0] : facility.map;
    var parsed = parseLatLngFromMapUrl(mapUrl);
    if (parsed) return parsed;
    // Fall back to sub-city approximation
    var sc = (Array.isArray(facility.subCity) ? facility.subCity[0] : facility.subCity || "").toLowerCase().trim();
    return subCityCoords[sc] || null;
  }

  // Type-colored pins for the map
  function getFacilityTypeColor(type) {
    switch (type) {
      case "general":       return "#1565c0";
      case "speciality":
      case "medical_plaza": return "#6a1b9a";
      case "diagnostic":    return "#2e7d32";
      case "ambulance":     return "#e65100";
      case "homecare":      return "#c62828";
      case "telemedicine":  return "#006064";
      case "pharmacy":      return "#00695c";
      case "financing":     return "#4527a0";
      default:              return "#1B98E0";
    }
  }

  // Near Me state
  var _nearMeUserLat = null, _nearMeUserLng = null;
  var _nearMeRadius  = 'all';
  var _nearMeAllResults = [];

  function buildNearMeMap(userLat, userLng, toShow) {
    var mapEl = document.getElementById("nearMeMap");
    if (!mapEl) return;
    mapEl.style.display = "block";

    if (!window.L) {
      mapEl.innerHTML = '<p style="text-align:center;padding:40px;color:#475569;">Map unavailable — Leaflet failed to load.</p>';
      return;
    }

    if (!leafletMap) {
      leafletMap = L.map("nearMeMap").setView([userLat, userLng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(leafletMap);
    } else {
      leafletMap.setView([userLat, userLng], 13);
      // Remove old markers (keep tile layer)
      leafletMap.eachLayer(function(layer) {
        if (layer instanceof L.Marker) leafletMap.removeLayer(layer);
      });
    }

    // User pin (pulsing blue dot)
    var userIcon = L.divIcon({
      className: "",
      html: '<div style="width:14px;height:14px;background:#1B98E0;border:3px solid white;border-radius:50%;box-shadow:0 0 0 5px rgba(27,152,224,0.3)"></div>',
      iconSize: [14,14], iconAnchor: [7,7]
    });
    L.marker([userLat, userLng], { icon: userIcon }).addTo(leafletMap).bindPopup("<b>📍 You are here</b>");

    // Facility pins — top 20, colored by type
    toShow.slice(0, 20).forEach(function(f) {
      if (!f._coords) return;
      var color    = getFacilityTypeColor(f.facilityType);
      var info     = getFacilityTypeInfo(f.facilityType);
      var distText = f._dist < 0.1 ? '<0.1 km' : f._dist.toFixed(1) + ' km';
      var label    = f.monogram || getFacilityInitials(f.name);
      var facIcon  = L.divIcon({
        className: "",
        html: '<div style="width:30px;height:30px;background:' + color + ';border:2.5px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,0.32);line-height:1">' + label + '</div>',
        iconSize: [30,30], iconAnchor: [15,15]
      });
      L.marker(f._coords, { icon: facIcon }).addTo(leafletMap)
        .bindPopup('<b>' + f.name + '</b><br>' + info.emoji + ' ' + info.label + '<br>📍 ' + distText + (f.availability ? '<br>' + f.availability : ''));
    });
  }

  function renderNearMeResults() {
    var radius = _nearMeRadius;
    var filtered;
    if (radius === 'all') {
      filtered = _nearMeAllResults.filter(function(f) { return f._coords; }).slice(0, 20);
    } else {
      var r = parseInt(radius, 10);
      filtered = _nearMeAllResults.filter(function(f) { return f._coords && f._dist <= r; });
    }

    // Update count label
    var countEl = document.getElementById('nearmeCount');
    if (countEl) {
      var label = filtered.length + ' facilit' + (filtered.length === 1 ? 'y' : 'ies');
      label += radius === 'all' ? ' (20 nearest)' : ' within ' + radius + ' km';
      countEl.textContent = label;
    }

    var nearGrid = document.getElementById('nearMeGrid');
    if (!nearGrid) return;

    if (filtered.length === 0) {
      nearGrid.innerHTML = '<div class="empty-state"><i class="fa-solid fa-magnifying-glass-minus empty-state-icon"></i><h3>No Facilities Found</h3><p>Try a larger radius or tap "All" to see the 20 nearest.</p></div>';
      return;
    }

    // Build cards with distance badge injected
    var html = '';
    filtered.forEach(function(f) {
      var distText = f._dist < 0.1 ? '<0.1 km' : f._dist.toFixed(1) + ' km';
      var badge    = '<span class="nearme-dist-badge"><i class="fa-solid fa-location-dot"></i> ' + distText + '</span>';
      var cardHtml = buildFacilityCard(f);
      // Inject badge right after opening .result-card-header div
      cardHtml = cardHtml.replace('<div class="result-card-header">', '<div class="result-card-header">' + badge);
      html += cardHtml;
    });
    nearGrid.innerHTML = html;
  }

  function resetNearMe() {
    _nearMeUserLat = null; _nearMeUserLng = null;
    _nearMeRadius  = 'all'; _nearMeAllResults = [];

    if (leafletMap) { leafletMap.remove(); leafletMap = null; }

    var mapEl = document.getElementById('nearMeMap');
    if (mapEl) { mapEl.style.display = 'none'; mapEl.innerHTML = ''; }

    var nearGrid = document.getElementById('nearMeGrid');
    if (nearGrid) nearGrid.innerHTML = '';

    var filterRow = document.getElementById('nearmeFilterRow');
    if (filterRow) filterRow.style.display = 'none';

    // Reset radius pills to "All"
    document.querySelectorAll('.nearme-radius-pill').forEach(function(p) {
      p.classList.toggle('active', p.dataset.radius === 'all');
    });

    var countEl = document.getElementById('nearmeCount');
    if (countEl) countEl.textContent = '';

    var nearMeBtn = document.getElementById('nearMeBtn');
    if (nearMeBtn) {
      nearMeBtn.style.display = 'block';
      nearMeBtn.disabled = false;
      nearMeBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Use My Location';
    }
    var nearMeDenied = document.getElementById('nearMeDenied');
    if (nearMeDenied) nearMeDenied.style.display = 'none';

    var nearmeHero = document.getElementById('nearmeHero');
    if (nearmeHero) nearmeHero.style.paddingBottom = '';
  }

  function initNearMe(userLat, userLng) {
    _nearMeUserLat = userLat; _nearMeUserLng = userLng;

    // Filter by category wheel selection if set
    var facilityPool = _nearMeCategoryFilter
      ? facilities.filter(function(f) {
          if (_nearMeCategoryFilter === "speciality") {
            if (f.facilityType !== "speciality" && f.facilityType !== "medical_plaza") return false;
            if (_nearMeSpecialtyFilter) {
              if (_nearMeSpecialtyFilter === "medical_plaza") return f.facilityType === "medical_plaza";
              if (f.facilityType !== "speciality") return false;
              if (Array.isArray(f.specialtyCategory)) return f.specialtyCategory.some(function(c) { return c.trim().toLowerCase() === _nearMeSpecialtyFilter; });
              return f.specialtyCategory && f.specialtyCategory.trim().toLowerCase() === _nearMeSpecialtyFilter;
            }
            return true;
          }
          return f.facilityType === _nearMeCategoryFilter;
        })
      : facilities;

    // Sort by haversine distance
    _nearMeAllResults = facilityPool.map(function(f) {
      var coords = getFacilityCoords(f);
      var dist   = coords ? haversineKm(userLat, userLng, coords[0], coords[1]) : 999;
      return Object.assign({}, f, { _dist: dist, _coords: coords });
    }).sort(function(a, b) { return a._dist - b._dist; });

    // Build map with top 20
    buildNearMeMap(userLat, userLng, _nearMeAllResults.slice(0, 20));

    // Show filter row + wire radius pills (once)
    var filterRow = document.getElementById('nearmeFilterRow');
    if (filterRow && filterRow.style.display === 'none') {
      filterRow.style.display = 'block';
      document.querySelectorAll('.nearme-radius-pill').forEach(function(pill) {
        pill.addEventListener('click', function() {
          document.querySelectorAll('.nearme-radius-pill').forEach(function(p) { p.classList.remove('active'); });
          this.classList.add('active');
          _nearMeRadius = this.dataset.radius;
          renderNearMeResults();
        });
      });
      var resetBtn = document.getElementById('resetNearMeBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetNearMe);
    }

    renderNearMeResults();

    // Scroll map into view
    var mapEl = document.getElementById('nearMeMap');
    if (mapEl) setTimeout(function() { mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }

  var nearMeBtn    = document.getElementById("nearMeBtn");
  var nearMeDenied = document.getElementById("nearMeDenied");

  if (nearMeBtn) {
    nearMeBtn.addEventListener("click", function () {
      this.disabled = true;
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating…';
      if (!navigator.geolocation) {
        if (nearMeDenied) nearMeDenied.style.display = "flex";
        this.style.display = "none";
        return;
      }
      var btn = this;
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          btn.style.display = "none";
          var nearmeHero = document.getElementById("nearmeHero");
          if (nearmeHero) nearmeHero.style.paddingBottom = "28px";
          initNearMe(pos.coords.latitude, pos.coords.longitude);
        },
        function() {
          if (nearMeDenied) nearMeDenied.style.display = "flex";
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Use My Location';
        },
        { timeout: 10000 }
      );
    });
  }

  // ============================================================
  //  NEAR ME CATEGORY WHEEL — v4.3
  // ============================================================
  (function () {
    var overlay   = document.getElementById("nearMeWheelOverlay");
    var nwBox     = overlay ? overlay.querySelector(".nw-box") : null;
    var container = document.getElementById("nwContainer");
    var goBtn     = document.getElementById("nwGoBtn");
    var closeBtn  = document.getElementById("nwClose");
    if (!overlay || !container || !goBtn || !closeBtn) return;

    var items = container.querySelectorAll(".nw-item");

    // Specialty drill-down elements (declared here so openWheel can reference them)
    var nwSpecialtyScroll = document.getElementById("nwSpecialtyScroll");
    var nwSpecialtyList   = document.getElementById("nwSpecialtyList");
    var nwSpecialtyBack   = document.getElementById("nwSpecialtyBack");

    // Five evenly-spread angles (top → clockwise)
    var angles = [-90, -18, 54, 126, 198];

    function positionItems() {
      var r = container.offsetWidth <= 300 ? 110 : 130;
      items.forEach(function (item, i) {
        var rad = angles[i] * Math.PI / 180;
        var tx  = Math.round(Math.cos(rad) * r);
        var ty  = Math.round(Math.sin(rad) * r);
        item.style.setProperty("--tx",  tx + "px");
        item.style.setProperty("--ty",  ty + "px");
        item.style.setProperty("--tx0", "0px");
        item.style.setProperty("--ty0", "0px");
      });
    }

    function openWheel() {
      positionItems();
      _nearMeCategoryFilter = "";
      _nearMeSpecialtyFilter = "";
      if (nwSpecialtyList) nwSpecialtyList.style.display = "none";
      items.forEach(function (item, i) {
        item.classList.remove("selected");
        item.style.animationDelay = (i * 0.055) + "s";
      });
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      // Small delay so display:flex is painted before adding the open class
      setTimeout(function () { container.classList.add("open"); }, 30);
    }

    function closeWheel() {
      container.classList.remove("open");
      overlay.style.display = "none";
      document.body.style.overflow = "";
      items.forEach(function (item) { item.classList.remove("selected"); });
    }

    // Close on X button, backdrop click, or Escape
    closeBtn.addEventListener("click", closeWheel);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeWheel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.style.display === "flex") closeWheel();
    });

    // Populate near-me specialty list
    if (nwSpecialtyScroll) {
      SPECIALTY_TYPES.forEach(function(st) {
        var btn = document.createElement("button");
        btn.className = "nw-specialty-item" + (st.value === "" ? " nw-specialty-item-all nw-sp-selected" : "");
        btn.dataset.specialty = st.value;
        btn.textContent = (st.emoji ? st.emoji + " " : "") + st.label;
        btn.addEventListener("click", function() {
          nwSpecialtyScroll.querySelectorAll(".nw-specialty-item").forEach(function(i) { i.classList.remove("nw-sp-selected"); });
          this.classList.add("nw-sp-selected");
          _nearMeSpecialtyFilter = this.dataset.specialty;
        });
        nwSpecialtyScroll.appendChild(btn);
      });
    }
    if (nwSpecialtyBack) {
      nwSpecialtyBack.addEventListener("click", function() {
        if (nwSpecialtyList) nwSpecialtyList.style.display = "none";
        _nearMeSpecialtyFilter = "";
        // Deselect specialty category
        items.forEach(function(i) { i.classList.remove("selected"); });
        _nearMeCategoryFilter = "";
      });
    }

    // Category item selection
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        items.forEach(function (i) { i.classList.remove("selected"); });
        this.classList.add("selected");
        _nearMeCategoryFilter = this.dataset.cat || "";
        // If specialty center selected, show specialty drill-down
        if (this.dataset.cat === "speciality" && nwSpecialtyList) {
          nwSpecialtyList.style.display = "block";
        } else if (nwSpecialtyList) {
          nwSpecialtyList.style.display = "none";
          _nearMeSpecialtyFilter = "";
        }
      });
    });

    // "Locate Me" center button — close wheel, activate nearme, trigger GPS
    goBtn.addEventListener("click", function () {
      closeWheel();
      activateTab("nearme", false);         // show nearme panel without re-triggering wheel
      var nearMeSec = document.getElementById("nearmeSection");
      if (nearMeSec) nearMeSec.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        var nearMeBtn = document.getElementById("nearMeBtn");
        if (nearMeBtn && !nearMeBtn.disabled && nearMeBtn.style.display !== "none") {
          nearMeBtn.click();
        }
      }, 350);
    });

    // Expose to the rest of DOMContentLoaded scope
    openNearMeWheel = openWheel;
  })();

  // ============================================================
  //  HERO NEAR ME BUTTON
  // ============================================================
  (function () {
    var heroNearMeBtn = document.getElementById("heroNearMeBtn");
    if (!heroNearMeBtn) return;
    heroNearMeBtn.addEventListener("click", function () {
      // Open the category wheel first (if available)
      if (typeof openNearMeWheel === "function") {
        openNearMeWheel();
        return;
      }
      // Fallback: activate Near Me tab directly
      activateTab("nearme", true);
      var nearMeSec = document.getElementById("nearmeSection");
      if (nearMeSec) nearMeSec.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        var nearMeBtn = document.getElementById("nearMeBtn");
        if (nearMeBtn && !nearMeBtn.disabled && nearMeBtn.style.display !== "none") {
          nearMeBtn.click();
        }
      }, 450);
    });
  })();

  // ============================================================
  //  INIT — v4.6
  // ============================================================
  buildUnifiedTabs();

  // ============================================================
  //  UNIFIED TABS ARROWS — v4.6
  // ============================================================
  (function () {
    var leftBtn  = document.getElementById("unifiedTabLeft");
    var rightBtn = document.getElementById("unifiedTabRight");
    var scroll   = document.getElementById("unifiedTabsScroll");
    if (!leftBtn || !rightBtn || !scroll) return;
    leftBtn.addEventListener("click", function () {
      scroll.scrollBy({ left: -220, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", function () {
      scroll.scrollBy({ left: 220, behavior: "smooth" });
    });
  })();

  // ============================================================
  //  CLEAR FILTER BUTTON
  // ============================================================
  (function () {
    var clearBtn = document.getElementById("clearFilterBtn");
    if (!clearBtn) return;
    clearBtn.addEventListener("click", function () {
      handleUnifiedTabClick("all");
    });
  })();

  // ============================================================
  //  STICKY TABS SHADOW — v6.0
  // ============================================================
  (function() {
    var stickyZone = document.getElementById("tabsStickyZone");
    var statsBar = document.querySelector(".stats-bar");
    if (!stickyZone) return;
    function update() {
      var statsBottom = statsBar ? statsBar.getBoundingClientRect().bottom : 0;
      stickyZone.classList.toggle("is-sticky", statsBottom <= 64);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

  // ============================================================
  //  HERO SEARCH HINTS — v7.8
  // ============================================================
  (function() {
    document.querySelectorAll('.hero-hint-tag').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var key = btn.dataset.key;
        if (key) handleUnifiedTabClick(key);
      });
    });
  })();

  // ============================================================
  //  HERO SEARCH MOBILE PLACEHOLDER — v7.8
  // ============================================================
  (function() {
    var inp = document.getElementById('heroSearch');
    if (!inp) return;
    function setPlaceholder() {
      inp.placeholder = window.innerWidth <= 480
        ? 'Search facilities…'
        : 'Search by facility name, specialty, service, or area…';
    }
    setPlaceholder();
    window.addEventListener('resize', setPlaceholder);
  })();

  // Show ALL facilities immediately on load (no "ready to search" empty state)
  renderResults(facilities);

});

