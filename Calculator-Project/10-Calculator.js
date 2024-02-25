let calculation = localStorage.getItem('calculation')||'';

      displayCalc();

      function updateCalculation(value){
        calculation += value;
        console.log(calculation);
        displayCalc();
        localStorage.setItem('calculation', calculation);
      }

      function displayCalc(){
        document.querySelector('.calcDisplay')
          .innerHTML = calculation;
      }