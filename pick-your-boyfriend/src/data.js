/* «Найди своего жениха» — quiz data extracted from Figma.
   Each option .h = innerHTML of a 158x158 card. .g = groom (correct).
   Cards keep their exact Figma crop; the renderer shuffles their grid cell. */

// every card is a simple center/cover photo (updated Figma export).
// strip = hair/eyes band (158x79), full = whole card (158x158).
function ph(hash, strip){
  const st = strip ? 'left:0;top:40px;width:158px;height:79px' : 'left:0;top:0;width:158px;height:158px';
  return '<div class="fill" style="'+st+';background:url(/img/'+hash+'.jpg) center/cover no-repeat"></div>';
}
function build(hashes, strip, gi){ return hashes.map((h, i) => ({ g: i === gi, h: ph(h, strip) })); }

// paper sheet behind the card grid
const paper6 = { img:'096fbc4010b4ecb9.png', left:-19, top:166, w:700, h:586 };
const paper4 = { img:'30e69c6afd2e3a07.png', left:-44, top:166, w:735, h:442 };

// card images per cell (column-major: (32,210),(32,381),(32,552),(203,210),(203,381),(203,552))
// gi = index of the groom (correct answer). Only «нос» is labelled in the file ("нос мага").
const questions = [
  {id:'volosy', title:'волосы',        cols:[32,203], rows:[210,381,552], paper:paper6,
    options:build(['aeea634ac5c6a94c','db36316380a48a77','0031e84ebd816bdd','62a1dbc2d525425f','2aa9d0922b247ca0','7f04840d1775538e'], true, 2)},
  {id:'glaza',  title:'Глаза',         cols:[32,203], rows:[210,381,552], paper:paper6,
    options:build(['5477d9d5bffcb009','945b0f107a47868d','07fcfc489639ff1e','4183c5b100ffe82f','4ee01120ffead9cb','4596747fc73cee01'], true, 4)},
  {id:'nos',    title:'нос',           cols:[32,203], rows:[210,381], paper:paper4,
    options:build(['e13824325ae34efb','d796f89d37a9eb8e','525a22defc7e9ee6','43f7aa15c545c35c'], false, 0)},
  {id:'nogi',   title:'ноги',          cols:[32,203], rows:[210,381], paper:paper4,
    options:build(['5e7aff0a3253e2d2','9482c60a5790c90c','742ee205689ba8db','0a4a0ef108580cdc'], false, 1)},
  {id:'ruki',   title:'руки',          cols:[32,203], rows:[210,381], paper:paper4,
    options:build(['bcbd55ca57ff0956','05aae8ce70beedd9','7ffa36cfb84889a9','1b85994e92fa7c1c'], false, 2)},
  {id:'ushi',   title:'уши',           cols:[32,203], rows:[210,381], paper:paper4,
    options:build(['764e67465f4cb383','f280b202a2cb8f58','e86597abc071a636','0c354380ad1c3884'], false, 0)},
  {id:'guby',   title:'губы и борода', cols:[32,203], rows:[210,381], paper:paper4,
    options:build(['ffad66439f564007','53517d1fa6bc97ae','2c82d12c4793b895','435a05f43202a0d4'], false, 3)}
];

// result tiers (inclusive score ranges), matched to Figma mock scores 7 / 5 / 3 / 2 / 0
// paper = bfa073d9 sheet behind the message; photo = couple/photo cut-out at the bottom.
const results = [
  {min:7,max:7, header:'Эксперт 💍', scribbleTop:96, pillTop:125, msgTop:256, paperTop:193,
   msg:'Катя, ты знаешь своего избранника буквально до кончиков пальцев.\n\nСомнений нет —\nэто настоящая любовь!',
   photo:{img:'dc51ef38f57be145.png', left:-147, top:479, w:592, h:391}},
  {min:5,max:6, header:'Почти безупречно ❤️', scribbleTop:156, pillTop:185, msgTop:278, paperTop:193,
   msg:'ты отлично изучила своего будущего мужа.\nНесколько деталей смогли тебя запутать, но результат впечатляет.',
   photo:{img:'dc51ef38f57be145.png', left:-147, top:479, w:592, h:391}},
  {min:3,max:4, header:'узнаю из тысячи… почти', scribbleTop:156, pillTop:185, msgTop:288, paperTop:193,
   msg:'Половина угадана верно.\nВидимо, пора чаще рассматривать жениха при хорошем освещении!',
   photo:{img:'1b39551d0bb2985b.png', left:-26, top:408, w:444, h:445}},
  {min:1,max:2, header:'требуется дополнительное знакомство', scribbleTop:206, pillTop:235, msgTop:364, paperTop:293, coverPhoto:true,
   msg:'Ты немного растерялась среди множества мужских рук, глаз и бород.\nПосле свадьбы стоит провести ускоренный курс изучения жениха.',
   photo:{img:'1c60bdfd4e821ffb.png', left:-1, top:524, w:395, h:424}},
  {min:0,max:0, header:'А точно ли это жених?', scribbleTop:156, pillTop:185, msgTop:326, paperTop:253,
   msg:'Похоже, сегодня жених успешно прошёл программу маскировки.\nЗато впереди целая семейная жизнь, чтобы исправить результат!',
   photo:{img:'892fc319e10d76de.png', left:-15, top:525, w:431, h:327}}
];

export const QUIZ = {
  questions, results,
  total: questions.length,
  groomName:'Артём Магадеев',
  brideName:'Катя'
};
