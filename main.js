chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if (msg.subject === "changedUrl") {
        load_realmmlp_button();
    }
});

$(function () {
    load_realmmlp_button();

    $("body").on("click", "#start_fast_offer", function () {
        let ac = "";
        let acres = "";
        let address = "";
        let agent = "";
        let agent_email = "";
        let agent_number = "";
        let agent_type = "";
        let building_insurance = "";
        let bldg_ins_incl = 0;
        let brokerage = "";
        let brokerage_address_city = "";
        let brokerage_address_postal_code = "";
        let brokerage_address_street = "";
        let brokerage_fax = "";
        let brokerage_phone = "";
        let cable_tv_incl = 0;
        let cac_incl = 0;
        let city = "";
        let class2_value = "";
        let class_value = "";
        let com_elem_incl = 0;
        let commission = "";
        let corp = "";
        let corpnumber = "";
        let exposure = "";
        let exclusions = "";
        let front = "";
        let furnished = "";
        let heat = "";
        let heat_incl = 0;
        let heat_source = "";
        let hydro_incl = 0;
        let irregular = "";
        let inclusions = "";
        let inclusions_two = "";
        let laundry = "";
        let legaldescription = "";
        let legallevel = "";
        let legalunit = "";
        let locker = "";
        let lockerlevel = "";
        let lockernumber = "";
        let lockerunit = "";
        let lotlength = "";
        let lotwidth = "";
        let maintenance = "";
        let maintenances_array = [];
        let mls = "";
        let parking = "";
        let parking_cost = "";
        let parking_spots = "";
        let parkinglevel = "";
        let parkingnumber = "";
        let parkingunit = "";
        let prkg_incl = 0;
        let province = "";
        let seller = "";
        let taxes = "";
        let taxyear = "";
        let type_value = "";
        let unit = "";
        let under_contract_rental = "";
        let under_contract_cost = "";
        let water_incl = 0;
        let zip = "";

        let current_url = window.location.href;
        if (current_url.includes("realmmlp.ca")) {
            let address_data1 = $(".addr h1").eq(0).text();
            let address_data_parts1 = address_data1.split(",");
            let address_temp = address_data_parts1[0].trim();
            let address_parts = address_temp.split(" ");
            let address_last = address_parts[address_parts.length - 1];
            address = address_temp.replace(" " + address_last, "", address_temp);
            city = address_data_parts1[1].trim();
            zip = $(".addr .zip").eq(0).text();
            mls = $(".listing-id").eq(0).text();
            type_value = $(".price .label").eq(0).text();
            type_value = type_value.replace("For", "").trim();

            let class_value_temp = $("#section-overview h2").eq(0).text().trim();
            let class_value_parts = class_value_temp.split("\n");
            class_value = class_value_parts[0].trim();
            class2_value = class_value_parts[1].trim();

            $("#section-listing-info dt").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Taxes") {
                        taxes = item_value;
                    } else if (item_title == "Tax Year") {
                        taxyear = item_value;
                    } else if (item_title == "Seller/Landlord Name") {
                        seller = item_value;
                    } else if (item_title == "Park Cost/Mo") {
                        parking_cost = item_value;
                    } else if (item_title == "Maintenance") {
                        maintenance = item_value.replace("\n", "").replace("\t", "").trim();
                    } else if (item_title == "Condo Registry Office") {
                        corp = item_value;
                    } else if (item_title == "Commission Co-Op Brokerage") {
                        commission = item_value;
                    } else if (item_title == "Legal Description") {
                        legaldescription = item_value;
                    } else if (item_title == "Condo Corp#") {
                        corpnumber = item_value;
                    } else if (item_title == "Parking Level Unit1") {
                        parkinglevel = item_value;
                    }
                }
            });

            $("#section-property-info dt").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Fronting On") {
                        front = item_value;
                    } else if (item_title == "Lot Size") {
                        let lot_data = item_value;
                        let lot_data_parts = lot_data.split("x");
                        lotwidth = lot_data_parts[0].trim();
                        if (lot_data_parts[1]) {
                            lotlength = lot_data_parts[1].replace("Feet", "").trim();
                        }
                    } else if (item_title == "Acres") {
                        acres = item_value;
                    } else if (item_title == "Level") {
                        legallevel = item_value;
                    } else if (item_title == "Unit #") {
                        legalunit = item_value;
                    } else if (item_title == "A/C") {
                        ac = item_value;
                    } else if (item_title == "heating type") {
                        heat = item_value;
                    } else if (item_title == "Heating Source") {
                        heat_source = item_value;
                    } else if (item_title == "Laundry Access") {
                        laundry = item_value;
                    } else if (item_title == "Locker") {
                        locker = item_value;
                    } else if (item_title == "Locker #") {
                        lockernumber = item_value;
                    } else if (item_title == "Locker Level") {
                        lockerlevel = item_value;
                    } else if (item_title == "Locker Unit#") {
                        lockerunit = item_value;
                    } else if (item_title == "Lot Irregularities") {
                        irregular = item_value;
                    } else if (item_title == "Parking/Drive") {
                        parking = item_value;
                    } else if (item_title == "Parking Spot#") {
                        parkingnumber = item_value;
                    } else if (item_title == "Total Parking Spaces") {
                        parking_spots = item_value;
                    } else if (item_title == "Apt/Unit") {
                        unit = item_value;
                    }
                }
            });

            $(".section-title").each(function () {
                let section = $(this);
                let section_title = section.text();
                if (section_title == "included") {
                    section
                            .next()
                            .find("li")
                            .each(function () {
                                let item_value = $(this).text();
                                let item_class = $(this).attr("class");
                                if (!item_class || item_class != "not-included") {
                                    if (item_value == "Parking") {
                                        prkg_incl = 1;
                                    } else if (item_value == "Hydro") {
                                        hydro_incl = 1;
                                    } else if (item_value == "Central AC") {
                                        cac_incl = 1;
                                    } else if (item_value == "Common Elements") {
                                        com_elem_incl = 1;
                                    } else if (item_value == "Water") {
                                        water_incl = 1;
                                    } else if (item_value == "Cable TV") {
                                        cable_tv_incl = 1;
                                    } else if (item_value == "Heat") {
                                        heat_incl = 1;
                                    }
                                }
                            });
                }
            });

            if ($(".contact-details-link").length) {
                brokerage = $(".contact-details-link").eq(0).text().trim();
                brokerage = brokerage.replace(", BROKERAGE", "").trim();
            }

            $('[class="tel-type label"]').each(function () {
                let tel_item = $(this);
                let tel_item_label = tel_item.text();
                if (tel_item.next()) {
                    let tel_item_value = tel_item.next().text();
                    if (tel_item_label == "Phone") {
                        brokerage_phone = tel_item_value;
                    } else if (tel_item_label == "Fax") {
                        brokerage_fax = tel_item_value;
                    }
                }
            });

            if ($(".agent .contact-details-link").length) {
                let agent_data = $(".agent .contact-details-link").eq(0).text().trim();
                let agent_data_parts = agent_data.split(",");
                agent = agent_data_parts[0].trim();
                if (agent_data_parts[1]) {
                    agent_type = agent_data_parts[1].trim();
                }
                agent_number = $(".agent .phone").eq(0).text().trim();
            }

            if ($("#contracted_with").length) {
                let brokerage_address = $("#contracted_with")
                        .next()
                        .find("span")
                        .last()
                        .text();
                if (brokerage_address) {
                    let brokerage_address_parts = brokerage_address.split(" ");
                    brokerage_address_postal_code =
                            brokerage_address_parts[brokerage_address_parts.length - 1];
                    brokerage_address_city =
                            brokerage_address_parts[brokerage_address_parts.length - 2];
                    brokerage_address_street = brokerage_address.replace(
                            brokerage_address_city + " " + brokerage_address_postal_code,
                            ""
                            );
                }
            }
        } else if (current_url.includes("matrix.itsorealestate.ca")) {
            let address_data1 = $("#wrapperTable .d-mega").eq(0).text();
            let address_data_parts1 = address_data1.split(",");
            let address_temp = address_data_parts1[0].trim();
            let address_parts2 = address_temp.split("Unit #");
            address = address_parts2[0].trim();
            if (address_parts2[1]) {
                unit = address_parts2[1].trim();
            }

            city = address_data_parts1[1].trim();
            if (address_data_parts1[2]) {
                let zip_parts = address_data_parts1[2].trim().split(" ");
                let total_zip_parts = zip_parts.length;
                zip =
                        zip_parts[total_zip_parts - 2] + " " + zip_parts[total_zip_parts - 1];
            }

            mls = $(".d100m18").text().trim();
            mls = mls.replace("MLS®#:", "").trim();

            //Purchase or Lease
            let type_value_temp = $("tr.d100m13")
                    .eq(1)
                    .find(".d100m22")
                    .eq(0)
                    .text()
                    .trim();

            if (type_value_temp) {
                let type_value_parts = type_value_temp.split("/");
                let type_item = "";
                type_item = type_value_parts[1].trim();
                if (type_item == "Residential") {
                    type_value = "Sale";
                } else if (type_item == "Residential Lease") {
                    type_value = "Lease";
                }
            }

            class2_value = $(".d99m17").eq(0).text();

            $(".d102m4").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Common Interest:") {
                        class_value = item_value;
                    } else if (item_title == "Tax Amt/Yr:") {
                        let tax_temp = item_value;
                        let tax_parts = tax_temp.split("/");
                        taxes = tax_parts[0].trim();
                        taxyear = tax_parts[1].trim();
                    }
                }
            });

            $(".d144m5").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Condo Corp #:") {
                        corpnumber = item_value;
                    }
                }
            });

            $(".d55m18").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Acres Range:") {
                        acres = item_value;
                    } else if (item_title == "Lot Irregularities:") {
                        irregular = item_value;
                    } else if (item_title.includes("Depth (Ft):")) {
                        lotlength = item_value;
                    }
                }
            });

            $(".d55m20").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Fronting On:") {
                        front = item_value;
                    }
                }
            });

            $(".d132m29").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Laundry Access:") {
                        laundry = item_value;
                    } else if (item_title == "Cooling:") {
                        ac = item_value;
                    } else if (item_title == "Heating:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    }
                }
            });

            $(".d132m36 .label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Furnished:") {
                        furnished = item_value;
                    }
                }
            });

            $(".d132m38").each(function () {
                let current_item = $(this);
                let item_title = current_item.text().trim();
                let item_title_html = current_item.html();

                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Tenant Pays:") {
                        let included_text = item_value;
                        let included_items = included_text.split(", ");
                        if (included_items.includes("Hydro")) {
                            hydro_incl = 0;
                        }
                        if (included_items.includes("Heat")) {
                            heat_incl = 0;
                        }
                        if (included_items.includes("Cable TV")) {
                            cable_tv_incl = 0;
                        }
                        if (included_items.includes("Water")) {
                            water_incl = 0;
                        }
                        if (included_items.includes("Common Elements")) {
                            cable_tv_incl = 0;
                        }
                    } else if (item_title_html.includes("Owner&nbsp;Pays:")) {
                        let notincluded_text = item_value;
                        let notincluded_items = notincluded_text.split(", ");
                        if (notincluded_items.includes("Hydro")) {
                            hydro_incl = 1;
                        }
                        if (notincluded_items.includes("Heat")) {
                            heat_incl = 1;
                        }
                        if (notincluded_items.includes("Cable TV")) {
                            cable_tv_incl = 1;
                        }
                        if (notincluded_items.includes("Water")) {
                            water_incl = 1;
                        }
                        if (notincluded_items.includes("Common Elements")) {
                            cable_tv_incl = 1;
                        }
                    } else if (item_title == "Ownership:") {
                        if (item_value == "Condominium") {
                            class_value = "condo";
                        } else if (item_value == "Freehold") {
                            class_value = "freehold";
                        }
                    }
                }
            });

            if (!class_value) {
                if (class2_value.includes("Condo")) {
                    class_value = "condo";
                } else {
                    class_value = "freehold";
                }
            }

            $(".d99m23 .label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Seller:") {
                        seller = item_value;
                    }
                }
            });

            if (!seller) {
                $(".d99m24 .label").each(function () {
                    let current_item = $(this);
                    let item_title = $(this).text().trim();
                    if (current_item.next()) {
                        let item_value = current_item.next().text();
                        if (item_title == "Seller:") {
                            seller = item_value;
                        }
                    }
                });
            }

            $(".d210m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Legal Desc:") {
                        let legal_temp = item_value;
                        legaldescription = legal_temp;
                        let legal_parts = legal_temp.split(",");
                        legalunit = legal_parts[0].replace("UNIT", "").trim();
                        if (legal_parts[1]) {
                            legallevel = legal_parts[1].replace("LEVEL", "").trim();
                            if (legal_parts[2]) {
                                let legal_corp = legal_parts[2].split(".");
                                if (legal_corp[1]) {
                                    corp = legal_corp[0].replace("NO", "").trim();
                                    corpnumber = legal_corp[1].trim();
                                }
                            }
                        }
                    }
                }
            });

            $(".d144m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Condo Fees:") {
                        let main_temp = item_value;
                        let main_parts = main_temp.split("/");
                        maintenance = main_parts[0].replace("$", "").trim();
                    } else if (item_title == "Locker:") {
                        let locker_data = item_value;
                        let locker_data_parts = locker_data.split("/");
                        locker = locker_data_parts[0].trim();
                        if (locker_data_parts[1]) {
                            lockernumber = locker_data_parts[1].trim();
                        }
                    } else if (item_title == "Condo Fees Incl:") {
                        let condo_fees_text = item_value;
                        let condo_fees_items = condo_fees_text.split(", ");
                        if (condo_fees_items.includes("Hydro")) {
                            hydro_incl = 1;
                        }
                        if (condo_fees_items.includes("Heat")) {
                            heat_incl = 1;
                        }
                        if (condo_fees_items.includes("Cable TV")) {
                            cable_tv_incl = 1;
                        }
                        if (condo_fees_items.includes("Common Elements")) {
                            com_elem_incl = 1;
                        }
                        if (condo_fees_items.includes("Central Air Conditioning")) {
                            cac_incl = 1;
                        }
                        if (condo_fees_items.includes("Water")) {
                            water_incl = 1;
                        }

                        if (condo_fees_items.length) {
                            for (let i = 0; i <= condo_fees_items.length; i++) {
                                let condo_fee_value = condo_fees_items[i];
                                maintenances_array.push({name: condo_fee_value});
                            }
                        }
                    }
                }
            });

            $(".d107m14 .label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Buyer Agency Compensation Remarks:") {
                        commission = item_value;
                    }
                }
            });

            $(".d55m16").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Parking Spaces:") {
                        parking_spots = item_value;
                    } else if (item_title == "Parking Level/Unit:") {
                        parkingunit = item_value;
                    } else if (item_title.includes("Front (Ft):")) {
                        lotwidth = item_value;
                    }
                }
            });

            $(".d55m32").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Cooling:") {
                        ac = item_value;
                    } else if (item_title == "Heating:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    } else if (item_title == "Under Contract:") {
                        under_contract_rental = item_value;
                    } else if (item_title == "Inclusions:") {
                        inclusions = item_value;
                    } else if (item_title == "Add Inclusions:") {
                        inclusions_two = item_value;
                    } else if (item_title == "Exclusions:") {
                        exclusions = item_value;
                    }
                }
            });

            $(".d55m40 .label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Contract Cost/Mo:") {
                        under_contract_cost = item_value;
                    }
                }
            });

            $(".d107m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "List Salesperson:") {
                        agent = item_value;
                    } else if (item_title == "List Brokerage:") {
                        brokerage = item_value.replace(", Brokerage", "").trim();
                    } else if (item_title == "Email:") {
                        agent_email = item_value;
                    }
                }
            });

            $(".d107m8").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Brkge #:") {
                        brokerage_phone = item_value;
                    } else if (item_title == "L/SP Cell:") {
                        agent_number = item_value;
                    }
                }
            });
        } else if (current_url.includes("trreb.mlxmatrix.com")) {
            let address_data1 = $("#wrapperTable .d-mega").eq(0).text();
            let address_data_parts1 = address_data1.split(",");
            let address_temp = address_data_parts1[0].trim();
            let address_parts2 = address_temp.split("Unit #");
            address = address_parts2[0].trim();
            if (address_parts2[1]) {
                unit = address_parts2[1].trim();
            }
            city = address_data_parts1[1].trim();
            if (address_data_parts1[2]) {
                let zip_parts = address_data_parts1[2].trim().split(" ");
                let total_zip_parts = zip_parts.length;
                zip =
                        zip_parts[total_zip_parts - 2] + " " + zip_parts[total_zip_parts - 1];
            }
            mls = $(".d93m21").text().trim();
            mls = mls.replace("MLS®#:", "").trim();

            //Purchase or Lease
            let type_value_temp = $("tr.d93m23 td.d93m20")
                    .eq(0)
                    .text()
                    .trim();

            if (type_value_temp) {
                let type_value_parts = type_value_temp.split("/");
                let type_item = "";
                if (type_value_parts[1]) {
                    type_item = type_value_parts[1].trim();
                    if (type_item == "Residential Condo & Other") {
                        type_value = "Sale";
                        class_value = "condo";
                    } else if (type_item == "Residential Condo & Other Lease") {
                        type_value = "Lease";
                        class_value = "condo";
                    } else if (type_item == "Residential Freehold") {
                        type_value = "Sale";
                        class_value = "freehold";
                    } else if (type_item == "Residential Freehold Lease") {
                        type_value = "Lease";
                        class_value = "freehold";
                    }
                }
            }

            $(".d27m8 .label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Seller:") {
                        seller = item_value;
                    }
                }
            });

            //Freehold Sale
            $(".d101m4").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Lot Irreg:") {
                        irregular = item_value;
                    } else if (item_title == "Lot Front:") {
                        lotwidth = item_value;
                    } else if (item_title.includes("Lot Depth:")) {
                        lotlength = item_value;
                    } else if (item_title == "Tax Amt/Yr:") {
                        let tax_temp = item_value;
                        let tax_parts = tax_temp.split("/");
                        taxes = tax_parts[0].trim();
                        taxyear = tax_parts[1].trim();
                    } else if (item_title == "Legal Desc:") {
                        let legal_temp = item_value;
                        legaldescription = legal_temp;
                        let legal_parts = legal_temp.split(",");
                        legalunit = legal_parts[0].replace("UNIT", "").trim();
                        if (legal_parts[1]) {
                            legallevel = legal_parts[1].replace("LEVEL", "").trim();
                            if (legal_parts[2]) {
                                let legal_corp = legal_parts[2].split(".");
                                if (legal_corp[1]) {
                                    corp = legal_corp[0].replace("NO", "").trim();
                                    corpnumber = legal_corp[1].trim();
                                }
                            }
                        }
                    } else if (item_title == "Style:") {
                        class2_value = item_value;
                    }
                }
            });

            $(".d101m6").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Lot Acres:") {
                        acres = item_value;
                    } else if (item_title == "Fronting On:") {
                        front = item_value;
                    }
                }
            });

            $(".d102m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Heat:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    } else if (item_title == "A/C:") {
                        let heat_parts = item_value.split("/");
                        ac = heat_parts[1].trim();
                    }
                }
            });

            $(".d102m11").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Tot Pk Spcs:") {
                        parking_spots = item_value;
                    }
                }
            });

            //Condo Sale

            $(".d116m4").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Tax Amt/Yr:") {
                        let tax_temp = item_value;
                        let tax_parts = tax_temp.split("/");
                        taxes = tax_parts[0].trim();
                        taxyear = tax_parts[1].trim();
                    } else if (item_title == "Legal Level:") {
                        legallevel = item_value;
                    } else if (item_title == "Corp #:") {
                        corpnumber = item_value;
                    } else if (item_title.includes("Reg Office:")) {
                        corp = item_value;
                    } else if (item_title == "Style:") {
                        class2_value = item_value;
                    } else if (item_title == "Locker:") {
                        locker = item_value;
                    } else if (item_title == "Locker Level:") {
                        lockerlevel = item_value;
                    } else if (item_title == "Locker #:") {
                        lockernumber = item_value;
                    } else if (item_title == "Locker Unit #:") {
                        lockerunit = item_value;
                    }
                }
            });

            $(".d116m6").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Legal Unit:") {
                        legalunit = item_value;
                    } else if (item_title == "Lot Acres:") {
                        acres = item_value;
                    } else if (item_title == "Fronting On:") {
                        front = item_value;
                    }
                }
            });

            $(".d117m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Exposure:") {
                        exposure = item_value;
                    } else if (item_title == "Heat:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    }
                }
            });

            $(".d117m5").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Maintenance:") {
                        maintenance = item_value;
                    } else if (item_title == "Com Elem Inc:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "A/C:") {
                        let heat_parts = item_value.split("/");
                        ac = heat_parts[1].trim();
                    } else if (item_title == "Included:") {
                        let included_text = item_value;
                        let included_items = included_text.split(", ");
                        if (included_items.includes("Hydro")) {
                            hydro_incl = 1;
                        }
                        if (included_items.includes("Heating")) {
                            heat_incl = 1;
                        }
                        if (included_items.includes("Cable TV")) {
                            cable_tv_incl = 1;
                        }
                        if (included_items.includes("Water")) {
                            water_incl = 1;
                        }
                        if (included_items.includes("CAC")) {
                            cac_incl = 1;
                        }
                        if (included_items.includes("Building Insurance")) {
                            building_insurance = 1;
                        }
                    }
                }
            });

            $(".d117m7").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Laundry Acc:") {
                        laundry = item_value;
                    } else if (item_title == "Park Type") {
                        parking = item_value;
                    } else if (item_title == "Tot Pk Spcs:") {
                        parking_spots = item_value;
                    } else if (item_title == "Park Spot 1/2:") {
                        parkingnumber = item_value;
                    } else if (item_title == "Park Lvl/Unit:") {
                        parking_level = item_value;
                    } else if (item_title == "Park Type:") {
                        parking_type = item_value;
                    }
                }
            });

            //Condo Lease

            $(".d119m4").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();

                    if (item_title == "Legal Level:") {
                        legallevel = item_value;
                    } else if (item_title == "Corp #:") {
                        corpnumber = item_value;
                    } else if (item_title.includes("Reg Office:")) {
                        corp = item_value;
                    } else if (item_title == "Locker:") {
                        locker = item_value;
                    } else if (item_title == "Locker Level:") {
                        lockerlevel = item_value;
                    } else if (item_title == "Locker #:") {
                        lockernumber = item_value;
                    } else if (item_title == "Locker Unit #:") {
                        lockerunit = item_value;
                    }
                }
            });

            $(".d119m6").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Legal Unit:") {
                        legalunit = item_value;
                    } else if (item_title == "Lot Acres:") {
                        acres = item_value;
                    } else if (item_title == "Fronting On:") {
                        front = item_value;
                    }
                }
            });

            $(".d120m8").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Exposure:") {
                        exposure = item_value;
                    } else if (item_title == "Heat:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    } else if (item_title == "Laundry Acc:") {
                        laundry = item_value;
                    }
                }
            });

            $(".d120m12").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Locker:") {
                        locker = item_value;
                    } else if (item_title == "Com Elem Inc:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "Furnished:") {
                        furnished = item_value;
                    } else if (item_title == "A/C:") {
                        let heat_parts = item_value.split("/");
                        ac = heat_parts[1].trim();
                    } else if (item_title == "Included:") {
                        let included_text = item_value;
                        let included_items = included_text.split(", ");
                        if (included_items.includes("Hydro")) {
                            hydro_incl = 1;
                        }
                        if (included_items.includes("Heating")) {
                            heat_incl = 1;
                        }
                        if (included_items.includes("Cable TV")) {
                            cable_tv_incl = 1;
                        }
                        if (included_items.includes("Water")) {
                            water_incl = 1;
                        }
                        if (included_items.includes("CAC")) {
                            cac_incl = 1;
                        }
                        if (included_items.includes("Building Insurance")) {
                            building_insurance = 1;
                        }
                        if (included_items.includes("All Inclusive")) {
                            building_insurance = 1;
                            cac_incl = 1;
                            water_incl = 1;
                            cable_tv_incl = 1;
                            heat_incl = 1;
                            hydro_incl = 1;
                        }
                    }
                }
            });

            $(".d120m20").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Park Cost/Mo:") {
                        parking_cost = item_value;
                    } else if (item_title == "Park Type") {
                        parking = item_value;
                    } else if (item_title == "Tot Pk Spcs:") {
                        parking_spots = item_value;
                    } else if (item_title == "Park Spot 1/2:") {
                        parkingnumber = item_value;
                    } else if (item_title == "Park Lvl/Unit:") {
                        parking_level = item_value;
                    } else if (item_title == "Park Type:") {
                        parking_type = item_value;
                    }
                }
            });

            //Freehold Lease

            $(".d110m4").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Lot Front:") {
                        lotwidth = item_value;
                    } else if (item_title.includes("Lot Depth:")) {
                        lotlength = item_value;
                    } else if (item_title == "Style:") {
                        class2_value = item_value;
                    }
                }
            });

            $(".d110m6").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Fronting On:") {
                        front = item_value;
                    }
                }
            });

            $(".d120m8").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Heat:") {
                        let heat_parts = item_value.split(",");
                        heat = heat_parts[0].trim();
                        if (heat_parts[1]) {
                            heat_source = heat_parts[1].trim();
                        }
                    } else if (item_title == "A/C:") {
                        let heat_parts = item_value.split("/");
                        ac = heat_parts[1].trim();
                    }
                }
            });

            $(".d111m11").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Park Cost/Mo:") {
                        parking_cost = item_value;
                    } else if (item_title == "Tot Pk Spcs:") {
                        parking_spots = item_value;
                    } else if (item_title == "Laundry Acc:") {
                        laundry = item_value;
                    }
                }
            });

            $(".d111m14").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Furnished:") {
                        furnished = item_value;
                    } else if (item_title == "Com Elem Inc:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "Included:") {
                        let included_text = item_value;
                        let included_items = included_text.split(", ");
                        if (included_items.includes("Hydro")) {
                            hydro_incl = 1;
                        }
                        if (included_items.includes("Heating")) {
                            heat_incl = 1;
                        }
                        if (included_items.includes("Cable TV")) {
                            cable_tv_incl = 1;
                        }
                        if (included_items.includes("Water")) {
                            water_incl = 1;
                        }
                        if (included_items.includes("CAC")) {
                            cac_incl = 1;
                        }
                        if (included_items.includes("Building Insurance")) {
                            building_insurance = 1;
                        }
                        if (included_items.includes("All Inclusive")) {
                            building_insurance = 1;
                            cac_incl = 1;
                            water_incl = 1;
                            cable_tv_incl = 1;
                            heat_incl = 1;
                            hydro_incl = 1;
                        }
                    }
                }
            });

            //Brokerage Info

            $(".d98m3").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "List Brokerage:") {
                        brokerage = item_value.replace(", Brokerage", "").trim();
                    } else if (item_title == "List Salesperson:") {
                        agent = item_value;
                    }
                } else if (item_title == "List Brkr Addr:") {
                    listing_brokerage_street = item_value;
                }
            });

            $(".d98m8").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "Phone:") {
                        brokerage_phone = item_value;
                    } else if (item_title == "Fax:") {
                        brokerage_fax = item_value;
                    }
                }
            });

            $(".d98m5").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "CB Comm:") {
                        commission = item_value;
                    }
                }
            });
        } else {
            $("#ReportContainer span.report-label").each(function () {
                let current_item = $(this);
                let item_title = $(this).text().trim();
                if (current_item.next()) {
                    let item_value = current_item.next().text();
                    if (item_title == "[addr]:") {
                        address = item_value;
                    } else if (item_title == "MLS#:") {
                        mls = item_value;
                    } else if (item_title == "[municipality]:") {
                        city = item_value;
                    } else if (item_title == "[county]:") {
                        province = item_value;
                    } else if (item_title == "[zip]:") {
                        zip = item_value;
                    } else if (item_title == "Level:") {
                        legallevel = item_value;
                    } else if (item_title == "Unit#:") {
                        legalunit = item_value;
                    } else if (item_title == "[apt_num]:") {
                        unit = item_value;
                    } else if (item_title == "Heat:") {
                        let heat_data = item_value;
                        let heat_data_parts = heat_data.split("/");
                        heat = heat_data_parts[0].trim();
                        if (heat_data_parts[1]) {
                            heat_source = heat_data_parts[1].trim();
                        }
                    } else if (item_title == "Heat Incl:") {
                        heat_incl = item_value;
                    } else if (item_title == "Heat Inc:") {
                        heat_incl = item_value;
                    } else if (item_title == "A/C:") {
                        ac = item_value;
                    } else if (item_title == "Water Incl:") {
                        water_incl = item_value;
                    } else if (item_title == "Hydro Incl:") {
                        hydro_incl = item_value;
                    } else if (item_title == "Cable TV Incl:") {
                        cable_tv_incl = item_value;
                    } else if (item_title == "Bldg Ins Incl:") {
                        building_insurance = item_value;
                    } else if (item_title == "CAC Incl:") {
                        cac_incl = item_value;
                    } else if (item_title == "Prkg Incl:") {
                        prkg_incl = item_value;
                    } else if (item_title == "Water Inc:") {
                        water_incl = item_value;
                    } else if (item_title == "Hydro Inc:") {
                        hydro_incl = item_value;
                    } else if (item_title == "Cable Inc:") {
                        cable_tv_incl = item_value;
                    } else if (item_title == "CAC Inc:") {
                        cac_incl = item_value;
                    } else if (item_title == "Parking Inc:") {
                        prkg_incl = item_value;
                    } else if (item_title == "Com Elem Inc:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "ComElem Inc:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "Com Elem Incl:") {
                        com_elem_incl = item_value;
                    } else if (item_title == "Furnished:") {
                        furnished = item_value;
                    } else if (item_title == "Ph:") {
                        brokerage_phone = item_value;
                    } else if (item_title == "Fax:") {
                        brokerage_fax = item_value;
                    } else if (item_title == "[rltr]:") {
                        brokerage = item_value.replace(", BROKERAGE", "").trim();
                    } else if (item_title == "[rltr_st]:") {
                        brokerage_address_street = item_value;
                    } else if (item_title == "[rltr_municipality]:") {
                        brokerage_address_city = item_value;
                    } else if (item_title == "[rltr_zip]:") {
                        brokerage_address_postal_code = item_value;
                    } else if (item_title == "Lndry Acc:") {
                        laundry = item_value;
                    } else if (item_title == "Exposure:") {
                        exposure = item_value;
                    } else if (item_title == "For:") {
                        type_value = item_value;
                    } else if (item_title == "[type_own1_out]:") {
                        class_value = item_value;
                    } else if (item_title == "[style]:") {
                        class2_value = item_value;
                    } else if (item_title == "Sellers:") {
                        seller = item_value;
                    } else if (item_title == "Locker:") {
                        locker = item_value;
                    } else if (item_title == "Park/Drive:") {
                        parking = item_value;
                    } else if (item_title == "Tot Pk Spcs:") {
                        parking_spots = item_value;
                    } else if (item_title == "Park $/Mo:") {
                        parking_cost = item_value;
                    } else if (item_title == "Pk Spot#:" && !parkingnumber) {
                        parkingnumber = item_value;
                    } else if (item_title == "[legal_desc]:") {
                        legaldescription = item_value;
                    } else if (item_title == "Acre:") {
                        acres = item_value;
                    } else if (item_title == "Front On:") {
                        front = item_value;
                    } else if (item_title == "Irreg:") {
                        irregular = item_value;
                    } else if (item_title == "Taxes:") {
                        taxes = item_value;
                    } else if (item_title == "[yr]:") {
                        taxyear = item_value;
                    } else if (item_title == "Locker Unit#:") {
                        lockerunit = item_value;
                    } else if (item_title == "Locker Level:") {
                        lockerlevel = item_value;
                    } else if (item_title == "Locker#:") {
                        lockernumber = item_value;
                    } else if (item_title == "Maint:") {
                        maintenance = item_value;
                    } else if (item_title == "Prk Lvl/Unit:") {
                        let park_data = item_value;
                        let park_data_parts = park_data.split("/");
                        parkinglevel = park_data_parts[0].trim();
                        if (park_data_parts[1]) {
                            parkingunit = park_data_parts[1].trim();
                        }
                    } else if (item_title == "Prk Lev/Unit:") {
                        let park_data = item_value;
                        let park_data_parts = park_data.split("/");
                        parkinglevel = park_data_parts[0].trim();
                        if (park_data_parts[1]) {
                            parkingunit = park_data_parts[1].trim();
                        }
                    } else if (item_title == "[$plotDimensions]:") {
                        let lot_data = item_value;
                        let lot_data_parts = lot_data.split("x");
                        lotwidth = lot_data_parts[0].trim();
                        if (lot_data_parts[1]) {
                            lotlength = lot_data_parts[1].replace("Feet", "").trim();
                        }
                    } else if (item_title == "[list_agent]:") {
                        let agent_data = item_value;
                        let agent_data_parts = agent_data.split(",");
                        agent = agent_data_parts[0].trim();
                        if (agent_data_parts[1]) {
                            agent_type = agent_data_parts[1].trim();
                        }
                    } else if (item_title == "Corp#:") {
                        let corp_data = item_value;
                        let corp_data_parts = corp_data.split("/");
                        corp = corp_data_parts[0].trim();
                        if (corp_data_parts[1]) {
                            corpnumber = corp_data_parts[1].trim();
                        }
                    } else if (item_title == "[lagt_ph]:") {
                        agent_number = item_value;
                    } else if (item_title == "CB Comm:") {
                        commission = item_value;
                    }
                }
            });
        }

        if (heat_incl == "Y") {
            heat_incl = 1;
        } else if (heat_incl == "N") {
            heat_incl = 0;
        }
        if (building_insurance == "Y") {
            bldg_ins_incl = 1;
        } else if (building_insurance == "N") {
            bldg_ins_incl = 0;
        }
        if (cable_tv_incl == "Y") {
            cable_tv_incl = 1;
        } else if (cable_tv_incl == "N") {
            cable_tv_incl = 0;
        }
        if (heat_incl == "Y") {
            heat_incl = 1;
        } else if (heat_incl == "N") {
            heat_incl = 0;
        }
        if (water_incl == "Y") {
            water_incl = 1;
        } else if (water_incl == "N") {
            water_incl = 0;
        }
        if (hydro_incl == "Y") {
            hydro_incl = 1;
        } else if (hydro_incl == "N") {
            hydro_incl = 0;
        }
        if (cac_incl == "Y") {
            cac_incl = 1;
        } else if (cac_incl == "N") {
            cac_incl = 0;
        }
        if (prkg_incl == "Y") {
            prkg_incl = 1;
        } else if (prkg_incl == "N") {
            prkg_incl = 0;
        }
        if (com_elem_incl == "Y") {
            com_elem_incl = 1;
        } else if (com_elem_incl == "N") {
            com_elem_incl = 0;
        }

        let title = "";
        if (unit) {
            title = unit + " - " + address;
        } else {
            title = address;
        }

        corpnumber = parseInt(corpnumber);
        lotwidth = parseInt(lotwidth);
        lotlength = parseInt(lotlength);
        parking_spots = parseInt(parking_spots);

        taxyear = parseInt(taxyear);

        taxes = taxes.replace("$", "").replace(",", "");
        taxes = parseFloat(taxes);

        let has_locker;
        if (
                locker == "Ensuite" ||
                locker == "Common" ||
                locker == "None" ||
                locker == ""
                ) {
            has_locker = 0;
        } else {
            has_locker = 1;
        }

        let property_class = "";
        if (
                class_value == "freehold" ||
                class_value == "Att/Row/Twnhouse" ||
                class_value == "Freehold/None" ||
                class_value == "Cottage" ||
                class_value == "Detached" ||
                class_value == "Duplex" ||
                class_value == "Farm" ||
                class_value == "Fourplex" ||
                class_value == "Link" ||
                class_value == "Mobile/Trailer" ||
                class_value == "Multiplex" ||
                class_value == "Other" ||
                class_value == "Rural Resid" ||
                class_value == "Semi-Detached" ||
                class_value == "Store w/Apt/Offc" ||
                class_value == "Triplex" ||
                class_value == "Vacant Land"
                ) {
            property_class = "Freehold";
        } else if (
                class_value == "condo" ||
                class_value == "Comm Element Condo" ||
                class_value == "Condo Apt" ||
                class_value == "Condominium" ||
                class_value == "Condo Townhouse" ||
                class_value == "Co-op Apt" ||
                class_value == "Co-Ownership Apt" ||
                class_value == "Det Condo" ||
                class_value == "Leasehold Condo" ||
                class_value == "Locker" ||
                class_value == "Parking Space"
                ) {
            property_class = "Condo";
        }

        let street_parts = address.split(" ");
        let street_number = street_parts[0];
        address = address.replace(street_number + " ", "");

        if (cable_tv_incl) {
            maintenances_array.push({name: "Cable TV"});
        }
        if (hydro_incl) {
            maintenances_array.push({name: "Hydro"});
        }
        if (cac_incl) {
            maintenances_array.push({name: "Air Conditioning"});
        }
        if (com_elem_incl) {
            maintenances_array.push({name: "Common Element"});
        }
        if (heat_incl) {
            maintenances_array.push({name: "Heat"});
        }
        if (water_incl) {
            maintenances_array.push({name: "Water"});
        }

        let data = {
            ac_type: ac,
            acres: acres,
            address: {
                street_name: address,
                street_number: street_number,
                city_name: city,
                postal_code: zip,
            },
            agent_email: agent_email,
            agent_number: agent_number,
            agent_title: agent_type,
            building_insurance: building_insurance,
            bldg_ins_incl: bldg_ins_incl,
            brokerage: brokerage,
            cable_tv_inc: cable_tv_incl,
            cac_inc: cac_incl,
            com_elements_inc: com_elem_incl,
            commission: commission,
            corporation_jurisdiction: corp,
            corporation_number: corpnumber,
            exposure: exposure,
            exclusions: exclusions,
            fax: brokerage_fax,
            fronting_on: front,
            furnished: furnished,
            has_locker: has_locker,
            heat_inc: heat_incl,
            heat_source: heat_source,
            heat_type: heat,
            hydro_inc: hydro_incl,
            irregular: irregular,
            inclusions: inclusions,
            inclusions_two: inclusions_two,
            laundry_type: laundry,
            legal_description: legaldescription,
            legal_level: legallevel,
            legal_unit: legalunit,
            listing_agent: agent,
            listing_brokerage_city: brokerage_address_city,
            listing_brokerage_street: brokerage_address_street,
            listing_brokerage_zip: brokerage_address_postal_code,
            locker_level: lockerlevel,
            locker_number: lockernumber,
            locker_type: locker,
            locker_unit: lockerunit,
            lot_depth: lotlength,
            lot_front: lotwidth,
            maintenance_fee: maintenance,
            maintenances: maintenances_array,
            mls: mls,
            offer: type_value,
            owner: seller,
            parking_cost: parking_cost,
            parking_inc: prkg_incl,
            parking_level: parkinglevel,
            parking_number: parkingnumber,
            parking_spots: parking_spots,
            parking_type: parking,
            parking_unit: parkingunit,
            phone: brokerage_phone,
            property_class: property_class,
            property_type: class_value,
            style: class2_value,
            tax: taxes,
            tax_year: taxyear,
            title: title,
            unit_name: unit,
            under_contract_rental: under_contract_rental,
            under_contract_cost: under_contract_cost,
            water_inc: water_incl
        };

        chrome.storage.local.get(["user_id"], function (storage_data) {
            let user_id = "";
            if (storage_data["user_id"] && storage_data["user_id"] != "undefined")
                user_id = storage_data["user_id"];

            let url = "https://beta.fastoffers.ca/?s=ext&mls=" + mls + "&user=";
            if (user_id) {
                url += user_id;
            } else {
                url += "demo";
            }

            chrome.runtime.sendMessage({
                from: "content",
                subject: "openUrl",
                url: url,
                data: data,
            });
        });

        return false;
    });
});

function load_realmmlp_button() {
    $("#start_fast_offer").remove();
    const icon = chrome.runtime.getURL("icons/icon.png");
    const button =
            '<button id="start_fast_offer" class="realmmlp_button"><span class="toolbar-item-label">Start Fast Offer</span></button>';
    let interval = setInterval(function () {
        if (
                ($(".nav-path-node-current").length &&
                        $(".nav-path-node-current").text().includes("Detail View")) ||
                $("#section-overview .price").length ||
                $("#m_tblActionMenu").length
                ) {
            clearInterval(interval);
            if (!$("#start_fast_offer").length) {
                if ($("#section-overview .price").length) {
                    $("#section-overview .price").append(
                            '<button id="start_fast_offer" class="realmmlp_button"><span class="toolbar-item-label">Start Fast Offer</span></button>'
                            );
                    $(".realmmlp_button").css("padding", "5px");
                    $(".realmmlp_button").css("margin", "5px");
                    $(".realmmlp_button").css("color", "#555A5D");
                    $(".realmmlp_button").css("background-color", "#FFFFFF");
                    $(".realmmlp_button").css("border", "1px solid #555A5D");
                    $(".realmmlp_button").css("border-radius", "5.6px");
                    $(".realmmlp_button").css("font-size", "12px");
                } else if ($("#m_tblActionMenu").length) {
                    $("#m_tblActionMenu tr")
                            .eq(0)
                            .append(
                                    '<td id="start_fast_offer" class="link important barleft enabled" title=""><a href="#"><span class="linkIcon icon_cma" style="background-image:url(Images/icons/cma.png);">Start Fast Offer</span></a></td>'
                                    );
                } else {
                    $("#ctl00_ctl00_Content_DefaultToolbar").append(
                            '<li class="toolbar-item page-mode-view" style=""><button id="start_fast_offer" class="toolbar-button"><span class="toolbar-item-label">Start Fast Offer</span></button></li>'
                            );
                    $("#start_fast_offer").css("background-image", "url(" + icon + ")");
                }
            }
        }
    }, 1000);
}
