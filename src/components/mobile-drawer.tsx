'use client'

import {Drawer} from 'vaul'
import {ClockIcon} from '@heroicons/react/20/solid'
import {Profile, Session} from 'contentlayer/generated'
import {addMinutes} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'
import {useMDXComponent} from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import {useWindowWidth} from '@/hooks/use-window-width'
import {useRouter} from 'next/navigation'
import {SessionFeedback} from './session-feedback'

export const MobileDrawer: FC<{session: Omit<Session, 'speaker'> & {speaker: Profile}}> = ({session}) => {
  const Content = useMDXComponent(session.body.code)
  const router = useRouter()
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 768

  const onOpenChange = (open: boolean) => {
    if (!open) router.back()
  }

  if (!isMobile) return null

  return (
    <Drawer.Root dismissible open onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={() => close()} />
        <Drawer.Content className="border-b-none fixed bottom-0 left-0 right-0 flex h-[94%] flex-col rounded-t-[10px] border-gray-200 bg-white focus-visible:outline-none">
          <Drawer.Handle className="mt-2 h-1 w-8 rounded-full bg-neutral-300" />
          <div className="flex flex-col overflow-y-auto p-8 pb-24 pt-12 text-black">
            <Link href={`/speakers/${session.speaker.slug}`} className="group/speaker flex items-center gap-2">
              <div className="relative size-12">
                {session.speaker.avatar ? (
                  <>
                    <Image src={session.speaker.avatar} alt={session.speaker.name} fill className="object-contain object-left" />
                    {session.speaker.avatar.startsWith('https://') && (
                      <svg viewBox="0 0 689 689" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 fill-current text-white">
                        <path fillRule="evenodd" clipRule="evenodd" d="M233 0H0V689H558.5H689V0H233ZM233 0L643.5 92V591L558.5 689L35 571V302L233 0Z" />
                      </svg>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-100">
                    <span className="text-xl text-neutral-400">{session.speaker.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="leading-tight">
                <span className="group-hover/speaker:underline">{session.speaker.name}</span>
                <br />
                <span className="text-neutral-500">{session.speaker.role}</span>
              </div>
            </Link>
            <h1 className="mt-8 font-display text-4xl leading-none">{session.title}</h1>
            <p className="mt-8 flex items-center gap-3 text-blue">
              <ClockIcon className="size-5" />
              <span>{`${formatInTimeZone(new Date(session.start), 'Europe/Berlin', 'MMM dd HH:mm')} - ${formatInTimeZone(addMinutes(new Date(session.start), session.duration), 'Europe/Berlin', 'HH:mm')}`}</span>
            </p>
            <div className="prose prose-sm prose-neutral mt-12 text-neutral-500">
              <Content />
            </div>
            <SessionFeedback sessionTitle={session.title} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
