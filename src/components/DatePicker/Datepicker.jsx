import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { German } from './l10n/de';
import { Rumantsch } from './l10n/rm';
import moment from 'moment';

import './DatePicker.scss';

/**
 *
 * A component to pick a date. For React-use just import and utilize it.
 * For vanilla use import React-Library and render with ReactDOM.render(). See Documentation: https://reactjs.org/docs/react-dom.html#render
 *
 * Properties
 * ==========
 * minDate: the minimal valid date
 * maxDate: the maximal valid date
 * currentDate: the current (initial) Date
 * updateCallback: a callback to receive the selected date (i.e. (date, formattedDate) => { ... } )
 * hideMonthSelection: disable month selection dropdown (boolean)
 * hideYearSelection: disable year selection dropdown (boolean)
 * calendarLocale: language of the calendar as a string ('German' or 'Rumatsch')
 *
 */

let translations = null;

const DatePicker = props => {
  const [info, setState] = useState({
    hasError: false
  });

  translations = props.translations;
  const minDate = props.minDate ? props.minDate : null;
  const maxDate = props.maxDate ? props.maxDate : null;
  const currentDate = props.currentDate ? props.currentDate : new Date();
  const updateCallback = props.updateCallback;
  const hideMonthSelection = props.hideMonthSelection ? 'static' : 'dropdown';
  const hideYearSelection = props.hideYearSelection
    ? props.hideYearSelection
    : false;
  const calendarLocale =
    props.calendarLocale === 'Rumantsch' ? Rumantsch : German;
  const { hasError } = info;

  return (
    <div className="date-picker">
      <button
        className="button button--icon-only button--secondary date-picker__arrow-left"
        title={calendarLocale.SRF.buttons.lastDay}
      >
        <span className="h-offscreen">
          {calendarLocale.SRF.buttons.lastDay}
        </span>
        <div className="button-wrapper button-wrapper--svg-icon">
          <span className="button-icon">
            <span className="svg-icon svg-icon--arrow-left"></span>
          </span>
        </div>
      </button>

      <Flatpickr
        value={currentDate}
        options={{
          allowInput: true,
          altInputClass:
            'input-field__text input-field--icon-date date-picker__input-field',
          minDate: minDate,
          maxDate: maxDate,
          locale: calendarLocale,
          disableMobile: true,
          altInput: true,
          altFormat: 'd.m.Y',
          dateFormat: 'Y-m-d',
          position: 'below',
          clickOpens: false,
          static: true,
          monthSelectorType: hideMonthSelection
        }}
        onChange={(date, formattedDate, instance) =>
          onChange(date, formattedDate, instance)
        }
        onReady={(selectedDates, dateStr, instance) => onReadyHandler(instance)}
        onOpen={() => onCalendarOpen()}
        onClose={() => onCalendarClose()}
      />

      <button
        className="button button--icon-only button--secondary date-picker__arrow-right"
        title={calendarLocale.SRF.buttons.nextDay}
      >
        <span className="h-offscreen">
          {calendarLocale.SRF.buttons.nextDay}
        </span>
        <div className="button-wrapper button-wrapper--svg-icon">
          <span className="button-icon">
            <span className="svg-icon svg-icon--arrow-right"></span>
          </span>
        </div>
      </button>
    </div>
  );

  function onReadyHandler(flatPickr) {
    // label - flatpickr does not support the possibility to set an id or a label for its input field...
    let label = document.createElement('label');
    let text = document.createTextNode(calendarLocale.SRF.label.dateInput);
    label.appendChild(text);
    label.setAttribute('for', 'js-date-picker__input-field');
    label.setAttribute('class', 'h-offscreen');
    let input = document.querySelector('.date-picker__input-field');
    input.setAttribute('id', 'js-date-picker__input-field');
    input.parentElement.prepend(label);

    // input field
    // since we don't want to display the calendar for screen readers and tab users, we set the
    // "clickOpens" setting to false and open the calendar manually on click
    document
      .querySelector('.date-picker__input-field')
      .addEventListener('click', e => {
        flatPickr.open();
      });

    // Back-Button
    document
      .querySelector('.date-picker__arrow-left')
      .addEventListener('click', e => {
        flatPickr.setDate(
          moment(currentDate)
            .subtract(1, 'days')
            .toDate(),
          true
        );
      });

    // Forward-Button
    document
      .querySelector('.date-picker__arrow-right')
      .addEventListener('click', e => {
        flatPickr.setDate(
          moment(currentDate)
            .add(1, 'days')
            .toDate(),
          true
        );
      });

    // Today & Tomorrow Buttons
    addShorthandButtons(flatPickr);

    if (hideYearSelection) {
      hideYearSelectionArrows();
    }

    adjustBackForwardButtons();
  }

  function onCalendarOpen() {
    document.querySelector('.date-picker__arrow-left').style.opacity = 0;
    document.querySelector('.date-picker__arrow-right').style.opacity = 0;
  }

  function onCalendarClose() {
    adjustBackForwardButtons();
  }

  function onChange(date, formattedDate, instance) {
    if (!hasError) {
      let errorElements = document.querySelector('.js-radio-program__error');

      if (moment(formattedDate).isValid() === true) {
        setState({ hasError: false });
        errorElements.style.display = 'none';
        if (document.querySelector('.flatpickr-calendar')) {
          document
            .querySelector('.flatpickr-calendar')
            .classList.remove('flatpickr-calendar--error');
        }
        adjustBackForwardButtons();
        updateCallback(date, formattedDate);
      } else {
        setState({ hasError: true });
        if (document.querySelector('.flatpickr-calendar')) {
          document
            .querySelector('.flatpickr-calendar')
            .classList.add('flatpickr-calendar--error');
        }
        errorElements.innerHTML = `<p>${calendarLocale.SRF.errorMessages.noData}</p>`;
        errorElements.style.display = 'block';
        instance.setDate(moment(currentDate).toDate(), true);

        if (document.querySelector('.date-picker__input-field')) {
          document.querySelector('.date-picker__input-field').value =
            calendarLocale.SRF.errorMessages.dateFormat;
          document
            .querySelector('.date-picker__input-field')
            .classList.add('input-field--on-error');
        }
      }
    } else {
      setState({ hasError: false });
    }
  }

  function adjustBackForwardButtons() {
    document.querySelector('.date-picker__arrow-left').style.opacity = 1;
    document.querySelector('.date-picker__arrow-right').style.opacity = 1;

    if (currentDate === minDate) {
      document.querySelector('.date-picker__arrow-left').style.display = 'none';
    }

    if (currentDate === maxDate) {
      document.querySelector('.date-picker__arrow-right').style.display =
        'none';
    }
  }

  function onClickShorthandButtons(e, flatPickr) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    const date = moment();
    if (target.textContent === calendarLocale.SRF.buttons.tomorrow) {
      date.add(1, 'days');
    }
    flatPickr.setDate(date.toDate(), true);
  }

  function addShorthandButtons(flatPickr) {
    if (!flatPickr.isMobile) {
      const buttonContainer = document.createElement('div');

      const todayButton = document.createElement('button');
      const tomorrowButton = document.createElement('button');

      // lovely IE11 does not support adding multiple classes at once to a classList :-/
      todayButton.classList.add('button');
      todayButton.classList.add('button--secondary');
      todayButton.classList.add('date-picker__shortcut-button');
      tomorrowButton.classList.add('button');
      tomorrowButton.classList.add('button--secondary');
      tomorrowButton.classList.add('date-picker__shortcut-button');

      todayButton.textContent = calendarLocale.SRF.buttons.today;
      tomorrowButton.textContent = calendarLocale.SRF.buttons.tomorrow;

      buttonContainer.appendChild(todayButton);
      buttonContainer.appendChild(tomorrowButton);

      flatPickr.calendarContainer.insertBefore(
        buttonContainer,
        flatPickr.calendarContainer.firstChild
      );
      buttonContainer.addEventListener('click', e => {
        onClickShorthandButtons(e, flatPickr);
      });
    }
  }

  function hideYearSelectionArrows() {
    if (
      document.querySelector('.flatpickr-calendar .arrowUp') &&
      document.querySelector('.flatpickr-calendar .arrowUp')
    ) {
      document.querySelector('.flatpickr-calendar .arrowUp').style.display =
        'none';
      document.querySelector('.flatpickr-calendar .arrowDown').style.display =
        'none';
    }
  }
};

export default DatePicker;
