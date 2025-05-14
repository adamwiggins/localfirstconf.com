import Link from 'next/link'
import {FC} from 'react'

export const SessionFeedback: FC<{sessionTitle: string}> = ({sessionTitle}) => {
  // During/after the conference we can turn on a feedback link
  return <></>

  /*
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSeiMT7V1HefsrtGR31-tjD8ie05VHvSW12Cja0gfk55UY5g4g/viewform?entry.600067007=${sessionTitle}`

  return (
    <div className="mt-6 border-t border-black pt-8">
      <h3 className="mb-2 font-display text-2xl">Feedback</h3>
      <p className="text-sm text-neutral-500">
        Let us know what you thought about this session using{' '}
        <Link href={formUrl} target="_blank" rel="noreferrer" className="text-black underline">
          this form
        </Link>
        !
      </p>
    </div>
  )
  */
}
