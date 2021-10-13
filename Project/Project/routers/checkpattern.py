from typing import Dict
from fastapi import APIRouter , HTTPException , Depends , Query , File, UploadFile
from typefunction import typefunction

router = APIRouter(
    tags=["checkFormat"],
    responses={404: {"message": "Not found"}}
)

@router.post("/checkFormat" , status_code = 200)
async def checkFormat(txt:str,mode:int):
    typefn = typefunction()
    if mode == 1:
        result =  typefn.checkBOOK(txt)
    elif mode == 2:
        result =  typefn.checkARTICLE(txt)
    elif mode == 3:
        result =  typefn.checkJOURNAL(txt)
    elif mode == 4:
        result =  typefn.checkTHESES(txt)
    elif mode == 5:
        result =  typefn.checkELECTRONICS(txt)
    elif mode == 6:
        result =  typefn.checkWIKI(txt)
    elif mode == 7:
        result =  typefn.checkPERIODICAL(txt)
    elif mode == 8:
        result =  typefn.checkTHESISIEEE(txt)
    elif mode == 9:
        result =  typefn.checkJOURNALHARVARD(txt)
    elif mode == 10:
        result =  typefn.checkBOOKHARVARD(txt)
    elif mode == 11:
        result =  typefn.checkARTICLEHARVARD(txt)
    elif mode == 12:
        result =  typefn.checkBOOKMANY(txt)
    elif mode == 13:
        result =  typefn.checkELECTRONICSHARVARD(txt)
    elif mode == 14:
        result =  typefn.checkTHESISHARVARD(txt)
    elif mode == 15:
        result =  typefn.checkJOURNALARTICLES(txt)
    elif mode == 16:
        result =  typefn.checkBOOKVANCOUVER(txt)
    elif mode == 17:
        result =  typefn.checkTHESISVANCOUVER(txt)
    elif mode == 18:
        result =  typefn.checkINTERNET(txt)
    elif mode == 19:
        result =  typefn.checkHOMEPAGEWED(txt)
    elif mode == 20:
        result =  typefn.checkBLOG(txt)
    return result
    
from datetime import datetime, timedelta
from readPDF import readPDF
import os
@router.post("/readPDF" , status_code = 200)
async def readPDFMain(file: UploadFile = File(...)):

    if file.filename.find(".pdf") == -1:
         return {"filename": file.filename , "data" : [] , "status" : False }

    # GET PATH NOW
    pathNow = __file__.split('/')
    pathNow.pop(len(pathNow)-1)
    pathNow = ('/').join(pathNow)

    # JOIN PATH+FILENAME
    TIMENOW=(datetime.now() + timedelta(hours=7)).strftime('%Y%m%dT%H%M%S')
    newFileName = file.filename.replace('.pdf',"_"+TIMENOW+".pdf")
    pathfile = os.path.join(pathNow, 'upload_file' ,newFileName)

    with open(pathfile, "wb+") as file_object:
        file_object.write(await file.read())

    data = readPDF(pathfile)

    return {"filename": file.filename , "data" : data , "status" : True }
    


    