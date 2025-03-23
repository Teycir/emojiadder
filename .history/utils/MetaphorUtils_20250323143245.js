/**
 * Utilities for detecting metaphors in text
 */
class MetaphorUtils {
    constructor() {
      this.metaphorKeywords = {
        speed: {
          english: ['fast', 'quick', 'rapid', 'swift', 'hurry', 'race', 'dash', 'speed', 'accelerate', 'brisk', 'hasty', 'breakneck', 'expeditious', 'nimble', 'fleet', 'whirlwind', 'lightning', 'velocity', 'momentum', 'zip'],
          french: ['rapide', 'vite', 'fulgurant', 'prompt', 'hâte', 'course', 'sprint', 'vitesse', 'accélérer', 'véloce', 'preste', 'éclair', 'expéditif', 'agile', 'célérité', 'empressé', 'impétueux', 'prestesse', 'vélocité', 'fougue'],
          spanish: ['rápido', 'ligero', 'veloz', 'pronto', 'apresurado', 'carrera', 'esprintar', 'velocidad', 'acelerar', 'ágil', 'raudo', 'fugaz', 'vertiginoso', 'presuroso', 'diligente', 'expedito', 'impetuoso', 'súbito', 'celeridad', 'presteza'],
          italian: ['veloce', 'rapido', 'celere', 'brevi', 'fuga', 'corsa', 'scatto', 'velocità', 'accelerare', 'svelto', 'lesto', 'fulmineo', 'spedito', 'agile', 'repentino', 'sbrigativo', 'impetuoso', 'subitaneo', 'celerità', 'prontezza'],
          chinese: ['快', '迅速', '快捷', '速', '疾驰', '赛跑', '冲刺', '速度', '加速', '敏捷', '飞快', '急速', '迅猛', '矫健', '飞驰', '闪电', '急促', '风驰电掣', '迅疾', '疾速'],
          arabic: ['سريع', 'خاطف', 'عجول', 'فوري', 'تعجيل', 'سباق', 'انطلاقة', 'سرعة', 'تسارع', 'عاجل', 'متسارع', 'خفيف', 'وشيك', 'سرعان', 'متعجل', 'عجلة', 'انسياب', 'متهور', 'خفة', 'طائش'],
          turkish: ['hızlı', 'çabuk', 'süratli', 'cıvıl', 'acele', 'yarış', 'fırlamak', 'hız', 'ivmek', 'atik', 'tez', 'çevik', 'telaşlı', 'seri', 'ekspres', 'ani', 'sürat', 'yıldırım', 'akıcı', 'şimşek'],
          german: ['schnell', 'flink', 'rasch', 'säusend', 'eilig', 'Rennen', 'Sprint', 'Geschwindigkeit', 'beschleunigen', 'behände', 'hastig', 'rasant', 'zügig', 'flott', 'geschwind', 'fix', 'hurtig', 'blitzschnell', 'spurtend', 'Tempo'],
          japanese: ['速い', '迅速', '素早い', '急速', '急いで', 'レース', 'ダッシュ', '速度', '加速', '俊敏', '敏速', '高速', '疾走', '迅い', '敏捷', '瞬く間', '早足', '迅雷', '飛ぶような', '駆け足'],
          hebrew: ['מהיר', 'זריז', 'מהיר מאוד', 'מהירות', 'להאיץ', 'חטוף', 'מזורז', 'תכוף', 'נמרץ', 'חיש', 'תזזיתי', 'קליל', 'דוהר', 'מהיר כברק', 'מרוץ'],
          finnish: ['nopea', 'pikainen', 'kiireellinen', 'vilkas', 'kiire', 'juoksu', 'pulssi', 'nopeus', 'kiihdyttää', 'ripeä', 'rivakka', 'vikkelä', 'vauhdikas', 'joutuisa', 'äkillinen', 'pikaisesti', 'vauhdikkaasti', 'sukkelaan', 'lennokkaasti', 'salamana'],
          portuguese: ['rápido', 'veloz', 'ligeiro', 'apressado', 'corrida', 'arrastar', 'acelera', 'ágil', 'célere', 'fugaz', 'instantâneo', 'vertiginoso', 'expedito', 'breve', 'acelerado', 'impetuoso', 'presto', 'presteza', 'celeridade', 'prestígio'],
          swedish: ['snabb', 'kvick', 'rappt', 'skyndsam', 'jaga', 'lopp', 'springa', 'acceleration', 'flink', 'hastig', 'rask', 'snar', 'flyktig', 'expedit', 'skyndsamhet', 'snabbhet', 'tempo', 'hastighet', 'blixtsnabb', 'framfusig'],
          dutch: ['snel', 'vlug', 'rap', 'ijverig', 'haast', 'race', 'dash', 'versnellen', 'vaardig', 'kwiek', 'gezwind', 'haastig', 'gejaagd', 'ras', 'voortvarend', 'sprinten', 'ijlings', 'reppend', 'onstuimig', 'vliegensvlug']
        },
        strength: {
          english: ['strong', 'powerful', 'mighty', 'solid', 'tough', 'force', 'muscle', 'robust', 'sturdy', 'potent', 'tenacious', 'vigorous', 'formidable', 'stalwart', 'indomitable', 'fortitude', 'resilient', 'ironclad', 'unyielding', 'brawny'],
          french: ['fort', 'puissant', 'vigueur', 'solide', 'robuste', 'force', 'muscle', 'résistant', 'vigoureux', 'costaud', 'tenace', 'ferme', 'imposant', 'inébranlable', 'formidable', 'inflexible', 'indomptable', 'endurant', 'dur', 'massif'],
          spanish: ['fuerte', 'poderoso', 'potente', 'sólido', 'resistente', 'fuerza', 'músculo', 'robusto', 'vigoroso', 'firme', 'tenaz', 'recio', 'fornido', 'imponente', 'inquebrantable', 'contundente', 'férreo', 'adamantino', 'inflexible', 'pujante'],
          italian: ['forte', 'potente', 'robusto', 'solido', 'durezza', 'forza', 'muscolo', 'vigoroso', 'resistente', 'saldo', 'tenace', 'possente', 'ferreo', 'energico', 'gagliardo', 'indomito', 'impavido', 'inflessibile', 'strenuo', 'massiccio'],
          chinese: ['强大', '有力', '坚固', '刚强', '韧性', '力量', '肌肉', '强健', '强壮', '坚韧', '顽强', '刚毅', '坚忍', '健壮', '雄健', '强悍', '威猛', '牢不可破', '坚不可摧', '不屈不挠'],
          arabic: ['قوي', 'متين', 'شديد', 'صلب', 'متحمل', 'قوة', 'عضلة', 'صامد', 'جبار', 'راسخ', 'عنيد', 'قاسي', 'صلابة', 'جلد', 'بأس', 'شدة', 'عزيمة', 'بسالة', 'قوي البنية', 'لا يلين'],
          turkish: ['güçlü', 'kuvvetli', 'dayanıklı', 'sağlam', 'zor', 'kuvvet', 'kas', 'sert', 'zorlu', 'dinç', 'dirençli', 'metin', 'pekişmiş', 'etkin', 'cesur', 'pek', 'katı', 'çetin', 'gürbüz', 'metanetli'],
          german: ['stark', 'mächtig', 'kraftvoll', 'solide', 'robust', 'Kraft', 'Muskel', 'stabil', 'fest', 'widerstandsfähig', 'standhaft', 'unnachgiebig', 'unerschütterlich', 'zäh', 'stämmig', 'gewaltig', 'massiv', 'unverwüstlich', 'eisern', 'beharrlich'],
          japanese: ['強い', 'パワフル', 'たくましい', 'しっかり', '頑丈', '力', '筋肉', '堅固', '屈強', '強靭', '頑強', '強固', '強大', '逞しい', '剛健', '剛毅', '不屈', '堅実', '強悍', '頑迷'],
          hebrew: ['חזק', 'עוצמתי', 'משמעותי', 'יציב', 'קשוח', 'כוח', 'שריר', 'איתן', 'חסון', 'אדיר', 'עז', 'אמיץ', 'תקיף', 'נחוש', 'גיבור', 'עיקש', 'חסין', 'בלתי מנוצח', 'קשה עורף', 'עיקש'],
          finnish: ['voimakas', 'vahva', 'mukava', 'kestävä', 'raskas', 'voima', 'lihas', 'järeä', 'tanakka', 'luja', 'sitkeä', 'jämerä', 'mahtava', 'tukeva', 'jykevä', 'vankkumaton', 'järkkymätön', 'rautainen', 'peräänantamaton', 'karaistu'],
          portuguese: ['forte', 'poderoso', 'robusto', 'sólido', 'resistente', 'força', 'músculo', 'vigoroso', 'potente', 'firme', 'tenaz', 'rijo', 'imponente', 'possante', 'inquebrantável', 'indomável', 'inabalável', 'inflexível', 'perseverante', 'musculoso'],
          swedish: ['stark', 'kraftfull', 'mäktig', 'solid', 'tuff', 'styrka', 'muskel', 'robust', 'stadig', 'stabil', 'hård', 'orubblig', 'ståndaktig', 'ihärdig', 'obeveklig', 'seg', 'beslutsamhet', 'viljestyrka', 'uthållig', 'motståndskraftig'],
          dutch: ['sterk', 'krachtig', 'machtig', 'solide', 'taai', 'kracht', 'spier', 'robuust', 'stevig', 'onverzettelijk', 'standvastig', 'gespierd', 'stoer', 'onbuigzaam', 'vastberaden', 'resoluut', 'onverwoestbaar', 'volhardend', 'hardnekkig', 'onwrikbaar']
        },
        growth: {
          english: ['grow', 'expand', 'rise', 'develop', 'evolve', 'progress', 'advance', 'improve', 'flourish', 'thrive', 'bloom', 'prosper', 'surge', 'escalate', 'cultivate', 'mature', 'blossom', 'multiply', 'accelerate', 'augment'],
          french: ['croître', 's\'étendre', 'monter', 'développer', 'évoluer', 'progresser', 'avancer', 'améliorer', 'croissance', 'fleurir', 'prospérer', 'épanouir', 'grandir', 'amplifier', 'augmenter', 'élargir', 'enrichir', 'intensifier'],
          spanish: ['crecer', 'expandir', 'aumentar', 'desarrollar', 'evolucionar', 'progresar', 'avanzar', 'mejorar', 'crecimiento', 'florecer', 'prosperar', 'brotar', 'surgir', 'ampliar', 'cultivar', 'incrementar', 'proliferar', 'madurar'],
          italian: ['crescere', 'espandersi', 'aumentare', 'svilupparsi', 'evolvere', 'progredire', 'avanzare', 'migliorare', 'crescita', 'fiorire', 'prosperare', 'sbocciare', 'ingrandire', 'ampliarsi', 'intensificare', 'maturare'],
          chinese: ['增长', '扩展', '上升', '发展', '进化', '进步', '推进', '改善', '生长', '繁荣', '兴旺', '盛开', '兴盛', '扩大', '培养', '成熟'],
          arabic: ['ينمو', 'يتوسع', 'يرتفع', 'يتطور', 'يتغير', 'يتقدم', 'يحسن', 'نمو', 'يزدهر', 'ينتعش', 'يتفتح', 'يتعاظم', 'يتكاثر'],
          turkish: ['büyümek', 'genleşmek', 'yükselmek', 'gelişmek', 'evrimleşmek', 'ilerlemek', 'iyileşmek', 'büyüme', 'serpilmek', 'çiçeklenmek', 'yeşermek', 'güçlenmek', 'genişlemek', 'olgunlaşmak'],
          german: ['wachsen', 'expandieren', 'steigen', 'entwickeln', 'evolvieren', 'fortschreiten', 'verbessern', 'Wachstum', 'gedeihen', 'florieren', 'blühen', 'sprießen', 'zunehmen', 'vermehren', 'verstärken'],
          japanese: ['成長する', '拡大する', '上昇する', '発展する', '進化する', '進歩する', '改善する', '成長', '繁栄する', '栄える', '咲く', '興隆する', '増大する', '増加する', '伸びる'],
          hebrew: ['לגדול', 'להתרחב', 'לעלות', 'להתפתח', 'להשתנות', 'להתקדם', 'לשפר', 'צמיחה', 'לפרוח', 'לשגשג', 'להצמיח', 'להעצים', 'להרחיב'],
          finnish: ['kasvaa', 'laajentua', 'nousta', 'kehittää', 'kehittyä', 'edetä', 'parantaa', 'kasvu', 'kukoistaa', 'menestyä', 'puhjeta', 'edistyä', 'vaurastua', 'lisääntyä'],
          portuguese: ['crescer', 'expandir', 'subir', 'desenvolver', 'evoluir', 'progredir', 'melhorar', 'crescimento', 'florescer', 'prosperar', 'brotar', 'surgir', 'ampliar', 'aumentar', 'intensificar'],
          swedish: ['växa', 'utvidga', 'öka', 'utveckla', 'utvecklas', 'göra framsteg', 'förbättra', 'tillväxt', 'blomstra', 'frodas', 'spira', 'expandera', 'tillta', 'tillväxa', 'fortplanta'],
          dutch: ['groeien', 'uitbreiden', 'stijgen', 'ontwikkelen', 'evolueren', 'vorderen', 'verbeteren', 'groei', 'bloeien', 'gedijen', 'floreren', 'ontluiken', 'vermeerderen', 'toenemen', 'vergroten']
        },
        time: {
          english: ['minute', 'hour', 'day', 'week', 'month', 'year', 'time', 'deadline', 'schedule', 'moment', 'period', 'duration', 'instant', 'interval', 'occasion', 'era', 'season', 'term', 'span', 'epoch'],
          french: ['minute', 'heure', 'jour', 'semaine', 'mois', 'an', 'année', 'temps', 'date limite', 'programme', 'moment', 'période', 'durée', 'instant', 'intervalle', 'occasion', 'ère', 'saison', 'terme', 'délai'],
          spanish: ['minuto', 'hora', 'día', 'semana', 'mes', 'año', 'tiempo', 'plazo', 'horario', 'momento', 'período', 'duración', 'instante', 'intervalo', 'ocasión', 'era', 'temporada', 'término', 'lapso', 'época'],
          italian: ['minuto', 'ora', 'giorno', 'settimana', 'mese', 'anno', 'tempo', 'scadenza', 'programma', 'momento', 'periodo', 'durata', 'istante', 'intervallo', 'occasione', 'era', 'stagione', 'termine', 'arco', 'epoca'],
          chinese: ['分钟', '小时', '天', '周', '月', '年', '时间', '截止日期', '时间表', '时刻', '期间', '持续时间', '瞬间', '间隔', '场合', '时代', '季节', '期限', '跨度', '纪元'],
          arabic: ['دقيقة', 'ساعة', 'يوم', 'أسبوع', 'شهر', 'سنة', 'وقت', 'الموعد النهائي', 'جدول', 'لحظة', 'فترة', 'مدة', 'لحظة', 'فاصل', 'مناسبة', 'عصر', 'موسم', 'أجل', 'فترة زمنية', 'حقبة'],
          turkish: ['dakika', 'saat', 'gün', 'hafta', 'ay', 'yıl', 'zaman', 'son tarih', 'program', 'an', 'dönem', 'süre', 'an', 'aralık', 'vesile', 'çağ', 'mevsim', 'vade', 'süreç', 'devir'],
          german: ['Minute', 'Stunde', 'Tag', 'Woche', 'Monat', 'Jahr', 'Zeit', 'Frist', 'Zeitplan', 'Moment', 'Periode', 'Dauer', 'Augenblick', 'Intervall', 'Anlass', 'Ära', 'Jahreszeit', 'Frist', 'Zeitspanne', 'Epoche'],
          japanese: ['分', '時間', '日', '週', '月', '年', '時間', '締め切り', '予定', '瞬間', '期間', '持続時間', '瞬間', '間隔', '機会', '時代', '季節', '期限', '期間', '時代'],
          hebrew: ['דקה', 'שעה', 'יום', 'שבוע', 'חודש', 'שנה', 'זמן', 'מועד אחרון', 'לו"ז', 'רגע', 'תקופה', 'משך', 'רגע', 'מרווח', 'הזדמנות', 'עידן', 'עונה', 'מועד', 'טווח', 'תקופה'],
          finnish: ['minuutti', 'tunti', 'päivä', 'viikko', 'kuukausi', 'vuosi', 'aika', 'määräaika', 'aikataulu', 'hetki', 'jakso', 'kesto', 'hetki', 'väli', 'tilaisuus', 'aikakausi', 'vuodenaika', 'määräaika', 'ajanjakso', 'epookki'],
          portuguese: ['minuto', 'hora', 'dia', 'semana', 'mês', 'ano', 'tempo', 'prazo', 'agenda', 'momento', 'período', 'duração', 'instante', 'intervalo', 'ocasião', 'era', 'estação', 'termo', 'lapso', 'época'],
          swedish: ['minut', 'timme', 'dag', 'vecka', 'månad', 'år', 'tid', 'deadline', 'schema', 'ögonblick', 'period', 'varaktighet', 'stund', 'intervall', 'tillfälle', 'era', 'årstid', 'termin', 'tidsspann', 'epok'],
          dutch: ['minuut', 'uur', 'dag', 'week', 'maand', 'jaar', 'tijd', 'deadline', 'rooster', 'moment', 'periode', 'duur', 'ogenblik', 'interval', 'gelegenheid', 'tijdperk', 'seizoen', 'termijn', 'tijdspanne', 'epoche']
        },
        money: {
          english: ['dollar', 'cash', 'currency', 'finance', 'wealth', 'economy', 'invest', 'profit', 'money', 'coin', 'bank', 'budget', 'savings', 'debt', 'loan', 'credit', 'tax', 'income', 'payment', 'expense'],
          french: ['dollar', 'argent liquide', 'devise', 'finance', 'richesse', 'économie', 'investir', 'profit', 'argent', 'monnaie', 'banque', 'budget', 'épargne', 'dette', 'prêt', 'crédit', 'impôt', 'revenu', 'paiement', 'dépense'],
          spanish: ['dólar', 'efectivo', 'moneda', 'finanzas', 'riqueza', 'economía', 'invertir', 'beneficio', 'dinero', 'moneda', 'banco', 'presupuesto', 'ahorros', 'deuda', 'préstamo', 'crédito', 'impuesto', 'ingreso', 'pago', 'gasto'],
          italian: ['dollaro', 'contanti', 'valuta', 'finanza', 'ricchezza', 'economia', 'investire', 'profitto', 'denaro', 'moneta', 'banca', 'bilancio', 'risparmi', 'debito', 'prestito', 'credito', 'tassa', 'reddito', 'pagamento', 'spesa'],
          chinese: ['美元', '现金', '货币', '金融', '财富', '经济', '投资', '利润', '钱', '硬币', '银行', '预算', '储蓄', '债务', '贷款', '信用', '税', '收入', '支付', '费用'],
          arabic: ['دولار', 'نقد', 'عملة', 'تمويل', 'ثروة', 'اقتصاد', 'استثمار', 'ربح', 'مال', 'عملة معدنية', 'بنك', 'ميزانية', 'مدخرات', 'دين', 'قرض', 'ائتمان', 'ضريبة', 'دخل', 'دفع', 'مصروف'],
          turkish: ['dolar', 'nakit', 'para birimi', 'finans', 'servet', 'ekonomi', 'yatırım', 'kar', 'para', 'madeni para', 'banka', 'bütçe', 'tasarruf', 'borç', 'kredi', 'kredi', 'vergi', 'gelir', 'ödeme', 'gider'],
          german: ['Dollar', 'Bargeld', 'Währung', 'Finanzen', 'Reichtum', 'Wirtschaft', 'investieren', 'Gewinn', 'Geld', 'Münze', 'Bank', 'Budget', 'Ersparnisse', 'Schulden', 'Darlehen', 'Kredit', 'Steuer', 'Einkommen', 'Zahlung', 'Ausgabe'],
          japanese: ['ドル', '現金', '通貨', '金融', '富', '経済', '投資', '利益', 'お金', '硬貨', '銀行', '予算', '貯金', '借金', 'ローン', 'クレジット', '税金', '収入', '支払い', '経費'],
          hebrew: ['דולר', 'מזומן', 'מטבע', 'מימון', 'עושר', 'כלכלה', 'השקעה', 'רווח', 'כסף', 'מטבע', 'בנק', 'תקציב', 'חסכונות', 'חוב', 'הלוואה', 'אשראי', 'מס', 'הכנסה', 'תשלום', 'הוצאה'],
          finnish: ['dollari', 'käteinen', 'valuutta', 'rahoitus', 'varallisuus', 'talous', 'sijoittaa', 'voitto', 'raha', 'kolikko', 'pankki', 'budjetti', 'säästöt', 'velka', 'laina', 'luotto', 'vero', 'tulo', 'maksu', 'kulu'],
          portuguese: ['dólar', 'dinheiro', 'moeda', 'finanças', 'riqueza', 'economia', 'investir', 'lucro', 'dinheiro', 'moeda', 'banco', 'orçamento', 'poupança', 'dívida', 'empréstimo', 'crédito', 'imposto', 'rendimento', 'pagamento', 'despesa'],
          swedish: ['dollar', 'kontanter', 'valuta', 'finans', 'rikedom', 'ekonomi', 'investera', 'vinst', 'pengar', 'mynt', 'bank', 'budget', 'besparingar', 'skuld', 'lån', 'kredit', 'skatt', 'inkomst', 'betalning', 'utgift'],
          dutch: ['dollar', 'contant', 'valuta', 'financiën', 'rijkdom', 'economie', 'investeren', 'winst', 'geld', 'munt', 'bank', 'budget', 'spaargeld', 'schuld', 'lening', 'krediet', 'belasting', 'inkomen', 'betaling', 'uitgave']
        },
        success: {
          english: ['win', 'achieve', 'victory', 'triumph', 'accomplish', 'excel', 'succeed', 'success', 'achievement', 'advancement', 'progress', 'breakthrough', 'attainment', 'prosperity', 'growth', 'fulfillment', 'realization', 'mastery', 'thrive', 'prevail'],
          french: ['gagner', 'réussir', 'victoire', 'triompher', 'accomplir', 'exceller', 'réussite', 'succès', 'exploit', 'conquête', 'progression', 'percée', 'aboutissement', 'prospérité', 'croissance', 'épanouissement', 'réalisation', 'maîtrise', 'prospérer', 'prévaloir'],
          spanish: ['ganar', 'lograr', 'victoria', 'triunfar', 'cumplir', 'sobresalir', 'tener éxito', 'éxito', 'logro', 'avance', 'progreso', 'avance', 'consecución', 'prosperidad', 'crecimiento', 'realización', 'maestría', 'prosperar', 'prevalecer', 'destacar'],
          italian: ['vincere', 'raggiungere', 'vittoria', 'trionfare', 'realizzare', 'eccellere', 'avere successo', 'successo', 'conseguimento', 'avanzamento', 'progresso', 'conquista', 'realizzazione', 'prosperità', 'crescita', 'compimento', 'padronanza', 'prosperare', 'prevalere', 'eccellere'],
          chinese: ['赢', '实现', '胜利', '凯旋', '完成', '卓越', '成功', '成就', '进步', '突破', '获得', '繁荣', '发展', '实现', '掌握', '茁壮成长', '胜出', '优越', '成就', '进步'],
          arabic: ['يفوز', 'يحقق', 'نصر', 'انتصار', 'ينجز', 'يتفوق', 'ينجح', 'نجاح', 'إنجاز', 'تقدم', 'تطور', 'اختراق', 'تحقيق', 'ازدهار', 'نمو', 'تحقيق', 'إتقان', 'يزدهر', 'يسود', 'تفوق'],
          turkish: ['kazanmak', 'başarmak', 'zafer', 'triumph', 'tamamlamak', 'üstün gelmek', 'başarılı olmak', 'başarı', 'kazanım', 'ilerleme', 'gelişme', 'atılım', 'elde etme', 'refah', 'büyüme', 'gerçekleştirme', 'ustalık', 'gelişmek', 'üstün gelmek', 'başarılı olmak'],
          german: ['gewinnen', 'erreichen', 'Sieg', 'Triumph', 'vollbringen', 'hervorstechen', 'Erfolg haben', 'Erfolg', 'Errungenschaft', 'Fortschritt', 'Durchbruch', 'Erreichung', 'Wohlstand', 'Wachstum', 'Erfüllung', 'Verwirklichung', 'Meisterschaft', 'gedeihen', 'überlegen sein', 'sich durchsetzen'],
          japanese: ['勝つ', '達成する', '勝利', '凱旋', '成し遂げる', '秀でる', '成功する', '成功', '業績', '進歩', '突破', '到達', '繁栄', '成長', '達成', '実現', '熟達', '繁栄する', '勝る', '卓越する'],
          hebrew: ['לנצח', 'להשיג', 'ניצחון', 'עקב', 'להגשים', 'מצטיין', 'להצליח', 'הצלחה', 'הישג', 'התקדמות', 'פריצת דרך', 'השגה', 'שגשוג', 'צמיחה', 'הגשמה', 'מימוש', 'שליטה', 'לשגשג', 'לגבור', 'להצטיין'],
          finnish: ['voittaa', 'saavuttaa', 'voitto', 'triumfi', 'täyttää', 'erinomaisuus', 'onnistua', 'menestys', 'saavutus', 'edistyminen', 'läpimurto', 'saavuttaminen', 'vauraus', 'kasvu', 'täyttymys', 'toteutuminen', 'hallinta', 'menestyä', 'vallita', 'kunnostautua'],
          portuguese: ['vencer', 'alcançar', 'vitória', 'triunfar', 'realizar', 'excelência', 'ter sucesso', 'sucesso', 'conquista', 'avanço', 'progresso', 'avanço', 'realização', 'prosperidade', 'crescimento', 'cumprimento', 'domínio', 'prosperar', 'prevalecer', 'destacar-se'],
          swedish: ['vinna', 'uppnå', 'seger', 'triassera', 'fullfölja', 'utmärkt', 'lyckas', 'framgång', 'prestation', 'framsteg', 'genombrott', 'uppnående', 'välstånd', 'tillväxt', 'uppfyllelse', 'förverkligande', 'bemästring', 'frodas', 'härska', 'excellera'],
          dutch: ['winnen', 'bereiken', 'overwinning', 'triomferen', 'volbrengen', 'uitblinken', 'slagen', 'succes', 'prestatie', 'vooruitgang', 'doorbraak', 'verwezenlijking', 'voorspoed', 'groei', 'vervulling', 'realisatie', 'meesterschap', 'gedijen', 'zegevieren', 'excelleren']
        },
        failure: {
          english: ['fail', 'lose', 'defeat', 'loss', 'unsuccessful', 'flop', 'breakdown', 'failure', 'collapse', 'downfall', 'fiasco', 'disaster', 'setback', 'disappointment', 'debacle', 'washout', 'malfunction', 'decline', 'ruin', 'bust'],
          french: ['échouer', 'perdre', 'défaite', 'échec', 'raté', 'flop', 'effondrement', 'insuccès', 'revers', 'fiasco', 'catastrophe', 'déception', 'débâcle', 'ratage', 'panne', 'déclin', 'ruine', 'chute', 'désastre', 'mauvais résultat'],
          spanish: ['fracasar', 'perder', 'derrota', 'pérdida', 'sin éxito', 'flop', 'colapso', 'fracaso', 'caída', 'fiasco', 'catástrofe', 'decepción', 'desastre', 'revés', 'avería', 'declive', 'ruina', 'descalabro', 'tropiezo', 'desacierto'],
          italian: ['fallire', 'perdere', 'sconfitta', 'perdita', 'infruttuoso', 'flop', 'crollo', 'fallimento', 'insuccesso', 'fiasco', 'catastrofe', 'delusione', 'disfatta', 'rovescio', 'guasto', 'declino', 'rovina', 'tracollo', 'disastro', 'tonfo'],
          chinese: ['失败', '丢失', '击败', '损失', '不成功', '坍塌', '崩溃', '挫折', '垮台', '惨败', '灾难', '挫折', '失望', '败北', '故障', '衰落', '毁灭', '衰败', '倒闭', '不幸'],
          arabic: ['يفشل', 'يخسر', 'هزيمة', 'خسارة', 'غير ناجح', 'فشل', 'انهيار', 'إخفاق', 'سقوط', 'فشل ذريع', 'كارثة', 'خيبة أمل', 'نكسة', 'هزيمة نكراء', 'عطل', 'تراجع', 'دمار', 'إفلاس', 'مصيبة', 'سقوط'],
          turkish: ['başarısız', 'kaybetmek', 'mağlup', 'kayıp', 'başarısızlık', 'flop', 'çökme', 'fiyasko', 'düşüş', 'bozgun', 'felaket', 'hayal kırıklığı', 'yenilgi', 'aksama', 'arıza', 'gerileme', 'yıkım', 'iflas', 'hüsran', 'çöküş'],
          german: ['scheitern', 'verlieren', 'besiegen', 'Verlust', 'erfolglos', 'Flop', 'Zusammenbruch', 'Misserfolg', 'Niedergang', 'Fiasko', 'Katastrophe', 'Enttäuschung', 'Debakel', 'Rückschlag', 'Störung', 'Rückgang', 'Ruin', 'Pleite', 'Desaster', 'Versagen'],
          japanese: ['失敗する', '負ける', '敗北', '損失', '不成功', '失敗する', '崩壊', '失敗', '没落', '大失敗', '災害', '落胆', '大敗', '挫折', '故障', '衰退', '破滅', '倒産', '不運', '挫折'],
          hebrew: ['לכשל', 'להפסיד', 'תבוסה', 'אובדן', 'לא מצליח', 'פושט', 'קריסה', 'כישלון', 'נפילה', 'פיאסקו', 'אסון', 'אכזבה', 'מפלה', 'תקלה', 'דעיכה', 'חורבן', 'פשיטת רגל', 'מפח נפש', 'כשלון', 'נסיגה'],
          finnish: ['epäonnistua', 'häväillä', 'tappio', 'mannertua', 'epäonnistunut', 'flop', 'romahdus', 'epäonnistuminen', 'alamäki', 'fiasko', 'katastrofi', 'pettymys', 'takaisku', 'toimintahäiriö', 'rappeutuminen', 'tuho', 'konkurssi', 'vastoinkäyminen', 'epäkohta', 'kaatuminen'],
          portuguese: ['falhar', 'perder', 'derrota', 'fracasso', 'mal sucedido', 'flop', 'colapso', 'insucesso', 'queda', 'fiasco', 'catástrofe', 'decepção', 'debacle', 'revés', 'avaria', 'declínio', 'ruína', 'quebra', 'desastre', 'malogro'],
          swedish: ['misslyckas', 'förlora', 'nedslag', 'förlust', 'ohållbar', 'flopp', 'sammanbrott', 'misslyckande', 'nederlag', 'fiasko', 'katastrof', 'besvikelse', 'bakslag', 'haveri', 'nedgång', 'fall', 'ruin', 'krasch', 'katastrof', 'kollaps'],
          dutch: ['falen', 'verliezen', 'verslaan', 'verlies', 'onsuccesvol', 'flop', 'instorting', 'mislukking', 'ondergang', 'fiasco', 'ramp', 'teleurstelling', 'debacle', 'tegenslag', 'storing', 'achteruitgang', 'ondergang', 'bankroet', 'misval', 'neergang']
        },
        
        idea: {
          english: ['think', 'concept', 'notion', 'plan', 'brain', 'mind', 'thought', 'idea', 'imagine', 'insight', 'inspiration', 'vision', 'understanding', 'invention', 'conception', 'theory', 'hypothesis', 'assumption', 'blueprint', 'innovation'],
          french: ['penser', 'concept', 'idée', 'plan', 'cerveau', 'esprit', 'pensée', 'idée', 'imaginer', 'perspicacité', 'inspiration', 'vision', 'compréhension', 'invention', 'conception', 'théorie', 'hypothèse', 'supposition', 'plan', 'innovation'],
          spanish: ['pensar', 'concepto', 'noción', 'plan', 'cerebro', 'mente', 'pensamiento', 'idea', 'imaginar', 'percepción', 'inspiración', 'visión', 'entendimiento', 'invención', 'concepción', 'teoría', 'hipótesis', 'suposición', 'anteproyecto', 'innovación'],
          italian: ['pensare', 'concetto', 'nozione', 'piano', 'cervello', 'mente', 'pensiero', 'idea', 'immaginare', 'intuizione', 'ispirazione', 'visione', 'comprensione', 'invenzione', 'concezione', 'teoria', 'ipotesi', 'supposizione', 'progetto', 'innovazione'],
          chinese: ['想', '概念', '观念', '计划', '大脑', '心智', '思考', '点子', '想象', '洞察力', '灵感', '愿景', '理解', '发明', '构思', '理论', '假设', '假定', '蓝图', '创新'],
          arabic: ['يفكر', 'مفهوم', 'فكرة', 'خطة', 'دماغ', 'عقل', 'تفكير', 'فكرة', 'يتخيل', 'بصيرة', 'إلهام', 'رؤية', 'فهم', 'اختراع', 'تصور', 'نظرية', 'فرضية', 'افتراض', 'مخطط', 'ابتكار'],
          turkish: ['düşünmek', 'kavram', 'fikir', 'plan', 'beyin', 'akıl', 'düşünce', 'hayal etmek', 'anlayış', 'ilham', 'vizyon', 'anlama', 'icat', 'tasavvur', 'teori', 'hipotez', 'varsayım', 'taslak', 'yenilik', 'konsept'],
          german: ['denken', 'Konzept', 'Vorstellung', 'Plan', 'Gehirn', 'Verstand', 'Gedanke', 'Idee', 'sich vorstellen', 'Einsicht', 'Inspiration', 'Vision', 'Verständnis', 'Erfindung', 'Auffassung', 'Theorie', 'Hypothese', 'Annahme', 'Entwurf', 'Innovation'],
          japanese: ['考える', '概念', '観念', '計画', '脳', '心', '思想', 'アイデア', '想像する', '洞察力', 'インスピレーション', 'ビジョン', '理解', '発明', '構想', '理論', '仮説', '仮定', '設計図', '革新'],
          hebrew: ['לחשוב', 'קונספט', 'רעיון', 'תוכנית', 'מוח', 'שכל', 'מחשבה', 'להתבונן', 'תובנה', 'השראה', 'חזון', 'הבנה', 'המצאה', 'תפיסה', 'תאוריה', 'השערה', 'הנחה', 'תרשים', 'חידוש', 'רעיון'],
          finnish: ['ajatella', 'konsepti', 'idea', 'suunnitelma', 'aivot', 'mieli', 'ajatus', 'idea', 'kuvitella', 'oivallus', 'inspiraatio', 'visio', 'ymmärrys', 'keksintö', 'käsitys', 'teoria', 'hypoteesi', 'oletus', 'suunnitelma', 'innovaatio'],
          portuguese: ['pensar', 'conceito', 'noção', 'plano', 'cérebro', 'mente', 'pensamento', 'ideia', 'imaginar', 'percepção', 'inspiração', 'visão', 'entendimento', 'invenção', 'concepção', 'teoria', 'hipótese', 'suposição', 'projeto', 'inovação'],
          swedish: ['tänka', 'koncept', 'idé', 'plan', 'hjärna', 'sinne', 'tanke', 'idé', 'föreställa sig', 'insikt', 'inspiration', 'vision', 'förståelse', 'uppfinning', 'uppfattning', 'teori', 'hypotes', 'antagande', 'ritning', 'innovation'],
          dutch: ['denken', 'concept', 'noot', 'plan', 'hersen', 'geest', 'gedachte', 'idee', 'zich voorstellen', 'inzicht', 'inspiratie', 'visie', 'begrip', 'uitvinding', 'opvatting', 'theorie', 'hypothese', 'veronderstelling', 'blauwdruk', 'innovatie']
        },
        communication: {
          english: ['talk', 'speak', 'chat', 'message', 'call', 'discuss', 'conversation', 'communicate', 'dialogue', 'converse', 'correspond', 'exchange', 'interact', 'consult', 'brief', 'contact', 'transmit', 'convey', 'express', 'relay'],
          french: ['parler', 'discuter', 'bavarder', 'message', 'appel', 'conversation', 'communiquer', 'dialoguer', 'converser', 'correspondre', 'échanger', 'interagir', 'consulter', 'contacter', 'transmettre', 'exprimer', 'relayer', 'entretien', 'causerie', 'communication'],
          spanish: ['hablar', 'decir', 'charlar', 'mensaje', 'llamar', 'discutir', 'conversación', 'comunicar', 'dialogar', 'conversar', 'corresponder', 'intercambiar', 'interactuar', 'consultar', 'contactar', 'transmitir', 'expresar', 'platicar', 'comunicación', 'diálogo'],
          italian: ['parlare', 'dire', 'chiacchierare', 'messaggio', 'chiamare', 'discutere', 'conversazione', 'comunicare', 'dialogare', 'conversare', 'corrispondere', 'scambiare', 'interagire', 'consultare', 'contattare', 'trasmettere', 'esprimere', 'relazionare', 'comunicazione', 'interlocuzione'],
          chinese: ['谈', '说', '聊天', '消息', '呼叫', '讨论', '会话', '交流', '沟通', '对话', '交谈', '传达', '表达', '联系', '传播', '交换', '互动', '咨询', '联络', '相通'],
          arabic: ['يتحدث', 'يتكلم', 'دردشة', 'رسالة', 'اتصال', 'مناقشة', 'محادثة', 'يتواصل', 'حوار', 'مخاطبة', 'مراسلة', 'تبادل', 'تفاعل', 'استشارة', 'اتصال', 'نقل', 'تعبير', 'إرسال', 'تواصل', 'إيصال'],
          turkish: ['konuşmak', 'söylemek', 'sohbet etmek', 'mesaj', 'arama', 'tartışmak', 'konuşma', 'iletişim kurmak', 'diyalog', 'görüşmek', 'yazışmak', 'değiş tokuş', 'etkileşim', 'danışmak', 'temas etmek', 'iletmek', 'ifade etmek', 'aktarmak', 'iletişim', 'bağlantı'],
          german: ['sprechen', 'reden', 'plaudern', 'Nachricht', 'anrufen', 'diskutieren', 'Unterhaltung', 'kommunizieren', 'Dialog', 'sich unterhalten', 'korrespondieren', 'austauschen', 'interagieren', 'konsultieren', 'kontaktieren', 'übermitteln', 'ausdrücken', 'vermitteln', 'Kommunikation', 'Verständigung'],
          japanese: ['話す', 'しゃべる', 'チャット', 'メッセージ', '電話', '議論', '会話', '伝える', '対話', '会談', '通信', '交換', '交流', '相談', '連絡', '伝達', '表現', '中継', 'コミュニケーション', '意思疎通'],
          hebrew: ['לדבר', 'לשוחח', 'צ\'אט', 'הודעה', 'שיחה', 'לשוחח', 'שיחה', 'לתקשר', 'דיאלוג', 'להתכתב', 'להחליף', 'לתקשר', 'להתייעץ', 'ליצור קשר', 'להעביר', 'להביע', 'להעביר מסר', 'תקשורת', 'קשר', 'שידור'],
          finnish: ['puhua', 'keskustella', 'jutella', 'viesti', 'soittaa', 'keskustella', 'keskustelu', 'kommunikoida', 'dialogi', 'keskustella', 'kirjeenvaihto', 'vaihtaa', 'vuorovaikuttaa', 'neuvotella', 'ottaa yhteyttä', 'välittää', 'ilmaista', 'kertoa', 'viestintä', 'yhteys'],
          portuguese: ['falar', 'conversar', 'bater papo', 'mensagem', 'ligar', 'discutir', 'conversa', 'comunicar', 'diálogo', 'conversar', 'corresponder', 'trocar', 'interagir', 'consultar', 'contactar', 'transmitir', 'expressar', 'retransmitir', 'comunicação', 'intercâmbio'],
          swedish: ['tala', 'prata', 'chatta', 'meddelande', 'ring', 'diskutera', 'konversation', 'kommunicera', 'dialog', 'samtala', 'korrespondera', 'utbyta', 'interagera', 'konsultera', 'kontakta', 'överföra', 'uttrycka', 'förmedla', 'kommunikation', 'samtal'],
          dutch: ['praten', 'spreken', 'chatten', 'bericht', 'bellen', 'bespreken', 'conversatie', 'communiceren', 'dialoog', 'converseren', 'corresponderen', 'uitwisselen', 'interageren', 'raadplegen', 'contact opnemen', 'overdragen', 'uiten', 'doorgeven', 'communicatie', 'contact']
        },
        
        love: {
          english: ['love', 'romance', 'passion', 'affection', 'heart', 'adore', 'cherish', 'devotion', 'fondness', 'admiration', 'attachment', 'desire', 'infatuation', 'tenderness', 'yearning', 'adoration', 'endearment', 'care', 'treasure', 'worship'],
          french: ['amour', 'romance', 'passion', 'affection', 'cœur', 'adore', 'chérir', 'dévotion', 'tendresse', 'admiration', 'attachement', 'désir', 'engouement', 'douceur', 'envie', 'adoration', 'caresse', 'soin', 'trésor', 'vénération'],
          spanish: ['amor', 'romance', 'pasión', 'cariño', 'corazón', 'adorar', 'apreciar', 'devoción', 'ternura', 'admiración', 'apego', 'deseo', 'enamoramiento', 'terneza', 'anhelo', 'adoración', 'afecto', 'cuidado', 'tesoro', 'idolatrar'],
          italian: ['amore', 'romanza', 'passione', 'affetto', 'cuore', 'adorare', 'apprezzare', 'devozione', 'tenerezza', 'ammirazione', 'attaccamento', 'desiderio', 'infatuazione', 'dolcezza', 'brama', 'adorazione', 'affettuosità', 'cura', 'tesoro', 'venerare'],
          chinese: ['爱', '浪漫', '热情', '情感', '心', '崇拜', '珍爱', '奉献', '喜爱', '仰慕', '依恋', '渴望', '迷恋', '温柔', '向往', '爱慕', '亲昵', '关怀', '珍视', '敬仰'],
          arabic: ['حب', 'رومانسية', 'شغف', 'عاطفة', 'قلب', 'يحب', 'يعتز', 'إخلاص', 'مودة', 'إعجاب', 'تعلق', 'رغبة', 'هيام', 'حنان', 'توق', 'عشق', 'تحبب', 'رعاية', 'كنز', 'تعبد'],
          turkish: ['aşk', 'romantizm', 'tutku', 'şefkat', 'kalp', 'sevmek', 'değer vermek', 'bağlılık', 'sevgi', 'hayranlık', 'bağlanma', 'arzu', 'tutkunluk', 'yumuşaklık', 'özlem', 'tapma', 'sevecenlik', 'ilgi', 'hazine', 'tapmak'],
          german: ['Liebe', 'Romanze', 'Leidenschaft', 'Zuneigung', 'Herz', 'anbeten', 'schätzen', 'Hingabe', 'Zärtlichkeit', 'Bewunderung', 'Bindung', 'Verlangen', 'Schwärmerei', 'Sanftheit', 'Sehnsucht', 'Anbetung', 'Liebkosung', 'Fürsorge', 'Schatz', 'verehren'],
          japanese: ['愛', 'ロマンス', '情熱', '愛情', 'ハート', '崇拝する', '大切にする', '献身', '優しさ', '憧れ', '執着', '欲望', '夢中', '優しさ', '憧れ', '崇拝', '愛着', '気遣い', '宝物', '崇める'],
          hebrew: ['אהבה', 'רומנטיקה', 'תשוקה', 'חיבה', 'לב', 'להתאהב', 'לטפח', 'מסירות', 'חיבה', 'הערצה', 'היקשרות', 'תאווה', 'התאהבות', 'רכות', 'כמיהה', 'הערצה', 'חיבה', 'דאגה', 'אוצר', 'לסגוד'],
          finnish: ['rakkaus', 'romantiikka', 'into', 'kiintymys', 'sydän', 'rakastaa', 'vaalia', 'omistautuminen', 'hellyys', 'ihailu', 'kiintyminen', 'halu', 'ihastuminen', 'lempeys', 'kaipuu', 'palvonta', 'hellittely', 'huolenpito', 'aarre', 'palvoa'],
          portuguese: ['amor', 'romance', 'paixão', 'afeição', 'coração', 'adorar', 'valorizar', 'devoção', 'carinho', 'admiração', 'apego', 'desejo', 'paixonite', 'ternura', 'anseio', 'adoração', 'afago', 'cuidado', 'tesouro', 'venerar'],
          swedish: ['kärlek', 'romantik', 'passion', 'tillgivenhet', 'hjärta', 'älska', 'vårda', 'hängivenhet', 'ömhet', 'beundran', 'bundenhet', 'åtrå', 'förälskelse', 'mildhet', 'längtan', 'tillbedjan', 'ömhetsbetygelse', 'omsorg', 'skatt', 'dyrka'],
          dutch: ['liefde', 'romantiek', 'passie', 'affectie', 'hart', 'aanbid', 'koesteren', 'toewijding', 'tederheid', 'bewondering', 'gehechtheid', 'verlangen', 'verliefdheid', 'zachtheid', 'hunkering', 'aanbidding', 'liefkozing', 'zorg', 'schat', 'vereren']
        },
        journey: {
          english: ['travel', 'trip', 'adventure', 'expedition', 'quest', 'voyage', 'trek', 'journey', 'exploration', 'wandering', 'pilgrimage', 'excursion', 'tour', 'odyssey', 'wayfaring', 'sojourn', 'migration', 'safari', 'cruise', 'road trip'],
          french: ['voyager', 'excursion', 'aventure', 'expédition', 'quête', 'croisière', 'randonnée', 'parcours', 'exploration', 'errance', 'pèlerinage', 'tournée', 'odyssée', 'périple', 'séjour', 'migration', 'safari', 'traversée', 'circuit', 'itinéraire'],
          spanish: ['viajar', 'excursión', 'aventura', 'expedición', 'búsqueda', 'crucero', 'trote', 'viaje', 'exploración', 'vagabundeo', 'peregrinaje', 'gira', 'odisea', 'travesía', 'estancia', 'migración', 'safari', 'recorrido', 'itinerario', 'paseo'],
          italian: ['viaggiare', 'scalata', 'avventura', 'spedizione', 'ricerca', 'crociere', 'trekking', 'viaggio', 'esplorazione', 'vagabondaggio', 'pellegrinaggio', 'escursione', 'odissea', 'traversata', 'soggiorno', 'migrazione', 'safari', 'percorso', 'itinerario', 'gita'],
          chinese: ['旅行', '出行', '冒险', '远征', '探索', '航行', '跋涉', '旅程', '探险', '漫游', '朝圣', '游览', '奥德赛', '穿越', '逗留', '迁徙', '狩猎', '巡游', '航线', '路线'],
          arabic: ['السفر', 'رحلة', 'مغامرة', 'بعثة', 'بحث', 'رحلة بحرية', 'تنزه', 'مسيرة', 'استكشاف', 'تجوال', 'حج', 'جولة', 'ملحمة', 'عبور', 'إقامة', 'هجرة', 'سفاري', 'رحلة سياحية', 'مسار', 'طريق'],
          turkish: ['seyahat', 'gezi', 'macera', 'sefer', 'arama', 'gezinti', 'yürüyüş', 'yolculuk', 'keşif', 'dolaşma', 'hac', 'tur', 'destan', 'geçiş', 'konaklama', 'göç', 'safari', 'seyir', 'güzergah', 'rota'],
          german: ['reisen', 'Trip', 'Abenteuer', 'Expedition', 'Suche', 'Reise', 'Trekking', 'Fahrt', 'Erkundung', 'Wanderung', 'Pilgerfahrt', 'Ausflug', 'Odyssee', 'Überfahrt', 'Aufenthalt', 'Migration', 'Safari', 'Kreuzfahrt', 'Route', 'Rundreise'],
          japanese: ['旅行', '旅', '冒険', '探検', '追求', '航海', '遠足', '旅程', '探査', '放浪', '巡礼', '遠征', '長旅', '横断', '滞在', '移住', 'サファリ', '周遊', '航路', 'コース'],
          hebrew: ['לטייל', 'מסע', 'הרפתקה', 'מבצע', 'חיפוש', 'שיט', 'הליכה', 'מסע', 'חקירה', 'נדודים', 'עלייה לרגל', 'טיול', 'אודיסיאה', 'מעבר', 'שהייה', 'הגירה', 'ספארי', 'סיור', 'מסלול', 'דרך'],
          finnish: ['matkustaa', 'reissu', 'seikkailu', 'ekspeditio', 'etsintä', 'kriisi', 'vaellus', 'matka', 'tutkimus', 'vaeltelu', 'pyhiinvaellus', 'retki', 'odysseia', 'ylitys', 'oleskelu', 'muutto', 'safari', 'risteily', 'reitti', 'kierros'],
          portuguese: ['viajar', 'excursão', 'aventura', 'expedição', 'busca', 'cruzeiro', 'caminhada', 'jornada', 'exploração', 'peregrinação', 'romaria', 'passeio', 'odisseia', 'travessia', 'estadia', 'migração', 'safari', 'percurso', 'itinerário', 'circuito'],
          swedish: ['resa', 'utflykt', 'äventyr', 'expedition', 'sökande', 'kryssning', 'vandring', 'resa', 'utforskning', 'strövande', 'pilgrimsfärd', 'tur', 'odyssé', 'överfart', 'vistelse', 'migration', 'safari', 'rundtur', 'rutt', 'färdväg'],
          dutch: ['reizen', 'trip', 'avontuur', 'expeditie', 'zoektocht', 'kruisvaart', 'wandeltocht', 'reis', 'verkenning', 'zwerven', 'bedevaart', 'excursie', 'odyssee', 'oversteek', 'verblijf', 'migratie', 'safari', 'rondvaart', 'route', 'rondreis']
        },
        
        competition: {
          english: ['compete', 'contest', 'race', 'opponent', 'rival', 'challenge', 'competition', 'match', 'tournament', 'championship', 'clash', 'battle', 'bout', 'duel', 'contender', 'adversary', 'rivalry', 'contention', 'struggle', 'combat'],
          french: ['concourir', 'compétition', 'course', 'adversaire', 'rival', 'défi', 'compétition', 'match', 'tournoi', 'championnat', 'affrontement', 'bataille', 'combat', 'duel', 'concurrent', 'antagoniste', 'rivalité', 'contestation', 'lutte', 'confrontation'],
          spanish: ['competir', 'concurso', 'carrera', 'oponente', 'rival', 'desafío', 'competencia', 'partido', 'torneo', 'campeonato', 'enfrentamiento', 'batalla', 'combate', 'duelo', 'contendiente', 'adversario', 'rivalidad', 'disputa', 'lucha', 'contienda'],
          italian: ['competere', 'concorso', 'gara', 'avversario', 'rivale', 'sfida', 'competizione', 'partita', 'torneo', 'campionato', 'scontro', 'battaglia', 'incontro', 'duello', 'contendente', 'antagonista', 'rivalità', 'contesa', 'lotta', 'combattimento'],
          chinese: ['竞争', '比赛', '竞赛', '对手', '对抗', '挑战', '竞赛', '对决', '锦标赛', '冠军赛', '冲突', '战斗', '较量', '决斗', '竞争者', '敌手', '敌对', '争夺', '争斗', '较技'],
          arabic: ['تنافس', 'مسابقة', 'سباق', 'خصم', 'منافس', 'تحدي', 'منافسة', 'مباراة', 'بطولة', 'دوري', 'صدام', 'معركة', 'نزال', 'مبارزة', 'متسابق', 'خصم', 'عداوة', 'خلاف', 'صراع', 'مواجهة'],
          turkish: ['yarışmak', 'konkürans', 'koşu', 'rakip', 'muhtar', 'meydan okuma', 'yarış', 'maç', 'turnuva', 'şampiyonluk', 'çatışma', 'savaş', 'karşılaşma', 'düello', 'aday', 'hasım', 'rekabet', 'ihtilaf', 'mücadele', 'kavga'],
          german: ['wettbewerben', 'Wettkampf', 'rennen', 'Gegner', 'Rivale', 'Herausforderung', 'Wettbewerb', 'Spiel', 'Turnier', 'Meisterschaft', 'Zusammenstoß', 'Kampf', 'Gefecht', 'Duell', 'Anwärter', 'Widersacher', 'Rivalität', 'Streit', 'Ringen', 'Kampf'],
          japanese: ['競争する', 'コンテスト', 'レース', '対戦相手', 'ライバル', 'チャレンジ', '競技', '試合', 'トーナメント', '選手権', '衝突', '戦い', '勝負', '決闘', '挑戦者', '敵', '対抗意識', '論争', '闘争', '戦闘'],
          hebrew: ['להתחרה', 'תחרות', 'מרוץ', 'יריב', 'מתחרה', 'אטגר', 'תחרות', 'משחק', 'טורניר', 'אליפות', 'עימות', 'קרב', 'מאבק', 'דו-קרב', 'מתמודד', 'יריב', 'יריבות', 'מחלוקת', 'מאבק', 'מאבק'],
          finnish: ['kilpailla', 'kilpailu', 'juoksu', 'vastustaja', 'kilpakumppani', 'haaste', 'kilpailu', 'ottelu', 'turnaus', 'mestaruus', 'yhteenotto', 'taistelu', 'kamppailu', 'kaksintaistelu', 'kilpailija', 'vastustaja', 'kilpailu', 'kiista', 'kamppailu', 'konflikti'],
          portuguese: ['competir', 'concurso', 'corrida', 'oponente', 'rival', 'desafio', 'competição', 'partida', 'torneio', 'campeonato', 'confronto', 'batalha', 'combate', 'duelo', 'concorrente', 'adversário', 'rivalidade', 'disputa', 'luta', 'embate'],
          swedish: ['tävla', 'tävling', 'lopp', 'motståndare', 'rival', 'utmaning', 'tävlan', 'match', 'turnering', 'mästerskap', 'sammandrabbning', 'strid', 'kamp', 'duell', 'medtävlare', 'antagonist', 'rivalitet', 'konflikt', 'kamp', 'strid'],
          dutch: ['wedijveren', 'wedstrijd', 'race', 'tegenstander', 'rivaal', 'uitdaging', 'competitie', 'match', 'toernooi', 'kampioenschap', 'botsing', 'strijd', 'gevecht', 'duel', 'mededinger', 'tegenstander', 'rivaliteit', 'conflict', 'worsteling', 'confrontatie']
        },
        health: {
          english: ['healthy', 'wellness', 'fitness', 'medical', 'doctor', 'hospital', 'health', 'wellbeing', 'prevention', 'treatment', 'diagnosis', 'patient', 'care', 'therapy', 'rehabilitation', 'immunity', 'vitality', 'screening', 'nutrition', 'recovery'],
          french: ['sain', 'bien-être', 'forme', 'médical', 'docteur', 'hôpital', 'santé', 'prévention', 'traitement', 'diagnostic', 'patient', 'soins', 'thérapie', 'réhabilitation', 'immunité', 'vitalité', 'dépistage', 'nutrition', 'guérison', 'rétablissement'],
          spanish: ['saludable', 'bienestar', 'aptitud', 'médico', 'doctor', 'hospital', 'salud', 'prevención', 'tratamiento', 'diagnóstico', 'paciente', 'atención', 'terapia', 'rehabilitación', 'inmunidad', 'vitalidad', 'detección', 'nutrición', 'recuperación', 'curación'],
          italian: ['sano', 'benessere', 'forma', 'medico', 'dottore', 'ospedale', 'salute', 'prevenzione', 'trattamento', 'diagnosi', 'paziente', 'assistenza', 'terapia', 'riabilitazione', 'immunità', 'vitalità', 'screening', 'nutrizione', 'recupero', 'guarigione'],
          chinese: ['健康', '养生', '体适能', '医疗', '医生', '医院', '健康', '预防', '治疗', '诊断', '患者', '护理', '治疗', '康复', '免疫力', '活力', '筛查', '营养', '恢复', '康复'],
          arabic: ['صحي', 'رفاهية', 'لياقة', 'طبي', 'طبيب', 'مستشفى', 'صحة', 'وقاية', 'علاج', 'تشخيص', 'مريض', 'رعاية', 'معالجة', 'تأهيل', 'مناعة', 'حيوية', 'فحص', 'تغذية', 'شفاء', 'تعافي'],
          turkish: ['sağlıklı', 'esenlik', 'formda', 'tıbbi', 'doktor', 'hastane', 'sağlık', 'önleme', 'tedavi', 'teşhis', 'hasta', 'bakım', 'terapi', 'rehabilitasyon', 'bağışıklık', 'canlılık', 'tarama', 'beslenme', 'iyileşme', 'nekahet'],
          german: ['gesund', 'Wohlbefinden', 'Fitness', 'medizinisch', 'Arzt', 'Krankenhaus', 'Gesundheit', 'Vorbeugung', 'Behandlung', 'Diagnose', 'Patient', 'Pflege', 'Therapie', 'Rehabilitation', 'Immunität', 'Vitalität', 'Vorsorge', 'Ernährung', 'Genesung', 'Erholung'],
          japanese: ['健康', 'ウェルネス', 'フィットネス', '医療', '医者', '病院', '健康', '予防', '治療', '診断', '患者', 'ケア', '療法', 'リハビリテーション', '免疫', '活力', '検査', '栄養', '回復', '療養'],
          hebrew: ['בריא', 'רווחה', 'כושר', 'רפואי', 'רופא', 'בית חולים', 'בריאות', 'מניעה', 'טיפול', 'אבחון', 'מטופל', 'טיפול', 'תרפיה', 'שיקום', 'חיסון', 'חיוניות', 'בדיקה', 'תזונה', 'החלמה', 'התאוששות'],
          finnish: ['terveellinen', 'hyvinvointi', 'kunto', 'lääketieteellinen', 'lääkäri', 'sairaala', 'terveys', 'ehkäisy', 'hoito', 'diagnoosi', 'potilas', 'hoiva', 'terapia', 'kuntoutus', 'immuniteetti', 'elinvoima', 'seulonta', 'ravitsemus', 'toipuminen', 'palautuminen'],
          portuguese: ['saudável', 'bem-estar', 'fitness', 'médico', 'doutor', 'hospital', 'saúde', 'prevenção', 'tratamento', 'diagnóstico', 'paciente', 'cuidados', 'terapia', 'reabilitação', 'imunidade', 'vitalidade', 'rastreio', 'nutrição', 'recuperação', 'convalescença'],
          swedish: ['hälsosam', 'välmående', 'fitness', 'medicinsk', 'läkare', 'sjukhus', 'hälsa', 'förebyggande', 'behandling', 'diagnos', 'patient', 'vård', 'terapi', 'rehabilitering', 'immunitet', 'vitalitet', 'screening', 'näring', 'återhämtning', 'tillfrisknande'],
          dutch: ['gezond', 'welzijn', 'fitness', 'medisch', 'dokter', 'ziekenhuis', 'gezondheid', 'preventie', 'behandeling', 'diagnose', 'patiënt', 'zorg', 'therapie', 'revalidatie', 'immuniteit', 'vitaliteit', 'screening', 'voeding', 'herstel', 'genezing']
        },
        
        technology: {
          english: ['tech', 'digital', 'computer', 'internet', 'software', 'hardware', 'technology', 'innovation', 'artificial intelligence', 'algorithm', 'automation', 'device', 'application', 'platform', 'data', 'analytics', 'virtual', 'cloud', 'system', 'network'],
          french: ['technologie', 'numérique', 'ordinateur', 'internet', 'logiciel', 'matériel', 'technologie', 'innovation', 'intelligence artificielle', 'algorithme', 'automatisation', 'appareil', 'application', 'plateforme', 'données', 'analytique', 'virtuel', 'cloud', 'système', 'réseau'],
          spanish: ['tecnología', 'digital', 'computadora', 'internet', 'software', 'hardware', 'tecnología', 'innovación', 'inteligencia artificial', 'algoritmo', 'automatización', 'dispositivo', 'aplicación', 'plataforma', 'datos', 'analítica', 'virtual', 'nube', 'sistema', 'red'],
          italian: ['tecnologia', 'digitale', 'computer', 'internet', 'software', 'hardware', 'tecnologia', 'innovazione', 'intelligenza artificiale', 'algoritmo', 'automazione', 'dispositivo', 'applicazione', 'piattaforma', 'dati', 'analitica', 'virtuale', 'cloud', 'sistema', 'rete'],
          chinese: ['科技', '数字', '计算机', '互联网', '软件', '硬件', '技术', '创新', '人工智能', '算法', '自动化', '设备', '应用程序', '平台', '数据', '分析', '虚拟', '云', '系统', '网络'],
          arabic: ['تكنولوجيا', 'رقمي', 'حاسوب', 'إنترنت', 'برمجيات', 'أجهزة', 'تكنولوجيا', 'ابتكار', 'ذكاء اصطناعي', 'خوارزمية', 'أتمتة', 'جهاز', 'تطبيق', 'منصة', 'بيانات', 'تحليلات', 'افتراضي', 'سحابة', 'نظام', 'شبكة'],
          turkish: ['teknoloji', 'dijital', 'bilgisayar', 'internet', 'yazılım', 'donanım', 'teknoloji', 'yenilik', 'yapay zeka', 'algoritma', 'otomasyon', 'cihaz', 'uygulama', 'platform', 'veri', 'analitik', 'sanal', 'bulut', 'sistem', 'ağ'],
          german: ['Technik', 'digital', 'Computer', 'Internet', 'Software', 'Hardware', 'Technologie', 'Innovation', 'künstliche Intelligenz', 'Algorithmus', 'Automatisierung', 'Gerät', 'Anwendung', 'Plattform', 'Daten', 'Analytik', 'virtuell', 'Cloud', 'System', 'Netzwerk'],
          japanese: ['テクノロジー', 'デジタル', 'コンピューター', 'インターネット', 'ソフトウェア', 'ハードウェア', '技術', '革新', '人工知能', 'アルゴリズム', '自動化', 'デバイス', 'アプリケーション', 'プラットフォーム', 'データ', '分析', '仮想', 'クラウド', 'システム', 'ネットワーク'],
          hebrew: ['טכנולוגיה', 'דיגיטלי', 'מחשב', 'אינטרנט', 'תוכנה', 'חומרה', 'טכנולוגיה', 'חדשנות', 'בינה מלאכותית', 'אלגוריתם', 'אוטומציה', 'מכשיר', 'יישום', 'פלטפורמה', 'נתונים', 'אנליטיקה', 'וירטואלי', 'ענן', 'מערכת', 'רשת'],
          finnish: ['teknologia', 'digitaalinen', 'tietokone', 'internet', 'ohjelmisto', 'laitteisto', 'teknologia', 'innovaatio', 'tekoäly', 'algoritmi', 'automaatio', 'laite', 'sovellus', 'alusta', 'data', 'analytiikka', 'virtuaalinen', 'pilvi', 'järjestelmä', 'verkko'],
          portuguese: ['tecnologia', 'digital', 'computador', 'internet', 'software', 'hardware', 'tecnologia', 'inovação', 'inteligência artificial', 'algoritmo', 'automação', 'dispositivo', 'aplicação', 'plataforma', 'dados', 'analítica', 'virtual', 'nuvem', 'sistema', 'rede'],
          swedish: ['teknik', 'digital', 'dator', 'internet', 'mjukvara', 'hårdvara', 'teknologi', 'innovation', 'artificiell intelligens', 'algoritm', 'automatisering', 'enhet', 'applikation', 'plattform', 'data', 'analys', 'virtuell', 'moln', 'system', 'nätverk'],
          dutch: ['technologie', 'digitaal', 'computer', 'internet', 'software', 'hardware', 'technologie', 'innovatie', 'kunstmatige intelligentie', 'algoritme', 'automatisering', 'apparaat', 'applicatie', 'platform', 'gegevens', 'analytiek', 'virtueel', 'cloud', 'systeem', 'netwerk']
        },
        education: {
          english: ['learn', 'study', 'school', 'college', 'university', 'teach', 'education', 'knowledge', 'classroom', 'student', 'teacher', 'professor', 'curriculum', 'literacy', 'diploma', 'degree', 'academy', 'lecture', 'research', 'training'],
          french: ['apprendre', 'étudier', 'école', 'collège', 'université', 'enseigner', 'éducation', 'connaissance', 'salle de classe', 'étudiant', 'enseignant', 'professeur', 'programme', 'alphabétisation', 'diplôme', 'diplôme universitaire', 'académie', 'conférence', 'recherche', 'formation'],
          spanish: ['aprender', 'estudiar', 'escuela', 'colegio', 'universidad', 'enseñar', 'educación', 'conocimiento', 'aula', 'estudiante', 'maestro', 'profesor', 'plan de estudios', 'alfabetización', 'diploma', 'título', 'academia', 'conferencia', 'investigación', 'capacitación'],
          italian: ['imparare', 'studiare', 'scuola', 'college', 'università', 'insegnare', 'educazione', 'conoscenza', 'aula', 'studente', 'insegnante', 'professore', 'curriculum', 'alfabetizzazione', 'diploma', 'laurea', 'accademia', 'lezione', 'ricerca', 'formazione'],
          chinese: ['学习', '研究', '学校', '学院', '大学', '教', '教育', '知识', '教室', '学生', '教师', '教授', '课程', '识字能力', '文凭', '学位', '学院', '讲座', '研究', '培训'],
          arabic: ['تعلم', 'دراسة', 'مدرسة', 'كلية', 'جامعة', 'تعليم', 'تربية', 'معرفة', 'فصل دراسي', 'طالب', 'معلم', 'أستاذ', 'منهج', 'محو الأمية', 'شهادة', 'درجة علمية', 'أكاديمية', 'محاضرة', 'بحث', 'تدريب'],
          turkish: ['öğrenmek', 'incelemek', 'okul', 'kolej', 'üniversite', 'öğretmek', 'eğitim', 'bilgi', 'sınıf', 'öğrenci', 'öğretmen', 'profesör', 'müfredat', 'okuryazarlık', 'diploma', 'derece', 'akademi', 'ders', 'araştırma', 'eğitim'],
          german: ['lernen', 'studieren', 'Schule', 'Hochschule', 'Universität', 'lehren', 'Bildung', 'Wissen', 'Klassenzimmer', 'Student', 'Lehrer', 'Professor', 'Lehrplan', 'Alphabetisierung', 'Diplom', 'Abschluss', 'Akademie', 'Vorlesung', 'Forschung', 'Ausbildung'],
          japanese: ['学ぶ', '勉強する', '学校', '大学', '大学院', '教える', '教育', '知識', '教室', '学生', '教師', '教授', 'カリキュラム', '識字', '卒業証書', '学位', '学院', '講義', '研究', 'トレーニング'],
          hebrew: ['ללמוד', 'לחקור', 'בית ספר', 'מכללה', 'אוניברסיטה', 'ללמד', 'חינוך', 'ידע', 'כיתה', 'סטודנט', 'מורה', 'פרופסור', 'תוכנית לימודים', 'אוריינות', 'דיפלומה', 'תואר', 'אקדמיה', 'הרצאה', 'מחקר', 'הכשרה'],
          finnish: ['oppia', 'opiskella', 'koulu', 'yliopisto', 'akatemia', 'opettaa', 'koulutus', 'tieto', 'luokkahuone', 'opiskelija', 'opettaja', 'professori', 'opetussuunnitelma', 'lukutaito', 'todistus', 'tutkinto', 'akatemia', 'luento', 'tutkimus', 'koulutus'],
          portuguese: ['aprender', 'estudar', 'escola', 'faculdade', 'universidade', 'ensinar', 'educação', 'conhecimento', 'sala de aula', 'estudante', 'professor', 'catedrático', 'currículo', 'alfabetização', 'diploma', 'grau', 'academia', 'palestra', 'pesquisa', 'treinamento'],
          swedish: ['lära', 'studera', 'skola', 'högskola', 'universitet', 'undervisa', 'utbildning', 'kunskap', 'klassrum', 'student', 'lärare', 'professor', 'läroplan', 'läskunnighet', 'diplom', 'examen', 'akademi', 'föreläsning', 'forskning', 'träning'],
          dutch: ['leren', 'studeren', 'school', 'college', 'universiteit', 'onderwijzen', 'educatie', 'kennis', 'klaslokaal', 'student', 'leraar', 'professor', 'curriculum', 'geletterdheid', 'diploma', 'graad', 'academie', 'lezing', 'onderzoek', 'opleiding']
        },
        
        nature: {
          english: ['natural', 'environment', 'earth', 'forest', 'mountain', 'river', 'ocean', 'nature', 'wildlife', 'ecosystem', 'landscape', 'wilderness', 'climate', 'biodiversity', 'conservation', 'flora', 'fauna', 'habitat', 'sustainability', 'organic'],
          french: ['naturel', 'environnement', 'terre', 'forêt', 'montagne', 'rivière', 'océan', 'nature', 'faune', 'écosystème', 'paysage', 'désert', 'climat', 'biodiversité', 'conservation', 'flore', 'faune', 'habitat', 'durabilité', 'biologique'],
          spanish: ['natural', 'medio ambiente', 'tierra', 'bosque', 'montaña', 'río', 'océano', 'naturaleza', 'vida silvestre', 'ecosistema', 'paisaje', 'naturaleza salvaje', 'clima', 'biodiversidad', 'conservación', 'flora', 'fauna', 'hábitat', 'sostenibilidad', 'orgánico'],
          italian: ['naturale', 'ambiente', 'terra', 'foresta', 'montagna', 'fiume', 'oceano', 'natura', 'fauna selvatica', 'ecosistema', 'paesaggio', 'natura selvaggia', 'clima', 'biodiversità', 'conservazione', 'flora', 'fauna', 'habitat', 'sostenibilità', 'biologico'],
          chinese: ['自然', '环境', '地球', '森林', '山', '河流', '海洋', '自然', '野生动物', '生态系统', '景观', '荒野', '气候', '生物多样性', '保护', '植物群', '动物群', '栖息地', '可持续性', '有机'],
          arabic: ['طبيعي', 'بيئة', 'أرض', 'غابة', 'جبل', 'نهر', 'محيط', 'طبيعة', 'حياة برية', 'نظام بيئي', 'منظر طبيعي', 'برية', 'مناخ', 'تنوع بيولوجي', 'حفظ', 'نباتات', 'حيوانات', 'موطن', 'استدامة', 'عضوي'],
          turkish: ['doğal', 'çevre', 'yeryüzü', 'orman', 'dağ', 'nehir', 'okyanus', 'doğa', 'vahşi yaşam', 'ekosistem', 'manzara', 'vahşi doğa', 'iklim', 'biyolojik çeşitlilik', 'koruma', 'bitki örtüsü', 'hayvan', 'yaşam alanı', 'sürdürülebilirlik', 'organik'],
          german: ['natürlich', 'Umwelt', 'Erde', 'Wald', 'Berg', 'Fluss', 'Ozean', 'Natur', 'Tierwelt', 'Ökosystem', 'Landschaft', 'Wildnis', 'Klima', 'Biodiversität', 'Naturschutz', 'Flora', 'Fauna', 'Lebensraum', 'Nachhaltigkeit', 'organisch'],
          japanese: ['自然', '環境', '地球', '森', '山', '川', '海', '自然', '野生生物', '生態系', '風景', '原生地', '気候', '生物多様性', '保全', '植物相', '動物相', '生息地', '持続可能性', '有機'],
          hebrew: ['טבעי', 'סביבה', 'ארץ', 'יער', 'הר', 'נהר', 'אוקיינוס', 'טבע', 'חיות בר', 'מערכת אקולוגית', 'נוף', 'טבע פראי', 'אקלים', 'מגוון ביולוגי', 'שימור', 'צומח', 'חי', 'בית גידול', 'קיימות', 'אורגני'],
          finnish: ['luonnollinen', 'ympäristö', 'maa', 'metsä', 'vuori', 'joki', 'valtameri', 'luonto', 'luonnonvarainen', 'ekosysteemi', 'maisema', 'erämaa', 'ilmasto', 'biodiversiteetti', 'suojelu', 'kasvisto', 'eläimistö', 'elinympäristö', 'kestävyys', 'luomu'],
          portuguese: ['natural', 'ambiente', 'terra', 'floresta', 'montanha', 'rio', 'oceano', 'natureza', 'vida selvagem', 'ecossistema', 'paisagem', 'natureza selvagem', 'clima', 'biodiversidade', 'conservação', 'flora', 'fauna', 'habitat', 'sustentabilidade', 'orgânico'],
          swedish: ['naturlig', 'miljö', 'jord', 'skog', 'berg', 'flod', 'hav', 'natur', 'vilda djur', 'ekosystem', 'landskap', 'vildmark', 'klimat', 'biologisk mångfald', 'bevarande', 'flora', 'fauna', 'livsmiljö', 'hållbarhet', 'ekologisk'],
          dutch: ['natuurlijk', 'omgeving', 'aarde', 'bos', 'berg', 'rivier', 'oceaan', 'natuur', 'wildlife', 'ecosysteem', 'landschap', 'wildernis', 'klimaat', 'biodiversiteit', 'natuurbehoud', 'flora', 'fauna', 'habitat', 'duurzaamheid', 'biologisch']
        },
        celebration: {
          english: ['party', 'celebrate', 'festival', 'holiday', 'event', 'birthday', 'celebration', 'ceremony', 'feast', 'parade', 'anniversary', 'tradition', 'gathering', 'commemoration', 'ritual', 'festivity', 'jubilee', 'carnival', 'banquet', 'gala'],
          
          french: ['fête', 'célébrer', 'festival', 'vacances', 'événement', 'anniversaire', 'célébration', 'cérémonie', 'festin', 'défilé', 'commémoration', 'tradition', 'rassemblement', 'commémorer', 'rituel', 'festivité', 'jubilé', 'carnaval', 'banquet', 'gala'],
          
          spanish: ['fiesta', 'celebrar', 'festival', 'vacaciones', 'evento', 'cumpleaños', 'celebración', 'ceremonia', 'festín', 'desfile', 'aniversario', 'tradición', 'reunión', 'conmemoración', 'ritual', 'festividad', 'jubileo', 'carnaval', 'banquete', 'gala'],
          
          italian: ['festa', 'celebrare', 'festival', 'vacanza', 'evento', 'compleanno', 'celebrazione', 'cerimonia', 'banchetto', 'parata', 'anniversario', 'tradizione', 'raduno', 'commemorazione', 'rituale', 'festività', 'giubileo', 'carnevale', 'convivio', 'gala'],
          
          chinese: ['聚会', '庆祝', '节日', '假期', '活动', '生日', '庆典', '仪式', '宴会', '游行', '周年纪念', '传统', '聚集', '纪念', '仪规', '欢庆', '周年庆', '嘉年华', '盛宴', '晚会'],
          
          arabic: ['حفلة', 'يحتفل', 'مهرجان', 'عطلة', 'حدث', 'عيد ميلاد', 'احتفال', 'مراسم', 'وليمة', 'موكب', 'ذكرى سنوية', 'تقليد', 'تجمع', 'تخليد', 'طقوس', 'احتفالية', 'يوبيل', 'كرنفال', 'مأدبة', 'حفل'],
          
          turkish: ['parti', 'kutlamak', 'festival', 'tatil', 'etkinlik', 'doğum günü', 'kutlama', 'tören', 'ziyafet', 'geçit töreni', 'yıldönümü', 'gelenek', 'toplantı', 'anma', 'ritüel', 'şenlik', 'jübile', 'karnaval', 'şölen', 'gala'],
          
          german: ['Party', 'feiern', 'Festival', 'Feiertag', 'Veranstaltung', 'Geburtstag', 'Feier', 'Zeremonie', 'Festmahl', 'Parade', 'Jahrestag', 'Tradition', 'Versammlung', 'Gedenken', 'Ritual', 'Festlichkeit', 'Jubiläum', 'Karneval', 'Bankett', 'Gala'],
          
          japanese: ['パーティー', '祝う', 'フェスティバル', '休日', 'イベント', '誕生日', '祝い', '儀式', '宴会', 'パレード', '記念日', '伝統', '集まり', '記念', '儀礼', '祭典', '祝賀会', 'カーニバル', '饗宴', 'ガラ'],
          
          hebrew: ['מסיבה', 'לחגוג', 'פסטיבל', 'חג', 'אירוע', 'יום הולדת', 'חגיגה', 'טקס', 'משתה', 'מצעד', 'יום שנה', 'מסורת', 'התכנסות', 'הנצחה', 'טקסיות', 'חגיגיות', 'יובל', 'קרנבל', 'סעודה', 'נשף'],
          
          finnish: ['juhla', 'kunnioittaa', 'festivaali', 'loma', 'tapahtuma', 'syntymäpäivä', 'juhla', 'seremonia', 'pidot', 'paraati', 'vuosipäivä', 'perinne', 'kokoontuminen', 'muistojuhla', 'rituaali', 'juhlallisuus', 'riemujuhla', 'karnevaali', 'juhla-ateria', 'gaala'],
          
          portuguese: ['festa', 'celebrar', 'festival', 'feriado', 'evento', 'aniversário', 'celebração', 'cerimônia', 'banquete', 'desfile', 'comemoração', 'tradição', 'reunião', 'memória', 'ritual', 'festividade', 'jubileu', 'carnaval', 'festim', 'gala'],
          
          swedish: ['fest', 'fira', 'festival', 'semester', 'evenemang', 'födelsedag', 'firande', 'ceremoni', 'gästabud', 'parad', 'årsdag', 'tradition', 'sammankomst', 'högtidlighållande', 'ritual', 'festlighet', 'jubileum', 'karneval', 'bankett', 'gala'],
          
          dutch: ['feest', 'vieren', 'festival', 'vakantie', 'evenement', 'verjaardag', 'viering', 'ceremonie', 'feestmaal', 'parade', 'verjaardag', 'traditie', 'bijeenkomst', 'herdenking', 'ritueel', 'festiviteit', 'jubileum', 'carnaval', 'banket', 'gala']
        }
      };
    }
  
    /**
     * Find metaphorical concept in text
     * @param {Array} words - Array of words to analyze
     * @returns {string|null} - Detected metaphor or null
     */
    findMetaphor(words) {
      const matches = {};
      
      // Count occurrences of metaphorical keywords
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?;:]/g, '');
        
        for (const concept in this.metaphorKeywords) {
          const keywords = this.metaphorKeywords[concept];
          let found = false;
          if (Array.isArray(keywords)) {
            if (keywords.includes(cleanWord)) {
              found = true;
            }
          } else {
            for (const lang in keywords) {
              if (keywords[lang].includes(cleanWord)) {
                found = true;
                break;
              }
            }
          }
          if (found) {
            matches[concept] = (matches[concept] || 0) + 1;
          }
        }
      });
      
      // Find concept with most matches
      let topConcept = null;
      let maxMatches = 0;
      
      for (const concept in matches) {
        if (matches[concept] > maxMatches) {
          maxMatches = matches[concept];
          topConcept = concept;
        }
      }
      
      return topConcept;
    }
  }
  
  export default MetaphorUtils;
