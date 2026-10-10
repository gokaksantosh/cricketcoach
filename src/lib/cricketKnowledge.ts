export const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bengali" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "de", label: "German" },
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number]["code"];

export type KnowledgeSource = {
  title: string;
  url: string;
};

export type KnowledgeEntry = {
  id: string;
  category: "Laws" | "Batting" | "Bowling" | "Fielding" | "General";
  question: string;
  keywords: string[];
  answer: Record<SupportedLanguage, string>;
  sources: KnowledgeSource[];
  videos: KnowledgeSource[];
};

export const knowledgeEntries: KnowledgeEntry[] = [
  {
    id: "lbw-rule",
    category: "Laws",
    question: "What is the LBW rule in cricket?",
    keywords: ["lbw", "leg before wicket", "wicket"],
    answer: {
      en: "An LBW decision is given when the ball strikes the batter's body before the bat and would have hit the stumps, assuming the delivery was not otherwise legally deflected. The key principle is whether the ball would have hit the wicket on a straight line and whether the batter was in front of the line of the stumps.",
      hi: "LBW निर्णय तब दिया जाता है जब गेंद बल्लेबाज के शरीर से लगकर बल्ले से पहले लगती है और अगर गेंद सही दिशा में जाती तो विकेट पर लगती। मुख्य सिद्धांत यह होता है कि गेंद विकेट को सीधी रेखा में लगी होती या नहीं और बल्लेबाज विकेट रेखा के आगे था या नहीं।",
      bn: "LBW সিদ্ধান্ত তখন দেওয়া হয়, যখন বল ব্যাটারের শরীরে লেগে ব্যাটের আগে লাগে এবং সেটি স্টাম্পে লাগত, যদি বলটি অন্যভাবে আইনগতভাবে পরিবর্তিত না হতো। মূল নীতি হলো বল কি স্টাম্পে সরাসরি লাগতো এবং ব্যাটার কি স্টাম্পের রেখার সামনে ছিল।",
      ta: "LBW தீர்ப்பு என்பது பந்து பேட்டரின் உடலில் பட்டு, பேட்டின் முன்பே பந்தடிக்கும் போது, பந்து ஸ்டம்பை அடித்திருக்கும் என்றால் வழங்கப்படுகிறது. முக்கியமான கொள்கை என்னவென்றால், பந்து நேராக ஸ்டம்பை அடித்திருக்கும் என்பதா, மற்றும் பேட்டர் ஸ்டம்பின் முன்புறத்தில் இருந்தானா என்பதே.",
      te: "LBW తీర్పు అప్పుడు ఇస్తారు, బంతి బ్యాటర్ శరీరాన్ని తగిలి బడ్డి ముందు తగిలితే, ఆ బంతి స్టంప్స్‌ను తగిలి ఉండేదని భావించి. ప్రధాన సూత్రం ఏమిటంటే బంతి సూటి గీతలో స్టంప్స్‌ను తాకుతుందా మరియు బ్యాటర్ స్టంప్‌ల పైన ఉన్నాడా లేదా అని చూడటం.",
      de: "Ein LBW-Entscheid wird gefällt, wenn der Ball den Körper des Schlagenden trifft, bevor der Schläger den Ball berührt, und der Ball bei normaler Flugbahn die Stumpfs getroffen hätte. Der zentrale Punkt ist, ob der Ball auf gerader Linie die Stufen getroffen hätte und ob der Schlagende vor der Wicketlinie stand.",
    },
    sources: [
      {
        title: "MCC Law 27 - The Law of the Leg Before Wicket",
        url: "https://www.lords.org/mcc/the-laws-of-cricket/law-27-the-leg-before-wicket",
      },
      {
        title: "ICC Playing Conditions summary",
        url: "https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions",
      },
    ],
    videos: [
      {
        title: "What is LBW? Explained with examples",
        url: "https://www.youtube.com/results?search_query=cricket+lbw+explained",
      },
      {
        title: "MCC LBW law breakdown",
        url: "https://www.youtube.com/results?search_query=cricket+lbw+law+mcc",
      },
    ],
  },
  {
    id: "no-ball",
    category: "Laws",
    question: "What is a no-ball in cricket?",
    keywords: ["no ball", "no-ball", "no ball law"],
    answer: {
      en: "A no-ball is called when a bowler oversteps the crease, bowls a full toss above shoulder height, or breaches a specific bowling law. When a no-ball is called, the batting side gets one extra run and the delivery is not counted as a legal ball.",
      hi: "नो-बॉल तब दी जाती है जब गेंदबाज क्रीज के बाहर जाता है, कंधे की ऊंचाई से ऊपर फुलटॉस डालता है, या गेंदबाजी के नियमों का उल्लंघन करता है। नो-बॉल पर बल्लेबाजी टीम को एक अतिरिक्त रन मिलता है और वह गेंद वैध गेंद नहीं मानी जाती।",
      bn: "নো-বল দেওয়া হয় যখন বোলার ক্রিজের বাইরে যায়, কাঁধের উচ্চতার উপরে ফুল টস ফেলে, বা বোলিংয়ের নিয়ম ভেঙে দেয়। নো-বলে ব্যাটিং দল এক রান পায় এবং সেই ডেলিভারি বৈধ বল হিসেবে গণ্য হয় না।",
      ta: "கிரீஸைத் தாண்டி பந்துவீசுவது, தோள்பட்டை உயரத்திற்கு மேலே முழு-டாஸ் வீசுவது அல்லது பந்துவீசும் விதிகளை மீறுவது ஆகியவை no-ball ஆகும். no-ball வழங்கப்பட்டால் பேட்டிங் அணிக்கு ஒரு கூடுதல் ரன் கிடைக்கும், மேலும் அந்த டெலிவரி சட்டப்பூர்வமாக கணக்கிடப்படாது.",
      te: "నో-బాల్ అంటే బౌలర్ క్రీజ్‌ మీదికి వెళ్లి బౌల్ చేయడం, భుజం ఎత్తుకు మించి ఫుల్‌టాస్లు వేయడం లేదా బౌలింగ్ నియమాలను ఉల్లంఘించడం. నో-బాల్ అయితే బ్యాటింగ్ జట్టు ఒక అదనపు రన్‌ను పొందుతుంది మరియు ఆ డెలివరీ చెల్లుబాటైన బంతిగా కాదు.",
      de: "Ein No-Ball wird gegeben, wenn der Bowler die Linie überschreitet, ein hoher Full Toss über Schulterhöhe bowlt oder andere Bowling-Regeln verletzt. Bei einem No-Ball erhält die Schlagmannschaft einen zusätzlichen Run und der Ball zählt nicht als legaler Ball.",
    },
    sources: [
      {
        title: "MCC Law 21 - No Ball",
        url: "https://www.lords.org/mcc/the-laws-of-cricket/law-21-no-ball",
      },
      {
        title: "ICC Law summary",
        url: "https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions",
      },
    ],
    videos: [
      {
        title: "No ball explained",
        url: "https://www.youtube.com/results?search_query=cricket+no+ball+explained",
      },
      {
        title: "Bowling front foot no-ball analysis",
        url: "https://www.youtube.com/results?search_query=cricket+front+foot+no+ball+explanation",
      },
    ],
  },
  {
    id: "cover-drive",
    category: "Batting",
    question: "How do I play a cover drive?",
    keywords: ["cover drive", "driven cover", "cover shot"],
    answer: {
      en: "A cover drive is played with a straight bat, with the front foot moving toward the pitch of the ball. The shot is timed through the covers and the batter aims to keep the head still, watch the ball closely, and play it with the full face of the bat.",
      hi: "कवर ड्राइव तब खेली जाती है जब बल्ले को सीधा रखते हुए आगे का पैर गेंद की पिच की तरफ जाता है। शॉट को कवर के रास्ते में टाइम किया जाता है और बल्लेबाज अपने सिर को स्थिर रखता है, गेंद को ध्यान से देखता है और पूरे बल्ले के चेहरे से शॉट खेलता है।",
      bn: "কভার ড্রাইভ খেলা হয় সোজা ব্যাট দিয়ে, সামনের পা বলের পিচের দিকে নিয়ে যাওয়া। শটটি কভারের মধ্য দিয়ে টাইম করা হয় এবং ব্যাটার মাথা স্থির রাখে, गेंदকে ভালোভাবে দেখে এবং ব্যাটের পুরো মুখ দিয়ে শট খেলে।",
      ta: "கவர் டிரைவ் என்பது நேரான பேட்டில், முன் காலால் பந்தின் பைத்திற்கு அருகில் நகர்ந்து விளையாடப்படுகிறது. இந்த ஷாட்டை கவர் வழியாக நேரம் பார்த்து ஆடும் போது, தலை நிலையாக வைத்து, பந்தை கவனித்து, பேட்டின் முழு முகத்துடன் விளையாட வேண்டும்.",
      te: "కవర్ డ్రైవ్‌ను సూటి బ legal తప్పక straight batతో, ముందుకు కాలు బంతి పిచ్ వైపు 이동ిస్తూ ఆడతారు. ఈ షాట్‌ను కవర్‌ల మధ్య టైమ్ చేసి ఆడతారు, head steadyగా ఉంచి, బంతిని బాగా చూడటం, బాట్ ఫేస్‌తో డెలివరీ చేయడం అవసరం.",
      de: "Ein Cover Drive wird mit geraden Schläger und einem nach vorne bewegten vorderen Fuß gespielt. Der Ball wird durch die Mitte der Bedeckung zwischen Punkt und Cover gespielt, wobei der Kopf ruhig bleibt und der Ball mit der gesamten Schlägerfläche getroffen wird.",
    },
    sources: [
      {
        title: "MCC batting fundamentals and footwork",
        url: "https://www.lords.org/mcc/the-laws-of-cricket",
      },
      {
        title: "Cricket coaching articles",
        url: "https://www.icc-cricket.com/news",
      },
    ],
    videos: [
      {
        title: "Cover drive technique coaching",
        url: "https://www.youtube.com/results?search_query=cricket+cover+drive+technique",
      },
      {
        title: "Mastering cover drives",
        url: "https://www.youtube.com/results?search_query=cricket+cover+drive+coaching",
      },
    ],
  },
  {
    id: "swing-bowling",
    category: "Bowling",
    question: "What is the idea behind swing bowling?",
    keywords: ["swing bowling", "swing", "seam movement"],
    answer: {
      en: "Swing bowling is about creating lateral movement in the air by polishing one side of the ball and using seam position, wrist position, and release angle. The ball can move away or in depending on the seam and the surrounding conditions.",
      hi: "स्विंग गेंदबाजी का उद्देश्य हवा में पार्श्वीय गति बनाना है, जिसमें गेंद के एक तरफ की सतह को पॉलिश करके, सीम की स्थिति, कलाई की स्थिति और रिलीज एंगल का उपयोग किया जाता है। गेंद हवा में अंदर या बाहर की ओर घूम सकती है, यह सीम और परिस्थितियों पर निर्भर करता है।",
      bn: "সুইং বোলিং-এ বাতাসে পার্শ্বীয় গতি তৈরি করা হয়, বলের এক পাশে পালিশ করে, সিমের অবস্থান, কব্জির অবস্থান এবং রিলিজ অ্যাঙ্গেল ব্যবহার করে। বল কোন দিকে যাবে তা সিম এবং পরিস্থিতির উপর নির্ভর করে।",
      ta: "ச்விங் பந்துவீச்சு என்பது காற்றில் பக்கவாட்டாக நகர்வை உருவாக்குவதற்கானது, பந்தின் ஒரு பக்கத்தை மெருகூட்டுவதன் மூலம், சீமை, மணிக்கட்டின் நிலை மற்றும் வெளியீட்டு கோணத்தைப் பயன்படுத்துகிறது. பந்தின் நகர்வு சீம் மற்றும் சூழ்நிலையைப் பொறுத்து வெளியே அல்லது உள்ளே செல்லும்.",
      te: "స్వింగ్ బౌలింగ్‌లో గాలిలో పార్శ్వదిశలో చలనం వచ్చేలా ఒక పక్క బంతిని పాలిష్ చేసి, సీమ స్థానము, మణికట్టు స్థానం, రిలీజ్ కోణం ఉపయోగిస్తారు. బంతి కుడి/ఎడమవైపుకు కదులుతుంది, ఇది సీమ మరియు పరిస్థితులపై ఆధారపడి ఉంటుంది.",
      de: "Beim Swing-Bowling wird durch Polieren einer Ballseite, die korrekte Seam-Position und den Freigabe-Winkel seitliche Bewegung in der Luft erzeugt. Der Ball kann je nach Bedingungen nach außen oder nach innen drehen.",
    },
    sources: [
      {
        title: "BBC cricket skill guides",
        url: "https://www.bbc.co.uk/sport/cricket",
      },
      {
        title: "MCC bowling law summary",
        url: "https://www.lords.org/mcc/the-laws-of-cricket",
      },
    ],
    videos: [
      {
        title: "Swing bowling basics",
        url: "https://www.youtube.com/results?search_query=cricket+swing+bowling+basics",
      },
      {
        title: "How seam and swing work",
        url: "https://www.youtube.com/results?search_query=cricket+seam+and+swing+explained",
      },
    ],
  },
  {
    id: "off-spin",
    category: "Bowling",
    question: "How do I bowl off-spin?",
    keywords: ["off spin", "off-spin", "offspin", "off break", "off spinner"],
    answer: {
      en: "To bowl off-spin, land the ball on a good length around off stump, keep the wrist behind the ball, and use the fingers to create angle and drift. The goal is to turn the ball away from a right-handed batter and use the bounce and seam to create a wicket-taking chance.",
      hi: "ऑफ-स्पिन गेंदबाजी के लिए गेंद को ऑफ स्टंप के आसपास अच्छे लेंथ पर डालें, कलाई को गेंद के पीछे रखें, और उंगली से एंगल और ड्रिफ्ट बनाएं। लक्ष्य यह है कि गेंद को दाहिने हाथ के बल्लेबाज से दूर मोड़ें और उछाल तथा सीम का उपयोग करके विकेट लेने का मौका बनाएं।",
      bn: "অফ-স্পিন বোল করতে, অফ স্টাম্পের কাছাকাছি ভালো লেন্থে বল ফেলুন, কব্জি বলের পিছনে রাখুন, এবং আঙুল দিয়ে এंगल ও ড্রিফট তৈরি করুন। লক্ষ্য হলো ডানহাতি ব্যাটারের দিকে থেকে বলকে দূরে ঘুরিয়ে দেওয়া এবং বাউন্স ও সিমের সাহায্যে উইকেটের সুযোগ তৈরি করা।",
      ta: "ஆஃப்-ஸ்பின் பந்துவீசுவதற்கு, ஆஃப் ஸ்டம்பிற்கு அருகே நல்ல லெங்தில் பந்தை வீசுங்கள், மணிக்கட்டை பந்துக்கு பின்னால் வைத்து, விரல்களால் கோணம் மற்றும் டிரிப்ட் உருவாக்குங்கள். இலக்கு, வலது கை பேட்டருக்கு அப்பால் பந்தை திருப்புவதும், பவுன்ஸ் மற்றும் சீமைப் பயன்படுத்தி விக்கெட் வாய்ப்பை உருவாக்குவதும் ஆகும்.",
      te: "ఆఫ్-స్పిన్ బౌల్ చేయడానికి, ఆఫ్ స్టంప్ దగ్గర మంచి లెంగ్త్‌లో బంతిని పడవేయండి, మణికట్టును బంతి వెనుక ఉంచండి, మరియు వేళ్లతో కోణం మరియు డ్రిఫ్ట్‌ను సృష్టించండి. లక్ష్యం: కుడిచేతి బ్యాటర్ నుండి బంతిని వేరుగా తిప్పి, బౌన్స్ మరియు సీమను ఉపయోగించి వికెట్ అవకాశాన్ని సృష్టించడం.",
      de: "Um Off-Spin zu bowlen, sollte der Ball auf guter Länge um den Off-Stump landen, das Handgelenk hinter dem Ball bleiben und mit den Fingern Winkel und Drift erzeugen. Ziel ist es, den Ball von einem rechtshändigen Batter wegzudrehen und mit Bounc e und Seam eine Wicket-Chance zu schaffen.",
    },
    sources: [
      {
        title: "Cricket coaching basics: off-spin grip and release",
        url: "https://www.bbc.co.uk/sport/cricket",
      },
      {
        title: "Bowling fundamentals guide",
        url: "https://www.lords.org/mcc/the-laws-of-cricket",
      },
    ],
    videos: [
      {
        title: "Off-spin bowling basics",
        url: "https://www.youtube.com/results?search_query=cricket+off+spin+bowling+basics",
      },
      {
        title: "How to grip and release off-spin",
        url: "https://www.youtube.com/results?search_query=cricket+off+spin+grip+release",
      },
    ],
  },
  {
    id: "run-out",
    category: "Fielding",
    question: "What is a run-out in cricket?",
    keywords: ["run out", "run-out", "runout"],
    answer: {
      en: "A run-out happens when a fielder breaks the stumps at the wicket while the batter is outside the crease. The decision depends on whether the batter was safely grounded in the crease when the ball was dislodged or whether the fielding side completed a legal dismissal.",
      hi: "रन-आउट तब होता है जब कोई फील्डर विकेट पर स्टंप तोड़ देता है जबकि बल्लेबाज क्रिज के बाहर हो। निर्णय इस बात पर निर्भर करता है कि गेंद गिराते समय बल्लेबाज सुरक्षित रूप से क्रिज में था या फील्डिंग टीम ने वैध रूप से आउट किया।",
      bn: "রান-আউট হয় যখন একটি ফিল্ডার উইকেটের স্টাম্প ভেঙে দেয়, যখন ব্যাটার ক্রিজের বাইরে থাকে। সিদ্ধান্তের মানদণ্ড হলো ব্যাটার কি নিরাপদে ক্রিজে ছিল যখন বলটি ছাড়ানো হয়েছিল, নাকি ফিল্ডিং দল বৈধভাবে আউট করেছে।",
      ta: "ரன்-அவுட் என்பது பேட்டர் க்ரீஸுக்கு வெளியே இருக்கும்போது, ஃபீல்டர் ஸ்டம்புகளை உடைப்பது ஆகும். தீர்ப்பு பந்தை தாக்கும் நேரத்தில் பேட்டர் பாதுகாப்பாக க்ரீஸில் இருந்தாரா என்பதையும், ஃபீல்டிங் அணி சட்டப்படி அவுட் செய்ததா என்பதையும் சார்ந்துள்ளது.",
      te: "రన్-అవుట్ అంటే బాటర్ క్రేజ్‌ నుంచి బయట ఉండగా ఫీల్డర్ వికెట్ స్టంప్స్‌ కుప్పి దొరక్కుండా పడటం. తీర్పు బంతి తగిలిన సమయంలో బాటర్ సురక్షితంగా క్రేజ్‌లో ఉన్నాడా లేక ఫీల్డింగ్ జట్టు చట్టబద్ధంగా ఔట్ చేశిందా అన్న అంశంపై ఆధారపడి ఉంటుంది.",
      de: "Ein Run Out entsteht, wenn ein Fielder die Stumps entfernt, während der Batter außerhalb der Crease steht. Die Entscheidung hängt davon ab, ob der Batter zum Zeitpunkt des Ballverlustes sicher innerhalb der Crease stand und ob die Feldmannschaft die Dismissal legal vollzogen hat.",
    },
    sources: [
      {
        title: "MCC Law 38 - Run Out",
        url: "https://www.lords.org/mcc/the-laws-of-cricket/law-38-run-out",
      },
      {
        title: "Fielding principles guide",
        url: "https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions",
      },
    ],
    videos: [
      {
        title: "Run out explained",
        url: "https://www.youtube.com/results?search_query=cricket+run+out+explained",
      },
      {
        title: "How to avoid run outs",
        url: "https://www.youtube.com/results?search_query=cricket+run+out+technique+batters",
      },
    ],
  },
  {
    id: "pull-shot",
    category: "Batting",
    question: "How do I play a pull shot?",
    keywords: ["pull shot", "pull", "hook shot"],
    answer: {
      en: "A pull shot is played when the ball is short and in the hitting arc, usually from the chest height or above. The batter should keep the head still, get into a strong base, and use the top hand to control the direction while staying balanced for a clean connection.",
      hi: "पुल शॉट तब खेला जाता है जब गेंद छोटी हो और हिटिंग आर्क में हो, आमतौर पर छाती की ऊंचाई या उससे ऊपर। बल्लेबाज को सिर स्थिर रखना चाहिए, मजबूत आधार बनाना चाहिए, और सही कनेक्शन के लिए ऊपरी हाथ से दिशा को नियंत्रित करना चाहिए।",
      bn: "পুল শট খেলা হয় যখন বল ছোট হয় এবং হিটিং আর্কের মধ্যে থাকে, সাধারণত বুকের উচ্চতা বা তার উপরে। ব্যাটারকে মাথা স্থির রাখতে হবে, শক্তিশালী বেস তৈরি করতে হবে এবং পরিষ্কার সংযোগের জন্য উপরের হাত দিয়ে দিক নিয়ন্ত্রণ করতে হবে।",
      ta: "புல் ஷாட் என்பது பந்து குறுகியதாகவும் தாக்கும் கோணத்தில் இருக்கும்போது விளையாடப்படுகிறது, பொதுவாக மார்பளவு உயரத்தில் அல்லது அதற்கு மேலே. பேட்டர் தலை நிமிர்ந்திருக்க வேண்டும், உறுதியான அடித்தளத்தை உருவாக்க வேண்டும், மேலும் தூய்மையான தொடர்பிற்காக மேல் கையைப் பயன்படுத்தி திசையை கட்டுப்படுத்த வேண்டும்.",
      te: "పుల్ షాట్ బంతి చిన్నగా మరియు హిటింగ్ ఆర్క్‌లో ఉన్నప్పుడు ఆడతారు, సాధారణంగా ఛాతి ఎత్తు లేదా ఎక్కువ. బ్యాటర్ తలను నిశ్చలంగా ఉంచి, బలమైన బేస్‌లోకి రావాలి, మరియు స్పష్టమైన కనెక్షన్ కోసం టాప్ హ్యాండ్‌తో దిశను నియంత్రించాలి.",
      de: "Ein Pull Shot wird gespielt, wenn der Ball kurz ist und in den Schlagbereich fällt, meist auf Brusthöhe oder darüber. Der Batter hält den Kopf ruhig, baut eine stabile Basis auf und steuert die Richtung mit der oberen Hand für eine saubere Verbindung.",
    },
    sources: [
      { title: "Batting technique basics", url: "https://www.bbc.co.uk/sport/cricket" },
    ],
    videos: [
      { title: "How to play the pull shot", url: "https://www.youtube.com/results?search_query=cricket+pull+shot+technique" },
    ],
  },
  {
    id: "yorker",
    category: "Bowling",
    question: "What is a yorker in cricket?",
    keywords: ["yorker", "full length yorker"],
    answer: {
      en: "A yorker is a full-length delivery that aims to hit the base of the stumps or just behind the batter's toes. It is a very attacking ball because it reduces the batter's time and makes scoring difficult.",
      hi: "यॉकर एक फुल-लेंथ गेंद होती है जिसका उद्देश्य स्टंप के आधार या बल्लेबाज के पैर के पीछे लगना होता है। यह बहुत आक्रामक गेंद होती है क्योंकि यह बल्लेबाज को समय कम देती है और रन बनाना कठिन बना देती है।",
      bn: "ইয়র্কার হলো একটি ফুল-লেংথ ডেলিভারি, যা স্টাম্পের গোড়া বা ব্যাটারের পায়ের ঠিক পেছনে পড়ার লক্ষ্য রাখে। এটি খুব আক্রমণাত্মক বল, কারণ এটি ব্যাটারকে কম সময় দেয় এবং রান বানানো কঠিন করে তোলে।",
      ta: "யார்கர் என்பது முழு நீள டெலிவரி ஆகும், இது ஸ்டம்பின் அடிப்பகுதி அல்லது பேட்டரின் கால்களுக்கு பின்னால் அடித்துச் செல்லும். இது ஒரு மிகத் தாக்குதல் பந்தாகும், ஏனெனில் இது பேட்டருக்கு நேரத்தை குறைத்து, ரன் எடுப்பதை கடினமாக்குகிறது.",
      te: "యార్కర్ అంటే పూర్తి పొడవు బంతి, ఇది స్టంప్స్‌ బేస్ లేదా బాటర్ పాదాల వెనుక తగిలేలా వేసే బంతి. ఇది చాలా ఆક્રમణాత్మక బంతి, ఎందుకంటే ఇది బాటర్‌కు సమయం తగ్గించి పరుగులు 어렵하게 చేస్తుంది.",
      de: "Ein Yorker ist ein voller Ball, der gezielt auf die Basis der Stumps oder knapp hinter die Zehen des Schlagenden trifft. Er ist ein sehr aggressiver Ball, da er dem Batter wenig Zeit lässt und das Scoring erschwert.",
    },
    sources: [
      { title: "Bowling full-length variations", url: "https://www.bbc.co.uk/sport/cricket" },
    ],
    videos: [
      { title: "Yorker bowling technique", url: "https://www.youtube.com/results?search_query=cricket+yorker+bowling+technique" },
    ],
  },
  {
    id: "bouncer",
    category: "Bowling",
    question: "What is a bouncer in cricket?",
    keywords: ["bouncer", "short ball"],
    answer: {
      en: "A bouncer is a short-pitched delivery aimed above shoulder height, generally to unsettle the batter. It is permitted only if it is not too high and not dangerous, and the batter must protect themselves or play the ball carefully.",
      hi: "बाउंसर एक छोटी और ऊँची गेंद होती है जो बल्लेबाज को असहज करने के लिए ऊपर की तरफ जाती है। यह तभी सही है जब यह बहुत ऊँची या खतरनाक न हो, और बल्लेबाज को खुद की सुरक्षा के साथ सावधानी से खेलना चाहिए।",
      bn: "বাউন্সার হলো একটি শর্ট-পিচ ডেলিভারি, যা কাঁধের উপরে লক্ষ্য রেখে ফেলা হয় যাতে ব্যাটারকে অস্বস্তিতে ফেলা যায়। এটি তখনই বৈধ যদি খুব বেশি উঁচু বা বিপজ্জনক না হয়, এবং ব্যাটারকেও নিজের নিরাপত্তা নিয়ে সাবধানে খেলতে হয়।",
      ta: "பவுன்சர் என்பது தோள்பட்டிக்கு மேல் aimed short-pitched delivery ஆகும், பேட்டரை குழப்புவதற்காக. இது மிகவும் உயரமாக அல்லது ஆபத்தானதாக இல்லாவிட்டால் மட்டுமே அனுமதிக்கப்படும், மேலும் பேட்டர் தன்னைப் பாதுகாத்துக் கொண்டு கவனமாக விளையாட வேண்டும்.",
      te: "బౌన్సర్ అంటే కాలు లేదా భుజం ఎత్తుకు పైకి వెళ్లే షార్ట్-పిచ్డ్ బంతి, బాటర్‌ను కంగారు చేసేందుకు. ఇది చాలా ఎత్తుగా లేదా ప్రమాదకరంగా లేకపోతే మాత్రమే అనుమతించబడుతుంది; బాటర్ కూడా తన భద్రతను పాటిస్తూ జాగ్రత్తగా ఆడాలి.",
      de: "Ein Bouncer ist ein kurz gespielter Ball, der oberhalb der Schulterhöhe gezielt wird, um den Schlagenden zu destabilisieren. Er ist nur dann erlaubt, wenn er nicht zu hoch oder gefährlich ist; der Batter muss sich schützen und vorsichtig spielen.",
    },
    sources: [
      { title: "Short-ball bowling laws", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
    ],
    videos: [
      { title: "What is a bouncer?", url: "https://www.youtube.com/results?search_query=cricket+bouncer+explained" },
    ],
  },
  {
    id: "caught-behind",
    category: "Fielding",
    question: "What is a caught behind in cricket?",
    keywords: ["caught behind", "caught behind wicket", "caught behind cricket"],
    answer: {
      en: "A caught behind is when the wicketkeeper or a fielder catches the ball after the batter has hit it and before it touches the ground. The wicketkeeper must have control and the dismissal is only legal if the catch is clean and within the rules.",
      hi: "कैच बियॉन्ड तब होता है जब विकेटकीपर या फील्डर गेंद को बल्लेबाज द्वारा मारे जाने के बाद पकड़े, लेकिन यह जमीन से पहले पकड़ा जाए। यह dismissal तभी सही है जब कैच साफ़ हो और नियमों के अनुसार हो।",
      bn: "কেট বেকড হলো যখন উইকেটকিপার বা ফিল্ডার বলটি ব্যাটার হিট করার পরে ধরেন, কিন্তু এটি মাটি স্পর্শ করার আগে। এই আউটটি বৈধ হতে হবে যদি ক্যাচ পরিষ্কার হয় এবং নিয়ম অনুযায়ী হয়।",
      ta: "கேட்ச் பீஹைண்ட் என்பது பந்தை பேட்டர் அடித்த பிறகு, அது தரையைத் தொடுவதற்கு முன், விக்கெட் கீப்பர் அல்லது ஃபீல்டர் பிடிப்பது. கேட்ச் சுத்தமாகவும், விதிகளுக்கு உட்பட்டதாகவும் இருந்தால் மட்டுமே இந்த அவுட் செல்லுபடியாகும்.",
      te: "కాచ్ బీహైండ్ అంటే బాటర్ బంతిని కొట్టిన తర్వాత, అది నేల స్పర్శకముందే వికెట్ కీపర్ లేదా ఫీల్డర్ పట్టుకోవడం. ఈ ఔట్ సరిగ్గా మరియు నియమాలను పాటించి తీసుకున్నట్లయితే మాత్రమే చెల్లుతుంది.",
      de: "Ein Caught Behind ist, wenn der Wicketkeeper oder ein Fielder den Ball fängt, nachdem der Batter ihn geschlagen hat und bevor er den Boden berührt. Der Catch muss sauber und regelkonform erfolgen.",
    },
    sources: [
      { title: "Fielding and wicketkeeping dismissal guide", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
    ],
    videos: [
      { title: "Caught behind explained", url: "https://www.youtube.com/results?search_query=cricket+caught+behind+explained" },
    ],
  },
  {
    id: "wide-ball",
    category: "Laws",
    question: "What is a wide in cricket?",
    keywords: ["wide", "wide ball", "too wide"],
    answer: {
      en: "A wide is called when a delivery is so far outside the batter's reach that the batter cannot reasonably play it. A wide is scored as one run to the batting side and is not counted as a legal delivery.",
      hi: "वाइड तब दी जाती है जब गेंद बल्लेबाज की पहुंच से इतनी दूर होती है कि वह उसे उचित रूप से खेलने में सक्षम न हो। वाइड पर बल्लेबाजी टीम को एक रन मिलता है और यह वैध डिलीवरी नहीं गिनी जाती।",
      bn: "ওয়াইড দেওয়া হয় যখন বল ব্যাটারের নাগালের বাইরে এত দূরে থাকে যে সে তা যুক্তিসঙ্গতভাবে খেলতে পারে না। ওয়াইডে ব্যাটিং দল এক রান পায় এবং এটি বৈধ ডেলিভারি হিসেবে গণ্য হয় না।",
      ta: "வைட் என்பது பந்தை பேட்டர் எட்ட முடியாத அளவுக்கு தொலைவில் போகும்போது வழங்கப்படும். வைட் என்றால் பேட்டிங் அணிக்கு ஒரு ரன் கிடைக்கும், மேலும் அது சட்டப்பூர்வ டெலிவரி என்று கணக்கிடப்படாது.",
      te: "వైడ్ అంటే బంతి బ్యాటర్‌కు అందని దూరంలో వెళ్లిపోయినప్పుడు ఇవ్వబడే నిర్ణయం. వైడ్‌లో బ్యాటింగ్ జట్టు ఒక రన్‌ను పొందుతుంది మరియు అది చెల్లుబాటైన బంతిగా గణించబడదు.",
      de: "Ein Wide wird gegeben, wenn der Ball so weit außerhalb der Reichweite des Schlagenden liegt, dass dieser ihn nicht sinnvoll spielen kann. Ein Wide zählt als ein Run für die Schlagmannschaft und nicht als legaler Ball.",
    },
    sources: [
      { title: "MCC Law 22 - Wide Ball", url: "https://www.lords.org/mcc/the-laws-of-cricket/law-22-wide-ball" },
    ],
    videos: [
      { title: "Wide ball explained", url: "https://www.youtube.com/results?search_query=cricket+wide+ball+explained" },
    ],
  },
  {
    id: "boundary",
    category: "General",
    question: "What is a boundary in cricket?",
    keywords: ["boundary", "four", "six", "4 runs", "6 runs"],
    answer: {
      en: "A boundary is scored when the ball reaches or crosses the rope after being hit by the batter. A boundary can be four runs if the ball touches the ground before the rope, or six runs if it clears the rope in the air without touching the ground.",
      hi: "बाउंड्री तब होती है जब गेंद बल्लेबाज द्वारा हिट करने के बाद राउंडर या रोप को पार कर जाती है। अगर गेंद रोप से पहले जमीन से लगती है तो यह चार रन का होता है, और अगर हवा में बिना जमीन के रोप को पार करती है तो छह रन का होता है।",
      bn: "বাউন্ডারি হলে বল ব্যাটার দ্বারা আঘাত করার পরে রোপ পার হয়ে যায়। যদি বল রোপের আগে মাটি স্পর্শ করে তবে এটি চার রান, আর যদি আকাশে মাটি ছাড়াই রোপ পার হয় তবে ছয় রান।",
      ta: "பவுண்டரி என்பது பந்தை பேட்டர் அடித்த பிறகு, அது சர்வதேச எல்லையை கடந்து செல்வதைக் குறிக்கிறது. பந்து, கம்பத்தைத் தொடுவதற்கு முன் தரையில் படுந்தால் நான்கு ரன், காற்றில் தரையைத் தொடாமல் கடந்து சென்றால் ஆறு ரன்.",
      te: "బౌండరీ అంటే బంతి బ్యాటర్ కొట్టిన తర్వాత బోర్డర్/రోప్‌ను దాటి వెళ్లినప్పుడు. బంతి నేలపై తగిలి రోప్‌లోకి వెళ్లినట్లయితే నాలుగు రన్స్, udaraలో నేలన తాకకుండా రోప్ దాటి వెళ్లితే ఆరు రన్స్.",
      de: "Eine Boundary entsteht, wenn der Ball nach einem Schlag die Begrenzungslinie erreicht oder überschreitet. Ein Four zählt, wenn der Ball vor der Begrenzung den Boden berührt; ein Six, wenn er direkt ohne Bodenberührung über die Linie geht.",
    },
    sources: [
      { title: "Scoring in cricket", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
    ],
    videos: [
      { title: "Understanding boundaries", url: "https://www.youtube.com/results?search_query=cricket+boundary+explained" },
    ],
  },
  {
    id: "crease",
    category: "General",
    question: "What is the crease in cricket?",
    keywords: ["crease", "batting crease", "bowling crease", "popping crease"],
    answer: {
      en: "The crease is the marked line a batter must stay within to be safe and the line from which the bowler delivers the ball. A batter who steps outside the crease while running or before the ball is dislodged can be run out or judged to be out of position.",
      hi: "क्रिज वह निशान है जिस पर बल्लेबाज सुरक्षित रहने के लिए रहता है और गेंदबाज गेंद फेंकने के लिए उस पर खड़ा होता है। बल्लेबाज अगर दौड़ते समय या गेंद गिराने से पहले क्रिज से बाहर जाता है, तो रन आउट या गलत स्थिति के लिए आउट किया जा सकता है।",
      bn: "ক্রিজ হলো চিহ্নিত লাইন, যেখানে ব্যাটার নিরাপদ থাকতে হয় এবং বোলার বল ছোঁড়ার জন্য দাঁড়ায়। ব্যাটার যদি দৌড়ানোর সময় বা বল ছাড়ানোর আগে ক্রিজের বাইরে যায়, তবে রান-আউট বা ভুল অবস্থানের জন্য আউট হতে পারে।",
      ta: "க்ரீஸ் என்பது பேட்டர் பாதுகாப்பாக இருக்க வேண்டிய குறிக்கப்பட்ட கோடு மற்றும் பந்துவீச்சாளர் பந்தை வீசும் கோடு. பேட்டர் ஓடும்போது அல்லது பந்தை வீசுவதற்கு முன் க்ரீஸுக்கு வெளியே சென்றால், ரன் அவுட் அல்லது தவறான நிலைப்பாடு காரணமாக அவுட் ஆகலாம்.",
      te: "క్రీజ్ అనేది బ్యాటర్ సురక్షితంగా ఉండాల్సిన గుర్తించబడిన గీత మరియు బౌలర్ బంతిని వేశే గీత. బ్యాటర్ పరుగెత్తుతూ లేదా బంతిని వేశే ముందు క్రీజ్‌ బయటకు వెళితే రన్-అవుట్ లేదా తప్పు స్థానం కారణంగా ఔట్ అయ్యే అవకాశం ఉంటుంది.",
      de: "Die Crease ist die Markierung, innerhalb der der Batter sicher stehen muss und von der der Bowler den Ball wirft. Verläuft ein Batter außerhalb der Crease, kann er beim Rennen oder bei der Ballung durch das Wicket aus dem Spiel genommen werden.",
    },
    sources: [
      { title: "Crease and running area law", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
    ],
    videos: [
      { title: "Understanding the crease", url: "https://www.youtube.com/results?search_query=cricket+crease+explained" },
    ],
  },
  {
    id: "fielding-positions",
    category: "Fielding",
    question: "What are common fielding positions in cricket?",
    keywords: ["fielding positions", "slip", "point", "cover point", "midwicket", "square leg", "short leg", "fine leg", "long on", "long off", "third man"],
    answer: {
      en: "Common fielding positions include slip, point, cover point, midwicket, square leg, short leg, fine leg, long on, long off, and third man. These positions are chosen based on the batter's style, the bowler's line, and the fielding strategy for stopping runs or creating chances.",
      hi: "सामान्य फील्डिंग पोज़िशन में स्लिप, पॉइंट, कवर पॉइंट, मिडविकेट, स्क्वायर लेग, शॉर्ट लेग, फाइन लेग, लॉन्ग ऑन, लॉन्ग ऑफ़ और थर्ड मैन शामिल हैं। इन पोज़िशनों का चुनाव बल्लेबाज की शैली, गेंदबाज की लाइन और रन रोकने/चांस बनाने की रणनीति के आधार पर किया जाता है।",
      bn: "সাধারণ ফিল্ডিং পজিশনে রয়েছে স্লিপ, পয়েন্ট, কভার পয়েন্ট, মিডউইকেট, স্কয়ার লেগ, শর্ট লেগ, ফাইন লেগ, লং অন, লং অফ এবং থার্ড ম্যান। এই অবস্থানগুলি ব্যাটারের স্টাইল, বোলারের লাইনের উপর এবং রান থামানোর বা উইকেটের সুযোগ তৈরি করার কৌশলের উপর নির্ভর করে বেছে নেওয়া হয়।",
      ta: "சாதாரண ஃபீல்டிங் நிலைகள்: ஸ்லிப், பாயிண்ட், கவர் பாயிண்ட், மிட்விக்கெட், ஸ்கொயர் லெக், ஷார்ட் லெக், பைன் லெக், லாங் ஆன், லாங் ஆஃப் மற்றும் த்ரிட் மேன். இந்த நிலைகள் பேட்டரின் பாணி, பந்துவீச்சாளரின் கோடு மற்றும் ரன்களைத் தடுக்க/வாய்ப்புகளை உருவாக்கும் உத்தியைப் பொறுத்து தேர்ந்தெடுக்கப்படுகின்றன.",
      te: "సాధారణ ఫీల్డింగ్ పొజిషన్లు: స్లిప్, పాయింట్, కవర్ పాయింట్, మిడ్వికెట్, స్క్వేర్ లెగ్, షార్ట్ లెగ్, ఫైన్ లెగ్, లాంగ్ ఆన్, లాంగ్ ఆఫ్ మరియు థర్డ్ మాన్. ఇవి బ్యాటర్ శైలి, బౌలర్‌లైన్ మరియు పరుగులను ఆపడానికి/వికెట్ అవకాశాలను సృష్టించడానికి వ్యూహం ఆధారంగా ఎంచుకుంటారు.",
      de: "Häufige Feldpositionsnamen sind Slip, Point, Cover Point, Midwicket, Square Leg, Short Leg, Fine Leg, Long On, Long Off und Third Man. Diese Positionen werden je nach Schlagstil, Bowlinglinie und Feldstrategie gewählt.",
    },
    sources: [
      { title: "Fielding positions and strategies", url: "https://www.bbc.co.uk/sport/cricket" },
    ],
    videos: [
      { title: "Understanding fielding positions", url: "https://www.youtube.com/results?search_query=cricket+fielding+positions+explained" },
    ],
  },
  {
    id: "leg-spin",
    category: "Bowling",
    question: "What is leg-spin in cricket?",
    keywords: ["leg spin", "leg-spin", "legbreak", "leg break", "googly", "doosra", "slider"],
    answer: {
      en: "Leg-spin is a type of spin bowling where the ball is delivered with the wrist or fingers to make it turn from the leg side to the off side for a right-handed batter. Variations include the leg-break, googly, slider, and doosra, each changing the trajectory and amount of turn.",
      hi: "लेग-स्पिन गेंदबाजी का एक प्रकार है जिसमें गेंद को कलाई या उंगलियों से इस तरह से फेंका जाता है कि यह दाहिने हाथ के बल्लेबाज के लिए लेग साइड से ऑफ साइड में मुड़ जाए। इसमें लेग-ब्रेक, गूगल, स्लाइडर और डूसरा जैसी विविधताएँ शामिल हैं।",
      bn: "লেগ-স্পিন হলো স্পিন বোলিংয়ের একটি ধরনের, যেখানে বল কব্জি বা আঙুল দিয়ে এমনভাবে ফেলা হয় যাতে ডানহাতি ব্যাটারের জন্য লেগ সাইড থেকে অফ সাইডে ঘুরে যায়। এতে রয়েছে লেগ-ব্রেক, গুগলি, স্লাইডার এবং দুসরা ভ্যারিয়েশন।",
      ta: "லெக்-ஸ்பின் என்பது ஸ்பின் பந்துவீச்சின் ஒரு வகையாகும், இதில் கையை அல்லது விரல்களைப் பயன்படுத்தி பந்து வலது கை பேட்டருக்கு லெக் சைட் முதல் ஆஃப் சைட் வரை திரும்பும் வகையில் வீசப்படுகிறது. லெக்-பிரேக், கூக்லி, ஸ்லைடர், டூச்ரா போன்ற வகைகள் இதில் உள்ளன.",
      te: "లెగ్-స్పిన్ అనేది స్పిన్ బౌలింగ్ ఒక రకం, బంతిని మణికట్టు లేదా వేళ్లతో అలా వేస్తారు, అది కుడిచేతి బ్యాటర్‌కు లెగ్ సైడ్ నుండి ఆఫ్ సైడ్‌కు తిరుగుతుంది. లెగ్-బ్రేక్, గుగ్లీ, స్లైడర్, డూస్రా వంటివి ఇందులో ఉంటాయి.",
      de: "Leg-Spin ist eine Art Spin-Bowling, bei der der Ball mit Handgelenk oder Fingern so gedreht wird, dass er von der Leg-Side zur Off-Side des rechtshändigen Schlagenden abdriftet. Variationen umfassen Leg-Break, Googly, Slider und Doosra.",
    },
    sources: [
      { title: "Spin bowling fundamentals", url: "https://www.bbc.co.uk/sport/cricket" },
    ],
    videos: [
      { title: "Leg-spin basics", url: "https://www.youtube.com/results?search_query=cricket+leg+spin+basics" },
    ],
  },
  {
    id: "powerplay",
    category: "General",
    question: "What is a powerplay in cricket?",
    keywords: ["powerplay", "power play"],
    answer: {
      en: "A powerplay is a set phase of an innings in limited-overs cricket where fielding restrictions are in place. During this period, only a limited number of fielders are allowed outside the inner ring, which encourages attacking batting and more scoring opportunities.",
      hi: "पावरप्ले लिमिटेड ओवर क्रिकेट में एक निश्चित चरण होता है, जहाँ फील्डिंग पर सीमाएँ लगाई जाती हैं। इस दौरान अंदर की रिंग के बाहर केवल सीमित फील्डर को रखा जा सकता है, जिससे आक्रामक बल्लेबाजी और अधिक रन बनाने का अवसर मिलता है।",
      bn: "পাওয়ারপ্লে হলো লিমিটেড ওভারের একটি নির্দিষ্ট পর্যায়, যেখানে ফিল্ডিং-এ সীমাবদ্ধতা থাকে। এই সময়ে ভিতরের রিংয়ের বাইরে কেবল সীমিত সংখ্যক ফিল্ডার রাখা যায়, যা আক্রমণাত্মক ব্যাটিং এবং বেশি রান পাওয়ার সুযোগ তৈরি করে।",
      ta: "பவர் பிளே என்பது லிமிடெட் ஓவர் கிரிக்கெட்டில் ஒரு குறிப்பிட்ட கட்டமாகும், அப்போது ஃபீல்டிங்கில் கட்டுப்பாடுகள் இருக்கும். இந்த நேரத்தில் உள்ளார்ந்த வளையத்திற்கு வெளியே எண்ணிக்கையிடப்பட்ட ஃபீல்டர்கள் மட்டுமே இருக்க முடியும், இதனால் தாக்குதல் பேட்டிங் மற்றும் அதிக ரன்கள் கிடைக்கும்.",
      te: "పవర్‌ప్లే అనేది లిమిటెడ్ ఓవర్ల క్రికెట్‌లో ఒక నిర్దిష్ట దశ, దీనిలో ఫీల్డింగ్‌కు పరిమితులు ఉంటాయి. ఈ సమయంలో లోపలి రింగ్ వెలుపల beperkte ఫీల్డర్లు మాత్రమే ఉంటారు, ఇది ఆক্রমణాత్మక బ్యాటింగ్‌ను ప్రోత్సహిస్తుంది.",
      de: "Ein Powerplay ist eine festgelegte Phase im Limited-Overs-Cricket, in der die Feldpositionen eingeschränkt sind. In dieser Phase dürfen nur eine begrenzte Anzahl von Feldspielern außerhalb des inneren Rings stehen, was aggressives Schlagen und mehr Scoring-Chancen begünstigt.",
    },
    sources: [
      { title: "Powerplay rules in limited overs", url: "https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions" },
    ],
    videos: [
      { title: "Powerplay explained", url: "https://www.youtube.com/results?search_query=cricket+powerplay+explained" },
    ],
  },
  {
    id: "over",
    category: "General",
    question: "What is an over in cricket?",
    keywords: ["over", "six legal balls", "6-ball over"],
    answer: {
      en: "An over is a set of six legal deliveries bowled by one bowler. If a no-ball or wide is bowled, that ball does not count as a legal delivery toward the over, and the bowler must complete the remaining legal balls.",
      hi: "ओवर एक गेंदबाज द्वारा फेंकी गई छह वैध डिलीवरी का समूह होता है। अगर नो-बॉल या वाइड फेंकी जाए, तो वह गेंद ओवर में वैध डिलीवरी नहीं गिनी जाती और गेंदबाज को शेष वैध गेंदें पूरी करनी पड़ती हैं।",
      bn: "ওভার হলো একই বোলার কর্তৃক ফেলা ছয়টি বৈধ ডেলিভারির সেট। যদি নো-বল বা ওয়াইড হয়, তবে সে বল ওভারের মধ্যে বৈধ ডেলিভারি হিসেবে গণ্য হয় না এবং বোলারকে বাকি বৈধ বল পূরণ করতে হয়।",
      ta: "ஒரு ஓவர் என்பது ஒரு பந்துவீச்சாளர் வீசிய ஆறு சட்டப்பூர்வ டெலிவரிகளின் தொகுப்பாகும். நா-பால் அல்லது வைட் வீசப்பட்டால், அந்த பந்தை ஓவரில் சட்டப்பூர்வமாகக் கணக்கிட முடியாது, மேலும் பந்துவீச்சாளர் மீதமுள்ள சட்டப்பூர்வ பந்துகளை முடிக்க வேண்டும்.",
      te: "ఓవర్ అనేది ఒక బౌలర్ వేసిన ఆరు చెల్లుబాటు బంతుల సముదాయం. నో-బాల్ లేదా వైడ్ అయితే ఆ బంతి ఓవర్‌లో చెల్లుబాటు బంతిగా లెక్కించబడదు మరియు బౌలర్ మిగిలిన చెల్లుబాటు బంతులను పూర్తి చేయాలి.",
      de: "Ein Over besteht aus sechs legalen Bällen, die derselbe Bowler wirft. Bei No-Ball oder Wide zählt dieser Ball nicht als legaler Ball des Over, und der Bowler muss die verbliebenen legalen Bälle noch absolvieren.",
    },
    sources: [
      { title: "Over and bowling law", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
    ],
    videos: [
      { title: "What is an over?", url: "https://www.youtube.com/results?search_query=cricket+what+is+an+over" },
    ],
  },
];

export const unsupportedKnowledgeEntry: KnowledgeEntry = {
  id: "unsupported",
  category: "General",
  question: "Unsupported cricket question",
  keywords: [],
  answer: {
    en: "I can answer only cricket questions that are covered in this knowledge base. Please ask about a specific law, batting, bowling, fielding, or cricket match topic from the supported list.",
    hi: "मैं केवल उन क्रिकेट सवालों का जवाब दे सकता हूँ जो इस ज्ञान आधार में शामिल हैं। कृपया किसी विशेष कानून, बल्लेबाजी, गेंदबाजी, फील्डिंग या क्रिकेट मैच विषय से संबंधित प्रश्न पूछें।",
    bn: "আমি কেবল সেই ক্রিকেট প্রশ্নের উত্তর দিতে পারি যা এই জ্ঞানভান্ডারে রয়েছে। দয়া করে নির্দিষ্ট আইন, ব্যাটিং, বোলিং, ফিল্ডিং বা ক্রিকেট ম্যাচ বিষয়ের প্রশ্ন জিজ্ঞাসা করুন।",
    ta: "இந்த அறிவு அமைப்பில் உள்ள கிரிக்கெட் கேள்விகளுக்கு மட்டுமே நான் பதில் அளிக்க முடியும். தயவுசெய்து குறிப்பிட்ட விதி, பேட்டிங், பந்துவீச்சு, ஃபீல்டிங் அல்லது கிரிக்கெட் போட்டித் தலைப்புக்கு தொடர்பான கேள்வி கேளுங்கள்.",
    te: "నేను ఈ జ్ఞానంతో సహా మాత్రమే క్రికెట్ ప్రశ్నలకు సమాధానం ఇవ్వగలను. దయచేసి నిర్దిష్ట చట్టం, బ్యాటింగ్, బౌలింగ్, ఫీల్డింగ్ లేదా క్రికెట్ మ్యాచ్ విషయంపై ప్రశ్న అడగండి.",
    de: "Ich kann nur Fragen zu Themen beantworten, die in dieser Wissensbasis enthalten sind. Bitte stelle eine Frage zu einem bestimmten Regelwerk, Schlagmanöver, Bowling, Fielding oder einem Cricket-Match-Thema aus der unterstützten Auswahl.",
  },
  sources: [],
  videos: [],
};

export function getCoachReply(input: string, language: SupportedLanguage) {
  const normalized = input.trim().toLowerCase();

  if (!normalized) {
    return {
      entry: unsupportedKnowledgeEntry,
      answer: unsupportedKnowledgeEntry.answer[language] ?? unsupportedKnowledgeEntry.answer.en,
      known: false,
    };
  }

  const match = knowledgeEntries.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  );

  if (!match) {
    return {
      entry: unsupportedKnowledgeEntry,
      answer: unsupportedKnowledgeEntry.answer[language] ?? unsupportedKnowledgeEntry.answer.en,
      known: false,
    };
  }

  const answer = match.answer[language] ?? match.answer.en;

  return {
    entry: match,
    answer,
    known: true,
  };
}
