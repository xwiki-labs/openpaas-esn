(function() {
  'use strict';

  /**
   * A shell that wraps an ical.js VEVENT component to be compatible with
   * fullcalendar's objects.
   * Fullcalendar relevant properties are (see http://fullcalendar.io/docs/event_data/Event_Object/):
   *   * id
   *   * title
   *   * allDay
   *   * start
   *   * end
   * @param {ICAL.Component} vcalendar     The ical.js VCALENDAR component.
   * @param {Object} extendedProperties    Object of additional properties like:
   *   {
   *     path: {String},                   The path on the caldav server.
   *     etag: {String},                   The ETag of the event.
   *     gracePeriodTaskId: {String}       The gracePeriodTaskId of the event.
   *   }
   */
  angular.module('esn.calendar')
         .factory('CalendarShell', CalendarShellFactory);

  CalendarShellFactory.$inject = [
    '$q',
    '_',
    'ICAL',
    'jstz',
    'uuid4',
    'calendarUtils',
    'calEventAPI',
    'calMoment',
    'calMasterEventCache',
    'CalRRuleShell',
    'CalVAlarmShell',
    'EVENT_MODIFY_COMPARE_KEYS',
    'ICAL_PROPERTIES'
  ];

  function CalendarShellFactory($q, _, ICAL, jstz, uuid4, calendarUtils, calEventAPI, calMoment, calMasterEventCache, CalRRuleShell, CalVAlarmShell, EVENT_MODIFY_COMPARE_KEYS, ICAL_PROPERTIES) {
    var localTimezone = jstz.determine().name();

    function CalendarShell(vcomponent, extendedProperties) {
      var vcalendar, vevent;

      if (vcomponent.name === 'vcalendar') {
        vevent = vcomponent.getFirstSubcomponent('vevent');
        vcalendar = vcomponent;
      } else if (vcomponent.name === 'vevent') {
        vevent = vcomponent;
        vcalendar = new ICAL.Component('vcalendar');
        vcalendar.addSubcomponent(vevent);
      } else {
        throw new Error('Cannot create a shell - Unsupported vcomponent');
      }

      this.vcalendar = vcalendar;
      this.vevent = vevent;

      // NOTE: adding additional extended properties also requires adjusting
      // the _getExtendedProperties method.
      extendedProperties = extendedProperties || {};
      this.path = extendedProperties.path;
      this.etag = extendedProperties.etag;
      this.backgroundColor = extendedProperties.backgroundColor;
      this.gracePeriodTaskId = extendedProperties.gracePeriodTaskId;
      this.icalEvent = new ICAL.Event(this.vevent);

      this.timezones = _.chain(this.vcalendar.getAllSubcomponents('vtimezone')).map(ICAL.Timezone.fromData).indexBy('tzid').value();

      if (this.icalEvent.startDate) {
        this.icalEvent.startDate.zone = this.timezones[this.icalEvent.startDate.timezone] || this.icalEvent.startDate.zone;
        //trying to acesss endDate if startDate is not define crash ICAL.js
        if (this.icalEvent.endDate) {
          this.icalEvent.endDate.zone = this.timezones[this.icalEvent.endDate.timezone] || this.icalEvent.endDate.zone;
        }
      }

      var localTimezoneFound = _.contains(Object.keys(this.timezones), localTimezone);

      if (!localTimezoneFound) {
        this.vcalendar.addSubcomponent(ICAL.TimezoneService.get(localTimezone).component);
      }
    }

    CalendarShell.from = from;
    CalendarShell.fromJSON = fromJSON;
    CalendarShell.fromIncompleteShell = fromIncompleteShell;

    CalendarShell.prototype = {
      isRecurring: isRecurring,
      deleteInstance: deleteInstance,
      deleteAllException: deleteAllException,
      expand: expand,
      _computeNonExceptionnalInstance: _computeNonExceptionnalInstance,
      isRealException: isRealException,
      removeAlarm: removeAlarm,
      changeParticipation: changeParticipation,
      setOrganizerPartStat: setOrganizerPartStat,
      getOrganizerPartStat: getOrganizerPartStat,
      isInstance: isInstance,
      clone: clone,
      equals: equals,
      getModifiedMaster: getModifiedMaster,
      modifyOccurrence: modifyOccurrence,

      get uid() { return this.vevent.getFirstPropertyValue('uid'); },
      get id() { return this.recurrenceId ? this.uid + '_' + this.vevent.getFirstPropertyValue('recurrence-id').convertToZone(ICAL.Timezone.utcTimezone) : this.uid; },

      get calendarId() {
        return this.path && (this.path.match(new RegExp('/([^/]+)/[^/]+?/?$')) || [])[1];
      },

      get title() { return this.vevent.getFirstPropertyValue('summary'); },
      set title(value) { this.vevent.updatePropertyWithValue('summary', value); },

      get summary() { return this.vevent.getFirstPropertyValue('summary'); },
      set summary(value) { this.vevent.updatePropertyWithValue('summary', value); },

      get location() { return this.vevent.getFirstPropertyValue('location'); },
      set location(value) { this.vevent.updatePropertyWithValue('location', value); },

      get description() { return this.vevent.getFirstPropertyValue('description'); },
      set description(value) { this.vevent.updatePropertyWithValue('description', value); },

      get status() { return this.vevent.getFirstPropertyValue('status'); },
      set status(value) { this.vevent.updatePropertyWithValue('status', value); },

      get sequence() { return this.vevent.getFirstPropertyValue('sequence') || 0; },
      set sequence(value) { this.vevent.updatePropertyWithValue('sequence', value); },

      get start() {
        if (!this.__start) {
          this.__start = calMoment(this.icalEvent.startDate);
        }

        return this.__start;
      },
      set start(value) {
        this.__start = undefined;
        if (value) {
          var dtstart = ICAL.Time.fromJSDate(value.toDate(), true).convertToZone(ICAL.TimezoneService.get(localTimezone));

          dtstart.isDate = !value.hasTime();

          if (this.isRecurring() && !_sameIcalTime(this.icalEvent.startDate, dtstart)) {
            this.deleteAllException();
          }

          this.vevent.updatePropertyWithValue('dtstart', dtstart).setParameter('tzid', localTimezone);
        }
      },

      get end() {
        if (!this.__end) {
          this.__end = calMoment(this.icalEvent.endDate);
        }

        return this.__end;
      },
      set end(value) {
        this.__end = undefined;
        if (value) {
          var dtend = ICAL.Time.fromJSDate(value.toDate(), true).convertToZone(ICAL.TimezoneService.get(localTimezone));

          dtend.isDate = !value.hasTime();

          if (this.isRecurring() && !_sameIcalTime(this.icalEvent.endDate, dtend)) {
            this.deleteAllException();
          }

          this.vevent.updatePropertyWithValue('dtend', dtend).setParameter('tzid', localTimezone);
        }
      },

      get allDay() { return this.vevent.getFirstProperty('dtstart').type === 'date'; },

      get recurrenceId() {
        if (!this.__recurrenceId) {
          var recurrenceId = this.vevent.getFirstPropertyValue('recurrence-id');

          if (recurrenceId) {
            this.__recurrenceId = calMoment(recurrenceId);
          }
        }

        return this.__recurrenceId;
      },
      set recurrenceId(value) {
        this.__recurrenceId = undefined;
        if (value) {
          var recid = ICAL.Time.fromJSDate(value.toDate(), true);

          recid.isDate = !value.hasTime();
          this.vevent.updatePropertyWithValue('recurrence-id', recid);
        }
      },

      get rrule() {
        var rrule = this.vevent.getFirstPropertyValue('rrule');

        if (rrule && !this.__rrule) {
          this.__rrule = new CalRRuleShell(rrule, this.vevent);
        }

        return this.__rrule;
      },
      set rrule(value) {
        this.__rrule = undefined;
        if (!value) {
          this.vevent.removeProperty('rrule');

          return;
        }
        if (value.until) {
          value.until = ICAL.Time.fromJSDate(value.until);
        }
        var rrule = new ICAL.Recur.fromData(value);

        this.vevent.updatePropertyWithValue('rrule', rrule);
      },

      get organizer() {
        if (!this.__organizer) {
          var organizer = this.vevent.getFirstProperty('organizer');

          if (organizer) {
            var mail = calendarUtils.removeMailto(organizer.getFirstValue());
            var cn = organizer.getParameter('cn');

            this.__organizer = {
              fullmail: calendarUtils.fullmailOf(cn, mail),
              email: mail,
              name: cn || mail,
              displayName: cn || mail
            };
          }
        }

        return this.__organizer;
      },
      set organizer(value) {
        this.__organizer = undefined;
        var organizerValue = calendarUtils.prependMailto(value.email || value.emails[0]);
        var organizerCN = value.displayName || calendarUtils.displayNameOf(value.firstname, value.lastname);
        var organizer = this.vevent.updatePropertyWithValue('organizer', organizerValue);

        organizer.setParameter('cn', organizerCN);
      },

      get attendees() {
        if (this.__attendees) {
          return this.__attendees;
        }

        this.__attendees = this.vevent.getAllProperties('attendee').map(function(attendee) {
          var attendeeEmail = attendee.getFirstValue();

          if (!attendeeEmail) {
            return;
          }
          var cn = attendee.getParameter('cn');
          var mail = calendarUtils.removeMailto(attendeeEmail);
          var partstat = attendee.getParameter('partstat');
          var id = attendee.getParameter('id');

          return {
            fullmail: calendarUtils.fullmailOf(cn, mail),
            email: mail,
            name: cn || mail,
            partstat: partstat,
            displayName: cn || mail,
            id: id
          };
        });

        return this.__attendees;
      },
      set attendees(values) {
        if (!angular.isArray(values)) {
          return;
        }
        this.__attendees = undefined;
        this.vevent.removeAllProperties('attendee');
        values.forEach(function(attendee) {
          var mail = attendee.email || attendee.emails[0];
          var isOrganizer = this.organizer && (mail === this.organizer.email);
          var mailto = calendarUtils.prependMailto(mail);
          var property = this.vevent.addPropertyWithValue('attendee', mailto);

          property.setParameter('id', attendee.id);
          property.setParameter('partstat', attendee.partstat || (isOrganizer ? ICAL_PROPERTIES.partstat.accepted : ICAL_PROPERTIES.partstat.needsaction));
          property.setParameter('rsvp', isOrganizer ? ICAL_PROPERTIES.rsvp.false : ICAL_PROPERTIES.rsvp.true);
          property.setParameter('role', isOrganizer ? ICAL_PROPERTIES.role.chair : ICAL_PROPERTIES.role.reqparticipant);
          if (attendee.displayName && attendee.displayName !== mail) {
            property.setParameter('cn', attendee.displayName);
          }
        }.bind(this));
      },

      get alarm() {
        if (!this.__alarm) {
          var valarm = this.vevent.getFirstSubcomponent('valarm');

          if (valarm) {
            this.__alarm = new CalVAlarmShell(valarm, this.vevent);
          }
        }

        return this.__alarm;
      },
      set alarm(value) {
        if (!value) {
          this.__alarm = undefined;
          this.vevent.removeSubcomponent('valarm');
        } else {
          if (!value.trigger || !value.attendee) {
            throw new Error('invalid alarm set value, missing trigger or attendee');
          }
          this.__alarm = undefined;
          this.vevent.removeSubcomponent('valarm');

          var SUMMARY_TEMPLATE = 'Pending event! <%- summary %>';
          var DESCRIPTION_TEMPLATE =
            'This is an automatic alarm sent by OpenPaas\\n' +
            'PENDING EVENT!\\n' +
            'The event <%- summary %> will start <%- diffStart %>\\n' +
            'start: <%- start %> \\n' +
            'end: <%- end %> \\n' +
            'location: <%- location %> \\n' +
            'More details:\\n' +
            'https://localhost:8080/#/calendar/<%- calendarId %>/event/<%- eventId %>/consult';

          var valarm = new ICAL.Component('valarm');

          valarm.addPropertyWithValue('trigger', value.trigger);
          valarm.addPropertyWithValue('action', 'EMAIL');
          valarm.addPropertyWithValue('summary', _.template(SUMMARY_TEMPLATE)({summary: this.summary}));
          valarm.addPropertyWithValue('description', _.template(DESCRIPTION_TEMPLATE)({
            summary: this.summary,
            start: this.start,
            end: this.end,
            diffStart: calMoment(new Date()).to(this.start),
            location: this.location,
            calendarId: this.calendarId,
            eventId: this.id
          }));

          var mailto = calendarUtils.prependMailto(value.attendee);

          valarm.addPropertyWithValue('attendee', mailto);
          this.vevent.addSubcomponent(valarm);
        }
      }
    };

    return CalendarShell;

    ////////////

    function _setDatetimePropertyFromIcalTime(component, propertyName, icalTime) {
      var property = component.getFirstProperty(propertyName);

      if (!property) {
        property = new ICAL.Property(propertyName);
        component.addProperty(property);
      }

      property.setValue(icalTime.convertToZone(ICAL.Timezone.utcTimezone));
      if (icalTime.zone.tzid === ICAL.Timezone.utcTimezone.tzid) {
        property.removeParameter('tzid');
      } else {
        property.setParameter('tzid', icalTime.zone.tzid);
      }
    }

    function _sameIcalTime(a, b) {
      if (!a) {
        return !b;
      }

      return a.compare(b) === 0 && Boolean(a.isDate) === Boolean(b.isDate);
    }

    function _getExtendedProperties(that) {
      return {
        path: that.path,
        etag: that.etag,
        backgroundColor: that.backgroundColor,
        gracePeriodTaskId: that.gracePeriodTaskId
      };
    }

    function _removeOccurenceFromVcalendar(that, instance) {
      var vevents = that.vcalendar.getAllSubcomponents('vevent');

      for (var i = 0, len = vevents.length; i < len; i++) {
        var vevent = vevents[i];
        var recId = vevent.getFirstPropertyValue('recurrence-id');

        if (recId) {
          recId.zone = that.timezones[recId.timezone] || recId.zone;
          if (instance.recurrenceId.isSame(recId.toJSDate())) {
            that.vcalendar.removeSubcomponent(vevent);
            break;
          }
        }
      }
    }

    function isRecurring() {
      return this.icalEvent.isRecurring();
    }

    function deleteInstance(instance) {
      _removeOccurenceFromVcalendar(this, instance);
      this.vevent.addPropertyWithValue('exdate', instance.vevent.getFirstPropertyValue('recurrence-id'));
    }

    function deleteAllException() {
      this.vcalendar.getAllSubcomponents('vevent').forEach(function(vevent) {
        if (vevent.getFirstPropertyValue('recurrence-id')) {
          this.vcalendar.removeSubcomponent(vevent);
        }
      }, this);
    }

    function _computeNonExceptionnalInstance(instanceDetails) {
      var instance = this.clone();

      instance.deleteAllException();
      instance.vevent.removeProperty('rrule');
      instance.vevent.removeProperty('exdate');

      _setDatetimePropertyFromIcalTime(instance.vevent, 'recurrence-id', instanceDetails.recurrenceId.convertToZone(ICAL.Timezone.utcTimezone));
      _setDatetimePropertyFromIcalTime(instance.vevent, 'dtstart', instanceDetails.startDate);
      _setDatetimePropertyFromIcalTime(instance.vevent, 'dtend', instanceDetails.endDate);

      return instance;
    }

    function expand(startDate, endDate, maxElement) {
      if (!this.icalEvent.isRecurring()) {
        return [];
      }
      if (!endDate && !maxElement && !this.rrule.count && !this.rrule.until) {
        throw new Error('Could not list all element of a reccuring event that never end');
      }

      this.vcalendar.getAllSubcomponents('vevent').forEach(function(vevent) {
        if (vevent.getFirstPropertyValue('recurrence-id')) {
          var event = new ICAL.Event(vevent);

          if (event.startDate) {
            event.startDate.zone = this.timezones[event.startDate.timezone] || event.startDate.zone;
            //trying to acesss endDate if startDate is not define crash ICAL.js
            if (event.endDate) {
              event.endDate.zone = this.timezones[event.endDate.timezone] || event.endDate.zone;
            }
          }
          this.icalEvent.relateException(event);
        }
      }, this);

      var iterator = this.icalEvent.iterator(this.icalEvent.startDate);
      var currentDatetime, currentEvent, currentDetails, result = [];

      function _getException(icalEvent, recurrenceId) {
        return _.find(icalEvent.exceptions, function(exception) {
          return exception.recurrenceId.compare(recurrenceId) === 0;
        });
      }

      function _beforeEndDate(currentDatetime) {
        if (endDate.isAfter(currentDatetime.toJSDate())) {
          return true;
        } else if (!endDate.hasTime()) {
          return endDate.isSame(currentDatetime.toJSDate(), 'day');
        }

        return false;
      }

      while ((currentDatetime = iterator.next()) && (!endDate || _beforeEndDate(currentDatetime)) && (!maxElement || result.length < maxElement)) { // eslint-disable-line no-cond-assign

        if (!startDate || startDate.isBefore(currentDatetime.toJSDate()) || (!startDate.hasTime() && startDate.isSame(currentDatetime.toJSDate(), 'day'))) {
          currentDetails = this.icalEvent.getOccurrenceDetails(currentDatetime);

          currentEvent = _getException(this.icalEvent, currentDetails.recurrenceId);

          if (currentEvent) {
            currentEvent = new CalendarShell(new ICAL.Component(currentEvent.component.toJSON()), _getExtendedProperties(this));
          } else {
            currentEvent = this._computeNonExceptionnalInstance(currentDetails);
          }

          result.push(currentEvent);
        }
      }

      return result;
    }

    function removeAlarm() {
      this.vevent.removeSubcomponent('valarm');
    }

    /**
     * Change the partstat of all attendees (except the organizer) to a specific status. if emails is defined, change only attendees matching with emails.
     * @param  {String} status a partstat
     * @param  {[String]} emails optional, used to filter which attendee to change participation of
     * @return {Boolean} true or false depending of if an attendee has been modified or not
     */
    function changeParticipation(status, emails) {
      this.__attendees = undefined;
      var needsModify = false;
      var attendees = this.vevent.getAllProperties('attendee');

      if (this.organizer) {
        var organizerMailto = calendarUtils.prependMailto(this.organizer.email);

        attendees = attendees.filter(function(attendee) {
          return organizerMailto && attendee.getFirstValue() !== organizerMailto;
        });
      }
      attendees.forEach(function(attendee) {
        if (!emails) {
          needsModify = needsModify || attendee.getParameter('partstat') !== status;
          attendee.setParameter('partstat', status);
        } else {
          var emailMap = {};

          emails.forEach(function(email) { emailMap[calendarUtils.prependMailto(email.toLowerCase())] = true; });
          if ((attendee.getFirstValue().toLowerCase() in emailMap) && attendee.getParameter('partstat') !== status) {
            attendee.setParameter('partstat', status);
            needsModify = true;
          }
        }
      });

      return needsModify;
    }

    /**
     * Change the partstat of the organizer to a specific status.
     * @param  {String} status a partstat
     */
    function setOrganizerPartStat(status) {
      if (!this.organizer) {
        return;
      }
      this.__organizerPartStat = undefined;
      var organizerMailto = calendarUtils.prependMailto(this.organizer.email);
      var organizerAsAttendee = this.vevent.getAllProperties('attendee').filter(function(attendee) {
        return attendee.getFirstValue() === organizerMailto;
      });

      if (organizerAsAttendee[0]) {
        this.vevent.removeProperty(organizerAsAttendee[0]);
      }
      var property = this.vevent.addPropertyWithValue('attendee', calendarUtils.prependMailto(this.organizer.email));

      property.setParameter('partstat', status || ICAL_PROPERTIES.partstat.accepted);
      property.setParameter('rsvp', ICAL_PROPERTIES.rsvp.false);
      property.setParameter('role', ICAL_PROPERTIES.role.chair);
      this.__attendees = null;
    }

    /**
     * Get the partstat of the organizer.
     * @return {String} a partstat
     */
    function getOrganizerPartStat() {
      if (this.__organizerPartStat) {
        return this.__organizerPartStat;
      }
      if (!this.organizer) {
        return null;
      }
      var organizerMailto = calendarUtils.prependMailto(this.organizer.email);
      var organizerAsAttendee = this.vevent.getAllProperties('attendee').filter(function(attendee) {
        return attendee.getFirstValue() === organizerMailto;
      });

      if (organizerAsAttendee[0]) {
        this.__organizerPartStat = organizerAsAttendee[0].getParameter('partstat');

        return this.__organizerPartStat;
      }

      return null;
    }

    /**
     * Return true if the CalendarShell is an occurrence of a serie, false otherwise.
     * @return {Boolean} true or false depending of if the shell is an instance or a master event.
     */
    function isInstance() { return !!this.recurrenceId; }

    /**
     * Return a deep clone of this shell.
     *
     * @return {CalendarShell} The new clone
     */
    function clone() {
      var clonedComp = new ICAL.Component(_.cloneDeep(this.vcalendar.toJSON()));

      return new CalendarShell(clonedComp, _getExtendedProperties(this));
    }

    /**
     * Return true if this equals that.
     *
     * @return {Boolean} the result
     */
    function equals(that, optionalSubsetKeys) {
      var keys = optionalSubsetKeys || EVENT_MODIFY_COMPARE_KEYS;
      var self = this;

      return keys.every(function(key) {
        switch (key) {
          case 'start':
          case 'end':
          case 'recurrenceId':
            if (self[key] === that[key]) { return true; }

            return self[key]._isAMomentObject && that[key]._isAMomentObject && self[key].isSame(that[key]);
          case 'rrule':
            if (!self.rrule) { return !that.rrule; }
            if (self.rrule === that.rrule) { return true; }

            return self.rrule.equals(that.rrule);
          case 'alarm':
            if (!self.alarm) { return !that.alarm; }
            if (self.alarm === that.alarm) { return true; }

            return self.alarm.equals(that.alarm);
          default:
            return angular.equals(self[key], that[key]);
        }
      });
    }

    /**
     * Find or retrieve the modified master event for this shell. If the
     * shell is already a master event, return a promise with this. Otherwise
     * either find it in the vcalendar parent, or retrieve it from the
     * server and register the instance inside the master.
     *
     * @return {Promise}      Promise resolving with the master shell.
     */
    function getModifiedMaster() {
      if (!this.isInstance()) {
        return $q.when(this);
      }

      var fromCache = calMasterEventCache.get(this.path);

      if (fromCache) {
        fromCache.modifyOccurrence(this);

        return $q.when(fromCache);
      }

      // Not found, we need to retrieve the event
      return calEventAPI.get(this.path).then(function(response) {
        var mastershell = new CalendarShell(new ICAL.Component(response.data), _getExtendedProperties(this));

        mastershell.modifyOccurrence(this);

        return mastershell;
      }.bind(this));
    }

    function isRealException(instance) {
      var currentDetails = this.icalEvent.getOccurrenceDetails(instance.vevent.getFirstPropertyValue('recurrence-id'));
      var regularException = this._computeNonExceptionnalInstance(currentDetails);

      return !instance.equals(regularException);
    }

    /**
     * For a master shell, modifies a specific instance so it appears as a
     * modified occurrence in the vcalendar. Can not be called on instances.
     *
     * @param {CalendarShell} instance        The instance to add as modified.
     * @param {CalendarShell} notRefreshCache Do not refresh cache
     */
    function modifyOccurrence(instance, notRefreshCache) {
      if (this.isInstance()) {
        throw new Error('Cannot modify occurrence on an instance');
      }

      if (!this.isRealException(instance)) {
        return;
      }

      _removeOccurenceFromVcalendar(this, instance);
      this.vcalendar.addSubcomponent(instance.clone().vevent);
      !notRefreshCache && calMasterEventCache.save(this);
    }

    /**
     * Build a CalendarShell from a plain jCal Object.
     *
     * @param  {Object} ical                                  A jCal formatted Object
     * @param  {Object} extendedProperties                    Extended properties to save with this shell.
     * @param  {Object} extendedProperties.etag               The ETag for this shell.
     * @param  {Object} extendedProperties.path               The caldav path this event is on.
     * @param  {Object} extendedProperties.gracePeriodTaskId  The task id for the grace period service.
     * @return {CalendarShell}                                The new CalendarShell
     */
    function from(ical, extendedProperties) {
      return new CalendarShell(new ICAL.Component(ical), extendedProperties);
    }

    function fromJSON(json) {
      return new CalendarShell(new ICAL.Component(json.vcalendar), {path: json.path, etag: json.etag, gracePeriodTaskId: json.gracePeriodTaskId});
    }

    /**
     * Build a CalendarShell from the plain object. The plain object's keys
     * must be settable properties in the CalendarShell object, usually
     * start/end/allDay.
     *
     * @param  {Object} shell         The plain object to set the shell from.
     * @return {CalendarShell}        The new CalendarShell
     */
    function fromIncompleteShell(obj) {
      var vcalendar = new ICAL.Component('vcalendar');
      var vevent = new ICAL.Component('vevent');

      vcalendar.addSubcomponent(vevent);

      vevent.addPropertyWithValue('uid', uuid4.generate());
      vevent.addPropertyWithValue('transp', obj.allDay ? 'TRANSPARENT' : 'OPAQUE');

      var newShell = new CalendarShell(vcalendar);

      angular.forEach(obj, function(prop, key) {
        newShell[key] = prop;
      });

      return newShell;
    }
  }
})();
