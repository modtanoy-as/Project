// เอาไว้เพิ่ม รูปแบบสำหรับ mode ต่างๆ ว่าจะมี ช่องอะไรป่าว request คือ จะมี * หน้าชื่อ ชื่อแต่งละช่องคือ text
var select_mode_drag = [
    {'mode' : '1' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อหนังสือ" , 'id' : 'book' , 'request' : true} , 
        // {'text' : "แปลจาก", 'id' : 'translatefrom' , 'request' : false},
        // {'text' : "แปลโดย", 'id' : 'translateby' , 'request' : false},
        {'text' : "ครั้งที่พิมพ์" , 'id' : 'pim' , 'request' : false},
        {'text' : "สถานที่พิมพ์" , 'id' : 'location' , 'request' : true},
        {'text' : "สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.'
    },
    {'mode' : '2' , 'input' : 
        [
        {'text' : "ชื่อผู้เขียนบทความ" , 'id' : 'name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' ,  'request' : true} , 
        {'text' : "ชื่อบทความ" , 'id' : 'article' ,  'request' : true} , 
        {'text' : "ชื่อผู้แต่ง (บรรณาธิการ)" , 'id' : 'name2' ,  'request' : true},
        {'text' : "ชื่อหนังสือ" , 'id' : 'book' ,  'request' : true} , 
        {'text' : "ครั้งที่พิมพ์" , 'id' : 'pim' ,  'request' : false},
        {'text' : "เลขหน้าที่ปรากฏ" , 'id' : 'number' ,  'request' : true},
        {'text' : "สถานที่พิมพ์" , 'id' : 'location' ,  'request' : true},
        {'text' : "สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ./ใน/ชื่อผู้แต่ง (บรรณาธิการ),/ชื่อหนังสือ./(ครั้งที่พิมพ์). (เลขหน้าที่ปรากฏบทความจากหน้าใดถึงหน้าใด)./สถานที่พิมพ์:/สำนักพิมพ์.'
    },    
    {'mode' : '3' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อบทความ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ชื่อวารสาร" , 'id' : 'magazine' , 'request' : true} , 
        {'text' : "ปีที่ (ฉบับที่)" , 'id' : 'numyear' , 'request' : true} ,
        {'text' : "เลขหน้าที่ปรากฎ" , 'id' : 'page' , 'request' : true} ,
        ],
        'format' :'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ./ชื่อวารสาร,/ปีที่ (ฉบับที่),/เลขหน้าที่ปรากฎ.'
    },
    {'mode' : '4' , 'input' : 
        [
        {'text' : "ชื่อผู้เขียนวิทยานิพนธ์" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'Year' , 'request' : true} , 
        {'text' : "ชื่อวิทยานิพนธ์" , 'id' : 'thesis' , 'request' : true} , 
        {'text' : "ชื่อวิทยานิพนธ์ปริญญามหาบัณฑิต" , 'id' : 'univer' , 'request' : true}
        ],
        'format' :'ชื่อผู้เขียนวิทยานิพนธ์./(ปีพิมพ์)./ชื่อวิทยานิพนธ์./(วิทยานิพนธ์ปริญญามหาบัณฑิตหรือวิทยานิพนธ์ปริญญาดุษฎีบัณฑิต,/ชื่อมหาวิทยาลัย/สถาบันการศึกษา).'
    },
    {'mode' : '5' , 'input' : 
        [
        {'text' : "ชื่อผู้เขียนบทความ" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'Year' , 'request' : true} , 
        {'text' : "ชื่อบทความ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ชื่อวารสาร" , 'id' : 'magazine' , 'request' : true} , 
        {'text' : "ปีที่ (ฉบับที่)" , 'id' : 'numyear' , 'request' : true} , 
        {'text' : "เลขหน้าที่ปรากฎ" , 'id' : 'page' , 'request' : true} 
        ],
        'format' :'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ [ข้อมูลอิเล็กทรอนิกส์]./ชื่อวารสาร,/ปีที่ (ฉบับที่),/เลขหน้าที่ปรากฎ.'
    },
    {'mode' : '6' , 'input' : 
        [
        {'text' : "ชื่อผู้เขียนบทความ" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "วันเดือนปีที่สืบค้น" , 'id' : 'day' , 'request' : true} , 
        {'text' : "เว็บไซต์" , 'id' : 'url' , 'request' : true} , 
        ],
        'format' :'ชื่อผู้เขียนบทความ./วันเดือนปีที่สืบค้น,/เว็บไซต์'
    },
    {'mode' : '7' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'name' , 'request' : true} ,
        {'text' : "ชื่อบทความ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ชื่อวารสาร" , 'id' : 'magazine' , 'request' : true} , 
        {'text' : "ปีที่" , 'id' : 'numyear' , 'request' : true} ,
        {'text' : "ฉบับที่" , 'id' : 'issue' , 'request' : true} ,
        {'text' : "เลขหน้าบทความ" , 'id' : 'page' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง,/“ชื่อบทความ,”/ชื่อวารสาร,/ปีที่,/ฉบับที่,/เลขหน้าบทความที่อ้างอิง,/ปีที่พิมพ์.'
    },
    {'mode' : '8' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อเรื่องวิทยานิพนธ์" , 'id' : 'thesis' , 'request' : true} , 
        {'text' : "วิทยานิพนธ์หรือสารนิพนธ์" , 'id' : 'thesis1' , 'request' : true} , 
        {'text' : "ชื่อมหาวิทยาลัย" , 'id' : 'uni' , 'request' : true} ,
        {'text' : "ชื่อเมือง" , 'id' : 'city' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง,/“ชื่อเรื่องวิทยานิพนธ์,”/วิทยานิพนธ์หรือสารนิพนธ์/ชื่อย่อปริญญา/(สาขา),/ชื่อมหาวิทยาลัย,ชื่อเมือง,/ชื่อประเทศ,/ปีที่พิมพ์.'
    },
    {'mode' : '9' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อเรื่อง" , 'id' : 'subject' , 'request' : true} , 
        {'text' : "ชื่อวารสาร" , 'id' : 'magazine' , 'request' : true} ,
        {'text' : "ปีที่(ฉบับที่)" , 'id' : 'numyear' , 'request' : true} ,
        {'text' : "หน้าแรก-หน้าสุดท้าย" , 'id' : 'page' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อเรื่อง./ชื่อวารสาร,/ปีที่(ฉบับที่),/หน้าแรก-หน้าสุดท้าย.'
    },
    {'mode' : '10' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อหนังสือ" , 'id' : 'Book' , 'request' : true} , 
        {'text' : "เมืองที่พิมพ์:สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.'
    },
    {'mode' : '11' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "หัวข้อ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ผู้เรียบเรียงหนังสือ" , 'id' : 'editor' , 'request' : true} ,
        {'text' : "ชื่อหนังสือ" , 'id' : 'Book' , 'request' : true} ,
        {'text' : "เมืองที่พิมพ์:สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ปีที่พิมพ์./หัวข้อ./ผู้เรียบเรียงหนังสือ (eds.),/ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.'
    },
    {'mode' : '12' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "หัวข้อ" , 'id' : 'title' , 'request' : true} , 
        {'text' : "ครั้งที่พิมพ์" , 'id' : 'Pim' , 'request' : true} ,
        {'text' : "เมืองที่พิมพ์:สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง. ปีที่พิมพ์. หัวข้อ: หัวข้อย่อย. ครั้งที่พิมพ์. เมืองที่พิมพ์: สำนักพิมพ์.'
    },
    {'mode' : '13' , 'input' : 
        [
        {'text' : "ผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อเรื่อง" , 'id' : 'subject' , 'request' : true} , 
        {'text' : "วัน/เดือน/ปีที่สืบค้น" , 'id' : 'dayHarvard' , 'request' : true} ,
        {'text' : "ชื่อฐานข้อมูล" , 'id' : 'Location' , 'request' : false} ,
        {'text' : "URL" , 'id' : 'url' , 'request' : true}
        ],
        'format' :'ผู้แต่ง./ปีที่พิมพ์./ชื่อเรื่อง,/วัน/เดือน/ปีที่สืบค้น./ชื่อฐานข้อมูล./URL'
    },
    {'mode' : '14' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อวิทยานิพนธ์" , 'id' : 'thesis' , 'request' : true} , 
        {'text' : "ระดับปริญญาของวิทยานิพนธ์" , 'id' : 'degree' , 'request' : true} ,
        {'text' : "สถาบันการศึกษา" , 'id' : 'uni' , 'request' : true} ,
        {'text' : "เมืองที่พิมพ์:สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อวิทยานิพนธ์./ระดับปริญญาของวิทยานิพนธ์,/สถาบันการศึกษา,/เมืองที่พิมพ์:/สำนักพิมพ์.'
    },
    {'mode' : '15' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อบทความ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ชื่อวารสารปีพิมพ์" , 'id' : 'thesis' , 'request' : true} , 
        {'text' : "เล่มที่ของวารสาร" , 'id' : 'num' , 'request' : false} ,
        {'text' : "หน้าแรก-หน้าสุดท้าย" , 'id' : 'page' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสารปีพิมพ์;เล่มที่ของวารสาร:หน้าแรก-หน้าสุดท้าย.'
    },
    {'mode' : '16' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อหนังสือ" , 'id' : 'Book' , 'request' : true} , 
        {'text' : "ครั้งที่พิมพ์" , 'id' : 'Pim' , 'request' : true} , 
        {'text' : "เมืองที่พิมพ์" , 'id' : 'Location' , 'request' : true} ,
        {'text' : "สำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true} ,
        {'text' : "ปี" , 'id' : 'year' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ชื่อหนังสือ./ครั้งที่พิมพ์./เมืองที่พิมพ์:/สำนักพิมพ์;/ปี'
    },
    {'mode' : '17' , 'input' : 
        [
        {'text' : "ผู้นิพนธ์" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อเรื่อง" , 'id' : 'title' , 'request' : true} , 
        {'text' : "เมืองที่พิมพ์" , 'id' : 'Location' , 'request' : true} , 
        {'text' : "มหาวิทยาลัย" , 'id' : 'uni' , 'request' : true} ,
        {'text' : "ปีที่ได้ปริญญา" , 'id' : 'year' , 'request' : true}
        ],
        'format' :'ผู้นิพนธ์./ชื่อเรื่อง./เมืองที่พิมพ์:/มหาวิทยาลัย;/ปีที่ได้ปริญญา.'
    },
    {'mode' : '18' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อบทความ" , 'id' : 'article' , 'request' : true} , 
        {'text' : "ชื่อวารสาร" , 'id' : 'magazine' , 'request' : true} , 
        {'text' : "ปีพิมพ์" , 'id' : 'year' , 'request' : true} ,
        {'text' : "[เข้าถึงเมื่อ ปีเดือน วันที่]" , 'id' : 'access' , 'request' : true} ,
        {'text' : "ปีที่ (ฉบับที่)" , 'id' : 'numyear' , 'request' : true} ,
        {'text' : "หน้า" , 'id' : 'page' , 'request' : true},
        {'text' : "เข้าถึงได้จาก" , 'id' : 'url' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสาร./ปีพิมพ์/เดือน[เข้าถึงเมื่อ ปีเดือน วันที่];ปีที่ (ฉบับที่):[หน้า]./เข้าถึงได้จาก from: http://………….'
    },
    {'mode' : '19' , 'input' : 
        [
        {'text' : "ชื่อโฮมเพจ" , 'id' : 'home' , 'request' : true} ,
        {'text' : "ชื่อเมืองที่พิมพ์" , 'id' : 'Location' , 'request' : true} , 
        {'text' : "ชื่อสำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true} , 
        {'text' : "ปีพิมพ์" , 'id' : 'year' , 'request' : true} ,
        {'text' : "url" , 'id' : 'url' , 'request' : true}
        ],
        'format' :'ชื่อโฮมเพจ/เว็บไซต์/[อินเทอร์เน็ต]./ชื่อเมืองที่พิมพ์:/ชื่อสำนักพิมพ์;/ปีที่พิมพ์/[ปรับปรุงเมื่อปี/เดือน/วันที่;/เข้าถึงเมื่อปี/เดือน/วันที่]./เข้าถึงได้จาก:/http://………….'
    },
    {'mode' : '20' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'Name' , 'request' : true} ,
        {'text' : "ชื่อบล็อก" , 'id' : 'nameblog' , 'request' : true} , 
        {'text' : "ชื่อเมืองที่พิมพ์" , 'id' : 'Location' , 'request' : true} , 
        {'text' : "ชื่อสำนักพิมพ์" , 'id' : 'SamNakPim' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์[เข้าถึงเมื่อปีเดือน วันที่]" , 'id' : 'year' , 'request' : true} ,
        {'text' : "เข้าถึงได้จาก" , 'id' : 'url' , 'request' : true}
        ],
        'format' :'ชื่อผู้แต่ง./ชื่อบล็อก/[อินเทอร์เน็ต]./ชื่อเมืองที่พิมพ์:/ชื่อสำนักพิมพ์;/ปีที่พิมพ์[เข้าถึงเมื่อปีเดือน วันที่]./เข้าถึงได้จาก: http://………….'
    },


]


// #นิตยา เงินประเสริฐศรี, “องค์การแนวนอน,” วารสารสังคมศาสตร์และมนุษยศาสตร์, ปีที่ 27, ฉบับที่ 15,หน้า 37-42, มกราคม-มิถุนายน, 2554

// name2 = r"^(?:(?:[ก-์]+)\s?(?:[ก-์]+(?:(?:\.|,|และ)?(?:\s[ก-์]+|\s[(][ก-์]+[)]))*)(?:,\s.\s[ก-์]+\s[ก-์]+)?(?:\s[1-9]+\s(?:[ก-์]+\.)*\s(?:[0-9]+\-[0-9]+))?)"
// article2 = r"(?:\“[ก-์]+\,\”)"
// magazine2 = r"(?:[ก-์]+\s?(?:(?:[ก-์]+(?::)?(?:\s[ก-์]+)?)|(?:\.\s[ก-์]+(?:\s[a-zA-z]+)*\.(?:\s[ก-์]+)*)))"
// numyear2 = r"(?:ปีที่\s[0-9]+)"
// issue2 = r"(?:ฉบับ\s[0-9]+)"
// page2 = r"(?:หน้า\s[0-9]+\-[0-9]+)"
// year2 = r"(?:[ก-์]+\-?[ก-์]+(\,\s)?\b\d{4})"