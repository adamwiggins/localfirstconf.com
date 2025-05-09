'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Marker} from './marker'
import {cn} from '@/utils/cn'

const content = {
  items: [
    {
      href: '/schedule',
      caption: 'Schedule',
      children: [
        {href: '/schedule/community-day', caption: 'Community Day'},
        {href: '/schedule/talks-day-1', caption: 'Talks, Day 1'},
        {href: '/schedule/talks-day-2', caption: 'Talks, Day 2'}
      ]
    },
    {href: '/speakers', caption: 'Speakers'}
  ]
}

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <ul className="-ml-8 mt-8 flex flex-col gap-4 pl-8">
      {content.items.map(({href, caption, children}, index) => (
        <li key={index} className="relative">
          <Marker
            className={cn('absolute -left-[3.75rem] top-1.5 h-3 text-blue transition-transform', href === pathname ? 'translate-x-0' : '-translate-x-6')}
          />
          <Link href={href} className="transition-colors duration-300 hover:text-neutral-300">
            {caption}
          </Link>
          {children && (
            <ul className="mt-4 flex flex-col gap-4 pl-4">
              {children.map(({href, caption}, index) => (
                <li key={index} className="relative">
                  <Marker
                    className={cn(
                      'absolute -left-[3.75rem] top-1.5 h-3 text-blue transition-transform',
                      pathname.startsWith(href) ? 'translate-x-0' : '-translate-x-10'
                    )}
                  />
                  <Link href={href} className="transition-colors duration-300 hover:text-neutral-300">
                    {caption}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
