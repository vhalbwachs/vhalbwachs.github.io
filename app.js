(function(angular) {
  'use strict';

  const denseArray = (n) => Array.from(Array(n));

  class CalendarCtrl {
    constructor() {
      this.setDay(moment())
        .generateCalendar();
    }

    get dayNames() {
      return [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
    }
    setDay(day) {
      this.firstDay = day.clone().startOf('month');
      this.currentDay = day;
      return this;
    }
    incrementMonth() {
      this.setDay(this.firstDay.add(1, 'months'))
        .generateCalendar();
    }
    decrementMonth() {
      this.setDay(this.firstDay.subtract(1, 'months'))
        .generateCalendar();
    }
    generateCalendar() {
      this.calendarRows = denseArray(this.firstDay.daysInMonth())
      .reduce((rows, _, i) => {
        const day = this.firstDay.clone().add(i, 'days');
        if (i === 0 || day.day() === 0) {
          rows.push(denseArray(7));
        }
        const row = rows[rows.length - 1];
        row[day.day()] = day;
        return rows;
      }, []);
    }
  }

  angular
    .module('calendar', [])
    .config(['$compileProvider', $compileProvider => $compileProvider.debugInfoEnabled(false)])
    .controller('CalendarCtrl', CalendarCtrl)
})(window.angular);
