(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.rm = {})));
})(this, function(exports) {
  'use strict';

  const fp =
    typeof window !== 'undefined' && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
        };
  const Rumantsch = {
    weekdays: {
      shorthand: ['Du', 'Gli', 'Ma', 'Me', 'Gie', 'Ve', 'So'],
      longhand: [
        'Dumengia',
        'Glindesdis',
        'Mardi',
        'Mesemna',
        'Gievgia',
        'Venderdi',
        'Sonda',
      ],
    },
    months: {
      shorthand: [
        'Schan',
        'Favr',
        'Mars',
        'Avr',
        'Matg',
        'Zercl',
        'Fan',
        'Avust',
        'Sett',
        'Oct',
        'Nov',
        'Dec',
      ],
      longhand: [
        'Schaner',
        'Favrer',
        'Mars',
        'Avrigl',
        'Matg',
        'Zercladur',
        'Fanadur',
        'Avust',
        'Settember',
        'October',
        'November',
        'December',
      ],
    },
    firstDayOfWeek: 1,
    weekAbbreviation: 'Emna',
    rangeSeparator: ' fin ',
    scrollTitle: 'Per modifitgar scrollar',
    toggleTitle: 'Per midar cliccar',
    time_24hr: true,
    SRF: {
      errorMessages: {
        noData: 'Naginas datas per endatar(&plusmn; 30 dis pussaivel).',
        dateFormat: 'DD.MM.OOOO',
      },
      label: {
        dateInput: 'Data per program-radio, format DD.MM.OOOO, +/- 30 dis',
      },
      buttons: {
        today: 'Oz',
        tomorrow: 'Damaun',
        nextDay: 'In di enavant',
        lastDay: 'In di enavos',
      },
    },
  };
  fp.l10ns.rm = Rumantsch;
  const rm = fp.l10ns;

  exports.Rumantsch = Rumantsch;
  exports.default = rm;

  Object.defineProperty(exports, '__esModule', { value: true });
});
