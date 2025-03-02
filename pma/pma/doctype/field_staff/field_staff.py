# Copyright (c) 2025, Exponit and contributors
# For license information, please see license.txt

# import frappe
# from frappe.model.document import Document


# class FieldStaff(Document):
# 	pass

import frappe
import random
import string
from frappe.model.document import Document

class FieldStaff(Document):
    def after_insert(self):
        # Create a user after field staff is created
        self.create_user()
    
    def create_user(self):
        # """Create a user with staff_phone as username"""
        if not self.staff_phone:
            return
        
        # Check if user already exists with this username
        if frappe.db.exists("User", {"username": self.staff_phone}):
            frappe.msgprint(f"User with username {self.staff_phone} already exists")
            return
        
        # Generate a random password
        # random_password = self.generate_random_password()
        
        # Create user
        user = frappe.get_doc({
            "doctype": "User",
            "email": self.staff_email,  # Required field
            "username": self.staff_phone,
            "first_name": self.staff_name if hasattr(self, 'staff_name') else "Staff User",
            "user_type": "System User",
            "send_welcome_email": 0,
            "new_password": self.staff_pan,
             "roles": [
                {"role": "Sales User"}  # Add Sales User role
            ]
        })
        
        user.insert(ignore_permissions=True)
        
        # Link the User to the Field Staff record
        self.db_set('user', user.name, update_modified=False)
        
        # Log the password for admin (for testing purposes - remove in production)
        frappe.log_error(f"User created for {self.name} with username: {self.staff_phone} and password: {self.staff_pan}", 
                     "New User Creation")
        
        # Notify admin
        frappe.msgprint(f"User created with username: {self.staff_phone}")
        
        # You can also send an email with credentials if needed
        frappe.sendmail(
            recipients=self.staff_email,
            subject="Your Account Credentials",
            message=f"Your username is: {self.staff_phone}\n Password is your PAN number in capital letters\n"
        )
    
    # def generate_random_password(self, length=5):
    #     # """Generate a random password of specified length"""
    #     characters = string.ascii_letters + string.digits 
    #     return ''.join(random.choice(characters) for i in range(length))