const anchors = [].slice.call(document.querySelectorAll('a[class^="scroll-to"')),
animationTime = 300,
framesCount = 20;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    console.log(item.getAttribute('id'))
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(`.${item.getAttribute('id')}`).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});


document.addEventListener('DOMContentLoaded',function () {
    // конечная дата
    const deadline = new Date("Jule 19, 2024 12:30:00").getTime();
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const mounth = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24/ 30.6) : 0;
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24 - mounth*30.6) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $mounth.textContent = mounth < 10 ? '0' + mounth : mounth;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      document.querySelector('.mounth_name_value').innerHTML = declensionNum(mounth, ['месяц', 'месяца', 'месяцев']);
      document.querySelector('.days_name_value').innerHTML = declensionNum(days, ['день', 'дня', 'дней']);
      document.querySelector('.hours_name_value').innerHTML = declensionNum(hours, ['час', 'часа', 'часов']);
      document.querySelector('.minutes_name_value').innerHTML = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      document.querySelector('.seconds_name_value').innerHTML = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $mounth = document.querySelector('#timer_value_mounth');
    const $days = document.querySelector('#timer_value_days');
    const $hours = document.querySelector('#timer_value_hours');
    const $minutes = document.querySelector('#timer_value_minutes');
    const $seconds = document.querySelector('#timer_value_seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
  });


    // document.querySelectorAll('a[class^="scroll-to"').forEach(link => {

    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();

    //         let id = this.getAttribute('id');

    //         const scrollTarget = document.querySelector(`.${id}`);

    //         //const topOffset = document.querySelector(`.${id}`).offsetHeight;

    //         const topOffset = 0;
    //         const elementPosition = scrollTarget.getBoundingClientRect().top;
    //         const offsetPosition = elementPosition - topOffset;

    //         window.scrollIntoView({
    //             top: offsetPosition,
    //             behavior: 'smooth'
    //         });
    //     });
    // });