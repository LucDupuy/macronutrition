function getDataBasic(sex, age, weight, height, goal, activity) {
    var PAL = getPALBasic(activity);
    var BMI = ((weight) / (Math.pow((height / 100), 2))).toFixed(2);
    var REE = getREE(sex, weight, height, age);
    var goalCalories = getGoal(goal, REE * PAL);
    var [protein, fats, carbs] = getMacros(goalCalories);
    var BMI_round = Math.round(BMI);
    var goal_calories_round = Math.round(goalCalories);
    var protein_round = Math.round(protein);
    var fats_round = Math.round(fats);
    var carbs_round = Math.round(carbs);

    return [BMI_round, goal_calories_round, protein_round, fats_round, carbs_round];
}


function getDataPro(sex, age, weight, height, goal, activity, SF) {
    var PAL = activity;
    var BMI = ((weight) / (Math.pow((height / 100), 2))).toFixed(2);
    var REE = getREE(sex, weight, height, age);
    var TEE = (REE * PAL * SF).toFixed(2);
    var goalCalories = getGoal(goal, TEE);
    var [protein_min, protein_max, fats_min, fats_max, carbs_min, carbs_max] = getMacrosPro(goalCalories);

    return [BMI, REE, TEE, goalCalories, protein_min, protein_max, fats_min, fats_max, carbs_min, carbs_max];
}


function getPALBasic(activity) {
    var tmp = 0;
    switch (activity) {
        case "Sedentary":
            tmp = 1.4;
            break;
        case "Light":
            tmp = 1.6;
            break;
        case "Moderate":
            tmp = 1.8;
            break;
    }
    return tmp;
}

function getREE(sex, weight, height, age) {
    var tmp = 0;
    switch (sex) {
        case "Male":
            tmp = (66.5 + (13.75 * weight) + (5.0 * height) - (6.78 * age));
            break;
        case "Female":
            tmp = (655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age));
            break;
    }

    var tmp_REE = tmp.toFixed(2);
    return tmp_REE;
}


function getGoal(goal_arg, TEE_arg) {
    var tmp = 0;
    switch (goal_arg) {
        case "Lose Weight (0.5 lbs)":
            tmp = TEE_arg - (1750 / 7.0);
            break;
        case "Lose Weight (1.0 lbs)":
            tmp = TEE_arg - (3500 / 7.0);
            break;
        case "Lose Weight (1.5 lbs)":
            tmp = TEE_arg - (5250 / 7.0);
            break;
        case "Lose Weight (2.0 lbs)":
            tmp = TEE_arg - (7000 / 7.0);
            break;
        case "Maintain Weight":
            tmp = TEE_arg;
            break;
        case "Gain Weight (0.5 lbs)":
            tmp = TEE_arg + (1750 / 7.0);
            break;
        case "Gain Weight (1.0 lbs)":
            tmp = TEE_arg + (3500 / 7.0);
            break;
        case "Gain Weight (1.5 lbs)":
            tmp = TEE_arg + (5250 / 7.0);
            break;
        case "Gain Weight (2.0 lbs)":
            tmp = TEE_arg + (7000 / 7.0);
            break;
    }
    return tmp;
}

//TEST THAT ALL OF THESE VALUES WORK

function getMacros(goalCalories) {
    carbDivide = 4;
    proteinDivide = 4;
    fatDivide = 9;

    //0.8 - 1 g per kilo

    protein = (goalCalories * 0.2) / proteinDivide;
    fats = (goalCalories * 0.25) / fatDivide;
    carbs = (goalCalories * 0.55) / carbDivide;

    return [protein, fats, carbs];
}

function getMacrosPro(goalCalories) {
    carbDivide = 4;
    proteinDivide = 4;
    fatDivide = 9;

    min_protein = (goalCalories * 0.1) / proteinDivide;
    max_protein = (goalCalories * 0.35) / proteinDivide;
    min_fats = (goalCalories * 0.2) / fatDivide;
    max_fats = (goalCalories * 0.35) / fatDivide;
    min_carbs = (goalCalories * 0.45) / carbDivide;
    max_carbs = (goalCalories * 0.65) / carbDivide;

    return [min_protein.toFixed(2), max_protein.toFixed(2), min_fats.toFixed(2), max_fats.toFixed(2), min_carbs.toFixed(2), max_carbs.toFixed(2)];
}