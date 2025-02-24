// frappe.ui.form.on("POB Item", {
// 	quantity: function (frm, cdt, cdn) {
// 		let row = locals[cdt][cdn];
// 		// Calculate amount: price * quantity
// 		row.amount = (row.price || 0) * (row.quantity || 0);
// 		// Refresh the field to update the table display
// 		frm.refresh_field("products");
// 	},
// 	// Optionally, if you need to update the amount when product is selected (in case price is updated)
// 	product: function (frm, cdt, cdn) {
// 		let row = locals[cdt][cdn];
// 		row.amount = (row.price || 0) * (row.quantity || 0);
// 		frm.refresh_field("products");
// 	},
// });
