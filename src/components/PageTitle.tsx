import { useEffect } from 'react'

export default function PageTitle({ title, desc, hidden }: { title: string; desc?: string; hidden?: boolean }) {
  useEffect(() => {
    document.title = `${title} | 사회복지학 연구 아카이브`
  }, [title])
  return (
    <div className={hidden ? 'sr-only' : 'mb-6'}>
      <h1 className="text-3xl font-extrabold text-navy-900">{title}</h1>
      {desc && <p className="mt-1 text-slate-600">{desc}</p>}
    </div>
  )
}
