class Deposite
{
    constructor (startMoney, time, percent) {
        this.startMoney = startMoney;
        this.time = time;
        this.percent = percent;
    }


    calculate() {
        return Math.round(this.startMoney * (1 + this.percent / 100 * this.time / 12));
    }

    form() {

        const box = document.createElement('div');
        const body = document.querySelector('body');
        box.style.width = '500px';
        box.style.height = '500px';
        body.append(box);
        let name = document.createElement('h4');
        name.innerText = 'Депозитный калькулятор';

        //
        let startDepositLabel = document.createElement('label')
        startDepositLabel.innerText = 'Первоначальный депозит';
        startDepositLabel.htmlFor ='startDeposit';
        let startDeposit = document.createElement('input');
        startDeposit.id = 'startDeposit';
        startDeposit.type = 'Number';
        startDeposit.value = this.startMoney;

        // Срок вклада?
        let timeDepositLabel = document.createElement('label');
        timeDepositLabel.innerText = 'Срок вклада?';
        timeDepositLabel.htmlFor = 'timeDepositSelect';
        let timeDepositSelect = document.createElement('select');
        timeDepositSelect.id = 'timeDepositSelect';

        let options = {
            '3 месяца (минимум)' : 3,
            '6 месяцев (полгода)' : 6,
            '12 месяцев (1 год)' : 12,
            '18 месяцев (1.5 года)' : 18,
            '24 месяцев (2 года)' : 24,
            '30 месяцев (2.5 года)' : 30,
            '36 месяцев (3 года)' : 36,
            '60 месяцев (5 лет)' : 60,
        };

        for (let item in options) {
            let option = new Option(item, options[item], false, false)
            timeDepositSelect.append(option);
        }

        // Годовая процентная ставка?
        let yearPercentLabel = document.createElement('label');
        yearPercentLabel.innerText = 'Годовая процентная ставка?';
        yearPercentLabel.htmlFor = 'yearPercent';
        yearPercentLabel.style.position = 'static';
        let yearPercent = document.createElement('input');
        yearPercent.type = 'Number';
        yearPercent.value = this.percent;
        yearPercent.id = 'yearPercent';

        let resultBlock = document.createElement('div');
        resultBlock.classList.add('resultBlock');
        resultBlock.style.display = 'flex';
        resultBlock.style.justifyContent = 'space-between';
        resultBlock.style.alignItems = 'flex-end';

        box.append(name,
            startDepositLabel, startDeposit,
            timeDepositLabel, timeDepositSelect,
            yearPercentLabel, yearPercent,
            resultBlock);


        startDeposit.addEventListener('change', (e)=> {
            this.startMoney = +e.target.value;
            this.clearDiagram()
            this.diagram();
        })
        timeDepositSelect.addEventListener('change', (e)=> {
            this.time = +e.target.value;
            this.clearDiagram()
            this.diagram();
        })
        yearPercent.addEventListener('change', (e)=> {
            this.percent = +e.target.value;
            this.clearDiagram()
            this.diagram();
        })


    }

    diagram() {
        const redBlock = document.createElement('div');
        const greenBlock = document.createElement('div');
        const initial = 100;

        redBlock.style.height = initial + 'px';
        redBlock.style.width = 50 + 'px';
        redBlock.style.backgroundColor = 'red';
        redBlock.style.boxShadow = '0 0 10px red';
        redBlock.style.display = 'inline-block';
        redBlock.id = 'redBlock';
        redBlock.innerText = this.startMoney;


        let result = (this.calculate() * initial ) / this.startMoney + 'px';
        console.log(result)

        greenBlock.style.height = result;
        greenBlock.style.width = 50 + 'px';
        greenBlock.style.backgroundColor = '#00973D';
        greenBlock.style.boxShadow = '0 0 10px #3CFA89';
        greenBlock.style.display = 'inline-block';
        greenBlock.id = 'greenBlock';
        greenBlock.innerText = this.calculate();

        const rb = document.querySelector('.resultBlock');

        rb.append(redBlock, greenBlock);

    }

    clearDiagram () {
        const redBlock = document.querySelector('#redBlock');
        const greenBlock = document.querySelector('#greenBlock');
        if (redBlock && greenBlock) {
            redBlock.remove();
            greenBlock.remove();
        }

    }

}
