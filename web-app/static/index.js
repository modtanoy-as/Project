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
        {"txt" : "วิทยานิพนธ์" , "val" : 17},
        {"txt" : "อินเทอร์เน็ต" , "val" : 18},
        {"txt" : "โฮมเพจเว็บไซต์" , "val" : 19},
        {"txt" : "บล็อก" , "val" : 20}
    ],
}

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
            }else{
                $( "#feedback" ).hide().removeClass("d-flex")
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
});

$( "#selectPattern" ).change(function() {
    let THISMODE = $( this ).val();
    MODE = THISMODE
});


$('input[name=myPDF]').change(function(ev) {
    pdffile=this.files[0]
    pdffile_url=URL.createObjectURL(pdffile);
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
    {'txtSpecial' : '{".":5,"(" : 1 , ")" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '1' },
    {'txtSpecial' : '{".":3,"(" : 1 , ")" : 1 }' , 'structure' : 'ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.' , 'mode' : '2' }
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