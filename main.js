// Javascript BMI Calculator  

// nav burger
const containerBurger = document.querySelector(".container-burger");
const containerBurgerRotate = document.querySelector(".container-burger-rotate");
const navControl = document.querySelector("#nav-control");
containerBurger.addEventListener("click", function(){
	containerBurgerRotate.classList.toggle("burger-rotate");
	navControl.classList.toggle("nav-collapse");
	navControl.classList.toggle("transition");
	setTimeout(() => {
		containerBurgerRotate.classList.toggle("toggle-x");
		containerBurgerRotate.classList.toggle("toggle-color");
	}, 500);
});
window.addEventListener('resize', function(event){
    var newWidth = window.innerWidth;
    // var newHeight = window.innerHeight; 
	if(newWidth >= 768){
		if(navControl.classList.contains("nav-collapse")){
			navControl.classList.toggle("nav-collapse");
			navControl.classList.toggle("transition");
		};
		containerBurgerRotate.classList.toggle("burger-rotate");
		containerBurgerRotate.classList.toggle("toggle-x");
		containerBurgerRotate.classList.toggle("toggle-color");
	};
	if(newWidth <= 768){
		containerBurgerRotate.classList.remove("burger-rotate");
		containerBurgerRotate.classList.remove("toggle-x");
		containerBurgerRotate.classList.remove("toggle-color");
	};
});


// links to document
const inputHeight = document.querySelector("#input-height");
const inputWeight = document.querySelector("#input-weight");
const labelWeight = document.querySelector("#label-weight");
const labelHeight = document.querySelector("#label-height");
const displayBMI = document.querySelector("#display-bmi");
const displayIBW = document.querySelector("#display-ibw");
const cbUS = document.querySelector("#cb-us");
const cbMetric = document.querySelector("#cb-metric");
const cbMale = document.querySelector("#cb-male");
const cbFemale = document.querySelector("#cb-female");
const btnCalcBmiIbw = document.querySelector("#btn-calc-bmi-ibw");
const btnResetBmi = document.querySelector("#btn-reset-bmi");


// button calc bmi ibw
btnCalcBmiIbw.addEventListener("click", function(){
	if((cbUS.checked || cbMetric.checked) && inputHeight.value !== "" && inputWeight.value !== ""&& (cbMale.checked || cbFemale.checked)){
		calcBMI();
		calcibw();
	}
	else{
		displayBMI.innerHTML = "<p>BMI Results<br><strong>Please Fill in all fields.</strong></p>";
		displayIBW.innerHTML = "<p>IBW Results<br><strong>Please Fill in all fields.</strong></p>";
	};
});


// BMI calulator javascript
function calcBMI(){
	var height = inputHeight.value;
	var weight = inputWeight.value;
	if (cbUS.checked){
		var BMItotal = weight * 703 / (height * height);
		var meaning = BMImeaning(BMItotal);
		displayBMI.innerHTML  = BMItotal.toFixed(2) + "<br>" + meaning;
	}
	else {
		var BMItotal = weight / (height * height);
		var meaning = BMImeaning(BMItotal);
		displayBMI.innerHTML  = BMItotal.toFixed(2) + "<br>" + meaning;
	}
};


// BMI rating
function BMImeaning(x){
	var x;
	if (x < 18.5){
		return "underweight";
	} else if( x > 18.5 && x < 25.0){
		return "normal";
	} else if( x >= 25.0 && x < 30.0){
		return "overweight";
	} else if( x >= 30.0 && x < 35.0){
		return "obesity (class 1)";
	} else if( x >= 35.0 && x < 40.0){
		return "obesity (class 2)";
	} else {
		return "obesity (class 3)";
	};
};


// only one checkbox jquery
// checkboxes US
$('input.cb-us-metric').on('change', function() {
    $('input.cb-us-metric').not(this).prop('checked', false);  
});
// checkboxes male/female
$('input.cb-male-female').on('change', function() {
    $('input.cb-male-female').not(this).prop('checked', false);  
});


// labels changed on checkbox selection
cbUS.addEventListener("change", function(){
	if (cbUS.checked){
	labelWeight.innerHTML = "Weight (lbs):";
	labelHeight.innerHTML = "Height (inches):";
	}
	else{
	labelWeight.innerHTML = "Weight:";
	labelHeight.innerHTML = "Height:";
	};
	
});
cbMetric.addEventListener("change", function(){
	if (cbMetric.checked){
		labelWeight.innerHTML = "Weight (Kg):";
		labelHeight.innerHTML = "Height (meters):";
	}
	else{
	labelWeight.innerHTML = "Weight:";
	labelHeight.innerHTML = "Height:";
	};
});


// IBW Calculator Javascript
function calcibw(){
	var height = inputHeight.value;
	var weight = inputWeight.value;

	//input change
	if (cbUS.checked){
		var height1 = height * 2.54;
		var height2 = height ;
		var height3 = height * 2.54 / 100;
		var unit = " lbs";
	} else if(cbMetric.checked){
		var height1 = height * 100;
		var height2 = height * 100 / 2.54;
		var height3 = height;
		var unit = " kg";
	} else {
		displayIBW.innerHTML = "Please choose US or Metric.";
	}

	if (cbMale.checked){
		//broca formula
		var broca = ((height1 - 100) - ((height1 - 100) * 0.1));
		// devine formula
		var devine = 50 + (2.3 * (height2 - 60));
		//robinson
		var robinson= 52 + (1.9 * (height2 - 60));
		//miller
		var miller = 56.2 + (1.41 * (height2 - 60));
		// hamwi
		var hamwi = 48 + (2.7 * (height2 - 60));
		//wrist 10 % plus minus 7 inch wrist
		//lemmens
		var lemmens = 22 * (height3 * height3);

	} else if(cbFemale.checked){
		//broca formula
		var broca = (height1 - 100) - ((height1 - 100) * 0.15);
		// devine formula
		var devine = 45.5 + (2.3 * (height2 - 60));
		//robinson
		var robinson = 49 + (1.7 * (height2 - 60));
		//miller
		var miller = 53.1 + (1.36 * (height2 - 60));
		// hamwi
		var hamwi = 45.5 + (2.2 * (height2 - 60));
		//wrist 10 % plus minus 7 inch wrist
		//lemmens
		var lemmens = 22 * (height3 * height3);
	} else {
		dispalyIBW.innerHTML = "Please choose male or female.";
	}

	if (cbUS.checked){
		var pounds = 2.204622
		broca = broca * pounds;
		devine = devine * pounds;
		robinson = robinson * pounds;
		miller = miller * pounds;
		hamwi = hamwi * pounds;
		lemmens = lemmens * pounds;
	} 
	
	displayIBW.innerHTML = "Broca " + broca.toFixed(2) + unit + "<br>" + "Devine " + devine.toFixed(2) + unit + "<br>" + "Robinson " + robinson.toFixed(2) + unit + "<br>" + "Miller " + miller.toFixed(2) + unit + "<br>" + "Hamwi " + hamwi.toFixed(2) + unit + "<br>" + "Lemmens " + lemmens.toFixed(2) + unit;
}


// button reset
btnResetBmi.addEventListener("click", function(){
	cbUS.checked = false;
	cbMetric.checked = false;
	cbMale.checked = false;
	cbFemale.checked = false;
	labelWeight.innerHTML = "Weight:";
	labelHeight.innerHTML = "Height:";
	displayBMI.innerHTML = "BMI result";
	displayIBW.innerHTML = "IBW result";
	inputHeight.value = "";
	inputWeight.value = "";
})


// Copyright date
const copyrightDate = document.querySelector("#footer-copyright-date");
copyrightDate.innerHTML = `2022 - ${new Date().getFullYear()}`;





