
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-headline text-primary mb-4">Ovisure Gold Official</h3>
            <p className="text-sm">
              Solusi alami untuk kesehatan sendi dan tulang Anda. Kembali aktif tanpa rasa nyeri.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-headline text-foreground mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#manfaat" className="hover:text-primary transition-colors">Manfaat</Link></li>
              <li><Link href="#kandungan" className="hover:text-primary transition-colors">Kandungan</Link></li>
              <li><Link href="#testimoni" className="hover:text-primary transition-colors">Testimoni</Link></li>
              <li><Link href="#pesan" className="hover:text-primary transition-colors">Pesan Sekarang</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-headline text-foreground mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
            </div>
            {/* Removed company name and address
            <p className="text-sm mt-4">
              PT Ovisure Gold Official Sejahtera Indonesia.
              <br />
              Jl. Kesehatan No. 1, Jakarta.
            </p>
            */}
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm">
          {/* Removed copyright and product disclaimer paragraphs */}
        </div>
      </div>
    </footer>
  );
}
