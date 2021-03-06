(function() {
  'use strict';

  angular.module('esn.calendar')
         .factory('calRegisterTimezones', calRegisterTimezones);

  calRegisterTimezones.$inject = [
    'ICAL',
    'TIMEZONES'
  ];

  function calRegisterTimezones(ICAL, TIMEZONES) {
    var service = registerTZ;

    return service;

    ////////////

    function registerTZ() {
      angular.forEach(TIMEZONES.zones, function(data, key) {
        ICAL.TimezoneService.register(key, _buildTimezone(key, data.ics));
      });

      angular.forEach(TIMEZONES.aliases, function(data, key) {
        ICAL.TimezoneService.register(key, _findTimezone(data.aliasTo));
      });
    }

    function _buildTimezone(tzid, ics) {
      return ICAL.TimezoneService.get(tzid) || new ICAL.Timezone(new ICAL.Component(ICAL.parse(ics)));
    }

    function _findTimezone(tzid) {
      if (tzid === 'UTC') {
        return ICAL.Timezone.utcTimezone;
      } else if (TIMEZONES.zones[tzid]) {
        return _buildTimezone(tzid, TIMEZONES.zones[tzid]);
      } else {
        return _findTimezone(TIMEZONES.aliases[tzid].aliasTo);
      }
    }
  }

  angular.module('esn.calendar')
    .constant('TIMEZONES', {
      version: '2.2016c',
      aliases: {
        'AUS Central Standard Time': {
          aliasTo: 'Australia/Darwin'
        },
        'AUS Eastern Standard Time': {
          aliasTo: 'Australia/Sydney'
        },
        'Afghanistan Standard Time': {
          aliasTo: 'Asia/Kabul'
        },
        'Africa/Asmera': {
          aliasTo: 'Africa/Asmara'
        },
        'Africa/Timbuktu': {
          aliasTo: 'Africa/Bamako'
        },
        'Alaskan Standard Time': {
          aliasTo: 'America/Anchorage'
        },
        'America/Argentina/ComodRivadavia': {
          aliasTo: 'America/Argentina/Catamarca'
        },
        'America/Buenos_Aires': {
          aliasTo: 'America/Argentina/Buenos_Aires'
        },
        'America/Louisville': {
          aliasTo: 'America/Kentucky/Louisville'
        },
        'America/Montreal': {
          aliasTo: 'America/Toronto'
        },
        'America/Santa_Isabel': {
          aliasTo: 'America/Tijuana'
        },
        'Arab Standard Time': {
          aliasTo: 'Asia/Riyadh'
        },
        'Arabian Standard Time': {
          aliasTo: 'Asia/Dubai'
        },
        'Arabic Standard Time': {
          aliasTo: 'Asia/Baghdad'
        },
        'Argentina Standard Time': {
          aliasTo: 'America/Argentina/Buenos_Aires'
        },
        'Asia/Calcutta': {
          aliasTo: 'Asia/Kolkata'
        },
        'Asia/Katmandu': {
          aliasTo: 'Asia/Kathmandu'
        },
        'Asia/Saigon': {
          aliasTo: 'Asia/Ho_Chi_Minh'
        },
        'Atlantic Standard Time': {
          aliasTo: 'America/Halifax'
        },
        'Atlantic/Faeroe': {
          aliasTo: 'Atlantic/Faroe'
        },
        'Atlantic/Jan_Mayen': {
          aliasTo: 'Europe/Oslo'
        },
        'Azerbaijan Standard Time': {
          aliasTo: 'Asia/Baku'
        },
        'Azores Standard Time': {
          aliasTo: 'Atlantic/Azores'
        },
        'Bahia Standard Time': {
          aliasTo: 'America/Bahia'
        },
        'Bangladesh Standard Time': {
          aliasTo: 'Asia/Dhaka'
        },
        'Belarus Standard Time': {
          aliasTo: 'Europe/Minsk'
        },
        'Canada Central Standard Time': {
          aliasTo: 'America/Regina'
        },
        'Cape Verde Standard Time': {
          aliasTo: 'Atlantic/Cape_Verde'
        },
        'Caucasus Standard Time': {
          aliasTo: 'Asia/Yerevan'
        },
        'Cen. Australia Standard Time': {
          aliasTo: 'Australia/Adelaide'
        },
        'Central America Standard Time': {
          aliasTo: 'America/Guatemala'
        },
        'Central Asia Standard Time': {
          aliasTo: 'Asia/Almaty'
        },
        'Central Brazilian Standard Time': {
          aliasTo: 'America/Cuiaba'
        },
        'Central Europe Standard Time': {
          aliasTo: 'Europe/Budapest'
        },
        'Central European Standard Time': {
          aliasTo: 'Europe/Warsaw'
        },
        'Central Pacific Standard Time': {
          aliasTo: 'Pacific/Guadalcanal'
        },
        'Central Standard Time': {
          aliasTo: 'America/Chicago'
        },
        'Central Standard Time (Mexico)': {
          aliasTo: 'America/Mexico_City'
        },
        'China Standard Time': {
          aliasTo: 'Asia/Shanghai'
        },
        'E. Africa Standard Time': {
          aliasTo: 'Africa/Nairobi'
        },
        'E. Australia Standard Time': {
          aliasTo: 'Australia/Brisbane'
        },
        'E. South America Standard Time': {
          aliasTo: 'America/Sao_Paulo'
        },
        'Eastern Standard Time': {
          aliasTo: 'America/New_York'
        },
        'Egypt Standard Time': {
          aliasTo: 'Africa/Cairo'
        },
        'Ekaterinburg Standard Time': {
          aliasTo: 'Asia/Yekaterinburg'
        },
        'Etc/GMT': {
          aliasTo: 'UTC'
        },
        'Etc/GMT+0': {
          aliasTo: 'UTC'
        },
        'Etc/UCT': {
          aliasTo: 'UTC'
        },
        'Etc/UTC': {
          aliasTo: 'UTC'
        },
        'Etc/Unversal': {
          aliasTo: 'UTC'
        },
        'Etc/Zulu': {
          aliasTo: 'UTC'
        },
        'Europe/Belfast': {
          aliasTo: 'Europe/London'
        },
        'FLE Standard Time': {
          aliasTo: 'Europe/Kiev'
        },
        'Fiji Standard Time': {
          aliasTo: 'Pacific/Fiji'
        },
        GMT: {
          aliasTo: 'UTC'
        },
        'GMT Standard Time': {
          aliasTo: 'Europe/London'
        },
        'GMT+0': {
          aliasTo: 'UTC'
        },
        GMT0: {
          aliasTo: 'UTC'
        },
        'GTB Standard Time': {
          aliasTo: 'Europe/Bucharest'
        },
        'Georgian Standard Time': {
          aliasTo: 'Asia/Tbilisi'
        },
        'Greenland Standard Time': {
          aliasTo: 'America/Godthab'
        },
        Greenwich: {
          aliasTo: 'UTC'
        },
        'Greenwich Standard Time': {
          aliasTo: 'Atlantic/Reykjavik'
        },
        'Hawaiian Standard Time': {
          aliasTo: 'Pacific/Honolulu'
        },
        'India Standard Time': {
          aliasTo: 'Asia/Calcutta'
        },
        'Iran Standard Time': {
          aliasTo: 'Asia/Tehran'
        },
        'Israel Standard Time': {
          aliasTo: 'Asia/Jerusalem'
        },
        'Jordan Standard Time': {
          aliasTo: 'Asia/Amman'
        },
        'Kaliningrad Standard Time': {
          aliasTo: 'Europe/Kaliningrad'
        },
        'Korea Standard Time': {
          aliasTo: 'Asia/Seoul'
        },
        'Libya Standard Time': {
          aliasTo: 'Africa/Tripoli'
        },
        'Line Islands Standard Time': {
          aliasTo: 'Pacific/Kiritimati'
        },
        'Magadan Standard Time': {
          aliasTo: 'Asia/Magadan'
        },
        'Mauritius Standard Time': {
          aliasTo: 'Indian/Mauritius'
        },
        'Middle East Standard Time': {
          aliasTo: 'Asia/Beirut'
        },
        'Montevideo Standard Time': {
          aliasTo: 'America/Montevideo'
        },
        'Morocco Standard Time': {
          aliasTo: 'Africa/Casablanca'
        },
        'Mountain Standard Time': {
          aliasTo: 'America/Denver'
        },
        'Mountain Standard Time (Mexico)': {
          aliasTo: 'America/Chihuahua'
        },
        'Myanmar Standard Time': {
          aliasTo: 'Asia/Rangoon'
        },
        'N. Central Asia Standard Time': {
          aliasTo: 'Asia/Novosibirsk'
        },
        'Namibia Standard Time': {
          aliasTo: 'Africa/Windhoek'
        },
        'Nepal Standard Time': {
          aliasTo: 'Asia/Katmandu'
        },
        'New Zealand Standard Time': {
          aliasTo: 'Pacific/Auckland'
        },
        'Newfoundland Standard Time': {
          aliasTo: 'America/St_Johns'
        },
        'North Asia East Standard Time': {
          aliasTo: 'Asia/Irkutsk'
        },
        'North Asia Standard Time': {
          aliasTo: 'Asia/Krasnoyarsk'
        },
        'Pacific SA Standard Time': {
          aliasTo: 'America/Santiago'
        },
        'Pacific Standard Time': {
          aliasTo: 'America/Los_Angeles'
        },
        'Pacific Standard Time (Mexico)': {
          aliasTo: 'America/Santa_Isabel'
        },
        'Pakistan Standard Time': {
          aliasTo: 'Asia/Karachi'
        },
        'Paraguay Standard Time': {
          aliasTo: 'America/Asuncion'
        },
        'Romance Standard Time': {
          aliasTo: 'Europe/Paris'
        },
        'Russia Time Zone 10': {
          aliasTo: 'Asia/Srednekolymsk'
        },
        'Russia Time Zone 11': {
          aliasTo: 'Asia/Kamchatka'
        },
        'Russia Time Zone 3': {
          aliasTo: 'Europe/Samara'
        },
        'Russian Standard Time': {
          aliasTo: 'Europe/Moscow'
        },
        'SA Eastern Standard Time': {
          aliasTo: 'America/Cayenne'
        },
        'SA Pacific Standard Time': {
          aliasTo: 'America/Bogota'
        },
        'SA Western Standard Time': {
          aliasTo: 'America/La_Paz'
        },
        'SE Asia Standard Time': {
          aliasTo: 'Asia/Bangkok'
        },
        'Samoa Standard Time': {
          aliasTo: 'Pacific/Apia'
        },
        'Singapore Standard Time': {
          aliasTo: 'Asia/Singapore'
        },
        'South Africa Standard Time': {
          aliasTo: 'Africa/Johannesburg'
        },
        'Sri Lanka Standard Time': {
          aliasTo: 'Asia/Colombo'
        },
        'Syria Standard Time': {
          aliasTo: 'Asia/Damascus'
        },
        'Taipei Standard Time': {
          aliasTo: 'Asia/Taipei'
        },
        'Tasmania Standard Time': {
          aliasTo: 'Australia/Hobart'
        },
        'Tokyo Standard Time': {
          aliasTo: 'Asia/Tokyo'
        },
        'Tonga Standard Time': {
          aliasTo: 'Pacific/Tongatapu'
        },
        'Turkey Standard Time': {
          aliasTo: 'Europe/Istanbul'
        },
        UCT: {
          aliasTo: 'UTC'
        },
        'US Eastern Standard Time': {
          aliasTo: 'America/Indiana/Indianapolis'
        },
        'US Mountain Standard Time': {
          aliasTo: 'America/Phoenix'
        },
        'US/Central': {
          aliasTo: 'America/Chicago'
        },
        'US/Eastern': {
          aliasTo: 'America/New_York'
        },
        'US/Mountain': {
          aliasTo: 'America/Denver'
        },
        'US/Pacific': {
          aliasTo: 'America/Los_Angeles'
        },
        'US/Pacific-New': {
          aliasTo: 'America/Los_Angeles'
        },
        'Ulaanbaatar Standard Time': {
          aliasTo: 'Asia/Ulaanbaatar'
        },
        Universal: {
          aliasTo: 'UTC'
        },
        'Venezuela Standard Time': {
          aliasTo: 'America/Caracas'
        },
        'Vladivostok Standard Time': {
          aliasTo: 'Asia/Vladivostok'
        },
        'W. Australia Standard Time': {
          aliasTo: 'Australia/Perth'
        },
        'W. Central Africa Standard Time': {
          aliasTo: 'Africa/Lagos'
        },
        'W. Europe Standard Time': {
          aliasTo: 'Europe/Berlin'
        },
        'West Asia Standard Time': {
          aliasTo: 'Asia/Tashkent'
        },
        'West Pacific Standard Time': {
          aliasTo: 'Pacific/Port_Moresby'
        },
        'Yakutsk Standard Time': {
          aliasTo: 'Asia/Yakutsk'
        },
        Z: {
          aliasTo: 'UTC'
        },
        Zulu: {
          aliasTo: 'UTC'
        },
        utc: {
          aliasTo: 'UTC'
        }
      },
      zones: {
        'Africa/Abidjan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Abidjan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0051900',
          longitude: '-0040200'
        },
        'Africa/Accra': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Accra\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0053300',
          longitude: '+0001300'
        },
        'Africa/Addis_Ababa': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Addis_Ababa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0090200',
          longitude: '+0384200'
        },
        'Africa/Algiers': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Algiers\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0364700',
          longitude: '+0030300'
        },
        'Africa/Asmara': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Asmara\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0152000',
          longitude: '+0385300'
        },
        'Africa/Bamako': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Bamako\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0123900',
          longitude: '-0080000'
        },
        'Africa/Bangui': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Bangui\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0042200',
          longitude: '+0183500'
        },
        'Africa/Banjul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Banjul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0132800',
          longitude: '-0163900'
        },
        'Africa/Bissau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Bissau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0115100',
          longitude: '-0153500'
        },
        'Africa/Blantyre': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Blantyre\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0154700',
          longitude: '+0350000'
        },
        'Africa/Brazzaville': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Brazzaville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0041600',
          longitude: '+0151700'
        },
        'Africa/Bujumbura': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Bujumbura\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0032300',
          longitude: '+0292200'
        },
        'Africa/Cairo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Cairo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0300300',
          longitude: '+0311500'
        },
        'Africa/Casablanca': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Casablanca\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0333900',
          longitude: '-0073500'
        },
        'Africa/Ceuta': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Ceuta\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0355300',
          longitude: '-0051900'
        },
        'Africa/Conakry': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Conakry\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0093100',
          longitude: '-0134300'
        },
        'Africa/Dakar': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Dakar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0144000',
          longitude: '-0172600'
        },
        'Africa/Dar_es_Salaam': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Dar_es_Salaam\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0064800',
          longitude: '+0391700'
        },
        'Africa/Djibouti': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Djibouti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0113600',
          longitude: '+0430900'
        },
        'Africa/Douala': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Douala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0040300',
          longitude: '+0094200'
        },
        'Africa/El_Aaiun': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/El_Aaiun\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0270900',
          longitude: '-0131200'
        },
        'Africa/Freetown': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Freetown\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0083000',
          longitude: '-0131500'
        },
        'Africa/Gaborone': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Gaborone\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0243900',
          longitude: '+0255500'
        },
        'Africa/Harare': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Harare\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0175000',
          longitude: '+0310300'
        },
        'Africa/Johannesburg': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Johannesburg\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0261500',
          longitude: '+0280000'
        },
        'Africa/Juba': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Juba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0045100',
          longitude: '+0313600'
        },
        'Africa/Kampala': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Kampala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0001900',
          longitude: '+0322500'
        },
        'Africa/Khartoum': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Khartoum\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0153600',
          longitude: '+0323200'
        },
        'Africa/Kigali': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Kigali\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0015700',
          longitude: '+0300400'
        },
        'Africa/Kinshasa': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Kinshasa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0041800',
          longitude: '+0151800'
        },
        'Africa/Lagos': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Lagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0062700',
          longitude: '+0032400'
        },
        'Africa/Libreville': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Libreville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0002300',
          longitude: '+0092700'
        },
        'Africa/Lome': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Lome\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0060800',
          longitude: '+0011300'
        },
        'Africa/Luanda': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Luanda\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0084800',
          longitude: '+0131400'
        },
        'Africa/Lubumbashi': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Lubumbashi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0114000',
          longitude: '+0272800'
        },
        'Africa/Lusaka': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Lusaka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0152500',
          longitude: '+0281700'
        },
        'Africa/Malabo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Malabo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0034500',
          longitude: '+0084700'
        },
        'Africa/Maputo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Maputo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:CAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0255800',
          longitude: '+0323500'
        },
        'Africa/Maseru': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Maseru\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0292800',
          longitude: '+0273000'
        },
        'Africa/Mbabane': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Mbabane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:SAST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0261800',
          longitude: '+0310600'
        },
        'Africa/Mogadishu': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Mogadishu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0020400',
          longitude: '+0452200'
        },
        'Africa/Monrovia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Monrovia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0061800',
          longitude: '-0104700'
        },
        'Africa/Nairobi': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Nairobi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0011700',
          longitude: '+0364900'
        },
        'Africa/Ndjamena': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Ndjamena\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0120700',
          longitude: '+0150300'
        },
        'Africa/Niamey': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Niamey\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0133100',
          longitude: '+0020700'
        },
        'Africa/Nouakchott': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Nouakchott\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0180600',
          longitude: '-0155700'
        },
        'Africa/Ouagadougou': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Ouagadougou\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0122200',
          longitude: '-0013100'
        },
        'Africa/Porto-Novo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Porto-Novo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0062900',
          longitude: '+0023700'
        },
        'Africa/Sao_Tome': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Sao_Tome\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0002000',
          longitude: '+0064400'
        },
        'Africa/Tripoli': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Tripoli\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0325400',
          longitude: '+0131100'
        },
        'Africa/Tunis': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Tunis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0364800',
          longitude: '+0101100'
        },
        'Africa/Windhoek': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Africa/Windhoek\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:WAST\r\nDTSTART:19700906T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:WAT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0223400',
          longitude: '+0170600'
        },
        'America/Adak': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Adak\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-0900\r\nTZNAME:HDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0515248',
          longitude: '-1763929'
        },
        'America/Anchorage': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Anchorage\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0611305',
          longitude: '-1495401'
        },
        'America/Anguilla': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Anguilla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0181200',
          longitude: '-0630400'
        },
        'America/Antigua': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Antigua\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0170300',
          longitude: '-0614800'
        },
        'America/Araguaina': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Araguaina\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0071200',
          longitude: '-0481200'
        },
        'America/Argentina/Buenos_Aires': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Buenos_Aires\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0343600',
          longitude: '-0582700'
        },
        'America/Argentina/Catamarca': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Catamarca\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0282800',
          longitude: '-0654700'
        },
        'America/Argentina/Cordoba': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Cordoba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0312400',
          longitude: '-0641100'
        },
        'America/Argentina/Jujuy': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Jujuy\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0241100',
          longitude: '-0651800'
        },
        'America/Argentina/La_Rioja': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/La_Rioja\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0292600',
          longitude: '-0665100'
        },
        'America/Argentina/Mendoza': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Mendoza\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0325300',
          longitude: '-0684900'
        },
        'America/Argentina/Rio_Gallegos': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Rio_Gallegos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0513800',
          longitude: '-0691300'
        },
        'America/Argentina/Salta': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Salta\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0244700',
          longitude: '-0652500'
        },
        'America/Argentina/San_Juan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/San_Juan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0313200',
          longitude: '-0683100'
        },
        'America/Argentina/San_Luis': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/San_Luis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0331900',
          longitude: '-0662100'
        },
        'America/Argentina/Tucuman': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Tucuman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0264900',
          longitude: '-0651300'
        },
        'America/Argentina/Ushuaia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Argentina/Ushuaia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0544800',
          longitude: '-0681800'
        },
        'America/Aruba': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Aruba\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0123000',
          longitude: '-0695800'
        },
        'America/Asuncion': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Asuncion\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:PYST\r\nDTSTART:19701004T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:PYT\r\nDTSTART:19700322T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=4SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0251600',
          longitude: '-0574000'
        },
        'America/Atikokan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Atikokan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0484531',
          longitude: '-0913718'
        },
        'America/Bahia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Bahia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0125900',
          longitude: '-0383100'
        },
        'America/Bahia_Banderas': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Bahia_Banderas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0204800',
          longitude: '-1051500'
        },
        'America/Barbados': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Barbados\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0130600',
          longitude: '-0593700'
        },
        'America/Belem': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Belem\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0012700',
          longitude: '-0482900'
        },
        'America/Belize': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Belize\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0173000',
          longitude: '-0881200'
        },
        'America/Blanc-Sablon': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Blanc-Sablon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0512500',
          longitude: '-0570700'
        },
        'America/Boa_Vista': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Boa_Vista\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0024900',
          longitude: '-0604000'
        },
        'America/Bogota': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Bogota\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:COT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0043600',
          longitude: '-0740500'
        },
        'America/Boise': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Boise\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0433649',
          longitude: '-1161209'
        },
        'America/Cambridge_Bay': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Cambridge_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0690650',
          longitude: '-1050310'
        },
        'America/Campo_Grande': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Campo_Grande\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:AMST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0202700',
          longitude: '-0543700'
        },
        'America/Cancun': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Cancun\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0210500',
          longitude: '-0864600'
        },
        'America/Caracas': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Caracas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0430\r\nTZOFFSETTO:-0430\r\nTZNAME:VET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0103000',
          longitude: '-0665600'
        },
        'America/Cayenne': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Cayenne\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:GFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0045600',
          longitude: '-0522000'
        },
        'America/Cayman': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Cayman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0191800',
          longitude: '-0812300'
        },
        'America/Chicago': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Chicago\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0415100',
          longitude: '-0873900'
        },
        'America/Chihuahua': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Chihuahua\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0283800',
          longitude: '-1060500'
        },
        'America/Costa_Rica': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Costa_Rica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0095600',
          longitude: '-0840500'
        },
        'America/Creston': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Creston\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0490600',
          longitude: '-1163100'
        },
        'America/Cuiaba': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Cuiaba\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:AMST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0153500',
          longitude: '-0560500'
        },
        'America/Curacao': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Curacao\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0121100',
          longitude: '-0690000'
        },
        'America/Danmarkshavn': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Danmarkshavn\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0764600',
          longitude: '-0184000'
        },
        'America/Dawson': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Dawson\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0640400',
          longitude: '-1392500'
        },
        'America/Dawson_Creek': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Dawson_Creek\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0594600',
          longitude: '-1201400'
        },
        'America/Denver': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Denver\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0394421',
          longitude: '-1045903'
        },
        'America/Detroit': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Detroit\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0421953',
          longitude: '-0830245'
        },
        'America/Dominica': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Dominica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0151800',
          longitude: '-0612400'
        },
        'America/Edmonton': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Edmonton\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0533300',
          longitude: '-1132800'
        },
        'America/Eirunepe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Eirunepe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ACT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0064000',
          longitude: '-0695200'
        },
        'America/El_Salvador': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/El_Salvador\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0134200',
          longitude: '-0891200'
        },
        'America/Fort_Nelson': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Fort_Nelson\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0584800',
          longitude: '-1224200'
        },
        'America/Fortaleza': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Fortaleza\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0034300',
          longitude: '-0383000'
        },
        'America/Glace_Bay': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Glace_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0461200',
          longitude: '-0595700'
        },
        'America/Godthab': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Godthab\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:WGST\r\nDTSTART:19700328T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=24,25,26,27,28,29,30;BYDAY=SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0300\r\nTZNAME:WGT\r\nDTSTART:19701024T230000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYMONTHDAY=24,25,26,27,28,29,30;BYDAY=SA\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0641100',
          longitude: '-0514400'
        },
        'America/Goose_Bay': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Goose_Bay\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0532000',
          longitude: '-0602500'
        },
        'America/Grand_Turk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Grand_Turk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0212800',
          longitude: '-0710800'
        },
        'America/Grenada': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Grenada\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0120300',
          longitude: '-0614500'
        },
        'America/Guadeloupe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Guadeloupe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0161400',
          longitude: '-0613200'
        },
        'America/Guatemala': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Guatemala\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0143800',
          longitude: '-0903100'
        },
        'America/Guayaquil': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Guayaquil\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ECT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0021000',
          longitude: '-0795000'
        },
        'America/Guyana': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Guyana\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:GYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0064800',
          longitude: '-0581000'
        },
        'America/Halifax': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Halifax\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0443900',
          longitude: '-0633600'
        },
        'America/Havana': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Havana\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:CST\r\nDTSTART:19701101T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:CDT\r\nDTSTART:19700308T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0230800',
          longitude: '-0822200'
        },
        'America/Hermosillo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Hermosillo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0290400',
          longitude: '-1105800'
        },
        'America/Indiana/Indianapolis': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Indianapolis\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0394606',
          longitude: '-0860929'
        },
        'America/Indiana/Knox': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Knox\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0411745',
          longitude: '-0863730'
        },
        'America/Indiana/Marengo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Marengo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0382232',
          longitude: '-0862041'
        },
        'America/Indiana/Petersburg': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Petersburg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0382931',
          longitude: '-0871643'
        },
        'America/Indiana/Tell_City': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Tell_City\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0375711',
          longitude: '-0864541'
        },
        'America/Indiana/Vevay': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Vevay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0384452',
          longitude: '-0850402'
        },
        'America/Indiana/Vincennes': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Vincennes\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0384038',
          longitude: '-0873143'
        },
        'America/Indiana/Winamac': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Indiana/Winamac\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0410305',
          longitude: '-0863611'
        },
        'America/Inuvik': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Inuvik\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0682059',
          longitude: '-1334300'
        },
        'America/Iqaluit': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Iqaluit\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0634400',
          longitude: '-0682800'
        },
        'America/Jamaica': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Jamaica\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0175805',
          longitude: '-0764736'
        },
        'America/Juneau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Juneau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0581807',
          longitude: '-1342511'
        },
        'America/Kentucky/Louisville': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Kentucky/Louisville\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0381515',
          longitude: '-0854534'
        },
        'America/Kentucky/Monticello': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Kentucky/Monticello\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0364947',
          longitude: '-0845057'
        },
        'America/Kralendijk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Kralendijk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0120903',
          longitude: '-0681636'
        },
        'America/La_Paz': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/La_Paz\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:BOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0163000',
          longitude: '-0680900'
        },
        'America/Lima': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Lima\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:PET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0120300',
          longitude: '-0770300'
        },
        'America/Los_Angeles': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Los_Angeles\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0340308',
          longitude: '-1181434'
        },
        'America/Lower_Princes': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Lower_Princes\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0180305',
          longitude: '-0630250'
        },
        'America/Maceio': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Maceio\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0094000',
          longitude: '-0354300'
        },
        'America/Managua': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Managua\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0120900',
          longitude: '-0861700'
        },
        'America/Manaus': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Manaus\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0030800',
          longitude: '-0600100'
        },
        'America/Marigot': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Marigot\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0180400',
          longitude: '-0630500'
        },
        'America/Martinique': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Martinique\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0143600',
          longitude: '-0610500'
        },
        'America/Matamoros': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Matamoros\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0255000',
          longitude: '-0973000'
        },
        'America/Mazatlan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Mazatlan\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0231300',
          longitude: '-1062500'
        },
        'America/Menominee': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Menominee\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0450628',
          longitude: '-0873651'
        },
        'America/Merida': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Merida\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0205800',
          longitude: '-0893700'
        },
        'America/Metlakatla': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Metlakatla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0550737',
          longitude: '-1313435'
        },
        'America/Mexico_City': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Mexico_City\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0192400',
          longitude: '-0990900'
        },
        'America/Miquelon': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Miquelon\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:PMDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0300\r\nTZNAME:PMST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0470300',
          longitude: '-0562000'
        },
        'America/Moncton': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Moncton\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0460600',
          longitude: '-0644700'
        },
        'America/Monterrey': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Monterrey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0254000',
          longitude: '-1001900'
        },
        'America/Montevideo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Montevideo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:UYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0345300',
          longitude: '-0561100'
        },
        'America/Montserrat': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Montserrat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0164300',
          longitude: '-0621300'
        },
        'America/Nassau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Nassau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0250500',
          longitude: '-0772100'
        },
        'America/New_York': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/New_York\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0404251',
          longitude: '-0740023'
        },
        'America/Nipigon': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Nipigon\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0490100',
          longitude: '-0881600'
        },
        'America/Nome': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Nome\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0643004',
          longitude: '-1652423'
        },
        'America/Noronha': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Noronha\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0200\r\nTZNAME:FNT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0035100',
          longitude: '-0322500'
        },
        'America/North_Dakota/Beulah': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/Beulah\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0471551',
          longitude: '-1014640'
        },
        'America/North_Dakota/Center': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/Center\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0470659',
          longitude: '-1011757'
        },
        'America/North_Dakota/New_Salem': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/North_Dakota/New_Salem\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0465042',
          longitude: '-1012439'
        },
        'America/Ojinaga': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Ojinaga\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0293400',
          longitude: '-1042500'
        },
        'America/Panama': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Panama\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0085800',
          longitude: '-0793200'
        },
        'America/Pangnirtung': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Pangnirtung\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0660800',
          longitude: '-0654400'
        },
        'America/Paramaribo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Paramaribo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:SRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0055000',
          longitude: '-0551000'
        },
        'America/Phoenix': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Phoenix\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0332654',
          longitude: '-1120424'
        },
        'America/Port-au-Prince': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Port-au-Prince\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0183200',
          longitude: '-0722000'
        },
        'America/Port_of_Spain': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Port_of_Spain\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0103900',
          longitude: '-0613100'
        },
        'America/Porto_Velho': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Porto_Velho\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0084600',
          longitude: '-0635400'
        },
        'America/Puerto_Rico': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Puerto_Rico\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0182806',
          longitude: '-0660622'
        },
        'America/Rainy_River': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Rainy_River\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0484300',
          longitude: '-0943400'
        },
        'America/Rankin_Inlet': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Rankin_Inlet\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0624900',
          longitude: '-0920459'
        },
        'America/Recife': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Recife\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0080300',
          longitude: '-0345400'
        },
        'America/Regina': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Regina\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0502400',
          longitude: '-1043900'
        },
        'America/Resolute': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Resolute\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0744144',
          longitude: '-0944945'
        },
        'America/Rio_Branco': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Rio_Branco\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0500\r\nTZNAME:ACT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0095800',
          longitude: '-0674800'
        },
        'America/Santarem': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Santarem\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0022600',
          longitude: '-0545200'
        },
        'America/Santiago': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Santiago\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:CLT\r\nDTSTART:19700510T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:CLST\r\nDTSTART:19700809T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0332700',
          longitude: '-0704000'
        },
        'America/Santo_Domingo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Santo_Domingo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0182800',
          longitude: '-0695400'
        },
        'America/Sao_Paulo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Sao_Paulo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0200\r\nTZNAME:BRST\r\nDTSTART:19701018T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=3SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:BRT\r\nDTSTART:19700215T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=2;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0233200',
          longitude: '-0463700'
        },
        'America/Scoresbysund': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Scoresbysund\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:+0000\r\nTZNAME:EGST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:-0100\r\nTZNAME:EGT\r\nDTSTART:19701025T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0702900',
          longitude: '-0215800'
        },
        'America/Sitka': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Sitka\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0571035',
          longitude: '-1351807'
        },
        'America/St_Barthelemy': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Barthelemy\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0175300',
          longitude: '-0625100'
        },
        'America/St_Johns': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Johns\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0230\r\nTZOFFSETTO:-0330\r\nTZNAME:NST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0330\r\nTZOFFSETTO:-0230\r\nTZNAME:NDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0473400',
          longitude: '-0524300'
        },
        'America/St_Kitts': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Kitts\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0171800',
          longitude: '-0624300'
        },
        'America/St_Lucia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Lucia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0140100',
          longitude: '-0610000'
        },
        'America/St_Thomas': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Thomas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0182100',
          longitude: '-0645600'
        },
        'America/St_Vincent': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/St_Vincent\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0130900',
          longitude: '-0611400'
        },
        'America/Swift_Current': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Swift_Current\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0501700',
          longitude: '-1075000'
        },
        'America/Tegucigalpa': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Tegucigalpa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0140600',
          longitude: '-0871300'
        },
        'America/Thule': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Thule\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0763400',
          longitude: '-0684700'
        },
        'America/Thunder_Bay': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Thunder_Bay\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0482300',
          longitude: '-0891500'
        },
        'America/Tijuana': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Tijuana\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0323200',
          longitude: '-1170100'
        },
        'America/Toronto': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Toronto\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0400\r\nTZNAME:EDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0500\r\nTZNAME:EST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0433900',
          longitude: '-0792300'
        },
        'America/Tortola': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Tortola\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0182700',
          longitude: '-0643700'
        },
        'America/Vancouver': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Vancouver\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0491600',
          longitude: '-1230700'
        },
        'America/Whitehorse': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Whitehorse\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0700\r\nTZNAME:PDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0604300',
          longitude: '-1350300'
        },
        'America/Winnipeg': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Winnipeg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0495300',
          longitude: '-0970900'
        },
        'America/Yakutat': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Yakutat\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0800\r\nTZNAME:AKDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0900\r\nTZNAME:AKST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0593249',
          longitude: '-1394338'
        },
        'America/Yellowknife': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:America/Yellowknife\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0700\r\nTZOFFSETTO:-0600\r\nTZNAME:MDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0700\r\nTZNAME:MST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0622700',
          longitude: '-1142100'
        },
        'Antarctica/Casey': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Casey\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:AWST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0661700',
          longitude: '+1103100'
        },
        'Antarctica/Davis': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Davis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:DAVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0683500',
          longitude: '+0775800'
        },
        'Antarctica/DumontDUrville': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/DumontDUrville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:DDUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0664000',
          longitude: '+1400100'
        },
        'Antarctica/Macquarie': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Macquarie\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:MIST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0543000',
          longitude: '+1585700'
        },
        'Antarctica/Mawson': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Mawson\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:MAWT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0673600',
          longitude: '+0625300'
        },
        'Antarctica/McMurdo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/McMurdo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:NZDT\r\nDTSTART:19700927T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:NZST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0775000',
          longitude: '+1663600'
        },
        'Antarctica/Palmer': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Palmer\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:CLT\r\nDTSTART:19700510T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:CLST\r\nDTSTART:19700809T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0644800',
          longitude: '-0640600'
        },
        'Antarctica/Rothera': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Rothera\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:ROTT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0673400',
          longitude: '-0680800'
        },
        'Antarctica/Syowa': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Syowa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:SYOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0690022',
          longitude: '+0393524'
        },
        'Antarctica/Troll': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Troll\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0000\r\nTZNAME:UTC\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0720041',
          longitude: '+0023206'
        },
        'Antarctica/Vostok': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Antarctica/Vostok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:VOST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0782400',
          longitude: '+1065400'
        },
        'Arctic/Longyearbyen': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Arctic/Longyearbyen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0780000',
          longitude: '+0160000'
        },
        'Asia/Aden': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Aden\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0124500',
          longitude: '+0451200'
        },
        'Asia/Almaty': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Almaty\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:ALMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0431500',
          longitude: '+0765700'
        },
        'Asia/Amman': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Amman\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700326T235959\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1TH\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701030T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0315700',
          longitude: '+0355600'
        },
        'Asia/Anadyr': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Anadyr\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:ANAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0644500',
          longitude: '+1772900'
        },
        'Asia/Aqtau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Aqtau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:AQTT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0443100',
          longitude: '+0501600'
        },
        'Asia/Aqtobe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Aqtobe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:AQTT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0501700',
          longitude: '+0571000'
        },
        'Asia/Ashgabat': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Ashgabat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:TMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0375700',
          longitude: '+0582300'
        },
        'Asia/Baghdad': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Baghdad\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0332100',
          longitude: '+0442500'
        },
        'Asia/Bahrain': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Bahrain\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0262300',
          longitude: '+0503500'
        },
        'Asia/Baku': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Baku\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:AZT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0402300',
          longitude: '+0495100'
        },
        'Asia/Bangkok': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Bangkok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0134500',
          longitude: '+1003100'
        },
        'Asia/Barnaul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Barnaul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:+07\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0532200',
          longitude: '+0834500'
        },
        'Asia/Beirut': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Beirut\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0335300',
          longitude: '+0353000'
        },
        'Asia/Bishkek': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Bishkek\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:KGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0425400',
          longitude: '+0743600'
        },
        'Asia/Brunei': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Brunei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:BNT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0045600',
          longitude: '+1145500'
        },
        'Asia/Chita': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Chita\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:YAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0520300',
          longitude: '+1132800'
        },
        'Asia/Choibalsan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Choibalsan\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0900\r\nTZNAME:CHOST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0800\r\nTZNAME:CHOT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0480400',
          longitude: '+1143000'
        },
        'Asia/Colombo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Colombo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0530\r\nTZOFFSETTO:+0530\r\nTZNAME:IST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0065600',
          longitude: '+0795100'
        },
        'Asia/Damascus': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Damascus\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701030T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700327T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1FR\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0333000',
          longitude: '+0361800'
        },
        'Asia/Dhaka': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Dhaka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:BDT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0234300',
          longitude: '+0902500'
        },
        'Asia/Dili': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Dili\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:TLT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0083300',
          longitude: '+1253500'
        },
        'Asia/Dubai': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Dubai\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0251800',
          longitude: '+0551800'
        },
        'Asia/Dushanbe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Dushanbe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:TJT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0383500',
          longitude: '+0684800'
        },
        'Asia/Gaza': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Gaza\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701023T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYMONTHDAY=21,22,23,24,25,26,27;BYDAY=FR\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700328T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0313000',
          longitude: '+0342800'
        },
        'Asia/Hebron': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Hebron\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701023T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYMONTHDAY=21,22,23,24,25,26,27;BYDAY=FR\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700328T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0313200',
          longitude: '+0350542'
        },
        'Asia/Ho_Chi_Minh': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Ho_Chi_Minh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0104500',
          longitude: '+1064000'
        },
        'Asia/Hong_Kong': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Hong_Kong\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:HKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0221700',
          longitude: '+1140900'
        },
        'Asia/Hovd': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Hovd\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0800\r\nTZNAME:HOVST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0700\r\nTZNAME:HOVT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0480100',
          longitude: '+0913900'
        },
        'Asia/Irkutsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Irkutsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:IRKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0521600',
          longitude: '+1042000'
        },
        'Asia/Istanbul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Istanbul\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0410100',
          longitude: '+0285800'
        },
        'Asia/Jakarta': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Jakarta\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:WIB\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0061000',
          longitude: '+1064800'
        },
        'Asia/Jayapura': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Jayapura\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:WIT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0023200',
          longitude: '+1404200'
        },
        'Asia/Jerusalem': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Jerusalem\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:IDT\r\nDTSTART:19700327T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=23,24,25,26,27,28,29;BYDAY=FR\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:IST\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0314650',
          longitude: '+0351326'
        },
        'Asia/Kabul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kabul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0430\r\nTZOFFSETTO:+0430\r\nTZNAME:AFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0343100',
          longitude: '+0691200'
        },
        'Asia/Kamchatka': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kamchatka\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:PETT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0530100',
          longitude: '+1583900'
        },
        'Asia/Karachi': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Karachi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:PKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0245200',
          longitude: '+0670300'
        },
        'Asia/Kathmandu': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kathmandu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0545\r\nTZOFFSETTO:+0545\r\nTZNAME:NPT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0274300',
          longitude: '+0851900'
        },
        'Asia/Khandyga': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Khandyga\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:YAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0623923',
          longitude: '+1353314'
        },
        'Asia/Kolkata': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kolkata\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0530\r\nTZOFFSETTO:+0530\r\nTZNAME:IST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0223200',
          longitude: '+0882200'
        },
        'Asia/Krasnoyarsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Krasnoyarsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:KRAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0560100',
          longitude: '+0925000'
        },
        'Asia/Kuala_Lumpur': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kuala_Lumpur\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:MYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0031000',
          longitude: '+1014200'
        },
        'Asia/Kuching': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kuching\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:MYT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0013300',
          longitude: '+1102000'
        },
        'Asia/Kuwait': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Kuwait\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0292000',
          longitude: '+0475900'
        },
        'Asia/Macau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Macau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0221400',
          longitude: '+1133500'
        },
        'Asia/Magadan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Magadan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:MAGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0593400',
          longitude: '+1504800'
        },
        'Asia/Makassar': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Makassar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:WITA\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0050700',
          longitude: '+1192400'
        },
        'Asia/Manila': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Manila\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:PHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0143500',
          longitude: '+1210000'
        },
        'Asia/Muscat': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Muscat\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0233600',
          longitude: '+0583500'
        },
        'Asia/Nicosia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Nicosia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0351000',
          longitude: '+0332200'
        },
        'Asia/Novokuznetsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Novokuznetsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:KRAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0534500',
          longitude: '+0870700'
        },
        'Asia/Novosibirsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Novosibirsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:NOVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0550200',
          longitude: '+0825500'
        },
        'Asia/Omsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Omsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:OMST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0550000',
          longitude: '+0732400'
        },
        'Asia/Oral': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Oral\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:ORAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0511300',
          longitude: '+0512100'
        },
        'Asia/Phnom_Penh': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Phnom_Penh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0113300',
          longitude: '+1045500'
        },
        'Asia/Pontianak': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Pontianak\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:WIB\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0000200',
          longitude: '+1092000'
        },
        'Asia/Pyongyang': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Pyongyang\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0830\r\nTZOFFSETTO:+0830\r\nTZNAME:KST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0390100',
          longitude: '+1254500'
        },
        'Asia/Qatar': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Qatar\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0251700',
          longitude: '+0513200'
        },
        'Asia/Qyzylorda': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Qyzylorda\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:QYZT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0444800',
          longitude: '+0652800'
        },
        'Asia/Rangoon': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Rangoon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0630\r\nTZOFFSETTO:+0630\r\nTZNAME:MMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0164700',
          longitude: '+0961000'
        },
        'Asia/Riyadh': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Riyadh\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:AST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0243800',
          longitude: '+0464300'
        },
        'Asia/Sakhalin': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Sakhalin\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:SAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0465800',
          longitude: '+1424200'
        },
        'Asia/Samarkand': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Samarkand\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:UZT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0394000',
          longitude: '+0664800'
        },
        'Asia/Seoul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Seoul\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:KST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0373300',
          longitude: '+1265800'
        },
        'Asia/Shanghai': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Shanghai\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0311400',
          longitude: '+1212800'
        },
        'Asia/Singapore': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Singapore\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:SGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0011700',
          longitude: '+1035100'
        },
        'Asia/Srednekolymsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Srednekolymsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:SRET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0672800',
          longitude: '+1534300'
        },
        'Asia/Taipei': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Taipei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:CST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0250300',
          longitude: '+1213000'
        },
        'Asia/Tashkent': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Tashkent\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:UZT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0412000',
          longitude: '+0691800'
        },
        'Asia/Tbilisi': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Tbilisi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:GET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0414300',
          longitude: '+0444900'
        },
        'Asia/Tehran': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Tehran\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0330\r\nTZOFFSETTO:+0430\r\nTZNAME:IRDT\r\nDTSTART:19700321T000000\r\nRRULE:FREQ=YEARLY\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0430\r\nTZOFFSETTO:+0330\r\nTZNAME:IRST\r\nDTSTART:19700921T000000\r\nRRULE:FREQ=YEARLY\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0354000',
          longitude: '+0512600'
        },
        'Asia/Thimphu': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Thimphu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:BTT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0272800',
          longitude: '+0893900'
        },
        'Asia/Tokyo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Tokyo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:JST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0353916',
          longitude: '+1394441'
        },
        'Asia/Ulaanbaatar': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Ulaanbaatar\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0900\r\nTZNAME:ULAST\r\nDTSTART:19700328T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0800\r\nTZNAME:ULAT\r\nDTSTART:19700926T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SA\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0475500',
          longitude: '+1065300'
        },
        'Asia/Urumqi': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Urumqi\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:XJT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0434800',
          longitude: '+0873500'
        },
        'Asia/Ust-Nera': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Ust-Nera\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:VLAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0643337',
          longitude: '+1431336'
        },
        'Asia/Vientiane': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Vientiane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:ICT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0175800',
          longitude: '+1023600'
        },
        'Asia/Vladivostok': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Vladivostok\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:VLAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0431000',
          longitude: '+1315600'
        },
        'Asia/Yakutsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Yakutsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:YAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0620000',
          longitude: '+1294000'
        },
        'Asia/Yekaterinburg': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Yekaterinburg\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:YEKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0565100',
          longitude: '+0603600'
        },
        'Asia/Yerevan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Asia/Yerevan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:AMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0401100',
          longitude: '+0443000'
        },
        'Atlantic/Azores': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Azores\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:+0000\r\nTZNAME:AZOST\r\nDTSTART:19700329T000000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:-0100\r\nTZNAME:AZOT\r\nDTSTART:19701025T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0374400',
          longitude: '-0254000'
        },
        'Atlantic/Bermuda': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Bermuda\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0400\r\nTZOFFSETTO:-0300\r\nTZNAME:ADT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0400\r\nTZNAME:AST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0321700',
          longitude: '-0644600'
        },
        'Atlantic/Canary': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Canary\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0280600',
          longitude: '-0152400'
        },
        'Atlantic/Cape_Verde': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Cape_Verde\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0100\r\nTZOFFSETTO:-0100\r\nTZNAME:CVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0145500',
          longitude: '-0233100'
        },
        'Atlantic/Faroe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Faroe\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0620100',
          longitude: '-0064600'
        },
        'Atlantic/Madeira': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Madeira\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0323800',
          longitude: '-0165400'
        },
        'Atlantic/Reykjavik': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Reykjavik\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0640900',
          longitude: '-0215100'
        },
        'Atlantic/South_Georgia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/South_Georgia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0200\r\nTZOFFSETTO:-0200\r\nTZNAME:GST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0541600',
          longitude: '-0363200'
        },
        'Atlantic/St_Helena': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/St_Helena\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0155500',
          longitude: '-0054200'
        },
        'Atlantic/Stanley': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Atlantic/Stanley\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nTZNAME:FKST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0514200',
          longitude: '-0575100'
        },
        'Australia/Adelaide': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Adelaide\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+1030\r\nTZNAME:ACDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0345500',
          longitude: '+1383500'
        },
        'Australia/Brisbane': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Brisbane\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0272800',
          longitude: '+1530200'
        },
        'Australia/Broken_Hill': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Broken_Hill\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+1030\r\nTZNAME:ACDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0315700',
          longitude: '+1412700'
        },
        'Australia/Currie': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Currie\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0395600',
          longitude: '+1435200'
        },
        'Australia/Darwin': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Darwin\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0930\r\nTZOFFSETTO:+0930\r\nTZNAME:ACST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0122800',
          longitude: '+1305000'
        },
        'Australia/Eucla': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Eucla\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0845\r\nTZOFFSETTO:+0845\r\nTZNAME:ACWST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0314300',
          longitude: '+1285200'
        },
        'Australia/Hobart': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Hobart\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0425300',
          longitude: '+1471900'
        },
        'Australia/Lindeman': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Lindeman\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0201600',
          longitude: '+1490000'
        },
        'Australia/Lord_Howe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Lord_Howe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1030\r\nTZNAME:LHST\r\nDTSTART:19700405T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1030\r\nTZOFFSETTO:+1100\r\nTZNAME:LHDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0313300',
          longitude: '+1590500'
        },
        'Australia/Melbourne': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Melbourne\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0374900',
          longitude: '+1445800'
        },
        'Australia/Perth': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Perth\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nTZNAME:AWST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0315700',
          longitude: '+1155100'
        },
        'Australia/Sydney': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Australia/Sydney\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1000\r\nTZNAME:AEST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1100\r\nTZNAME:AEDT\r\nDTSTART:19701004T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0335200',
          longitude: '+1511300'
        },
        'Europe/Amsterdam': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Amsterdam\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0522200',
          longitude: '+0045400'
        },
        'Europe/Andorra': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Andorra\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0423000',
          longitude: '+0013100'
        },
        'Europe/Astrakhan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Astrakhan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0462100',
          longitude: '+0480300'
        },
        'Europe/Athens': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Athens\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0375800',
          longitude: '+0234300'
        },
        'Europe/Belgrade': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Belgrade\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0445000',
          longitude: '+0203000'
        },
        'Europe/Berlin': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Berlin\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0523000',
          longitude: '+0132200'
        },
        'Europe/Bratislava': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Bratislava\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0480900',
          longitude: '+0170700'
        },
        'Europe/Brussels': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Brussels\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0505000',
          longitude: '+0042000'
        },
        'Europe/Bucharest': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Bucharest\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0442600',
          longitude: '+0260600'
        },
        'Europe/Budapest': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Budapest\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0473000',
          longitude: '+0190500'
        },
        'Europe/Busingen': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Busingen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0474200',
          longitude: '+0084100'
        },
        'Europe/Chisinau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Chisinau\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0470000',
          longitude: '+0285000'
        },
        'Europe/Copenhagen': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Copenhagen\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0554000',
          longitude: '+0123500'
        },
        'Europe/Dublin': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Dublin\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:IST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0532000',
          longitude: '-0061500'
        },
        'Europe/Gibraltar': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Gibraltar\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0360800',
          longitude: '-0052100'
        },
        'Europe/Guernsey': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Guernsey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0492700',
          longitude: '-0023200'
        },
        'Europe/Helsinki': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Helsinki\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0601000',
          longitude: '+0245800'
        },
        'Europe/Isle_of_Man': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Isle_of_Man\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0540900',
          longitude: '-0042800'
        },
        'Europe/Istanbul': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Istanbul\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0410100',
          longitude: '+0285800'
        },
        'Europe/Jersey': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Jersey\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0491200',
          longitude: '-0020700'
        },
        'Europe/Kaliningrad': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Kaliningrad\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0544300',
          longitude: '+0203000'
        },
        'Europe/Kiev': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Kiev\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0502600',
          longitude: '+0303100'
        },
        'Europe/Lisbon': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Lisbon\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:WET\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:WEST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0384300',
          longitude: '-0090800'
        },
        'Europe/Ljubljana': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Ljubljana\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0460300',
          longitude: '+0143100'
        },
        'Europe/London': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/London\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0000\r\nTZOFFSETTO:+0100\r\nTZNAME:BST\r\nDTSTART:19700329T010000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0000\r\nTZNAME:GMT\r\nDTSTART:19701025T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0513030',
          longitude: '+0000731'
        },
        'Europe/Luxembourg': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Luxembourg\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0493600',
          longitude: '+0060900'
        },
        'Europe/Madrid': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Madrid\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0402400',
          longitude: '-0034100'
        },
        'Europe/Malta': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Malta\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0355400',
          longitude: '+0143100'
        },
        'Europe/Mariehamn': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Mariehamn\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0600600',
          longitude: '+0195700'
        },
        'Europe/Minsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Minsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0535400',
          longitude: '+0273400'
        },
        'Europe/Monaco': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Monaco\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0434200',
          longitude: '+0072300'
        },
        'Europe/Moscow': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Moscow\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0554521',
          longitude: '+0373704'
        },
        'Europe/Nicosia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Nicosia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '+0351000',
          longitude: '+0332200'
        },
        'Europe/Oslo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Oslo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0595500',
          longitude: '+0104500'
        },
        'Europe/Paris': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Paris\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0485200',
          longitude: '+0022000'
        },
        'Europe/Podgorica': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Podgorica\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0422600',
          longitude: '+0191600'
        },
        'Europe/Prague': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Prague\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0500500',
          longitude: '+0142600'
        },
        'Europe/Riga': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Riga\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0565700',
          longitude: '+0240600'
        },
        'Europe/Rome': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Rome\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0415400',
          longitude: '+0122900'
        },
        'Europe/Samara': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Samara\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:SAMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0531200',
          longitude: '+0500900'
        },
        'Europe/San_Marino': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/San_Marino\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0435500',
          longitude: '+0122800'
        },
        'Europe/Sarajevo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Sarajevo\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0435200',
          longitude: '+0182500'
        },
        'Europe/Simferopol': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Simferopol\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0445700',
          longitude: '+0340600'
        },
        'Europe/Skopje': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Skopje\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0415900',
          longitude: '+0212600'
        },
        'Europe/Sofia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Sofia\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0424100',
          longitude: '+0231900'
        },
        'Europe/Stockholm': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Stockholm\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0592000',
          longitude: '+0180300'
        },
        'Europe/Tallinn': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Tallinn\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0592500',
          longitude: '+0244500'
        },
        'Europe/Tirane': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Tirane\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0412000',
          longitude: '+0195000'
        },
        'Europe/Ulyanovsk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Ulyanovsk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:+04\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0542000',
          longitude: '+0482400'
        },
        'Europe/Uzhgorod': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Uzhgorod\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0483700',
          longitude: '+0221800'
        },
        'Europe/Vaduz': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Vaduz\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0470900',
          longitude: '+0093100'
        },
        'Europe/Vatican': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Vatican\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0415408',
          longitude: '+0122711'
        },
        'Europe/Vienna': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Vienna\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0481300',
          longitude: '+0162000'
        },
        'Europe/Vilnius': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Vilnius\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0544100',
          longitude: '+0251900'
        },
        'Europe/Volgograd': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Volgograd\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:MSK\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0484400',
          longitude: '+0442500'
        },
        'Europe/Warsaw': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Warsaw\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0521500',
          longitude: '+0210000'
        },
        'Europe/Zagreb': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Zagreb\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0454800',
          longitude: '+0155800'
        },
        'Europe/Zaporozhye': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Zaporozhye\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0300\r\nTZNAME:EEST\r\nDTSTART:19700329T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0200\r\nTZNAME:EET\r\nDTSTART:19701025T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0475000',
          longitude: '+0351000'
        },
        'Europe/Zurich': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Europe/Zurich\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+0100\r\nTZOFFSETTO:+0200\r\nTZNAME:CEST\r\nDTSTART:19700329T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nTZNAME:CET\r\nDTSTART:19701025T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0472300',
          longitude: '+0083200'
        },
        'Indian/Antananarivo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Antananarivo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0185500',
          longitude: '+0473100'
        },
        'Indian/Chagos': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Chagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0600\r\nTZOFFSETTO:+0600\r\nTZNAME:IOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0072000',
          longitude: '+0722500'
        },
        'Indian/Christmas': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Christmas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0700\r\nTZOFFSETTO:+0700\r\nTZNAME:CXT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0102500',
          longitude: '+1054300'
        },
        'Indian/Cocos': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Cocos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0630\r\nTZOFFSETTO:+0630\r\nTZNAME:CCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0121000',
          longitude: '+0965500'
        },
        'Indian/Comoro': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Comoro\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0114100',
          longitude: '+0431600'
        },
        'Indian/Kerguelen': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Kerguelen\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:TFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0492110',
          longitude: '+0701303'
        },
        'Indian/Mahe': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Mahe\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:SCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0044000',
          longitude: '+0552800'
        },
        'Indian/Maldives': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Maldives\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0500\r\nTZOFFSETTO:+0500\r\nTZNAME:MVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0041000',
          longitude: '+0733000'
        },
        'Indian/Mauritius': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Mauritius\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:MUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0201000',
          longitude: '+0573000'
        },
        'Indian/Mayotte': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Mayotte\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0300\r\nTZOFFSETTO:+0300\r\nTZNAME:EAT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0124700',
          longitude: '+0451400'
        },
        'Indian/Reunion': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Indian/Reunion\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0400\r\nTZOFFSETTO:+0400\r\nTZNAME:RET\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0205200',
          longitude: '+0552800'
        },
        'Pacific/Apia': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Apia\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1400\r\nTZOFFSETTO:+1300\r\nTZNAME:WSST\r\nDTSTART:19700405T040000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1400\r\nTZNAME:WSDT\r\nDTSTART:19700927T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0135000',
          longitude: '-1714400'
        },
        'Pacific/Auckland': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Auckland\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:NZDT\r\nDTSTART:19700927T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:NZST\r\nDTSTART:19700405T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0365200',
          longitude: '+1744600'
        },
        'Pacific/Bougainville': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Bougainville\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:BST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0061300',
          longitude: '+1553400'
        },
        'Pacific/Chatham': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Chatham\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1245\r\nTZOFFSETTO:+1345\r\nTZNAME:CHADT\r\nDTSTART:19700927T024500\r\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1345\r\nTZOFFSETTO:+1245\r\nTZNAME:CHAST\r\nDTSTART:19700405T034500\r\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0435700',
          longitude: '-1763300'
        },
        'Pacific/Chuuk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Chuuk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:CHUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0072500',
          longitude: '+1514700'
        },
        'Pacific/Easter': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Easter\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:EAST\r\nDTSTART:19700509T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=5;BYDAY=2SA\r\nEND:STANDARD\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:EASST\r\nDTSTART:19700808T220000\r\nRRULE:FREQ=YEARLY;BYMONTH=8;BYDAY=2SA\r\nEND:DAYLIGHT\r\nEND:VTIMEZONE',
          latitude: '-0270900',
          longitude: '-1092600'
        },
        'Pacific/Efate': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Efate\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:VUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0174000',
          longitude: '+1682500'
        },
        'Pacific/Enderbury': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Enderbury\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1300\r\nTZNAME:PHOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0030800',
          longitude: '-1710500'
        },
        'Pacific/Fakaofo': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Fakaofo\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1300\r\nTZNAME:TKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0092200',
          longitude: '-1711400'
        },
        'Pacific/Fiji': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Fiji\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1300\r\nTZNAME:FJST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1200\r\nTZNAME:FJT\r\nDTSTART:19700118T030000\r\nRRULE:FREQ=YEARLY;BYMONTH=1;BYDAY=3SU\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0180800',
          longitude: '+1782500'
        },
        'Pacific/Funafuti': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Funafuti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:TVT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0083100',
          longitude: '+1791300'
        },
        'Pacific/Galapagos': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Galapagos\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0600\r\nTZNAME:GALT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0005400',
          longitude: '-0893600'
        },
        'Pacific/Gambier': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Gambier\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0900\r\nTZOFFSETTO:-0900\r\nTZNAME:GAMT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0230800',
          longitude: '-1345700'
        },
        'Pacific/Guadalcanal': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Guadalcanal\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:SBT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0093200',
          longitude: '+1601200'
        },
        'Pacific/Guam': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Guam\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:ChST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0132800',
          longitude: '+1444500'
        },
        'Pacific/Honolulu': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Honolulu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0211825',
          longitude: '-1575130'
        },
        'Pacific/Johnston': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Johnston\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:HST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0164500',
          longitude: '-1693100'
        },
        'Pacific/Kiritimati': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Kiritimati\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1400\r\nTZOFFSETTO:+1400\r\nTZNAME:LINT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0015200',
          longitude: '-1572000'
        },
        'Pacific/Kosrae': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Kosrae\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:KOST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0051900',
          longitude: '+1625900'
        },
        'Pacific/Kwajalein': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Kwajalein\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:MHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0090500',
          longitude: '+1672000'
        },
        'Pacific/Majuro': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Majuro\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:MHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0070900',
          longitude: '+1711200'
        },
        'Pacific/Marquesas': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Marquesas\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0930\r\nTZOFFSETTO:-0930\r\nTZNAME:MART\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0090000',
          longitude: '-1393000'
        },
        'Pacific/Midway': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Midway\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:SST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0281300',
          longitude: '-1772200'
        },
        'Pacific/Nauru': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Nauru\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:NRT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0003100',
          longitude: '+1665500'
        },
        'Pacific/Niue': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Niue\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:NUT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0190100',
          longitude: '-1695500'
        },
        'Pacific/Norfolk': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Norfolk\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:NFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0290300',
          longitude: '+1675800'
        },
        'Pacific/Noumea': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Noumea\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:NCT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0221600',
          longitude: '+1662700'
        },
        'Pacific/Pago_Pago': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Pago_Pago\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1100\r\nTZOFFSETTO:-1100\r\nTZNAME:SST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0141600',
          longitude: '-1704200'
        },
        'Pacific/Palau': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Palau\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0900\r\nTZOFFSETTO:+0900\r\nTZNAME:PWT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0072000',
          longitude: '+1342900'
        },
        'Pacific/Pitcairn': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Pitcairn\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0800\r\nTZOFFSETTO:-0800\r\nTZNAME:PST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0250400',
          longitude: '-1300500'
        },
        'Pacific/Pohnpei': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Pohnpei\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1100\r\nTZOFFSETTO:+1100\r\nTZNAME:PONT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0065800',
          longitude: '+1581300'
        },
        'Pacific/Port_Moresby': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Port_Moresby\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:PGT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0093000',
          longitude: '+1471000'
        },
        'Pacific/Rarotonga': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Rarotonga\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:CKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0211400',
          longitude: '-1594600'
        },
        'Pacific/Saipan': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Saipan\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1000\r\nTZOFFSETTO:+1000\r\nTZNAME:ChST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0151200',
          longitude: '+1454500'
        },
        'Pacific/Tahiti': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Tahiti\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-1000\r\nTZOFFSETTO:-1000\r\nTZNAME:TAHT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0173200',
          longitude: '-1493400'
        },
        'Pacific/Tarawa': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Tarawa\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:GILT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0012500',
          longitude: '+1730000'
        },
        'Pacific/Tongatapu': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Tongatapu\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1300\r\nTZOFFSETTO:+1300\r\nTZNAME:TOT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0211000',
          longitude: '-1751000'
        },
        'Pacific/Wake': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Wake\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:WAKT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '+0191700',
          longitude: '+1663700'
        },
        'Pacific/Wallis': {
          ics: 'BEGIN:VTIMEZONE\r\nTZID:Pacific/Wallis\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+1200\r\nTZOFFSETTO:+1200\r\nTZNAME:WFT\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE',
          latitude: '-0131800',
          longitude: '-1761000'
        }
      }
    });
})();
