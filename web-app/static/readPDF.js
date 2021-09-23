function ExtractText(pdffile) {
    var fReader = new FileReader();
    fReader.readAsDataURL(pdffile);
    // console.log(input.files[0]);
    fReader.onloadend = function (event) {
        return convertDataURIToBinary(event.target.result);
    }
}

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return pdfAsArray(array)

}

function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    console.log('PDFDocumentInstance => ' , PDFDocumentInstance);
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                console.log("textContent => " , textContent);
                var textItems = textContent.items;
                var finalString = "";
                var listArray = []
                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];
                    if(item.str == " " && item.fontName == "g_d0_f3"){
                        (finalString.trim()!="") &&
                        listArray.push(finalString.trim())
                        finalString = ""
                    }
                    finalString += item.str + " ";
                }

                console.log('finalString => ' , finalString );


                console.log('listArray => '  , listArray);

                // Solve promise with the text retrieven from the page
                resolve(listArray);
            });
        });
    });
}

function pdfAsArray(pdfAsArray) {
    PDFJS.getDocument(pdfAsArray).then(function (pdf) {
        var pdfDocument = pdf;
        // Create an array that will contain our promises
        var pagesPromises = [];
        for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
            // Required to prevent that i is always the total of pages
            (async function (pageNumber) {
                console.log('DATA PDF => ' , pageNumber);
                // Store the promise of getPageText that returns the text of a page
                pagesPromises.push(getPageText(pageNumber, pdfDocument));
            })(i + 1);
        }
        // Execute all the promises
        var dataListText = []
        Promise.all(pagesPromises).then(function (pagesText) {

            for (var pageNum = 0; pageNum < pagesText.length; pageNum++) {
                pagesText[pageNum].forEach((data,idx) => {
                    !(pageNum==0 && idx == 0)&&
                    dataListText.push(data)
                });
            }
            console.log('dataListText => ' , dataListText);
            genTable(dataListText)
        });

    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}