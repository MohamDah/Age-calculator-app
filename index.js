

function date() {
    const form = document.querySelector('form');
    const today = new Date();
    
    const year = form.querySelector('#year').value;
    let isYear;
    if (year == "") {
        isYear = "This field is required";
        error(form.querySelector('#yearlab'), isYear);
    } else if (year > today.getFullYear()) {
        isYear = "Must be in the past";
        error(form.querySelector('#yearlab'), isYear)
    } else {
        unerror(form.querySelector('#yearlab'));
        isYear = true;
    }

    const month = form.querySelector('#month').value;
    let isMonth;
    if (month == "") {
        isMonth = "This field is required";
        error(form.querySelector('#monthlab'), isMonth);
    } else if (month < 1 || month > 12) {
        isMonth = "Must be a valid month";
        error(form.querySelector('#monthlab'), isMonth);
    } else {
        unerror(form.querySelector('#monthlab'));
        isMonth = true;
    }

    const day = form.querySelector('#day').value;
    let isDay;
    if (day == "") {
        isDay = "This field is required";
        error(form.querySelector('#daylab'), isDay);
    } else if (day < 1 || day > 31) {
        isDay = "Must be a valid day";
        error(form.querySelector('#daylab'), isDay);
    } else {
        unerror(form.querySelector('#daylab'));
        isDay = true;
    }

    if (isMonth==true && isDay == true) {
        const dayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > dayCounts[month - 1]) {
            error(form.querySelector('#daylab'), "Must be a valid day");
            return false;
        }
    }

    if (isYear==true && isMonth==true && isDay == true) {

        const birthDate = new Date(`${month}/${day}/${year}`);
        const age = getAge(today, birthDate);
        document.querySelector('#years').innerHTML = age[0] + " ";
        document.querySelector('#months').innerHTML = age[1] + " ";
        document.querySelector('#days').innerHTML = age[2] + " ";
    }

    
    return false;
}



function error(el, message) {
    const p = el.querySelector('p');
    p.setAttribute('class', 'error');

    const input = el.querySelector('input');
    input.setAttribute('class', 'error');

    const span = el.querySelector('p.alert');
    span.innerHTML = message;
}

function unerror(el) {
    const p = el.querySelector('p');
    p.setAttribute('class', '');

    const input = el.querySelector('input');
    input.setAttribute('class', '');

    const span = el.querySelector('p.alert');
    span.innerHTML = '';
}

function getAge(today, birthday) {
    let difference = today - birthday;
    difference /= 24*3600*1000;

    let yeardiff = Math.floor(difference/(365.25)); // whole number of average years
    let monthdiff = (difference - yeardiff*365.25); // last partial year

    let averagemonth = 365.25/12;  // length of average month
    let months = Math.floor(monthdiff/averagemonth);

    let daysleft = Math.floor(monthdiff - months * averagemonth);
    return [yeardiff, months, daysleft];
}