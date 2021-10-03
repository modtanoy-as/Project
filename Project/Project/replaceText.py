def replaceText(text,pattern):
    for pt in pattern:
        text = (pt).join([txt2.strip() for txt2 in text.split(pt)])
    return text
    
        