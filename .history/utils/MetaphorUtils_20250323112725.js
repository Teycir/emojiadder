/**
 * Utilities for detecting metaphors in text
 */
class MetaphorUtils {
    constructor() {
      this.metaphorKeywords = {
        speed: {
          english: ['fast', 'quick', 'rapid', 'swift', 'hurry', 'race', 'dash', 'speed', 'accelerate'],
          french: ['rapide', 'vite', 'fulgurant', 'prompt', 'hâte', 'course', 'sprint', 'vitesse', 'accélérer'],
          spanish: ['rápido', 'ligero', 'veloz', 'pronto', 'apresurado', 'carrera', 'esprintar', 'velocidad', 'acelerar'],
          italian: ['veloce', 'rapido', 'celere', 'brevi', 'fuga', 'corsa', 'scatto', 'velocità', 'accelerare'],
          chinese: ['快', '迅速', '快捷', '速', '疾驰', '赛跑', '冲刺', '速度', '加速'],
          arabic: ['سريع', 'خاطف', 'عجول', 'فوري', 'تعجيل', 'سباق', 'انطلاقة', 'سرعة', 'تسارع'],
          turkish: ['hızlı', 'çabuk', 'süratli', 'cıvıl', 'acele', 'yarış', 'fırlamak', 'hız', 'ivmek'],
          german: ['schnell', 'flink', 'rasch', 'säusend', 'eilig', 'Rennen', 'Sprint', 'Geschwindigkeit', 'beschleunigen'],
          japanese: ['速い', '迅速', '素早い', '急速', '急いで', 'レース', 'ダッシュ', '速度', '加速'],
          hebrew: ['מהיר', 'זריז', 'מהיר מאוד', 'מהירות', 'להאיץ'],
          finnish: ['nopea', 'pikainen', 'kiireellinen', 'vilkas', 'kiire', 'juoksu', 'pulssi', 'nopeus', 'kiihdyttää'],
          portuguese: ['rápido', 'veloz', 'ligeiro', 'apressado', 'corrida', 'arrastar', 'acelera'],
          swedish: ['snabb', 'kvick', 'rappt', 'skyndsam', 'jaga', 'lopp', 'springa', 'acceleration'],
          dutch: ['snel', 'vlug', 'rap', 'ijverig', 'haast', 'race', 'dash', 'versnellen']
        },
        strength: {
          english: ['strong', 'powerful', 'mighty', 'solid', 'tough', 'force', 'muscle'],
          french: ['fort', 'puissant', 'vigueur', 'solide', 'robuste', 'force', 'muscle'],
          spanish: ['fuerte', 'poderoso', 'potente', 'sólido', 'resistente', 'fuerza', 'músculo'],
          italian: ['forte', 'potente', 'robusto', 'solido', 'durezza', 'forza', 'muscolo'],
          chinese: ['强大', '有力', '坚固', '刚强', '韧性', '力量', '肌肉'],
          arabic: ['قوي', 'متين', 'شديد', 'صلب', 'متحمل', 'قوة', 'عضلة'],
          turkish: ['güçlü', 'kuvvetli', 'dayanıklı', 'sağlam', 'zor', 'kuvvet', 'kas'],
          german: ['stark', 'mächtig', 'kraftvoll', 'solide', 'robust', 'Kraft', 'Muskel'],
          japanese: ['強い', 'パワフル', 'たくましい', 'しっかり', '頑丈', '力', '筋肉'],
          hebrew: ['חזק', 'עוצמתי', 'משמעותי', 'יציב', 'קשוח', 'כוח', 'שריר'],
          finnish: ['voimakas', 'vahva', 'mukava', 'kestävä', 'raskas', 'voima', 'lihas'],
          portuguese: ['forte', 'poderoso', 'robusto', 'sólido', 'resistente', 'força', 'músculo'],
          swedish: ['stark', 'kraftfull', 'mäktig', 'solid', 'tuff', 'styrka', 'muskel'],
          dutch: ['sterk', 'krachtig', 'machtig', 'solide', 'taai', 'kracht', 'spier']
        },
        growth: {
          english: ['grow', 'expand', 'rise', 'develop', 'evolve', 'progress', 'advance', 'improve'],
          french: ['croître', 's\'étendre', 'monter', 'développer', 'évoluer', 'progresser', 'avancer', 'améliorer'],
          spanish: ['crecer', 'expandir', 'aumentar', 'desarrollar', 'evolucionar', 'progresar', 'avanzar', 'mejorar'],
          italian: ['crescere', 'espandersi', 'aumentare', 'svilupparsi', 'evolvere', 'progredire', 'avanzare', 'migliorare'],
          chinese: ['增长', '扩展', '上升', '发展', '进化', '进步', '推进', '改善'],
          arabic: ['ينمو', 'يتوسع', 'يرتفع', 'يتطور', 'يتغير', 'يتقدم', 'يحسن'],
          turkish: ['büyümek', 'genleşmek', 'yükselmek', 'gelişmek', 'evrimleşmek', 'ilerlemek', 'iyileşmek'],
          german: ['wachsen', 'expandieren', 'steigen', 'entwickeln', 'evolvieren', 'fortschreiten', 'verbessern'],
          japanese: ['成長する', '拡大する', '上昇する', '発展する', '進化する', '進歩する', '改善する'],
          hebrew: ['לגדול', 'להתרחב', 'לעלות', 'להתפתח', 'להשתנות', 'להתקדם', 'לשפר'],
          finnish: ['kasvaa', 'laajentua', 'nousta', 'kehittää', 'kehittyä', 'edetä', 'parantaa'],
          portuguese: ['crescer', 'expandir', 'subir', 'desenvolver', 'evoluir', 'progredir', 'melhorar'],
          swedish: ['växa', 'utvidga', 'öka', 'utveckla', 'utvecklas', 'göra framsteg', 'förbättra'],
          dutch: ['groeien', 'uitbreiden', 'stijgen', 'ontwikkelen', 'evolueren', 'vorderen', 'verbeteren']
        },
        time: {
          english: ['minute', 'hour', 'day', 'week', 'month', 'year', 'time', 'deadline', 'schedule'],
          french: ['minute', 'heure', 'jour', 'semaine', 'mois', 'an', 'temps', 'date limite', 'programme'],
          spanish: ['minuto', 'hora', 'día', 'semana', 'mes', 'año', 'tiempo', 'plazo', 'horario'],
          italian: ['minuto', 'ora', 'giorno', 'settimana', 'mese', 'anno', 'tempo', 'scadenza', 'programma'],
          chinese: ['分钟', '小时', '天', '周', '月', '年', '时间', '截止日期', '时间表'],
          arabic: ['دقيقة', 'ساعة', 'يوم', 'أسبوع', 'شهر', 'سنة', 'وقت', 'الموعد النهائي', 'جدول'],
          turkish: ['dakika', 'saat', 'gün', 'hafta', 'ay', 'yıl', 'zaman', 'son tarih', 'program'],
          german: ['Minute', 'Stunde', 'Tag', 'Woche', 'Monat', 'Jahr', 'Zeit', 'Frist', 'Zeitplan'],
          japanese: ['分', '時間', '日', '週', '月', '年', '時間', '締め切り', '予定'],
          hebrew: ['דקה', 'שעה', 'יום', 'שבוע', 'חודש', 'שנה', 'זמן', 'מועד אחרון', 'לו"ז'],
          finnish: ['minuutti', 'tunti', 'päivä', 'viikko', 'kuukausi', 'vuosi', 'aika', 'määräaika', 'aikataulu'],
          portuguese: ['minuto', 'hora', 'dia', 'semana', 'mês', 'ano', 'tempo', 'prazo', 'agenda'],
          swedish: ['minut', 'timme', 'dag', 'vecka', 'månad', 'år', 'tid', 'deadline', 'schema'],
          dutch: ['minuut', 'uur', 'dag', 'week', 'maand', 'jaar', 'tijd', 'deadline', 'rooster']
        },
        money: {
          english: ['dollar', 'cash', 'currency', 'finance', 'wealth', 'economy', 'invest', 'profit'],
          french: ['dollar', 'argent liquide', 'devise', 'finance', 'richesse', 'économie', 'investir', 'profit'],
          spanish: ['dólar', 'efectivo', 'moneda', 'finanzas', 'riqueza', 'economía', 'invertir', 'beneficio'],
          italian: ['dollaro', 'contanti', 'valuta', 'finanza', 'ricchezza', 'economia', 'investire', 'profitto'],
          chinese: ['美元', '现金', '货币', '金融', '财富', '经济', '投资', '利润'],
          arabic: ['دولار', 'نقد', 'عملة', 'تمويل', 'ثروة', 'اقتصاد', 'استثمار', 'ربح'],
          turkish: ['dolar', 'nakit', 'para birimi', 'finans', 'servet', 'ekonomi', 'yatırım', 'kar'],
          german: ['Dollar', 'Bargeld', 'Währung', 'Finanzen', 'Reichtum', 'Wirtschaft', 'investieren', 'Gewinn'],
          japanese: ['ドル', '現金', '通貨', '金融', '富', '経済', '投資', '利益'],
          hebrew: ['דולר', 'מזומן', 'מטבע', 'מימון', 'עושר', 'כלכלה', 'השקעה', 'רווח'],
          finnish: ['dollari', 'käteinen', 'valuutta', 'rahoitus', 'varallisuus', 'talous', 'sijoittaa', 'voitto'],
          portuguese: ['dólar', 'dinheiro', 'moeda', 'finanças', 'riqueza', 'economia', 'investir', 'lucro'],
          swedish: ['dollar', 'kontanter', 'valuta', 'finans', 'rikedom', 'ekonomi', 'investera', 'vinst'],
          dutch: ['dollar', 'contant', 'valuta', 'financiën', 'rijkdom', 'economie', 'investeren', 'winst']
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
