// เอาไว้เพิ่ม รูปแบบสำหรับ mode ต่างๆ ว่าจะมี ช่องอะไรป่าว request คือ จะมี * หน้าชื่อ ชื่อแต่งละช่องคือ text
var select_mode_drag = [
    {'mode' : '1' , 'input' : 
        [
        {'text' : "ชื่อผู้แต่ง" , 'id' : 'name' , 'request' : true} ,
        {'text' : "ปีที่พิมพ์" , 'id' : 'year' , 'request' : true} , 
        {'text' : "ชื่อหนังสือ" , 'id' : 'book' , 'request' : true} , 
        {'text' : "แปลจาก", 'id' : 'translatefrom' , 'request' : false},
        {'text' : "แปลโดย", 'id' : 'translateby' , 'request' : false},
        {'text' : "ครั้งที่พิมพ์" , 'id' : 'pim' , 'request' : false},
        {'text' : "สถานที่พิมพ์" , 'id' : 'location' , 'request' : true}
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
        {'text' : "สถานที่พิมพ์" , 'id' : 'location' ,  'request' : true}
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
    }
]


// # กุลธิดา ท้วมสุข. (2538). แหล่งสารนิเทศบนอินเทอร์เน็ต. มนุษยศาสตร์และสังคมศาสตร์, 13(2), 1-13.