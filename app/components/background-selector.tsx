'use client'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import cn from 'classnames'

interface BackgroundOption {
  id: string
  name: string
  value: string
  preview?: string
}

// Default non-image backgrounds
const DEFAULT_OPTIONS: BackgroundOption[] = [
  { id: 'default', name: '默认白色', value: 'bg-white' },
  { id: 'gray', name: '浅灰色', value: 'bg-gray-100' },
  { id: 'gradient-blue', name: '蓝色渐变', value: 'bg-gradient-to-br from-blue-50 to-blue-100' },
  { id: 'gradient-purple', name: '紫色渐变', value: 'bg-gradient-to-br from-purple-50 to-purple-100' },
  { id: 'gradient-green', name: '绿色渐变', value: 'bg-gradient-to-br from-green-50 to-green-100' },
  { id: 'gradient-warm', name: '暖色渐变', value: 'bg-gradient-to-br from-orange-50 to-yellow-100' },
]

const STORAGE_KEY = 'chat-background'

const BackgroundSelector: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [backgroundOptions, setBackgroundOptions] = useState<BackgroundOption[]>(DEFAULT_OPTIONS)
  const [selectedBg, setSelectedBg] = useState<BackgroundOption>(DEFAULT_OPTIONS[0])

  useEffect(() => {
    // Fetch background images from API
    fetch('/api/backgrounds')
      .then(res => res.json())
      .then((data) => {
        if (data.backgrounds && data.backgrounds.length > 0) {
          setBackgroundOptions([...DEFAULT_OPTIONS, ...data.backgrounds])
        }
      })
      .catch(() => {
        // Keep default options if API fails
      })

    // Load saved preference
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      // Will be updated after options are loaded
      setSelectedBg(DEFAULT_OPTIONS.find(opt => opt.id === saved) || DEFAULT_OPTIONS[0])
    }
  }, [])

  // Update selected background when options change
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const found = backgroundOptions.find(opt => opt.id === saved)
      if (found)
      { setSelectedBg(found) }
    }
  }, [backgroundOptions])

  const handleSelect = (option: BackgroundOption) => {
    setSelectedBg(option)
    localStorage.setItem(STORAGE_KEY, option.id)
    setIsOpen(false)
    // Trigger event for parent component
    window.dispatchEvent(new CustomEvent('background-change', { detail: option }))
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
        title='切换背景'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
          <circle cx='8.5' cy='8.5' r='1.5' />
          <polyline points='21 15 16 10 5 21' />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 top-10 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-3'>
          <div className='text-sm font-medium text-gray-700 mb-2'>选择背景主题</div>
          <div className='grid grid-cols-2 gap-2'>
            {backgroundOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={cn(
                  'p-2 rounded-lg border-2 transition-all text-xs',
                  selectedBg.id === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300',
                )}
              >
                {option.preview
                  ? (
                    <div className='w-full h-8 rounded mb-1 bg-cover bg-center' style={{ backgroundImage: `url(${option.preview})` }} />
                  )
                  : (
                    <div className={cn('w-full h-8 rounded mb-1', option.value)} />
                  )}
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundSelector
export { DEFAULT_OPTIONS, STORAGE_KEY }
export type { BackgroundOption }
