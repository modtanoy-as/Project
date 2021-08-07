import re


class ApaMatch:
    def __init__(self):
        self.feedback = ""      # feedback string; explains error
        self.end = 0            # end character position for target
        self.start = 0          # start character position for target
        self.target = ""        # target substring that contains error with context
        self.suggestions = []   # list of replacement suggestions, if any

    def print(self):
        if self.start and self.end:
            print("Match from " + str(self.start) + " to " + str(self.end)
                  + " for:")
            if self.target:
                print("Target: " + self.target.strip())
        if self.feedback:
            print("Feedback: " + self.feedback.strip())
        if self.suggestions:
            for s in self.suggestions:
                print("Suggestion: " + s.strip())

    def sprint(self):
        string = ''
        if self.start and self.end:
            string += ("Match from " + str(self.start) + " to " + str(self.end)
                       + " for:\n")
            if self.target:
                string += ("Target: " + self.target + "\n")
        if self.feedback:
            string += ("Feedback: " + self.feedback + "\n")
        if self.suggestions:
            for s in self.suggestions:
                string += ("Suggestion: " + s + "\n")

        return string

    def output(self):
        txtOutput = {}
        if self.start and self.end:
            txtOutput["msg"] = "Match from " + str(self.start) + " to " + str(self.end) + " for:"
            print("Match from " + str(self.start) + " to " + str(self.end)
                  + " for:")
            if self.target:
                txtOutput["target"] =  self.target.strip()
                print("Target: " + self.target.strip())
        if self.feedback:
            txtOutput["feedback"] = self.feedback.strip()
            print("Feedback: " + self.feedback.strip())
        if self.suggestions:
            for s in self.suggestions:
                txtOutput["suggestion"] = s.strip()
                print("Suggestion: " + s.strip())
        return txtOutput


class ApaCheck:
        def __init__(self):
            self.Matches = []

        def check(self, text , structure , txtSpecial):
            self.Matches = []
            newMatch = ApaMatch()
            IsError = 0
            IscounttxtSpecialError = False
            suggestion = ""
            count = 0
            countn = 0
            countn1 = 0
            indexs = [0]
            indexs1 = [0]
            indexs2 = [0]
            indexCheck = []
            resultCheck = []
            newText = ""
            resultTxt = ""
            
            for txtsp,no in txtSpecial.items():
                for index in [m.start() for m in re.finditer("\\" + txtsp, text)]:
                    if text[len(text) - 1] != "." and (text[index+1] != " " or text[index+2] == " " or text[index-1] == " "):
                        IsError += 1
                    elif text[len(text) - 1] == "." and (text[index-2] == " " and text[index-1] == " "):
                        IsError += 1
            print(IsError)
            for txtsp1,no1 in txtSpecial.items():
                    counttxtSpecial = 0
                    counttxtSpecial = len([n.start() for n in re.finditer("\\" + txtsp1, text)])
                    if counttxtSpecial != no1:
                        IscounttxtSpecialError = True
                        break
                    else:
                        IscounttxtSpecialError = False
            if IsError > 0 and IscounttxtSpecialError == False:
                newMatch.feedback = (u"ข้อมูลไม่ตรงตามโครงสร้าง ต้องเป็นไปตามโครงสร้างดังต่อไปนี้"+" => " + structure)
                for txtsp in txtSpecial:
                    for index in [m.start() for m in re.finditer("\\" + txtsp, text)]:
                        indexs.append(index - 1)
                        indexs1.append(index + 1)
                        indexs.sort()
                        indexs1.sort()
                for i in range(0,len(indexs)):
                    countn = 0
                    if(i < len(indexs) - 1):
                        if i != 0:
                            for vals in range((indexs1)[i],(indexs1)[i+1],1):
                                countn += 1
                                if text[vals] == " " and vals == (indexs1)[i]:
                                    if(text[vals - 1] != "(" and text[vals - 1] != "[" and text[vals - 1] != ")" and text[vals - 1] != "]" and text[vals - 1] != "-"):
                                        continue
                                    else:
                                        indexCheck.append(vals)
                                else:
                                    if text[vals] != " " and countn == 1:
                                        continue
                                    else:
                                        if text[vals] != " ":
                                            break
                                        elif (text[vals - 1] != "(" and text[vals - 1] != "[" and text[vals - 1] != ")" and text[vals - 1] != "]" and text[vals - 1] != "-"):
                                            indexCheck.append(vals)                        
                        for val in range((indexs)[i+1],(indexs)[i],-1):
                            if text[val] != " ":
                                break
                            else:
                                indexCheck.append(val)
                result = [x for x in range(0,len(text)) if x not in indexCheck]
                for txt in result:
                    newText += text[txt]
                for txtsp in txtSpecial:
                    for index2 in [n.start() for n in re.finditer("\\" + txtsp, newText)]:
                        indexs2.append(index2)
                    indexs2.sort()
                    for i in range(0,len(indexs2)):
                        countn1 = 0
                        if(i < len(indexs2) - 1):
                            if i != 0:
                                for vals1 in range((indexs2)[i],(indexs2)[i+1],1):
                                    countn1 += 1
                                    if (newText[vals1+1] != " " and countn1 == 1) and (newText[vals1] != "(" and newText[vals1] != "[" and newText[vals1] != ")" and newText[vals1] != "]" and newText[vals1] != "-"):
                                        resultCheck.append(vals1)
                                    else:
                                        continue
                for y in range(0,len(newText)):
                    resultTxt += newText[y]
                    if y in resultCheck:
                         resultTxt += " "
                suggestion += resultTxt

            elif IscounttxtSpecialError == True:
                newMatch.feedback = (u"จำนวนอักขระพิเศษไม่ครบตามโครงสร้างโปรดตรวจสอบอีกครั้ง"+" => " + structure)

            else:
                newMatch.feedback = (u"ข้อมูลถูกต้อง")

            if newMatch and suggestion:
                newMatch.suggestions.append(suggestion)
                self.Matches.append(newMatch)
            else:
                self.Matches.append(newMatch)


            return self.Matches



        