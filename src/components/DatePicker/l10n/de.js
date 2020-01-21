(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.de = {})));
})(this, function(exports) {
  'use strict';

  const fp =
    typeof window !== 'undefined' && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
        };
  const German = {
    weekdays: {
      shorthand: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      longhand: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
      ],
    },
    months: {
      shorthand: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
      longhand: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
    },
    firstDayOfWeek: 1,
    weekAbbreviation: 'KW',
    rangeSeparator: ' bis ',
    scrollTitle: 'Zum Ändern scrollen',
    toggleTitle: 'Zum Umschalten klicken',
    time_24hr: true,
    SRF: {
      errorMessages: {
        noData: 'Keine Daten für Eingabe (&plusmn; 30 Tage möglich).',
        dateFormat: 'TT.MM.JJJJ',
      },
      label: {
        dateInput:
          'Datum für Radio-Programm, Format TT.MM.JJJJ, Plusminus 30 Tage',
      },
      buttons: {
        today: 'Heute',
        tomorrow: 'Morgen',
        nextDay: 'Einen Tag weiter',
        lastDay: 'Einen Tag zurück',
      },
    },
  };
  fp.l10ns.de = German;
  const de = fp.l10ns;

  exports.German = German;
  exports.default = de;

  Object.defineProperty(exports, '__esModule', { value: true });
});
