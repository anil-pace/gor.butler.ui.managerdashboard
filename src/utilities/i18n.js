/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import jaLocaleData from 'react-intl/locale-data/ja';

import enTranslationMessages from '../translations/en-US.json';
import jaTranslationMessages from '../translations/ja-JP.json';

addLocaleData([...enLocaleData, ...jaLocaleData,
	...enTranslationMessages, ...jaTranslationMessages]);

export const formatTranslationMessages = (messages) => {
  const formattedMessages = {};
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage;
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  ja: formatTranslationMessages(jaTranslationMessages),
};
