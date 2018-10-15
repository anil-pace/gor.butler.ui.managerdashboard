/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en'; //english
import jaLocaleData from 'react-intl/locale-data/ja'; //japanes
import zhLocaleData from 'react-intl/locale-data/zh'; //chinese
import deLocaleData from 'react-intl/locale-data/de'; //german
import frLocaleData from 'react-intl/locale-data/fr'; //french
import esLocaleData from 'react-intl/locale-data/es'; //spanish
import nlLocaleData from 'react-intl/locale-data/nl'; //Dutch

import enTranslationMessages from '../translations/en-US.json';
import jaTranslationMessages from '../translations/ja-JP.json';
import deTranslationMessages from '../translations/de-DE.json';
import frTranslationMessages from '../translations/fr-FR.json';
import esTranslationMessages from '../translations/es-ES.json';
import zhTranslationMessages from '../translations/zh-ZH.json';
import nlTranslationMessages from '../translations/nl.json';

addLocaleData([...enLocaleData, 
              ...jaLocaleData, 
              ...zhLocaleData, 
              ...deLocaleData, 
              ...frLocaleData,
              ...esLocaleData,
              ...nlLocaleData,
              ...enTranslationMessages, 
              ...jaTranslationMessages,
              ...deTranslationMessages,
              ...frTranslationMessages,
              ...esTranslationMessages,
              ...zhTranslationMessages,
              ...nlTranslationMessages
  ]);

export const formatTranslationMessages=(messages)=> {
  const formattedMessages={};
  for (const message of messages) {
    formattedMessages[message.id]=message.message || message.defaultMessage;
  }

  return formattedMessages;
};

export const translationMessages={
  en: formatTranslationMessages(enTranslationMessages),
  ja: formatTranslationMessages(jaTranslationMessages),
  de: formatTranslationMessages(deTranslationMessages),
  fr: formatTranslationMessages(frTranslationMessages),
  es: formatTranslationMessages(esTranslationMessages),
  zh: formatTranslationMessages(zhTranslationMessages),
  nl: formatTranslationMessages(nlTranslationMessages)
};
