# coding=utf8
import pythainlp
from pythainlp import sent_tokenize, word_tokenize
from pythainlp.tokenize.multi_cut import find_all_segment, mmcut, segment

def replaceTxt(text):
    to_replace = ['.' , ',']
    for char in to_replace:
        text = text.replace(char, ' ')

    return text



def mainCutText(text):
    replaceTxtData = replaceTxt(text)
    dataTxt = sent_tokenize(replaceTxtData, engine="whitespace",keep_whitespace=False)
    print('dataTxt => ' , dataTxt)
    return dataTxt

# words = [w for w in word_tokenize(replaceTxtData, engine="ulmfit") if w.strip() !='']

# for i in mmcut(replaceTxtData):
#     print("i => " , i)

# ck = Cutkum()