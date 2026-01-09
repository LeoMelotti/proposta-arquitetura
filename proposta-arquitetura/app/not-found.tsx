import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-label mb-4">Proposta não encontrada</p>
        <h1 className="font-serif text-4xl uppercase tracking-widest text-text-strong mb-6">
          404
        </h1>
        <div className="w-16 h-px bg-line mx-auto mb-8" />
        <p className="text-body text-text-secondary mb-8">
          O link que você acessou pode estar incorreto ou expirado.
        </p>
        <Link 
          href="/"
          className="text-label text-accent hover:text-text-strong transition-colors"
        >
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
