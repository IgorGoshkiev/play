(function () {

  // Создаем заголовок приложения
  function createAppTitle(title) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('header-wraper');

    const appTitle = document.createElement('h2');
    appTitle.classList.add('header-title');
    appTitle.innerHTML = title;

    let appClock = document.createElement('button');
    appClock.classList.add('header-clock');

    wrapper.append(appTitle);
    wrapper.append(appClock);

    return {
      appTitle,
      appClock,
      wrapper
    }
  }

  // Создаем колонку с правилами игры
  function createTextHeader(text) {
    const appText = document.createElement('p');
    appText.classList.add('header-text');
    appText.innerText = text;
    return appText;
  }


  // создаем и возвращаем форму для для ввода кол-ва карточек, запуска и остановки игры
  function createAppForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const buttonStartPlay = document.createElement('button');
    const buttonStopPlay = document.createElement('button');

    form.classList.add('app-form');
    input.classList.add('app-form__input');
    input.type = 'text';
    input.placeholder = 'Введите четное число  от 2 до 8'

    buttonWrapper.classList.add('button-container');
    buttonStartPlay.classList.add('btn-start-play');
    buttonStartPlay.classList.add('btn');

    buttonStopPlay.classList.add('btn-stop-play');
    buttonStopPlay.classList.add('btn');

    buttonStartPlay.textContent = 'Начать игру';
    buttonStopPlay.textContent = 'Выйти из игры';

    buttonWrapper.append(buttonStartPlay);
    buttonWrapper.append(buttonStopPlay);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      buttonStartPlay,
      buttonStopPlay
    }
  }

  // Показываем кнопку сыграть снова
  function playAgain() {
    const sectionFooter = document.querySelector('footer div.container');
    const buttonPlayAgain = document.createElement('button');
    buttonPlayAgain.innerText = 'Сыграть ещё раз';
    buttonPlayAgain.classList.add('buttonPlayAgain');
    buttonPlayAgain.classList.add('btn');

    const infoVictory = document.createElement('button');
    infoVictory.innerText = 'Поздравляем Вас! Вы выиграли!!!'
    infoVictory.classList.add('infoVictory');

    sectionFooter.append(infoVictory);
    sectionFooter.append(buttonPlayAgain);

    buttonPlayAgain.addEventListener('click', () => {
      window.location.reload();
    });
  }

  // Перемешиваем значения в массиве по методу Фишера-Йетса
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // Создаем массив пар цифр расположенных в случайном порядке
  function createArrayOfPairs(input_number) {
    arrayNumberPairs = [];
    let num = input_number / 2;
    for (let i = 0; i < input_number; i++) {
      arrayNumberPairs.push(num);
      if (i % 2 != 0) {
        --num;
      }
    }
    return shuffle(arrayNumberPairs);
  }

  // Проверяем значение, которое ввел пользователь
  function checkInputValue(value) {
    if (value > 1 && value < 9 && value % 2 === 0) {
      return value;
    } else {
      return false;
    }
  }

  // Очистка игрового поля
  function clearCards() {
    timerId = setTimeout(() => { window.location.reload(); }, 500);
  }

  // создаем игровой блок для карточек
  function createUlForCards() {
    const list = document.createElement('ul');
    list.classList.add('field-list');
    return list;
  }

  // Отключение нажатия всем карточкам
  function disablingCardPressing() {
    let onButtons = document.querySelectorAll('.button-for-card');
    for (let i = 0; i < onButtons.length; i++) {
      onButtons[i].setAttribute('disabled', true);
    }
  }

  // Включение наэатие всем карточкам
  function enablingCardTapping() {
    let onButtons = document.querySelectorAll('.button-for-card');
    for (let i = 0; i < onButtons.length; i++) {
      onButtons[i].removeAttribute('disabled');
    }
  }

  // создаем карточку из li и button
  function createCard(idButton) {
    let item = document.createElement('li');
    item.classList.add('field-list__item');

    const buttonforCard = document.createElement('button');
    buttonforCard.classList.add('button-for-card');
    buttonforCard.id = idButton;

    item.append(buttonforCard);
    return {
      item,
      buttonforCard
    }
  }

  // проходим по массиву и сравниваем два элемента
  function isPresent(array, val) {
    return array.every(arrVal => val === arrVal);
  }

  let arrayValueforCompar = [];
  let arraybuttonCards = []; // Храним значения карточек, что бы потом закрыть ее, если вторая не совпала.
  let counter = 0;

  // Сравнение карточек по которым кликнули
  function comparisonOfCards(currentValueCard, buttonCard) {
    arraybuttonCards.push(buttonCard);
    arrayValueforCompar.push(currentValueCard);
    if (arrayValueforCompar.length === 2) {
      let falseOrTrue = isPresent(arrayValueforCompar, currentValueCard);
      arrayValueforCompar = [];
      if (falseOrTrue === true) {
        counter++;
      }
      return falseOrTrue;
    }
  }

  // Закрытие карточек.
  function closedCards(card) {
    timerId = setTimeout(() => {
      card.classList.add('button-for-card__closed');
      card.innerHTML = '';
    }, 800);
    prevElem = arraybuttonCards[arraybuttonCards.length - 2];
    timerId = setTimeout(() => {
      prevElem.classList.add('button-for-card__closed');
      prevElem.innerHTML = '';
    }, 800);
  }

  // Назначаем карточке value согласно id и помещаем их в нужную секцию.
  function createBlockCards(array) {
    const sectionCards = document.querySelector('main div.container');
    const ulCards = createUlForCards();
    for (let i = 0; i < array.length; i++) {
      let currentCard = createCard(idButton = i);
      ulCards.append(currentCard.item);
      currentCard.buttonforCard.addEventListener('click', () => {
        let valueCard = array[currentCard.buttonforCard.id];
        currentCard.buttonforCard.innerHTML = valueCard;
        currentCard.buttonforCard.classList.remove('button-for-card__closed');
        currentCard.buttonforCard.classList.add('button-for-card__active');
        let isEqual = comparisonOfCards(valueCard, currentCard.buttonforCard);
        if (isEqual === false) {
          disablingCardPressing();
          closedCards(card = currentCard.buttonforCard);

          setTimeout(() => {
            enablingCardTapping();
          }, 800);
        }

        if (array.length / 2 === counter) {
          playAgain();
        }
      })
    }
    sectionCards.append(ulCards);
  }

  // Таймер обратного отсчета
  function timeCountdown(clock) {
    let degritCount = null;
    clock = clock / 1000;
    let firstButton = document.querySelector('button');
    firstButton.innerHTML = clock;
    (function count() {
      if (clock > 0) {
        clock--;
        firstButton.innerHTML = clock;
        setTimeout(count, 1000);
      }
    })();
  }

  // Отрисовываем формы и передаём валидное число карточек и создаем их
  function drawingForm() {
    const containerTitleForm = document.querySelector('header div.container');
    const gameAppTitle = createAppTitle('Игра в пары');
    const gameAppText = createTextHeader('Игрок может нажать на любую карточку. После нажатия карточка открывается. Далее игрок может открыть вторую карточку. Если обе открытые карточки содержат одинаковую цифру, они остаются открытыми до конца игры. Если же вторая карточка содержит отличную от первой цифру, обе они закрываются. Как только игрок открыл все пары на поле, игра считается завершённой.');

    containerTitleForm.append(gameAppTitle.wrapper);
    containerTitleForm.append(gameAppText);

    const containerForm = document.querySelector('main div.container');
    const gameAppForm = createAppForm();
    containerForm.append(gameAppForm.form);

    containerForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      gameAppForm.input.classList.remove('app-form__input-error');
      gameAppForm.input.placeholder = 'Введите четное число  от 2 до 8'
      let inputValue = gameAppForm.input.value;
      if (!inputValue) {
        return;
      }
      let validInputValue = checkInputValue(inputValue);
      if (!validInputValue) {
        gameAppForm.input.value = '';
        gameAppForm.input.classList.add('app-form__input-error');
        gameAppForm.input.placeholder = 'Value is not valid';
      } else {
        gameAppForm.input.value = '';
        gameAppForm.buttonStartPlay.disabled = true;
        gameAppForm.buttonStartPlay.classList.add('button-disable');
        let arrayMixed = createArrayOfPairs(Math.pow(validInputValue, 2));
        createBlockCards(arrayMixed);
        if (validInputValue > 4) {
          timerId = setTimeout(() => {
            alert('Время игры закончилось');
            window.location.reload();
          }, 90000);
          timeCountdown(90000);
        } else {
          timerId = setTimeout(() => {
            alert('Время игры закончилось');
            window.location.reload();
          }, 50000);
          timeCountdown(50000);
        }
      }
    });

    gameAppForm.buttonStopPlay.addEventListener('click', () => {
      let exit = confirm("Вы уверены, что хотите закончить игру?");
      if (exit) {
        window.location.reload();
      }
    })

  }

  document.addEventListener('DOMContentLoaded', () => {
    drawingForm();
  });
})();
