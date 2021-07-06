from pattern import pattern
import re

class typefunction():
    def __init__(self) :
        self.test = {}
        self.arry = []
        self.alertMsg = {
        'Name' : 'ไม่มีชื่อผู้แต่ง',
        'Year' : 'ไม่มีปีที่เขียน',
        'Book' : 'ไม่มีชื่อหนังสือ',
        'Pim' : 'ไม่มีครั้งที่พิมพ์',
        'Location':'ไม่มีจังหวัดที่พิมพ์' ,
        'SamNakPim': 'ไม่มีสภานที่พิมพ์' ,
        'NumPage' : 'ไม่มีจำนวนหน้า',
        'article' : 'ไม่มีชื่อบทความ',
        'magazine' :  'ไม่มีชื่อวารสาร' , 
        'numyear' : 'ไม่มีปีที่ (ฉบับที่)' , 
        'page' : 'ไม่มีเลขหน้าที่ปรากฎ',
        'thesis' : 'ไม่มีชื่อวิทยานิพนธ์' , 
        'univer' : 'ไม่มีชื่อวิทยานิพนธ์ปริญญามหาบัณฑิตหรือวิทยานิพนธ์ปริญญาดุษฎีบัณฑิต/ชื่อมหาวิทยาลัย/สถาบันการศึกษา',
        'url' : 'ไม่พบเว็บไซต์ของข้อมูล',
        'urlWIKI' : 'ไม่พบเว็บไซต์ของข้อมูล',
        'day' : 'ไม่มีวันที่สืบค้น',
        'numissue' : 'ไม่มีฉบับที่',
        'year' : 'ไม่มีปีที่',
        'thesis1' : 'ไม่มีวิทยานิพนธ์หรือสารนิพนธ์ชื่อย่อปริญญา(สาขา)',
        'uni' : 'ไม่มีชื่อมหาวิทยาลัย',
        'city' : 'ไม่มีเมืองที่พิมพ์',
        'title' : 'ไม่มีหัวข้อ',
        'subject' : 'ไม่มีชื่อเรื่อง',
        'degree' : 'ไม่มีระดับปริญญาของวิทยานิพนธ์',
        'magazineyear' : 'ไม่มีชื่อวารสารปีพิมพ์เล่มที่ของวารสาร/เลขหน้า',
        'home' : 'ไม่มีชืื่อโฮมเพจ',
        'nameblog' : 'ไม่มีชื่อบล็อก',
        'access' : 'ไม่มีระบุวันที่การเข้าถึง'
        }
        self.msg = []

# APA
    def checkBOOK(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'BOOK'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            if re.search(r""+pattern[selectCheck]['editor']+"",item) is None:
                                                self.test[key] = data.group() 
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()
    

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkARTICLE(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]

        selectCheck = 'ARTICLE'
        # ดึงเลขหน้า เนื่องจาก น. มีจุดทำให้ ตัดไม่ได้
        if re.search(r""+pattern[selectCheck]['NumPage']+"",txt) is not None:
            self.test['NumPage'] = re.search(r""+pattern[selectCheck]['NumPage']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            if re.search(r""+pattern[selectCheck]['editor']+"",item) is None:
                                                self.test[key] = data.group() 

                                        elif key == 'editor':
                                            txtSplit = data.group().split(',')
                                            # print(len(txtSplit))
                                            self.test['Book'] = txtSplit[len(txtSplit)-1].strip()
                                            self.test['editor'] = txtSplit[0] if len(txtSplit) <= 2 else ', '.join([name.strip( ) for name in txtSplit[:-1]])
                                            print('editor => ' ,  self.test['editor'])
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'editor':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkJOURNAL(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'JOURNAL'

        if re.search(r""+pattern[selectCheck]['magazine']+"",txt) is not None:
            self.test['magazine'] = re.search(r""+pattern[selectCheck]['magazine']+"",txt).group().replace(',','')
        if re.search(r""+pattern[selectCheck]['numyear']+"",txt) is not None:
            self.test['numyear'] = re.search(r""+pattern[selectCheck]['numyear']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['page']+"",txt) is not None:
            self.test['page'] = re.search(r""+pattern[selectCheck]['page']+"",txt).group()


        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'magazine' or key == 'numyear':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkTHESES(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'THESES'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'magazine' or key == 'numyear':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkELECTRONICS(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'ELECTRONICS'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
                checkMagazine = item.split(',')
                if len(checkMagazine) > 1:
                    for mz in checkMagazine:
                        if re.search(r""+pattern[selectCheck]['magazine']+"",mz) is not None:
                            self.test['magazine'] = re.search(r""+pattern[selectCheck]['magazine']+"",mz).group()
                        if re.search(r""+pattern[selectCheck]['numyear']+"",mz) is not None:
                            self.test['numyear'] = re.search(r""+pattern[selectCheck]['numyear']+"",mz).group()
                        if re.search(r""+pattern[selectCheck]['page']+"",mz) is not None:
                            self.test['page'] = re.search(r""+pattern[selectCheck]['page']+"",mz).group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'magazine' or key == 'numyear':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkWIKI(self,txt):
        subject = [txt.strip() for txt in txt.split('. ')]
        selectCheck = 'WIKI'

        # ดึงเว็บ สืบค้น/จากวิกิ
        if re.search(r""+pattern[selectCheck]['url']+"",txt) is not None:
            self.test['url'] = re.search(r""+pattern[selectCheck]['url']+"",txt).group()
        # if re.search(r""+pattern[selectCheck]['urlWIKI']+"",txt) is not None:
        #     self.test['urlWIKI'] = re.search(r""+pattern[selectCheck]['urlWIKI']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['day']+"",txt) is not None:
            self.test['day'] = re.search(r""+pattern[selectCheck]['day']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                if key not in self.test:
                                    self.test[key] = data.group()
        print(self.test)
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'magazine' or key == 'numyear':
                    txt = txt+','
                else:
                    txt = txt+'.'
                
                if 'Name' in self.test:
                    if key != 'subject':
                        self.arry.append(txt)
                else:
                    if key != 'article':
                        self.arry.append(txt)

            except:
                if key in self.alertMsg:
                    if 'url' in  self.test:
                        if 'จากวิกิพีเดีย' in self.test['url']:
                            if key != 'article' and key != 'Name':
                                self.msg.append(self.alertMsg[key])
                        elif 'สืบค้นจาก' in self.test['url']:
                            self.msg.append(self.alertMsg[key])
                    else:
                        self.msg.append(self.alertMsg[key])
                            

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


# IEEE
    def checkPERIODICAL(self,txt):
        subject = [txt.strip().replace('” ','') for txt in txt.split(',')]
        selectCheck = 'PERIODICAL'

        if re.search(r""+pattern[selectCheck]['article']+"",txt) is not None:
            self.test['article'] = re.search(r""+pattern[selectCheck]['article']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
                                

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'article':
                    txt = txt+',”'
                elif  key == 'year':
                    txt = txt+'.'
                else:
                    txt = txt+','
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkTHESISIEEE(self,txt):
        subject = [txt.strip().replace('” ','') for txt in txt.split(',')]
        selectCheck = 'THESISIEEE'

        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['thesis']+"",txt) is not None:
            self.test['thesis'] = re.search(r""+pattern[selectCheck]['thesis']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
                                

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'thesis':
                    txt = txt+',”'
                elif  key == 'year':
                    txt = txt+'.'
                else:
                    txt = txt+','
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


# HARVARD
    def checkJOURNALHARVARD(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'JOURNALHARVARD'
        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()

                            if ',' in item:
                                splitText = item.split(',')
                                for text in splitText:
                                    if re.search(r""+pattern[selectCheck]['magazine']+"",text) is not None:
                                        result = re.search(r""+pattern[selectCheck]['magazine']+"",text).group()
                                        if len(result) == len(text):
                                            self.test['magazine'] = result 
                                    if re.search(r""+pattern[selectCheck]['numyear']+"",text) is not None:
                                        result = self.test['numyear'] = re.search(r""+pattern[selectCheck]['numyear']+"",text).group()
                                        if len(result) == len(text):
                                            self.test['magazine'] = result 
                                    if re.search(r""+pattern[selectCheck]['page']+"",text) is not None:
                                        result = self.test['page'] = re.search(r""+pattern[selectCheck]['page']+"",text).group()
                                        if len(result) == len(text):
                                            self.test['magazine'] = result 
                                        

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'magazine' or key == 'numyear':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkBOOKHARVARD(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'BOOKHARVARD'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            self.test[key] = data.group() 
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkARTICLEHARVARD(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]

        selectCheck = 'ARTICLEHARVARD'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            if re.search(r""+pattern[selectCheck]['editor']+"",item) is None:
                                                self.test[key] = data.group() 

                                        elif key == 'editor':
                                            txtSplit = data.group().split(',')
                                            # print(len(txtSplit))
                                            self.test['Book'] = txtSplit[len(txtSplit)-1].strip()
                                            self.test['editor'] = txtSplit[0] if len(txtSplit) <= 2 else ', '.join([name.strip( ) for name in txtSplit[:-1]])
                                            print('editor => ' ,  self.test['editor'])
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'editor':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkBOOKMANY(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'BOOKMANY'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            self.test[key] = data.group() 
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()
    

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkELECTRONICSHARVARD(self,txt):
        subject = [txt.strip() for txt in txt.split('. ')]
        selectCheck = 'ELECTRONICSHARVARD'

        if re.search(r""+pattern[selectCheck]['url']+"",txt) is not None:
            self.test['url'] = re.search(r""+pattern[selectCheck]['url']+"",txt).group()

        if re.search(r""+pattern[selectCheck]['day']+"",txt) is not None:
            self.test['day'] = re.search(r""+pattern[selectCheck]['day']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['subject']+"",txt) is not None:
            self.test['subject'] = re.search(r""+pattern[selectCheck]['subject']+"",txt).group().replace(',','')

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'subject':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }

    def checkTHESISHARVARD(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'THESISHARVARD'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                if key not in self.test:
                                    if key == 'SamNakPim':
                                        txtSplit = data.group().split(':')
                                        self.test['Location'] = txtSplit[0].strip()
                                        self.test['SamNakPim'] = txtSplit[1].strip()
                                    else:
                                        if key == 'Name':
                                            self.test[key] = data.group() 
                                        else:
                                            print( key , ' => ' , data.group())
                                            self.test[key] = data.group()

                            if ',' in item:
                                splitText = [txt.strip() for txt in item.split(',')]
                                for text in splitText:
                                    if re.search(r""+pattern[selectCheck]['degree']+"",text) is not None:
                                        result = re.search(r""+pattern[selectCheck]['degree']+"",text).group()
                                        if len(result) == len(text):
                                            self.test['degree'] = result 
                                    if re.search(r""+pattern[selectCheck]['uni']+"",text) is not None:
                                        result = re.search(r""+pattern[selectCheck]['uni']+"",text).group()
                                        if len(result) == len(text):
                                            self.test['uni'] = result 
                                    if re.search(r""+pattern[selectCheck]['SamNakPim']+"",text) is not None:
                                        result = re.search(r""+pattern[selectCheck]['SamNakPim']+"",text).group()
                                        if len(result) == len(text):
                                            txtSplit = result.split(':')
                                            self.test['Location'] = txtSplit[0].strip()
                                            self.test['SamNakPim'] = txtSplit[1].strip()

                                    
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'degree' or key == 'uni':
                    txt = txt+','
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }



# Vancouver
    def checkJOURNALARTICLES(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'JOURNALARTICLES'

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()

        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'volume':
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkBOOKVANCOUVER(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'BOOKVANCOUVER'

        if re.search(r""+pattern[selectCheck]['SamNakPim']+"",txt) is not None:
            self.test['SamNakPim'] = re.search(r""+pattern[selectCheck]['SamNakPim']+"",txt).group().replace(';','')
        if re.search(r""+pattern[selectCheck]['Location']+"",txt) is not None:
            self.test['Location'] = re.search(r""+pattern[selectCheck]['Location']+"",txt).group().replace(':','')
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group().replace('.','')

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
    
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if  key == 'SamNakPim' :
                    txt = txt+';'
                elif key == 'Location' :
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkTHESISVANCOUVER(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'THESISVANCOUVER'

        if re.search(r""+pattern[selectCheck]['uni']+"",txt) is not None:
            self.test['uni'] = re.search(r""+pattern[selectCheck]['uni']+"",txt).group().replace(';','')
        if re.search(r""+pattern[selectCheck]['Location']+"",txt) is not None:
            self.test['Location'] = re.search(r""+pattern[selectCheck]['Location']+"",txt).group().replace(':','')
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group().replace('.','')

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                # print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
    
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if  key == 'uni' :
                    txt = txt+';'
                elif key == 'Location' :
                    txt = txt+':'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    self.msg.append(self.alertMsg[key])

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkINTERNET(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'INTERNET'

        if re.search(r""+pattern[selectCheck]['access']+"",txt) is not None:
            self.test['access'] = re.search(r""+pattern[selectCheck]['access']+"",txt).group().replace(';','')
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group().replace(';','')
        if re.search(r""+pattern[selectCheck]['numyear']+"",txt) is not None:
            self.test['numyear'] = re.search(r""+pattern[selectCheck]['numyear']+"",txt).group().replace(':','')
        if re.search(r""+pattern[selectCheck]['page']+"",txt) is not None:
            self.test['page'] = re.search(r""+pattern[selectCheck]['page']+"",txt).group().replace(':','')
        if re.search(r""+pattern[selectCheck]['url']+"",txt) is not None:
            self.test['url'] = re.search(r""+pattern[selectCheck]['url']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'numyear':
                    txt = txt+':'
                elif  key == 'year' :
                    txt = txt+' '
                elif  key == 'url' :
                    txt = txt+' '
                elif  key == 'access' :
                    txt = txt+';'
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    if 'url' in  self.test:
                        if 'เข้าถึงได้จาก' in self.test['url']:
                            self.msg.append(self.alertMsg[key])
                    else:
                        self.msg.append(self.alertMsg[key])                   

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkHOMEPAGEWED(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'HOMEPAGEWED'

        if re.search(r""+pattern[selectCheck]['Location']+"",txt) is not None:
            self.test['Location'] = re.search(r""+pattern[selectCheck]['Location']+"",txt).group().replace(':','')
        if re.search(r""+pattern[selectCheck]['SamNakPim']+"",txt) is not None:
            self.test['SamNakPim'] = re.search(r""+pattern[selectCheck]['SamNakPim']+"",txt).group().replace(';','')
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group()

        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if key == 'Location':
                    txt = txt+':'
                elif  key == 'SamNakPim' :
                    txt = txt+';'
                elif  key == 'url' :
                    txt = txt+' '
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    if 'url' in  self.test:
                        if 'เข้าถึงได้จาก' in self.test['url']:
                            self.msg.append(self.alertMsg[key])
                    else:
                        self.msg.append(self.alertMsg[key])                   

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }


    def checkBLOG(self,txt):
        subject = [txt.strip() for txt in txt.split('.')]
        selectCheck = 'BLOG'

        if re.search(r""+pattern[selectCheck]['access']+"",txt) is not None:
            self.test['access'] = re.search(r""+pattern[selectCheck]['access']+"",txt).group()
        if re.search(r""+pattern[selectCheck]['year']+"",txt) is not None:
            self.test['year'] = re.search(r""+pattern[selectCheck]['year']+"",txt).group()
    
        for item in subject:
            if item != '':
                for key, value in pattern[selectCheck].items():
                    data = re.search(r""+value+"",item)
                    if data is not None:
                        if data.span()[1] > 0:
                            if len(item) == len(data.group()):
                                print( key , ' => ' , data.group() , len(item) == len(data.group()) ,  len(item) , len(data.group()))
                                if key not in self.test:
                                    self.test[key] = data.group()
        for key, value in pattern[selectCheck].items():
            try:
                txt = self.test[key]
                if  key == 'year' :
                    txt = txt+' '
                elif  key == 'url' :
                    txt = txt+' '
                else:
                    txt = txt+'.'
                self.arry.append(txt)
            except:
                if key in self.alertMsg:
                    if 'url' in  self.test:
                        if 'เข้าถึงได้จาก' in self.test['url']:
                            self.msg.append(self.alertMsg[key])
                    else:
                        self.msg.append(self.alertMsg[key])                   

        if len(self.msg) >0:
            return {'text' : ' '.join(self.arry) , 'feedback' : ', '.join(self.msg)}
        else:
            return {'text' : ' '.join(self.arry) }
        
        


