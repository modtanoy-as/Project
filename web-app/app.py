from flask import Flask ,render_template, url_for ,redirect, request
 

app = Flask(__name__)

@app.route('/' ,methods = ["GET" , "POST"])
def profile():
    # text_message = request.args['message']
    return render_template("page.html")

@app.route('/file' ,methods = ["GET" , "POST"])
def text():
    # text_message = request.args['message']
    return render_template("file.html")


@app.route('/a', methods = ["POST"])
def filetext():
    message = request.form['text']
    return redirect(url_for('profile' , message = message))

if __name__ == "__main__":
    app.run(debug=True)