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

