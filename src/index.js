    const calendarDates = document.querySelector('.calendar-dates');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarSwitch = document.getElementById('calendarSwitch');
    const calendar = document.querySelector('.calendar');



    //GET COLORS FROM CSS


    // 1. Get the element where the variable is declared (often :root or document.documentElement)
    const root = document.documentElement;

    // 2. Get the computed style of that element
    const computedStyles = getComputedStyle(root);

    // 3. Retrieve the value of the CSS variable
    const purple = computedStyles.getPropertyValue('--purple').trim();
    const purpleShine = computedStyles.getPropertyValue('--purpleShine').trim();
    const purpleDark = computedStyles.getPropertyValue('--purpleDark').trim();
    const blueDark = computedStyles.getPropertyValue('--blueDark').trim();
    const blueDarker = computedStyles.getPropertyValue('--blueDarker').trim();
    const skintone = computedStyles.getPropertyValue('--skintone').trim();
    const skintoneDark = computedStyles.getPropertyValue('--skintoneDark').trim();
    const backgroundColor = computedStyles.getPropertyValue('--backgroundColor').trim();
    const backgroundAccent = computedStyles.getPropertyValue('--backgroundAccent').trim();
    const backgroundDarker = computedStyles.getPropertyValue('--backgroundDarker').trim();


   /*FUNCTIONS TO TREAT DATES */


        function isDateGapNegative(date1, date2) {
        // Comparing the time values (milliseconds since epoch)
        return date2.getTime() < date1.getTime();
        }


        function getGapDays(date1, date2) {
        // Set both dates to noon to avoid issues with daylight saving time transitions
        const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

        // The number of milliseconds in one day
        const ONE_DAY_MS = 1000 * 60 * 60 * 24;

        // Calculate the difference in milliseconds and convert to days
        // Use Math.floor() to get whole days and handle partial days consistently
        return Math.floor(Math.abs(utcDate2 - utcDate1) / ONE_DAY_MS);
        }




   /*END OF FUNCTIONS TO TREAT DATES */





    document.addEventListener('DOMContentLoaded', function() {
            // CLose calendar when click out calendar
        document.addEventListener('click', (event) => {

            const isClickInside = calendar.contains(event.target) || calendarSwitch.contains(event.target);
            
            // The click was OUTSIDE the calendar and button
            if(!isClickInside)
                calendar.classList.remove('show');

                
            
        });

    })



    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function renderCalendar(month, year) {
        
        
        
        
        
        calendarDates.innerHTML = '';
        monthYear.textContent = `${months[month]} ${year}`;

        // Get the first day of the month
        const firstDay = new Date(year, month, 1).getDay();

        // Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create blanks for days of the week before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    calendarDates.appendChild(blank);
  }

  // Populate the days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    calendarDates.appendChild(day);
  }


 //take each div day and colect its date when click
  var days = document.querySelectorAll('.calendar-dates div');

    

    days.forEach(div => {

        let presentDay = div.innerHTML;
        let presentdivDate = new Date(currentYear, currentMonth, presentDay);

        if(isDateGapNegative(currentDate, presentdivDate))
        {   
            div.classList.add('unable');
            div.title = 'Invalid date: The selected day already gone!'

        }


        
        div.addEventListener('click', () => { 

            let presentDay = div.innerHTML;
            let clickedDate = new Date(currentYear, currentMonth, presentDay);

            if(isDateGapNegative(currentDate, clickedDate))
                return;
            
            
                // Exibindo a data clicada
            console.log(clickedDate);
            days.forEach( div => div.classList.remove('selectDay'))

            div.classList.add('selectDay');

            //select the correct label and show the selected date
            div.closest('.calendar_container').querySelector('.selectDay_label').innerHTML = `Selected data: ${currentMonth + 1}/${presentDay}/${currentYear}, Interval in days: ${getGapDays(currentDate, clickedDate)} `

            calendar.classList.remove('show')
            

        });
    });
}




renderCalendar(currentMonth, currentYear);


document.addEventListener('DOMContentLoaded', function() {
    // Todo o seu código que interage com o DOM deve estar aqui
    
});

//switch to show/hide calendar
var calendarSwitchindex = 0;

calendarSwitch.addEventListener('click', () => {

    calendarSwitchindex ++;

    calendar.classList.toggle('show', calendarSwitchindex % 2 !== 0);


})

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});


//Data for Test in chart



var data = {
    // 1. Array de Rótulos (Labels)
    labels: [
        "Red",
        "Green",
        "Yellow"
    ],
    // 2. Conjunto de Dados (Datasets)
    datasets: [{
        // Dados de valor (os números)
        data: [300, 50, 100], 
        
        // Cores de fundo (uma para cada fatia)
        backgroundColor: [
            purple,
            blueDark,
            backgroundColor
        ],
        
        // Cores de destaque (ao passar o mouse)
        hoverBackgroundColor: [
            purpleDark,
            blueDarker,
            backgroundDarker
        ]
    }]
};



var ctx = document.getElementById("chart1").getContext("2d");
new Chart(ctx, {
    type: 'pie', 
    data: data
});


var ctx = document.getElementById("chart2").getContext("2d");
new Chart(ctx, {
    type: 'pie', 
    data: data
});


