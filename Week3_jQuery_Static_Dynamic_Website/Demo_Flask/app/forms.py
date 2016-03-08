from flask.ext.wtf import Form
from wtforms import StringField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length

class NameForm(Form):
	FirstName = StringField('firstname', validators=[DataRequired()])
	LastName = StringField('lastname', validators=[DataRequired()])