const anchors = [].slice.call(document.querySelectorAll('a[class^="scroll-to"')),
animationTime = 300,
framesCount = 20;
let burger = document.querySelector('.burger'),
navigation = document.querySelector('.nav'),
arrow = document.querySelector('.arrow'),
main_words_anim = document.querySelectorAll('.active_animations'),
yes_alletgy = document.getElementById('with_Allergy'),
no_allergy = document.getElementById('without_allergy'),
question_allergy = document.querySelector('.allergy')
yes_child = document.getElementById('with_child'),
no_child = document.getElementById('no_child'),
question_child = document.querySelector('.childs'),
allergy_input = document.getElementById('allergy_list'),
child_input = document.getElementById('child_info'),
btn_go_to_anket = document.querySelector('.btn_go_to_anket'),
main_ae = document.getElementById('main_ae_header'),
timer_succes = document.querySelector('.guest_anket > .timer'),
preloader = document.querySelector('.preloader');

let window_height = window.innerHeight * 0.01;
preloader.style.setProperty('--vh', `${window_height}px`);

window.onload = function() {
    let body = document.body;
    body.style.overflow = 'hidden';
    setInterval(function() {
          preloader.classList.remove('preloader_active');
          preloader.classList.add('preloader_hide');
          body.style.overflow = 'auto';
    }, 4000);
    setTimeout(function() {
        preloader.classList.add('preloader_stop');
  }, 5000);
    setTimeout(() => {
        btn_go_to_anket.classList.add('slide-in-fwd-center');
        burger.classList.add('menu_show_previer');
        main_ae.classList.add('slide-in-fwd-center');
    }, 4000);
    setTimeout(() => {
        btn_go_to_anket.classList.remove('slide-in-fwd-center');
        burger.classList.remove('menu_show_previer');
        main_ae.classList.remove('slide-in-fwd-center');
    }, 6000);
}

timer_succes.style.display = 'none';

question_child.style.display = 'none';

yes_child.addEventListener('click', function(e) {
    question_child.style.display = 'flex';
    question_child.classList.remove('hiden');
    question_child.classList.add('showed');
    child_input.setAttribute('required', '')
}
);

no_child.addEventListener('click', function(e) {
    question_child.classList.remove('showed');
    question_child.classList.add('hiden');
    question_child.style.display = 'none';
    child_input.removeAttribute('required');
}
);

question_allergy.style.display = 'none';

yes_alletgy.addEventListener('click', function(e) {
    question_allergy.style.display = 'flex';
    setInterval(() => {
        
    }, 100);
    question_allergy.classList.remove('hiden');
    question_allergy.classList.add('showed');
    allergy_input.setAttribute('required', '')
}
);

no_allergy.addEventListener('click', function(e) {
    question_allergy.classList.remove('showed');
    question_allergy.classList.add('hiden');
    setInterval(() => {
        
    }, 100);
    question_allergy.style.display = 'none';
    allergy_input.removeAttribute('required');
}
);

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
                if(animItem.classList.contains('calendar')){
                    animItem.classList.add('animation_start_calendar');
                }
                else if (animItem.classList.contains('timer')) {
                    animItem.classList.add('animation_start_timer');
                }
                animItem.classList.add('animation_start');
            } else{
                if(animItem.classList.contains('calendar')){
                    animItem.classList.remove('animation_start_calendar');
                }
                else if (animItem.classList.contains('timer')) {
                    animItem.classList.remove('animation_start_timer');
                }
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

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();

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
      $mounth1.textContent = mounth < 10 ? '0' + mounth : mounth;
      $days1.textContent = days < 10 ? '0' + days : days;
      $hours1.textContent = hours < 10 ? '0' + hours : hours;
      $minutes1.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds1.textContent = seconds < 10 ? '0' + seconds : seconds;
      document.querySelector('.mounth_name_value').innerHTML = declensionNum(mounth, ['месяц', 'месяца', 'месяцев']);
      document.querySelector('.days_name_value').innerHTML = declensionNum(days, ['день', 'дня', 'дней']);
      document.querySelector('.hours_name_value').innerHTML = declensionNum(hours, ['час', 'часа', 'часов']);
      document.querySelector('.minutes_name_value').innerHTML = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      document.querySelector('.seconds_name_value').innerHTML = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
      document.querySelector('.mounth_name_value1').innerHTML = declensionNum(mounth, ['месяц', 'месяца', 'месяцев']);
      document.querySelector('.days_name_value1').innerHTML = declensionNum(days, ['день', 'дня', 'дней']);
      document.querySelector('.hours_name_value1').innerHTML = declensionNum(hours, ['час', 'часа', 'часов']);
      document.querySelector('.minutes_name_value1').innerHTML = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      document.querySelector('.seconds_name_value1').innerHTML = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $mounth = document.querySelector('#timer_value_mounth');
    const $days = document.querySelector('#timer_value_days');
    const $hours = document.querySelector('#timer_value_hours');
    const $minutes = document.querySelector('#timer_value_minutes');
    const $seconds = document.querySelector('#timer_value_seconds');
    const $mounth1 = document.querySelector('#timer_value_mounth_1');
    const $days1 = document.querySelector('#timer_value_days_1');
    const $hours1 = document.querySelector('#timer_value_hours_1');
    const $minutes1 = document.querySelector('#timer_value_minutes_1');
    const $seconds1 = document.querySelector('#timer_value_seconds_1');
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

navigation.addEventListener('click', ()=>{
    if (burger.classList.contains('burger_open')){
        arrow.classList.remove('arrow_open');
        burger.classList.add('burger_close');
        burger.classList.remove('burger_open');
        navigation.classList.remove('nav_show');
        navigation.classList.add('nav_hide');
        arrow.classList.add('arrow_close')
    }
});