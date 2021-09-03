import re
from collections import defaultdict




# INPUT
txt = 'ธรณ์ ธำรงนาวาสวัสดิ์. (2548). ใต้ทะเลมีความรัก ภาคสาม: หลังคลื่นอันดามัน. พิมพ์ครั้งที่ 2. กรุงเทพฯ: บ้านพระอาทิตย์.'

# ชื่อผู้แต่ง./(ปีที่พิมพ์)./ชื่อเรื่อง./ครั้งที่พิมพ์ (พิมพ์ครั้งที่ 2 เป็นต้นไป)./สถานที่พิมพ์:/สำนักพิมพ์.
if re.search(r"ครั้งที่",txt):
    pt = ['.', '(', ')', '.', '.', '.', ':', '.'] 
else:
    pt = ['.', '(', ')', '.', '.', ':', '.'] 


leftCheck = {'(' : 1 , ':' : 3 } 
rightCheck = { ')' : 3 , ':' : 1 }

# Special Only
txtSpecial = ['.','(',')',':']


# Variable
mergeIndex = []
countMerge = defaultdict(int)
list2Positions = {}
positions2List = {}
specialError = []

# FUNCTION
def checkPosition(idx,val):
    print(val)
    countLeftPosition = 0
    countRightPosition = 0
    # if val in leftCheck:
    #     for i in range(idx+1):
    #         if idx-i != idx:
    #             if x[idx-i] != ".":
    #                 break
    #             countLeftPosition+=1
    #     print(countLeftPosition , leftCheck[val])
    
    if val in rightCheck:
        for i in range(idx):
            print(i)
        #     print(idx+i , len(x) , x[idx+i])
        #     if idx+i != idx:
        #         if x[idx+i] != ".":
        #             break
        #         countRightPosition+=1
        # print(countRightPosition , rightCheck[val])

for txtsp in txtSpecial:
    listPoisition = [m.start() for m in re.finditer("\\" + txtsp, txt)] 
    list2Positions[txtsp] = listPoisition
    for p in listPoisition:
        positions2List[p] = txtsp

for txtX in pt:
    # Fix ':'
    if txtX == ':':
        mergeIndex.append(list2Positions[txtX][len(list2Positions[txtX]) - 1]) # Get last position ":"
    else:
        try:
            mergeIndex.append(list2Positions[txtX][countMerge[txtX]])
            countMerge[txtX] = countMerge[txtX]+1
        except Exception as e:
            print(txtX)
            if txtX not in specialError:
                specialError.append(txtX)

lenArrayMerge = len(mergeIndex)
for idx , val  in enumerate(mergeIndex):
    if idx != lenArrayMerge-1:
        if idx == 0:
            if val > mergeIndex[idx+1]:
                if positions2List[val] not in specialError:
                    specialError.append(positions2List[val])
        else:
            print(mergeIndex[idx-1] , val , mergeIndex[idx+1])
            if mergeIndex[idx-1] > val or val > mergeIndex[idx+1]:
                if positions2List[val] not in specialError:
                    specialError.append(positions2List[val])
    else:
        if mergeIndex[idx-1] > val:
            if positions2List[val] not in specialError:
                specialError.append(positions2List[val])

print(mergeIndex)


x = []
for i in mergeIndex:
    x.append(positions2List[i])

print(x)
for idx,val in enumerate(x):
    if val in ["(",")",":"]:
        checkPosition(idx,val)



if specialError:
    print('จำนวนอักขระ "'+ '" "'.join(specialError) +'" ไม่ครบตามโครงสร้างโปรดตรวจสอบอีกครั้ง')
else:
    print("ข้อมูลถูกต้อง")