from tika import parser 
import os
def readPDF(pathfile):
    # # GET PATH NOW
    # pathNow = __file__.split('/')
    # pathNow.pop(len(pathNow)-1)
    # pathNow = ('/').join(pathNow)
    
    # JOIN PATH+FILENAME
    # pathfile = os.path.join(pathNow, filename)

    # Read PDF
    raw = parser.from_file(pathfile)
    print(raw)
    listBibliography = []

    # split Text ด้วย \n\n หรือคือ enter 2 ที และลบ หัวตารางคำว่า บรรณานุกรม
    for data in raw['content'].replace("\nบรรณานุกรม","").replace("\n\n\n"," \n\n").split(' \n\n'):

        # replace พวกตัวอักษรแปลกๆจาก PDF ซ่อม สระอำ
        text = repairText(data.replace("\n", "").replace("\\", ""))

         # เช็คว่า Text เป็นค่าว่างแล้วตัวอักษรมากกว่า 1 ตัวหรือป่าว
        if text and len(text)>1 :
            print("==========================")
            print(text)
            listBibliography.append(text.strip())
    return listBibliography

# ซ่อมสระอำ
def repairText(text):
    bug = [" า"," ่า"," ้า"," ๊า"," ๋า"]
    fixBug = ["ำ","่ำ","้ำ","๊ำ","๋ำ"]
    for i in range(len(fixBug)):
        text = text.replace(bug[i],fixBug[i])
    return text
