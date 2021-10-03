def replaceText(text,pattern):
    for pt in pattern:
        text = (pt).join([txt2.strip() for txt2 in text.split(pt)])
    return text

def createText(text,pattern):
    for pt in pattern:
        text = (".").join([txt2.strip() for txt2 in text.split(pt)])
    return text.split('.')
    
        