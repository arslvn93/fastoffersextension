$(function () {
    const icon = chrome.runtime.getURL('icons/icon.png');
    const button = '<button id="start_fast_offer" class="realmmlp_button"><span class="toolbar-item-label">Start Fast Offer</span></button>';
    $("#start_fast_offer").remove();
    let interval = setInterval(function () {
        if (($(".nav-path-node-current").length && $(".nav-path-node-current").text().includes("Detail View")) || $(".links-actions").length) {
            clearInterval(interval);
            if ($(".links-actions").length) {
                $(".links-actions").append('<button id="start_fast_offer" class="realmmlp_button"><span class="toolbar-item-label">Start Fast Offer</span></button>');
                $(".realmmlp_button").css("padding", "5px");
                $(".realmmlp_button").css("margin", "5px");
                $(".realmmlp_button").css("color", "#FFFFFF");
                $(".realmmlp_button").css("background-color", "green");
            } else {
                $("#ctl00_ctl00_Content_DefaultToolbar").append('<li class="toolbar-item page-mode-view" style=""><button id="start_fast_offer" class="toolbar-button"><span class="toolbar-item-label">Start Fast Offer</span></button></li>');
                $("#start_fast_offer").css("background-image", 'url(' + icon + ')');
            }
        }
    }, 1000);

    $("body").on("click", "#start_fast_offer", function () {

        let address = "";
        let mls = "";
        let city = "";
        let province = "";
        let zip = "";
        let type_value = "";
        let class_value = "";
        let class2_value = "";
        let legallevel = "";
        let seller = "";
        let locker = "";
        let ac = "";
        let heat = "";
        let heat_incl = "";
        let cable_tv_incl = "";
        let water_incl = "";
        let hydro_incl = "";
        let cac_incl = "";
        let prkg_incl = "";
        let com_elem_incl = "";
        let furnished = "";
        let laundry = "";
        let parking = "";
        let parking_spots = "";
        let parking_cost = "";
        let parkingnumber = "";
        let brokerage = "";
        let brokerage_phone = "";
        let brokerage_fax = "";
        let brokerage_address_street = "";
        let brokerage_address_city = "";
        let brokerage_address_postal_code = "";
        let agent = "";
        let agent_type = "";
        let agent_number = "";
        let commission = "";
        let unit = "";
        let corp = "";
        let corpnumber = "";
        let legalunit = "";
        let lockerlevel = "";
        let lockerunit = "";
        let lockernumber = "";
        let maintenance = "";
        let parkinglevel = "";
        let parkingunit = "";
        let taxes = "";
        let taxyear = "";
        let legaldescription = "";
        let acres = "";
        let front = "";
        let lotwidth = "";
        let lotlength = "";
        let irregular = "";
        let heat_source="";

        let current_url = window.location.href;
        if (current_url.includes("realmmlp.ca")) {
            let address_data1 = $(".addr h1").eq(0).text();
            let address_data_parts1 = address_data1.split(",");
            address = address_data_parts1[0].trim();
            city = address_data_parts1[1].trim();
            zip = $(".addr .zip").eq(0).text();
            mls = $(".listing-id").eq(0).text();
            type_value = $(".price .label").eq(0).text();
            
            class_value = $("#section-overview h2").eq(0).text();

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
                        maintenance = item_value;
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
                    section.next().find("li").each(function () {
                        let item_value = $(this).text();
                        if (item_value == "Parking") {
                            prkg_incl = "Y";
                        } else if (item_value == "Hydro") {
                            hydro_incl = "Y";
                        } else if (item_value == "Central AC") {
                            cac_incl = "Y";
                        } else if (item_value == "Common Elements") {
                            com_elem_incl = "Y";
                        } else if (item_value == "Water") {
                            water_incl = "Y";
                        } else if (item_value == "Cable TV") {
                            cable_tv_incl = "Y";
                        } else if (item_value == "Heat") {
                            heat_incl = "Y";
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
                let brokerage_address = $("#contracted_with").next().find("span").last().text();
                if (brokerage_address) {
                    let brokerage_address_parts = brokerage_address.split(" ");
                    brokerage_address_postal_code = brokerage_address_parts[brokerage_address_parts.length - 1];
                    brokerage_address_street = brokerage_address_street.replace(" " + brokerage_address_postal_code, "");
                }
            }
        } else {

            $('#ReportContainer span.report-label').each(function () {
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
                    } else if ((item_title == "Pk Spot#:") && !parkingnumber) {
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

        let data = {
            "mls": mls,
            "offer": type_value,
            "fax": brokerage_fax,
            "commission": commission,
            "property_class": class_value,
            "water_inc": water_incl,
            "phone": brokerage_phone,
            "brokerage": brokerage,
            "parking_spots": parking_spots,
            "owner": seller,
            "listing_agent": agent,
            "has_locker": locker,
            "unit_name": unit,
            "heat_inc": heat_incl,
            "agent_title": agent_type,
            "agent_number": agent_number,
            "listing_brokerage_street": brokerage_address_street,
            "isting_brokerage_city": brokerage_address_city,
            "listing_brokerage_zip": brokerage_address_postal_code,
            "parking_inc": prkg_incl,
            "corporation_jurisdiction": corp,
            "corporation_number": corpnumber,
            "legal_level": legallevel,
            "legal_unit": legalunit,
            "parking_type": parking,
            "parking_level": parkinglevel,
            "parking_unit": parkingunit,
            "street_address": address,
            "property_class_two": class2_value,
            "city": city,
            "province": province,
            "postal_code": zip,
            "locker_level": lockerlevel,
            "locker_unit": lockerunit,
            "locker_number": lockernumber,
            "parking_cost": parking_cost,
            "parking_number": parkingnumber,
            "maintenance_fees": maintenance,
            "tax": taxes,
            "tax_year": taxyear,
            "legal_description": legaldescription,
            "acres": acres,
            "front": front,
            "lot_front": lotwidth,
            "lot_depth": lotlength,
            "irregular": irregular,
            "ac_type": ac,
            "heat_type": heat,
            "heat_source": heat_source,
            "cable_tv_inc": cable_tv_incl,
            "hydro_inc": hydro_incl,
            "cac_inc": cac_incl,
            "com_elements_inc": com_elem_incl,
            "furnished": furnished,
            "laundry_type": laundry
        };

        chrome.storage.local.get(['user_id'], function (storage_data) {
            let user_id = "";
            if (storage_data['user_id'] && (storage_data['user_id'] != 'undefined'))
                user_id = storage_data['user_id'];

            let url = "https://beta.fastoffers.ca/?mls=" + mls + "&user=";
            if (user_id) {
                url += user_id;
            } else {
                url += "demo";
            }

            chrome.runtime.sendMessage({
                from: 'content',
                subject: 'openUrl',
                url: url,
                data: data
            });
        });

        return false;
    });
});
