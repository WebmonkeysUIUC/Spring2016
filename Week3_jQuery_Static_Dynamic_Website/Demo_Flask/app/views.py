from flask import render_template, redirect, url_for, jsonify
from app import app
from .forms import NameForm

@app.route('/')
@app.route('/index')
def index():
	return "Hello World"

# @app.route('/names', methods=['GET','POST'])
# def getname():
# 	form = NameForm()
# 	if form.validate_on_submit():
# 		return ("Hello"+form.FirstName.data+' '+form.LastName.data+'!')
# 	return render_template('index.html', form=form)