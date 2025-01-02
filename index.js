$("#results").hide();
$("#results_pro").hide();


$(document).ready(function() {
    $.getScript("DataCalculations.js").done(() => {
        $('#submit_basic').on('click', function() {
            var data = set_results_basic();
            saveData(data);
        });
        $('#submit_pro').on('click', function() {
            var data = set_results_pro();
            saveData(data);
        });
    })
});

function set_results_basic() {

    surpressed = true;

    if (!$("#sex_id").val()) {
        alert("Please enter a valid sex.");
    } else if (!$("#age_id").val()) {
        alert("Please enter a valid age.");
    } else if (!$("#weight_id").val()) {
        alert("Please enter a valid weight.");
    } else if (!$("#height_id").val()) {
        alert("Please enter a valid height.");
    } else if (!$("#goal_id").val()) {
        alert("Please enter a valid goal.");
    } else if (!$("#activity_id").val()) {
        alert("Please enter a valid activity level.");
    } else {
        surpressed = false;
    }

    if (!surpressed) {
        arr = show_basic();
        if (!$("#save_btn_div").is(":visible")) {
            $("#save_btn_div").toggle();
            $("#box").toggle();
        }
    }


    return arr;
}

function show_basic() {

    var sex = $("#sex_id :selected").text();
    var age = $("#age_id").val();
    var weight = $("#weight_id").val();
    var height = $("#height_id").val();
    var goal = $("#goal_id :selected").text();
    var activity = $("#activity_id :selected").text();


    [BMI, goalCalories, protein, fats, carbs] = getDataBasic(sex, age, weight, height, goal, activity);

    var goal_txt = "Your weight goal for this week is: <b>" + goal + "</b>\n";
    var BMI_txt = "Your <b>BMI</b> is: " + BMI + " kg/m*m\n";
    var cals_out = "You need to consume approximately <b>" + Number(goalCalories) + " calories a day\n<br>";
    var protein_out = "You need approximately: <b>" + protein + " grams of protein</b> a day (20% of calories)\n<br>";
    var fat_out = "You need approximately: <b>" + fats + " grams of fat</b> a day (25% of calories)\n<br>";
    var carbs_out = "You need approximately: <b>" + carbs + " grams of carbs</b> a day (55% of calories)\n<br>";
    var arr_txt_out = [goal_txt, BMI_txt, cals_out, protein_out, fat_out, carbs_out];


    $("#results").show();
    $("#results").css("fontSize", 20);
    $("#results").html("");
    $("#results").append(goal_txt + "<br>");
    $("#results").append(BMI_txt + "<br>");
    $("#results").append(cals_out + "<br>");
    $("#results").append(protein_out + "<br>");
    $("#results").append(fat_out + "<br>");
    $("#results").append(carbs_out + "<br>");
    $("#results").append("<br><br> *Note, these values are all approximations based off of the Harris-Benedict Equation and the Acceptable Macronutrient Distribution Range.");
    $("#results").append("<br><br><b>BMI</b> (or Body Mass Index), BMI is one way to calculate if someone's weight is within the healthy range for their height, although it has significant limitations. \nFor example, it does not factor in how much of someone's weight is fat vs. muscle.");



    return arr_txt_out;

}



function set_results_pro() {

    surpressed = true;

    if (!$("#sex_id_pro").val()) {
        alert("Please enter a valid sex.");
    } else if (!$("#age_id_pro").val()) {
        alert("Please enter a valid age.");
    } else if (!$("#weight_id_pro").val()) {
        alert("Please enter a valid weight.");
    } else if (!$("#height_id_pro").val()) {
        alert("Please enter a valid height.");
    } else if (!$("#goal_id_pro").val()) {
        alert("Please enter a valid goal.");
    } else if (!$("#activity_id_pro").val() || $("#activity_id_pro").val() <= 0) {
        alert("Please enter a value greater than 0 for activity level.");
    } else if (!$("#stress_id_pro").val() || $("#stress_id_pro").val() <= 0) {
        alert("Please enter a value greater than 0 for stress level.");
    } else if (!$("#activity_drop_pro").val()) {
        alert("Please select a valid activity level");
    } else if (!$("#stress_drop_pro").val()) {
        alert("Please select a valid stress level");
    } else {
        surpressed = false;
    }

    if (!surpressed) {
        arr = show_pro();
        if (!$("#save_btn_div_pro").is(":visible")) {
            $("#save_btn_div_pro").toggle();
            $("#box_pro").toggle();
        }
    }
    return arr;
}


function show_pro() {

    var sex = $("#sex_id_pro :selected").text();
    var age = $("#age_id_pro").val();
    var weight = $("#weight_id_pro").val();
    var height = $("#height_id_pro").val();
    var goal = $("#goal_id_pro :selected").text();
    var activity = $("#activity_id_pro").val();
    var SF = $("#stress_id_pro").val();


    [BMI, REE, TEE, goalCalories, protein_min, protein_max, fats_min, fats_max, carbs_min, carbs_max] = getDataPro(sex, age, weight, height, goal, activity, SF);


    var goal_txt = "Your weight goal for this week is: <b>" + goal + "</b>\n";
    var REE_txt = "Your <b>REE</b> is: " + REE + " kcals\n";
    var TEE_txt = "Your <b>TEE</b> is: " + TEE + " kcals/day\n";
    var BMI_txt = "Your <b>BMI</b> is: " + BMI + "kg/m*m\n";
    var cals_out = "You need to consume approximately <b>" + Number(goalCalories) + " calories</b> a day\n<br>";
    var protein_out = "You need (approximately) between : <b>" + protein_min + " and " + protein_max + " grams of protein</b> a day (10-35% of calories)\n<br>";
    var fat_out = "You need (approximately) between : <b>" + fats_min + " and " + fats_max + " grams of fat</b> a day (20-35% of calories)\n<br>";
    var carbs_out = "You need (approximately) between : <b>" + carbs_min + " and " + carbs_max + " grams of carbs</b> a day (45-65% of calories)\n<br>";
    var arr_txt_out = [goal_txt, REE_txt, TEE_txt, BMI_txt, cals_out, protein_out, fat_out, carbs_out];


    $("#results_pro").show();
    $("#results_pro").css("fontSize", 20);
    $("#results_pro").html("");
    $("#results_pro").append(goal_txt + "<br>");
    $("#results_pro").append(REE_txt + "<br>");
    $("#results_pro").append(TEE_txt + "<br>");
    $("#results_pro").append(BMI_txt + "<br>");
    $("#results_pro").append(cals_out + "<br>");
    $("#results_pro").append(protein_out + "<br>");
    $("#results_pro").append(fat_out + "<br>");
    $("#results_pro").append(carbs_out);
    $("#results_pro").append("<br><br><br> *Note, these values are all approximations based off of the Harris-Benedict Equation and the Acceptable Macronutrient Distribution Range.<br>");
    $("#results_pro").append("<br><b>REE</b> (or Resting Energy Expenditure), is the amount of calories one expends while at rest.<br>");
    $("#results_pro").append("<br><b>TEE</b> (or Total Energy Expenditure), is the amount of calories burned when taking exercise into account.");
    $("#results_pro").append("<br><br><b>BMI</b> (or Body Mass Index), BMI is one way to calculate if someone's weight is within the healthy range for their height, although it has significant limitations. \nFor example, it does not factor in how much of someone's weight is fat vs. muscle.");

    return arr_txt_out;
}



function saveData(arr) {

    $("#save_btn").click(function() {
        var doc = jsPDF();
        var x = 15;
        var y = 15;
        var i;

        doc.text("Calorie and Macro Output", x, y);
        y += 30;

        for (i = 0; i < arr.length; i++) {
            doc.text(arr[i], x, y);
            y += 15;
        }
        doc.save("YOUR_NAME_HERE.pdf");
    });

    $("#save_btn_pro").click(function() {
        var doc = jsPDF();
        var x = 15;
        var y = 15;
        var i;

        doc.text("Calorie and Macro Output", x, y);
        y += 30;

        for (i = 0; i < arr.length; i++) {
            doc.text(arr[i], x, y);
            y += 15;
        }
        doc.save("YOUR_NAME_HERE.pdf");
    });

}