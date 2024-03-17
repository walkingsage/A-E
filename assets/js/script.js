const anchors = [].slice.call(document.querySelectorAll('a[class^="scroll-to"')),
animationTime = 300,
framesCount = 20;
let burger = document.querySelector('.burger'),
navigation = document.querySelector('.nav'),
arrow = document.querySelector('.arrow'),
main_words_anim = document.querySelectorAll('.active_animations');

if (main_words_anim.length > 0){
    window.addEventListener('scroll', anomScrollH2);
    function anomScrollH2(){
        for (let index = 0; index < main_words_anim.length; index++) {
            const animItem = main_words_anim[index];
            const animItemHight = animItem.offsetHeight;
            const animItemoffSet = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHight/animStart;
            if(animItemHight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight/animStart;
            }

            if((pageYOffset > animItemoffSet - animItemPoint) && pageYOffset < (animItemoffSet+animItemHight)){
                animItem.classList.add('animation_start');
            } else{
                animItem.classList.remove('animation_start');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}


window.onload = function() {
    let preloader = document.querySelector('.preloader');
    setInterval(function() {
          preloader.classList.remove('preloader_active');
          preloader.classList.add('preloader_hide');
    }, 4000);
    setInterval(function() {
        preloader.classList.add('preloader_stop');
  }, 5000);
}

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    console.log(item.getAttribute('id'));

    document.querySelector(`.${item.getAttribute('id')}`).scrollIntoView({behavior: "smooth",block: 'start'});
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

burger.addEventListener('click', () =>{
    if (burger.classList.contains('burger_open')){
        arrow.classList.remove('arrow_open');
        burger.classList.add('burger_close');
        burger.classList.remove('burger_open');
        navigation.classList.remove('nav_show');
        navigation.classList.add('nav_hide');
        arrow.classList.add('arrow_close')
    }
    else{
        arrow.classList.remove('arrow_close');
        arrow.classList.add('arrow_open');
        burger.classList.remove('burger_close');
        navigation.classList.remove('nav_hide');
        navigation.classList.add('nav_show');
        burger.classList.add('burger_open');
    }
});