import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'Chat APP',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
  copyright: process.env.NEXT_PUBLIC_APP_COPYRIGHT || '',
  privacy_policy: process.env.NEXT_PUBLIC_APP_PRIVACY_POLICY || '',
  default_language: (process.env.NEXT_PUBLIC_APP_DEFAULT_LANGUAGE || 'en') as AppInfo['default_language'],
  disable_session_same_site: process.env.NEXT_PUBLIC_DISABLE_SESSION_SAME_SITE === 'true',
  robot_avatar: process.env.NEXT_PUBLIC_ROBOT_AVATAR || '/robot.png',
  logo: process.env.NEXT_PUBLIC_APP_LOGO || '/logo.png',
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
