const API_URL = "http://127.0.0.1:8000/"

let MODE = 0 // Default 0 

const Dict_Type = {
    "APA" : [
        {"txt" : "หนังสือ" , "val" : 1},
        {"txt" : "บทความในหนังสือ" , "val" : 2},
        {"txt" : "วารสาร" , "val" : 3},
        {"txt" : "วิทยานิพนธ์" , "val" : 4},
        {"txt" : "สารสนเทศอิเล็กทรอนิกส์" , "val" : 5},
        {"txt" : "วิกิ(WIKI)" , "val" : 6}
    ],
    "IEEE" : [
        {"txt" : "วารสาร" , "val" : 7},
        {"txt" : "วิทยานิพนธ์/สารนิพนธ์" , "val" : 8}
    ],
    "HARVARD" : [
        {"txt" : "วารสาร" , "val" : 9},
        {"txt" : "หนังสือ" , "val" : 10},
        {"txt" : "บทความจากหนังสือ" , "val" : 11},
        {"txt" : "หนังสือที่มีการพิมพ์หลายครั้ง" , "val" : 12},
        {"txt" : "อิเล็กทรอนิกส์" , "val" : 13},
        {"txt" : "วิทยานิพนธ์" , "val" : 14}
    ],
    "VANCOUVER" : [
        {"txt" : "บทความวารสาร" , "val" : 15},
        {"txt" : "หนังสือทั้งเล่ม" , "val" : 16},
        {"txt" : "วิทยานิพนธ์" , "val" : 17}, // ใช้ได้
        {"txt" : "อินเทอร์เน็ต" , "val" : 18},
        {"txt" : "โฮมเพจเว็บไซต์" , "val" : 19},
        {"txt" : "บล็อก" , "val" : 20}
    ],
}

let ADA = [1,2,3,4,5,6]
let IEEE = [7,8]
let HARVARD = [9,10,11,12,13,14]
let VANCOUVER = [15,16,17,18,19,20]

$( "#checktext" ).click(function() {
    let inPutTxt =  $("#txtInput").val()
    console.log("mode => " ,  MODE ,"inPutTxt => ",inPutTxt);
    if(MODE === 0){
        $(".alertTxt").addClass("show")
        setTimeout(() => {
            $(".alertTxt").removeClass("show")
        }, 2500);
        return
    }
    getCheckFormat(inPutTxt,MODE)

  });

function getCheckFormat(text,mode){
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      let param = `txt=${text}&mode=${mode}`

      fetch(API_URL+"checkFormat?"+param, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result?.feedback)
            $( "#txtOutput" ).text(result.text)
            
            if (result?.feedback){
                $( "#feedback" ).show('fast').addClass("d-flex")
                $( "#feedback" ).text("Feedback : "+result.feedback)

                let feedback = result.feedback.split(',').map(d=>d.trim())
                if (feedback.includes("ไม่มีครั้งที่พิมพ์") && feedback.length>1 || feedback.length > 0 && !feedback.includes("ไม่มีครั้งที่พิมพ์")  && !feedback.includes("ไม่มีวันที่สืบค้น") || feedback.includes("ไม่มีวันที่สืบค้น") && feedback.length>1  ){
                    console.log('feedback Fail => ' , feedback)
                    $('#Bibliographyhelper').show('fast' , d=>{
                        $('#inputTxtDrag').val(text)
                        $( "#txtOutput" ).addClass('box-danger').removeClass('box-success')
                    })
                }else{
                    $('#Bibliographyhelper').hide('fast')
                    $( "#txtOutput" ).addClass('box-success').removeClass('box-danger')
                    console.log('feedback success => ' , feedback)
                }
            }else{
                $( "#feedback" ).hide().removeClass("d-flex")
                $('#Bibliographyhelper').hide('fast')
                $( "#txtOutput" ).addClass('box-success').removeClass('box-danger')
            }
            // $( "#feedback" ).text("Feedback : "+result?.feedback ? result.feedback : "")
        })
        .catch(error => console.log('error', error));
}

$( "#selectType" ).change(function() {
    let type = $( this ).val().toUpperCase();
    let html = ""

    if (!Dict_Type[type]){ 
        MODE = 0 // CHECK DICT TYPE NO DATA SET MODE 0
        $('#selectPattern').prop("disabled", true)
    }else{
        $('#selectPattern').prop("disabled", false)
    }

    Dict_Type[type]?.forEach((data,idx) => {
        if(idx === 0) MODE = data.val // SET SELECT TYPE SELECT MODE FIRST
        html += `<option value="${data.val}">${data.txt}</option>`
    });

    $("#selectPattern").html(html)
    generateInput(MODE)

});

$( "#selectPattern" ).change(function() {
    let THISMODE = $( this ).val();
    MODE = THISMODE
    generateInput(MODE)
});


$('input[name=myPDF]').change(async function(ev) {
    pdffile=this.files[0]
    pdffile_url=URL.createObjectURL(pdffile);
    ExtractText(pdffile)
    
    $('#viewer').attr('src',pdffile_url);

    $("#panel-wrap")
        .removeClass("fa fa-angle-down")
        .addClass("fa fa-angle-up");

    $("#panel-wrap").closest(".card").find(".collapse").collapse("show");
});

// ACTION EXPAN
$(document).on("click","i.fa.fa-angle-down", function(e) {
    var contentElement = $(e.target).closest(".card").find(".collapse");
    $(e.target)
        .removeClass("fa fa-angle-down")
        .addClass("fa fa-angle-up");
    contentElement.collapse("toggle")
});

$(document).on("click","i.fa.fa-angle-up", function(e) {
    var contentElement = $(e.target).closest(".card").find(".collapse");
    $(e.target)
        .removeClass("fa fa-angle-up")
        .addClass("fa fa-angle-down");
    contentElement.collapse("toggle")
       
});

//END ACTION EXPAN


// Check Position

$( "#checkposition" ).click(function() {
    let inPutTxt =  $("#txtInputPosition").val()
    console.log("mode => " ,  MODE ,"inPutTxt => ",inPutTxt);
    if(MODE === 0){
        $(".alertTxt").addClass("show")
        setTimeout(() => {
            $(".alertTxt").removeClass("show")
        }, 2500);
        return
    }
    getCheckPosition(inPutTxt,MODE)

});


var select_txtSpecial = [
    {'txtSpecial' : '{".":5,"(" : 1 , ")" : 1 , ":" : 2 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '1' },
    {'txtSpecial' : '{".":4,"(" : 1 , ")" : 1 ,":" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '2' },
    {'txtSpecial' : '{".":3,"(" : 1 , ")" : 1 ,":" : 1,"," : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '3' },
    {'txtSpecial' : '{".":4,"(" : 1 , ")" : 1 ,":" : 2,"," : 6 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '4' },
    {'txtSpecial' : '{".":6,"(" : 1 , ")" : 1 ,":" : 1,"," : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '5' },
    {'txtSpecial' : '{".":5,"(" : 2 , ")" : 2 ,":" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '6' },
    {'txtSpecial' : '{".":7,"(" : 2 , ")" : 2 ,":" : 1,"-" : 1,"," : 2 }' , 'structure' : 'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ./ใน/ชื่อผู้แต่ง (บรรณาธิการ),/ชื่อหนังสือ./(ครั้งที่พิมพ์). (เลขหน้าที่ปรากฏบทความจากหน้าใดถึงหน้าใด)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '7' },
    {'txtSpecial' : '{".":4,"(" : 2 , ")" : 2 ,"-" : 1,"," : 2 }' , 'structure' : 'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ./ชื่อวารสาร,/ปีที่ (ฉบับที่),/เลขหน้าที่ปรากฎ.' , 'mode' : '8' },
    {'txtSpecial' : '{".":4,"(" : 2 , ")" : 2 ,"," : 1 }' , 'structure' : 'ชื่อผู้เขียนวิทยานิพนธ์./(ปีพิมพ์)./ชื่อวิทยานิพนธ์./(วิทยานิพนธ์ปริญญามหาบัณฑิตหรือวิทยานิพนธ์ปริญญาดุษฎีบัณฑิต,/ชื่อมหาวิทยาลัย/สถาบันการศึกษา).' , 'mode' : '9' },
    {'txtSpecial' : '{".":4,"(" : 2 , ")" : 2 ,":" : 1,"," : 2,"[" : 1,"]" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้เขียนบทความ./(ปีพิมพ์)./ชื่อบทความ [ข้อมูลอิเล็กทรอนิกส์]./ชื่อวารสาร,/ปีที่ (ฉบับที่),/เลขหน้าที่ปรากฎ.' , 'mode' : '10' },
    {'txtSpecial' : '{".":3,":" : 1,"/" : 4 ,"," : 1 }' , 'structure' : 'ชื่อผู้เขียน/(ปี,เดือน วันที่)./ชื่อเนื้อหา./[รูปแบบสารสนเทศอิเล็กทรอนิกส์]./Retrieved from URL หรือเว็บไซต์ของข้อมูล' , 'mode' : '10' },
    
    {'txtSpecial' : '{".":1,"," : 6,"“" : 1,"”" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง,/“ชื่อบทความ,”/ชื่อวารสาร,/ปีที่,/ฉบับที่,/เลขหน้าบทความที่อ้างอิง,/ปีที่พิมพ์.' , 'mode' : '11' },
    {'txtSpecial' : '{".":3,"," : 5,"“" : 1,"”" : 1,"(" : 1,")" : 1 }' , 'structure' : 'ชื่อผู้แต่ง,/“ชื่อเรื่องวิทยานิพนธ์,”/วิทยานิพนธ์หรือสารนิพนธ์/ชื่อย่อปริญญา/(สาขา),/ชื่อมหาวิทยาลัย,ชื่อเมือง,/ชื่อประเทศ,/ปีที่พิมพ์.' , 'mode' : '12' },

    {'txtSpecial' : '{".":4,"," : 4,"(" : 1,")" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อเรื่อง./ชื่อวารสาร,/ปีที่(ฉบับที่),/หน้าแรก-หน้าสุดท้าย.' , 'mode' : '13' },
    {'txtSpecial' : '{".":4,":" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '14' },
    {'txtSpecial' : '{".":4,":" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '15' },
    {'txtSpecial' : '{".":3,":" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '16' },
    {'txtSpecial' : '{".":5,":" : 2,"," : 1,"/" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./หัวข้อ./ผู้เรียบเรียงหนังสือ (eds.),/ชื่อหนังสือ./เมืองที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '17' },
    {'txtSpecial' : '{".":5,":" : 2}' , 'structure' : 'ชื่อผู้แต่ง. ปีที่พิมพ์. หัวข้อ: หัวข้อย่อย. ครั้งที่พิมพ์. เมืองที่พิมพ์: สำนักพิมพ์.' , 'mode' : '18' },
    {'txtSpecial' : '{".":7,":" : 1,"," : 1,"/" : 2 }' , 'structure' : 'ผู้แต่ง./ปีที่พิมพ์./ชื่อเรื่อง,/วัน/เดือน/ปีที่สืบค้น./ชื่อฐานข้อมูล./URL.' , 'mode' : '19' },
    {'txtSpecial' : '{".":4,":" : 1,"," : 2 }' , 'structure' : 'ชื่อผู้แต่ง./ปีที่พิมพ์./ชื่อวิทยานิพนธ์./ระดับปริญญาของวิทยานิพนธ์,/สถาบันการศึกษา,/เมืองที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '20' },

    {'txtSpecial' : '{".":3,":" : 1,"," : 2,";" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสารปีพิมพ์;เล่มที่ของวารสาร:หน้าแรก-หน้าสุดท้าย.' , 'mode' : '21' },
    {'txtSpecial' : '{".":3,":" : 1,"," : 6,";" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสารปีพิมพ์;เล่มที่ของวารสาร:หน้าแรก-หน้าสุดท้าย.' , 'mode' : '22' },
    {'txtSpecial' : '{".":3,":" : 1,";" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสารปีพิมพ์;เล่มที่ของวารสาร:หน้าแรก-หน้าสุดท้าย.' , 'mode' : '23' },
    {'txtSpecial' : '{".":3,":" : 1,";" : 1,"-" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสารปีพิมพ์;เล่มที่ของวารสาร:หน้าแรก-หน้าสุดท้าย.' , 'mode' : '24' },
    {'txtSpecial' : '{".":3,":" : 1,"[" : 1,"]" : 1,";" : 1 }' , 'structure' : 'ผู้นิพนธ์./ชื่อเรื่อง./เมืองที่พิมพ์:/มหาวิทยาลัย;/ปีที่ได้ปริญญา.' , 'mode' : '25' },
    {'txtSpecial' : '{".":8,"-" : 2,":" : 3,"[" : 3,"]" : 3,";" : 1,"/" : 4 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบทความ./ชื่อวารสาร./ปีพิมพ์/เดือน[เข้าถึงเมื่อ ปีเดือน วันที่];ปีที่ (ฉบับที่):[หน้า]./เข้าถึงได้จาก from: http://………….' , 'mode' : '26' },
    {'txtSpecial' : '{".":8,":" : 3,"[" : 1,"]" : 1,";" : 2,"/" : 4 }' , 'structure' : 'ชื่อโฮมเพจ/เว็บไซต์/[อินเทอร์เน็ต]./ชื่อเมืองที่พิมพ์:/ชื่อสำนักพิมพ์;/ปีที่พิมพ์/[ปรับปรุงเมื่อปี/เดือน/วันที่;/เข้าถึงเมื่อปี/เดือน/วันที่]./เข้าถึงได้จาก:/http://………….' , 'mode' : '27' },
    {'txtSpecial' : '{".":6,":" : 3,"[" : 2,"]" : 2,"/" : 4 }' , 'structure' : 'ชื่อผู้แต่ง./ชื่อบล็อก/[อินเทอร์เน็ต]./ชื่อเมืองที่พิมพ์:/ชื่อสำนักพิมพ์;/ปีที่พิมพ์[เข้าถึงเมื่อปีเดือน วันที่]./เข้าถึงได้จาก: http://………….' , 'mode' : '28' },

]

function selectSpecial(mode){
    let data = select_txtSpecial.find(d => d.mode == mode);
    return data
}


function getCheckPosition(text,mode){
    let data = selectSpecial(mode)

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      

      if (data == undefined){ alert("ไม่พบรูปแบบ") ;  return}

      let structure = data.structure
      let txtSpecial  = data.txtSpecial

      let param = `txt=${text}&txtSpecial=${txtSpecial}&structure=${structure}`

      console.log(param);

      fetch(API_URL+"checkPosition?"+param, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result?.suggestion){
                $( "#txtOutputPosition" ).text(result?.suggestion)
            }else{
                $( "#txtOutputPosition" ).text("")
            }
            
            if (result?.feedback){
                $( "#feedbackPosition" ).show('fast').addClass("d-flex")
                $( "#feedbackPosition" ).text("Feedback : "+result.feedback)
            }else{
                $( "#feedbackPosition" ).hide().removeClass("d-flex")
            }
            // $( "#feedback" ).text("Feedback : "+result?.feedback ? result.feedback : "")
        })
        .catch(error => console.log('error', error));
}



function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    console.log(ev.target , $(ev.target).get(0).id);

 

    $(selectTxt).hide('fast')

    let concatTxt =  ''

    if($(ev.target).get(0).id == "name" || $(ev.target).get(0).id == "name2" || $(ev.target).get(0).id == "univer"){
        concatTxt = ($(ev.target).val())?$(ev.target).val()+', '+data:data
    }else if($(ev.target).get(0).id == "numyear"){
        concatTxt = ($(ev.target).val())?$(ev.target).val()+' '+data.replaceAll(" ",""):data.replaceAll(" ","")
    }else{
        concatTxt = ($(ev.target).val())?$(ev.target).val()+' '+data:data
    }

   

    
    $(ev.target).val(concatTxt)
    // if(ev.target.id =='verb' && verbs.indexOf(data) != -1){
    //     // ev.target.appendChild(document.getElementById(data));
    // }
    // else{
    //     alert(data + ' is not a ' + ev.target.id +'. Try again');
    // }

}

function allowDrop(ev) {
    ev.preventDefault();
}

let selectTxt = ''
function drag(ev) {
    selectTxt = ev.target
    ev.dataTransfer.setData("Text", $(ev.target).data('value'));
}



function cutText(){
    let mode = parseInt(MODE) // Set the mode
    if(!mode || mode === 0) {
        $(".alertTxt").addClass("show")
        setTimeout(() => {
            $(".alertTxt").removeClass("show")
        }, 2500);
        return
    };

    // var requestOptions = {
    //     method: 'POST',
    //     redirect: 'follow'
    //   };
    // let text = $('#inputTxtDrag').val()
    // let param = `txt=${text}`
    // fetch(API_URL+"cutText?"+param, requestOptions)
    // .then(res => res.json())
    // .then(result => {
    //     console.log('cutText => ' , result.data)
    //     generateHtml(result.data)
    // })
    // .catch(error => console.log('error', error));

    var text = $('#inputTxtDrag').val()
    var getNumPage = /(([(]น.*[0-9].*\-.*[0-9]+[)]))/g;
    let getLinkWiki = /(?:(?:สืบค้นจาก|จากวิกิพีเดีย)\s(?:https?:\/\/)?(?:[\w\-])+\.{1}[a-zA-Z./ก-์]+[^ ])/g;
    let getTHESIS = /([วิทยานิพนธ์]+.(?:(?:[ก-์]+\.)*)?\s\([ก-์]+\))/g;
    var getLink = /(?:(?:https?:\/\/)?(?:[\w\-])+\.{1}[a-zA-Z./ก-์]+[^ ])/g;
    var numPage = text.match(getNumPage);
    let linkWiki = text.match(getLinkWiki)
    let THESIS = text.match(getTHESIS)
    var link = []
    if(!linkWiki) {
        link = text.match(getLink)
    }

    numPage = (numPage)?[text.match(getNumPage)[0].replaceAll(" ", "").replace(".",". ")]:[]

    console.log("VANCOUVER.includes(mode) => " , VANCOUVER.includes(mode));
    if(VANCOUVER.includes(mode)){
        text = text.split(':').join(',')
    }

    let textDrag = text.replace(getNumPage , "").replace(getLinkWiki , "").replace(getTHESIS , "").replace(getLink , "").replaceAll('“','').replaceAll('”','').split('.').join(',').split(';').join(',').split(',').concat(numPage,linkWiki,THESIS,link)
    // let textDrag = text.replaceAll('“','').replaceAll('”','').split('.').join(',').split(';').join(',').split(',').concat(numPage,linkWiki,THESIS,link)

    console.log('textDrag => ' , textDrag);
    generateHtml(textDrag)

    let data = select_mode_drag.find(d => d.mode == mode)
    data['input'].forEach(d=>{
        $(`#${d.id}`).text(null).val(null)
    })
    $('#suggestionOutput').text(null)
}

function generateHtml(textDrag){
    let generateHtml = ''
    textDrag.forEach(d => {
        let txtTrim = d?.trim()
        if(txtTrim) generateHtml += `<span class="btn btn-outline-success" data-value="${txtTrim}" draggable="true" ondragstart="drag(event)">${txtTrim}</span>`
    })
    $('#txtList').html(generateHtml)
}

function generateInput(mode){

    let generateHtml = ''
    let data = select_mode_drag.find(d => d.mode == mode)

    if(!data) {$('#inputList').html(''); return }

    data['input'].forEach(d=>{

        let headerTxt = `<span class="input-group-text"  style="justify-content: center;">${d.text}</span>`
        if (d.request) headerTxt = `<span class="input-group-text"  style="justify-content: center;">*${d.text}</span>`
        generateHtml += ` 
                        <div class="input-group mb-3">
                            <div class="input-group-prepend" style="width: 10rem;">
                            ${headerTxt}
                            </div>
                            <input type="text" class="form-control" id="${d.id}"  ondrop="drop(event)" ondragover="allowDrop(event)">
                        </div>`
    })

    $('#inputList').html(generateHtml)
    $('#format').val(data.format)
}



function suggestionOutput()
{
    let mode = parseInt(MODE) // Set the mode
    if(!mode) return;
    let data = select_mode_drag.find(d => d.mode == mode)

    console.log("check Mode IEEE :" , IEEE.includes(mode) , "ADA :" , ADA.includes(mode) , mode , typeof(mode));
     
    var suggestionTxt = ''
    data['input'].forEach(d=>{
        //  เอาไวเพิ่มเงื่อนไขการแสดงผล เช่นใส่ จุด ใส่ ลูกน้ำ 
        if($(`#${d.id}`).val() != ''){ // Check Null Text
            if(VANCOUVER.includes(mode)){
                if (d.text == 'เมืองที่พิมพ์' ){
                    suggestionTxt+= $(`#${d.id}`).val()+': '
                } else if (d.text == 'มหาวิทยาลัย'){
                    suggestionTxt+= $(`#${d.id}`).val()+'; '
                }else{
                    suggestionTxt+= $(`#${d.id}`).val()+'. '
                }
            }else if ((d.text == 'ปีที่พิมพ์'||d.text == 'ชื่อวิทยานิพนธ์ปริญญามหาบัณฑิต') && ADA.includes(mode)){
                let replaceData = $(`#${d.id}`).val().replaceAll('(','').replaceAll(')','').trim()
                suggestionTxt+= '('+replaceData+'). '
            }else if (d.text == 'แปลจาก' || d.text == 'แปลโดย' ) {
                let replaceData = $(`#${d.id}`).val().replaceAll(`${d.text}`,'')
                suggestionTxt+=  d.text+' '+replaceData+'. '
            }else if (d.text == 'ชื่อวารสาร') {
                suggestionTxt+= $(`#${d.id}`).val()+', '
            }else if (d.text == 'วันเดือนปีที่สืบค้น') {
                let replaceData = $(`#${d.id}`).val().replaceAll("สืบค้นเมื่อ",'')
                suggestionTxt+=  'สืบค้นเมื่อ '+replaceData+', '
            }else if(d.text == 'ปีที่(ฉบับที่)' || d.text == 'ชื่อเรื่อง' && HARVARD.includes(mode)){
                suggestionTxt+= $(`#${d.id}`).val()+', '
            }else if (d.text == 'หน้าแรก-หน้าสุดท้าย'){
                let replaceData = $(`#${d.id}`).val().replaceAll('หน้า','')
                suggestionTxt+= 'หน้า '+replaceData+'. '
            }else{
                if(IEEE.includes(mode)){
                    if (d.text == 'ชื่อบทความ' || d.text == 'ชื่อเรื่องวิทยานิพนธ์'){
                        let replaceData = $(`#${d.id}`).val().replaceAll('“','').replaceAll('”','').replaceAll('"','')
                        suggestionTxt+= '“'+replaceData+',” '
                    }else if (d.text == 'ปีที่พิมพ์'){
                        suggestionTxt+= $(`#${d.id}`).val()+'. '
                    }else if (d.text == 'เลขหน้าบทความ'){
                        let replaceData = $(`#${d.id}`).val().replaceAll('หน้า','')
                        suggestionTxt+= 'หน้า '+replaceData+', '
                    }else if (d.text == 'ปีที่' || d.text == 'ฉบับที่' ) {
                        let replaceData = $(`#${d.id}`).val().replaceAll(`${d.text}`,'')
                        suggestionTxt+=  d.text+' '+replaceData+', '
                    }else{
                        suggestionTxt+= $(`#${d.id}`).val()+', '
                    }
                }else{
                    suggestionTxt+= $(`#${d.id}`).val()+'. '
                }
            }
        }

        console.log(d.text , ' => ', $(`#${d.id}`).val() , suggestionTxt)
    })

    $('#suggestionOutput').text(suggestionTxt)
    console.log('suggestionTxt => ' , suggestionTxt);
}

function genTable(data){
    let status = ['ถูก','ผิด']
    let bodyTable = ''
    data.forEach(d => {
        let num = Math.floor(Math.random() * 2)
        bodyTable+= `<tr>
                        <td>${d}</td>
                        <td>${d}</td>
                        <td class="text-center">${status[num]}</td>
                        <td class="text-center"><button type="button" class="btn btn-warning">ตัดคำ</button></td>
                    </tr>`
    });

    let html = `<table class="table">
                <thead>
                    <tr>
                    <th scope="col" class="text-center" style="width:35vw;">ต้นฉบับ</th>
                    <th scope="col" class="text-center" style="width:35vw;">ผลลัพธ์</th>
                    <th scope="col" class="text-center">สถานะ</th>
                    <th scope="col" class="text-center">ตัดคำ</th>
                    </tr>
                </thead>
                <tbody>
                    ${bodyTable}
                </tbody>
                </table>`
    
    $('#outputTable').html(html)
        
}

