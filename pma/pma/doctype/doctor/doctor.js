// Copyright (c) 2025, Exponit and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Doctor", {
// 	refresh(frm) {
//         frm.add_custom_button(__("Copy DR URL"), function() {
//             frappe.show_alert({
//                 message:__("URL Copied"),
//                 indicator:'green'
//             },3);
//          }).css({"color":"black", "background-color": "#F3F3F3", "font-weight": "400"});
//     console.log(frappe.utils.get_url);
// 	},
    

// });


frappe.ui.form.on("Doctor", {   
    refresh(frm) {
        frm.add_custom_button(__("Copy Link"), function() { //COPY DR URL BUTTON
            // Construct the full URL
            let full_url =`${frappe.urllib.get_base_url()}/${frm.doc.route}`;
           
            // Try using navigator.clipboard if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(full_url).then(() => {
                    frappe.show_alert({ message: __("URL Copied"), indicator: 'green' }, 3);
                }).catch(err => {
                    console.error("Clipboard write failed:", err);
                });
            } else {
                // Fallback for older browsers (document.execCommand)
                let textArea = document.createElement("textarea");
                textArea.value = full_url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);

                frappe.show_alert({ message: __("URL Copied"), indicator: 'green' }, 3);
            }

        }).css({ "color": "black", "background-color": "#F3F3F3", "font-weight": "400" });
    }
});