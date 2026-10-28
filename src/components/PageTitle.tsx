import { useEffect } from 'react'

export default function PageTitle({ title, desc }: { title: string; desc?: string }) {
  useEffect(() => {
    document.title = `${title} | 사회복지학 연구 아카이브`
  }, [title])
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
      {desc && <p className="mt-1 text-slate-600">{desc}</p>}
    </div>
  )
}
