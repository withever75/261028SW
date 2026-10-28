export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} 사회복지학 연구 아카이브</p>
        <p className="mt-1">문의: professor@example.ac.kr (샘플)</p>
      </div>
    </footer>
  )
}
