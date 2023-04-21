// получаем все кнопки с которыми будем работать

const prev_button_1 = document.getElementById("prev_1");
const center_button_1 = document.getElementById("center_1");
const next_button_1 = document.getElementById("next_1");
const auto_button_1 = document.getElementById("auto_1");

const prev_button_2 = document.getElementById("prev_2");
const center_button_2 = document.getElementById("center_2");
const next_button_2 = document.getElementById("next_2");
const auto_button_2 = document.getElementById("auto_2");

const prev_button_3 = document.getElementById("prev_3");
const center_button_3 = document.getElementById("center_3");
const next_button_3 = document.getElementById("next_3");
const auto_button_3 = document.getElementById("auto_3");

const prev_button_4 = document.getElementById("prev_4");
const center_button_4 = document.getElementById("center_4");
const next_button_4 = document.getElementById("next_4");
const auto_button_4 = document.getElementById("auto_4");

// функция для кнопки назад
function move_prev(event) {
  // узнаём, на каком конкретно элементе произошло событие
  //самый глубокий элемент, который вызывает событие, называется целевым элементом, и он доступен через event.target
  const this_button = event.target;
  // находим номер галереи через дата атрибут button кнопки
  const number_gallery = this_button.dataset.button;

  // получаем все изображения галереи
  const images = document.querySelectorAll(
    `img[data-container="${number_gallery}"]`
  );

  let current_image = null;

  // находим текущую картинку через дата атрибут active
  for (let image of images) {
    if (image.dataset.active == "true") {
      current_image = image.dataset.item;
    }
  }

  // вычисляем id картинки, которую надо скрыть
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_hide_image = "img_" + String(number_gallery) + String(current_image);

  // находим картинку
  const hide_image = document.getElementById(id_hide_image);

  // прячем текущую картину
  hide_image.style.display = "none";
  // выставляем дата атрибут активной картинки в false, потому что это уже не активная картинка
  hide_image.dataset.active = "false";

  // уменьшаем счётчик активной картинки на единицу, чтобы показать предыдущую картинку
  current_image--;
  if (current_image < 1) {
    // переменная если счётчик меньше единицы, то делаем его равным длине массива картинок
    // тк отсчёт картинок начинается с 1
    current_image = images.length;
  }

  // вычисляем id картики, которую надо показать
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_show_image = "img_" + String(number_gallery) + String(current_image);
  // находим нужную картинку по id
  const show_image = document.getElementById(id_show_image);

  // делаем её видимой
  show_image.style.display = "block";
  // выставляем дата атрибут активности в true
  show_image.dataset.active = "true";

  // если картинки в данный момент перелистываются сами
  // то сбраываем необходимый счётчик, чтобы быстро не перелистывались
  if (this_button.dataset.slide == "true") {
    switch (number_gallery) {
      case "1":
        clearInterval(timer_1);
        break;
      case "2":
        clearInterval(timer_2);
        break;
      case "3":
        clearInterval(timer_3);
        break;
      case "4":
        clearInterval(timer_4);
        break;
    }
  }
}

// функция для кнопки вперёд
function move_next(event) {
  // узнаём, на каком конкретно элементе произошло событие
  //самый глубокий элемент, который вызывает событие, называется целевым элементом, и он доступен через event.target
  const this_button = event.target;
  const number_gallery = this_button.dataset.button;

  // находим все картинки нужной галереи через дата атрибут кнопки
  const images = document.querySelectorAll(
    `img[data-container="${number_gallery}"]`
  );

  let current_image = null;

  // вычисляем активную картинку
  for (let image of images) {
    if (image.dataset.active == "true") {
      current_image = image.dataset.item;
    }
  }

  // вычисляем id активной на данный момент картинки чтобы её скрыть
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_hide_image = "img_" + String(number_gallery) + String(current_image);
  // находим картинку которую надо скрыть
  const hide_image = document.getElementById(id_hide_image);

  // прячем картику
  hide_image.style.display = "none";
  // выставляем дата атрибут активности картинки в false
  hide_image.dataset.active = "false";

  // увеличиваем счётчик активной картинки, чтобы показать следующую картинку
  current_image++;
  // если номер картинки больше чем длина массива с картинками
  // то текущий нормер ставим на единицу
  if (current_image > images.length) {
    current_image = 1;
  }

  // вычисляем id картинки которую надо показать
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_show_image = "img_" + String(number_gallery) + String(current_image);
  // находим картинку, которую надо показать
  const show_image = document.getElementById(id_show_image);

  // выставляем её значение display в block чтобы показать картинку
  show_image.style.display = "block";
  // ствим дата атрибут активности картинки в true, потому что теперь эта картинка активна
  show_image.dataset.active = "true";

  // если в данный момент происходит движение слайдера, то надо сбросить таймер
  // чтобы быстро не перелистнулось на следующую картинку
  if (this_button.dataset.slide == "true") {
    switch (number_gallery) {
      case "1":
        clearInterval(timer_1);
        break;
      case "2":
        clearInterval(timer_2);
        break;
      case "3":
        clearInterval(timer_3);
        break;
      case "4":
        clearInterval(timer_4);
        break;
    }
  }
}

// функция анимации картинок
// включает анимацию или выключает
function animation(event) {
  // узнаём, на каком конкретно элементе произошло событие
  //самый глубокий элемент, который вызывает событие, называется целевым элементом, и он доступен через event.target
  const this_button = event.target;
  const number_gallery = this_button.dataset.button;

  // получаем все картинки из текущей галереи
  const images = document.querySelectorAll(
    `img[data-container="${number_gallery}"]`
  );

  // перебираем картинки и смотрим есть ли на них сейчас анимация
  // если нет анимации, то к картинкам добавляется класс с анимацией
  // если есть анимация, то класс удаляется
  // класс добавляется или удаляется только к тем картинкам, кнопка какой галереи была задействована
  for (let image of images) {
    // проверяем есть ли анимация
    // если есть
    if (image.dataset.animate == "true") {
      // выставляем дата атрибут анимации в false
      image.dataset.animate = "false";

      // в зависимости от номера галереи удаляем соответствующий класс с анимацией
      switch (number_gallery) {
        case "1":
          image.classList.remove("puls");
          break;
        case "2":
          image.classList.remove("rotation");
          break;
        case "3":
          image.classList.remove("shaking");
          break;
        case "4":
          image.classList.remove("jumping");
          break;
      }
    } else {
      // если анимации не было
      // выставляем дата атрибут показывающий есть ли анимация в true
      image.dataset.animate = "true";

      // добавляем класс анимации к соответствующим картинкам
      switch (number_gallery) {
        case "1":
          image.classList.add("puls");
          break;
        case "2":
          image.classList.add("rotation");
          break;
        case "3":
          image.classList.add("shaking");
          break;
        case "4":
          image.classList.add("jumping");
          break;
      }
    }
  }
}

// таймеры для автоматического слайд шоу
let timer_1 = 0;
let timer_2 = 0;
let timer_3 = 0;
let timer_4 = 0;

// устанавливаем время задержки в милисекундах
const set_timer = 3000;

// функция для запуска и остановки слайд шоу
function make_timer(event) {
  // узнаём, на каком конкретно элементе произошло событие
  //самый глубокий элемент, который вызывает событие, называется целевым элементом, и он доступен через event.target
  const this_button = event.target;
  const number_gallery = this_button.dataset.button;

  // проверяем идёт ли сейчас слайд шоу соответсвующей галереи через атрибут slide кнопки
  // автоматического проигрывания нет
  if (this_button.dataset.slide == "false") {
    // устанавливаем атрибут slide кнопки в true потому что начинаем проигрывание
    this_button.dataset.slide = "true";

    // выбираем нужную галерею, чтобы остальные не были задействованы
    // setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени
    switch (number_gallery) {
      case "1":
        timer_1 = setInterval(function () {
            // вызываем функцию которая пролистывает картинки
          show_slides(number_gallery);
        }, set_timer);
        break;
      case "2":
        timer_2 = setInterval(function () {
            // вызываем функцию которая пролистывает картинки
          show_slides(number_gallery);
        }, set_timer);
        break;
      case "3":
        timer_3 = setInterval(function () {
            // вызываем функцию которая пролистывает картинки
          show_slides(number_gallery);
        }, set_timer);
        break;
      case "4":
        timer_4 = setInterval(function () {
            // вызываем функцию которая пролистывает картинки
          show_slides(number_gallery);
        }, set_timer);
        break;
    }
  } else {
    // если проигрывание сейчас происходит, то останавливаем его
    // нужный атрибут у нужной кнопки ставим в false
    this_button.dataset.slide = "false";
    // выбираем нужную галерею через номер чтобы остальные не были задействованы
    // остановить дальнейшее выполнение функции setInterval, которая отвечает за автоматическое проигрывание,
    // необходимо вызвать clearInterval(timerId)
    switch (number_gallery) {
      case "1":
        clearInterval(timer_1);
        break;
      case "2":
        clearInterval(timer_2);
        break;
      case "3":
        clearInterval(timer_3);
        break;
      case "4":
        clearInterval(timer_4);
        break;
    }
  }
}

// фунция, которая пролистывает картинки и которую вызывает фунция запуска и остановки слайд шоу make_timer
// передаем в неё номер необходимой галереи
function show_slides(number_gallery) {
    // находим картинки 
  const images = document.querySelectorAll(
    `img[data-container="${number_gallery}"]`
  );

  let current_image = null;

  // вычисляем картинку которая сейчас активна
  for (let image of images) {
    if (image.dataset.active == "true") {
      current_image = image.dataset.item;
    }
  }

  // вычисляем id активной на данный момент картинки
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_hide_image = "img_" + String(number_gallery) + String(current_image);
  
  // находим нужную картинку
  const hide_image = document.getElementById(id_hide_image);

  // прячем текущую картинку
  hide_image.style.display = "none"; 
  // выставляем дата атрибут активности картинки active в false потому что сейчас она не активна
  hide_image.dataset.active = "false";

  // увеличиваем счётчик активной картинки, чтобы показать следующую
  current_image++;
  if (current_image > images.length) {
    // если счётчик больше чем элементов в массиве картинок
    // то выставляем счётчик в 1 потому что номер картинок начинается с 1
    current_image = 1; // переменная i равна 0
  }

    // вычисляем id активной на данный момент картинки
  // (id состоит из слова img, номера галереи и номера картинки)
  const id_show_image = "img_" + String(number_gallery) + String(current_image);
  // находим нужную куртинку
  const show_image = document.getElementById(id_show_image);

  // показываем нужную картинку выставляя display в block
  show_image.style.display = "block";
  // выставляем дата атрибут активности в true
  show_image.dataset.active = "true";
}

// подключаем функции к кнопкам
// Метод addEventListener позволяет добавлять несколько обработчиков на одно событие одного элемента
// так же при использовании этого метода, можно удалять обработчик события используя removeEventListener
prev_button_1.addEventListener("click", move_prev);
center_button_1.addEventListener("click", animation);
next_button_1.addEventListener("click", move_next);
auto_button_1.addEventListener("click", make_timer);

prev_button_2.addEventListener("click", move_prev);
center_button_2.addEventListener("click", animation);
next_button_2.addEventListener("click", move_next);
auto_button_2.addEventListener("click", make_timer);

prev_button_3.addEventListener("click", move_prev);
center_button_3.addEventListener("click", animation);
next_button_3.addEventListener("click", move_next);
auto_button_3.addEventListener("click", make_timer);

prev_button_4.addEventListener("click", move_prev);
center_button_4.addEventListener("click", animation);
next_button_4.addEventListener("click", move_next);
auto_button_4.addEventListener("click", make_timer);
