$(function () {
    const icon = chrome.runtime.getURL('icons/icon.png');
    let current_url = window.location.href;
    if (current_url.includes("http://v3.torontomls.net/Live/Pages/Dynamic/Results.aspx?")) {
        let interval = setInterval(function () {
            if ($(".toolbar-item-topcma").length) {
                clearInterval(interval);
                $("#ctl00_ctl00_Content_DefaultToolbar").append('<li class="toolbar-item page-mode-view" style=""><button id="start_fast_offer" class="toolbar-button"><span class="toolbar-item-label">Start Fast Offer</span></button></li>');
                $("#start_fast_offer").css("background-image", 'url(' + icon + ')');
            }
        }, 1000);
    }

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

        $('#ReportContainer span.report-label').each(function () {
            let current_item = $(this);
            let item_title = $(this).text();
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
                    heat = item_value;
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
                } else if (item_title == "Pk Spot#:") {
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

        let data = {
            "MLS": mls,
            "Type": type_value,
            "Class": class_value,
            "Class2": class2_value,
            "Street": address,
            "Unit": unit,
            "City": city,
            "Province": province,
            "PostalCode": zip,
            "corp": corp,
            "corpnumber": corpnumber,
            "LegalLevel": legallevel,
            "LegalUnit": legalunit,
            "Locker": locker,
            "lockerlevel": lockerlevel,
            "lockerunit": lockerunit,
            "lockernumber": lockernumber,
            "PrkgIncl": prkg_incl,
            "Parking": parking,
            "parkinglevel": parkinglevel,
            "parkingunit": parkingunit,
            "ParkingSpots": parking_spots,
            "ParkingCost": parking_cost,
            "ParkingNumber": parkingnumber,
            "Seller": seller,
            "maintenance": maintenance,
            "Taxes": taxes,
            "TaxYear": taxyear,
            "LegalDescription": legaldescription,
            "Acres": acres,
            "Front": front,
            "LotWidth": lotwidth,
            "LotLength": lotlength,
            "Irregular": irregular,
            "AC": ac,
            "Heat": heat,
            "HeatIncl": heat_incl,
            "CableTVIncl": cable_tv_incl,
            "WaterIncl": water_incl,
            "HydroIncl": hydro_incl,
            "CACIncl": cac_incl,
            "ComElemIncl": com_elem_incl,
            "Furnished": furnished,
            "Laundry": laundry,
            "Brokerage": brokerage,
            "BrokeragePhone": brokerage_phone,
            "BrokerageFax": brokerage_fax,
            "BrokerageAddressStreet": brokerage_address_street,
            "BrokerageAddressCity": brokerage_address_city,
            "BrokerageAddressPostalCode": brokerage_address_postal_code,
            "Agent": agent,
            "AgentType": agent_type,
            "AgentNumber": agent_number,
            "Commission": commission
        };

        //alert(JSON.stringify(data));

        $.ajax({
            url: "https://connect.pabbly.com/workflow/sendwebhookdata/IjE4MjM4MSI_3D",
            method: "POST",
            data: JSON.stringify(data),
            success: function (response) {
                alert(JSON.stringify(response));
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            }
        });
        return false;
    });
});