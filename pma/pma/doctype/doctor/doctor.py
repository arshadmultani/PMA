# Copyright (c) 2025, Exponit and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
import random
import string



class Doctor(WebsiteGenerator):
	
	def autoname(self):
		random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4)) # Generate a random string
		doc_name = self.doctor_name.lower().replace(' ', '-') # Convert the doctor name to lowercase and replace spaces with hyphens
		self.name = f"{doc_name}-{random_str}" # Concatenate the doctor name and the random string
		
		# Check Uniquesness of the name 
		while frappe.db.exists("Doctor", self.name):
			random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
			self.name = f"{doc_name}-{random_str}"

	# def get_list_context(self, context):
	# 	context.no_cache = 1# Disable list view completely
	# 	context.no_list_view = 1
	
	website= frappe._dict(
        template="templates/generators/doctor.html",
        # condition_field="published",
        # page_title_field="doctor_name",
	)
  


	

	
