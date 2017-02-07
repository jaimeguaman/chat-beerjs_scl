(function() {
  'use strict';

  angular
    .module('beerjsChat')
    .factory('momentLocale', constructor);

  /** @ngInject */
  function constructor(){
    var momentLocale = {};

     momentLocale.es_cl = {
          monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          calendar: {
            sameDay: "[Hoy] HH:mm",
            nextDay: "[Mañana] HH:mm",
            nextWeek: "dddd HH:mm",
            lastDay: "[Ayer] HH:mm",
            lastWeek: "[El] dddd [pasado a las] HH:mm",
            sameElse: 'L'
          }
    };

    function _getLocale(id){
      return momentLocale[id] || undefined;
    }

    return {
      get: _getLocale
    }
  }
})();
