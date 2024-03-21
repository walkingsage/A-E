async function submitForm(event) {
  let forma = document.querySelector('.guest_anket_form'),
  anket_sub = document.querySelector('.anket_sub'),
  succes_anket = document.querySelector('.anket_succes'),
  btn_submit = document.querySelector('.submit_btn'),
  timer_succes = document.querySelector('.guest_anket > .timer');
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    
    try {
        // Формируем запрос
      const response = await fetch(event.target.action, {
          method: 'POST',
          body: new FormData(event.target)
      });
      // проверяем, что ответ есть
      if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
      // проверяем, что ответ действительно JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw ('Ошибка обработки. Ответ не JSON');
      }
      // обрабатываем запрос
      const json = await response.json();
      if (json.result === "success") {
          // в случае успеха
          anket_sub.classList.remove('active_animations');
          setTimeout(function() {
            forma.classList.add('preloader_hide');
            anket_sub.classList.add('preloader_hide');
            }, 1000);
          setTimeout(function() {
            forma.classList.add('preloader_stop');
            anket_sub.classList.add('preloader_stop');
          }, 3000);
          document.querySelector('.guest_anket').scrollIntoView({behavior: "smooth",block: 'start'});
          setTimeout(() => {
            succes_anket.style.display = 'flex';
            timer_succes.style.display = 'grid';
            succes_anket.classList.add('anket_sucess');
            timer_succes.classList.add('anket_sucess');
          }, 3000);
      } else { 
          // в случае ошибки
          console.log(json);
          throw (json.info);
      }
    } catch (error) { // обработка ошибки
      alert(error);
    }
  }