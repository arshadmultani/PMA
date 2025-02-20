// Copyright (c) 2025, Exponit and contributors
// For license information, please see license.txt

frappe.ui.form.on("Order Book", {
	refresh(frm) {
		if (!frm.doc.customer_type) {
			frm.set_value("customer_type", "Doctor");
		}
		calculate_total_amount(frm);
		console.log("refresh event");
	},
	customer_type: function (frm) {
		// Clear the customer_name field when customer_type changes
		frm.set_value("customer_name", "");

		// Change the customer_name field properties based on customer_type
		frm.set_df_property(
			"customer_name",
			"options",
			frm.doc.customer_type === "Doctor" ? "Doctor" : "Chemist"
		);

		// Refresh the field to show new options
		frm.refresh_field("customer_name");
	},
	validate: function (frm) {
		// Calculate total amount
		let total = 0;
		frm.doc.products.forEach(function (item) {
			total += item.amount;
		});
		frm.set_value("total_amount", total);
	},
	products_remove: function (frm) {
		// Use a small delay to allow the row removal to complete
		setTimeout(function () {
			calculate_total_amount(frm);
		}, 100);
	},
});

frappe.ui.form.on("Order Book Item", {
	quantity: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if (!row.quantity || row.quantity < 1) {
			frappe.msgprint(__("Quantity must be at least 1."));
			// Optionally reset the value to 1
			row.quantity = 1;
			frm.refresh_field("products");
			// Optionally, prevent further processing:
			frappe.validated = false;
		}
		// Recalculate amount if needed
		row.amount = (row.price || 0) * row.quantity;
		frm.refresh_field("products");
		// If using a function to update the total amount, call it here
		calculate_total_amount(frm);
	},
	product: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		// Recalculate in case the product selection updates the price
		row.amount = (row.price || 0) * (row.quantity || 0);
		frm.refresh_field("products");
		calculate_total_amount(frm);
	},
	products_remove: function (frm, cdt, cdn) {
		calculate_total_amount(frm);
	},
});

function calculate_total_amount(frm) {
	let total = 0;
	// Iterate over each row in the child table
	(frm.doc.products || []).forEach(function (row) {
		total += row.amount || 0;
	});
	// Set the calculated total to the Total Amount field
	frm.set_value("total_amount", total);
}
