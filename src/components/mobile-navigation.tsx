'use client'

import {CalendarIcon, UserGroupIcon, UserIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {FC, useEffect, useState} from 'react'

export const MobileNavigation: FC<{}> = ({}) => {
  const [slug, setSlug] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const slug = localStorage.getItem('attendee-slug')
    if (slug) setSlug(slug)
  }, [pathname])

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-white text-neutral-500 md:hidden">
      <ul className="relative grid grid-cols-4 py-2 text-center text-[0.6rem] leading-none">
        <div className="absolute top-0 h-px w-full bg-neutral-400" />
        <li className="relative">
          <Link href="/schedule/expo" className={pathname === '/schedule/expo' ? 'text-black' : ''}>
            <CalendarIcon className="mx-auto mb-2 size-6" />
            <span>
              Monday
              <br />
              Community
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href="/schedule/conference" className={pathname === '/schedule/conference' ? 'text-black' : ''}>
            <CalendarIcon className="mx-auto mb-2 size-6" />
            <span>
              Tuesday
              <br />
              Talks
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href="/schedule/conference-day-2" className={pathname === '/schedule/conference-day-2' ? 'text-black' : ''}>
            <CalendarIcon className="mx-auto mb-2 size-6" />
            <span>
              Wednesday
              <br />
              Talks
            </span>
          </Link>
        </li>
        <li className="relative">
          <Link href="/speakers" className={pathname === '/speakers' ? 'text-black' : ''}>
            <UserGroupIcon className="mx-auto mb-2 size-6" />
            <span>
              Speaker
              <br />
              List
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
