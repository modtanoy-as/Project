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

    let myfile = $('input[name=myPDF]')[0].files[0]
    if(myfile){
        pdffile_url=URL.createObjectURL(myfile);
        ExtractText(pdffile)
        
        $('#viewer').attr('src',pdffile_url);

        $("#panel-wrap")
            .removeClass("fa fa-angle-down")
            .addClass("fa fa-angle-up");

        $("#panel-wrap").closest(".card").find(".collapse").collapse("show");
    }

});

$( "#selectPattern" ).change(function() {
    let THISMODE = $( this ).val();
    MODE = THISMODE
    generateInput(MODE)

    let myfile = $('input[name=myPDF]')[0].files[0]
    if(myfile){
        pdffile_url=URL.createObjectURL(myfile);
        ExtractText(pdffile)
        
        $('#viewer').attr('src',pdffile_url);

        $("#panel-wrap")
            .removeClass("fa fa-angle-down")
            .addClass("fa fa-angle-up");

        $("#panel-wrap").closest(".card").find(".collapse").collapse("show");
    }

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

function replaceText(text,pattern){
    pattern.forEach(pt => {
        text = text.split(pt).map(d => d.trim());
        text = text.join(pt)
    });

    return text
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
    }else if($(ev.target).get(0).id == 'thesis1'){
        concatTxt = ($(ev.target).val())?$(ev.target).val()+' '+replaceText(data,[' (',')']):replaceText(data,[' (',')'])
    }else if($(ev.target).get(0).id == 'location'){
        concatTxt = ($(ev.target).val())?$(ev.target).val()+': '+data:data
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
    let getTHESIS = /([วิทยานิพนธ์]+.(?:(?:[ก-์]+\.)*)?\s\(.[ก-์]+.\))/g;
    var getLink = /(?:(?:https?:\/\/)?(?:[\w\-])+\.{1}[a-zA-Z./ก-์]+[^ ])/g;
    let getYearVancouver = /(?:[0-9]+.\[.*\])/g;
    var numPage = text.match(getNumPage);
    let linkWiki = text.match(getLinkWiki)
    let THESIS = text.match(getTHESIS)
    var link = []
    var YearVancouver = []
    if(!linkWiki) {
        link = text.match(getLink)
    }

    numPage = (numPage)?[text.match(getNumPage)[0].replaceAll(" ", "").replace(".",". ")]:[]

    if(VANCOUVER.includes(mode)){
        YearVancouver = text.match(getYearVancouver)
        text = text.replace(getLink , "").split(':').join(',').replaceAll("เข้าถึงได้จาก" ,"").replace(getYearVancouver , "")
    }

    let textDrag = text.replace(getNumPage , "").replace(getLinkWiki , "").replace(getTHESIS , "").replace(getLink , "").replaceAll('“','').replaceAll('”','').split('.').join(',').split(';').join(',').split(',').concat(numPage,linkWiki,THESIS,link,YearVancouver)
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
                if (d.text == 'เมืองที่พิมพ์' || d.text == 'เล่มที่ของวารสาร' || d.id == 'numyear' ){
                    suggestionTxt+= $(`#${d.id}`).val()+': '
                } else if (d.text == 'มหาวิทยาลัย' || d.text == 'ชื่อวารสารปีพิมพ์' || d.id == 'year' || d.id == 'location'){
                    suggestionTxt+= $(`#${d.id}`).val()+'; '
                }else if(d.text == 'เข้าถึงได้จาก'){
                    suggestionTxt+= d.text + ": " +$(`#${d.id}`).val()
                }else if(d.text == 'หน้า'){
                    let replaceData = $(`#${d.id}`).val().replaceAll('[','').replaceAll(']','').replaceAll("หน้า" , "").trim()
                    suggestionTxt+= '[หน้า '+replaceData+']. '
                }else if( d.id == 'yearLong'){
                    let replaceData = replaceText($(`#${d.id}`).val(), ['['])
                    suggestionTxt+= replaceData+'. '
                }else{
                    suggestionTxt+= $(`#${d.id}`).val()+'. '
                }
            }else if ((d.text == 'ปีที่พิมพ์'||d.text == 'ชื่อวิทยานิพนธ์ปริญญามหาบัณฑิต' || d.text == 'เลขหน้าที่ปรากฏ') && ADA.includes(mode)){
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

    console.log("Table => " , data);
    let status = ['ผิด','ถูก']
    let bodyTable = ''


    if(MODE === 0){
        $(".alertTxt").addClass("show")
        setTimeout(() => {
            $(".alertTxt").removeClass("show")
        }, 2500);
        return
    }

    let dataTable = []
    data.map(async text => {
        let dataOutput = getCheckFormatTable(text,MODE)
        dataTable.push(dataOutput)
    })


    Promise.all(dataTable).then(listData => {
        listData.forEach(d => {
            let statusTable = (d.statusNum == 0)?`text-danger`:'text-success'
            let cutBtn =  (d.statusNum == 0)?'':'disabled'
            bodyTable+= `<tr>
                            <td>${d.textIn}</td>
                            <td>${d.textOut}</td>
                            <td>${d.feedback}</td>
                            <td class="text-center ${statusTable}">${status[d.statusNum]}</td>
                            <td class="text-center"><button type="button" onclick="cutTextTable('${d.textIn}')" class="btn btn-warning ${cutBtn}">ตัดคำ</button></td>
                        </tr>`
        })
  
        let html = `<table class="table">
                    <thead>
                        <tr>
                        <th scope="col" class="text-center" style="width:30vw;">ต้นฉบับ</th>
                        <th scope="col" class="text-center" style="width:30vw;">ผลลัพธ์</th>
                        <th scope="col" class="text-center" style="width:20vw;">ข้อเสนอแนะ</th>
                        <th scope="col" class="text-center">สถานะ</th>
                        <th scope="col" class="text-center">ตัดคำ</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bodyTable}
                    </tbody>
                    </table>`
        
        $('#outputTable').html(html)
    })
        
}

function checkStatus(dataFeedback){
    let feedback = dataFeedback.split(',').map(d=>d.trim())
    if ((feedback.includes("ไม่มีครั้งที่พิมพ์") || feedback.includes("ไม่มีวันที่สืบค้น")) && feedback.length>1 || feedback.length > 0 && !(feedback.includes("ไม่มีครั้งที่พิมพ์")|| feedback.includes("ไม่มีวันที่สืบค้น"))){
        // ผิด
        return 0
    }else{
        // ถูก
        return 1
    }
}

async function getCheckFormatTable(text,mode){

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    let param = `txt=${text}&mode=${mode}`

    const response = await fetch(API_URL+"checkFormat?"+param, requestOptions)
    const data = await response.json()
    let statusNum = checkStatus(data['feedback'])

    return { 'textIn' : text , 'textOut' : data['text']  , 'feedback' : data['feedback'] , 'statusNum' : statusNum}
}


function cutTextTable(text){
    $('#Bibliographyhelper').show('fast' , d=>{
        $('#inputTxtDrag').val(text)
        $('#inputTxtDrag')[0].scrollIntoView();
        cutText()
    })
}


function clearFile(){
    $('input[name=myPDF]').val(null)
}