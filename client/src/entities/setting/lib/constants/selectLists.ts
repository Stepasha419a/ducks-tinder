import type { ProfileSettingSelectName } from '../../model';
import { SETTING_INTERESTS_LIST } from '../../model/setting.constants';

export const SELECT_LISTS: Record<ProfileSettingSelectName, string[]> = {
  interests: SETTING_INTERESTS_LIST,
  attentionSign: [
    'Attention gestures',
    'Gifts',
    'Touches',
    'Compliments',
    'Time together',
  ],
  childrenAttitude: [
    'I want children',
    'I do not want children',
    'I have children and I want more',
    'I have children, but I do not want any more',
    'Do not know yet',
  ],
  communicationStyle: [
    'Messaging a lot',
    'Phone communication',
    'Video chats',
    'Do not like messaging',
    'Meet in person',
  ],
  education: [
    'Bachelor',
    'College',
    'Middle school',
    'Doctor of sciences',
    'Postgraduate',
    'Magistracy',
    'Technical school',
  ],
  personalityType: [
    'INTJ',
    'INTP',
    'ENTJ',
    'ENTP',
    'INFJ',
    'INFP',
    'ENFJ',
    'ENFP',
    'ISTJ',
    'ISFJ',
    'ESTJ',
    'ESFJ',
    'ISTP',
    'ISFP',
    'ESTP',
    'Entertainer',
  ],
  zodiacSign: [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpius',
    'Sagittarius',
    'Capricornus',
    'Aquarius',
    'Pisces',
  ],
};
