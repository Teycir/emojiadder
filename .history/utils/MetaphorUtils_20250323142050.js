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
          english: ['win', 'achieve', 'victory', 'triumph', 'accomplish', 'excel', 'succeed'],
          french: ['gagner', 'réussir', 'victoire', 'triompher', 'accomplir', 'exceller', 'réussite'],
          spanish: ['ganar', 'lograr', 'victoria', 'triunfar', 'cumplir', 'sobresalir', 'tener éxito'],
          italian: ['vincere', 'raggiungere', 'vittoria', 'trionfare', 'realizzare', 'eccellere', 'avere successo'],
          chinese: ['赢', '实现', '胜利', '凯旋', '完成', '卓越', '成功'],
          arabic: ['يفوز', 'يحقق', 'نصر', 'انتصار', 'ينجز', 'يتفوق', 'ينجح'],
          turkish: ['kazanmak', 'başarmak', 'zafer', 'triumph', 'tamamlamak', 'üstün gelmek', 'başarılı olmak'],
          german: ['gewinnen', 'erreichen', 'Sieg', 'Triumph', 'vollbringen', 'hervorstechen', 'Erfolg haben'],
          japanese: ['勝つ', '達成する', '勝利', '凱旋', '成し遂げる', '秀でる', '成功する'],
          hebrew: ['לנצח', 'להשיג', 'ניצחון', 'עקב', 'להגשים', 'מצטיין', 'להצליח'],
          finnish: ['voittaa', 'saavuttaa', 'voitto', 'triumfi', 'täyttää', 'erinomaisuus', 'onnistua'],
          portuguese: ['vencer', 'alcançar', 'vitória', 'triunfar', 'realizar', 'excelência', 'ter sucesso'],
          swedish: ['vinna', 'uppnå', 'seger', 'triassera', 'fullfölja', 'utmärkt', 'lyckas'],
          dutch: ['winnen', 'bereiken', 'overwinning', 'triomferen', 'volbrengen', 'uitblinken', 'slagen']
        },
        failure: {
          english: ['fail', 'lose', 'defeat', 'loss', 'unsuccessful', 'flop', 'breakdown'],
          french: ['échouer', 'perdre', 'défaite', 'échec', 'raté', 'flop', 'effondrement'],
          spanish: ['fracasar', 'perder', 'derrota', 'pérdida', 'sin éxito', 'flop', 'colapso'],
          italian: ['fallire', 'perdere', 'sconfitta', 'perdita', 'infruttuoso', 'flop', 'crollo'],
          chinese: ['失败', '丢失', '击败', '损失', '不成功', '坍塌'],
          arabic: ['يفشل', 'يخسر', 'هزيمة', 'خسارة', 'غير ناجح', 'فشل', 'انهيار'],
          turkish: ['başarısız', 'kaybetmek', 'mağlup', 'kayıp', 'başarısızlık', 'flop', 'çökme'],
          german: ['scheitern', 'verlieren', 'besiegen', 'Verlust', 'erfolglos', 'Flop', 'Zusammenbruch'],
          japanese: ['失敗する', '負ける', '敗北', '損失', '不成功', '失敗する'],
          hebrew: ['לכשל', 'להפסיד', 'תבוסה', 'אובדן', 'לא מצליח', 'פושט', 'קריסה'],
          finnish: ['epäonnistua', 'häväillä', 'tappio', 'mannertua', 'epäonnistunut', 'flop', 'romahdus'],
          portuguese: ['falhar', 'perder', 'derrota', 'fracasso', 'mal sucedido', 'flop', 'colapso'],
          swedish: ['misslyckas', 'förlora', 'nedslag', 'förlust', 'ohållbar', 'flopp', 'sammanbrott'],
          dutch: ['falen', 'verliezen', 'verslaan', 'verlies', 'onsuccesvol', 'flop', 'instorting']
        },
        idea: {
          english: ['think', 'concept', 'notion', 'plan', 'brain', 'mind', 'thought', 'idea', 'imagine'],
          french: ['penser', 'concept', 'idée', 'plan', 'cerveau', 'esprit', 'pensée', 'idée', 'imaginer'],
          spanish: ['pensar', 'concepto', 'noción', 'plan', 'cerebro', 'mente', 'pensamiento', 'idea', 'imaginar'],
          italian: ['pensare', 'concetto', 'nozione', 'piano', 'cervello', 'mente', 'pensiero', 'idea', 'immaginare'],
          chinese: ['想', '概念', '观念', '计划', '大脑', '心智', '思考', '点子', '想象'],
          arabic: ['يفكر', 'مفهوم', 'فكرة', 'خطة', 'دماغ', 'عقل', 'تفكير', 'فكرة', 'يتخيل'],
          turkish: ['düşünmek', 'kavram', 'fikir', 'plan', 'beyin', 'akıl', 'düşünce', 'hayal etmek'],
          german: ['denken', 'Konzept', 'Vorstellung', 'Plan', 'Gehirn', 'Verstand', 'Gedanke', 'Idee', 'sich vorstellen'],
          japanese: ['考える', '概念', '観念', '計画', '脳', '心', '思想', 'アイデア', '想像する'],
          hebrew: ['לחשוב', 'קונספט', 'רעיון', 'תוכנית', 'מוח', 'שכל', 'מחשבה', 'להתבונן'],
          finnish: ['ajatella', 'konsepti', 'idea', 'suunnitelma', 'aivot', 'mieli', 'ajatus', 'idea', 'kuvitella'],
          portuguese: ['pensar', 'conceito', 'noção', 'plano', 'cérebro', 'mente', 'pensamento', 'ideia', 'imaginar'],
          swedish: ['tänka', 'koncept', 'idé', 'plan', 'hjärna', 'sinne', 'tanke', 'idé', 'föreställa sig'],
          dutch: ['denken', 'concept', 'noot', 'plan', 'hersen', 'geest', 'gedachte', 'idee', 'zich voorstellen']
        },
        communication: {
          english: ['talk', 'speak', 'chat', 'message', 'call', 'discuss', 'conversation'],
          french: ['parler', 'discuter', 'bavarder', 'message', 'appel', 'conversation'],
          spanish: ['hablar', 'decir', 'charlar', 'mensaje', 'llamar', 'discutir', 'conversación'],
          italian: ['parlare', 'dire', 'chiacchierare', 'messaggio', 'chiamare', 'discutere', 'conversazione'],
          chinese: ['谈', '说', '聊天', '消息', '呼叫', '讨论', '会话'],
          arabic: ['يتحدث', 'يتكلم', 'دردشة', 'رسالة', 'اتصال', 'مناقشة', 'محادثة'],
          turkish: ['konuşmak', 'söylemek', 'sohbet etmek', 'mesaj', 'arama', 'tartışmak', 'konuşma'],
          german: ['sprechen', 'reden', 'plaudern', 'Nachricht', 'anrufen', 'diskutieren', 'Unterhaltung'],
          japanese: ['話す', 'しゃべる', 'チャット', 'メッセージ', '電話', '議論', '会話'],
          hebrew: ['לדבר', 'לשוחח', 'צ\'אט', 'הודעה', 'שיחה', 'לשוחח', 'שיחה'],
          finnish: ['puhua', 'keskustella', 'jutella', 'viesti', 'soittaa', 'keskustella', 'keskustelu'],
          portuguese: ['falar', 'conversar', 'bater papo', 'mensagem', 'ligar', 'discutir', 'conversa'],
          swedish: ['tala', 'prata', 'chatta', 'meddelande', 'ring', 'diskutera', 'konversation'],
          dutch: ['praten', 'spreken', 'chatten', 'bericht', 'bellen', 'bespreken', 'conversatie']
        },
        love: {
          english: ['love', 'romance', 'passion', 'affection', 'heart', 'adore', 'cherish'],
          french: ['amour', 'romance', 'passion', 'affection', 'cœur', 'adore', 'chérir'],
          spanish: ['amor', 'romance', 'pasión', 'cariño', 'corazón', 'adorar', 'apreciar'],
          italian: ['amore', 'romanza', 'passione', 'affetto', 'cuore', 'adorare', 'apprezzare'],
          chinese: ['爱', '浪漫', '热情', '情感', '心', '崇拜', '珍爱'],
          arabic: ['حب', 'رومانسية', 'شغف', 'عاطفة', 'قلب', 'يحب', 'يعتز'],
          turkish: ['aşk', 'romantizm', 'tutku', 'şefkat', 'kalp', 'sevmek', 'değer vermek'],
          german: ['Liebe', 'Romanze', 'Leidenschaft', 'Zuneigung', 'Herz', 'anbeten', 'schätzen'],
          japanese: ['愛', 'ロマンス', '情熱', '愛情', 'ハート', '崇拝する', '大切にする'],
          hebrew: ['אהבה', 'רומנטיקה', 'תשוקה', 'חיבה', 'לב', 'להתאהב', 'לטפח'],
          finnish: ['rakkaus', 'romantiikka', 'into', 'kiintymys', 'sydän', 'rakastaa', 'vaalia'],
          portuguese: ['amor', 'romance', 'paixão', 'afeição', 'coração', 'adorar', 'valorizar'],
          swedish: ['kärlek', 'romantik', 'passion', 'tillgivenhet', 'hjärta', 'älska', 'vårda'],
          dutch: ['liefde', 'romantiek', 'passie', 'affectie', 'hart', 'aanbid', 'koesteren']
        },
        journey: {
          english: ['travel', 'trip', 'adventure', 'expedition', 'quest', 'voyage', 'trek', 'journey'],
          french: ['voyager', 'excursion', 'aventure', 'expédition', 'quête', 'croisière', 'randonnée', 'parcours'],
          spanish: ['viajar', 'excursión', 'aventura', 'expedición', 'búsqueda', 'crucero', 'trote', 'viaje'],
          italian: ['viaggiare', 'scalata', 'avventura', 'spedizione', 'ricerca', 'crociere', 'trekking', 'viaggio'],
          chinese: ['旅行', '出行', '冒险', '远征', '探索', '航行', '跋涉', '旅程'],
          arabic: ['السفر', 'رحلة', 'مغامرة', 'بعثة', 'بحث', 'رحلة بحرية', 'تنزه', 'مسيرة'],
          turkish: ['seyahat', 'gezi', 'macera', 'sefer', 'arama', 'gezinti', 'yürüyüş', 'yolculuk'],
          german: ['reisen', 'Trip', 'Abenteuer', 'Expedition', 'Suche', 'Reise', 'Trekking', 'Fahrt'],
          japanese: ['旅行', '旅', '冒険', '探検', '追求', '航海', '遠足', '旅程'],
          hebrew: ['לטייל', 'מסע', 'הרפתקה', 'מבצע', 'חיפוש', 'שיט', 'הליכה', 'מסע'],
          finnish: ['matkustaa', 'reissu', 'seikkailu', 'ekspeditio', 'etsintä', 'kriisi', 'vaellus', 'matka'],
          portuguese: ['viajar', 'excursão', 'aventura', 'expedição', 'busca', 'cruzeiro', 'caminhada', 'jornada'],
          swedish: ['resa', 'utflykt', 'äventyr', 'expedition', 'sökande', 'kryssning', 'vandring', 'resa'],
          dutch: ['reizen', 'trip', 'avontuur', 'expeditie', 'zoektocht', 'kruisvaart', 'wandeltocht', 'reis']
        },
        competition: {
          english: ['compete', 'contest', 'race', 'opponent', 'rival', 'challenge', 'competition'],
          french: ['concourir', 'compétition', 'course', 'adversaire', 'rival', 'défi', 'compétition'],
          spanish: ['competir', 'concurso', 'carrera', 'oponente', 'rival', 'desafío', 'competencia'],
          italian: ['competere', 'concorso', 'gara', 'avversario', 'rivale', 'sfida', 'competizione'],
          chinese: ['竞争', '比赛', '竞赛', '对手', '对抗', '挑战', '竞赛'],
          arabic: ['تنافس', 'مسابقة', 'سباق', 'خصم', 'منافس', 'تحدي', 'منافسة'],
          turkish: ['yarışmak', 'konkürans', 'koşu', 'rakip', 'muhtar', 'meydan okuma', 'yarış'],
          german: ['wettbewerben', 'Wettkampf', 'rennen', 'Gegner', 'Rivale', 'Herausforderung', 'Wettbewerb'],
          japanese: ['競争する', 'コンテスト', 'レース', '対戦相手', 'ライバル', 'チャレンジ', '競技'],
          hebrew: ['להתחרה', 'תחרות', 'מרוץ', 'יריב', 'מתחרה', 'אטגר', 'תחרות'],
          finnish: ['kilpailla', 'kilpailu', 'juoksu', 'vastustaja', 'kilpakumppani', 'haaste', 'kilpailu'],
          portuguese: ['competir', 'concurso', 'corrida', 'oponente', 'rival', 'desafio', 'competição'],
          swedish: ['tävla', 'tävling', 'lopp', 'motståndare', 'rival', 'utmaning', 'tävlan'],
          dutch: ['wedijveren', 'wedstrijd', 'race', 'tegenstander', 'rivaal', 'uitdaging', 'competitie']
        },
        health: {
          english: ['healthy', 'wellness', 'fitness', 'medical', 'doctor', 'hospital', 'health'],
          french: ['sain', 'bien-être', 'forme', 'médical', 'docteur', 'hôpital', 'santé'],
          spanish: ['saludable', 'bienestar', 'aptitud', 'médico', 'doctor', 'hospital', 'salud'],
          italian: ['sano', 'benessere', 'forma', 'medico', 'dottore', 'ospedale', 'salute'],
          chinese: ['健康', '养生', '体适能', '医疗', '医生', '医院', '健康'],
          arabic: ['صحي', 'رفاهية', 'لياقة', 'طبي', 'طبيب', 'مستشفى', 'صحة'],
          turkish: ['sağlıklı', 'esenlik', 'formda', 'tıbbi', 'doktor', 'hastane', 'sağlık'],
          german: ['gesund', 'Wohlbefinden', 'Fitness', 'medizinisch', 'Arzt', 'Krankenhaus', 'Gesundheit'],
          japanese: ['健康', 'ウェルネス', 'フィットネス', '医療', '医者', '病院', '健康'],
          hebrew: ['בריא', 'רווחה', 'כושר', 'רפואי', 'רופא', 'בית חולים', 'בריאות'],
          finnish: ['terveellinen', 'hyvinvointi', 'kunto', 'lääketieteellinen', 'lääkäri', 'sairaala', 'terveys'],
          portuguese: ['saudável', 'bem-estar', 'fitness', 'médico', 'doutor', 'hospital', 'saúde'],
          swedish: ['hälsosam', 'välmående', 'fitness', 'medicinsk', 'läkare', 'sjukhus', 'hälsa'],
          dutch: ['gezond', 'welzijn', 'fitness', 'medisch', 'dokter', 'ziekenhuis', 'gezondheid']
        },
        technology: {
          english: ['tech', 'digital', 'computer', 'internet', 'software', 'hardware', 'technology'],
          french: ['technologie', 'numérique', 'ordinateur', 'internet', 'logiciel', 'matériel', 'technologie'],
          spanish: ['tecnología', 'digital', 'computadora', 'internet', 'software', 'hardware', 'tecnología'],
          italian: ['tecnologia', 'digitale', 'computer', 'internet', 'software', 'hardware', 'tecnologia'],
          chinese: ['科技', '数字', '计算机', '互联网', '软件', '硬件', '技术'],
          arabic: ['تكنولوجيا', 'رقمي', 'حاسوب', 'إنترنت', 'برمجيات', 'أجهزة', 'تكنولوجيا'],
          turkish: ['teknoloji', 'dijital', 'bilgisayar', 'internet', 'yazılım', 'donanım', 'teknoloji'],
          german: ['Technik', 'digital', 'Computer', 'Internet', 'Software', 'Hardware', 'Technologie'],
          japanese: ['テクノロジー', 'デジタル', 'コンピューター', 'インターネット', 'ソフトウェア', 'ハードウェア', '技術'],
          hebrew: ['טכנולוגיה', 'דיגיטלי', 'מחשב', 'אינטרנט', 'תוכנה', 'חומרה', 'טכנולוגיה'],
          finnish: ['teknologia', 'digitaalinen', 'tietokone', 'internet', 'ohjelmisto', 'laitteisto', 'teknologia'],
          portuguese: ['tecnologia', 'digital', 'computador', 'internet', 'software', 'hardware', 'tecnologia'],
          swedish: ['teknik', 'digital', 'dator', 'internet', 'mjukvara', 'hårdvara', 'teknologi'],
          dutch: ['technologie', 'digitaal', 'computer', 'internet', 'software', 'hardware', 'technologie']
        },
        education: {
          english: ['learn', 'study', 'school', 'college', 'university', 'teach', 'education'],
          french: ['apprendre', 'étudier', 'école', 'collège', 'université', 'enseigner', 'éducation'],
          spanish: ['aprender', 'estudiar', 'escuela', 'colegio', 'universidad', 'enseñar', 'educación'],
          italian: ['imparare', 'studiare', 'scuola', 'college', 'università', 'insegnare', 'educazione'],
          chinese: ['学习', '研究', '学校', '学院', '大学', '教', '教育'],
          arabic: ['يتعلم', 'يدرس', 'مدرسة', 'كلية', 'جامعة', 'يعلم', 'تعليم'],
          turkish: ['öğrenmek', 'çalışmak', 'okul', 'kolej', 'üniversite', 'öğretmek', 'eğitim'],
          german: ['lernen', 'studieren', 'Schule', 'College', 'Universität', 'lehren', 'Bildung'],
          japanese: ['学ぶ', '勉強する', '学校', '大学', '大学院', '教える', '教育'],
          hebrew: ['ללמוד', 'לחקור', 'בית ספר', 'מכללה', 'אוניברסיטה', 'ללמד', 'חינוך'],
          finnish: ['oppia', 'opiskella', 'koulu', 'yliopisto', 'akatemia', 'opettaa', 'koulutus'],
          portuguese: ['aprender', 'estudar', 'escola', 'faculdade', 'universidade', 'ensinar', 'educação'],
          swedish: ['lära', 'studera', 'skola', 'högskola', 'universitet', 'undervisa', 'utbildning'],
          dutch: ['leren', 'studeren', 'school', 'college', 'universiteit', 'onderwijzen', 'educatie']
        },
        nature: {
          english: ['natural', 'environment', 'earth', 'forest', 'mountain', 'river', 'ocean', 'nature'],
          french: ['naturel', 'environnement', 'terre', 'forêt', 'montagne', 'rivière', 'océan', 'nature'],
          spanish: ['natural', 'medio ambiente', 'tierra', 'bosque', 'montaña', 'río', 'océano', 'naturaleza'],
          italian: ['naturale', 'ambiente', 'terra', 'foresta', 'montagna', 'fiume', 'oceano', 'natura'],
          chinese: ['自然', '环境', '地球', '森林', '山', '河流', '海洋', '自然'],
          arabic: ['طبيعي', 'بيئة', 'أرض', 'غابة', 'جبل', 'نهر', 'محيط', 'طبيعة'],
          turkish: ['doğal', 'çevre', 'yeryüzü', 'orman', 'dağ', 'nehir', 'okyanus', 'doğa'],
          german: ['natürlich', 'Umwelt', 'Erde', 'Wald', 'Berg', 'Fluss', 'Ozean', 'Natur'],
          japanese: ['自然', '環境', '地球', '森', '山', '川', '海', '自然'],
          hebrew: ['טבעי', 'סביבה', 'ארץ', 'יער', 'הר', 'נהר', 'אוקיינוס', 'טבע'],
          finnish: ['luonnollinen', 'ympäristö', 'maa', 'metsä', 'vuori', 'joki', 'valtameri', 'luonto'],
          portuguese: ['natural', 'ambiente', 'terra', 'floresta', 'montanha', 'rio', 'oceano', 'natureza'],
          swedish: ['naturlig', 'miljö', 'jord', 'skog', 'berg', 'flod', 'hav', 'natur'],
          dutch: ['natuurlijk', 'omgeving', 'aarde', 'bos', 'berg', 'rivier', 'oceaan', 'natuur']
        },
        celebration: {
          english: ['party', 'celebrate', 'festival', 'holiday', 'event', 'birthday', 'celebration'],
          french: ['fête', 'célébrer', 'festival', 'vacances', 'événement', 'anniversaire', 'célébration'],
          spanish: ['fiesta', 'celebrar', 'festival', 'vacaciones', 'evento', 'cumpleaños', 'celebración'],
          italian: ['festa', 'celebrare', 'festival', 'vacanza', 'evento', 'compleanno', 'celebrazione'],
          chinese: ['聚会', '庆祝', '节日', '假期', '活动', '生日', '庆典'],
          arabic: ['حفلة', 'يحتفل', 'مهرجان', 'عطلة', 'حدث', 'عيد ميلاد', 'احتفال'],
          turkish: ['parti', 'kutlamak', 'festival', 'tatil', 'etkinlik', 'doğum günü', 'kutlama'],
          german: ['Party', 'feiern', 'Festival', 'Feiertag', 'Veranstaltung', 'Geburtstag', 'Feier'],
          japanese: ['パーティー', '祝う', 'フェスティバル', '休日', 'イベント', '誕生日', '祝い'],
          hebrew: ['מסיבה', 'לחגוג', 'פסטיבל', 'חג', 'אירוע', 'יום הולדת', 'חגיגה'],
          finnish: ['juhla', 'kunnioittaa', 'festivaali', 'loma', 'tapahtuma', 'syntymäpäivä', 'juhla'],
          portuguese: ['festa', 'celebrar', 'festival', 'feriado', 'evento', 'aniversário', 'celebração'],
          swedish: ['fest', 'fira', 'festival', 'semester', 'evenemang', 'födelsedag', 'firande'],
          dutch: ['feest', 'vieren', 'festival', 'vakantie', 'evenement', 'verjaardag', 'viering']
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
