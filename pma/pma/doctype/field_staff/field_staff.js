// // Copyright (c) 2025, Exponit and contributors
// // For license information, please see license.txt

// frappe.ui.form.on("Field Staff", {
// 	refresh(frm) {
// 		// Initial setup based on designation
// 		update_fields_visibility(frm);
// 	},

// 	staff_designation: function (frm) {
// 		// Update fields visibility when designation changes
// 		update_fields_visibility(frm);

// 		// Clear values of irrelevant fields
// 		if (frm.doc.staff_designation === "RSM") {
// 			frm.set_value("area", "");
// 			frm.set_value("hq", "");
// 		} else if (frm.doc.staff_designation === "ASM") {
// 			frm.set_value("region", "");
// 			frm.set_value("hq", "");
// 		} else if (frm.doc.staff_designation === "DSA") {
// 			frm.set_value("region", "");
// 			frm.set_value("area", "");
// 		}
// 	},

// 	// When selecting area, filter based on selected region
// 	staff_area: function (frm) {
// 		if (frm.doc.staff_area) {
// 			frappe.db.get_value("Area", frm.doc.staff_area, "region", function (data) {
// 				if (data && data.region) {
// 					frm.set_value("region_info", data.staff_region);
// 				}
// 			});
// 		}
// 	},

// 	// When selecting HQ, populate area and region info
// 	staff_headquarter: function (frm) {
// 		if (frm.doc.staff_headquarter) {
// 			frappe.db.get_value("Headquarter", frm.doc.staff_headquarter, "area", function (data) {
// 				if (data && data.staff_area) {
// 					frm.set_value("area_info", data.staff_area);

// 					// Now get the region for this area
// 					frappe.db.get_value("Area", data.satff_area, "region", function (region_data) {
// 						if (region_data && region_data.region) {
// 							frm.set_value("region_info", region_data.region);
// 						}
// 					});
// 				}
// 			});
// 		}
// 	},
// });

// // Set up custom filters
// frappe.ui.form.on("Field Staff", "onload", function (frm) {
// 	// Filter Area based on selected Region
// 	frm.set_query("area", function () {
// 		if (frm.doc.region_info) {
// 			return {
// 				filters: {
// 					region: frm.doc.region_info,
// 				},
// 			};
// 		}
// 	});

// 	// Filter HQ based on selected Area
// 	frm.set_query("hq", function () {
// 		if (frm.doc.area_info) {
// 			return {
// 				filters: {
// 					area: frm.doc.area_info,
// 				},
// 			};
// 		}
// 	});
// });

// function update_fields_visibility(frm) {
// 	// Hide all hierarchy fields initially
// 	frm.toggle_display("staff_region", false);
// 	frm.toggle_display("staff_area", false);
// 	frm.toggle_display("staff_headquarter", false);

// 	// Show appropriate fields based on designation
// 	if (frm.doc.staff_designation === "RSM") {
// 		frm.toggle_display("staff_region", true);

// 		// Add readonly display fields for hierarchy visualization
// 		if (!frm.fields_dict["hierarchy_section"]) {
// 			frm.add_custom_section("hierarchy_section", "Hierarchy Information");
// 			frm.add_custom_field({
// 				fieldname: "hierarchy_info",
// 				fieldtype: "HTML",
// 				options: '<div class="hierarchy-tree">RSM (Region Level)</div>',
// 			});
// 		}
// 	} else if (frm.doc.staff_designation === "ASM") {
// 		frm.toggle_display("staff_area", true);

// 		// Add readonly display fields for ASM's region
// 		if (!frm.fields_dict["region_info"]) {
// 			frm.add_custom_field({
// 				fieldname: "region_info",
// 				label: "Region",
// 				fieldtype: "Link",
// 				options: "Region",
// 				read_only: 1,
// 			});
// 		}

// 		if (!frm.fields_dict["hierarchy_section"]) {
// 			frm.add_custom_section("hierarchy_section", "Hierarchy Information");
// 			frm.add_custom_field({
// 				fieldname: "hierarchy_info",
// 				fieldtype: "HTML",
// 				options: '<div class="hierarchy-tree">RSM (Region) → ASM (Area)</div>',
// 			});
// 		}
// 	} else if (frm.doc.staff_designation === "DSA") {
// 		frm.toggle_display("staff_headquarter", true);

// 		// Add readonly display fields for DSA's area and region
// 		if (!frm.fields_dict["area_info"]) {
// 			frm.add_custom_field({
// 				fieldname: "area_info",
// 				label: "Area",
// 				fieldtype: "Link",
// 				options: "Area",
// 				read_only: 1,
// 			});
// 		}

// 		if (!frm.fields_dict["region_info"]) {
// 			frm.add_custom_field({
// 				fieldname: "region_info",
// 				label: "Region",
// 				fieldtype: "Link",
// 				options: "Region",
// 				read_only: 1,
// 			});
// 		}

// 		if (!frm.fields_dict["hierarchy_section"]) {
// 			frm.add_custom_section("hierarchy_section", "Hierarchy Information");
// 			frm.add_custom_field({
// 				fieldname: "hierarchy_info",
// 				fieldtype: "HTML",
// 				options: '<div class="hierarchy-tree">RSM (Region) → ASM (Area) → DSA (HQ)</div>',
// 			});
// 		}
// 	}
// }
